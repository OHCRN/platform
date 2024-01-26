'use client';

import { useFormContext } from 'react-hook-form';

const ConfirmPassword = ({ labelText, error }: { labelText: string; error: any }) => {
	const { register } = useFormContext();

	const { onBlur, onChange, name, ref } = register('confirmPassword');

	return (
		<>
			<label htmlFor="currentPassword">{labelText}</label>
			<input
				aria-required={true}
				name={name}
				onBlur={onBlur}
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
