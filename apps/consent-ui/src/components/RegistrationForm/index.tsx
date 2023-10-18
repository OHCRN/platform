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

import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import Button from 'src/components/Button';
import useRecaptcha from 'src/hooks/useRecaptcha';
import RecaptchaCheckbox from 'src/components/RecaptchaCheckbox';
import { useAppConfigContext } from 'src/components/AppConfigContextProvider';
import Notification from 'src/components/Notification';

const RegistrationForm = () => {
	const appConfig = useAppConfigContext();
	const [nameValDemo, setNameValDemo] = useState('');
	const [successMessageDemo, setSuccessMessageDemo] = useState('');

	const {
		getRecaptchaToken,
		onRecaptchaChange,
		recaptchaCheckboxRef,
		recaptchaError,
		resetRecaptcha,
		setRecaptchaError,
	} = useRecaptcha();

	const handleNameValDemo = (e: any) => {
		const nextName = e.target.value;
		setNameValDemo(nextName);
	};

	const handleSubmitDemo = (e: SyntheticEvent) => {
		e.preventDefault();
		// for demo: assume form is valid & complete
		const recaptchaToken = getRecaptchaToken();
		if (recaptchaToken) {
			// submit form data
			// using "recaptcha" endpoint as an example only
			axios
				.post(urlJoin(appConfig.CONSENT_API_URL, 'recaptcha'), {
					recaptchaToken,
					inputData: { name: nameValDemo },
				})
				.then(() => {
					setRecaptchaError('');
					resetRecaptcha();
					setSuccessMessageDemo('Form submitted successfully!');
				})
				.catch((e) => {
					console.error(e);
					setSuccessMessageDemo('');
					setRecaptchaError('Something went wrong, please try again');
				});
		} else {
			setSuccessMessageDemo('');
			setRecaptchaError('Please complete captcha');
		}
	};

	const handleRecaptchaChangeDemo = () => {
		// do something when user updates recaptcha:
		// clear errors, validate form, etc

		// for demo: clear error message if there's a token
		// after the user has interacted with recaptcha checkbox
		const token = getRecaptchaToken();
		token && setRecaptchaError('');

		onRecaptchaChange();
	};

	return (
		<form>
			{successMessageDemo && (
				<Notification level="success" variant="small" title={successMessageDemo} />
			)}
			<div style={{ margin: '25px 0' }}>
				<label htmlFor="nameDemo">name:</label>
				<input
					id="nameDemo"
					name="nameDemo"
					type="text"
					onChange={handleNameValDemo}
					value={nameValDemo}
					required
					style={{ marginLeft: 10, border: '1px solid grey' }}
				/>
			</div>
			{recaptchaError && (
				<Notification level="error" variant="small" title={`Error: ${recaptchaError}`} />
			)}
			<div style={{ margin: '25px 0' }}>
				<RecaptchaCheckbox
					onChange={handleRecaptchaChangeDemo}
					recaptchaCheckboxRef={recaptchaCheckboxRef}
				/>
			</div>
			<Button onClick={handleSubmitDemo}>Submit</Button>
		</form>
	);
};

export default RegistrationForm;
