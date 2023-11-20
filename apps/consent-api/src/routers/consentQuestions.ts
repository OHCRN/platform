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

import {
	getConsentQuestion,
	getConsentQuestions,
	// getLatestParticipantResponseByParticipantIdAndQuestionId,
} from '../service/search.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Consent Questions
 *     description: Consent Questions management
 */

/**
 * @openapi
 * /consent-questions:
 *   get:
 *     tags:
 *       - Consent Questions
 *     name: Get All Consent Questions
 *     description: Fetch consent question list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Consent question category
 *         schema:
 *            type: string
 *            enum:
 *              - INFORMED_CONSENT
 *              - CONSENT_RELEASE_DATA
 *              - CONSENT_RESEARCH_PARTICIPATION
 *              - CONSENT_RECONTACT
 *              - CONSENT_REVIEW_SIGN
 *     responses:
 *       200:
 *         description: The list of questions was successfully retrieved.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.get('/', async (req, res) => {
	const searchParams = req.query;
	const consentQuestions = await getConsentQuestions(searchParams);
	return res.status(200).send(consentQuestions);
});

/**
 * @openapi
 * /consent-questions/{id}:
 *   get:
 *     tags:
 *       - Consent Questions
 *     name: Get Consent Question by ID
 *     description: Fetch one consent question
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Consent Question ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The question was successfully retrieved.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const consentQuestion = await getConsentQuestion(id);
		return res.status(200).send({ consentQuestion });
	} catch (error) {
		res.status(404).send('Consent Question not found');
	}
});

export default router;
