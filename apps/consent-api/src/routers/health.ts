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
import { Version } from 'common/src/service/Health';

import logger from '@/logger';

import { version } from '../../package.json';
/**
 * @openapi
 * tags:
 *   - name: Health
 *     description: Health check
 */

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     name: Check API Health
 *     description: Verify API is running
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
	// TODO: add real health check
	res.json({ message: `API is running.` });
});

/**
 * @openapi
 * /health/version:
 *   get:
 *     tags:
 *       - Health
 *     name: Check API version
 *     description: Fetch current API version from consent-api's `package.json`
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server error
 */
router.get('/version', async (req, res) => {
	logger.info(`GET /health/version`);
	const response: Version = { version };
	res.json(response);
});

export default router;
