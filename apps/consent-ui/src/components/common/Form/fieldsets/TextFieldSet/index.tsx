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
import { useEffect } from 'react';

import { FormTextFieldSetProps } from 'src/components/common/Form/types';
import useCallout from 'src/components/common/Form/Callout/useCallout';
import TextInput from 'src/components/common/Form/fieldsets/inputs/TextInput';
import FieldSet from 'src/components/common/Form/fieldsets/FieldSet';
import Callout from 'src/components/common/Form/Callout';

import styles from './TextFieldSet.module.scss';

const TextFieldSet = <T extends FieldValues>({
	calloutText = '',
	error,
	label,
	name,
	required = false,
	type = 'text',
}: FormTextFieldSetProps<T>) => {
	const { calloutVisible, hideCallout, showCallout } = useCallout();
	// temporarily show the callout
	useEffect(() => {
		if (calloutText) {
			showCallout();
		}
	}, [calloutText, showCallout]);
	console.log({ calloutText, calloutVisible });
	return (
		<FieldSet error={error} label={label} name={name} required={required}>
			{calloutText && calloutVisible && (
				<Callout variant="mobileTablet" id={`${name}-callout`}>
					{calloutText}
				</Callout>
			)}
			<TextInput
				aria-describedby={`#${name}-callout`}
				className={styles.textInput}
				name={name}
				onBlur={hideCallout}
				onFocus={showCallout}
				required={required}
				type={type}
			/>
			{calloutText && calloutVisible && <Callout variant="desktop">{calloutText}</Callout>}
		</FieldSet>
	);
};

export default TextFieldSet;
