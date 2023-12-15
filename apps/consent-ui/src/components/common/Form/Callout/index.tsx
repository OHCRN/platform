// mobileTablet (bottom arrow, hidden on desktop)
// desktop

import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Callout.module.scss';

// NOTE: this component visually resembles a tooltip,
// but it takes up space in the page -
// it doesn't float on top of other components.

const Callout = ({
	children,
	variant,
}: {
	children: ReactNode;
	variant: 'desktop' | 'mobileTablet';
}) => {
	return <div className={clsx(styles.callout, styles[variant])}>{children}</div>;
};

export default Callout;
