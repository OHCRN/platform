## Description of Changes

<!-- Describe the changes in your pull request **per service or package**, providing enough context for reviewers.

Be sure to call out any breaking changes, as well as any special instructions required to run the new code (i.e. New or updated dependencies? `pnpm i`. New migrations to run? `pnpm run migrate-dev`. etc.) -->

<!-- EXAMPLE START
General description of the changes in your PR and the functionality it adds.

### Consent UI
Added a new component `ComponentName` which achieves some functionality.
- Description of `ComponentName` and the changes you made to create it
- Added package [`package name`](https://link.to/package) to handle something

### Types
- Added type `TypeName` to support functionality required by `ComponentName`

### Special Instructions
Before running these changes, you will need to install `package name`:
```
pnpm i
```
EXAMPLE END -->

## PR Readiness Checklist

- [ ] "Expected Outcome(s)" in ticket have been met
- [ ] Ticket number included in PR title
- [ ] Connected ticket to PR
- [ ] Labels added to PR for service name (`consent-api`, `data-mapper`, etc...), type (`chore`, `documentation`, etc...), status (`draft`, `on-hold`, etc...) **if applicable**
- [ ] Manual testing completed
- [ ] Builds locally without errors or warnings
- [ ] Tests are updated (if required) and passing
- [ ] PR feedback has been addressed
- [ ] New environment variables added to `.env.schema` files, `README.md`
- [ ] Added copyrights to new files
