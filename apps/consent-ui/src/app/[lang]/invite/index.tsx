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

import SideImageLayout from 'src/components/Layouts/SideImageLayout';
import { getTranslation, ValidLanguage } from 'src/i18n';
import inviteSidebarJpg from 'src/public/invite-sidebar.jpg';

const ClinicianRegistration = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = getTranslation(currentLang);

	const textDict = {
		'clinician-patient-registration': translate(
			'clinician-invite',
			'clinician-patient-registration',
		),
		'register-your-patient': translate('clinician-invite', 'register-your-patient'),
		'if-participant': translate('clinician-invite', 'if-participant'),
		'register-here': translate('clinician-invite', 'register-here'),
	};

	return (
		<SideImageLayout
			currentLang={currentLang}
			headerAction={{
				topText: textDict['if-participant'],
				bottomText: textDict['register-here'],
				url: 'register',
			}}
			sidebarImage={inviteSidebarJpg}
			title={textDict['clinician-patient-registration']}
		>
			<div style={{ border: '2px solid grey', width: '100%' }}>
				TODO replace with clinician invite form
			</div>
		</SideImageLayout>
	);
};

export default ClinicianRegistration;
