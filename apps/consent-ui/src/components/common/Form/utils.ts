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

/**
 * Convert empty and whitespace strings to undefined,
 * i.e. to match consent API schemas when submitting a form.
 */
export const convertEmptyStringToUndefined = (val: string): string | undefined =>
	val.trim() === '' ? undefined : val;

/**
 * Format form data before submitting to consent API, to match its schemas.
 */
export const formatFormRequest = (data: Record<string, any>) =>
	Object.entries(data).reduce((acc, [key, value]) => {
		let formattedValue = value;

		switch (typeof value) {
			case 'string':
				formattedValue = convertEmptyStringToUndefined(value);
				break;
			default:
				break;
		}
		return {
			...acc,
			[key]: formattedValue,
		};
	}, {});

/**
 * Format form data before populating a form in the UI, to match the HTML spec.
 */
export const formatFormResponse = (data: Record<string, any>) =>
	Object.entries(data).reduce((acc, [key, value]) => {
		let formattedValue = value;

		switch (typeof value) {
			case 'undefined':
				formattedValue = '';
				break;
			default:
				break;
		}

		return {
			...acc,
			[key]: formattedValue,
		};
	}, {});
