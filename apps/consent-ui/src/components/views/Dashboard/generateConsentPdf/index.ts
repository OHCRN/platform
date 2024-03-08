/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { ConsentGroup, LifecycleState } from 'types/entities';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { format as formatDate } from 'date-fns';

import { ValidLanguage } from 'src/i18n';

import { GenerateConsentPdfParams } from './types';
import { settingsByLang, settingsGeneric } from './settings';

type UserType = 'guardian' | 'participant' | 'substitute';

const PDF_CONSENT_GROUPS_WITH_GUARDIAN: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	ConsentGroup.enum.YOUNG_ADULT_CONSENT,
];

const PDF_CONSENT_GROUPS_WITH_SUBSTITUTE: ConsentGroup[] = [
	ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
];

// TEMP not final list
const PDF_ALLOWED_LIFECYCLE_STATES: LifecycleState[] = [LifecycleState.enum.CONSENTED];

/**
 * Fetch template consent PDF from object storage and
 * return a document & an array of pages to use with pdf-lib.
 */
const getPdf = async (pdfUrl: string) => {
	const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
	const bytes = new Uint8Array(existingPdfBytes);
	const pdfDoc = await PDFDocument.load(bytes);
	const pdfPages = pdfDoc.getPages();
	return { pdfDoc, pdfPages };
};

/**
 * Specify user type, to determine which elements to display & their coordinates.
 */
const getUserType = (consentGroup: ConsentGroup): UserType => {
	if (PDF_CONSENT_GROUPS_WITH_GUARDIAN.includes(consentGroup)) {
		return 'guardian';
	} else if (PDF_CONSENT_GROUPS_WITH_SUBSTITUTE.includes(consentGroup)) {
		return 'substitute';
	} else {
		return 'participant';
	}
};

/**
 * Returns guardian name if available, or combines OHIP first & last names.
 */
const getPrintedName = (
	participantOhipFirstName: string,
	participantOhipLastName: string,
	guardianName?: string,
): string => guardianName || `${participantOhipFirstName} ${participantOhipLastName}`;

/**
 * Format date for the signature page.
 * TODO French date formatting
 */
const formatSignatureDate = (date: Date) => formatDate(date, 'MM/dd/y');

/**
 * Modify consent PDF template with the user's information.
 * Use with downloadConsentPdf (for users) or displayConsentPdf (for development).
 */
const generateConsentPdf = async (
	{
		consentGroup,
		currentLifecycleState,
		guardianName,
		mockDate,
		mockSignatureImage,
		participantOhipFirstName,
		participantOhipLastName,
		RECONTACT__FUTURE_RESEARCH,
		RECONTACT__SECONDARY_CONTACT,
		relationshipToParticipant,
		RESEARCH_PARTICIPATION__CONTACT_INFORMATION,
		RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
	}: GenerateConsentPdfParams,
	currentLang: ValidLanguage,
	pdfUrl: string,
) => {
	if (!PDF_ALLOWED_LIFECYCLE_STATES.includes(currentLifecycleState) || !pdfUrl) {
		return null;
	}

	const { pdfDoc, pdfPages } = await getPdf(pdfUrl);

	// SETTINGS
	const settings = { ...settingsGeneric, ...settingsByLang[currentLang] };
	const { consent: consentSettings, signature: signatureSettings } = settings.pages;
	const userType = getUserType(consentGroup);
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
	const textSettings = {
		...settings.text,
		font: helveticaFont,
		y: signatureSettings.yCoord[userType] + settings.text.size + 5,
	};

	// CONSENT PAGE
	const consentPageNumber = pdfPages[consentSettings.pageNumber];
	const consentFields = {
		RECONTACT__FUTURE_RESEARCH,
		RECONTACT__SECONDARY_CONTACT,
		RESEARCH_PARTICIPATION__CONTACT_INFORMATION,
		RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
	};

	// circle selected answers on consent page
	for (const field in consentFields) {
		consentPageNumber.drawEllipse({
			...settings.ellipse,
			x: consentFields[field as keyof typeof consentFields]
				? consentSettings.xCoord.yes
				: consentSettings.xCoord.no,
			y: consentSettings.yCoord[field as keyof typeof consentFields],
		});
	}

	// SIGNATURE PAGE
	const signaturePage = pdfPages[signatureSettings.pageNumber];

	// add signature image to the signature page
	const signatureImgBytes = await fetch(mockSignatureImage).then((res) => res.arrayBuffer());
	const signatureImage = await pdfDoc.embedPng(signatureImgBytes);
	signaturePage.drawImage(signatureImage, {
		...signatureImage.scale(settings.signatureImageScale),
		x: signatureSettings.xCoord.signaturePng,
		y: signatureSettings.yCoord[userType],
	});

	// add printed name to the signature page.
	// wraps to 2 lines of text if needed.
	const printedName = getPrintedName(
		participantOhipFirstName,
		participantOhipLastName,
		guardianName,
	);
	signaturePage.drawText(printedName, {
		...textSettings,
		x: signatureSettings.xCoord.printedName[userType],
	});

	// add date to the signature page
	const date = formatSignatureDate(mockDate);
	signaturePage.drawText(date, {
		...textSettings,
		x: signatureSettings.xCoord.date,
	});

	// for substitute decision makers, add relationship to the signature page
	if (userType === 'substitute' && relationshipToParticipant) {
		signaturePage.drawText(relationshipToParticipant, {
			...textSettings,
			x: signatureSettings.xCoord.relationshipToParticipant,
			y: signatureSettings.yCoord.relationshipToParticipant,
		});
	}

	return pdfDoc;
};

/**
 * Download completed consent PDF with the filename from the template PDF file.
 */
export const downloadConsentPdf = async (
	params: GenerateConsentPdfParams,
	currentLang: ValidLanguage,
	pdfUrl: string,
) => {
	const pdfDoc = await generateConsentPdf(params, currentLang, pdfUrl);
	if (!pdfDoc || typeof pdfDoc === 'string') {
		return;
	}
	const pdfBytes = await pdfDoc.save();
	const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
	const pdfFilenameArray = pdfUrl.split('/');
	const pdfFilename = pdfFilenameArray[pdfFilenameArray.length - 1];
	saveAs(pdfBlob, pdfFilename);
};

/**
 * Display pages from the consent PDF, ex. in an iframe. This is intended for development purposes.
 * Don't call this function in a useEffect, for performance reasons.
 * @example
 * const [docUrl, setDocUrl] = useState<string | undefined>();
 * const getGuardianPdf = async () => {
 * 	const pdf = await displayConsentPdf(mockDataGuardian, currentLang, pdfUrl, [10, 11]);
 * 	pdf && setDocUrl(pdf);
 * };
 * return (
 * 	<>
 * 		<Button onClick={getGuardianPdf}>Guardian</Button>
 * 		<iframe src={docUrl} width="800" height="750" />
 * 	</>
 * );
 */
export const displayConsentPdf = async (
	params: GenerateConsentPdfParams,
	currentLang: ValidLanguage,
	pdfUrl: string,
	pageNumbers: number[],
) => {
	const pdfDoc = await generateConsentPdf(params, currentLang, pdfUrl);
	if (!pdfDoc || typeof pdfDoc === 'string') {
		return false;
	}
	const subDocument = await PDFDocument.create();
	const copiedPages = await subDocument.copyPages(pdfDoc, pageNumbers);
	copiedPages.forEach((page) => {
		subDocument.addPage(page);
	});
	const subPdfBytes = await subDocument.save();
	const pdfBlob = new Blob([subPdfBytes], { type: 'application/pdf' });
	return URL.createObjectURL(pdfBlob);
};
