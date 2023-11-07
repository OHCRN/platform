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

import { expect } from 'chai';

import {
	ConsentQuestionId,
	ConsentRecontactBase,
} from '../../src/entities/index.js';

describe('ConsentRecontactBase', () => {
	it('Must define secondary contact info if user consented to secondary contact', () => {
		expect(
			ConsentRecontactBase.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: true,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: 'Marge', // secondary contact info all provided
				secondaryContactLastName: 'Simpson',
				secondaryContactPhoneNumber: '6471234567',
			}).success,
		).true;
		expect(
			ConsentRecontactBase.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: false,
				secondaryContactFirstName: undefined, // secondary contact info not needed
				secondaryContactLastName: undefined,
				secondaryContactPhoneNumber: undefined,
			}).success,
		).true;
		expect(
			ConsentRecontactBase.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: undefined,
				secondaryContactLastName: undefined,
				secondaryContactPhoneNumber: undefined, // missing all secondary contact fields
			}).success,
		).false;
		expect(
			ConsentRecontactBase.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: false,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: true,
				secondaryContactFirstName: 'Marge',
				secondaryContactLastName: 'Simpson',
				secondaryContactPhoneNumber: undefined, // missing one secondary contact field
			}).success,
		).false;
		expect(
			ConsentRecontactBase.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: null,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: null,
				secondaryContactFirstName: null,
				secondaryContactLastName: null,
				secondaryContactPhoneNumber: null,
			}).success,
		).false;
		expect(
			ConsentRecontactBase.safeParse({
				[ConsentQuestionId.enum.RECONTACT__FUTURE_RESEARCH]: undefined,
				[ConsentQuestionId.enum.RECONTACT__SECONDARY_CONTACT]: undefined,
				secondaryContactFirstName: undefined,
				secondaryContactLastName: undefined,
				secondaryContactPhoneNumber: undefined,
			}).success,
		).false;
	});
});
