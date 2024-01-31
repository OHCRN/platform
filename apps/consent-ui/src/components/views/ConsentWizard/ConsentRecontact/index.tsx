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

import Link from 'next/link';

import { ValidLanguage, getTranslation } from 'src/i18n';
import { FormErrorsDictionary } from 'src/i18n/locales/en/formErrors';

import styles from './ConsentRecontact.module.scss';
import ConsentRecontactForm from './ConsentRecontactForm';

const ConsentRecontact = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const formDict = {
		recontactFutureResearchTitle: translate('consentRecontactForm', 'recontactFutureResearchTitle'),
		recontactFutureResearchDesc: translate('consentRecontactForm', 'recontactFutureResearchDesc'),
		recontactSecondaryContactTitle: translate(
			'consentRecontactForm',
			'recontactSecondaryContactTitle',
		),
		recontactSecondaryContactDesc: translate(
			'consentRecontactForm',
			'recontactSecondaryContactDesc',
		),
		secondaryContactFormDescription: translate(
			'consentRecontactForm',
			'secondaryContactFormDescription',
		),
		firstName: translate('consentRecontactForm', 'firstName'),
		lastName: translate('consentRecontactForm', 'lastName'),
		phone: translate('consentRecontactForm', 'phone'),
		phoneDescription: translate('consentRecontactForm', 'phoneDescription'),
		yesText: translate('consentRecontactForm', 'yesText'),
		noText: translate('consentRecontactForm', 'noText'),
	};

	const errorsDict: FormErrorsDictionary = {
		required: translate('formErrors', 'required'),
	};

	const pageDict = {
		title: translate('consentRecontactPage', 'title'),
		subheading: translate('consentRecontactPage', 'subheading'),
		subheadingLink: translate('consentRecontactPage', 'subheadingLink'),
		smallText: translate('consentRecontactPage', 'smallText'),
	};
	return (
		<div>
			<h2 className={styles.title}>{pageDict.title}</h2>
			<p className={styles.description}>
				{pageDict.subheading}
				<Link href={'#'} target="__blank">
					{pageDict.subheadingLink}
				</Link>
			</p>
			<ConsentRecontactForm currentLang={currentLang} errorsDict={errorsDict} formDict={formDict} />
		</div>
	);
};

export default ConsentRecontact;
