/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ErrorName } from 'types/httpResponses';

import withRequestBodyValidation from '../../src/middleware/withRequestBodyValidation.js';

const { REQUEST_VALIDATION_ERROR } = ErrorName;

const TestSchema = z.object({ someString: z.string(), someNumber: z.number() });
const validTestBody: z.infer<typeof TestSchema> = {
	someNumber: 123,
	someString: 'asdf',
};

/**
 * Creates an incomplete version of an Express Response with mocks created for properties that are relevant
 * for testing.
 * @returns
 */
const getMockResponse = (): Response => {
	const mockResponse = {} as Response;

	mockResponse.cookie = vi.fn().mockReturnValue(mockResponse);
	mockResponse.header = vi.fn().mockReturnValue(mockResponse);
	mockResponse.json = vi.fn().mockReturnValue(mockResponse);
	mockResponse.send = vi.fn().mockReturnValue(mockResponse);
	mockResponse.status = vi.fn().mockReturnValue(mockResponse);

	return mockResponse;
};

describe('withRequestBodyValidation', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Valid request - should run request handler with body content that still passes validation', () => {
		const requestHandler = vi.fn<Parameters<RequestHandler>, ReturnType<RequestHandler>>((req) => {
			const validationResult = TestSchema.safeParse(req.body);

			// Whatever request body the validation wrapper provides our handler needs to still pass the schema validation.
			expect(validationResult.success).true;
		});
		const handlerWithValidation = withRequestBodyValidation(TestSchema, requestHandler);

		const mockRequest = { body: validTestBody } as unknown as Request;
		const mockResponse = getMockResponse();

		handlerWithValidation(mockRequest, mockResponse, () => {});

		// make sure our request handler is called. If it is not called, then the assertoin in teh request handler won't be checked.
		expect(requestHandler).toHaveBeenCalledTimes(1);
	});

	it('Invalid request - Should not run request handler when request fails ZodSchema validation', () => {
		const spyRequestHandler = vi.fn((req) => {
			console.log(req.body);
		});
		const handlerWithValidation = withRequestBodyValidation(TestSchema, spyRequestHandler);

		const mockRequest = { body: {} } as unknown as Request;
		const mockResponse = getMockResponse();

		handlerWithValidation(mockRequest, mockResponse, () => {});

		expect(spyRequestHandler).toHaveBeenCalledTimes(0);
	});
	it('Invalid request - Should respond with status 400 and RequestValidationError', () => {
		const spyRequestHandler = vi.fn((req) => {
			console.log(req.body);
		});
		const handlerWithValidation = withRequestBodyValidation(TestSchema, spyRequestHandler);

		const mockRequest = { body: {} } as unknown as Request;
		const mockResponse = getMockResponse();

		handlerWithValidation(mockRequest, mockResponse, () => {});

		expect(mockResponse.status).toHaveBeenCalledWith(400);
		expect(mockResponse.json).toHaveBeenCalledWith(
			expect.objectContaining({ error: REQUEST_VALIDATION_ERROR }),
		);
	});
});
