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

const dictionary = {
	researchParticipationFutureResearchTitle:
		'Optional consent to allow collection of previously collected samples for future unknown research',
	researchParticipationFutureResearchTitleDesc:
		'I agree that my previously collected samples may be included in the decentralized biobank and used for unknown future research studies.',
	researchParticipationContactInformationTitle:
		'Optional release of contact information to existing approved cancer registries.',
	researchParticipationContactInformationDesc:
		'I agree that my study doctor, or someone on the study team, may provide my contact information and genetic test results to an existing cancer registry, if applicable. ',
	researchParticipationContactInformationDescLink:
		'Click here to view current list of approved cancer registries.',
	yesText: 'Yes',
	noText: 'No',
} satisfies Record<string, string>;

export type ConsentResearchParticipationFormDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
