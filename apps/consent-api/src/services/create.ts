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

import { ClinicianInviteRequest, ClinicianInviteResponse } from 'types/entities';
import urlJoin from 'url-join';

import { getAppConfig } from '../config.js';

import axiosClient from './axiosClient.js';

export const createResponse = async ({
	consentQuestionId,
	participantId,
	response,
}: {
	consentQuestionId: string;
	participantId: string;
	response: boolean;
}): Promise<any> => {
	const updateObj = {
		consentQuestionId,
		participantId,
		response,
	};

	// TODO: POST to data-mapper, then return the result
	return updateObj;
};

/**
 * Creates clinician invite by sending input to data-mapper, which separates data between
 * Consent and PI DAS and then returns the combined data object from both DB entries
 * @async
 * @param data Clinician Invite form input
 * @returns Created Clinician Invite data as Zod.SafeParseReturnType
 */
export const createInvite = async ({
	participantFirstName,
	participantLastName,
	participantEmailAddress,
	participantPhoneNumber,
	participantPreferredName,
	guardianName,
	guardianPhoneNumber,
	guardianEmailAddress,
	guardianRelationship,
	clinicianFirstName,
	clinicianLastName,
	clinicianInstitutionalEmailAddress,
	clinicianTitleOrRole,
	consentGroup,
	consentToBeContacted,
}: ClinicianInviteRequest): Promise<
	Zod.SafeParseReturnType<ClinicianInviteResponse, ClinicianInviteResponse>
> => {
	const { dataMapperUrl } = getAppConfig();
	const { data } = await axiosClient.post(urlJoin(dataMapperUrl, 'invites'), {
		participantFirstName,
		participantLastName,
		participantEmailAddress,
		participantPhoneNumber,
		participantPreferredName,
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
		clinicianFirstName,
		clinicianLastName,
		clinicianInstitutionalEmailAddress,
		clinicianTitleOrRole,
		consentGroup,
		consentToBeContacted,
	});
	return ClinicianInviteResponse.safeParse(data);
};
