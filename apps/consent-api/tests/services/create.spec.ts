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
import { ClinicianInviteRequest } from 'types/entities';

import { createInvite } from '../../src/service/create.js';

const mockInviteRequest = ClinicianInviteRequest.parse({
	clinicianFirstName: 'Rubeus',
	clinicianLastName: 'Hagrid',
	clinicianInstitutionalEmailAddress: 'rubeus.hagrid@example.com',
	clinicianTitleOrRole: 'Physician',
	participantFirstName: 'Harry',
	participantLastName: 'Potter',
	participantEmailAddress: 'harry.potter@example.com',
	participantPhoneNumber: '3111972720',
	participantPreferredName: 'The Chosen One',
	consentGroup: 'GUARDIAN_CONSENT_OF_MINOR',
	guardianName: 'Sirius Black',
	guardianPhoneNumber: '2465930649',
	guardianEmailAddress: 'sirius.black@example.com',
	guardianRelationship: 'Guardian',
	consentToBeContacted: true,
});

describe('createInvite', () => {
	it('Valid request - makes a POST request to data-mapper and returns created invite with id, inviteAccepted, and inviteSentDate', async () => {
		const invite = await createInvite(mockInviteRequest);

		expect(invite.success).toBe(true);
		if (invite.success) {
			const response = invite.data;
			expect(response).toContain(mockInviteRequest);
			expect(response.id).toBeDefined();
			expect(response.inviteAccepted).toBe(false);
			expect(response.inviteSentDate).toBeDefined();
		}
	});
});
