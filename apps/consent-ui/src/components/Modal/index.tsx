/*
 * Copyright (c) 2023 The Ontario Institute for Cancer Research. All rights reserved
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

import {
	ReactNode,
	isValidElement,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import Card from '@/components/Card';
import Button from '@/components/Button';
import LinkButton from '@/components/Button/LinkButton';

import { ModalConfig, ModalContextType, defaultModalContext } from './types';
import styles from './Modal.module.scss';

const ModalContext = createContext<ModalContextType>(defaultModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [config, setConfig] = useState<ModalConfig>({});
	const {
		title,
		body,
		actionButtonText,
		cancelButtonText,
		onActionClick,
		actionLink,
		onCancelClick,
		cancelLink,
		actionDisabled,
		cancelDisabled,
	} = config;

	const openModal = useCallback(
		(config: ModalConfig) => {
			setConfig(config);
			setIsOpen(true);
		},
		[setIsOpen, setConfig],
	);

	const closeModal = useCallback(() => {
		setConfig({});
		setIsOpen(false);
	}, [setIsOpen, setConfig]);

	const value = useMemo(
		() => ({
			openModal,
			closeModal,
		}),
		[openModal, closeModal],
	);

	const ref = useDetectClickOutside({ onTriggered: closeModal });

	return (
		<ModalContext.Provider value={value}>
			{isOpen && (
				<div className={styles.modal}>
					<div ref={ref}>
						<Card className={styles.card} dropShadow="none">
							{title && <h3>{title}</h3>}
							{body && isValidElement(body) ? body : body && <p>{body}</p>}
							{(actionButtonText || cancelButtonText) && (
								<div className={styles.buttons}>
									{cancelButtonText && onCancelClick && (
										<Button onClick={onCancelClick} variant="secondary" disabled={cancelDisabled}>
											{cancelButtonText}
										</Button>
									)}
									{cancelButtonText && cancelLink && (
										<LinkButton href={cancelLink} variant="secondary">
											{cancelButtonText}
										</LinkButton>
									)}
									{actionButtonText && onActionClick && (
										<Button onClick={onActionClick} disabled={actionDisabled}>
											{actionButtonText}
										</Button>
									)}
									{actionButtonText && actionLink && (
										<LinkButton href={actionLink}>{actionButtonText}</LinkButton>
									)}
								</div>
							)}
						</Card>
					</div>
				</div>
			)}
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	return useContext(ModalContext);
};

export default ModalProvider;
