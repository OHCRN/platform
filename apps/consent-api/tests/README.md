# Unit Testing for Routers

## Making requests to endpoints

We can make requests to our router endpoints using the `supertest` library, which lets us pass our exported `App` server to a `request` function and then make HTTP requests to App's routers. You can read more about it in the [docs](https://github.com/ladjs/supertest?tab=readme-ov-file#readme). Below is an example of how this can work:

```ts
import request from 'supertest';

const appConfig = getAppConfig();

const response = await request(App(appConfig)).get('/wizard/steps/informed-consent');

console.log(response.status); // 200
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
