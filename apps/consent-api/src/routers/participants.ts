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
import { ConflictErrorResponse, ServerErrorResponse } from 'types/httpResponses';
import { CreateParticipantRequest } from 'types/consentApi';
import { z } from 'zod';

import { recaptchaMiddleware } from '../middleware/recaptcha.js';
import { createParticipant } from '../services/create.js';
import logger from '../logger.js';
import {
	getLatestParticipantResponseByParticipantIdAndQuestionId,
	getParticipant,
	getParticipants,
} from '../services/search.js';

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
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.get('/', async (req, res) => {
	const participants = await getParticipants();
	return res.send({ participants: [participants] });
});

/**
 * @openapi
 * /participants/{id}:
 *   get:
 *     tags:
 *       - Participants
 *     name: Get Participant by ID
 *     description: Fetch one participant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Participant ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The participant was successfully retrieved.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const participant = await getParticipant(id);
		return res.status(200).send({ participant });
	} catch (error) {
		logger.error(error);
		return res.status(404).send({ error: 'Participant not found' });
	}
});

/**
 * @openapi
 * /participants/{id}/consent-questions/{consentQuestionId}:
 *   get:
 *     tags:
 *       - Participants
 *     name: Get Participant Response by Consent Question ID and Participant ID
 *     description: Fetch latest participant response
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Participant ID
 *        required: true
 *        schema:
 *          type: string
 *      - name: consentQuestionId
 *        in: path
 *        description: Consent question ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The latest response was successfully retrieved.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.get('/:id/consent-questions/:consentQuestionId', async (req, res) => {
	const { id, consentQuestionId } = req.params;
	const latestResponse = await getLatestParticipantResponseByParticipantIdAndQuestionId(
		id,
		consentQuestionId,
	);

	return res.status(200).send({ latestResponse });
});

const CreateParticipantRequestSchema = z.object({ data: CreateParticipantRequest });
/**
 * @openapi
 * /participants:
 *   post:
 *     tags:
 *       - Participants
 *     name: Create Participant
 *     description: Form submission for Participant Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recaptchaToken:
 *                 type: string
 *               data:
 *                 $ref: '#/components/schemas/CreateParticipantRequest'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateParticipantResponse'
 *       400:
 *         description: RequestValidationError - The request body was invalid.
 *       409:
 *         description: ConflictError - That request could not be made because it conflicts with data that already exists.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.post(
	'/',
	recaptchaMiddleware,
	withRequestValidation(CreateParticipantRequestSchema, async (req, res) => {
		try {
			const participant = await createParticipant(req.body.data);
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

export default router;
