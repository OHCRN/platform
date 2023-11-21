# Forms

Libraries used:

- [React-Hook-Form](https://react-hook-form.com/) with [Zod validation](https://zod.dev/)
- [React-Select](https://react-select.com/home)

## How to make a form

- Make a server component and collect the translations you need.
  - As much as possible, organize the translations into objects based on which dictionary they come from, so the objects can use the dictionaries' types.
- Make a client component that takes the translations as props.
  - Create a `<form />` element.
  - Use the `useForm` hook from React-Hook-Form.
  - Add fields using `FieldSet` components.
  - To submit the form, use the `handleSubmit` method from the `useForm` hook.

## Common use cases

- Conditionally-displayed fields:
  - When hiding the conditional fields, use the `unregister` method from `useForm()`.
  - Example: guardian fields in ClinicianInviteForm.

## Parts of a form

### Fieldsets

- `Fieldset` is an HTML element that contains an input or group of inputs, and their label, description, legend, and other associated elements.
- The `<FieldSet />` component is used for most of the form fields in Consent UI, e.g. the ones that have a label on the left and input on the right, at desktop width. For other types of fields, use a more specific fieldset component, such as `<CheckboxFieldSet />`.

#### Inputs

- This folder contains low-level components (native HTML elements, or components imported from libraries) and logic for registering or controlling these components with React-Hook-Form.
- Styling should be handled in the parent `fieldset`, not at this level.
