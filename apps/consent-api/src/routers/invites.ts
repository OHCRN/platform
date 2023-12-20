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
import withRequestValidation from 'express-request-validation';
import { ClinicianInviteRequest, NanoId } from 'types/entities';
import {
	ConflictErrorResponse,
	NotFoundErrorResponse,
	RequestValidationErrorResponse,
	ServerErrorResponse,
} from 'types/httpResponses';
import { z } from 'zod';

import { recaptchaMiddleware } from '../middleware/recaptcha.js';
import { createInvite } from '../services/create.js';
import logger from '../logger.js';
import { getInvite } from '../services/search.js';

/**
 * @openapi
 * tags:
 *   - name: Clinician Invites
 *     description: Clinician invites management
 */

const router = Router();

const ClinicianInviteSchema = z.object({ data: ClinicianInviteRequest });
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
 *                 $ref: '#/components/schemas/ClinicianInviteRequest'
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClinicianInviteResponse'
 *       400:
 *         description: RequestValidationError - The request body was invalid.
 *       409:
 *         description: ConflictError - That request could not be made because it conflicts with data that already exists.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.post(
	'/',
	recaptchaMiddleware,
	withRequestValidation(ClinicianInviteSchema, async (req, res) => {
		try {
			const invite = await createInvite(req.body.data);
			switch (invite.status) {
				case 'SUCCESS': {
					return res.status(201).json(invite.data);
				}
				case 'SYSTEM_ERROR': {
					return res.status(500).json(ServerErrorResponse(invite.message));
				}
				case 'INVITE_EXISTS': {
					return res.status(409).json(ConflictErrorResponse(invite.message));
				}
			}
		} catch (error) {
			logger.error('POST /invites', `Unexpected error handling create invite request.`, error);
			return res.status(500).json(ServerErrorResponse());
		}
	}),
);

/**
 * @openapi
 * /invites:
 *   get:
 *     tags:
 *       - Clinician Invites
 *     name: Get Clinician Invite
 *     description: Get relevant Clinician Invite data from PI DAS and Consent DAS
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: inviteId
 *        in: path
 *        description: Invite ID
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClinicianInviteResponse'
 *       400:
 *         description: RequestValidationError - The request parameter was invalid.
 *       404:
 *         description: NotFoundError - The requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/:inviteId', async (req, res) => {
	try {
		const requestInviteId = NanoId.safeParse(req.params.inviteId);

		if (!requestInviteId.success) {
			logger.error('GET /invites/:inviteId', 'Received invalid inviteId', requestInviteId.error);
			return res.status(400).json(RequestValidationErrorResponse(requestInviteId.error));
		}
		const invite = await getInvite(requestInviteId.data);

		switch (invite.status) {
			case 'SUCCESS': {
				return res.status(200).json(invite.data);
			}
			case 'INVITE_DOES_NOT_EXIST': {
				return res.status(404).json(NotFoundErrorResponse(invite.message));
			}
			case 'SYSTEM_ERROR': {
				return res.status(500).json(ServerErrorResponse(invite.message));
			}
		}
	} catch (error) {
		logger.error('GET /invites/:inviteId', `Unexpected error handling get invite request.`, error);
		return res.status(500).json(ServerErrorResponse());
	}
});

export default router;
