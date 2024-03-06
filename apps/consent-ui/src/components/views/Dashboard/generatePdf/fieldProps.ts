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

export const fieldPropsGeneric = {
	ellipse: {
		width: 50,
		height: 25,
	},
};

const fieldPropsEn = {
	optionalConsent: {
		page: 4,
		xCoord: {
			no: 120,
			yes: 45,
		},
		yCoord: {
			RECONTACT__FUTURE_RESEARCH: 50,
			RECONTACT__SECONDARY_CONTACT: 100,
			RESEARCH_PARTICIPATION__CONTACT_INFORMATION: 150,
			RESEARCH_PARTICIPATION__FUTURE_RESEARCH: 200,
		},
	},
	signature: {
		page: 5,
		xCoord: {
			date: 120,
			printedName: 100,
			signaturePng: 40,
		},
		yCoord: {
			guardian: 80,
			participant: 40,
			subsitute: 60,
		},
	},
};

const fieldPropsFr = {
	optionalConsent: {
		page: 4,
		xCoord: {
			no: 120,
			yes: 45,
		},
		yCoord: {
			RECONTACT__FUTURE_RESEARCH: 50,
			RECONTACT__SECONDARY_CONTACT: 100,
			RESEARCH_PARTICIPATION__CONTACT_INFORMATION: 150,
			RESEARCH_PARTICIPATION__FUTURE_RESEARCH: 200,
		},
	},
	signature: {
		page: 5,
		xCoord: {
			date: 120,
			printedName: 100,
			signaturePng: 40,
		},
		yCoord: {
			guardian: 80,
			participant: 40,
			subsitute: 60,
		},
	},
} satisfies typeof fieldPropsEn;

export const fieldPropsByLang = { en: fieldPropsEn, fr: fieldPropsFr };

// properties for:
// circles
// signature png
// fonts
// name
// date
