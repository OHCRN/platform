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

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm as useReactHookForm, SubmitHandler } from 'react-hook-form';

import FormField from '../forms/FormField';

export const clinicianInviteFormSchema = z.object({
	// email: z.string().min(1).email(),
	firstName: z.string().min(1),
	lastName: z.string().min(25), // DEMO fake validation
	preferredName: z.string().optional(),
});

export type ClinicianInviteFormSchema = z.infer<typeof clinicianInviteFormSchema>;

const ClinicianInviteForm = () => {
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
			<h2>Patient Information</h2>
			<p>* indicates required field</p>
			<FormField
				register={register}
				error={errors.firstName?.type}
				fieldName="firstName"
				label="First Name"
				type="text"
				required
			/>
			<FormField
				register={register}
				error={errors.lastName?.type}
				fieldName="lastName"
				label="Last Name"
				type="text"
				required
			/>
			<FormField
				register={register}
				error={errors.preferredName?.type}
				fieldName="preferredName"
				label="Preferred Name"
				type="text"
			/>

			<input type="submit" />
		</form>
	);
};

export default ClinicianInviteForm;
