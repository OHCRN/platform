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

import { ValidLanguage, getTranslation } from 'src/i18n';
import Modal from 'src/components/common/Modal';

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
	const { translateNamespace } = getTranslation(currentLang);
	const modalDict = translateNamespace('inviteFormConsentGroupModal');

	return (
		<Modal actionButtonText={modalDict.actionButtonText} title={modalDict.title}>
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
		</Modal>
	);
};

export default ConsentGroupModal;
