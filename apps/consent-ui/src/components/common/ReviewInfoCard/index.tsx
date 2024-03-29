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

import clsx from 'clsx';

import type { ValidLanguage } from 'src/i18n/types';

import LocalizedLink from '../Link/LocalizedLink';
import RequiredAsterisk from '../Form/RequiredAsterisk';
import type { RouteName } from '../Link/types';

import styles from './ReviewInfoCard.module.scss';

const ReviewInfoCard = ({
	name,
	linkLang,
	className,
	boxColor = 'green',
	fields,
	title,
	children, // subtitle
	editText,
	required = false,
}: {
	name: RouteName;
	linkLang: ValidLanguage;
	className?: string;
	boxColor?: 'green' | 'grey';
	fields?: {
		label: string;
		value: string;
	}[];
	title: string;
	children: React.ReactNode;
	editText: string;
	required?: boolean;
}) => {
	return (
		<div className={clsx(styles.reviewInfoCard, styles[boxColor], className)}>
			<div className={clsx(styles.header)}>
				<h2 className={styles.title}>{title}</h2>
				<LocalizedLink role={`button`} name={name} linkLang={linkLang}>
					{editText}
				</LocalizedLink>
			</div>
			<div className={clsx(styles.subtitle)}>
				{children}
				{required && <RequiredAsterisk />}
			</div>
			{fields && (
				<div className={styles.fields}>
					{fields.map((field) => (
						<div key={`${field.label}-${field.value}`} className={styles.field}>
							<h3 className={styles.fieldLabel}>{field.label}</h3>
							<div className={styles.fieldValue}>{field.value || '--'}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ReviewInfoCard;
