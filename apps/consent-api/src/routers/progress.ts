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
import { ConsentWizardProgress } from 'types/entities';

import logger from '../logger.js';

const router = Router();

/**
 * @openapi
 * /wizard/progress:
 *   get:
 *     tags:
 *       - Consent Wizard
 *     name: Consent Wizard Progress
 *     description: Get status of user's progress in consent wizard
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
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: '#/components/schemas/ConsentWizardProgress'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	logger.info(`GET /wizard/progress`);
	// TODO: implement
	const status: ConsentWizardProgress = {
		INFORMED_CONSENT: 'COMPLETE',
		CONSENT_RELEASE_DATA: 'COMPLETE',
		CONSENT_RESEARCH_PARTICIPATION: 'COMPLETE',
		CONSENT_RECONTACT: 'COMPLETE',
		CONSENT_REVIEW_SIGN: 'COMPLETE',
	};
	res.status(200).send({ status });
});

export default router;
