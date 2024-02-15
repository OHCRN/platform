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

import clsx from 'clsx';
import { ReactNode, useEffect, useId } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { FormFieldSetWithDescriptionProps } from 'src/components/common/Form/types';
import CheckboxInput from 'src/components/common/Form/fieldsets/inputs/CheckboxInput';

import TextInput from '../inputs/TextInput';
import FieldSet from '../FieldSet';

import styles from './OhipFieldSet.module.scss';

export type OhipFieldSetProps<T extends FieldValues> = FormFieldSetWithDescriptionProps<T> & {
	checkboxLabel: ReactNode;
};

const OhipFieldSet = <T extends FieldValues>({
	className,
	disabled,
	error,
	name,
	required,
	label,
	description,
	checkboxLabel,
}: OhipFieldSetProps<T>) => {
	const ohipFieldId = useId();
	const ohipTextInputId = `${ohipFieldId}-text`;
	const ohipCheckboxId = `${ohipFieldId}-checkbox`;

	const { watch, resetField } = useFormContext();
	const checkboxValue: boolean = watch(ohipCheckboxId);

	useEffect(() => {
		if (checkboxValue) {
			resetField(name, { keepError: true });
		}
	}, [checkboxValue, name, resetField]);

	return (
		<FieldSet
			className={className}
			fieldId={ohipFieldId}
			label={label}
			error={error}
			description={description}
			descriptionId={ohipTextInputId}
			required={required}
		>
			<TextInput
				className={clsx(styles.ohipTextInput, error && styles.error)}
				disabled={disabled || checkboxValue}
				id={ohipTextInputId}
				name={name}
				type={'text'}
			/>

			<label
				htmlFor={ohipCheckboxId}
				className={clsx(styles.ohipCheckboxWrapper, error && styles.error)}
			>
				<CheckboxInput
					className={clsx(styles.ohipCheckboxInput, error && styles.error)}
					disabled={disabled}
					id={ohipCheckboxId}
					name={ohipCheckboxId}
				/>
				<span className={styles.ohipCheckboxLabel}>{checkboxLabel}</span>
			</label>
		</FieldSet>
	);
};

export default OhipFieldSet;
