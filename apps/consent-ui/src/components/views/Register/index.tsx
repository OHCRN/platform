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

import { Suspense } from 'react';

import { getTranslation, ValidLanguage } from 'src/i18n';
import SideImageLayout from 'src/components/layouts/SideImageLayout';
import LinkButton from 'src/components/common/Button/LinkButton';
import registerBg from 'src/../public/assets/images/register-bg.jpg';

import RegisterFormWrapper from './RegisterFormWrapper';

const Register = async ({
	currentLang,
	inviteId,
}: {
	currentLang: ValidLanguage;
	inviteId?: string;
}) => {
	const { translateNamespace } = getTranslation(currentLang);
	const pageDict = translateNamespace('registerPage');

	return (
		<SideImageLayout
			currentLang={currentLang}
			desktopHeaderImage={registerBg}
			desktopNavAction={{
				bottomText: pageDict.registerPatients,
				topText: pageDict.ifClinician,
				url: 'invite',
			}}
			desktopNavButton={{
				description: pageDict.alreadyRegistered,
				// TODO add link to login page
				// https://github.com/OHCRN/platform/issues/359
				button: <LinkButton href="">{pageDict.login}</LinkButton>,
			}}
			mainSubtitle={pageDict.enrollInOhcrn}
			mainTitle={pageDict.registerYourself}
			navTitle={pageDict.participantRegistration}
		>
			<Suspense fallback={<h1>LOADING</h1>}>
				<RegisterFormWrapper currentLang={currentLang} inviteId={inviteId} />
			</Suspense>
		</SideImageLayout>
	);
};

export default Register;
