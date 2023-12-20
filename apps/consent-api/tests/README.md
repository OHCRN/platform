# Unit Testing for Routers

Unit testing the Consent API endpoints achieves several things:

1. Verifies the appropriate service functions are called and the router is sending their returned data
2. Verifies the response status codes
3. Verifies the accepted error responses (request validation error, not found error, etc.)

## Making requests to endpoints

We can make requests to our router endpoints using the `supertest` library, which lets us pass our exported `App` server to a `request` function and then make HTTP requests to App's routers. You can read more about it in the [docs](https://github.com/ladjs/supertest?tab=readme-ov-file#readme). Below is an example of how this can work:

```ts
import request from 'supertest';

const appConfig = getAppConfig();

const response = await request(App(appConfig)).get('/wizard/steps/informed-consent');

console.log(response.status); // 200
```

## Mocking the app config

Since the unit tests are run in a separate environment, we mock the app config so we have control over the app config variables that are used in tests, specifically ones that use env vars. `mockEnv` defined in [`config.ts`](./config.ts) does two things:

1. Stubs the `NODE_ENV` env var, because currently there are places in the code directly accessing `process.env.NODE_ENV` so we need to stub the env var directly. The remaining env vars should all be accessed via our app config.
2. Mocks the `getAppConfig` return value so we can set custom values for the app config. This allows each test suite to have a different app config as needed.

Since this involves stubbing env vars and mocking functions, it's important to [unstub all vars](https://vitest.dev/api/vi.html#vi-unstuballenvs) and [restore all mocks](https://vitest.dev/api/vi.html#vi-restoreallmocks) at the end of test suites, like so:

```ts
describe('Some test suite', () => {
	// mock the app config/env
	beforeAll(() => mockEnv());
	// restore config and env after each suite
	afterAll(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
	});

	// test suite
});
```

## Mocking services

An endpoint will likely make a call to a service function (e.g. [`services/create.ts`](../src/services/create.ts)). Mock service functions as needed using `vi.mock()` so you don't need to make an API call to other services like Data Mapper or the DAS (which will be running independent of Consent API).

### Using variables in `vi.mock()`

`vi.mock()` gets "hoisted" to the top of the file meaning it executes first, so you'll need to declare any variables used in `vi.mock()` inside of a `vi.hoisted()` function call before declaring your mocks. You can read more about it in the [docs](https://vitest.dev/api/vi#vi-mock). As an example, it might look like this:

```ts
import { vi } from 'vitest';

const mocks = vi.hoisted(() => {
	const informedConsentResponses = {
		INFORMED_CONSENT__READ_AND_UNDERSTAND: true,
	};

	const getInformedConsentResponses = () => ({
		status: 'SUCCESS',
		data: mocks.informedConsentResponses,
	});

	return { getInformedConsentResponses };
});

// `services/search.ts` exports getInformedConsentResponses which makes a GET request
// to Data Mapper, so instead mock the function to return our mock response
vi.mock('../../src/services/search.js', () => {
	return { getInformedConsentResponses: mocks.getInformedConsentResponses };
});
```
