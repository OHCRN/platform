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

import { differenceInYears } from 'date-fns';

export const MINIMUM_AGE_IN_YEARS = 18;

/**
 * Check if age is at least MINIMUM_AGE_IN_YEARS
 * @returns {boolean} returns true if age is greater than or equal to MINIMUM_AGE_IN_YEARS
 */
export const checkIsMinimumAgeOrGreater = (dob: Date): boolean => {
	const age = differenceInYears(new Date(), dob);
	return age >= MINIMUM_AGE_IN_YEARS;
};

/**
 * Checks if a Participant is at least MINIMUM_AGE_IN_YEARS old. Use with refine() validation.
 * @returns {boolean} returns true if participant age is greater than or equal to MINIMUM_AGE_IN_YEARS
 */
export const refineCheckIsMinimumAgeOrGreater = (props: { dateOfBirth: Date }): boolean => {
	const { dateOfBirth } = props;
	return checkIsMinimumAgeOrGreater(dateOfBirth);
};
