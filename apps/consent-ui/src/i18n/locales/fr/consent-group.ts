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

import { ConsentRecontactDictionary } from 'src/i18n/locales/en/consent-recontact';
import { ConsentGroup } from 'types/entities';

const dictionary = {
	[ConsentGroup.enum.ADULT_CONSENT]: 'Adult Consent (>18) FR',
	[ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER]:
		'Adult Consent using a Substitute Additional Decision Maker (>18) FR',
	[ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR]: 'Guardian Consent of a Minor FR',
	[ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT]:
		'Guardian Consent of a Minor (including Assent) FR',
	[ConsentGroup.enum.YOUNG_ADULT_CONSENT]: 'Young Adult Consent (<18) FR',
} satisfies ConsentRecontactDictionary;

export default dictionary;
