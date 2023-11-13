// import urlJoin from 'url-join';

import { getAppConfig } from '../config.js';

import axiosClient from './axiosClient.js';

// PI-DAS
// TODO: add Type instead of any
const getParticipantPiData = async (participantId: string): Promise<any> => {
	const { piDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await axiosClient.get(`${piDasUrl}/participants/${participantId}`);
	return result.data.participant;
};

// KEYS-DAS
// TODO: add Type instead of any
const getParticipantOhipKey = async (participantId: string): Promise<any> => {
	const { keysDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await axiosClient.get(`${keysDasUrl}/ohip-keys/${participantId}`);
	return result.data.ohipKey.ohipPrivateKey;
};

// PHI-DAS
// TODO: add Type instead of any
const getParticipantOhipNumber = async (ohipPrivateKey: string): Promise<any> => {
	const { phiDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await axiosClient.get(`${phiDasUrl}/ohip/${ohipPrivateKey}`);
	return result.data.ohipData.ohipNumber;
};

// CONSENT-DAS
// TODO: add Type instead of any
const getParticipantConsentData = async (participantId: string): Promise<any> => {
	const { consentDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	const result = await axiosClient.get(`${consentDasUrl}/participants/${participantId}`);
	return result.data.participant;
};

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
