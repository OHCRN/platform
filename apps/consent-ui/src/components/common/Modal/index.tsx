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

import ReactModal from 'react-modal';
import { ComponentProps, ReactNode } from 'react';

import { ValidLanguage } from 'src/i18n';

import LinkButton from '../Button/LinkButton';
import Button from '../Button';

import styles from './Modal.module.scss';

// props needed when using Modal in a component ex. RegisterDateOfBirthErrorModal
export type ModalComponentProps = {
	closeModal: () => void;
	currentLang: ValidLanguage;
	modalIsOpen: boolean;
};

type ModalProps = {
	actionButtonText?: ReactNode;
	actionDisabled?: boolean;
	actionLink?: ComponentProps<typeof LinkButton>['href'];
	cancelButtonText?: ReactNode;
	cancelDisabled?: boolean;
	cancelLink?: ComponentProps<typeof LinkButton>['href'];
	children?: ReactNode;
	closeModal: () => void;
	contentLabel: string;
	modalIsOpen: boolean;
	onActionClick?: ComponentProps<typeof Button>['onClick'];
	onCancelClick?: ComponentProps<typeof Button>['onClick'];
	title?: string;
};

const Modal = ({
	actionButtonText,
	actionDisabled,
	actionLink,
	cancelButtonText,
	cancelDisabled,
	cancelLink,
	children,
	closeModal,
	contentLabel,
	modalIsOpen,
	onActionClick,
	onCancelClick,
	title,
}: ModalProps) => {
	return (
		<ReactModal
			className={styles.modal}
			contentLabel={contentLabel}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			overlayClassName={styles.overlay}
		>
			{title && <h3>{title}</h3>}
			<div className={styles.body}>{children}</div>
			{(actionButtonText || cancelButtonText) && (
				<div className={styles.buttons}>
					{cancelButtonText &&
						(cancelLink ? (
							<LinkButton href={cancelLink} variant="secondary">
								{cancelButtonText}
							</LinkButton>
						) : (
							<Button
								onClick={onCancelClick || closeModal}
								variant="secondary"
								disabled={cancelDisabled}
							>
								{cancelButtonText}
							</Button>
						))}
					{actionButtonText &&
						(actionLink ? (
							<LinkButton href={actionLink}>{actionButtonText}</LinkButton>
						) : (
							<Button onClick={onActionClick || closeModal} disabled={actionDisabled}>
								{actionButtonText}
							</Button>
						))}
				</div>
			)}
		</ReactModal>
	);
};

export default Modal;
