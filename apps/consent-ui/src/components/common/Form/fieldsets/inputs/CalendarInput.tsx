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
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enCA, frCA } from 'date-fns/locale';

import type { FormInputProps } from 'src/components/common/Form/types';
import type { ValidLanguage } from 'src/i18n';

type CalendarInputProps<T extends FieldValues> = FormInputProps<T> & {
	popperClassName?: string;
	currentLang: ValidLanguage;
};

const CalendarInput = <T extends FieldValues>({
	ariaProps = {},
	disabled,
	className,
	popperClassName,
	id,
	name,
	onBlur = () => {},
	required,
	currentLang,
}: CalendarInputProps<T>) => {
	registerLocale('en', enCA);
	registerLocale('fr', frCA);

	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onBlur: controlOnBlur, onChange, value } }) => {
				const handleBlur = () => {
					controlOnBlur();
					onBlur();
				};
				return (
					<DatePicker
						selected={value}
						onChange={(date) => onChange(date)}
						required={required}
						className={clsx(className)}
						popperClassName={clsx(popperClassName)}
						id={id}
						name={name}
						locale={currentLang}
						onBlur={handleBlur}
						disabled={disabled}
						{...ariaProps}
					/>
				);
			}}
			rules={{ required }}
		/>
	);
};

export default CalendarInput;
