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

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm, SubmitHandler } from 'react-hook-form';

import FormField from '../Form/FormField';

import {
	ClinicianInviteFormFieldsDictionary,
	ClinicianInviteFormTextDictionary,
	ClinicianInviteFormErrorDictionary,
} from './types';

const ClinicianInviteForm = ({
	errorDict,
	fieldDict,
	textDict,
}: {
	errorDict: ClinicianInviteFormErrorDictionary;
	fieldDict: ClinicianInviteFormFieldsDictionary;
	textDict: ClinicianInviteFormTextDictionary;
}) => {
	const schema = z.object({
		firstName: z.string().min(2, {
			message: errorDict.required,
		}),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useReactHookForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => console.log('data', data);

	return (
		<form>
			<h2>{textDict['patient-information']}</h2>
			<p>
				<span style={{ color: 'red' }}>*</span> {textDict['indicates-required-field']}
			</p>
			<FormField
				register={register}
				error={errors.firstName?.message}
				fieldName="firstName"
				label={fieldDict.firstName.label}
				type={fieldDict.firstName.type}
				required={fieldDict.firstName.required}
			/>

			<input type="submit" onClick={handleSubmit(onSubmit)} />
		</form>
	);
};

export default ClinicianInviteForm;
