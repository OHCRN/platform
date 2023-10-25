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

import { NanoId } from 'types/entities';

import { ClinicalProfile, Ohip, PrismaClient } from './generated/client/index.js';
import logger from './logger.js';

logger.info('Initializing prismaClient.ts');

const prisma = new PrismaClient().$extends({
	query: {
		ohip: {
			async create({ args, query }) {
				try {
					const validOhipPrivateKey = NanoId.parse(args.data.ohipPrivateKey);
					args.data = {
						...args.data,
						ohipPrivateKey: validOhipPrivateKey,
					};
					return query(args);
				} catch (e) {
					// TODO: specify error when custom Error types are implemented
					throw new Error('Invalid ohip private key provided');
				}
			},
		},
		clinicalProfile: {
			async create({ args, query }) {
				try {
					const validClinicalProfilePrivateKey = NanoId.parse(args.data.clinicalProfilePrivateKey);
					args.data = {
						...args.data,
						clinicalProfilePrivateKey: validClinicalProfilePrivateKey,
					};
					return query(args);
				} catch (e) {
					// TODO: specify error when custom Error types are implemented
					throw new Error('Invalid clinical profile private key provided');
				}
			},
		},
	},
});

export { ClinicalProfile, Ohip };
export default prisma;
