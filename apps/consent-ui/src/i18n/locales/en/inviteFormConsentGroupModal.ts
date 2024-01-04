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

const dictionary = {
	adultConsent: 'Adult Consent',
	adultConsentPoint1: '18 years old or older',
	adultConsentPoint2: 'has capacity to provide consent',
	adultConsentSubstitute: 'Adult Consent, Using a Substitute Decision Maker',
	adultConsentSubstitutePoint1: '18 years old or older',
	adultConsentSubstitutePoint2: 'does not have the capacity to provide consent',
	adultConsentSubstitutePoint3: 'substitute decision provides consent on behalf of participant',
	adultConsentSubstitutePoint4: 'documentation available to support the substitute decision maker',
	guardianConsent: 'Guardian Consent of a Minor',
	guardianConsentAssent: 'Guardian Consent of a Minor (including Assent)',
	guardianConsentAssentPoint1: 'most often between 12 and 15 years old',
	guardianConsentAssentPoint2: 'assessed by clinician being able to provide assent',
	guardianConsentAssentPoint3: 'consent provided by a parent or guardian',
	guardianConsentPoint1: 'consent provided by parent or guardian',
	guardianConsentPoint2: 'assessed by their clinician as not requiring consent',
	guardianConsentPoint3: 'most often less than 12 years old',
	youngAdultConsent: 'Young Adult Consent',
	youngAdultConsentPoint1: 'most often between the ages of 16 and 18',
	youngAdultConsentPoint2: 'assessed by their clinician as having capacity to provide consent',
} satisfies Record<string, string>;

export type InviteFormConsentGroupModalDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
