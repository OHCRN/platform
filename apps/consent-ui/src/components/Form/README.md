# Forms

Libraries used:

- [React-Hook-Form](https://react-hook-form.com/) with [Zod validation](https://zod.dev/)
- [React-Select](https://react-select.com/home)

## How to make a form

- Make a server component and collect the translations you need.
  - Organize the translations into objects based on which dictionary they come from, for easy type safety.
- Make a client component that takes the translations as props.
  - Create a `form` element.
  - Use the `useForm` hook from React-Hook-Form.
  - Add fields using `FieldSet` components.

## Common use cases

- Conditionally-displayed fields:
  - Look at guardian fields in ClinicianInviteForm.

## Parts of a form

### Fieldsets

- `Fieldset` is an HTML element that contain an input or group of inputs, and their label, description, legend, and other associated elements.
- The `<FieldSet />` component is used as a base for most of the form fields that have a label on the left and input on the right (at desktop width).

#### Inputs

- Nest these components inside a `FieldSet` component, rather than using them on their own.
- This folder contains only low-level components: HTML elements or components imported directly from libraries.
