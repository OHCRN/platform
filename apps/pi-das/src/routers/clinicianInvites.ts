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

import { getClinicianInvite, getClinicianInvites } from '../service/search';
import { createClinicianInvite } from '../service/create';
import logger from '../logger';

// TODO: update JSDoc comments
/**
 * @openapi
 * tags:
 *   - name: Clinician Invites
 *     description: Clinician Invite management
 */

const router = Router();

// TODO: update JSDoc comments
/**
 * @openapi
 * /clinician-invites:
 *   get:
 *     tags:
 *       - Clinician Invites
 *     name: Get All Clinician Invites
 *     description: Fetch clinician invites list
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
		const invites = await getClinicianInvites();
		res.status(200).send({ invites });
	} catch (error) {
		res.status(500).send({ error: 'Error retrieving clinician invites' });
	}
});

// TODO: update JSDoc comments
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
 *      - name: inviteId
 *        in: path
 *        description: Invite ID
 *        required: true
 *        schema:
 *          type: string
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
		const invite = await getClinicianInvite(inviteId);
		res.status(200).send({ invite });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinician invite' });
	}
});

/**
 * @openapi
 * /clinician-invites/:
 *   post:
 *     tags:
 *       - Participant
 *     name: Create Participant
 *     description: Create one clincian invite
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantFirstName:
 *                 type: string
 *                 required: true
 *               participantLastName:
 *                 type: string
 *                 required: true
 *               participantEmailAddress:
 *                 type: string
 *                 format: email
 *                 required: true
 *               participantPhoneNumber:
 *                 type: string
 *                 required: true
 *               participantPreferredName:
 *                 type: string
 *               guardianName:
 *                 type: string
 *               guardianPhoneNumber:
 *                 type: string
 *               guardianEmailAddress:
 *                 type: string
 *                 format: email
 *               guardianRelationship:
 *                 type: string
 *     responses:
 *       201:
 *         description: The clincian invite was successfully created.
 *       500:
 *         description: Error creating clincian invite.
 */
router.post('/', async (req, res) => {
	logger.info('POST /clinician-invites');
	const {
		participantFirstName,
		participantLastName,
		participantEmailAddress,
		participantPhoneNumber,
		participantPreferredName,
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
	} = req.body;
	// TODO: add validation
	try {
		const invite = await createClinicianInvite({
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
		res.status(201).send({ invite });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating clincian invite' });
	}
});

export default router;
