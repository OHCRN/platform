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

import { RefObject, SyntheticEvent, createRef } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';

import { useAppConfigContext } from '../AppConfigContextProvider';
import Button from '../Button';

export default function ReCaptchaSubmit() {
	const appConfig = useAppConfigContext();

	const recaptchaRef: RefObject<ReCAPTCHA> = createRef<ReCAPTCHA>();

	function submitForm(recaptchaValue?: string | null) {
		console.log('submitForm', recaptchaValue);
	}

	function onChange(value?: string | null) {
		console.log('Captcha onChange', value);
	}

	function handleSubmit(e: SyntheticEvent<HTMLElement, Event>) {
		e.preventDefault();
		console.log('handleSubmit');
		const recaptchaValue: string | null | undefined = recaptchaRef.current?.getValue();
		submitForm(recaptchaValue);

		// reset recaptcha on every submit
		recaptchaRef.current?.reset();
	}

	return (
		<>
			{/* test form field */}
			<label htmlFor="name">Name</label>
			<input type="text" id="name" className="input" />
			<br />
			<br />
			{appConfig.RECAPTCHA_SITE_KEY && (
				<ReCAPTCHA ref={recaptchaRef} sitekey={appConfig.RECAPTCHA_SITE_KEY} onChange={onChange} />
			)}
			<br />
			<br />
			<Button onClick={handleSubmit}>Submit</Button>
		</>
	);
}
