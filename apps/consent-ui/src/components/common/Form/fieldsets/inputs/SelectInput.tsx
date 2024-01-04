/*
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
import Select, { SingleValue } from 'react-select';

import { FormInputProps, FormSelectOption } from 'src/components/common/Form/types';

type SelectOnChangeArg<V extends string> = SingleValue<string | FormSelectOption<V>>;
type SelectInputProps<T extends FieldValues, V extends string> = FormInputProps<T> & {
	hasError: boolean;
	options: FormSelectOption<V>[];
	placeholder: string;
};

const SelectInput = <T extends FieldValues, V extends string>({
	ariaProps = {},
	disabled,
	hasError = false,
	name,
	onBlur = () => {},
	onFocus = () => {},
	options,
	placeholder = '',
	required,
}: SelectInputProps<T, V>) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<Select
					aria-required={required}
					className={clsx('react-select-container', hasError && 'react-select__has-error')}
					classNamePrefix="react-select"
					// react-select doesn't work with hashed CSS classnames from CSS modules.
					// className & classNamePrefix need to be strings, not hashed classNames.
					// https://github.com/JedWatson/react-select/issues/4525
					inputId={name}
					isDisabled={disabled}
					name={name}
					onBlur={onBlur}
					onChange={(val: SelectOnChangeArg<V>) => {
						// in react-select the value can be a string or object.
						// in our implementation it should be {label, value},
						// with the label being translated.
						let onChangeParam = '';
						if (typeof val === 'string') {
							onChangeParam = val;
						} else if (val?.value !== undefined) {
							onChangeParam = val.value;
						}
						return onChange(onChangeParam);
					}}
					onFocus={onFocus}
					options={options}
					placeholder={placeholder}
					value={options.find((option) => option.value === value) || ''}
					{...ariaProps}
				/>
			)}
			rules={{ required }}
		/>
	);
};

export default SelectInput;
