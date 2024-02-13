/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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
	Gender,
	BirthSex,
	Ancestry,
	HistoryOfCancer,
	GeneticsClinic,
	MolecularLab,
} from 'types/entities';

import { ValidLanguage, getTranslation } from 'src/i18n';

import ConsentReleaseDataForm from './ConsentReleaseDataForm';
import {
	GenderOption,
	BirthSexOption,
	AncestryOption,
	HistoryOfCancerOption,
	GeneticsClinicOption,
	MolecularLabOption,
} from './ConsentReleaseDataForm/types';
import styles from './ConsentReleaseData.module.scss';

const ConsentReleaseData = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translateNamespace } = getTranslation(currentLang);

	const genderDict = translateNamespace('gender');
	const birthSexDict = translateNamespace('birthSex');
	const ancestryDict = translateNamespace('ancestry');
	const historyOfCancerDict = translateNamespace('historyOfCancer');
	const geneticsClinicDict = translateNamespace('geneticsClinic');
	const molecularLabDict = translateNamespace('molecularLab');

	const errorsDict = translateNamespace('formErrors');
	const labelsDict = translateNamespace('consentReleaseDataLabels');
	const pageDict = translateNamespace('consentReleaseDataPage');
	const textDict = translateNamespace('consentReleaseDataText');

	const genderOptions: GenderOption[] = Gender.options.map((group) => ({
		label: genderDict[group],
		value: group,
	}));

	const birthSexOptions: BirthSexOption[] = BirthSex.options.map((group) => ({
		label: birthSexDict[group],
		value: group,
	}));

	const ancestryOptions: AncestryOption[] = Ancestry.options.map((group) => ({
		label: ancestryDict[group],
		value: group,
	}));

	const historyOfCancerOptions: HistoryOfCancerOption[] = HistoryOfCancer.options.map((group) => ({
		label: historyOfCancerDict[group],
		value: group,
	}));

	const geneticsClinicOptions: GeneticsClinicOption[] = GeneticsClinic.options.map((group) => ({
		label: geneticsClinicDict[group],
		value: group,
	}));

	const molecularLabOptions: MolecularLabOption[] = MolecularLab.options.map((group) => ({
		label: molecularLabDict[group],
		value: group,
	}));

	return (
		<div>
			<h2 className={styles.title}>{pageDict.title}</h2>
			<p className={styles.description}>{pageDict.description}</p>
			<ConsentReleaseDataForm
				currentLang={currentLang}
				genderOptions={genderOptions}
				birthSexOptions={birthSexOptions}
				ancestryOptions={ancestryOptions}
				historyOfCancerOptions={historyOfCancerOptions}
				geneticsClinicOptions={geneticsClinicOptions}
				molecularLabOptions={molecularLabOptions}
				errorsDict={errorsDict}
				labelsDict={labelsDict}
				textDict={textDict}
			/>
		</div>
	);
};

export default ConsentReleaseData;
