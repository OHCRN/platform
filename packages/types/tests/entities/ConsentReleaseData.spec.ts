/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

import { describe, expect, it } from 'vitest';
import { ConsentQuestionId } from '../../src/entities/ConsentQuestion.js';

import { ConsentReleaseDataFormRequest } from '../../src/services/consentUi/index.js';

describe('ConsentReleaseDataFormRequest', () => {
	const testData = {
		[ConsentQuestionId.enum.RELEASE_DATA__CLINICAL_AND_GENETIC]: true,
		[ConsentQuestionId.enum.RELEASE_DATA__DE_IDENTIFIED]: true,
		firstName: 'Homer',
		middleName: 'Jay',
		lastName: 'Simpson',
		preferredName: 'Homer',
		genderIdentity: 'MAN',
		dateOfBirth: '1956-05-12',
		birthSex: 'MALE',
		ancestry: 'AKAN',
		historyOfCancer: 'NO',
		familyHistoryOfCancer: 'NO',
		residentialPostalCode: 'M5V2T6',
	};

	it('Adds an error to the ohipNumber field when ohipNumber is provided and ohipDisabled is true', () => {
		const result = ConsentReleaseDataFormRequest.safeParse({
			...testData,
			ohipNumber: '1234567890',
			ohipDisabled: true,
		});
		const resultParsed = JSON.parse((result as { error: Error }).error.message)[0];
		const resultMessage = resultParsed.message;
		const resultPath = resultParsed.path[0];
		expect(result.success).false;
		expect(resultMessage).toBe('missingOhipError');
		expect(resultPath).toBe('ohipNumber');
	});

	it('Adds an error to the ohipNumber field when ohipNumber is not provided and ohipDisabled is false', () => {
		const result = ConsentReleaseDataFormRequest.safeParse({
			...testData,
			ohipNumber: undefined,
			ohipDisabled: false,
		});
		const resultParsed = JSON.parse((result as { error: Error }).error.message)[0];
		const resultMessage = resultParsed.message;
		const resultPath = resultParsed.path[0];
		expect(result.success).false;
		expect(resultMessage).toBe('missingOhipError');
		expect(resultPath).toBe('ohipNumber');
	});
});
