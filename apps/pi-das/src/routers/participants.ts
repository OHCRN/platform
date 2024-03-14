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
import withRequestValidation from 'express-request-validation';
import { PICreateParticipantRequest } from 'types/piDas';
import {
	ConflictErrorResponse,
	NotFoundErrorResponse,
	ServerErrorResponse,
} from 'types/httpResponses';

import { deleteParticipant } from '../services/delete.js';
import { getParticipant, getParticipants } from '../services/search.js';
import { createParticipant } from '../services/create.js';
import { updateParticipant } from '../services/update.js';
import logger from '../logger.js';

// TODO: update JSDoc comments when custom error handling is implemented
/**
 * @openapi
 * tags:
 *   - name: Participants
 *     description: Participant management
 */

const router = Router();

/**
 * @openapi
 * /participants:
 *   get:
 *     tags:
 *       - Participants
 *     name: Get All Participants
 *     description: Fetch participant list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of participants was successfully retrieved.
 *       500:
 *         description: Error retrieving participants.
 */
router.get('/', async (req, res) => {
	logger.info('GET /participants');
	try {
		const participants = await getParticipants();
		res.status(200).send({ participants });
	} catch (error) {
		res.status(500).send({ error: 'Error retrieving participants' });
	}
});

/**
 * @openapi
 * /participants/{participantId}:
 *   get:
 *     tags:
 *       - Participants
 *     name: Get Participant by ID
 *     description: Fetch one participant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         description: Participant ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The participant was successfully retrieved.
 *       500:
 *         description: Error retrieving participant.
 */
router.get('/:participantId', async (req, res) => {
	logger.info('GET /participants/:participantId');
	const { participantId } = req.params;
	// TODO: add validation
	try {
		const participant = await getParticipant(participantId);
		res.status(200).send({ participant });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving participant' });
	}
});

/**
 * @openapi
 * /participants/:
 *   post:
 *     tags:
 *       - Participants
 *     name: Create Participant
 *     description: Create one participant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PICreateParticipantRequest'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PICreateParticipantResponse'
 *       400:
 *         description: RequestValidationError - The request body was invalid.
 *       409:
 *         description: ConflictError - The request failed because it conflicts with data that already exists.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.post(
	'/',
	withRequestValidation(PICreateParticipantRequest, async (req, res) => {
		try {
			const { dateOfBirth } = req.body;
			const parsedDateOfBirth = new Date(dateOfBirth);
			const participant = await createParticipant({
				...req.body,
				dateOfBirth: parsedDateOfBirth,
				hasOhip: req.body.hasOhip === undefined ? true : req.body.hasOhip,
			});
			switch (participant.status) {
				case 'SUCCESS': {
					return res.status(201).json(participant.data);
				}
				case 'PARTICIPANT_EXISTS': {
					return res.status(409).json(ConflictErrorResponse(participant.message));
				}
				case 'SYSTEM_ERROR': {
					return res.status(500).json(ServerErrorResponse(participant.message));
				}
			}
		} catch (error) {
			logger.error(
				'POST /participants',
				`Unexpected error handling create participant request.`,
				error,
			);
			return res.status(500).json(ServerErrorResponse());
		}
	}),
);

/**
 * @openapi
 * /participants/{participantId}:
 *   delete:
 *     tags:
 *       - Participants
 *     produces: application/json
 *     name: Delete Participant
 *     description: Deletes a participant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         required: true
 *         description: ID of the participant to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: NotFoundError - The requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.delete('/:participantId', async (req, res) => {
	try {
		const { participantId } = req.params;
		const participant = await deleteParticipant(participantId);
		switch (participant.status) {
			case 'SUCCESS': {
				return res.status(200).json(participant.data);
			}
			case 'PARTICIPANT_DOES_NOT_EXIST': {
				return res.status(404).json(NotFoundErrorResponse(participant.message));
			}
			case 'SYSTEM_ERROR': {
				return res.status(500).json(ServerErrorResponse(participant.message));
			}
		}
	} catch (error) {
		logger.error(
			'DELETE /participants',
			'Unexpected error handling delete participant request',
			error,
		);
		return res.status(500).json(ServerErrorResponse());
	}
});

/**
 * @openapi
 * /participants/{participantId}:
 *   patch:
 *     tags:
 *       - Participants
 *     name: Update Participant
 *     description: Update participant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         description: Participant ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inviteId:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               emailAddress:
 *                 type: string
 *                 format: email
 *               participantOhipFirstName:
 *                 type: string
 *               participantOhipLastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               participantOhipMiddleName:
 *                 type: string
 *               participantPreferredName:
 *                 type: string
 *               guardianName:
 *                 type: string
 *               guardianPhoneNumber:
 *                 type: string
 *               guardianEmailAddress:
 *                 type: string
 *               guardianRelationship:
 *                 type: string
 *               mailingAddressStreet:
 *                 type: string
 *               mailingAddressCity:
 *                 type: string
 *               mailingAddressProvince:
 *                 type: string
 *               mailingAddressPostalCode:
 *                 type: string
 *               residentialPostalCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: The participant was successfully updated.
 *       500:
 *         description: Error updating participant.
 */
router.patch('/:participantId', async (req, res) => {
	logger.info('PATCH /participants/:participantId');
	const { participantId } = req.params;
	const {
		inviteId,
		dateOfBirth,
		participantEmailAddress,
		participantOhipFirstName,
		participantOhipLastName,
		participantOhipMiddleName,
		participantPhoneNumber,
		participantPreferredName,
		guardianName,
		guardianPhoneNumber,
		guardianEmailAddress,
		guardianRelationship,
		mailingAddressStreet,
		mailingAddressCity,
		mailingAddressProvince,
		mailingAddressPostalCode,
		residentialPostalCode,
	} = req.body;
	// TODO: add validation
	try {
		const parsedDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : undefined;
		const participant = await updateParticipant({
			participantId,
			inviteId,
			dateOfBirth: parsedDateOfBirth,
			participantEmailAddress,
			participantOhipFirstName,
			participantOhipLastName,
			participantOhipMiddleName,
			participantPhoneNumber,
			participantPreferredName,
			guardianName,
			guardianPhoneNumber,
			guardianEmailAddress,
			guardianRelationship,
			mailingAddressStreet,
			mailingAddressCity,
			mailingAddressProvince,
			mailingAddressPostalCode,
			residentialPostalCode,
		});
		res.status(200).send({ participant });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error updating participant' });
	}
});

export default router;
