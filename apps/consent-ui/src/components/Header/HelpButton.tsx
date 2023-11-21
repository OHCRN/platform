'use client';

import Button from '@/components/Button';
import Help from '@/components/Icons/Help';

import styles from './Header.module.scss';

const HelpButton = ({ label }: { label: string }) => {
	return (
		<Button
			variant="secondary"
			color="green"
			layout="icon"
			className={styles.helpButton}
			onClick={() => console.log('HALP')}
		>
			<Help />
			{label}
		</Button>
	);
};

export default HelpButton;
