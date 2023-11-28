// Success and Failure types
export type Success<T> = { status: 'SUCCESS'; data: T };
export type Failure<T = void, FailureStatus = string> = {
	status: FailureStatus;
	message: string;
	data: T;
};
export type Conflict<T = void, ConflictStatus = string> = Failure<T, ConflictStatus> & {
	onFields: string[];
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
export type Result<T, FailureStatus = string, ConflictStatus = string> =
	| Success<T>
	| Failure<void, FailureStatus>
	| Conflict<void, ConflictStatus>;

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
 * @returns {Failure} `{status: string, message: string, data: undefined}`
 */
export const failure = <FailureStatus>(
	status: FailureStatus,
	message: string,
): Failure<void, FailureStatus> => ({
	status,
	message,
	data: undefined,
});

/**
 * Create a response indicating a conflict with a status naming the reason and message describing the conflict.
 * @param status status name
 * @param onFields list of field names causing the conflict
 * @param message message detailing the conflict
 * @returns {Conflict} `{status: string, message: string, data: undefined, onFields: string[]}`
 */
export const conflict = <ConflictStatus>(
	status: ConflictStatus,
	onFields: string[],
	message: string,
): Conflict<void, ConflictStatus> => ({
	status,
	message,
	data: undefined,
	onFields,
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
): Failure<T, FailureStatus> => ({
	status,
	data,
	message,
});
