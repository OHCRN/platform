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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm, SubmitHandler, UseFormRegister } from 'react-hook-form';

const clinicianInviteFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(10),
	preferredName: z.string().optional(),
	email: z.string().min(1).email(),
});

type ClinicianInviteFormSchema = z.infer<typeof clinicianInviteFormSchema>;

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
	fieldName: keyof ClinicianInviteFormSchema;
	register: UseFormRegister<ClinicianInviteFormSchema>;
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
	} = useReactHookForm<ClinicianInviteFormSchema>({
		resolver: zodResolver(clinicianInviteFormSchema),
	});
	const onSubmit: SubmitHandler<ClinicianInviteFormSchema> = (data) => console.log('data', data);

	console.log('lastName', watch('lastName'));

	console.log('errors', errors);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FieldWrapper register={register} fieldName="firstName" required />
			<FieldWrapper register={register} fieldName="lastName" required />
			<FieldWrapper register={register} fieldName="preferredName" />
			{errors.lastName && <span>{errors.lastName?.message}</span>}

			<input type="submit" />
		</form>
	);
};

export default Form;
