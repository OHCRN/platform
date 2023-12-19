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
import { SyntheticEvent } from 'react';

import { FormTextInputProps } from '../../types';

const TextInput = <T extends FieldValues>({
	className,
	id,
	name,
	onBlur = () => {},
	onFocus = () => {},
	required = false,
	type = 'text',
	ariaProps,
}: FormTextInputProps<T>) => {
	const { register } = useFormContext();
	const { onBlur: registerOnBlur, onChange, ref, name: registerName } = register(name);
	const handleBlur = (e: SyntheticEvent) => {
		console.log('hello');
		onBlur();
		registerOnBlur(e);
	};
	const handleFocus = () => {
		console.log('hello');
		onFocus();
	};
	return (
		<input
			aria-required={required}
			className={clsx(`${type}-input`, className)}
			id={id}
			name={registerName}
			onBlur={handleBlur}
			onChange={onChange}
			onFocus={handleFocus}
			ref={ref}
			type={type}
			{...ariaProps}
		/>
	);
};

export default TextInput;
