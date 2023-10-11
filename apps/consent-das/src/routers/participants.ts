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

import { getParticipant, getParticipants } from '../service/search.js';
import { createParticipant } from '../service/create.js';
import logger from '../logger.js';

/**
 * @openapi
 * tags:
 *   - name: Participants
 *     description: Participant management
 */

const router = Router();

/**
 * @openapi
 * /participants:
 *   get:
 *     tags:
 *       - Participants
 *     name: Get All Participants
 *     description: Fetch participant list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of participants was successfully retrieved.
 *       500:
 *         description: Error retrieving participants.
 */
router.get('/', async (req, res) => {
	logger.info('GET /participants');
	try {
		const participants = await getParticipants();
		res.status(200).send({ participants });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving participants' });
	}
});

/**
 * @openapi
 * /participants/{participantId}:
 *   get:
 *     tags:
 *       - Participants
 *     name: Get Participant by ID
 *     description: Fetch one participant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: participantId
 *         in: path
 *         description: Participant ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The participant was successfully retrieved.
 *       500:
 *         description: Error retrieving participant.
 */
router.get('/:participantId', async (req, res) => {
	logger.info('GET /participants/:participantId');
	const { participantId } = req.params;
	// TODO: add validation
	try {
		const participant = await getParticipant(participantId);
		res.status(200).send({ participant });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving participant' });
	}
});

/**
 * @openapi
 * /participants:
 *   post:
 *     tags:
 *       - Participants
 *     produces: application/json
 *     name: Create Participant
 *     description: Create a new participant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailVerified:
 *                 type: boolean
 *               isGuardian:
 *                 type: boolean
 *               consentGroup:
 *                 type: string
 *                 enum:
 *                   - ADULT_CONSENT
 *                   - ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER
 *                   - GUARDIAN_CONSENT_OF_MINOR
 *                   - GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT
 *                   - YOUNG_ADULT_CONSENT
 *               guardianIdVerified:
 *                 type: boolean
 *             required:
 *               - emailVerified
 *               - isGuardian
 *     responses:
 *       201:
 *         description: The participant was successfully created.
 *       500:
 *         description: Error creating participant.
 */
router.post('/', async (req, res) => {
	logger.info('POST /participants');
	const { emailVerified, isGuardian, consentGroup, guardianIdVerified } = req.body;
	// TODO: add validation
	try {
		const participant = await createParticipant({
			emailVerified,
			isGuardian,
			consentGroup,
			guardianIdVerified,
		});
		res.status(201).send({ participant });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating participant' });
	}
});

export default router;
