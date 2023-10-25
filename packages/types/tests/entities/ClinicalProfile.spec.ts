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

import { expect } from 'chai';

import {
	Ancestry,
	BirthSex,
	ClinicalProfile,
	Gender,
	HistoryOfCancer,
} from '../../src/entities/index.js';

describe('ClinicalProfile', () => {
	it('Must define self-identified gender if user chooses to self-identify', () => {
		expect(
			ClinicalProfile.safeParse({
				ancestry: Ancestry.enum.PREFER_NOT_TO_ANSWER,
				birthSex: BirthSex.enum.PREFER_NOT_TO_ANSWER,
				clinicalProfilePrivateKey: '6mhX6urHt4R3OG6Yxbimx',
				familyHistoryOfCancer: HistoryOfCancer.enum.UNKNOWN,
				gender: Gender.enum.PREFER_NOT_TO_ANSWER, // chose a gender option
				historyOfCancer: HistoryOfCancer.enum.UNKNOWN,
				participantId: 'tREi8pepJ4sshATZJExqS',
				selfIdentifiedGender: undefined,
			}).success,
		).true;
		expect(
			ClinicalProfile.safeParse({
				ancestry: Ancestry.enum.PREFER_NOT_TO_ANSWER,
				birthSex: BirthSex.enum.PREFER_NOT_TO_ANSWER,
				clinicalProfilePrivateKey: 'JZzEHrE93yKxsrzZKbHVH',
				familyHistoryOfCancer: HistoryOfCancer.enum.UNKNOWN,
				gender: Gender.enum.PREFER_TO_SELF_IDENTIFY, // chose to self-identify
				historyOfCancer: HistoryOfCancer.enum.UNKNOWN,
				participantId: 'r1kIA9KK8X6HMI32338a5',
				selfIdentifiedGender: 'Nulla labore amet minim nisi',
			}).success,
		).true;
		expect(
			ClinicalProfile.safeParse({
				ancestry: Ancestry.enum.PREFER_NOT_TO_ANSWER,
				birthSex: BirthSex.enum.PREFER_NOT_TO_ANSWER,
				clinicalProfilePrivateKey: '7yLTLyJC2LPjpy2vBnkFm',
				familyHistoryOfCancer: HistoryOfCancer.enum.UNKNOWN,
				gender: Gender.enum.PREFER_TO_SELF_IDENTIFY, // chose to self-identify
				historyOfCancer: HistoryOfCancer.enum.UNKNOWN,
				participantId: 'wkIQYKCumXoARLSqNLHuV',
				selfIdentifiedGender: undefined, // missing self-identified gender
			}).success,
		).false;
	});
});
