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

import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Button from 'src/components/common/Button';
import { ValidLanguage } from 'src/i18n';
import { getLocalizedRoute } from 'src/components/common/Link/utils';
import { useModal } from 'src/components/common/Modal';

import { ConsentStepRoute } from './types';
import FormEditedModal from './FormEditedModal';
import styles from './StepsNavigation.module.scss';

const PreviousButton = ({
	children,
	currentLang,
	prevRoute,
}: {
	children: ReactNode;
	currentLang: ValidLanguage;
	prevRoute: ConsentStepRoute;
}) => {
	const {
		formState: { isDirty },
	} = useFormContext();

	const router = useRouter();

	const { openModal, closeModal } = useModal();
	const formEditedModalConfig = {
		title: 'Modal text TBD',
		actionButtonText: 'OK',
		onActionClick: closeModal,
		onCancelClick: closeModal,
		body: <FormEditedModal />,
	};

	const handleClick = () => {
		if (isDirty) {
			// form has been edited - warn & prevent user from leaving page
			openModal(formEditedModalConfig);
		} else {
			// form hasn't been edited - go to previous step
			router.push(getLocalizedRoute(currentLang, prevRoute));
		}
	};

	return (
		<Button
			action="prev"
			className={styles.button}
			onClick={handleClick}
			onMouseDown={(e) => e.preventDefault()}
			variant="secondary"
		>
			{children}
		</Button>
	);
};

export default PreviousButton;
