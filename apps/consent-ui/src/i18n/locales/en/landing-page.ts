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
	title: 'Welcome to the OHCRN Registry',
	'hero-background-img-alt': '',
	'ohcrn-description':
		'Ontario Hereditary Cancer Research Network (OHCRN) collects information on individuals with a high chance of getting cancer. We help researchers collect data so they can find cancer earlier and treat it more effectively.',
	'more-about-ohcrn': 'More About OHCRN',
	'join-ohcrn': 'Join OHCRN',
	'join-ohcrn-description':
		'Help researchers understand the prevention, early detection, and treatment of hereditary cancers.',
	'participants-register-today': 'Participants register yourself today',
	'long-participants-register-today':
		'Are you a carrier of a hereditary cancer syndrome? Have you had genetic testing for hereditary cancer in Ontario?',
	'register-yourself-today': 'Register yourself today',
	'clinicians-register-today': 'Clinicians register your patient today',
	'long-clinicians-register-today':
		'Are you a clinician caring for a patient who is a carrier for a hereditary cancer syndrome?',
	'register-patient-today': 'Register your patient today',
} as const;

export type LandingPageDictionaryKey = keyof typeof dictionary;
export type LandingPageDictionary = { [k in LandingPageDictionaryKey]: string };

export default dictionary;
