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
import { ConsentQuestionId } from 'types/entities';

import logger from '../logger.js';

/**
 * @openapi
 * tags:
 *   - name: Consent Wizard
 *     description: Consent wizard management
 */

const router = Router();

/**
 * @openapi
 * /wizard/steps/informed-consent:
 *   post:
 *     tags:
 *       - Consent Wizard
 *       - Informed Consent
 *     name: Submit Informed Consent
 *     description: Form submission for Consent Wizard - Informed Consent
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 $ref: '#/components/schemas/InformedConsentRequest'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/InformedConsentResponse'
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
	logger.info(`POST /wizard/steps/informed-consent`);
	// TODO: implement when auth layer is ready
	try {
		logger.info(`Submitted informed consent`);
		res.status(201).send({ [ConsentQuestionId.enum.INFORMED_CONSENT__READ_AND_UNDERSTAND]: true });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

/**
 * @openapi
 * /wizard/steps/informed-consent:
 *   get:
 *     tags:
 *       - Consent Wizard
 *       - Informed Consent
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
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/InformedConsentResponse'
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	logger.info(`GET /wizard/steps/informed-consent`);
	// TODO: implement when auth layer is ready
	try {
		logger.info(`Retrieved informed consent`);
		res.status(200).send({ [ConsentQuestionId.enum.INFORMED_CONSENT__READ_AND_UNDERSTAND]: true });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

export default router;
