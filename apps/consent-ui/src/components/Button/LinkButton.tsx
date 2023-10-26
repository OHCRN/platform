import { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import RightArrow from 'src/components/Icons/Arrow';

import styles from './Button.module.scss';

import { ButtonColor, ButtonSize, ButtonVariant, ButtonLayout, ButtonAction } from '.';

const LinkButton = ({
	href,
	variant = 'primary',
	color = 'default',
	size = 'base',
	layout = 'default',
	action,
	children,
	className = '',
}: {
	href: string;
	children: ReactNode;
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	layout?: ButtonLayout;
	action?: ButtonAction;
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
				action && styles.icon,
				className,
			)}
			role="button"
		>
			{action === 'prev' && <RightArrow className={styles['left-arrow']} />}
			{children}
			{action === 'next' && <RightArrow />}
		</Link>
	);
};

export default LinkButton;
