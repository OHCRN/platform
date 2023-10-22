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

import { ConsentGroup } from 'types/entities';

import { InviteDictionary } from '../en/invite.js';

const dictionary: InviteDictionary = {
	[ConsentGroup.enum.ADULT_CONSENT]: "Consentement d'un adulte (>18)",
	[ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER]:
		"Consentement d'un adulte faisant appel à un décideur suppléant supplémentaire (>18)",
	[ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR]: "Consentement du tuteur d'un mineur",
	[ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT]:
		"Consentement du tuteur d'un mineur (y compris le consentement)",
	[ConsentGroup.enum.YOUNG_ADULT_CONSENT]: 'Consentement des jeunes adultes (<18 ans)',
};

export default dictionary;
