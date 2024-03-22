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
import { z } from 'zod';

export const MINIMUM_AGE_IN_YEARS = 18;

/**
 * Check if age is at least MINIMUM_AGE_IN_YEARS
 * @param comparisonDate: date to compare the dateOfBirth to
 * @returns {boolean} returns true if age is greater than or equal to MINIMUM_AGE_IN_YEARS
 */
export const checkIsMinimumAgeOrGreater = (comparisonDate: Date, dateOfBirth: Date): boolean => {
	const age = differenceInYears(comparisonDate, dateOfBirth);
	return age >= MINIMUM_AGE_IN_YEARS;
};

/**
 * Create a schema for the dateOfBirth field, with an optional refinement for checking the user's age.
 * @param comparisonDate: date to compare the dateOfBirth to. default is today's date
 *
 */
export const createDateOfBirthRequestSchema = ({
	checkMinimumAge = true,
	comparisonDate,
}: {
	checkMinimumAge?: boolean;
	comparisonDate?: Date;
}) => {
	return z
		.object({
			dateOfBirth: z.coerce.date(),
		})
		.refine(
			(props) =>
				checkMinimumAge &&
				checkIsMinimumAgeOrGreater(comparisonDate || new Date(), props.dateOfBirth),
			{
				message: 'participantLessThanMinimumAge',
				path: ['dateOfBirth'],
			},
		);
};
