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

import { ConsentReleaseDataDictionary } from 'src/i18n/locales/en/consent-release-data';

const dictionary = {
	RELEASE_DATA__FIRST_NAME: 'Prénom',
	RELEASE_DATA__LAST_NAME: 'Nom de famille',
	RELEASE_DATA__GENDER_IDENTITY: 'Identité de genre',
	RELEASE_DATA__OHIP_NUMBER: '# OHIP',
	RELEASE_DATA__DATE_OF_BIRTH: 'Date de naissance',
	RELEASE_DATA__BIRTH_SEX: 'Sexe attribué à la naissance',
	RELEASE_DATA__ANCESTRY: 'Ascendance',
	RELEASE_DATA__HISTORY_OF_CANCER: 'Antécédents personnels de cancer ?',
	RELEASE_DATA__PRIMARY_CANCER_DIAGNOSIS: 'Diagnostic primaire du cancer',
	RELEASE_DATA__FAMILY_HISTORY_OF_CANCER: 'Antécédents familiaux de cancer ?',
	RELEASE_DATA__RESIDENTIAL_POSTAL_CODE: 'Code Postal',
	RELEASE_DATA__SELF_REPORTED_CLINICIAN_TITLE: 'Titre de clinicien',
	RELEASE_DATA__SELF_REPORTED_CLINICIAN_FIRST_NAME: 'Prénom du clinicien',
	RELEASE_DATA__SELF_REPORTED_CLINICIAN_LAST_NAME: 'Nom de famille du clinicien',
	RELEASE_DATA__SELF_REPORTED_GENETICS_CLINIC: 'Clinique de génétique',
	RELEASE_DATA__SELF_REPORTED_MOLECULAR_LAB: 'Laboratoire moléculaire',
} satisfies ConsentReleaseDataDictionary;

export default dictionary;
