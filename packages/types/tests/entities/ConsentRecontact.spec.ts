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

import { describe, expect, it } from 'vitest';

import { ConsentQuestionId } from '../../src/entities/index.js';
import {
	ConsentRecontactRequest,
	ConsentRecontactResponse,
} from '../../src/services/consentApi/index.js';

describe('ConsentRecontactRequest', () => {
	it('Parses correctly when secondary contact consent is indicated and required fields are provided', () => {
		expect(
			ConsentRecontactRequest.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: 'Marge',
				secondaryContactLastName: 'Simpson',
				secondaryContactPhoneNumber: '6471234567',
			}).success,
		).true;
	});
	it('Parsing fails when secondary contact consent is indicated and required fields are NOT provided', () => {
		expect(
			ConsentRecontactRequest.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: 'Marge',
				secondaryContactLastName: 'Simpson', // missing secondaryContactPhoneNumber
			}).success,
		).false;
		expect(
			ConsentRecontactRequest.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true, // secondary contact info not provided
			}).success,
		).false;
	});
	it('Parses correctly when secondary contact consent is NOT indicated and required fields are NOT provided', () => {
		expect(
			ConsentRecontactRequest.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: false,
			}).success,
		).true;
	});
	it('Parses correctly when secondary contact consent is NOT indicated and required fields are provided', () => {
		// TODO: update this test once the expected behaviour is mapped out
		// i.e. if a user consents to secondary contact then goes back and deselects, do we delete the contact info?
		expect(
			ConsentRecontactRequest.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: false,
				secondaryContactFirstName: 'Marge', // secondary contact info all provided
				secondaryContactLastName: 'Simpson',
				secondaryContactPhoneNumber: '6471234567',
			}).success,
		).true;
	});
});

// same tests as ConsentRecontactRequest
describe('ConsentRecontactResponse', () => {
	it('Parses correctly when secondary contact consent is indicated and required fields are provided', () => {
		expect(
			ConsentRecontactResponse.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: 'Marge',
				secondaryContactLastName: 'Simpson',
				secondaryContactPhoneNumber: '6471234567',
			}).success,
		).true;
	});
	it('Parsing fails when secondary contact consent is indicated and required fields are NOT provided', () => {
		expect(
			ConsentRecontactResponse.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: 'Marge',
				secondaryContactLastName: 'Simpson', // missing secondaryContactPhoneNumber
			}).success,
		).false;
		expect(
			ConsentRecontactResponse.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true, // secondary contact info not provided
			}).success,
		).false;
	});
	it('Parses correctly when secondary contact consent is NOT indicated and required fields are NOT provided', () => {
		expect(
			ConsentRecontactResponse.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: false,
			}).success,
		).true;
	});
	it('Parses correctly when secondary contact consent is NOT indicated and required fields are provided', () => {
		// TODO: update this test once the expected behaviour is mapped out
		// i.e. if a user consents to secondary contact then goes back and deselects, do we delete the contact info?
		expect(
			ConsentRecontactResponse.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: false,
				secondaryContactFirstName: 'Marge', // secondary contact info all provided
				secondaryContactLastName: 'Simpson',
				secondaryContactPhoneNumber: '6471234567',
			}).success,
		).true;
	});
});
