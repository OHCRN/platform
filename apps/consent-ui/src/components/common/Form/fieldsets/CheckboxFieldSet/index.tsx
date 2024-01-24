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

import { FieldValues, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { ReactNode, useEffect, useId } from 'react';

import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import { FormFieldSetSharedProps } from 'src/components/common/Form/types';
import InputError from 'src/components/common/Form/fieldsets/InputError';
import CheckboxInput from 'src/components/common/Form/fieldsets/inputs/CheckboxInput';

import styles from './CheckboxFieldSet.module.scss';

export type CheckBoxFieldSetProps<T extends FieldValues> = Omit<
	FormFieldSetSharedProps<T>,
	| 'label' // uses title & description instead
	| 'withNarrowDesktopLayout' // same layout at all sizes
> & {
	description: ReactNode;
	title?: string;
};

const CheckboxFieldSet = <T extends FieldValues>({
	className,
	description,
	disabled,
	error,
	name,
	required,
	title,
}: CheckBoxFieldSetProps<T>) => {
	const checkboxId = useId();

	// validate checkbox onChange
	// - our forms validate onBlur. this is additional validation
	// - this validation uses a useEffect hook rather than the onChange event,
	//   to ensure the form state has been updated before validation occurs
	const {
		formState: { touchedFields },
		watch,
		trigger,
	} = useFormContext();
	const touchedField = touchedFields[name];
	const watchField = watch(name);
	useEffect(() => {
		if (touchedField) {
			// check if field is touched to prevent validation on initial render.
			trigger(name);
		}
	}, [name, touchedField, trigger, watchField]);

	return (
		<fieldset
			className={clsx(
				styles.checkboxFieldset,
				disabled && styles.disabled,
				error && styles.error,
				className,
			)}
		>
			{title && (
				<h4 className={styles.title}>
					{title}
					{required && <RequiredAsterisk />}
				</h4>
			)}
			<div className={styles.checkboxWrapper}>
				<CheckboxInput
					className={styles.checkboxInput}
					disabled={disabled}
					id={checkboxId}
					name={name}
					required={required}
				/>
				<label
					htmlFor={checkboxId}
					className={styles.label}
					onMouseDown={(e) => {
						// prevent blur event being called after mousedown,
						// which will allow a click event on this label/checkbox,
						// which will be followed automatically by a blur event (for validation)
						e.preventDefault();
					}}
				>
					<span className={styles.description}>
						{description}
						{required && !title && <RequiredAsterisk />}
					</span>
				</label>
			</div>
			{error && <InputError>{error}</InputError>}
		</fieldset>
	);
};

export default CheckboxFieldSet;
