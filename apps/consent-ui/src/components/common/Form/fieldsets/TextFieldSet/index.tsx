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
import { useId } from 'react';
import clsx from 'clsx';

import { FormTextFieldSetProps } from 'src/components/common/Form/types';
import InputError from 'src/components/common/Form/fieldsets/InputError';
import useCallout from 'src/components/common/Form/fieldsets/Callout/useCallout';
import Callout from 'src/components/common/Form/fieldsets/Callout';
import TextInput from 'src/components/common/Form/fieldsets/inputs/TextInput';
import FieldSet from 'src/components/common/Form/fieldsets/FieldSet';
import FieldLabel from 'src/components/common/Form/fieldsets/FieldLabel';
import fieldSetStyles from 'src/components/common/Form/fieldsets/FieldSet/FieldSet.module.scss';

import styles from './TextFieldSet.module.scss';

Object.assign(styles, fieldSetStyles);

const TextFieldSet = <T extends FieldValues>({
	calloutText,
	className,
	error,
	label,
	name,
	required = false,
	type = 'text',
	variant = 'largeDesktop',
}: FormTextFieldSetProps<T>) => {
	const { showCallout, hideCallout, calloutVisible } = useCallout();
	const idPrefix = useId();

	const fieldId = `${idPrefix}-${name}`;
	const calloutId = `${idPrefix}-callout`;

	return (
		<FieldSet className={className} variant={variant}>
			<FieldLabel className={styles.labelGridArea} fieldId={fieldId} required={required}>
				{label}
			</FieldLabel>

			<div className={styles.inputGridArea}>
				<TextInput
					ariaProps={{ 'aria-describedby': calloutId }}
					className={clsx(styles.textInput, error && styles.error, styles[variant])}
					id={fieldId}
					name={name}
					onBlur={hideCallout}
					onFocus={showCallout}
					required={required}
					type={type}
				/>
				{error && <InputError>{error}</InputError>}
			</div>

			{calloutText && (
				<Callout
					className={styles.calloutGridArea}
					id={calloutId}
					isActive={calloutVisible}
					variant={variant}
				>
					{calloutText}
				</Callout>
			)}
		</FieldSet>
	);
};

export default TextFieldSet;
