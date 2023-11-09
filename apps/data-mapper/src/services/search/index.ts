import { getParticipantConsentData } from './consentDas.js';
import { getParticipantOhipKey } from './keysDas.js';
import { getParticipantOhipNumber } from './phiDas.js';
import { getParticipantPiData } from './piDas.js';

// combines data from respective DASes to return a single Participant object
// TODO: add Type instead of any
export const getParticipant = async (participantId: string): Promise<any> => {
	const participantPiData = await getParticipantPiData(participantId);
	const participantOhipKey = await getParticipantOhipKey(participantId);
	const participantOhipNumber = await getParticipantOhipNumber(participantOhipKey);
	const participantConsentData = await getParticipantConsentData(participantId);

	return {
		...participantPiData,
		ohipNumber: participantOhipNumber,
		emailVerified: participantConsentData.emailVerified,
	};
};
