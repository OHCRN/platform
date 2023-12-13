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
import { ErrorName, ErrorResponse, NotFoundErrorResponse } from 'types/httpResponses';

import logger from '../../logger.js';
import { getInformedConsentResponses } from '../../services/search.js';

const { SERVER_ERROR } = ErrorName;

const router = Router();

/**
 * @openapi
 * /wizard/steps/informed-consent:
 *   get:
 *     tags:
 *       - Consent Wizard
 *     name: Retrieve Informed Consent
 *     description: Participant's latest response for Consent Wizard - Informed Consent
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformedConsentResponse'
 *       404:
 *         description: NotFoundError - That requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/', async (req, res) => {
	try {
		const participantId = 'cllgostgz000008l3fk0w'; // TODO: get ID from session
		const participantResponses = await getInformedConsentResponses(participantId);

		switch (participantResponses.status) {
			case 'SUCCESS': {
				return res.status(200).json(participantResponses.data);
			}
			case 'PARTICIPANT_DOES_NOT_EXIST': {
				return res.status(404).json(NotFoundErrorResponse(participantResponses.message));
			}
			case 'SYSTEM_ERROR': {
				return res.status(500).json(ErrorResponse(SERVER_ERROR, participantResponses.message));
			}
		}
	} catch (error) {
		logger.error(
			'GET /wizard/steps/informed-consent',
			'Unexpected error handling get invite request',
			error,
		);
		return res.status(500).send(ErrorResponse(SERVER_ERROR, 'An unexpected error occurred.'));
	}
});

export default router;
