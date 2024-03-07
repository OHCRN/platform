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

// properties for:
// signature png
// fonts
// name
// date

export const settingsGeneric = {
	ellipse: {
		borderColor: rgb(0, 0, 0),
		borderWidth: 2,
		xScale: 25,
		yScale: 12,
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
				RECONTACT__FUTURE_RESEARCH: 508,
				RECONTACT__SECONDARY_CONTACT: 588,
				RESEARCH_PARTICIPATION__CONTACT_INFORMATION: 427,
				RESEARCH_PARTICIPATION__FUTURE_RESEARCH: 346,
			},
		},
		signature: {
			pageNumber: 12,
			xCoord: {
				date: 120,
				printedName: 100,
				relationshipToParticipant: 60,
				signaturePng: 40,
			},
			yCoord: {
				guardian: 80,
				participant: 40,
				subsitute: 60,
			},
		},
	},
};

const settingsFr = {
	pages: {
		consent: {
			pageNumber: 10,
			xCoord: {
				no: 188,
				yes: 117,
			},
			yCoord: {
				RECONTACT__FUTURE_RESEARCH: 508,
				RECONTACT__SECONDARY_CONTACT: 588,
				RESEARCH_PARTICIPATION__CONTACT_INFORMATION: 427,
				RESEARCH_PARTICIPATION__FUTURE_RESEARCH: 346,
			},
		},
		signature: {
			pageNumber: 12,
			xCoord: {
				date: 120,
				printedName: 100,
				relationshipToParticipant: 60,
				signaturePng: 40,
			},
			yCoord: {
				guardian: 80,
				participant: 40,
				subsitute: 60,
			},
		},
	},
} satisfies typeof settingsEn;

export const settingsByLang = { en: settingsEn, fr: settingsFr };
