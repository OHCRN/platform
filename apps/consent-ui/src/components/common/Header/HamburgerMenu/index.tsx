import Link from 'next/link';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Dispatch, SetStateAction } from 'react';

import styles from './HamburgerMenu.module.scss';

const HamburgerMenu = ({
	options,
	setShowHamburgerMenu,
}: {
	options: { label: React.ReactNode; link?: string }[];
	setShowHamburgerMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const ref = useDetectClickOutside({
		onTriggered: () => {
			setShowHamburgerMenu(false);
		},
	});

	return (
		<div className={styles.hamburgerContainer} ref={ref}>
			{options.map((option, index) => (
				<Link href={option.link || ''} className={styles.hamburgerLine} key={index}>
					{option.label}
				</Link>
			))}
		</div>
	);
};

export default HamburgerMenu;
