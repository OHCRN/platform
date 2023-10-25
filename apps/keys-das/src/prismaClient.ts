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
import { NANOID_LENGTH, NanoId } from 'types/entities';
import { ID_ALPHABET } from 'types/services';

import { ClinicalProfileKey, OhipKey, PrismaClient } from './generated/client/index.js';
import logger from './logger.js';

logger.info('Initializing prismaClient.ts');
const nanoid = customAlphabet(ID_ALPHABET, NANOID_LENGTH);

const prisma = new PrismaClient().$extends({
	query: {
		ohipKey: {
			async create({ args, query }) {
				try {
					const validPrivateKey = args.data.ohipPrivateKey
						? NanoId.parse(args.data.ohipPrivateKey)
						: nanoid();
					args.data = {
						...args.data,
						ohipPrivateKey: validPrivateKey,
					};
					return query(args);
				} catch (e) {
					// TODO: specify error when custom Error types are implemented
					const message = 'Invalid key provided';
					logger.error(`${message}: ${e}`);
					throw new Error(message);
				}
			},
		},
		clinicalProfileKey: {
			async create({ args, query }) {
				try {
					const validPrivateKey = args.data.clinicalProfilePrivateKey
						? NanoId.parse(args.data.clinicalProfilePrivateKey)
						: nanoid();
					args.data = {
						...args.data,
						clinicalProfilePrivateKey: validPrivateKey,
					};
					return query(args);
				} catch (e) {
					// TODO: specify error when custom Error types are implemented
					const message = 'Invalid key provided';
					logger.error(`${message}: ${e}`);
					throw new Error(message);
				}
			},
		},
	},
});

export { ClinicalProfileKey, OhipKey };
export default prisma;
