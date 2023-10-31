'use client';

import Button from 'src/components/Button';
import Help from 'src/components/Icons/Help';

import styles from './Header.module.scss';

const HelpButton = ({ label }: { label: string }) => {
	return (
		<Button
			variant="secondary"
			color="green"
			layout="left-icon"
			className={styles.helpButton}
			onClick={() => console.log('HALP')}
		>
			<Help />
			{label}
		</Button>
	);
};

export default HelpButton;
