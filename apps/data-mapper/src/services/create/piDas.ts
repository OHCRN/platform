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

import { piClinicianInvite } from 'types/entities';
import urlJoin from 'url-join';

import { ClinicianInvite } from '../../../../pi-das/src/generated/client/index.js';
import { getAppConfig } from '../../config.js';
import logger from '../../logger.js';

export const createParticipantPiData = async ({
	name,
	email,
}: {
	name: string;
	email: string;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { piDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	// TODO: use axios instead of fetch
	const result = await fetch(`${piDasUrl}/participants`, {
		method: 'POST',
		body: JSON.stringify({ name, email }),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
	return result.participant;
};

export const createInvitePiData = async ({
	participantFirstName,
	participantLastName,
	participantEmailAddress,
	participantPhoneNumber,
	participantPreferredName,
	guardianName,
	guardianPhoneNumber,
	guardianEmailAddress,
	guardianRelationship,
}: piClinicianInvite): Promise<ClinicianInvite> => {
	const { piDasUrl } = getAppConfig();
	// TODO: use axios instead of fetch
	try {
		const body = piClinicianInvite.parse({
			participantFirstName,
			participantLastName,
			participantEmailAddress,
			participantPhoneNumber,
			participantPreferredName,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
		});
		const result = await fetch(urlJoin(piDasUrl, 'clinician-invites'), {
			method: 'POST',
			body: JSON.stringify({ body }),
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.json());
		return result.invite;
	} catch (error) {
		logger.error(error);
		throw error; // TODO: remove and send custom error schema
	}
};
