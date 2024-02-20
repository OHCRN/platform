# Shared Types

This document describes how we use [Zod](https://zod.dev/) schemas to validate and parse our shared data types. This includes API request/response bodies as well as enums and function parameters.

## Implementation

### Location

All shared types and schemas are located in the `types` package. Schema types are organized as follows:

| Category              | Directory                                                                                                 | Description                                                                                   | Exported as             |
| --------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------- |
| Common                | [`types/src/common`](../packages/types/src/common/)                                                       | utility functions, constants, and generic types not specific to any section of the data model | `'types/common'`        |
| Base schemas          | [`types/src/entities`](../packages/types/src/entities/)                                                   |                                                                                               | `'types/entities'`      |
| Field types           | [`types/src/entities/fields`](../packages/types/src/entities/fields/)                                     | types for fields in the data model, such as enums                                             | `'types/entities'`      |
| Request schemas       | [`types/src/services/<service-name>/requests`](../packages/types/src/services/<service-name>/requests/)   | Schemas extended from applicable base type, used for requests to the specified service        | `'types/<service-name>` |
| Response schemas      | [`types/src/services/<service-name>/responses`](../packages/types/src/services/<service-name>/responses/) | Schemas extended from applicable base type, used for responses from the specified service     | `'types/<service-name>` |
| HTTP response schemas | [`types/src/httpResponses`](../packages/types/src/httpResponses/)                                         | Generic HTTP success and error responses for all services                                     |

The intended pattern with this directory structure is to align the base types schemas directly with the data model. Base types can be extended, merged or refined as they are needed within each service (app). Response and request types are defined separately for each service, to help keep definitions clear and easier to trace.

The [`package.json` file](../packages/types/package.json) has a separate export for each service, as well as for `entities` and `common`. New services can be added following the same pattern.

> **Note**: Consent-UI imports its service types from `types/consentApi` to take advantage of request/response validations.

### Create schemas

See the [Zod docs](https://zod.dev/?id=basic-usage) for creating schemas to validate data fields and the different data types supported by Zod.

When creating a new schema, add the base type in the [`types/src/entities` folder](../packages/types/src/entities/) first, with consideration given to which fields would be used by **every** downstream service.

A separate type would then be defined in each of the request and response folders (`types/src/services/<service-name>/<schema-type>`) for the service(s) that would use the new type. For example:

```ts
// entities/ClinicianInvite.ts
type ClinicianInvite = { ...baseFields };

// services/dataMapper/responses/ClinicianInvite.ts
type ClinicianInviteResponse = ClinicianInvite
```

In the example above, the base schema does not need to be extended in `dataMapper/responses` file, but the `response` type still has its own definition based on the type from `entities` (note this example type is for illustration only).

See the section on [merging smaller schemas](#merging-schemas) for a more complex example.

> **Note**: There may some scenarios where only the request OR the response type is needed in a service.

### Preprocessing

Zod provides some methods that can be used on schemas after the general data type validation and before parsing.

[`coerce()`](https://zod.dev/?id=coercion-for-primitives) can coerce primitive data types (e.g. converting a date string to a `Date` object).

[`transform()`](https://zod.dev/?id=transform) allows you to perform a transform function on the input, which can be used on individual fields or entire schemas (e.g. converting lowercase letters to uppercase in postal code inputs).

[`refine()`](https://zod.dev/?id=refine) allows you to perform custom validation on the input which may be some complex logic that can't be captured with just the Zod data types, like checking for conditionally required fields on an API request body. This can also be used on individual fields or entire schemas.

These last two convert the schema to a `ZodEffects` type which "is a wrapper class that contains all logic pertaining to preprocessing, refinements, and transforms" so once a schema has `refine` or `transform` attached to it, it cannot be extended the same way a typical schema can with other ZodType methods. Because of this, we prioritize modular schemas and grouping together relevant fields, then [merging smaller schemas](#merging-schemas) to form whole entities. This way, if a particular set of fields requires a `transform` or `refine` we don't need to worry about being unable to extend and reuse other parts of that schema.

### Merge schemas

Many of our schemas have common fields. For instance, because of the way we split up most of the logical data models by DAS, we end up with a schema for the Consent DAS Clinician Invite that comprises half of the fields from the entire Clinician Invite entity. To avoid duplicate code, we handle this by splitting the larger schemas into smaller schemas, grouping together relevant fields. For example, for the `ClinicianInvite` schema we have the following subset schemas:

```ts
export const InviteClinicianFields = z.object({
	clinicianFirstName: Name,
	clinicianInstitutionalEmailAddress: z.string().email(),
	clinicianLastName: Name,
	clinicianTitleOrRole: RequiredString,
	consentGroup: ConsentGroup,
	consentToBeContacted: z.literal(true),
});

export const InviteGuardianFields = z.object({
	guardianEmailAddress: z.string().email().optional(),
	guardianName: Name.optional(),
	guardianPhoneNumber: PhoneNumber.optional(),
	guardianRelationship: Name.optional(),
});

export const InviteParticipantFields = z.object({
	participantEmailAddress: z.string().email(),
	participantFirstName: Name,
	participantLastName: Name,
	participantPhoneNumber: PhoneNumber,
	participantPreferredName: Name.optional(),
});

export const InviteEntity = z.object({
	id: NanoId,
	inviteSentDate: z.coerce.date(),
	inviteAcceptedDate: z.coerce.date().optional(),
	inviteAccepted: z.boolean().default(false),
});
```

So the Clinician Invite request schema, which is the data required to create a clinician invite, would be the combination of all of these fields without the database generated fields, in other words, what we get from merging `InviteClinicianFields`, `InviteGuardianFields`, and `InviteParticipantFields`:

```ts
export const ClinicianInviteRequest =
	InviteClinicianFields.merge(InviteGuardianFields).merge(InviteParticipantFields);
```

Now when we want to reuse portions of the larger schema, we can just merge some of the subset schemas. For example, the schema we use to validate the invite data coming from the Consent DAS looks like this:

```ts
export const ConsentClinicianInviteResponse = InviteEntity.merge(InviteClinicianFields).extend({
	inviteAcceptedDate: z.coerce
		.date()
		.nullable()
		.transform((input) => input ?? undefined),
});
```

Here we merge the `InviteClinicianFields` with the set of fields generated by the database, `InviteEntity`. We are also extending the schema to overwrite the `inviteAcceptedDate`, which you can read more about in the section about [converting nulls to undefined](#converting-null-values-to-undefined).

We use `merge` where it makes sense, but Zod provides other methods that _may_ be useful in certain instances.

- [`extend()`](https://zod.dev/?id=extend) takes all the fields from an existing schema and allows you to add new fields (and overwrite existing fields too!)
- [`pick()` and `omit()`](https://zod.dev/?id=pickomit) takes the specified fields, or takes all the fields omitting the specified fields from an existing schema.
  > **Note**: We prefer `pick` over `omit` because it is more readable to see exactly which fields are included, and it is generally safer. Say we add another field to the base schema but the subset does not change - using `pick` over `omit` in this case would prevent us from having to add another field to `omit` in the subset schema. However in general, consider using `merge` over either method if you find that you're picking many fields, because that probably indicates those are fields that make sense being grouped together in a subset schema.

These methods are all composable so you can chain together as many of them as you want. **However, this does not apply when using `refine()` or `transform()`**.

### Refine schemas

With the clinician invite request, we also have conditional logic involving the `InviteGuardianFields` and the `InviteClinicianFields`, specifically when the `consentGroup` is `GUARDIAN_CONSENT_OF_MINOR` or `GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT`, all `InviteGuardianFields` are required to be defined, so each field is no longer `optional`. As a result, we `refine` the `ClinicianInviteRequest` schema which merges both of these schemas together:

```ts
export const ClinicianInviteRequest = InviteClinicianFields.merge(InviteGuardianFields)
	.merge(InviteParticipantFields)
	.refine(hasRequiredGuardianInformation, {
		message: 'Guardian contact fields are required for that consentGroup',
	});
```

As pointed out in the [Preprocessing](#preprocessing) section, we cannot merge more schemas to this after applying `refine` because it converts the schema to a `ZodEffects` type, so something like this wouldn't work:

```ts
export const ClinicianInviteRequest = InviteClinicianFields.merge(InviteGuardianFields)
	.refine(hasRequiredGuardianInformation, {
		message: 'Guardian contact fields are required for that consentGroup',
	})
	.merge(InviteParticipantFields);
// Property 'merge' does not exist on type 'ZodEffects<...>'. ts(2339)
```

In other words, `refine` (or `transform`) should be the last method being performed on a schema. For example, the entire `ClinicianInvite` schema combines the request data with the database generated fields, so the `ClinicianInviteRequest` is chained on last:

```ts
export const ClinicianInvite = InviteEntity.and(ClinicianInviteRequest);
```

Also note that we're using [`and`](https://zod.dev/?id=and) here instead of `merge`, to represent the type intersection: `ClinicianInvite = InviteEntity & ClinicianInviteRequest`, whereas `merge` is equivalent to extending an interface in TS. You can read more about it in the [docs](https://zod.dev/?id=intersections).

## Usage

### Validation and parsing

Zod's [`parse()`](https://zod.dev/?id=parse) method simultaneously validates the data and can also coerce any data types or transform fields, as outlined in the Zod schema. Similarly, [`safeParse()`](https://zod.dev/?id=safeparse) can be used to parse the data, but rather than throwing an error if the validation was unsuccesful, the `safeParse` method "returns an object containing either the successfully parsed data or a ZodError instance containing detailed information about the validation problems".

> **Note**: Zod's validation does **not** fail if it encounters unrecognized fields, it simply parses those out of the output. To disallow unknown fields, see [`strict()`](https://zod.dev/?id=strict).

### Converting `null` values to `undefined`

Optional fields will be `undefined` if a value is not provided. However, in the DB, `undefined` values will be stored as `null`, so any data from a DAS response will need to go through a conversion step before being returned to the Data Mapper.

This is done by overwriting the base fields from [`optional()`](https://zod.dev/?id=optional) (which accepts either the specified data type or `undefined`) to [`nullable()`](https://zod.dev/?id=nullable) (which accepts the specified data type or `null`). This ensures the schema will accept any `null` values as opposed to throwing a validation error. Then by adding a transform on any `nullable()` field, we can have Zod’s `parse()` convert it to `undefined` if the value is `null`. We do this in the `ConsentClinicianInviteResponse` and `PIClinicianInviteResponse` schemas, which are the response types for the Consent and PI DAS API calls to create a clinician invite. As an example, the `ConsentClinicianInviteResponse` schema looks like the following:

```ts
// inviteAcceptedDate is z.coerce.date().optional() in the InviteEntity schema
export const ConsentClinicianInviteResponse = InviteEntity.merge(InviteClinicianFields).extend({
	inviteAcceptedDate: z.coerce
		.date()
		.nullable() // we overwrite it to be nullable() instead of optional()
		.transform((input) => input ?? undefined), // then transform it to undefined if previously null
});
```

The expected behaviour is described in the test cases below:

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

### Swagger Schemas

We use the [`zod-openapi`](https://github.com/anatine/zod-plugins/tree/main/packages/zod-openapi) library to dynamically generate Swagger schemas from our Zod schemas, which can be imported into our `swagger.ts` routers and used as component schemas in our Swagger JSDocs. First, export the generated schema like so:

```ts
export const ClinicianInviteResponseSchema = generateSchema(ClinicianInviteResponse);
```

Now import it into the Swagger router:

```ts
import { ClinicianInviteResponseSchema as ClinicianInviteResponse } from 'types/entities';

const options = swaggerJsdoc({
	definition: {
		...
		components: {
			schemas: {
				ClinicianInviteResponse,
			},
		},
	},
	...
});

const router = Router();
router.use('/', serve, setup(options));
```

And now the schema can be referenced in Swagger JSDocs:

```ts
/**
 * @openapi
 * /invites/{inviteId}:
 *   get:
 *     ...
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClinicianInviteResponse'
 */
router.get('/:inviteId', async (req, res) => {
	...
});
```
