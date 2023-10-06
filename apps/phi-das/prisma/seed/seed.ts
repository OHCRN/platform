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

import { PrismaClient } from '../../src/generated/client';
import logger from '../../src/logger';

import { clinicalProfiles, ohipData } from './seed-data';

const prisma = new PrismaClient();

const seed = async () => {
	logger.info('Seeding database...');
	try {
		logger.info('Deleting existing OHIP data...');
		await prisma.ohip.deleteMany({});
		logger.info('Deleting existing OHIP data...COMPLETE');

		// TO DO SAM after migration
		logger.info('Deleting existing clinical profiles...');
		await prisma.clinicalProfile.deleteMany({});
		logger.info('Deleting existing clinical profiles...COMPLETE');

		logger.info('Creating new OHIP data from seed data...');
		await prisma.ohip.createMany({
			data: ohipData,
			skipDuplicates: true,
		});
		logger.info('Creating new OHIP data from seed data...COMPLETE');

		// TO DO SAM after migration
		logger.info('Creating new clinical profiles from seed data...');
		await prisma.clinicalProfile.createMany({
			data: clinicalProfiles,
			skipDuplicates: true,
		});
		logger.info('Creating new clinical profiles from seed data...COMPLETE');
	} catch (error) {
		logger.error('Error seeding database: ', error);
		await prisma.$disconnect();
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

seed();
