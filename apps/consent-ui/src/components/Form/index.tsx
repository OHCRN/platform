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

import { Ref } from 'react';
import { useForm as useReactHookForm, SubmitHandler, UseFormRegister } from 'react-hook-form';

// TODO 1 zod schema validation
type ClinicianInviteFormInputs = {
	firstName: string;
	lastName: string;
	preferredName?: string;
};

const TextField = ({
	fieldRef,
	name,
	onBlur,
	onChange,
	required = false,
}: {
	fieldRef: Ref<any>;
	name: string;
	onBlur: any;
	onChange: any;
	required?: boolean;
}) => {
	return (
		<input
			id={name}
			name={name}
			onBlur={onBlur}
			onChange={onChange}
			ref={fieldRef}
			required={required}
		/>
	);
};

// TODO add generics
const FieldWrapper = ({
	fieldName,
	register,
	required = false,
}: {
	fieldName: keyof ClinicianInviteFormInputs;
	register: UseFormRegister<ClinicianInviteFormInputs>;
	required?: boolean;
}) => {
	// call react-hook-form register function
	// then pass down its properties to a UI component
	const { name, onChange, onBlur, ref } = register(fieldName, { required });

	return (
		<TextField fieldRef={ref} name={name} onBlur={onBlur} onChange={onChange} required={required} />
	);
};

const Form = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useReactHookForm<ClinicianInviteFormInputs>();
	const onSubmit: SubmitHandler<ClinicianInviteFormInputs> = (data) => console.log({ data });

	console.log('lastName', watch('lastName'));

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldWrapper register={register} fieldName="firstName" required />
			<FieldWrapper register={register} fieldName="lastName" required />
			<FieldWrapper register={register} fieldName="preferredName" />
			{errors.lastName && <span>This field is required</span>}

			<input type="submit" />
		</form>
	);
};

export default Form;
