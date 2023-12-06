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
import { DeleteClinicianInviteRequest, PIClinicianInviteRequest } from 'types/entities';
import {
	ConflictErrorResponse,
	ErrorName,
	ErrorResponse,
	NotFoundErrorResponse,
} from 'types/httpResponses';

import { getClinicianInvite, getClinicianInvites } from '../service/search.js';
import { createClinicianInvite } from '../service/create.js';
import { deleteClinicianInvite } from '../service/delete.js';
import logger from '../logger.js';

const { SERVER_ERROR } = ErrorName;

// TODO: update JSDoc comments when custom error handling is implemented
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
 *     description: Fetch clinician invites list
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
		const invites = await getClinicianInvites();
		res.status(200).send({ invites });
	} catch (error) {
		res.status(500).send({ error: 'Error retrieving clinician invites' });
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
 *         description: The clinician invite was successfully retrieved.
 *       500:
 *         description: Error retrieving clinician invite.
 */
router.get('/:inviteId', async (req, res) => {
	logger.info('GET /clinician-invites/:inviteId');
	const { inviteId } = req.params;
	// TODO: add validation
	try {
		const invite = await getClinicianInvite(inviteId);
		res.status(200).send({ invite });
	} catch (error) {
		logger.error(error);
		res.status(500).send({ error: 'Error retrieving clinician invite' });
	}
});

/**
 * @openapi
 * /clinician-invites/:
 *   post:
 *     tags:
 *       - Clinician Invites
 *     name: Create Clinician Invite
 *     description: Create one clinician invite
 *     security:
 *       - bearerAuth: []
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
	withRequestValidation(PIClinicianInviteRequest, async (req, res) => {
		try {
			const invite = await createClinicianInvite(req.body);
			switch (invite.status) {
				case 'SUCCESS': {
					return res.status(201).json(invite.data);
				}
				case 'SYSTEM_ERROR': {
					return res.status(500).json(ErrorResponse(SERVER_ERROR, invite.message));
				}
				case 'INVITE_EXISTS': {
					return res.status(409).json(ConflictErrorResponse(invite.message));
				}
			}
		} catch (error) {
			logger.error('POST /invites', `Unexpected error handling create invite request.`, error);
			return res.status(500).send(ErrorResponse(SERVER_ERROR, 'An unexpected error occurred'));
		}
	}),
);

/**
 * @openapi
 * /clinician-invites:
 *   delete:
 *     tags:
 *       - Clinician Invites
 *     produces: application/json
 *     name: Delete Clinician Invite
 *     description: Deletes a clinician invite
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteClinicianInviteRequest'
 *     responses:
 *       201:
 *         description: OK
 *       400:
 *         description: RequestValidationError - The request body was invalid.
 *       404:
 *         description: NotFoundError - That requested data could not be found.
 *       500:
 *         description: ServerError - An unexpected error occurred.
 */
router.delete(
	'/',
	withRequestValidation(DeleteClinicianInviteRequest, async (req, res) => {
		try {
			const invite = await deleteClinicianInvite(req.body);
			switch (invite.status) {
				case 'SUCCESS': {
					return res.status(201).json(invite.data);
				}
				case 'SYSTEM_ERROR': {
					return res.status(500).json(ErrorResponse(SERVER_ERROR, invite.message));
				}
				case 'INVITE_DOES_NOT_EXIST': {
					return res.status(404).json(NotFoundErrorResponse(invite.message));
				}
			}
		} catch (error) {
			logger.error('POST /invites', 'Unexpected error handling create invite request', error);
			return res.status(500).send(ErrorResponse(SERVER_ERROR, 'An unexpected error occurred.'));
		}
	}),
);

export default router;
