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

import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import { FormFieldSetSharedProps } from 'src/components/common/Form/types';
import InputError from 'src/components/common/Form/fieldsets/InputError';
import CheckboxInput from 'src/components/common/Form/fieldsets/inputs/CheckboxInput';

import TextInput from '../inputs/TextInput';

import styles from './OHIPFieldSet.module.scss';

export type OHIPFieldSetProps<T extends FieldValues> = FormFieldSetSharedProps<T> & {
	title: string;
	subtitle: ReactNode;
	checkboxLabel: ReactNode;
};

const OHIPFieldSet = <T extends FieldValues>({
	className,
	disabled,
	error,
	name,
	required,
	label,
	title,
	subtitle,
	checkboxLabel,
}: OHIPFieldSetProps<T>) => {
	const OHIPFieldId = useId();
	const OHIPTextInputId = `${OHIPFieldId}-text`;
	const OHIPCheckboxId = `${OHIPFieldId}-checkbox`;

	const { watch, setValue } = useFormContext();
	const checkboxValue: boolean = watch(OHIPCheckboxId);

	useEffect(() => {
		if (checkboxValue) {
			setValue(name, '' as any);
		}
	}, [checkboxValue, name, setValue]);

	return (
		<fieldset
			className={clsx(
				styles.OHIPFieldset,
				disabled && styles.disabled,
				error && styles.error,
				className,
			)}
		>
			<div className={styles.OHIPHeader}>
				{title && (
					<h4 className={styles.title}>
						{title}
						{required && <RequiredAsterisk />}
					</h4>
				)}
				{subtitle && (
					<h4 className={styles.subtitle}>
						{subtitle}
						{required && !title && <RequiredAsterisk />}
					</h4>
				)}
			</div>

			<div className={styles.OHIPWrapper}>
				<div className={styles.OHIPTextWrapper}>
					<TextInput
						className={styles.OHIPTextInput}
						disabled={disabled || checkboxValue}
						id={OHIPTextInputId}
						name={name}
						required={required}
						type={'text'}
					/>

					{label && <span className={styles.label}>{label}</span>}
				</div>

				<label htmlFor={OHIPCheckboxId} className={styles.OHIPCheckboxWrapper}>
					<CheckboxInput
						className={styles.OHIPCheckboxInput}
						disabled={disabled}
						id={OHIPCheckboxId}
						name={OHIPCheckboxId}
						required={required}
					/>
					<span className={styles.OHIPCheckboxLabel}>{checkboxLabel}</span>
				</label>
				{error && <InputError>{error}</InputError>}
			</div>
		</fieldset>
	);
};

export default OHIPFieldSet;
