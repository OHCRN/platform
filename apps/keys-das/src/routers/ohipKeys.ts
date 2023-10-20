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

import { getOhipKey, getOhipKeys } from '../service/search.js';
import { createOhipKey } from '../service/create.js';
import logger from '../logger.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: OHIP Keys
 *     description: OHIP Key management
 */

/**
 * @openapi
 * /ohip-keys:
 *   get:
 *     tags:
 *       - OHIP Keys
 *     name: Get OHIP Keys
 *     description: Fetch OHIP keys list.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OHIP keys retrieved successfully.
 *       500:
 *         description: Error retrieving OHIP keys.
 */
router.get('/', async (req, res) => {
	logger.info('GET /ohip-keys');
	try {
		const ohipKeys = await getOhipKeys();
		res.status(200).send({ ohipKeys });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving OHIP keys' });
	}
});

/**
 * @openapi
 * /ohip-keys/{participantId}:
 *   get:
 *     tags:
 *       - OHIP Keys
 *     name: Get OHIP Key by Participant ID
 *     description: Fetch OHIP key for a specific participant.
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
 *         description: OHIP key retrieved successfully.
 *       500:
 *         description: Error retrieving OHIP key.
 */
router.get('/:participantId', async (req, res) => {
	logger.info('GET /ohip-keys/:participantId');
	const { participantId } = req.params;
	// TODO: add validation
	try {
		const ohipKey = await getOhipKey(participantId);
		res.status(200).send({ ohipKey });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving OHIP key' });
	}
});

/**
 * @openapi
 * /ohip-keys:
 *   post:
 *     tags:
 *       - OHIP Keys
 *     name: Create OHIP Key
 *     description: Create an OHIP key for a participant.
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
 *         description: OHIP key created successfully.
 *       500:
 *         description: Error creating OHIP key.
 */
router.post('/', async (req, res) => {
	logger.info('POST /ohip-keys');
	const { participantId, ohipPrivateKey } = req.body;
	// TODO: add validation
	try {
		const ohipKey = await createOhipKey({ participantId, ohipPrivateKey });
		res.status(201).send({ ohipKey });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating OHIP Key' });
	}
});

export default router;
