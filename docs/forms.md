# Forms

Libraries used:

- [React-Hook-Form](https://react-hook-form.com/) with [Zod validation](https://zod.dev/)
- [React-Select](https://react-select.com/home)

## A brief intro to React-Hook-Form

- React-Hook-Form provides hooks, not components, to help developers create forms.
- Most components can be **registered** using the `register` method from the `useForm` hook. These are _uncontrolled_ components: They manage their own state in the DOM, and React-Hook-Form reads and validates their state using `refs`.
- Components imported from libraries must be **controlled** by wrapping a `<Controller />` component around them. They're _controlled_ components, but the controlling context is a wrapper around the specific input, which is then managed by React-Hook-Form similar to the registered/uncontrolled inputs.
- Fields are validated `onBlur` using Zod schemas. Checkbox & radio fields have additional `onChange` validation in their FieldSet components.
  - `refine()` in Zod schemas only works in onSubmit events and `formState.isValid`. For refined onChange/onBlur validation, additional code is needed.

## Tips on creating a new form

- Make a server component and collect the required translations.
  - Organize the translations into objects based on which dictionary they come from, so the objects can use the dictionaries' types.
- Make a client component that takes the translations as props, and renders the form.
  - Wrap `<FormProvider>` (context provider from react-hook-form) and `<Form />` (our styled form component) components around the form's contents.
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
  - Showing/hiding conditional fields:
    - If you want to keep the fields in state: Show/hide with CSS
    - If you want to remove the fields from state when they're hidden: Use conditional rendering and add `shouldUnregister: true` to the form's configuration.
    - If you want to keep some fields in state and remove others, manually unregister the fields you want to remove with the `unregister` method.
    - Unregistering works the same way for registered & controlled components.
  - Example: Guardian fields in `ClinicianInviteForm` and `RegisterForm`

## Parts of a form

### Fieldsets

- A `fieldset` is an HTML element that contains an input or group of inputs, and their label, description, legend, and other associated elements.
- The `<FieldSet />` component is used for most of the form fields in Consent UI, i.e. the ones that have a label on the left and input on the right, at desktop width.
  - For other types of fields, use a more specific fieldset component, such as `<CheckboxFieldSet />`.

#### Inputs

- This folder contains low-level components (native HTML elements, or components imported from libraries) and logic for registering or controlling these components with react-hook-form.
- Styling is handled in the parent fieldset component.
- Inputs are imported into fieldsets, not directly into a form.

### Submit button

- Use <Button type="submit"> with no `onClick` prop. This will trigger a submit event on the `form` element and is needed for the react-hook-form integration.

### Tooltips

- Link tooltips to inputs using [a unique ID](https://react.dev/reference/react/useId#useid) and `aria-describedby`.
- Show & hide tooltips using CSS so the tooltip will remain visible to screenreaders. [More info here](https://www.tpgi.com/short-note-on-aria-labelledby-and-aria-describedby/)

## Validation

- We're using a Zod resolver with react-hook-form.
- Errors are checked onBlur & onSubmit, but `formState.isValid` updates onChange in the background.
- Additional validation through RHF gets ignored.
- Zod `.refine()` validations don't update `formState.errors` onBlur or onChange, only onSubmit. There's a ticket to improve onBlur validation https://github.com/OHCRN/platform/issues/398
- We currently only show errors for "this field is required".
