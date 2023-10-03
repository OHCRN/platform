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

import { useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

import Button from '@/components/Button';
import useRecaptcha from '@/components/RecaptchaCheckbox/useRecaptcha';
import RecaptchaCheckbox from '@/components/RecaptchaCheckbox';
import { useAppConfigContext } from '@/components/AppConfigContextProvider';

const RegistrationForm = () => {
	const appConfig = useAppConfigContext();
	const [nameVal, setNameVal] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const {
		getRecaptchaToken,
		onRecaptchaChange,
		recaptchaCheckboxRef,
		recaptchaError,
		resetRecaptcha,
		setRecaptchaError,
	} = useRecaptcha();

	const handleNameVal = (e: any) => {
		const nextName = e.target.value;
		setNameVal(nextName);
	};

	const handleSubmit = () => {
		// for demo: assume form is valid & complete
		const recaptchaToken = getRecaptchaToken();
		if (recaptchaToken) {
			axios
				.post(urlJoin(appConfig.CONSENT_API_URL, 'recaptcha'), {
					recaptchaToken,
					inputData: { name: nameVal },
				})
				.then(() => {
					setRecaptchaError('');
					setSuccessMessage('Form submitted successfully!');
				})
				.catch((e) => {
					console.error(e);
					setSuccessMessage('');
					setRecaptchaError('Form submission failed');
				});
		} else {
			setSuccessMessage('');
			setRecaptchaError('No token found');
		}
		resetRecaptcha();
	};

	const handleRecaptchaChange = () => {
		// do something when user updates recaptcha:
		// clear errors, validate form, etc

		// for demo: clear error message if there's a token.
		const token = getRecaptchaToken();
		token && setRecaptchaError('');

		onRecaptchaChange();
	};

	return (
		<form>
			{successMessage && (
				<div style={{ border: '5px solid green', padding: 25, margin: '25px 0' }}>
					{successMessage}
				</div>
			)}
			<div style={{ margin: '25px 0' }}>
				<label htmlFor="name">name:</label>
				<input
					id="name"
					name="name"
					type="text"
					onChange={handleNameVal}
					value={nameVal}
					required
					style={{ marginLeft: 10, border: '1px solid grey' }}
				/>
			</div>
			{recaptchaError && (
				<div style={{ border: '5px solid red', padding: 25, margin: '25px 0' }}>
					{recaptchaError}
				</div>
			)}
			<div style={{ margin: '25px 0' }}>
				<RecaptchaCheckbox
					onChange={handleRecaptchaChange}
					recaptchaCheckboxRef={recaptchaCheckboxRef}
				/>
			</div>
			<Button onClick={handleSubmit}>Submit</Button>
		</form>
	);
};

export default RegistrationForm;
