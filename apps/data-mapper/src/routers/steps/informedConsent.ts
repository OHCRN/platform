/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
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
import {
	ErrorName,
	ErrorResponse,
	NotFoundErrorResponse,
	RequestValidationErrorResponse,
	ServerErrorResponse,
} from 'types/httpResponses';
import { NanoId } from 'types/entities';

import logger from '../../logger.js';
import { getInformedConsentResponses } from '../../services/search.js';

const { REQUEST_VALIDATION_ERROR } = ErrorName;

const ROUTER_PATH = '/wizard/steps/informed-consent';

const router = Router();

/**
 * @openapi
 * /wizard/steps/informed-consent/{participantId}:
 *   get:
 *     tags:
 *       - Consent Wizard
 *     name: Retrieve Informed Consent
 *     description: Participant's latest response for Consent Wizard - Informed Consent
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         description: Participant ID
 *         schema:
 *           $ref: '#/components/schemas/NanoId'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformedConsentResponse'
 *       400:
 *         description: RequestValidationError - The request parameters were invalid.
 *       404:
 *         description: NotFoundError - That requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/:participantId', async (req, res) => {
	try {
		const { participantId } = req.params;

		const requestParticipantId = NanoId.safeParse(participantId);

		if (!requestParticipantId.success) {
			logger.error(
				`GET ${ROUTER_PATH}/:participantId`,
				'Received invalid request fetching Informed Consent',
				requestParticipantId.error.format(),
			);
			return res.status(400).json(RequestValidationErrorResponse(requestParticipantId.error));
		}

		const participantResponses = await getInformedConsentResponses(requestParticipantId.data);

		switch (participantResponses.status) {
			case 'SUCCESS': {
				return res.status(200).json(participantResponses.data);
			}
			case 'INVALID_REQUEST': {
				return res
					.status(400)
					.json(ErrorResponse(REQUEST_VALIDATION_ERROR, participantResponses.message));
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
			`GET ${ROUTER_PATH}/:participantId`,
			'Unexpected error handling get Informed Consent request',
			error,
		);
		return res.status(500).json(ServerErrorResponse());
	}
});

export default router;
