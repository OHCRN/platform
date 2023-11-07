import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import RightArrow from 'src/components/Icons/Arrow';

import styles from './Button.module.scss';

import { ButtonColor, ButtonSize, ButtonVariant, ButtonAction } from '.';

const LinkButton = ({
	href,
	variant = 'primary',
	color = 'default',
	size = 'base',
	action,
	children,
	className = '',
	LeftIcon,
	RightIcon,
}: {
	href: string;
	children: ReactNode;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	action?: ButtonAction;
	LeftIcon?: ReactNode;
	RightIcon?: ReactNode;
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
				(action === 'prev' || LeftIcon) && styles['left-icon'],
				(action === 'next' || RightIcon) && styles['right-icon'],
				className,
			)}
			role="button"
		>
			{action === 'prev' ? <RightArrow className={styles['left-arrow']} /> : LeftIcon}
			{children}
			{action === 'next' ? <RightArrow /> : RightIcon}
		</Link>
	);
};

export default LinkButton;
