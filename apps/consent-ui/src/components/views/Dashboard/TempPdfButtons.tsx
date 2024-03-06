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

'use client';

import { useState } from 'react';

import Button from 'src/components/common/Button';
import { ValidLanguage } from 'src/i18n';
import { useAppConfigContext } from 'src/components/providers/AppConfigContextProvider';

import {
	mockDataGuardian,
	mockDataParticipant,
	mockDataSubstitute,
} from './generateConsentPdf/mockData';
import generateConsentPdf from './generateConsentPdf';

/**
 * Temporary component for generating PDFs for different user scenarios.
 */
const TempPdfButtons = ({ currentLang }: { currentLang: ValidLanguage }) => {
	// TEMP - not able to access app config inside generateConsentPdf()
	const { CONSENT_PDF_URL_EN, CONSENT_PDF_URL_FR } = useAppConfigContext();
	const pdfUrl = {
		en: CONSENT_PDF_URL_EN,
		fr: CONSENT_PDF_URL_FR,
	}[currentLang];

	const [docUrl, setDocUrl] = useState<string | undefined>();

	const getParticipantPdf = async () => {
		const pdf = await generateConsentPdf(mockDataParticipant, currentLang, pdfUrl);
		pdf && setDocUrl(pdf);
	};

	const getSubstitutePdf = async () => {
		const pdf = await generateConsentPdf(mockDataSubstitute, currentLang, pdfUrl);
		pdf && setDocUrl(pdf);
	};

	const getGuardianPdf = async () => {
		const pdf = await generateConsentPdf(mockDataGuardian, currentLang, pdfUrl);
		pdf && setDocUrl(pdf);
	};

	return (
		<div>
			<div style={{ display: 'flex', gap: '1rem' }}>
				TEMP Generate PDFs:
				<Button onClick={getParticipantPdf}>Participant</Button>
				<Button onClick={getSubstitutePdf}>Substitute</Button>
				<Button onClick={getGuardianPdf}>Guardian</Button>
			</div>
			{docUrl && <iframe src={docUrl} width="800" height="1000" />}
		</div>
	);
};

export default TempPdfButtons;
