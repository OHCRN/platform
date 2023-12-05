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

// Success and Failure types
export type Success<T> = { status: 'SUCCESS'; data: T };
export type Failure<FailureStatus extends string, T = void> = {
	status: FailureStatus;
	message: string;
	data: T;
};

/**
 * Represents a response that on success will include data of type T,
 * otherwise a message will be returned in place of the data explaining the failure with optional fallback data.
 * The failure object has data type of void by default.
 */
export type Result<T, FailureStatus extends string, FailureData = void> =
	| Success<T>
	| Failure<FailureStatus, FailureData>;

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
export const failure = <FailureStatus extends string>(
	status: FailureStatus,
	message: string,
): Failure<FailureStatus, void> => ({
	status,
	message,
	data: undefined,
});

/**
 * Create a response indicating failure with a status naming the reason, message describing the failure, and a fallback response
 * @param {T} data
 * @returns {Failure<T, FailureStatus>} `{status, message, data}`
 */
export const alternate = <FailureStatus extends string, T>(
	status: FailureStatus,
	message: string,
	data: T,
): Failure<FailureStatus, T> => ({
	status,
	message,
	data,
});
