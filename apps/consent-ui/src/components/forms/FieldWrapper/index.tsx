import { ReactNode } from 'react';

const FieldWrapper = ({
	children,
	label,
	name,
	required = false,
}: {
	children: ReactNode;
	name: string;
	label: string;
	required: boolean;
}) => {
	return (
		<div>
			<div>
				<label htmlFor={name}>
					{label}
					{required && '*'}
				</label>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default FieldWrapper;
