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

import { FormInputProps } from 'src/components/common/Form/types';
import { handleMouseDownBlur } from 'src/components/utils';

const CheckboxInput = <T extends FieldValues>({
	ariaProps = {},
	disabled,
	className,
	id,
	name,
	required,
}: FormInputProps<T>) => {
	const { register, setFocus } = useFormContext();

	return (
		<input
			{...register(name)}
			aria-required={required}
			className={className}
			disabled={disabled}
			id={id}
			onMouseDown={handleMouseDownBlur}
			onClick={() => {
				// force focus change & onBlur validation in safari
				setFocus(name);
			}}
			type="checkbox"
			{...ariaProps}
		/>
	);
};

export default CheckboxInput;
