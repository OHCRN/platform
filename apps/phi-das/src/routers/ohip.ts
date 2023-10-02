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

import { getOhipNumber, getOhipNumbers } from '../service/search';
import { createOhipNumber } from '../service/create';
import logger from '../logger';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: OHIP
 *     description: OHIP data management
 */

// TODO: add proper JSDoc comments
router.get('/', async (req, res) => {
	logger.info('GET /ohip');
	// TODO: add error handling
	const ohipData = await getOhipNumbers();
	res.send({ ohipData: [ohipData] });
});

// TODO: add proper JSDoc comments
router.get('/:ohipPrivateKey', async (req, res) => {
	logger.info('GET /ohip/:ohipPrivateKey');
	const { ohipPrivateKey } = req.params;
	// TODO: add validation
	try {
		const ohipData = await getOhipNumber(ohipPrivateKey);
		res.status(200).send({ ohipData });
	} catch (error) {
		logger.error(error);
		res.status(404).send({ error: 'OHIP Key not found' });
	}
});

// TODO: add proper JSDoc comments
router.post('/', async (req, res) => {
	logger.info('POST /ohip');
	const { ohipPrivateKey, ohipNumber } = req.body;
	// TODO: add validation
	try {
		const ohipData = await createOhipNumber({ ohipPrivateKey, ohipNumber });
		res.status(201).send({ ohipData });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error creating OHIP Data' });
	}
});

export default router;
