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
import { ParticipantResponsesRequest } from 'types/entities';
import {
	NotFoundErrorResponse,
	RequestValidationErrorResponse,
	ServerErrorResponse,
} from 'types/httpResponses';

import { getParticipantResponses } from '../services/search.js';
import { createParticipantResponse } from '../services/create.js';
import logger from '../logger.js';

/**
 * @openapi
 * tags:
 *   - name: Participant Responses
 *     description: Participant response management
 */

const router = Router();

/**
 * @openapi
 * /participant-responses/{participantId}/{consentQuestionId}:
 *   get:
 *     tags:
 *       - Participant Responses
 *     produces: application/json
 *     name: Get Participant Responses
 *     description: Fetches list of Participant Responses by Consent Question ID and Participant ID sorted by submittedAt date
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         description: Participant ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: consentQuestionId
 *         in: path
 *         description: Consent Question ID
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ConsentQuestionId'
 *       - name: sortOrder
 *         in: query
 *         description: sorts responses by submittedAt date, defaults to descending
 *         schema:
 *           $ref: '#/components/schemas/SortOrder'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ParticipantResponseArray'
 *       400:
 *         description: RequestValidationError - Invalid request.
 *       404:
 *         description: NotFoundError - That requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/:participantId/:consentQuestionId', async (req, res) => {
	try {
		const { participantId, consentQuestionId } = req.params;
		const { sortOrder } = req.query;

		const request = ParticipantResponsesRequest.safeParse({
			participantId,
			consentQuestionId,
			sortOrder,
		});

		if (!request.success) {
			logger.error(
				'GET /:participantId/:consentQuestionId',
				'Received invalid request fetching participant response',
				request.error.format(),
			);
			return res.status(400).json(RequestValidationErrorResponse(request.error));
		}

		const participantResponses = await getParticipantResponses(request.data);

		switch (participantResponses.status) {
			case 'SUCCESS': {
				return res.status(200).json(participantResponses.data);
			}
			case 'PARTICIPANT_DOES_NOT_EXIST': {
				return res.status(404).json(NotFoundErrorResponse(participantResponses.message));
			}
			case 'SYSTEM_ERROR': {
				return res.status(500).json(ServerErrorResponse(participantResponses.message));
			}
		}
	} catch (error) {
		logger.error(
			'GET /:participantId/:consentQuestionId',
			'Unexpected error retrieving participant response',
			error,
		);
		return res.status(500).json(ServerErrorResponse());
	}
});

/**
 * @openapi
 * /participant-responses:
 *   post:
 *     tags:
 *       - Participant Responses
 *     produces: application/json
 *     name: Create Participant Response
 *     description: Create a new participant response
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participantId:
 *                 type: string
 *               consentQuestionId:
 *                 $ref: '#/components/schemas/ConsentQuestionId'
 *               response:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: The participant response was successfully created.
 *       500:
 *         description: Error creating participant response.
 */
router.post('/', async (req, res) => {
	logger.info('POST /participant-responses');
	const { participantId, consentQuestionId, response } = req.body;
	// TODO: add validation
	try {
		const participant_response = await createParticipantResponse({
			participantId,
			consentQuestionId,
			response,
		});
		res.status(201).send({ participant_response });
	} catch (error) {
		logger.error(error);
		res.status(500).json(ServerErrorResponse('Error creating participant response'));
	}
});

export default router;
