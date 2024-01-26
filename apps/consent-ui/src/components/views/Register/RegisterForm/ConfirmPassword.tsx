'use client';

import { SyntheticEvent } from 'react';
import { useFormContext } from 'react-hook-form';

const ConfirmPassword = ({ labelText, error }: { labelText: string; error: any }) => {
	const { getValues, register } = useFormContext();

	const { onBlur, onChange, name, ref } = register('confirmPassword', {
		validate: (value) => value === getValues('password'),
	});

	const handleBlur = (e: SyntheticEvent) => {
		onBlur(e);
		const confirmPassword = (e.target as HTMLInputElement).value;
		const password = getValues('password');
		console.log(confirmPassword, password);
		if (password !== confirmPassword) {
			console.log('mismatch!');
			// setError('confirmPassword', { type: 'custom', message: 'passwordMismatch' });
		}
	};

	return (
		<>
			<label htmlFor="currentPassword">{labelText}</label>
			<input
				aria-required={true}
				name={name}
				onBlur={handleBlur}
				onChange={onChange}
				ref={ref}
				style={{ border: '1px solid orange', marginLeft: '4rem' }}
				type="password"
			/>
			{error}
		</>
	);
};
export default ConfirmPassword;
