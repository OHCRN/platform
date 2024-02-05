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
import { CreateParticipantRequest } from 'types/dataMapper';
import { ConflictErrorResponse, ServerErrorResponse } from 'types/httpResponses';

import logger from '../logger.js';
import { getParticipant } from '../services/search.js';
import { createParticipant } from '../services/create.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Participants
 *     description: Participant management
 */

// TODO: add proper JSDoc comments
// get participant by id
router.get('/:participantId', async (req, res) => {
	logger.info('GET /participant/:participantId');
	const { participantId } = req.params;
	try {
		const participant = await getParticipant(participantId);
		res.status(200).send({ participant });
	} catch (error) {
		logger.error(error);
		res.status(404).send({ error: 'Participant not found' });
	}
});

/**
 * @openapi
 * /participants:
 *   post:
 *     tags:
 *       - Participants
 *     name: Create Participant
 *     description: Submit relevant Participant data to PI DAS and Consent DAS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateParticipantRequest'
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
	withRequestValidation(CreateParticipantRequest, async (req, res) => {
		try {
			const participant = await createParticipant(req.body);
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
