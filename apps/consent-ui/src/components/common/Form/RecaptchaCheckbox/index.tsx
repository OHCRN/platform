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

'use client';

// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';

import { useAppConfigContext } from 'src/components/providers/AppConfigContextProvider';
import { RecaptchaCheckboxRef } from 'src/hooks/useRecaptcha';
import { ValidLanguage } from 'src/i18n';

const RecaptchaCheckbox = ({
	onChange,
	recaptchaCheckboxRef,
	currentLang,
}: {
	onChange: () => void;
	recaptchaCheckboxRef: RecaptchaCheckboxRef;
	currentLang: ValidLanguage;
}) => {
	const { RECAPTCHA_SITE_KEY } = useAppConfigContext();

	return RECAPTCHA_SITE_KEY ? (
		<ReCAPTCHA
			ref={recaptchaCheckboxRef}
			sitekey={RECAPTCHA_SITE_KEY}
			onChange={onChange}
			hl={currentLang === ValidLanguage.enum.fr ? 'fr-CA' : 'en'}
		/>
	) : null;
};

export default RecaptchaCheckbox;
