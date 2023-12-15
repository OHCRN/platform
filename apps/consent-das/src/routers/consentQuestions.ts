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
import { ConsentQuestionId, ConsentQuestionsRequest } from 'types/entities';
import { ErrorName, ErrorResponse, RequestValidationErrorResponse } from 'types/httpResponses';

import { updateConsentQuestionIsActive } from '../services/update.js';
import { getConsentQuestion, getConsentQuestions } from '../services/search.js';
import { createConsentQuestion } from '../services/create.js';
import logger from '../logger.js';

const { SERVER_ERROR } = ErrorName;

/**
 * @openapi
 * tags:
 *   - name: Consent Questions
 *     description: Consent Questions management
 */

const router = Router();

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
 *           $ref: '#/components/schemas/ConsentCategory'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsentQuestionArray'
 *       400:
 *         description: RequestValidationError - The query parameter was invalid.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/', async (req, res) => {
	try {
		const queryParams = ConsentQuestionsRequest.safeParse(req.query);

		if (!queryParams.success) {
			logger.error(
				'GET /consent-questions',
				'Invalid consent category',
				queryParams.error.format(),
			);
			return res.status(400).json(RequestValidationErrorResponse(queryParams.error));
		}

		const consentQuestions = await getConsentQuestions(queryParams.data.category);

		switch (consentQuestions.status) {
			case 'SUCCESS': {
				return res.status(200).json(consentQuestions.data);
			}
			case 'SYSTEM_ERROR': {
				return res.status(500).json(ErrorResponse(SERVER_ERROR, consentQuestions.message));
			}
		}
	} catch (error) {
		logger.error('GET /consent-questions', 'Unexpected error retrieving consent questions', error);
		return res.status(500).send(ErrorResponse(SERVER_ERROR, 'An unexpected error occurred.'));
	}
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
 *       - name: consentQuestionId
 *         in: path
 *         description: Consent Question ID
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ConsentQuestionId'
 *     responses:
 *       200:
 *         description: The question was successfully retrieved.
 *       500:
 *         description: Error retrieving consent questions.
 */
router.get('/:consentQuestionId', async (req, res) => {
	logger.info('GET /consent-questions/:consentQuestionId');
	const { consentQuestionId } = req.params;
	// TODO: add validation
	try {
		const parsedConsentQuestionId = ConsentQuestionId.parse(consentQuestionId);
		const question = await getConsentQuestion(parsedConsentQuestionId);
		res.status(200).send({ question });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving consent questions' });
	}
});

/**
 * @openapi
 * /consent-questions:
 *   post:
 *     tags:
 *       - Consent Questions
 *     name: Create Consent Question
 *     description: Create one consent question
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               consentQuestionId:
 *                 $ref: '#/components/schemas/ConsentQuestionId'
 *               isActive:
 *                 type: boolean
 *               category:
 *                 $ref: '#/components/schemas/ConsentCategory'
 *     responses:
 *       201:
 *         description: The question was successfully created.
 *       500:
 *         description: Error creating consent question.
 */
router.post('/', async (req, res) => {
	logger.info('POST /consent-questions');
	const { consentQuestionId, isActive, category } = req.body;
	// TODO: add validation
	try {
		const question = await createConsentQuestion({ consentQuestionId, isActive, category });
		res.status(201).send({ question });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating consent question' });
	}
});

/**
 * @openapi
 * /consent-questions/{consentQuestionId}:
 *   patch:
 *     tags:
 *       - Consent Questions
 *     name: Update Consent Question
 *     description: Update consent question's isActive field by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: consentQuestionId
 *         in: path
 *         description: Consent Question ID
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/ConsentQuestionId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The question's isActive field was successfully updated.
 *       500:
 *         description: Error updating consent question active state.
 */
router.patch('/:consentQuestionId', async (req, res) => {
	logger.info('PATCH /consent-questions/:consentQuestionId');
	const { consentQuestionId } = req.params;
	const { isActive } = req.body;
	// TODO: add validation
	const parsedConsentQuestionId = ConsentQuestionId.parse(consentQuestionId);
	try {
		const question = await updateConsentQuestionIsActive({
			consentQuestionId: parsedConsentQuestionId,
			isActive,
		});
		res.status(200).send({ question });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error updating consent question active state' });
	}
});

export default router;
