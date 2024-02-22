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

import { StaticImageData } from 'next/image';

import CloseMenuIcon from 'src/../public/assets/images/x.svg';
import { ValidLanguage, getTranslation } from 'src/i18n';
import OhcrnImage from 'src/../public/assets/images/ohcrn_large.svg';
import HamburgerMenuIcon from 'src/../public/assets/images/hamburger.svg';

import HeaderContent from './HeaderContent';

const icons = {
	en: OhcrnImage,
	fr: OhcrnImage, // TODO: get FR icon
	closeHamburger: CloseMenuIcon,
	openHamburger: HamburgerMenuIcon,
};

export type HeaderIcons = {
	[key in keyof typeof icons]: StaticImageData;
};

const Header = ({ currentLang }: { currentLang: ValidLanguage }) => {
	const { translateNamespace } = getTranslation(currentLang);
	const textDict = translateNamespace('header');

	return <HeaderContent currentLang={currentLang} icons={icons} textDict={textDict} />;
};

export default Header;
