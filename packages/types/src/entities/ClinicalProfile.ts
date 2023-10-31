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

import { z } from 'zod';

import { Ancestry } from './Ancestry.js';
import { BirthSex } from './BirthSex.js';
import { Gender } from './Gender.js';
import { GeneticsClinic } from './GeneticsClinic.js';
import { HistoryOfCancer } from './HistoryOfCancer.js';
import { NanoId } from './NanoId.js';
import { Name } from './Name.js';
import { MolecularLab } from './MolecularLab.js';

export const ClinicalProfile = z
	.object({
		ancestry: Ancestry,
		birthSex: BirthSex,
		clinicalProfilePrivateKey: NanoId,
		familyHistoryOfCancer: HistoryOfCancer,
		gender: Gender,
		selfReportedClinicianFirstName: Name.optional(),
		selfReportedClinicianLastName: Name.optional(),
		selfReportedClinicianTitleOrRole: Name.optional(),
		selfReportedGeneticsClinicVisited: GeneticsClinic.optional(),
		selfReportedMolecularLabVisited: MolecularLab.optional(),
		historyOfCancer: HistoryOfCancer,
		participantId: NanoId,
		selfIdentifiedGender: z.string().trim().optional(),
	})
	.refine((input) => {
		// selfIdentifiedGender must be defined if
		// Gender.PREFER_TO_SELF_IDENTIFY was selected

		const requiresSelfIdentifiedGender = input.gender === Gender.enum.PREFER_TO_SELF_IDENTIFY;
		return requiresSelfIdentifiedGender ? input.selfIdentifiedGender !== undefined : true;
	});

export type ClinicalProfile = z.infer<typeof ClinicalProfile>;
