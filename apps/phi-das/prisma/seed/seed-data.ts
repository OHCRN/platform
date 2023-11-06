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
		ohipPrivateKey: 'Pli04iPLl7UwGHVROUesK',
		ohipNumber: '1234567890AA',
	},
	{
		ohipPrivateKey: 'Pli04iPLl7UwGHVROUrtd',
		ohipNumber: '1234567890BB',
	},
	{
		ohipPrivateKey: 'Pli04iPLl7UwGHVROU2se',
		ohipNumber: '1234567890CC',
	},
];

const clinicalProfiles: Prisma.ClinicalProfileCreateInput[] = [
	{
		// gender selected, self-identified gender skipped
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROU2se',
		ancestry: Ancestry.PREFER_NOT_TO_ANSWER,
		birthSex: BirthSex.PREFER_NOT_TO_ANSWER,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.PREFER_NOT_TO_ANSWER,
		historyOfCancer: HistoryOfCancer.UNKNOWN,
	},
	{
		// both gender options provided
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROUewq',
		ancestry: Ancestry.PREFER_NOT_TO_ANSWER,
		birthSex: BirthSex.PREFER_NOT_TO_ANSWER,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.PREFER_TO_SELF_IDENTIFY,
		historyOfCancer: HistoryOfCancer.UNKNOWN,
		selfIdentifiedGender: 'other',
	},
	// gender selected, self-identified gender skipped
	{
		clinicalProfilePrivateKey: 'Cli04iPLl7UwGHVROU4ds',
		ancestry: Ancestry.ARMENIAN,
		birthSex: BirthSex.MALE,
		familyHistoryOfCancer: HistoryOfCancer.UNKNOWN,
		gender: Gender.MAN,
		historyOfCancer: HistoryOfCancer.NO,
	},
];

export { ohipData, clinicalProfiles };
