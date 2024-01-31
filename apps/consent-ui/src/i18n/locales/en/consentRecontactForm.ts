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

import formLabels from './formLabels';

const { firstName, lastName, phone } = formLabels;

const dictionary = {
	recontactFutureResearchTitle: 'Optional Re-Contact',
	recontactFutureResearchDesc:
		'I agree that my study doctor, or someone on the study team, may contact me in future, and/or provide my contact information to the research team for future research studies, and clinical trials, if applicable.',
	recontactSecondaryContactTitle: 'Optional Secondary Contact',
	recontactSecondaryContactDesc:
		'I agree that my study doctor, or someone on the study team, may contact my next of kin or secondary contact for updates to my health information if attempts to contact me have not been successful.',
	secondaryContactFormDescription:
		'Please provide the following required information for your next of kin.',
	firstName,
	lastName,
	phone,
	phoneDescription: 'If we contact them, it will be for health updates only.',
	yesText: 'Yes',
	noText: 'No',
} satisfies Record<string, string>;

export type ConsentRecontactFormDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
