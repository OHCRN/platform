'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Form from 'src/components/common/Form';
// import { ValidLanguage } from 'src/i18n';
// import { ConsentReviewSignFormDictionary } from 'src/i18n/locales/en/consentReviewSignForm';
// import ReviewInfoCard from 'src/components/common/ReviewInfoCard';

export const ConsentReviewSignRequest = z.object({ stub: z.string().min(1) });
export type ConsentReviewSignRequest = z.infer<typeof ConsentReviewSignRequest>;

// const stubData = {
// 	preferredName: 'Homer Simpson',
// 	genderIdentity: 'Man',
// 	dateOfBirth: '09/25/1975',
// };

const ConsentReviewSignForm = () =>
	// 	{ }: // currentLang,
	// // formDict,
	// {
	// 	currentLang: ValidLanguage;
	// 	// formDict: ConsentReviewSignFormDictionary;
	// }
	{
		// setup react-hook-form
		const methods = useForm<ConsentReviewSignRequest>({
			mode: 'onBlur',
			resolver: zodResolver(ConsentReviewSignRequest),
		});

		const { handleSubmit, register } = methods;

		const onSubmit: SubmitHandler<ConsentReviewSignRequest> = (data, event) => {
			event?.preventDefault();
			console.log('form data', data);

			// go to next page
		};

		// const cardProps = {
		// 	editText: formDict.edit,

		// 	linkLang: currentLang,
		// };

		// const releaseHealthData = [
		// 	{
		// 		label: formDict.preferredName,
		// 		value: stubData.preferredName,
		// 	},
		// 	{ label: formDict.genderIdentity, value: stubData.genderIdentity },
		// 	{ label: formDict.dateOfBirth, value: stubData.dateOfBirth },
		// ];

		return (
			<>
				{/* {formDict.agree} */}
				{/* <ReviewInfoCard
				boxColor="green"
				fields={releaseHealthData}
				name="consent-1"
				required
				title={formDict.releaseHealthDataTitle}
				{...cardProps}
			>
				<>
					<b>{formDict.agree}</b> {formDict.releaseHealthDataDescription}
				</>
			</ReviewInfoCard> */}

				{/* E-SIGNATURE */}
				<FormProvider {...methods}>
					<Form onSubmit={handleSubmit(onSubmit)}>
						{/* TODO add e-signature, remove this input */}
						<input {...register('stub')} />
					</Form>
				</FormProvider>
			</>
		);
	};

export default ConsentReviewSignForm;
