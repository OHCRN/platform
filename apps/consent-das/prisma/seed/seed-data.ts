import { Prisma, ConsentCategory, ConsentGroup, ConsentQuestionId } from '../../src/generated/client/index.js';

const participants: Prisma.ParticipantCreateInput[] = [
	{
		id: 'cllgostgz000008l3fk0w',
		emailVerified: false,
		isGuardian: false,
		consentGroup: ConsentGroup.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	},
	{
		id: 'cllgoufw3000208l3c6gy',
		emailVerified: false,
		isGuardian: false,
		consentGroup: ConsentGroup.ADULT_CONSENT,
	},
	{
		id: 'cllgouzph000308l35o99',
		emailVerified: false,
		isGuardian: false,
		consentGroup: ConsentGroup.GUARDIAN_CONSENT_OF_MINOR,
	},
];

const consentQuestions: Prisma.ConsentQuestionCreateInput[] = [
	{
		id: ConsentQuestionId.INFORMED_CONSENT__READ_AND_UNDERSTAND,
		isActive: true,
		category: ConsentCategory.INFORMED_CONSENT,
	},
	{
		id: ConsentQuestionId.RELEASE_DATA__CLINICAL_AND_GENETIC,
		isActive: true,
		category: ConsentCategory.CONSENT_RELEASE_DATA,
	},
	{
		id: ConsentQuestionId.RELEASE_DATA__DE_IDENTIFIED,
		isActive: true,
		category: ConsentCategory.CONSENT_RELEASE_DATA,
	},
	{
		id: ConsentQuestionId.RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
		isActive: true,
		category: ConsentCategory.CONSENT_RESEARCH_PARTICIPATION,
	},
	{
		id: ConsentQuestionId.RESEARCH_PARTICIPATION__CONTACT_INFORMATION,
		isActive: true,
		category: ConsentCategory.CONSENT_RESEARCH_PARTICIPATION,
	},
	{
		id: ConsentQuestionId.RECONTACT__FUTURE_RESEARCH,
		isActive: true,
		category: ConsentCategory.CONSENT_RECONTACT,
	},
	{
		id: ConsentQuestionId.RECONTACT__SECONDARY_CONTACT,
		isActive: true,
		category: ConsentCategory.CONSENT_RECONTACT,
	},
	{
		id: ConsentQuestionId.REVIEW_SIGN__SIGNED,
		isActive: true,
		category: ConsentCategory.CONSENT_REVIEW_SIGN,
	},
];

const clinicianInvites: Prisma.ClinicianInviteCreateInput[] = [
	{
		id: 'clmarsvhd000008jngksv',
		clinicianFirstName: 'Steven',
		clinicianInstitutionalEmailAddress: 'doctor.strange@example.com',
		clinicianLastName: 'Strange',
		clinicianTitleOrRole: 'Neurosurgeon',
		consentGroup: 'ADULT_CONSENT',
		consentToBeContacted: true,
	},
];

export { participants, consentQuestions, clinicianInvites };
