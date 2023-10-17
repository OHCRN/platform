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

import { getClinicalProfile, getClinicalProfiles } from '../service/search.js';
import { createClinicalProfile } from '../service/create.js';
import logger from '../logger.js';

// TODO: update JSDoc comments
/**
 * @openapi
 * tags:
 *   - name: Clinical Profiles
 *     description: Clinical Profile management
 */

const router = Router();

// TODO: update JSDoc comments
/**
 * @openapi
 * /clinical-profiles:
 *   get:
 *     tags:
 *       - Clinical Profiles
 *     name: Get All Clinical Profiles
 *     description: Fetch clinical profiles list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of clinical profiles was successfully retrieved.
 *       500:
 *         description: Error retrieving clinical profiles.
 */
router.get('/', async (req, res) => {
	logger.info('GET /clinical-profiles');
	try {
		const profiles = await getClinicalProfiles();
		res.status(200).send({ profiles });
	} catch (error) {
		res.status(500).send({ error: 'Error retrieving clinical profiles' });
	}
});

// TODO: update JSDoc comments
/**
 * @openapi
 * /clinical-profiles/{clinicalProfilePrivateKey}:
 *   get:
 *     tags:
 *       - Clinical Profiles
 *     name: Get Clinical Profile by ID
 *     description: Fetch one clinical profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: clinicalProfilePrivateKey
 *        in: path
 *        description: Clinical Profile Private Key
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The clinical profile was successfully retrieved.
 *       500:
 *         description: Error retrieving clinical profile.
 */
router.get('/:clinicalProfilePrivateKey', async (req, res) => {
	logger.info('GET /clinical-profiles/:clinicalProfilePrivateKey');
	const { clinicalProfilePrivateKey } = req.params;
	// TODO: add validation
	try {
		const profile = await getClinicalProfile(clinicalProfilePrivateKey);
		res.status(200).send({ profile });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinical profile' });
	}
});

/**
 * @openapi
 * /clinical-profiles/:
 *   post:
 *     tags:
 *       - Clinical Profile
 *     name: Create Clinical Profile
 *     description: Create one clinical profile
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
 *                 required: true
 *               birthSex:
 *                 type: string
 *                 required: true
 *                 $ref: '#/components/schemas/BirthSex'
 *               gender:
 *                 type: string
 *                 $ref: '#/components/schemas/Gender'
 *               selfIdentifiedGender:
 *                 type: string
 *               ancestry:
 *                 type: string
 *                 required: true
 *                 $ref: '#/components/schemas/Ancestry'
 *               geneticsClinicVisited:
 *                 type: string
 *                 required: true
 *                 $ref: '#/components/schemas/GeneticsClinic'
 *               historyOfCancer:
 *                 type: boolean
 *                 required: true
 *               familyHistoryOfCancer:
 *                 type: boolean
 *                 required: true
 *     responses:
 *       201:
 *         description: The clinical profile was successfully created.
 *       500:
 *         description: Error creating clinical profile.
 */
router.post('/', async (req, res) => {
	logger.info('POST /clinical-profiles');
	const {
		participantId,
		birthSex,
		gender,
		selfIdentifiedGender,
		ancestry,
		geneticsClinicVisited,
		historyOfCancer,
		familyHistoryOfCancer,
	} = req.body;
	// TODO: add validation
	try {
		const profile = await createClinicalProfile({
			participantId,
			birthSex,
			gender,
			selfIdentifiedGender,
			ancestry,
			geneticsClinicVisited,
			historyOfCancer,
			familyHistoryOfCancer,
		});
		res.status(201).send({ profile });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating clinical profile' });
	}
});

export default router;
