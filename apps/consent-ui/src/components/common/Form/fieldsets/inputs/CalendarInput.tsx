/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 * If not, see <http://www.gnu.org/licenses/>.
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

'use client';

import clsx from 'clsx';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import type { FormInputProps } from 'src/components/common/Form/types';

type CalendarInputProps<T extends FieldValues> = FormInputProps<T> & {
	hasError: boolean;
};

const SelectInput = <T extends FieldValues>({
	ariaProps = {},
	disabled,
	// hasError,
	id,
	name,
	onBlur = () => {},
	onFocus = () => {},
	required,
}: CalendarInputProps<T>) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<DatePicker
					showIcon
					selected={value}
					onChange={(date) => onChange(date)}
					required={required}
					className={clsx()}
					id={`calendar-${id}`}
					name={name}
					onBlur={onBlur}
					onFocus={onFocus}
					disabled={disabled}
					{...ariaProps}
				/>
			)}
			rules={{ required }}
		/>
	);
};

export default SelectInput;
