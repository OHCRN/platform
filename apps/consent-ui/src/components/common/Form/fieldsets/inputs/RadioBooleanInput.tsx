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

import { FieldValues, useFormContext, Controller } from 'react-hook-form';
import clsx from 'clsx';

import { FormInputProps } from 'src/components/common/Form/types';

type RadioBooleanInputProps<T extends FieldValues> = Omit<FormInputProps<T>, 'className'> & {
	id: string;
	groupClassName?: string;
	radioClassName?: string;
	wrapperClassName?: string;
	yesText: string;
	noText: string;
};

const RadioBooleanInput = <T extends FieldValues>({
	groupClassName,
	radioClassName,
	wrapperClassName,
	name,
	id,
	disabled,
	required,
	yesText,
	noText,
}: RadioBooleanInputProps<T>) => {
	const { control } = useFormContext();
	const radio1Id = id + '-radio-1';
	const radio2Id = id + '-radio-2';

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, onBlur, value } }) => (
				<div role="radiogroup" aria-required={required} className={clsx(groupClassName)}>
					<label htmlFor={radio1Id} className={clsx(wrapperClassName)}>
						<input
							type="radio"
							id={radio1Id}
							className={clsx('radio-input', radioClassName)}
							onBlur={onBlur}
							onChange={() => onChange(true)}
							checked={value === true}
							disabled={disabled}
						/>
						<span>{yesText}</span>
					</label>
					<label htmlFor={radio2Id} className={clsx(wrapperClassName)}>
						<input
							type="radio"
							id={radio2Id}
							className={clsx('radio-input', radioClassName)}
							onBlur={onBlur}
							onChange={() => onChange(false)}
							checked={value === false}
							disabled={disabled}
						/>
						<span>{noText}</span>
					</label>
				</div>
			)}
		/>
	);
};

export default RadioBooleanInput;
