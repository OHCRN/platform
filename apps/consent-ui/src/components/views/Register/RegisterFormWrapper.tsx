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

import { ValidLanguage, getTranslation, replaceParams } from 'src/i18n';

import RegisterForm from './RegisterForm';
import handleFetchInvite from './handleFetchInvite';

const RegisterFormWrapper = async ({
	currentLang,
	inviteId,
}: {
	currentLang: ValidLanguage;
	inviteId?: string;
}) => {
	// register from an invite
	console.log('🌈🌈🌈', inviteId);
	const inviteResult = await handleFetchInvite(inviteId);
	console.log('🌈🌈🌈', inviteResult);

	// get translations
	const { translateNamespace } = getTranslation(currentLang);
	const errorsDict = translateNamespace('formErrors');
	const step1LabelsDict = translateNamespace('registerFormStep1Labels');
	const step1textDict = translateNamespace('registerFormStep1Text');
	const step2LabelsDict = translateNamespace('registerFormStep2Labels');
	const step2textDict = translateNamespace('registerFormStep2Text');
	const dateOfBirthModalDict = translateNamespace('registerDateOfBirthErrorModal');
	const textDict = translateNamespace('registerFormText');

	// step navigation
	const STEP_COUNT = 2;
	const stepTitleDict = {
		step1: replaceParams(textDict.stepCurrentOfTotal, {
			current: 1,
			total: STEP_COUNT,
		}),
		step2: replaceParams(textDict.stepCurrentOfTotal, {
			current: 2,
			total: STEP_COUNT,
		}),
	};

	return (
		<RegisterForm
			currentLang={currentLang}
			errorsDict={errorsDict}
			inviteData={inviteResult?.data}
			step1LabelsDict={step1LabelsDict}
			step1TextDict={step1textDict}
			step2LabelsDict={step2LabelsDict}
			step2TextDict={step2textDict}
			textDict={textDict}
			stepTitleDict={stepTitleDict}
			dateOfBirthModalDict={dateOfBirthModalDict}
		/>
	);
};

export default RegisterFormWrapper;