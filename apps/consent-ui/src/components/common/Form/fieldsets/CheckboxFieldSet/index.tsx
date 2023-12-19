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

import { FieldValues } from 'react-hook-form';
import clsx from 'clsx';

import RequiredAsterisk from 'src/components/common/Form/RequiredAsterisk';
import { FormCheckboxFieldSetProps } from 'src/components/common/Form/types';
import InputError from 'src/components/common/Form/fieldsets/InputError';
import CheckboxInput from 'src/components/common/Form/fieldsets/inputs/CheckboxInput';

import styles from './CheckboxFieldSet.module.scss';

const CheckboxFieldSet = <T extends FieldValues>({
	className,
	description,
	disabled = false,
	error,
	name,
	required = false,
	title,
}: FormCheckboxFieldSetProps<T>) => {
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
			<label htmlFor={name} className={styles.label}>
				<CheckboxInput required={required} name={name} className={styles.checkboxInput} />
				<span className={styles.description}>
					{description}
					{required && !title && <RequiredAsterisk />}
				</span>
			</label>
			{error && <InputError>{error}</InputError>}
		</fieldset>
	);
};

export default CheckboxFieldSet;
