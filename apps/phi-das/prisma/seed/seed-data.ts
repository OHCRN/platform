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

import {
	Ancestry,
	BirthSex,
	Gender,
	GeneticsClinic,
	HistoryOfCancer,
	Prisma,
} from '../../src/generated/client/index.js';

const ohipData: Prisma.OhipCreateInput[] = [
	{
		id: 'cllgscubn000108mo6goq2gjl',
		ohipPrivateKey: 'cllgsdpy4000208mo0gk0djuy',
		ohipNumber: '1234567890AA',
	},
	{
		id: 'cllgsrff8000008mndd928h8v',
		ohipPrivateKey: 'cllgsrjrt000108mn0nxvfzc3',
		ohipNumber: '1234567890BB',
	},
	{
		id: 'cllgsrruu000208mnhq6wh7e6',
		ohipPrivateKey: 'cllgsrw92000308mn09obgujg',
		ohipNumber: '1234567890CC',
	},
];

const clinicalProfiles: Prisma.ClinicalProfileCreateInput[] = [
	{
		// gender selected, self-identified gender skipped
		id: 'fFPBqZk0bQEFdKONRClhg',
		ancestry: Ancestry.PREFER_NOT_TO_ANSWER,
		birthSex: BirthSex.PREFER_NOT_TO_ANSWER,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.PREFER_NOT_TO_ANSWER,
		geneticsClinicVisited: GeneticsClinic.PRINCESS_MARGARET_HOSPITAL_TORONTO,
		historyOfCancer: HistoryOfCancer.UNKNOWN,
		participantId: 'GbmJ8ptnfscbgqt3_Wxhd',
	},
	{
		// both gender options provided
		id: '36cuyHMfjUDe25uOu-A08',
		ancestry: Ancestry.PREFER_NOT_TO_ANSWER,
		birthSex: BirthSex.PREFER_NOT_TO_ANSWER,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.PREFER_TO_SELF_IDENTIFY,
		geneticsClinicVisited: GeneticsClinic.LONDON_HEALTH_SCIENCES_CENTRE_LONDON,
		historyOfCancer: HistoryOfCancer.UNKNOWN,
		participantId: 'HMbM2rZlrpCtSpPzK5Uox',
		selfIdentifiedGender: 'other',
	},
];

export { ohipData, clinicalProfiles };
