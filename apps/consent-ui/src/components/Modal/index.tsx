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

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import Card from 'src/components/Card';
import Button from 'src/components/Button';
import LinkButton from 'src/components/Button/LinkButton';

import { ModalConfig, ModalContext, defaultModalContext } from './types';
import styles from './Modal.module.scss';

const ModalContext = createContext<ModalContext>(defaultModalContext);

const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [config, setConfig] = useState<ModalConfig>({});
	const {
		title,
		message,
		actionButtonText,
		cancelButtonText,
		onActionClick,
		actionLink,
		onCancelClick,
		cancelLink,
		actionDisabled,
		cancelDisabled,
	} = config;

	const value = useMemo(
		() => ({
			setIsOpen,
			setConfig,
		}),
		[setIsOpen, setConfig],
	);

	return (
		<ModalContext.Provider value={value}>
			{isOpen && (
				<div className={styles.modal}>
					<Card className={styles.card} dropShadow="none">
						{title && <h3>{title}</h3>}
						{message && <p>{message}</p>}
						{(actionButtonText || cancelButtonText) && (
							<div className={styles.buttons}>
								{onCancelClick && (
									<Button onClick={onCancelClick} variant="secondary" disabled={cancelDisabled}>
										{cancelButtonText}
									</Button>
								)}
								{cancelLink && (
									<LinkButton href={cancelLink} variant="secondary">
										{cancelButtonText}
									</LinkButton>
								)}
								{onActionClick && (
									<Button onClick={onActionClick} disabled={actionDisabled}>
										{actionButtonText}
									</Button>
								)}
								{actionLink && <LinkButton href={actionLink}>{actionButtonText}</LinkButton>}
							</div>
						)}
					</Card>
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
