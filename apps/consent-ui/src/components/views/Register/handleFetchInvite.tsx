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

'use server';

import urlJoin from 'url-join';
import { ConsentGroup, NanoId } from 'types/entities';
import { ClinicianInviteResponse } from 'types/consentApi';

import { API } from 'src/constants';
import consentApiFetch from 'src/services/api/axios/consentApiFetch';
import { getUserType } from 'src/components/utils';

export type InviteDataRegisterStep1 = {
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

export type InviteDataRegisterStep2 = {
	consentToBeContacted?: true;
	guardianEmailAddress?: string;
	participantEmailAddress?: string;
};

export type InviteDataForRegistration = {
	inviteId: NanoId;
	registerStep1: InviteDataRegisterStep1;
	registerStep2: InviteDataRegisterStep2;
};

export type InviteFetchResult = {
	data?: InviteDataForRegistration;
	error?: string;
};

/**
 * Fetch user's invite data by invite ID from consent API.
 * @param inviteId string
 * @returns ClinicianInviteResponse | null
 */
const fetchInvite = async (inviteId: string): Promise<ClinicianInviteResponse | null> => {
	try {
		const { data } = await consentApiFetch({
			method: 'GET',
			url: urlJoin(API.INVITES, inviteId),
		}).then(async (res) => {
			const delayRes = await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
				return res;
			});
			return delayRes;
		});
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

/**
 * Format invite response data for the 2-step registration process.
 * @param inviteResponse ClinicianInviteResponse
 * @returns InviteDataForRegistration
 */
const formatInviteDataForRegistration = (
	inviteResponse: ClinicianInviteResponse,
): InviteDataForRegistration => {
	const {
		consentGroup,
		consentToBeContacted,
		guardianEmailAddress,
		guardianName,
		guardianPhoneNumber,
		guardianRelationship,
		id,
		participantEmailAddress,
		participantOhipFirstName,
		participantOhipLastName,
		participantPhoneNumber,
		participantPreferredName,
	} = inviteResponse;

	const registerStep1 = {
		consentGroup,
		guardianName,
		guardianPhoneNumber,
		guardianRelationship,
		isGuardian: getUserType(inviteResponse.consentGroup) !== 'participant',
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
		inviteId: id,
		registerStep1,
		registerStep2,
	};
};

const defaultError = { error: 'inviteNotFound' };

/**
 * Collect a user's invite data from consent API and format it for the 2-step registration form.
 * @param inviteId nanoId from the inviteId URL parameter
 */
const handleFetchInvite = async (inviteId?: string): Promise<InviteFetchResult> => {
	const validInviteId = inviteId && NanoId.safeParse(inviteId)?.success;
	if (!validInviteId) {
		return defaultError;
	}

	const inviteData = await fetchInvite(inviteId);

	if (!inviteData) {
		return defaultError;
	}

	const data = formatInviteDataForRegistration(inviteData);

	return {
		data,
	};
};

export default handleFetchInvite;
