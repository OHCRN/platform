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

'use client';

import { ReactNode, useId } from 'react';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import FieldSet from 'src/components/common/Form/fieldsets/FieldSet';
import SelectInput from 'src/components/common/Form/fieldsets/inputs/SelectInput';
import {
	DesktopSizeVariantProp,
	FormFieldSetSharedProps,
	FormFieldSetWithCalloutProps,
	FormSelectOption,
} from 'src/components/common/Form/types';
import InputError from 'src/components/common/Form/fieldsets/InputError';
import useCallout from 'src/components/common/Form/fieldsets/Callout/useCallout';

import styles from './SelectFieldSet.module.scss';

type FormSelectFieldSetProps<T extends FieldValues, V extends string> = FormFieldSetSharedProps<T> &
	FormFieldSetWithCalloutProps &
	DesktopSizeVariantProp & {
		calloutText?: ReactNode;
		options: FormSelectOption<V>[];
		placeholder: string;
	};

const SelectFieldSet = <T extends FieldValues, V extends string>({
	calloutText,
	className,
	error,
	label,
	name,
	options,
	placeholder,
	required = false,
	variant = 'largeDesktop',
}: FormSelectFieldSetProps<T, V>) => {
	const { control } = useFormContext();
	const { calloutVisible, hideCallout, showCallout } = useCallout();

	const idPrefix = useId();
	const fieldId = `${idPrefix}-${name}`;
	const calloutId = `${idPrefix}-callout`;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<FieldSet
					calloutId={calloutId}
					calloutText={calloutText}
					calloutVisible={calloutVisible}
					className={clsx(styles.selectFieldSet, className)}
					fieldId={fieldId}
					label={label}
					required={required}
					variant={variant}
				>
					<SelectInput
						ariaProps={{ 'aria-describedby': calloutId }}
						className={clsx('react-select-container', error && 'react-select__has-error')}
						classNamePrefix="react-select"
						id={fieldId}
						name={name}
						onBlur={hideCallout}
						onChange={onChange}
						onFocus={showCallout}
						options={options}
						placeholder={placeholder}
						required={required}
						value={value}
					/>
					{error && <InputError>{error}</InputError>}
				</FieldSet>
			)}
			rules={{ required }}
		/>
	);
};

export default SelectFieldSet;
