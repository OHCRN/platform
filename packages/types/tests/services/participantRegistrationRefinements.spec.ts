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

import { ParticipantRegistrationRequest } from '../../src/services/consentUi/requests/Register.js';

describe('ParticipantRegistrationRequest', () => {
	it("Adds an error to the dateOfBirth field when user's age is below the minimum", () => {
		const today = new Date();
		const month = today.getMonth();
		const day = today.getDate();
		const year = today.getFullYear();

		const result = ParticipantRegistrationRequest.safeParse({
			guardianName: 'Homer Simpson',
			guardianPhoneNumber: '1234567890',
			guardianRelationship: 'Father',
			participantFirstName: 'Bartholomew',
			participantLastName: 'Simpson',
			participantPhoneNumber: '2345678901',
			participantPreferredName: 'Bart',
			dateOfBirth: `${day}/${month}/${year - 10}`,
			consentToBeContacted: true,
			participantEmailAddress: 'bart@example.com',
			password: 'password',
			confirmPassword: 'password',
		});
		expect(result.success).true;
	});
});
