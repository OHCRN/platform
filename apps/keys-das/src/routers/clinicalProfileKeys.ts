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

import { getClinicalProfileKey, getClinicalProfileKeys } from '../service/search.js';
import { createClinicalProfileKey } from '../service/create.js';
import logger from '../logger.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Clinical Profile Keys
 *     description: Clinical Profile Key management
 */

/**
 * @openapi
 * /clinical-profile-keys:
 *   get:
 *     tags:
 *       - Clinical Profile Keys
 *     name: Get Clinical Profile Keys
 *     description: Fetch clinical profile keys list.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clinical profile keys retrieved successfully.
 *       500:
 *         description: Error retrieving clinical profile keys.
 */
router.get('/', async (req, res) => {
	logger.info('GET /clinical-profile-keys');
	try {
		const clinicalProfileKeys = await getClinicalProfileKeys();
		res.status(200).send({ clinicalProfileKeys });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinical profile keys' });
	}
});

/**
 * @openapi
 * /clinical-profile-keys/{participantId}:
 *   get:
 *     tags:
 *       - Clinical Profile Keys
 *     name: Get Clinical Profile Key by Participant ID
 *     description: Fetch clinical profile key for a specific participant.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         description: Participant's ID.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clinical profile key retrieved successfully.
 *       500:
 *         description: Error retrieving clinical profile key.
 */
router.get('/:participantId', async (req, res) => {
	logger.info('GET /clinical-profile-keys/:participantId');
	const { participantId } = req.params;
	// TODO: add validation
	try {
		const clinicalProfileKey = await getClinicalProfileKey(participantId);
		res.status(200).send({ clinicalProfileKey });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinical profile key' });
	}
});

/**
 * @openapi
 * /clinical-profile-keys:
 *   post:
 *     tags:
 *       - Clinical Profile Keys
 *     name: Create Clinical Profile Key
 *     description: Create a clinical profile key for a participant.
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
 *     responses:
 *       201:
 *         description: Clinical profile key created successfully.
 *       500:
 *         description: Error creating clinical profile key.
 */
router.post('/', async (req, res) => {
	logger.info('POST /clinical-profile-keys');
	const { participantId } = req.body;
	// TODO: add validation
	try {
		const clinicalProfileKey = await createClinicalProfileKey({ participantId });
		res.status(201).send({ clinicalProfileKey });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating clinical profile key' });
	}
});

export default router;
