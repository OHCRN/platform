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

import clsx from 'clsx';
import { ReactNode } from 'react';

import Callout from 'src/components/common/Form/fieldsets/Callout';
import FieldLabel from 'src/components/common/Form/fieldsets/FieldLabel';
import { InfoButtonProps } from 'src/components/common/InfoButton';

import styles from './FieldSet.module.scss';

export interface FieldSetProps {
	calloutContent?: ReactNode;
	calloutId: string;
	calloutVisible: boolean;
	children: ReactNode;
	className?: string;
	fieldId: string;
	infoButtonProps?: InfoButtonProps;
	label: string;
	required?: boolean;
	withNarrowDesktopLayout?: boolean;
}

const FieldSet = ({
	calloutContent,
	calloutId,
	calloutVisible,
	children,
	className,
	fieldId,
	infoButtonProps,
	label,
	required,
	withNarrowDesktopLayout = false,
}: FieldSetProps) => {
	return (
		<fieldset
			className={clsx(styles.fieldSet, !withNarrowDesktopLayout && styles.wideDesktop, className)}
		>
			<FieldLabel
				className={styles.labelGridArea}
				fieldId={fieldId}
				infoButtonProps={infoButtonProps}
				required={required}
			>
				{label}
			</FieldLabel>

			<div className={styles.inputGridArea}>{children}</div>

			{calloutContent && (
				<Callout
					className={styles.calloutGridArea}
					id={calloutId}
					isVisible={calloutVisible}
					withNarrowDesktopLayout={withNarrowDesktopLayout}
				>
					{calloutContent}
				</Callout>
			)}
		</fieldset>
	);
};

export default FieldSet;
