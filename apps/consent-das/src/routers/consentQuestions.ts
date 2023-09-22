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

import { ConsentCategory } from '../prismaClient';
import { updateConsentQuestionIsActive } from '../service/update';
import { getConsentQuestion, getConsentQuestions } from '../service/search';
import { createConsentQuestion } from '../service/create';
import logger from '../logger';

// TODO: update JSDoc comments
/**
 * @openapi
 * tags:
 *   - name: Consent Questions
 *     description: Consent Questions management
 */

const router = Router();

// TODO: update JSDoc comments
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
 *            type: Enum
 *            enum: [INFORMED_CONSENT, CONSENT_RELEASE_DATA, CONSENT_RESEARCH_PARTICIPATION, CONSENT_RECONTACT, CONSENT_REVIEW_SIGN]
 *     responses:
 *       200:
 *         description: The list of questions was successfully retrieved.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.get('/', async (req, res) => {
	logger.info('GET /consent-questions');
	const { category } = req.query;
	// TODO: add error handling
	const questions = await getConsentQuestions((category as ConsentCategory) || undefined);
	res.send({ questions });
});

// TODO: update JSDoc comments
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
	logger.info('GET /consent-questions/:id');
	const { id } = req.params;
	// TODO: add validation
	try {
		const question = await getConsentQuestion(id);
		res.status(200).send({ question });
	} catch (error) {
		logger.error(error);
		res.status(404).send({ error: 'Consent question not found' });
	}
});

// TODO: update JSDoc comments
/**
 * @openapi
 * /consent-questions/:
 *   post:
 *     tags:
 *       - Consent Questions
 *     name: Create Consent Question
 *     description: Create one consent question
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The question was successfully created.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.post('/', async (req, res) => {
	logger.info('POST /consent-questions');
	const { id, isActive, category } = req.body;
	// TODO: add validation
	try {
		const question = await createConsentQuestion({ id, isActive, category });
		res.status(201).send({ question });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating consent question' });
	}
});

// TODO: update JSDoc comments
/**
 * @openapi
 * /consent-questions/:id:
 *   patch:
 *     tags:
 *       - Consent Questions
 *     name: Create Consent Question
 *     description: Update consent question's isActive field by ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The question's isActive field was successfully updated.
 *       401:
 *         description: Unauthorized. Authorization information is missing or invalid.
 *       403:
 *         description: Forbidden. Provided Authorization token is valid but has insufficient permissions to make this request.
 */
router.patch('/:id', async (req, res) => {
	logger.info('PATCH /consent-questions/:id');
	const { id } = req.params;
	const { isActive } = req.body;
	// TODO: add validation
	try {
		const question = await updateConsentQuestionIsActive({ id, isActive });
		res.status(201).send({ question });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error updating consent question active state' });
	}
});

export default router;
