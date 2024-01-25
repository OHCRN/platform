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

import { FieldValues } from 'react-hook-form';
import clsx from 'clsx';
import { ReactNode, useId } from 'react';

import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import { FormFieldSetSharedProps } from 'src/components/common/Form/types';
import InputError from 'src/components/common/Form/fieldsets/InputError';
import RadioInput from 'src/components/common/Form/fieldsets/inputs/RadioStringInput';

import styles from './RadioFieldSet.module.scss';

export type RadioFieldSetProps<T extends FieldValues> = Omit<
	FormFieldSetSharedProps<T>,
	'label' // uses title & description instead
> & {
	description: ReactNode;
	title?: string;
	yesLabel: string;
	noLabel: string;
};

const RadioFieldSet = <T extends FieldValues>({
	className,
	description,
	disabled,
	error,
	name,
	required,
	title,
	yesLabel,
	noLabel,
}: RadioFieldSetProps<T>) => {
	const id = useId();
	const radio1Id = id + '-radio-1';
	const radio2Id = id + '-radio-2';
	return (
		<fieldset
			className={clsx(
				styles.radioFieldset,
				disabled && styles.disabled,
				error && styles.error,
				className,
			)}
		>
			{title && (
				<legend className={styles.title}>
					<h4>
						{title}
						{required && <RequiredAsterisk />}
					</h4>
				</legend>
			)}
			<legend className={styles.description}>
				{description}
				{required && !title && <RequiredAsterisk />}
			</legend>
			<div className={styles.radiosWrapper}>
				<label htmlFor={radio1Id} className={styles.radioWrapper}>
					<RadioInput
						className={styles.radioInput}
						disabled={disabled}
						id={radio1Id}
						name={name}
						required={required}
						value={'Yes'}
					/>
					<span className={styles.radioLabel}>{yesLabel}</span>
				</label>
				<label htmlFor={radio2Id} className={styles.radioWrapper}>
					<RadioInput
						className={styles.radioInput}
						disabled={disabled}
						id={radio2Id}
						name={name}
						required={required}
						value={'No'}
					/>
					<span className={styles.radioLabel}>{noLabel}</span>
				</label>
			</div>
			{error && <InputError>{error}</InputError>}
		</fieldset>
	);
};

export default RadioFieldSet;
