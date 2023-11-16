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

import { ConsentCategory, ConsentStatus } from 'types/entities';

import { getTranslation, ValidLanguage } from 'src/i18n';
import Card from 'src/components/Card';
import ProgressHeader from 'src/components/ProgressHeader';

import styles from './ConsentForm.module.scss';

// TODO: for demoing localized named links, consent form sections will be routed to properly in a later ticket
const ConsentForm = async ({
	currentLang,
	section,
}: {
	currentLang: ValidLanguage;
	section: ConsentCategory;
}) => {
	const translate = getTranslation(currentLang);
	const sections = [
		{
			title: '1. Informed Consent',
			status: ConsentStatus.enum.COMPLETE,
		},
		{
			title: '2. Consent to Release Data',
			status: ConsentStatus.enum.INCOMPLETE,
			currentSection: true,
		},
		{
			title: '3. Consent for Research Participation',
			status: ConsentStatus.enum.INCOMPLETE,
		},
		{
			title: '4. Consent for Re-Contact',
			status: ConsentStatus.enum.INCOMPLETE,
		},
		{
			title: '5. Review & Sign',
			status: ConsentStatus.enum.INCOMPLETE,
		},
	];
	return (
		<div>
			<div className={styles.header}>
				<h3>{translate('common', 'consent-forms')}</h3>
				<p>
					To be fully enrolled in OHCRN, please complete all required fields and submit the form.
				</p>
			</div>
			<Card dropShadow="sm">
				<ProgressHeader sections={sections} />
				<hr className={styles.divider} />
				<h3>{translate('consent-category', section)}</h3>
			</Card>
		</div>
	);
};

export default ConsentForm;
