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
} from '../../src/generated/client';

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
		// both gender fields skipped
		id: 'clnexki5e00049e9c287k9bfp',
		ancestry: Ancestry.ITALIAN,
		birthSex: BirthSex.FEMALE,
		familyHistoryOfCancer: HistoryOfCancer.NO,
		geneticsClinicVisited: GeneticsClinic.HEALTH_SCIENCES_NORTH_SUDBURY,
		historyOfCancer: HistoryOfCancer.YES,
		participantId: 'clnexkrgk00069e9c5jko7ldk',
	},
	{
		// self-identified gender skipped
		id: 'clnexhbg700009e9c68ga23ab',
		ancestry: Ancestry.SEYCHELLOIS,
		birthSex: BirthSex.INTERSEX,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.PREFER_NOT_TO_ANSWER,
		geneticsClinicVisited: GeneticsClinic.PRINCESS_MARGARET_HOSPITAL_TORONTO,
		historyOfCancer: HistoryOfCancer.UNKNOWN,
		participantId: 'clnexin1o00029e9c94b2110u',
	},
	{
		// both gender options provided
		id: 'clney08wl00089e9cb42mf2pr',
		ancestry: Ancestry.PREFER_NOT_TO_ANSWER,
		birthSex: BirthSex.MALE,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.PREFER_TO_SELF_IDENTIFY,
		geneticsClinicVisited: GeneticsClinic.LONDON_HEALTH_SCIENCES_CENTRE_LONDON,
		historyOfCancer: HistoryOfCancer.UNKNOWN,
		participantId: 'clney0c6a000a9e9c5qez52wj',
		selfIdentifiedGender: 'other',
	},
];

export { ohipData, clinicalProfiles };
