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
import { ConsentResearchParticipationRequest, ZodError } from 'types/entities';

import logger from '../logger.js';

const router = Router();

/**
 * @openapi
 * /wizard/steps/consent-for-research-participation:
 *   post:
 *     tags:
 *       - Consent Wizard
 *     name: Submit Consent for Research Participation
 *     description: Form submission for Consent Wizard - Consent for Research Participation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsentResearchParticipationRequest'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsentResearchParticipationResponse'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
	// TODO: implement when auth layer is ready
	try {
		const data = ConsentResearchParticipationRequest.parse(req.body);
		// TODO: make updates and return modified data
		res.status(201).send(data);
	} catch (error) {
		logger.error(error);
		if (error instanceof ZodError) {
			res.status(400).send({ message: 'Bad Request' });
		} else {
			res.status(500).send({ message: 'Server error' });
		}
	}
});

/**
 * @openapi
 * /wizard/steps/consent-for-research-participation:
 *   get:
 *     tags:
 *       - Consent Wizard
 *     name: Retrieve Consent for Research Participation
 *     description: Participant's latest response for Consent Wizard - Consent for Research Participation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsentResearchParticipationResponse'
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	// TODO: implement when auth layer is ready
	try {
		// TODO: actually retrieve user data
		const data = {};
		res.status(200).send(data);
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

export default router;
