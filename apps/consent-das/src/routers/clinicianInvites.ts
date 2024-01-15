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
import { ConsentClinicianInviteRequest } from 'types/consentDas';
import { NanoId } from 'types/entities';
import {
	ConflictErrorResponse,
	NotFoundErrorResponse,
	RequestValidationErrorResponse,
	ServerErrorResponse,
} from 'types/httpResponses';

import logger from '../logger.js';
import { createClinicianInvite } from '../services/create.js';
import { getClinicianInviteById, getClinicianInvites } from '../services/search.js';

/**
 * @openapi
 * tags:
 *   - name: Clinician Invites
 *     description: Clinician Invite management
 */

const router = Router();

/**
 * @openapi
 * /clinician-invites:
 *   get:
 *     tags:
 *       - Clinician Invites
 *     name: Get All Clinician Invites
 *     description: Fetch clinician invite list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of clinician invites was successfully retrieved.
 *       500:
 *         description: Error retrieving clinician invites.
 */
router.get('/', async (req, res) => {
	logger.info('GET /clinician-invites');
	try {
		const clinicianInvites = await getClinicianInvites();
		res.status(200).send({ clinicianInvites });
	} catch (error) {
		logger.error(error);
		res.status(500).json(ServerErrorResponse('Error retrieving clinician invites'));
	}
});

/**
 * @openapi
 * /clinician-invites/{inviteId}:
 *   get:
 *     tags:
 *       - Clinician Invites
 *     name: Get Clinician Invite by ID
 *     description: Fetch one clinician invite
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
 *         description: NotFoundError - That requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.get('/:inviteId', async (req, res) => {
	try {
		const requestInviteId = NanoId.safeParse(req.params.inviteId);

		if (!requestInviteId.success) {
			logger.error(
				'GET /clinician-invites/:inviteId',
				'Received invalid inviteId',
				requestInviteId.error,
			);
			return res.status(400).json(RequestValidationErrorResponse(requestInviteId.error));
		}

		const invite = await getClinicianInviteById(requestInviteId.data);

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
		logger.error(
			'GET /clinician-invites/:inviteId',
			'Unexpected error handling get invite request',
			error,
		);
		return res.status(500).json(ServerErrorResponse());
	}
});

/**
 * @openapi
 * /clinician-invites:
 *   post:
 *     tags:
 *       - Clinician Invites
 *     produces: application/json
 *     name: Create Clinician Invite
 *     description: Create a new clinician invite
 *     security:
 *       - bearerAuth: []
 *     requestBody:
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
	withRequestValidation(ConsentClinicianInviteRequest, async (req, res) => {
		try {
			const invite = await createClinicianInvite(req.body);
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
			logger.error('DELETE /invites', 'Unexpected error handling delete invite request', error);
			return res.status(500).json(ServerErrorResponse());
		}
	}),
);

export default router;
