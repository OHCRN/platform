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

import { RefObject, createRef, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';

export type RecaptchaToken = string | null | undefined;

// recaptcha token lasts 2 minutes.
// reset after 90 seconds to avoid expiry issues.
const resetDelay = 1.5 * 60 * 1000;

const useRecaptcha = () => {
	const recaptchaCheckboxRef: RefObject<ReCAPTCHA> = createRef<ReCAPTCHA>();
	const [recaptchaError, setRecaptchaError] = useState('');

	// check that token exists before submitting form
	const getRecaptchaToken = (): RecaptchaToken => recaptchaCheckboxRef.current?.getValue();

	const resetRecaptcha = () => {
		// reset after receiving API response (success or fail) for form submission
		recaptchaCheckboxRef.current?.reset();
	};

	const onRecaptchaChange = (token?: RecaptchaToken) => {
		// after user is verified by recaptcha,
		// reset the checkbox shortly before the token expires
		token && setTimeout(() => resetRecaptcha(), resetDelay);
	};

	return {
		getRecaptchaToken,
		onRecaptchaChange,
		recaptchaCheckboxRef,
		recaptchaError,
		resetRecaptcha,
		setRecaptchaError,
	};
};

export default useRecaptcha;
