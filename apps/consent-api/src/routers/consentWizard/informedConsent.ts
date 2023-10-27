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

import logger from '../../logger.js';

/**
 * @openapi
 * tags:
 *   - name: Consent Wizard - Informed Consent
 *     description: Informed Consent step in the Consent Wizard
 */

const router = Router();

/**
 * @openapi
 * /consent-wizard/informed-consent:
 *   post:
 *     tags:
 *       - Consent Wizard
 *       - Informed Consent
 *     name: Submit Informed Consent
 *     description: Form submission for Informed Consent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 $ref: '#/components/schemas/SubmitInformedConsent'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
	logger.info(`POST /consent-wizard/informed-consent`);
	// TODO: implement
	try {
		logger.info(`Completed informed consent`);
		res.status(201).send({ message: 'Success' });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

/**
 * @openapi
 * /consent-wizard/informed-consent:
 *   get:
 *     tags:
 *       - Consent Wizard
 *       - Informed Consent
 *     name: Retrieve Informed Consent
 *     description: Form response for Informed Consent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 $ref: '#/components/schemas/RetrieveInformedConsent'
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
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	logger.info(`GET /consent-wizard/informed-consent`);
	// TODO: implement
	try {
		logger.info(`Retrieved informed consent`);
		res.status(201).send({ completedInformedConsent: true });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

export default router;
