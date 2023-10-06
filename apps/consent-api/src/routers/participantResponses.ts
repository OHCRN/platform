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

import { createResponse } from '../service/participantResponses.js';

/**
 * @openapi
 * tags:
 *   - name: Participant Responses
 *     description: Participant response management
 */

const router = Router();

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
 *         description: The participant was successfully retrieved.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.post('/', async (req, res) => {
	const { participantId, consentQuestionId, response } = req.body;
	const result = await createResponse({
		consentQuestionId,
		participantId,
		response,
	});
	res.status(201).send(result);
});

export default router;
