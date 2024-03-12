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

import { rgb } from 'pdf-lib';
import { ConsentQuestionId } from 'types/entities';

const {
	RECONTACT__FUTURE_RESEARCH,
	RECONTACT__SECONDARY_CONTACT,
	RESEARCH_PARTICIPATION__CONTACT_INFORMATION,
	RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
} = ConsentQuestionId.enum;

export const settingsGeneric = {
	ellipse: {
		borderColor: rgb(0, 0, 0),
		borderWidth: 2,
		xScale: 25,
		yScale: 12,
	},
	signatureImageScale: 0.28,
	text: {
		color: rgb(0, 0, 0),
		lineHeight: 14,
		maxWidth: 150,
		size: 12,
		wordBreaks: [''],
	},
};

const settingsEn = {
	pages: {
		consent: {
			pageNumber: 10,
			xCoord: {
				no: 188,
				yes: 117,
			},
			yCoord: {
				[RECONTACT__FUTURE_RESEARCH]: 508,
				[RECONTACT__SECONDARY_CONTACT]: 588,
				[RESEARCH_PARTICIPATION__CONTACT_INFORMATION]: 427,
				[RESEARCH_PARTICIPATION__FUTURE_RESEARCH]: 346,
			},
		},
		signature: {
			pageNumber: 11,
			xCoord: {
				date: 450,
				printedName: { guardian: 218, participant: 265, substitute: 265 },
				relationshipToParticipant: 72,
				signaturePng: 72,
			},
			yCoord: {
				guardian: 402,
				participant: 612,
				relationshipToParticipant: 125,
				substitute: 165,
			},
		},
	},
};

// TODO make a French settings object. works the same as i18n dictionaries.
const settingsFr = { ...settingsEn } satisfies typeof settingsEn;

export const settingsByLang = { en: settingsEn, fr: settingsFr };
