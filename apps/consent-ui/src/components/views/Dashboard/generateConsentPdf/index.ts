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

import { ConsentGroup, ConsentQuestionId, LifecycleState } from 'types/entities';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

import { ValidLanguage } from 'src/i18n';

import { GenerateConsentPdfParams } from './types';
import { settingsByLang, settingsGeneric } from './settings';

// TEMP not final list
export const PDF_CONSENT_GROUPS_WITH_GUARDIAN: ConsentGroup[] = [
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR,
	ConsentGroup.enum.GUARDIAN_CONSENT_OF_MINOR_INCLUDING_ASSENT,
	ConsentGroup.enum.YOUNG_ADULT_CONSENT,
];

// TEMP not final list
export const PDF_CONSENT_GROUPS_WITH_SUBSTITUTE: ConsentGroup[] = [
	ConsentGroup.enum.ADULT_CONSENT_SUBSTITUTE_DECISION_MAKER,
];

// TEMP not final list
export const PDF_ALLOWED_LIFECYCLE_STATES: LifecycleState[] = [LifecycleState.enum.CONSENTED];

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
 * Modify consent PDF template with the user's information.
 * Use with downloadConsentPdf (for end users) or displayConsentPdfSinglePage (for development).
 */
const modifyConsentPdf = async (
	{
		consentGroup,
		currentLifecycleState,
		guardianName,
		isGuardian,
		mockDate,
		mockSignatureImage,
		participantFirstName,
		participantLastName,
		RECONTACT__FUTURE_RESEARCH,
		RECONTACT__SECONDARY_CONTACT,
		RESEARCH_PARTICIPATION__CONTACT_INFORMATION,
		RESEARCH_PARTICIPATION__FUTURE_RESEARCH,
	}: GenerateConsentPdfParams,
	currentLang: ValidLanguage,
	pdfUrl: string,
) => {
	if (!PDF_ALLOWED_LIFECYCLE_STATES.includes(currentLifecycleState)) {
		return null;
	}

	const { pdfDoc, pdfPages } = await getPdf(pdfUrl);

	// SETTINGS
	const settings = Object.assign({}, settingsByLang[currentLang], settingsGeneric);
	const { consent: consentSettings, signature: signatureSettings } = settings.pages;

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
	// embed helvetica font
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

	// determine type of user (guardian, participant, substitute)
	// add signature, name, date

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
	const pdfDoc = await modifyConsentPdf(params, currentLang, pdfUrl);
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
 * Display one page from the consent PDF, ex. in an iframe. This is intended for development purposes.
 * Don't call this function in a useEffect, because it has poor performance that way.
 * @example
 * const [docUrl, setDocUrl] = useState<string | undefined>();
 * const getGuardianPdf = async () => {
 * 	const pdf = await displayConsentPdfSinglePage(mockDataGuardian, currentLang, pdfUrl, 10);
 * 	pdf && setDocUrl(pdf);
 * };
 * return (
 * 	<>
 * 		<Button onClick={getGuardianPdf}>Guardian</Button>
 * 		<iframe src={docUrl} width="800" height="1000" />
 * 	</>
 * );
 */
export const displayConsentPdfSinglePage = async (
	params: GenerateConsentPdfParams,
	currentLang: ValidLanguage,
	pdfUrl: string,
	pageNumber: number,
) => {
	const pdfDoc = await modifyConsentPdf(params, currentLang, pdfUrl);
	if (!pdfDoc || typeof pdfDoc === 'string') {
		return false;
	}
	const subDocument = await PDFDocument.create();
	const copiedPage = await subDocument.copyPages(pdfDoc, [pageNumber]);
	subDocument.addPage(copiedPage[0]);
	const subPdfBytes = await subDocument.save();
	const pdfBlob = new Blob([subPdfBytes], { type: 'application/pdf' });
	return URL.createObjectURL(pdfBlob);
};
