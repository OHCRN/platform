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

import { ConsentStatus } from 'types/entities';
import clsx from 'clsx';

import Success from 'src/components/Icons/Success';
import InProgress from 'src/components/Icons/InProgress';
import Incomplete from 'src/components/Icons/Incomplete';

import styles from './ProgressHeader.module.scss';

type Section = {
	title: string;
	status: ConsentStatus;
	currentSection?: boolean;
};

const { INCOMPLETE, COMPLETE } = ConsentStatus.enum;

const ProgressHeader = async ({ sections }: { sections: Section[] }) => {
	return (
		<div className={styles.header}>
			{sections.map((section, index) => (
				<div className={styles.section} key={section.title}>
					{section.currentSection ? (
						<InProgress className={styles['in-progress']} />
					) : section.status == INCOMPLETE ? (
						<Incomplete className={styles.incomplete} />
					) : (
						<Success className={styles.success} />
					)}
					<h3>{section.title}</h3>
					{index != sections.length - 1 && (
						<span
							className={clsx(
								styles.divider,
								section.status === COMPLETE && styles['completed-section'],
							)}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default ProgressHeader;
