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

import { find } from 'lodash';
import { ClinicianInviteResponse } from 'types/consentApi';
import { NanoId } from 'types/entities';

export type MockInviteData = Omit<
	ClinicianInviteResponse,
	| 'participantEmailAddress'
	| 'participantFirstName'
	| 'participantLastName'
	| 'participantPhoneNumber'
> & {
	participantEmailAddress?: string;
	participantOhipFirstName: string;
	participantOhipLastName: string;
	participantPhoneNumber?: string;
};

type HandleInvite = (
	inviteId?: string,
) => Promise<{ data?: MockInviteData; error?: string } | undefined>;

const mockData: MockInviteData[] = [
	{
		clinicianFirstName: 'Dr',
		clinicianInstitutionalEmailAddress: 'drnick@example.com',
		clinicianLastName: 'Nick',
		clinicianTitleOrRole: 'Doctor',
		consentGroup: 'ADULT_CONSENT',
		consentToBeContacted: true,
		id: 'cEuCqj97ACZlO4hXjYEQf',
		inviteAccepted: false,
		inviteSentDate: new Date(),
		participantEmailAddress: 'homer@example.com',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		participantPhoneNumber: '1234567890',
	},
	{
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
		id: 'kH7g7ukHc8BBqWkaDyRaS',
		inviteAccepted: false,
		inviteSentDate: new Date(),
		participantOhipFirstName: 'Bartholomew',
		participantOhipLastName: 'Simpson',
		participantPreferredName: 'Bart',
	},
];

const defaultError = { error: 'inviteNotFound' };

const handleInvite: HandleInvite = async (inviteId = '') => {
	const validInviteId = NanoId.safeParse(inviteId)?.success;
	if (!validInviteId) {
		return defaultError;
	}

	// TODO GET /invites/:inviteId - will return ClinicianInviteResponse or error

	const data = find(mockData, { id: inviteId });

	// TODO sort out step 1 & step 2 data

	return { data };
};

export default handleInvite;
