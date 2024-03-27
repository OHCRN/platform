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

'use server';

import { ValidLanguage, getTranslation } from 'src/i18n';

import handleFetchInvite from './handleFetchInvite';

import RegisterForm from '.';

const RegisterFormWrapper = async ({
	currentLang,
	inviteId,
	stepTitleDict,
}: {
	currentLang: ValidLanguage;
	inviteId?: string;
	stepTitleDict: any;
}) => {
	// register from an invite
	const inviteResult = await handleFetchInvite(inviteId);

	// get translations
	const { translateNamespace } = getTranslation(currentLang);
	const dateOfBirthModalDict = translateNamespace('registerDateOfBirthErrorModal');
	const errorsDict = translateNamespace('formErrors');
	const step1LabelsDict = translateNamespace('registerFormStep1Labels');
	const step1textDict = translateNamespace('registerFormStep1Text');
	const step2LabelsDict = translateNamespace('registerFormStep2Labels');
	const step2textDict = translateNamespace('registerFormStep2Text');
	const textDict = translateNamespace('registerFormText');

	return (
		<RegisterForm
			currentLang={currentLang}
			dateOfBirthModalDict={dateOfBirthModalDict}
			errorsDict={errorsDict}
			inviteData={inviteResult.data}
			step1LabelsDict={step1LabelsDict}
			step1TextDict={step1textDict}
			step2LabelsDict={step2LabelsDict}
			step2TextDict={step2textDict}
			stepTitleDict={stepTitleDict}
			textDict={textDict}
		/>
	);
};

export default RegisterFormWrapper;
