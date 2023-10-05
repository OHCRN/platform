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

import { Router } from 'express';
import { ConsentGroup } from 'common';

import { getClinicianInvite, getClinicianInvites } from '../service/search';
import { createClinicianInvite } from '../service/create';
import logger from '../logger';

/**
 * @openapi
 * tags:
 *   - name: Clinician Invites
 *     description: Clinician Invite management
 */

const router = Router();

/**
 * @openapi
 * /clinician-invites:
 *   get:
 *     tags:
 *       - Clinician Invites
 *     name: Get All Clinician Invites
 *     description: Fetch clinician invite list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of clinician invites was successfully retrieved.
 *       500:
 *         description: Error retrieving clinician invites.
 */
router.get('/', async (req, res) => {
	logger.info('GET /clinician-invites');
	try {
		const clinicianInvites = await getClinicianInvites();
		res.status(200).send({ clinicianInvites });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinician invites' });
	}
});

/**
 * @openapi
 * /clinician-invites/{inviteId}:
 *   get:
 *     tags:
 *       - Clinician Invites
 *     name: Get Clinician Invite by ID
 *     description: Fetch one clinician invite
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: inviteId
 *         in: path
 *         description: Clinician Invite ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The clinician invite was successfully retrieved.
 *       500:
 *         description: Error retrieving clinician invite.
 */
router.get('/:inviteId', async (req, res) => {
	logger.info('GET /clinician-invites/:inviteId');
	const { inviteId } = req.params;
	// TODO: add validation
	try {
		const clinicianInvite = await getClinicianInvite(inviteId);
		res.status(200).send({ clinicianInvite });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinician invite' });
	}
});

/**
 * @openapi
 * /clinician-invites:
 *   post:
 *     tags:
 *       - Clinician Invites
 *     produces: application/json
 *     name: Create Clinician Invite
 *     description: Create a new clinician invite
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clinicianFirstName:
 *                 type: string
 *                 required: true
 *               clinicianInstitutionalEmailAddress:
 *                 type: string
 *                 format: email
 *                 required: true
 *               clinicianLastName:
 *                 type: string
 *                 required: true
 *               clinicianTitle:
 *                 type: string
 *                 required: true
 *               consentGroup:
 *                 type: string
 *                 enum:
 *                   - ADULT_CONSENT
 *                   - ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER
 *                   - GUARDIAN_CONSENT_OF_MINOR
 *                   - GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT
 *                   - YOUNG_ADULT_CONSENT
 *                 required: true
 *               consentToBeContacted:
 *                 type: boolean
 *                 required: true
 *               inviteSentDate:
 *                 type: string
 *                 format: date
 *               inviteAcceptedDate:
 *                 type: string
 *                 format: date
 *               inviteAccepted:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: The clinician invite was successfully created.
 *       500:
 *         description: Error creating clinician invite.
 */
router.post('/', async (req, res) => {
	logger.info('POST /clinician-invites');
	const {
		clinicianFirstName,
		clinicianInstitutionalEmailAddress,
		clinicianLastName,
		clinicianTitle,
		consentGroup,
		consentToBeContacted,
		inviteSentDate,
		inviteAcceptedDate,
		inviteAccepted,
	} = req.body;
	// TODO: add validation
	try {
		const parsedInviteSentDate = inviteSentDate ? new Date(inviteSentDate) : undefined;
		const parsedInviteAcceptedDate = inviteAcceptedDate ? new Date(inviteAcceptedDate) : undefined;
		const parsedConsentGroup = ConsentGroup.parse(consentGroup);
		const clinicianInvite = await createClinicianInvite({
			clinicianFirstName,
			clinicianInstitutionalEmailAddress,
			clinicianLastName,
			clinicianTitle,
			consentGroup: parsedConsentGroup,
			consentToBeContacted,
			inviteSentDate: parsedInviteSentDate,
			inviteAcceptedDate: parsedInviteAcceptedDate,
			inviteAccepted,
		});
		res.status(201).send({ clinicianInvite });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating clinician invite' });
	}
});

export default router;
