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

import { Prisma } from '../generated/client';
import { getParticipantResponses } from '../service/search';
import { createParticipantResponse } from '../service/create';
import logger from '../logger';

// TODO: update JSDoc comments
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
 *     description: Fetches list of Participant Responses by Consent Question ID and Participant ID, sorted by submittedAt date (defaults descending)
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
 *           type: string
 *     responses:
 *       200:
 *         description: The participant responses were successfully retrieved.
 *       500:
 *         description: Could not retrieve participant responses.
 */
router.get('/:participantId/:consentQuestionId', async (req, res) => {
	logger.info('GET /participant-responses/:participantId/:consentQuestionId');
	const { participantId, consentQuestionId } = req.params;
	const { sort_order } = req.query;

	try {
		const participant_responses = await getParticipantResponses(
			participantId,
			consentQuestionId,
			sort_order as Prisma.SortOrder | undefined,
		);
		res.status(200).send({ participant_responses });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving participant responses' });
	}
});

// TODO: update JSDoc comments
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
 *                 type: string
 *               response:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: The participant response was successfully created.
 *       500:
 *         description: Unable to create participant response.
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
		res.status(500).send({ error: 'Error creating participant response' });
	}
});

export default router;
