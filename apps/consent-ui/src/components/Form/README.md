# Forms

Libraries used:

- [React-Hook-Form](https://react-hook-form.com/) with [Zod validation](https://zod.dev/)
- [React-Select](https://react-select.com/home)

## How to make a form

- Make a server component and collect the translations you need.
  - As much as possible, organize the translations into objects based on which dictionary they come from, so the objects can use the dictionaries' types.
- Make a client component that takes the translations as props.
  - Wrap a `<Form />` component around the form's contents.
  - Use the `useForm` hook from React-Hook-Form.
  - Add fields using `FieldSet` components, not input components.
  - To submit the form, use the `handleSubmit` method from the `useForm` hook. This will trigger Zod schema validation.

## A brief intro to React-Hook-Form

- React-Hook-Form provides hooks, not components, to help developers create forms.
- Most components can be **registered** using the `register` method from the `useForm` hook. These are _uncontrolled_ components: They manage their own state in the DOM, and React-Hook-Form reads and validates their state using `refs`.
- Components imported from libraries must be **controlled** by wrapping a `<Controller />` component around them. They're _controlled_ components, but the controlling context is a wrapper around the specific input, which is then managed by React-Hook-Form similar to the registered/uncontrolled inputs.
- Fields are validated using Zod schemas, initially on submit, and then on change.

## Common use cases

- Conditionally-displayed fields:
  - Use `watch` from React-Hook-Form and a `useEffect` hook to toggle conditional fields.
  - When toggling the conditional fields, use the `unregister` method from `useForm()`. Don't use `register`, though - the `register` method has been passed down to the input components and will run on render.
    - Unregistering works the same way for registered & controlled components.
  - Example: Guardian fields in ClinicianInviteForm.

## Parts of a form

### Fieldsets

- A `fieldset` is an HTML element that contains an input or group of inputs, and their label, description, legend, and other associated elements.
- The `<FieldSet />` component is used for most of the form fields in Consent UI, i.e. the ones that have a label on the left and input on the right, at desktop width.
  - For other types of fields, use a more specific fieldset component, such as `<CheckboxFieldSet />`.

#### Inputs

- This folder contains low-level components (native HTML elements, or components imported from libraries) and logic for registering or controlling these components with React-Hook-Form.
- Styling should be handled in the parent `fieldset`, not at this level.
