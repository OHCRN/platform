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
  - Look at guardian fields in ClinicianInviteForm.

## Parts of a form

### Fieldsets

- `Fieldset` is an HTML element that contains an input or group of inputs, and their label, description, legend, and other associated elements.
- The `<FieldSet />` component is used for most of the form fields, e.g. the ones that have a label on the left and input on the right (at desktop width). For other types of fields, use a more specific fieldset component, such as `<CheckboxFieldSet />`.

#### Inputs

- Nest these components inside a fieldset component, rather than using them directly in a form.
- This folder contains only low-level components: HTML elements or components imported directly from libraries.
- Inputs should receive styling from their parent fieldset. Inputs shouldn't be styled on their own - these components are for logic only.
