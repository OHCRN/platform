import styles from './HamburgerMenu.module.scss';

const HamburgerMenu = ({
	registerLabel,
	loginLabel,
}: {
	registerLabel: string;
	loginLabel: string;
}) => {
	return (
		<div>
			<div className={styles.hamburgerLine}>{registerLabel}</div>
			<div className={styles.hamburgerLine}>{loginLabel}</div>
		</div>
	);
};

export default HamburgerMenu;
