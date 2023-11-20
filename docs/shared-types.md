# Shared Types

This document describes how we use [Zod](https://zod.dev/) schemas to validate and parse our shared data types. This includes API request/response bodies as well as enums and function parameters.

## Implementation

### Location
All schemas are located in the `types` package under the [`types/src/entities`](../packages/types/src/entities/) directory. Common schemas (i.e. multiple complex schemas using the same base schema) are kept in directories by the base schema name (e.g. [`ClinicianInvite`](../packages/types/src/entities/ClinicianInvite/)).

### Creating Schemas
See the [docs](https://zod.dev/?id=basic-usage) for creating schemas and the different data types supported by Zod.

### Extending Schemas
Many of our schemas have common fields. For instance, because of the way we split up most of the logical data models by DAS, we end up with a schema for the Consent DAS Clinician Invite that is comprised of half of the fields from the whole Clinician Invite schema. To avoid duplicate code, we handle this by extending the base schema to create the Consent DAS Clinician Invite schema. Zod provides multiple methods for this:
- [`extend()`](https://zod.dev/?id=extend) takes all the fields from an existing schema and allows you to add new fields (and overwrite existing fields too!)
- [`pick()` and `omit()`](https://zod.dev/?id=pickomit) takes the specified fields, or takes all the fields omitting the specified fields from an existing schema
>**Note**: We prefer `pick` over `omit` because it is more readable to see exactly which fields are included, and it is generally safer. Say we add another field to the base schema but the subset does not change - using `pick` over `omit` in this case would prevent us from having to add another field to `omit` in the subset schema.

For example, the `ConsentClinicianInviteRequest` looks like the following:

```ts
export const ConsentClinicianInviteRequest = ClinicianInviteBase.pick({
	id: true,
	clinicianFirstName: true,
	clinicianLastName: true,
	clinicianInstitutionalEmailAddress: true,
	clinicianTitleOrRole: true,
	consentGroup: true,
	consentToBeContacted: true,
});
```

Note that these are composable so you can chain as many of these as you want. **However, this does not apply when using [`refine()`](https://zod.dev/?id=refine) or [`transform()`](https://zod.dev/?id=transform)**.

### Preprocessing
[`transform()`](https://zod.dev/?id=transform) allows you to perform a transform function on the input, which can be used on individual fields or entire schemas (e.g. converting lowercase letters to uppercase in postal code inputs).

[`refine()`](https://zod.dev/?id=refine) allows you to perform a validation on the input which may be some complex logic that can't be captured with just the Zod data types, like checking for conditionally required fields on an API request body. This can also be used on individual fields or entire schemas.

Both of these convert the schema to a `ZodEffects` type which "is a wrapper class that contains all logic pertaining to preprocessing, refinements, and transforms" so once a schema has `refine` or `transform` attached to it, it cannot be extended. If there is a schema that requires one of these, but it also must be extended, separate the `refine` or `transform` logic from it and make that the base schema. Then you can extend that base schema and add a `refine` or `transform` as needed on new schemas.

[`coerce()`](https://zod.dev/?id=coercion-for-primitives) can coerce primitive data types (e.g. converting a date string to a `Date` object).


## Usage

Zod's [`parse()`](https://zod.dev/?id=parse) method simultaneously validates the data and can also coerce any data types or transform fields, as outlined in the Zod schema.

### Converting `null` values to `undefined`
Optional fields will be `undefined` if a value is not provided. However, in the DB, `undefined` values will be stored as `null`, so any data from a DAS response will need to go through a conversion step before being returned to the Data Mapper.

This is done by overwriting the base fields from [`optional()`](https://zod.dev/?id=optional) (which accepts either the specified data type or `undefined`) to [`nullable()`](https://zod.dev/?id=nullable) (which accepts the specified data type or `null`). This ensures the schema will accept any `null` values as opposed to throwing a validation error. Then by adding a transform on any `nullable()` field, we can have Zod’s `parse()` convert it to `undefined` if the value is `null`. We do this in the `ConsentClinicianInviteResponse` and `PIClinicianInviteResponse` schemas, which are the response types for the Consent and PI DAS API calls to create a clinician invite. As an example, the `ConsentClinicianInviteResponse` schema looks like the following:

```ts
export const ConsentClinicianInviteResponse = ClinicianInviteBase.pick({
	id: true,
	inviteSentDate: true,
	inviteAcceptedDate: true, // inviteAcceptedDate is z.coerce.date().optional() in the ClinicianInviteBase schema
	inviteAccepted: true,
	clinicianFirstName: true,
	clinicianLastName: true,
	clinicianInstitutionalEmailAddress: true,
	clinicianTitleOrRole: true,
	consentGroup: true,
	consentToBeContacted: true,
}).extend({
	inviteAcceptedDate: z.coerce
		.date()
		.nullable() // we overwrite it to be nullable() instead of optional()
		.transform((input) => input ?? undefined), // then transform it to undefined if previously null
});
```

The expected behaviour is described in the test cases below (we use `safeParse()` instead of `parse()` in the test cases so no errors are actually thrown, see the [docs](https://zod.dev/?id=safeparse) for more details):

```ts
describe('ConsentClinicianInviteResponse', () => {
	it('Correctly converts inviteAcceptedDate from null to undefined', () => {
		const parsed = ConsentClinicianInviteResponse.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			inviteSentDate: new Date(),
			inviteAcceptedDate: null, // originally null from the db
			inviteAccepted: false,
			clinicianFirstName: 'Jonah',
			clinicianLastName: 'Jameson',
			clinicianInstitutionalEmailAddress: 'jonah.jameson@example.com',
			clinicianTitleOrRole: 'Physician',
			consentGroup: ConsentGroup.enum.ADULT_CONSENT,
			consentToBeContacted: true,
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.inviteAcceptedDate).to.equal(undefined); // is converted to undefined
	});
	it('Accepts inviteAcceptedDate if not null', () => {
		const parsed = ConsentClinicianInviteResponse.safeParse({
			id: 'CVCFbeKH2Njl1G41vCQme',
			inviteSentDate: new Date(),
			inviteAcceptedDate: new Date('10-31-2023'), // already defined
			inviteAccepted: false,
			clinicianFirstName: 'Jonah',
			clinicianLastName: 'Jameson',
			clinicianInstitutionalEmailAddress: 'jonah.jameson@example.com',
			clinicianTitleOrRole: 'Physician',
			consentGroup: ConsentGroup.enum.ADULT_CONSENT,
			consentToBeContacted: true,
		});
		expect(parsed.success).true;
		expect(parsed.success && parsed.data.inviteAcceptedDate?.getTime()).to.equal(
			new Date('10-31-2023').getTime(),
		); // untouched since it was not null
	});
});
```
