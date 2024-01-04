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

import { InviteFormConsentGroupModalDictionary } from 'src/i18n/locales/en/inviteFormConsentGroupModal';
import { ValidLanguage, getTranslation } from 'src/i18n';

import styles from './ConsentGroupModal.module.scss';

const ModalSection = ({ items, title }: { items: string[]; title: string }) => {
	return (
		<div className={styles.section}>
			<h4 className={styles.title}>{title}</h4>
			<ul className={styles.list}>
				{items.map((item) => (
					<li key={`${title}-${item}`}>{item}</li>
				))}
			</ul>
		</div>
	);
};

const ConsentGroupModal = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);
	const modalDict: InviteFormConsentGroupModalDictionary = {
		adultConsent: translate('inviteFormConsentGroupModal', 'adultConsent'),
		adultConsentPoint1: translate('inviteFormConsentGroupModal', 'adultConsentPoint1'),
		adultConsentPoint2: translate('inviteFormConsentGroupModal', 'adultConsentPoint2'),
		adultConsentSubstitute: translate('inviteFormConsentGroupModal', 'adultConsentSubstitute'),
		adultConsentSubstitutePoint1: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint1',
		),
		adultConsentSubstitutePoint2: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint2',
		),
		adultConsentSubstitutePoint3: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint3',
		),
		adultConsentSubstitutePoint4: translate(
			'inviteFormConsentGroupModal',
			'adultConsentSubstitutePoint4',
		),
		guardianConsent: translate('inviteFormConsentGroupModal', 'guardianConsent'),
		guardianConsentAssent: translate('inviteFormConsentGroupModal', 'guardianConsentAssent'),
		guardianConsentAssentPoint1: translate(
			'inviteFormConsentGroupModal',
			'guardianConsentAssentPoint1',
		),
		guardianConsentAssentPoint2: translate(
			'inviteFormConsentGroupModal',
			'guardianConsentAssentPoint2',
		),
		guardianConsentAssentPoint3: translate(
			'inviteFormConsentGroupModal',
			'guardianConsentAssentPoint3',
		),
		guardianConsentPoint1: translate('inviteFormConsentGroupModal', 'guardianConsentPoint1'),
		guardianConsentPoint2: translate('inviteFormConsentGroupModal', 'guardianConsentPoint2'),
		guardianConsentPoint3: translate('inviteFormConsentGroupModal', 'guardianConsentPoint3'),
		youngAdultConsent: translate('inviteFormConsentGroupModal', 'youngAdultConsent'),
		youngAdultConsentPoint1: translate('inviteFormConsentGroupModal', 'youngAdultConsentPoint1'),
		youngAdultConsentPoint2: translate('inviteFormConsentGroupModal', 'youngAdultConsentPoint2'),
	};

	return (
		<>
			<ModalSection
				title={modalDict.adultConsent}
				items={[modalDict.adultConsentPoint1, modalDict.adultConsentPoint2]}
			/>
			<ModalSection
				title={modalDict.adultConsentSubstitute}
				items={[
					modalDict.adultConsentSubstitutePoint1,
					modalDict.adultConsentSubstitutePoint2,
					modalDict.adultConsentSubstitutePoint3,
					modalDict.adultConsentSubstitutePoint4,
				]}
			/>
			<ModalSection
				title={modalDict.guardianConsent}
				items={[
					modalDict.guardianConsentPoint1,
					modalDict.guardianConsentPoint2,
					modalDict.guardianConsentPoint3,
				]}
			/>
			<ModalSection
				title={modalDict.guardianConsentAssent}
				items={[
					modalDict.guardianConsentAssentPoint1,
					modalDict.guardianConsentAssentPoint2,
					modalDict.guardianConsentAssentPoint3,
				]}
			/>
			<ModalSection
				title={modalDict.youngAdultConsent}
				items={[modalDict.youngAdultConsentPoint1, modalDict.youngAdultConsentPoint2]}
			/>
		</>
	);
};

export default ConsentGroupModal;
