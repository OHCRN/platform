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

// had to add types to not have an error. zod types might help.
enum ConsentCategory {
	INFORMED_CONSENT = 'INFORMED_CONSENT',
	CONSENT_RELEASE_DATA = 'CONSENT_RELEASE_DATA',
	CONSENT_RESEARCH_PARTICIPATION = 'CONSENT_RESEARCH_PARTICIPATION',
	CONSENT_RECONTACT = 'CONSENT_RECONTACT',
	CONSENT_REVIEW_SIGN = 'CONSENT_REVIEW_SIGN',
}

const consentQuestions = [
	{
		id: 'f1bdf45e-1b1c-11ec-9621-0242ac130002',
		isActive: true,
		createdAt: new Date('Tue Sep 22 2021 16:16:50 GMT-0400 (Eastern Daylight Time)'),
		category: ConsentCategory.INFORMED_CONSENT,
	},
	{
		id: 'f1bdf45e-1b1c-11ec-9621-0242ac140005',
		isActive: true,
		createdAt: new Date('Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)'),
		category: ConsentCategory.CONSENT_REVIEW_SIGN,
	},
];

export default consentQuestions;
