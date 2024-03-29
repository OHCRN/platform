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
	GeneticsClinic,
	HistoryOfCancer,
	MolecularLab,
	Gender,
	BirthSex,
} from 'src/generated/client/index.js';

import prisma, { ClinicalProfile, Ohip } from '../prismaClient.js';

export const createOhipNumber = async ({
	ohipPrivateKey,
	ohipNumber,
}: {
	ohipPrivateKey: string;
	ohipNumber: string;
}): Promise<Ohip> => {
	// TODO: add error handling
	const result = await prisma.ohip.create({
		data: {
			ohipPrivateKey,
			ohipNumber,
		},
	});
	return result;
};

export const createClinicalProfile = async ({
	clinicalProfilePrivateKey,
	birthSex,
	gender,
	selfIdentifiedGender,
	ancestry,
	selfReportedClinicianFirstName,
	selfReportedClinicianLastName,
	selfReportedClinicianTitleOrRole,
	selfReportedGeneticsClinicVisited,
	selfReportedMolecularLabVisited,
	historyOfCancer,
	familyHistoryOfCancer,
}: {
	clinicalProfilePrivateKey: string;
	birthSex: BirthSex;
	gender: Gender;
	selfIdentifiedGender?: string;
	ancestry: Ancestry;
	selfReportedClinicianFirstName?: string;
	selfReportedClinicianLastName?: string;
	selfReportedClinicianTitleOrRole?: string;
	selfReportedGeneticsClinicVisited?: GeneticsClinic;
	selfReportedMolecularLabVisited?: MolecularLab;
	historyOfCancer: HistoryOfCancer;
	familyHistoryOfCancer: HistoryOfCancer;
}): Promise<ClinicalProfile> => {
	const result = await prisma.clinicalProfile.create({
		data: {
			clinicalProfilePrivateKey,
			birthSex,
			gender,
			selfIdentifiedGender,
			ancestry,
			selfReportedClinicianFirstName,
			selfReportedClinicianLastName,
			selfReportedClinicianTitleOrRole,
			selfReportedGeneticsClinicVisited,
			selfReportedMolecularLabVisited,
			historyOfCancer,
			familyHistoryOfCancer,
		},
	});
	return result;
};
