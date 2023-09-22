import React from 'react';

function Chevron({ classes }: { classes?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classes}
			width="21"
			height="62"
			fill="none"
			viewBox="0 0 21 62"
		>
			<path stroke="currentColor" strokeWidth={1.5} d="M1 1l19 30L1 61"></path>
		</svg>
	);
}

export default Chevron;
