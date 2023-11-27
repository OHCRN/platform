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

import RequiredAsterisk from '../../RequiredAsterisk';
import { FormCheckboxFieldSetProps } from '../../types';
import CheckboxInput from '../inputs/CheckboxInput';

const CheckboxFieldSet = <T extends FieldValues, V extends boolean>({
	className,
	description,
	error,
	name,
	required = false,
	title,
	value,
}: FormCheckboxFieldSetProps<T, V>) => {
	return (
		<fieldset className={clsx('checkbox-fieldset', className)}>
			{title && (
				<h4>
					{title}
					{required && <RequiredAsterisk />}
				</h4>
			)}
			<label htmlFor={name} className="checkbox-fieldset__label">
				<CheckboxInput required={required} name={name} value={value} />
				<span className="checkbox-fieldset__description">
					{description}
					{required && !title && <RequiredAsterisk />}
				</span>
			</label>
			{error && <span style={{ color: 'red' }}>{error}</span>}
		</fieldset>
	);
};

export default CheckboxFieldSet;
