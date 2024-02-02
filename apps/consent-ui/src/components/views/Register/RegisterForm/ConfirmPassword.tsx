'use client';

import { watch } from 'fs';

import { SyntheticEvent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const ConfirmPassword = ({ labelText, error }: { labelText: string; error: any }) => {
	const { getValues, register } = useFormContext();

	const { onBlur, onChange, name, ref } = register('confirmPassword');

	// const handleBlur = (e: SyntheticEvent) => {
	// 	onBlur(e);
	// 	const confirmPassword = (e.target as HTMLInputElement).value;
	// 	const password = getValues('password');
	// 	console.log(confirmPassword, password);
	// 	if (password !== confirmPassword) {
	// 		console.log('mismatch!');
	// 		// setError('confirmPassword', { type: 'custom', message: 'passwordMismatch' });
	// 	}
	// };

	// const watchPassword = watch('password');

	// useEffect(() => {}, [watchPassword]);

	return (
		<>
			<label htmlFor="currentPassword">{labelText}</label>
			<input
				aria-required={true}
				name={name}
				// onBlur={handleBlur}
				onChange={onChange}
				ref={ref}
				style={{ border: `3px solid ${error ? 'red' : 'green'}`, marginLeft: '4rem' }}
				type="password"
			/>
			{error}
		</>
	);
};
export default ConfirmPassword;
