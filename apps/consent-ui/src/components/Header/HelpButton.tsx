'use client';

import Button from '@/components/Button';
import Help from '@/components/Icons/Help';

import styles from './Header.module.scss';

const HelpButton = ({ label }: { label: string }) => {
	return (
		<Button
			variant="secondary"
			color="green"
			className={styles.helpButton}
			LeftIcon={<Help />}
			onClick={() => console.log('HALP')}
		>
			{label}
		</Button>
	);
};

export default HelpButton;
