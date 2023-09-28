/** @type {import('tailwindcss').Config} */

import colors from './src/theme/colors';

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors,
		fontFamily: {
			sans: ['Montserrat', 'Lato', 'Arial', 'sans-serif'],
		},
		fontSize: {
			xs: ['0.81rem', { lineHeight: '1.25rem', fontWeight: '400' }], // 13px, 20px
			sm: ['0.875rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 14px, 24px
			base: ['1rem', { lineHeight: '1.625rem', fontWeight: '400' }], // 16px, 26px
			lg: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }], // 18px, 28px
			xl: ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }], // 24px, 32px
			'2xl': ['2.25rem', { lineHeight: '2.875rem', fontWeight: '400' }], // 36px 46px
			'3xl': ['2.875rem', { lineHeight: '3.5rem', fontWeight: '400' }], // 46px, 56px
		},
		fontWeight: {
			normal: '400',
			bold: '600',
			header: '700',
		},
		dropShadow: {
			sm: '0px 2px 4px 0px rgba(0, 0, 0, 0.26)',
			base: ['0px 4px 6px -1px rgba(0, 0, 0, 0.1)', '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'],
			lg: '0px 15px 10px -3px rgba(0, 0, 0, 0.1)',
		},
		padding: {
			sm: '1rem',
			md: '3rem',
			lg: '5rem',
			button: {
				base: '1.2rem 2.5rem',
			},
		},
		extend: {
			screens: {
				sm: '480px',
				md: '1024px',
			},
		},
	},
	plugins: [],
};
