// import urlJoin from 'url-join';

import { getAppConfig } from '../config.js';

// PI-DAS
const createParticipantPiData = async ({
	name,
	email,
}: {
	name: string;
	email: string;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { piDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	// TODO: use axios instead of fetch
	const result = await fetch(`${piDasUrl}/participants`, {
		method: 'POST',
		body: JSON.stringify({ name, email }),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
	return result.participant;
};

// KEYS-DAS
// TODO: add Type instead of any
const createParticipantOhipKey = async (participantId: string): Promise<any> => {
	const { keysDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	// TODO: use axios instead of fetch
	const result = await fetch(`${keysDasUrl}/ohip-keys`, {
		method: 'POST',
		body: JSON.stringify({ participantId }),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
	return result.ohipKey;
};

// PHI-DAS
const saveParticipantOhipNumber = async ({
	ohipPrivateKey,
	ohipNumber,
}: {
	ohipPrivateKey: string;
	ohipNumber: string;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { phiDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	// TODO: use axios instead of fetch
	const result = await fetch(`${phiDasUrl}/ohip`, {
		method: 'POST',
		body: JSON.stringify({ ohipPrivateKey, ohipNumber }),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
	return result.ohipData.ohipNumber;
};

// CONSENT-DAS
const createParticipantConsentData = async ({
	participantId,
	emailVerified,
}: {
	participantId: string;
	emailVerified: boolean;
}): Promise<any> => {
	// TODO: add Type instead of any
	const { consentDasUrl } = getAppConfig();
	// TODO: use urlJoin
	// TODO: add error handling
	// TODO: use axios instead of fetch
	const result = await fetch(`${consentDasUrl}/participants`, {
		method: 'POST',
		body: JSON.stringify({ participantId, emailVerified }),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());
	return result.participant;
};

// separates data along concerns to store in respective DASes
export const createParticipant = async ({
	name,
	email,
	ohipNumber,
	emailVerified,
}: {
	name: string;
	email: string;
	ohipNumber: string;
	emailVerified: boolean;
}): Promise<any> => {
	// TODO: add Type instead of any
	const participantPiData = await createParticipantPiData({ name, email });
	const participantId = participantPiData.id;
	const participantOhipKey = await createParticipantOhipKey(participantId);
	const ohipPrivateKey = participantOhipKey.ohipPrivateKey;
	const participantOhipNumber = await saveParticipantOhipNumber({
		ohipPrivateKey,
		ohipNumber,
	});
	const participantConsentData = await createParticipantConsentData({
		participantId,
		emailVerified,
	});

	return {
		...participantPiData,
		ohipNumber: participantOhipNumber,
		emailVerified: participantConsentData.emailVerified,
	};
};
