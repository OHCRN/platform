# Forms

Libraries used:

- [React-Hook-Form](https://react-hook-form.com/) with [Zod validation](https://zod.dev/)
- [React-Select](https://react-select.com/home)

## A brief intro to React-Hook-Form

- React-Hook-Form provides hooks, not components, to help developers create forms.
- Most components can be **registered** using the `register` method from the `useForm` hook. These are _uncontrolled_ components: They manage their own state in the DOM, and React-Hook-Form reads and validates their state using `refs`.
- Components imported from libraries must be **controlled** by wrapping a `<Controller />` component around them. They're _controlled_ components, but the controlling context is a wrapper around the specific input, which is then managed by React-Hook-Form similar to the registered/uncontrolled inputs.
- Fields are validated using Zod schemas, initially `onSubmit`, and then `onChange`.

## Tips on creating a new form

- Make a server component and collect the required translations.
  - Organize the translations into objects based on which dictionary they come from, so the objects can use the dictionaries' types.
- Make a client component that takes the translations as props, and renders the form.
  - Wrap `<FormProvider>` (context provider from React-Hook-Form) and `<Form />` (our styled form component) components around the form's contents.
  - Add fields using `FieldSet` components.
    - Add one field, then add a submit handler, then test the page. When that's working, add the next field.
- To submit the form, use the `handleSubmit` method from the `useForm` hook and pass it your own custom submit function. This will trigger Zod schema validation. Don't wrap `handleSubmit` in another function, it won't work.
- Using schemas:
  - When starting a new form, make a new schema & type in the same file, and add form fields to this schema one by one as they're added to the page.
  - The original schemas were written for the API before work began on the form UI. They may need to be updated based on UI work.
  - Mismatches between the schema & page cause errors that aren't obvious. **Always console log `formState.errors` during development.**

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
- Styling is in the parent fieldset component.
- Inputs are imported into fieldsets, not directly into a form.

### Submit button

- Use <Button type="submit"> with no `onClick` prop.
