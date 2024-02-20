import Link from 'next/link';

import styles from './HamburgerMenu.module.scss';

const HamburgerMenu = ({ options }: { options: { label: React.ReactNode; link?: string }[] }) => {
	return (
		<div>
			{options.map((option, index) => (
				<Link href={option.link || ''} className={styles.hamburgerLine} key={index}>
					{option.label}
				</Link>
			))}
		</div>
	);
};

export default HamburgerMenu;
