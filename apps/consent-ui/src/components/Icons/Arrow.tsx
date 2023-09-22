import React from 'react';

function Arrow({ classes }: { classes?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={classes} fill="none" viewBox="0 0 7 10">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M.193.226a.714.714 0 00.033 1.01L4.24 5 .226 8.765a.714.714 0 10.977 1.042L6.33 5 1.203.193a.714.714 0 00-1.01.033z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export default Arrow;
