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

import styles from './ReviewInfoCard.module.scss';

const ReviewInfoCard = ({
	// layout = 'column',
	className,
	fields,
	title,
	subtitle,
	required = false,
}: {
	// layout?: 'column' | 'row';
	className?: string;
	fields?: {
		label: string;
		value: string;
	}[];
	title: string;
	subtitle: string;
	required?: boolean;
}) => {
	return (
		<div className={clsx(styles.reviewInfoCard, className)}>
			<div className={clsx(styles.header)}>
				<h2>{title}</h2>
				<div className={styles.redirectButton}>Edit</div>
			</div>
			<div className={clsx(styles.subtitle)}>
				{subtitle}
				{required && <span className={styles.required}>*</span>}
			</div>
			<div className={styles.fields}>
				{fields?.map((field, i) => (
					<div key={i}>
						<h2>{field.label}</h2>
						<div>{field.value}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ReviewInfoCard;
