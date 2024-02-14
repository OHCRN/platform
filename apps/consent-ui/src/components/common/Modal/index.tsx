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

import { ReactNode, ComponentProps } from 'react';

import Card from 'src/components/common/Card';
import Button from 'src/components/common/Button';
import LinkButton from 'src/components/common/Button/LinkButton';

import styles from './Modal.module.scss';

const Modal = ({
	actionButtonText,
	actionDisabled,
	actionLink,
	cancelButtonText,
	cancelDisabled,
	cancelLink,
	children,
	onActionClick,
	onCancelClick,
	title,
}: {
	actionButtonText?: ReactNode;
	actionDisabled?: boolean;
	actionLink?: ComponentProps<typeof LinkButton>['href'];
	cancelButtonText?: ReactNode;
	cancelDisabled?: boolean;
	cancelLink?: ComponentProps<typeof LinkButton>['href'];
	children?: ReactNode;
	onActionClick?: ComponentProps<typeof Button>['onClick'];
	onCancelClick?: ComponentProps<typeof Button>['onClick'];
	title?: string;
}) => {
	return (
		<Card className={styles.card} dropShadow="none">
			{title && <h3>{title}</h3>}
			<div className={styles.body}>{children}</div>
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
	);
};

export default Modal;
