import { Prisma, ConsentCategory } from '../../src/generated/client';

const participants: Prisma.ParticipantCreateInput[] = [
	{
		id: 'clmarsvhd000008jngksv45v6',
		emailVerified: false,
		isGuardian: false,
	},
	{
		id: 'clmart1bi000108jn9vkwdumh',
		emailVerified: false,
		isGuardian: false,
	},
	{
		id: 'clmart6nv000208jn9kf18da0',
		emailVerified: false,
		isGuardian: false,
	},
];

const consentQuestions: Prisma.ConsentQuestionCreateInput[] = [
	{
		id: 'informed-consent__read-and-understand',
		isActive: true,
		category: ConsentCategory.INFORMED_CONSENT,
	},
	{
		id: 'release-data__clinical-and-genetic',
		isActive: true,
		category: ConsentCategory.CONSENT_RELEASE_DATA,
	},
	{
		id: 'release-data__de-identified',
		isActive: true,
		category: ConsentCategory.CONSENT_RELEASE_DATA,
	},
	{
		id: 'research-participation__future-research',
		isActive: true,
		category: ConsentCategory.CONSENT_RESEARCH_PARTICIPATION,
	},
	{
		id: 'research-participation__contact-information',
		isActive: true,
		category: ConsentCategory.CONSENT_RESEARCH_PARTICIPATION,
	},
	{
		id: 'recontact__future-research',
		isActive: true,
		category: ConsentCategory.CONSENT_RECONTACT,
	},
	{
		id: 'recontact__secondary-contact',
		isActive: true,
		category: ConsentCategory.CONSENT_RECONTACT,
	},
	{
		id: 'review-sign__signed',
		isActive: true,
		category: ConsentCategory.CONSENT_REVIEW_SIGN,
	},
];

const clinicianInvites: Prisma.ClinicianInviteCreateInput[] = [
	{
		clinicianFirstName: 'Steven',
		clinicianInstitutionalEmailAddress: 'doctor.strange@example.com',
		clinicianLastName: 'Strange',
		clinicianTitle: 'Neurosurgeon',
		consentGroup: 'ADULT_CONSENT',
		consentToBeContacted: true,
		inviteSentDate: new Date('2023-10-03'),
	},
];

export { participants, consentQuestions, clinicianInvites };
