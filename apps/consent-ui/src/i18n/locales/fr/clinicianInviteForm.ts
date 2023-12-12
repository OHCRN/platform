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

import { ClinicianInviteFormDictionary } from '../en/clinicianInviteForm';

const dictionary = {
	title: 'Inscription des patients cliniciens',
	mainTitle: 'Enregistrez votre patient',
	mainDescription: 'Invitez vos patients à participer au registre OHCRN.',
	patientInformation: 'Informations sur les patients',
	consentGroupTooltip: 'Cela déterminera si un tuteur doit être impliqué dans les consentements.',
	phoneTooltip:
		'Si nous les contactons, ce sera pour des mises à jour de santé et un consentement.',
	emailTooltip: 'Le patient recevra une invitation sur ce compte.',
	'after-registering':
		"Après votre inscription, nous devrons collecter certains consentements et données importants. Votre patient aura accès à la mise à jour de son dossier, mais s'il a besoin d'aide, nous pouvons le contacter.",
	consentContactDescription:
		"J'ai obtenu le consentement verbal pour que mon patient puisse être contacté par un membre de l'équipe d'étude de l'OHCRN pour plus d'informations et de consentements.",
	clinicianInformation: 'Informations sur le clinicien',
	clinicianEmailTooltip:
		'Nous en avons besoin pour confirmer votre autorité à enregistrer des patients.',
	enterGuardianInfo: 'Veuillez saisir les informations du tuteur ci-dessous :',
	uploadFileDescription1:
		"Le participant fait partie du groupe « Consentement du tuteur d'un mineur (y compris assentiment) ». Veuillez",
	'upload-file-link': "télécharger une copie du formulaire d'accord",
	uploadFileDescription2:
		"et demandez à votre participant (qui est mineur) de lire et de signer le formulaire d'assentiment. Utilisez le bouton de téléchargement ci-dessous pour soumettre un formulaire de consentement complété et signé par le mineur.",
	uploadFileLink: '#',
} satisfies ClinicianInviteFormDictionary;

export default dictionary;
