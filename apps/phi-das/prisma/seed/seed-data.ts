import { Prisma } from '../../src/generated/client/index.js';

const ohipData: Prisma.OhipCreateInput[] = [
	{
		id: 'cllgscubn000108mo6goq2gjl',
		ohipPrivateKey: 'cllgsdpy4000208mo0gk0djuy',
		ohipNumber: '1234567890AA'
	},
	{
		id: 'cllgsrff8000008mndd928h8v',
		ohipPrivateKey: 'cllgsrjrt000108mn0nxvfzc3',
		ohipNumber: '1234567890BB'
	},
	{
		id: 'cllgsrruu000208mnhq6wh7e6',
		ohipPrivateKey: 'cllgsrw92000308mn09obgujg',
		ohipNumber: '1234567890CC'
	},
];

export {
	ohipData,
};
