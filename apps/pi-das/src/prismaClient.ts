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

import { customAlphabet } from 'nanoid';
import { NANOID_LENGTH } from 'types/common';
import { ID_ALPHABET, NanoId } from 'types/entities';

import { ClinicianInvite, Participant, PrismaClient, Province } from './generated/client/index.js';
import serviceLogger from './logger.js';

const logger = serviceLogger.forModule('PrismaClient');

logger.info('Initializing prismaClient.ts');

const nanoid = customAlphabet(ID_ALPHABET, NANOID_LENGTH);

const prisma = new PrismaClient().$extends({
	query: {
		participant: {
			async create({ args, query }) {
				try {
					const validParticipantId = args.data.id ? NanoId.parse(args.data.id) : nanoid();
					args.data = {
						...args.data,
						id: validParticipantId,
					};
					return query(args);
				} catch (e) {
					// TODO: specify error when custom Error types are implemented
					const message = 'Invalid participant id provided';
					logger.error(`${message}: ${e}`);
					throw new Error(message);
				}
			},
		},
		clinicianInvite: {
			async create({ args, query }) {
				try {
					const validInviteId = args.data.id ? NanoId.parse(args.data.id) : nanoid();
					args.data = {
						...args.data,
						id: validInviteId,
					};
					return query(args);
				} catch (e) {
					// TODO: specify error when custom Error types are implemented
					const message = 'Invalid clinical invite id provided';
					logger.error(`${message}: ${e}`);
					throw new Error(message);
				}
			},
		},
	},
});

export { ClinicianInvite, Participant, Province };
export default prisma;
