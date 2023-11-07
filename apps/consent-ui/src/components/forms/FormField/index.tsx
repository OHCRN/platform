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

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import TextInput from '../TextInput';

interface FormFieldProps<T extends FieldValues> {
	fieldName: Path<T>;
	register: UseFormRegister<T>;
	required?: boolean;
}

const FormFieldProps = <T extends FieldValues>({
	fieldName,
	register,
	required = false,
}: FormFieldProps<T>) => {
	// we can't pass refs to functional components.
	// this component creates the ref (needed for react-hook-form) for each field,
	// renames it to fieldRef, and passes it to the input component.

	const { name, onChange, onBlur, ref } = register(fieldName, { required });

	const fieldProps = {
		fieldRef: ref,
		name,
		onBlur,
		onChange,
		required,
	};

	return <TextInput {...fieldProps} />;
};

export default FormFieldProps;
