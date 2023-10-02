import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './Button.module.scss';

import { ButtonColor, ButtonSize, ButtonVariant, ButtonLayout } from '.';

const LinkButton = ({
	href,
	variant = 'primary',
	color = 'default',
	size = 'base',
	layout = 'default',
	children,
	className = '',
}: {
	href: string;
	children: ReactNode;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	layout?: ButtonLayout;
	className?: string;
}) => {
	return (
		<Link
			href={href}
			className={clsx(
				styles.base,
				styles[variant],
				styles[color],
				styles[size],
				styles[layout],
				className,
			)}
			role="button"
		>
			{children}
		</Link>
	);
};

export default LinkButton;
