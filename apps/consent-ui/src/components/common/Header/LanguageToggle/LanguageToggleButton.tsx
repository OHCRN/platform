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

import { usePathname } from 'next/navigation';

import { ValidLanguage } from 'src/i18n';
import LocalizedLink from 'src/components/common/Link/LocalizedLink';
import { getLinkNameByPath } from 'src/components/common/Link/utils';

import styles from './LanguageToggleButton.module.scss';

const LanguageToggleButton = ({
	currentLang,
	fullToggleLabel,
	langToSelect,
}: {
	currentLang: ValidLanguage;
	fullToggleLabel: string;
	langToSelect: ValidLanguage;
}) => {
	const path = usePathname();
	const linkName = getLinkNameByPath(path, currentLang);

	return (
		<LocalizedLink
			name={linkName}
			linkLang={langToSelect}
			role="button"
			color="blue"
			variant="secondary"
		>
			<span className={styles['toggle-full']}>{fullToggleLabel}</span>
			<span className={styles['toggle-abbr']}>{langToSelect}</span>
		</LocalizedLink>
	);
};

export default LanguageToggleButton;
