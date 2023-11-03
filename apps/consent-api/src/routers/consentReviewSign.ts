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

import logger from '../logger.js';

const router = Router();

/**
 * @openapi
 * /wizard/steps/review-sign:
 *   get:
 *     tags:
 *       - Consent Wizard
 *     name: Retrieve Review & Sign
 *     description: Participant's latest response for Consent Wizard - Review & Sign
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: session
 *         in: header
 *         required: true
 *         description: User session token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsentReviewSignResponse'
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	logger.info(`GET /wizard/steps/review-sign`);
	// TODO: implement when auth layer is ready
	try {
		logger.info(`Retrieved informed consent`);
		// TODO: retrieve user data
		const data = {};
		res.status(200).send(data);
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});

export default router;

/**
 * @openapi
 * /wizard/steps/review-sign:
 *   post:
 *     tags:
 *       - Consent Wizard
 *     name: Submit Review & Sign
 *     description: Form submission for Consent Wizard - Review & Sign
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: session
 *         in: header
 *         required: true
 *         description: User session token
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
	logger.info(`POST /wizard/steps/review-sign`);
	// TODO: implement when auth layer is ready
	try {
		logger.info(`Submitted informed consent`);
		// TODO: update participant status to consented
		res.status(201).send({ message: 'Success!' });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ message: 'Server error' });
	}
});
