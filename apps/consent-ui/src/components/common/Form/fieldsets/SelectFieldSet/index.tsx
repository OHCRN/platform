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

'use client';

import { useId } from 'react';
import { FieldValues } from 'react-hook-form';
import clsx from 'clsx';

import useTooltip from 'src/components/common/Form/fieldsets/Tooltip/useTooltip';
import FieldSet from 'src/components/common/Form/fieldsets/FieldSet';
import SelectInput from 'src/components/common/Form/fieldsets/inputs/SelectInput';
import { FormFieldSetWithTooltipProps, FormSelectOption } from 'src/components/common/Form/types';

import styles from './SelectFieldSet.module.scss';

type SelectFieldSetProps<
	T extends FieldValues,
	V extends string,
> = FormFieldSetWithTooltipProps<T> & {
	options: FormSelectOption<V>[];
	placeholder: string;
};

const SelectFieldSet = <T extends FieldValues, V extends string>({
	className,
	disabled,
	error,
	infoButtonProps,
	label,
	name,
	options,
	placeholder,
	required,
	tooltipContent,
	withNarrowDesktopLayout,
}: SelectFieldSetProps<T, V>) => {
	const { tooltipVisible, hideTooltip, showTooltip } = useTooltip();

	const idPrefix = useId();
	const fieldId = `${idPrefix}-${name}`;
	const tooltipId = `${idPrefix}-tooltip`;

	return (
		<FieldSet
			className={clsx(styles.selectFieldSet, className)}
			error={error}
			fieldId={fieldId}
			infoButtonProps={infoButtonProps}
			label={label}
			required={required}
			tooltipContent={tooltipContent}
			tooltipId={tooltipId}
			tooltipVisible={tooltipVisible}
			withNarrowDesktopLayout={withNarrowDesktopLayout}
		>
			<SelectInput
				ariaProps={tooltipContent ? { 'aria-describedby': tooltipId } : {}}
				disabled={disabled}
				hasError={!!error}
				id={fieldId}
				name={name}
				onBlur={hideTooltip}
				onFocus={showTooltip}
				options={options}
				placeholder={placeholder}
				required={required}
			/>
		</FieldSet>
	);
};

export default SelectFieldSet;
