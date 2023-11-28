// Success and Failure types
export type Success<T> = { status: 'SUCCESS'; data: T };
export type Failure<T = void, FailureStatus = string> = {
	status: FailureStatus;
	message: string;
	target?: string[]; // list of target fields pertaining to the error, for example `emailAddress` for a conflict error
	data: T;
};

/**
 * Represents a response that on success will include data of type A,
 * and on failure will return data of type B
 */
export type Either<A, B> = Success<A> | Failure<B>;

/**
 * Represents a response that on success will include data of type T,
 * otherwise a message will be returned in place of the data explaining the failure.
 * The failure object has data type of void.
 */
export type Result<T, FailureStatus = string> = Success<T> | Failure<void, FailureStatus>;

/* ******************* *
   Convenience Methods 
 * ******************* */

/**
 * Create a successful response for a Result or Either type, with data of the success type
 * @param {T} data
 * @returns {Success<T>} `{status: 'SUCCESS', data}`
 */
export const success = <T>(data: T): Success<T> => ({ status: 'SUCCESS', data });

/**
 * Create a response indicating a failure with a status naming the reason and message describing the failure.
 * @param {string} message
 * @returns {Failure} `{status: string, message, data: undefined}`
 */
export const failure = <FailureStatus>(
	status: FailureStatus,
	message: string,
	target?: string[],
): Failure<void, FailureStatus> => ({
	status,
	message,
	target,
	data: undefined,
});

/**
 * Create a Fallback response for the Either type which includes the fallback data
 * @param {T} data
 * @returns {Failure<T, FailureStatus>} `{status, message, data}`
 */
export const alternate = <T, FailureStatus>(
	status: FailureStatus,
	data: T,
	message: string,
	target?: string[],
): Failure<T, FailureStatus> => ({
	status,
	target,
	data,
	message,
});
