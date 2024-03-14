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
import { ValidLanguage } from 'src/i18n/types';

import {
	mockDataGuardian,
	mockDataParticipant,
	mockDataSubstitute,
} from './generateConsentPdf/mockData';
import { displayConsentPdf, downloadConsentPdf } from './generateConsentPdf';
import { GenerateConsentPdfParams } from './generateConsentPdf/types';

/**
 * Temporary component for generating PDFs for different user scenarios.
 */
const TempPdfButtons = ({
	currentLang,
	studyConsentPdfUrl,
}: {
	currentLang: ValidLanguage;
	studyConsentPdfUrl: string;
}) => {
	const [docUrl, setDocUrl] = useState<string | undefined>();

	const displayPdf = async (data: GenerateConsentPdfParams) => {
		const pdf = await displayConsentPdf(data, currentLang, studyConsentPdfUrl, [10, 11]);
		pdf && setDocUrl(pdf);
	};
	const downloadPdf = async (data: GenerateConsentPdfParams) => {
		await downloadConsentPdf(data, currentLang, studyConsentPdfUrl);
	};

	const displayParticipantPdf = async () => {
		await displayPdf(mockDataParticipant);
	};
	const displaySubstitutePdf = async () => {
		await displayPdf(mockDataSubstitute);
	};
	const displayGuardianPdf = async () => {
		await displayPdf(mockDataGuardian);
	};
	const downloadParticipantPdf = async () => {
		await downloadPdf(mockDataParticipant);
	};
	const downloadSubstitutePdf = async () => {
		await downloadPdf(mockDataSubstitute);
	};
	const downloadGuardianPdf = async () => {
		await downloadPdf(mockDataGuardian);
	};

	return (
		<div>
			<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
				TEMP Display PDFs:
				<Button onClick={displayParticipantPdf}>Participant</Button>
				<Button onClick={displaySubstitutePdf}>Substitute</Button>
				<Button onClick={displayGuardianPdf}>Guardian</Button>
			</div>
			<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
				TEMP Download PDFs:
				<Button onClick={downloadParticipantPdf}>Participant</Button>
				<Button onClick={downloadSubstitutePdf}>Substitute</Button>
				<Button onClick={downloadGuardianPdf}>Guardian</Button>
			</div>
			{docUrl && <iframe src={docUrl} width="800" height="750" />}
		</div>
	);
};

export default TempPdfButtons;
