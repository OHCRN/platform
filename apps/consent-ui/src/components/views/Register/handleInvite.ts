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

import { ClinicianInviteResponse } from 'types/consentApi';

export type MockInviteData = ClinicianInviteResponse & { mockInviteExpired?: boolean };
type HandleInvite = (
	inviteId?: string,
) => Promise<{ error?: string; data?: MockInviteData } | undefined>;

const mockData: Record<string, MockInviteData> = {
	adult: {
		clinicianFirstName: 'Dr',
		clinicianInstitutionalEmailAddress: 'drnick@example.com',
		clinicianLastName: 'Nick',
		clinicianTitleOrRole: 'Doctor',
		consentGroup: 'ADULT_CONSENT',
		consentToBeContacted: true,
		guardianEmailAddress: undefined,
		guardianName: undefined,
		guardianPhoneNumber: undefined,
		guardianRelationship: undefined,
		id: 'homerdQaPAT3Vi33mACT8',
		inviteAccepted: false,
		inviteAcceptedDate: undefined,
		inviteSentDate: new Date('2024-02-03'),
		mockInviteExpired: false, // not a real property. invite expiry TBA
		participantEmailAddress: 'homer@example.com',
		participantFirstName: 'Homer',
		participantLastName: 'Simpson',
		participantPhoneNumber: '1234567890',
		participantPreferredName: undefined,
	},
	minor: {
		clinicianFirstName: 'Dr',
		clinicianInstitutionalEmailAddress: 'drnick@example.com',
		clinicianLastName: 'Nick',
		clinicianTitleOrRole: 'Doctor',
		consentGroup: 'GUARDIAN_CONSENT_OF_MINOR',
		consentToBeContacted: true,
		guardianEmailAddress: 'homer@example.com',
		guardianName: 'Homer Simpson',
		guardianPhoneNumber: '1234567890',
		guardianRelationship: 'Father',
		id: 'bart9dQaPAT3Vi33mACT8',
		inviteAccepted: false,
		inviteAcceptedDate: undefined,
		inviteSentDate: new Date('2024-02-03'),
		mockInviteExpired: false, // not a real property. invite expiry TBA
		participantEmailAddress: 'undefined@example.com', // TODO remove, replace with undefined
		participantFirstName: 'Bartholomew',
		participantLastName: 'Simpson',
		participantPhoneNumber: '1234567890', // TODO remove, replace with undefined
		participantPreferredName: 'Bart',
	},
	get expired() {
		return { ...this.adult, mockInviteExpired: true };
	},
	get accepted() {
		return { ...this.minor, inviteAccepted: true };
	},
};

const defaultError = { error: 'inviteNotFound' };

const handleInvite: HandleInvite = async (inviteId) => {
	if (!inviteId) {
		return;
	}
	// check if inviteId matches format
	// const validInviteId = NanoId.safeParse(inviteId)?.success;
	const validInviteId = ['accepted', 'adult', 'expired', 'minor'].includes(inviteId);
	if (!validInviteId) {
		return defaultError;
	}

	// TODO GET /invites/:inviteId - will return ClinicianInviteResponse or error
	if (mockData.inviteAccepted || mockData.mockInviteExpired) {
		return defaultError;
	}

	return { data: mockData[inviteId] };
};

export default handleInvite;
