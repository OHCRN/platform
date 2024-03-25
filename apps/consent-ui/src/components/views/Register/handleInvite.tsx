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

import { ConsentGroup, NanoId } from 'types/entities';

import { API } from 'src/constants';
import consentApiFetch from 'src/services/api/axios/consentApiFetch';

export type MockInviteDataRegisterStep1 = {
	consentGroup?: ConsentGroup;
	guardianName?: string;
	guardianPhoneNumber?: string;
	guardianRelationship?: string;
	isInvited?: boolean;
	participantOhipFirstName?: string;
	participantOhipLastName?: string;
	participantPhoneNumber?: string;
	participantPreferredName?: string;
};

export type MockInviteDataRegisterStep2 = {
	consentToBeContacted?: true;
	guardianEmailAddress?: string;
	participantEmailAddress?: string;
};

export type MockInviteResponseData = MockInviteDataRegisterStep1 &
	MockInviteDataRegisterStep2 & { id?: string };

export type MockInviteData = {
	registerStep1: MockInviteDataRegisterStep1;
	registerStep2: MockInviteDataRegisterStep2;
};

type HandleInvite = (inviteId?: string) => Promise<{
	data?: MockInviteData;
	error?: string;
}>;

const mockInviteResponseData: MockInviteResponseData[] = [
	{
		consentGroup: 'ADULT_CONSENT',
		consentToBeContacted: true,
		id: 'clmarsvDd000008jngksv',
		participantEmailAddress: 'homer@example.com',
		participantOhipFirstName: 'Homer',
		participantOhipLastName: 'Simpson',
		participantPhoneNumber: '1234567890',
	},
	{
		consentGroup: 'GUARDIAN_CONSENT_OF_MINOR',
		consentToBeContacted: true,
		guardianEmailAddress: 'homer@example.com',
		guardianName: 'Homer Simpson',
		guardianPhoneNumber: '1234567890',
		guardianRelationship: 'Father',
		id: 'kH7g7ukHc8BBqWkaDyRaS',
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

	const inviteData = await consentApiFetch({
		method: 'GET',
		url: `${API.INVITES}/${inviteId}`,
	})
		.then((res) => res.data)
		.catch((e) => {
			console.log(e);
		});

	const {
		consentGroup,
		consentToBeContacted,
		guardianEmailAddress,
		guardianName,
		guardianPhoneNumber,
		guardianRelationship,
		participantEmailAddress,
		participantOhipFirstName,
		participantOhipLastName,
		participantPhoneNumber,
		participantPreferredName,
	} = inviteData;

	const registerStep1 = {
		consentGroup,
		guardianName,
		guardianPhoneNumber,
		guardianRelationship,
		isInvited: true,
		participantOhipFirstName,
		participantOhipLastName,
		participantPhoneNumber,
		participantPreferredName,
	};

	const registerStep2 = {
		consentToBeContacted,
		guardianEmailAddress,
		participantEmailAddress,
	};

	return {
		data: { inviteId, registerStep1, registerStep2 },
	};
};

export default handleInvite;
