'use client';

import Button from 'src/components/common/Button';
import Help from 'src/components/common/Icons/Help';

import styles from './HelpButton.module.scss';

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
