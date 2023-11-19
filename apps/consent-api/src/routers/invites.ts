/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
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
import { ClinicianInviteForm } from 'types/entities';
import { ErrorResponse } from 'types/httpErrors';
import { z } from 'zod';

import { recaptchaMiddleware } from '../middleware/recaptcha.js';
import withRequestBodyValidation from '../middleware/withRequestBodyValidation.js';

/**
 * @openapi
 * tags:
 *   - name: Clinician Invites
 *     description: Clinician invites management
 */

const router = Router();

const ClinicialInviteSchema = z.object({ data: ClinicianInviteForm });
/**
 * @openapi
 * /invites:
 *   post:
 *     tags:
 *       - Clinician Invites
 *     name: Submit Clinician Invite
 *     description: Form submission for Clinician Patient Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recaptchaToken:
 *                 type: string
 *               data:
 *                 $ref: '#/components/schemas/ClinicianInviteForm'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: string
 *       500:
 *         description: Server error
 */
router.post(
	'/',
	recaptchaMiddleware,
	withRequestBodyValidation(ClinicialInviteSchema, async (req, res) => {
		res.status(500).send(ErrorResponse('NOT_IMPLEMENTED', 'Route has not been implemented.'));
	}),
);

export default router;
