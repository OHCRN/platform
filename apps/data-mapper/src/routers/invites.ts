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
import withRequestValidation from 'express-request-validation';
import { ClinicianInviteRequest } from 'types/entities';
import {
	ConflictErrorResponse,
	ErrorName,
	ErrorResponse,
	NotFoundErrorResponse,
} from 'types/httpResponses';

import logger from '../logger.js';
import { createInvite } from '../services/create.js';
import { getInvite } from '../services/search.js';

const { SERVER_ERROR } = ErrorName;

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Clinician Invites
 *     description: Clinician invites management
 */

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
 *       404:
 *         description: NotFoundError - The requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/:inviteId', async (req, res) => {
	try {
		const { inviteId } = req.params;
		const invite = await getInvite(inviteId);
		switch (invite.status) {
			case 'SUCCESS': {
				return res.status(200).json(invite.data);
			}
			case 'INVITE_DOES_NOT_EXIST': {
				return res.status(404).json(NotFoundErrorResponse(invite.message));
			}
			case 'SYSTEM_ERROR': {
				return res.status(500).json(ErrorResponse(SERVER_ERROR, invite.message));
			}
		}
	} catch (error) {
		logger.error('GET /invites/:inviteId', `Unexpected error handling get invite request.`, error);
		return res.status(500).send(ErrorResponse(SERVER_ERROR, 'An unexpected error occurred'));
	}
});

/**
 * @openapi
 * /invites:
 *   post:
 *     tags:
 *       - Clinician Invites
 *     name: Create Clinician Invite
 *     description: Submit relevant Clinician Invite data to PI DAS and Consent DAS
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClinicianInviteRequest'
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
	withRequestValidation(ClinicianInviteRequest, async (req, res) => {
		try {
			const invite = await createInvite(req.body);
			switch (invite.status) {
				case 'SUCCESS': {
					return res.status(201).json(invite.data);
				}
				case 'INVITE_EXISTS': {
					return res.status(409).json(ConflictErrorResponse(invite.message));
				}
				case 'SYSTEM_ERROR': {
					return res.status(500).json(ErrorResponse(SERVER_ERROR, invite.message));
				}
			}
		} catch (error) {
			logger.error('POST /invites', `Unexpected error handling create invite request.`, error);
			return res.status(500).send(ErrorResponse(SERVER_ERROR, 'An unexpected error occurred'));
		}
	}),
);

export default router;
