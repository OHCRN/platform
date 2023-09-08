// TODO: fix urlJoin error
// import urlJoin from 'url-join';

import { getAppConfig } from '../config';

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

// PI-DAS
// TODO: add Type instead of any
const getParticipantPiData = async (participantId: string): Promise<any> => {
	const { piDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await fetch(`${piDasUrl}/participants/${participantId}`).then((res) => res.json());
	return result.participant;
};

// KEYS-DAS
// TODO: add Type instead of any
const getParticipantOhipKey = async (participantId: string): Promise<any> => {
	const { keysDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await fetch(`${keysDasUrl}/ohip-keys/${participantId}`).then((res) => res.json());
	return result.ohipKey.ohipPrivateKey;
};

// PHI-DAS
// TODO: add Type instead of any
const getParticipantOhipNumber = async (ohipPrivateKey: string): Promise<any> => {
	const { phiDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await fetch(`${phiDasUrl}/ohip/${ohipPrivateKey}`).then((res) => res.json());
	return result.ohipData.ohipNumber;
};

// CONSENT-DAS
// TODO: add Type instead of any
const getParticipantConsentData = async (participantId: string): Promise<any> => {
	const { consentDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await fetch(`${consentDasUrl}/participants/${participantId}`).then((res) =>
		res.json(),
	);
	return result.participant;
};
