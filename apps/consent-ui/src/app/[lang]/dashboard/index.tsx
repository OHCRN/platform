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

import Link from 'next/link';

import { getTranslation, ValidLanguage } from '@/i18n';

const Dashboard = async ({ currentLang }: { currentLang: ValidLanguage }) => {
	const translate = await getTranslation(currentLang);
	return (
		<div style={{ width: 500 }}>
			<h2>{translate('dashboard')}</h2>
			<Link href={`/${currentLang}`}>{translate('home')}</Link>
			<p>Test out sticky header/footer</p>
			<p>
				Ad adipisicing laborum in sunt occaecat aliqua est excepteur. Excepteur qui eu consectetur
				non est non anim ut magna sunt esse ullamco. Non non do proident et est adipisicing velit do
				nostrud dolor commodo aute labore ex. Id do laborum aliqua consequat est magna culpa qui.
				Magna in nulla eiusmod esse et laborum voluptate ad non occaecat in. Elit pariatur dolor
				enim officia dolore minim excepteur est Lorem. Et elit officia ut culpa minim ad in sunt
				magna aliqua. Minim ex ipsum laborum enim enim esse veniam dolor in. Irure ipsum dolor amet
				nisi nostrud sint. Ut cupidatat labore ut labore. Cupidatat et in officia eiusmod tempor.
				Lorem mollit proident aliquip consequat minim irure velit mollit eiusmod. Ex velit non aute
				ea deserunt eiusmod dolor officia irure proident.
			</p>
			<p>
				Nulla dolor eiusmod cupidatat do. Lorem labore aliquip elit incididunt proident. Cillum non
				aliqua adipisicing nulla exercitation consectetur cupidatat. Proident reprehenderit fugiat
				nostrud officia et. Enim esse sint veniam occaecat exercitation culpa cillum labore
				consectetur laborum cupidatat. Dolor amet reprehenderit non excepteur proident occaecat
				quis. Enim magna eu Lorem non enim.
			</p>
			<p>
				Elit irure amet proident eu. Exercitation minim fugiat proident pariatur ut elit culpa
				excepteur magna aliqua mollit labore. Qui elit duis amet incididunt anim ut consectetur
				pariatur do ullamco laborum consequat. Quis magna deserunt do aliquip duis sint. Nostrud do
				ad est pariatur consectetur. Eu anim occaecat sint aute labore pariatur excepteur tempor
				qui. Id ut voluptate mollit in veniam mollit cillum fugiat do laboris fugiat. Magna ut
				officia aliquip laborum nisi consequat nostrud sit quis ea quis cupidatat. Excepteur do
				Lorem commodo ea consectetur sit ut anim. Incididunt adipisicing exercitation enim do nulla
				irure. Mollit eiusmod laborum aliqua reprehenderit sit consequat exercitation nisi laborum
				aute sunt velit.
			</p>
			<p>
				Non sunt aliqua exercitation dolor voluptate excepteur nisi deserunt nisi ullamco. Aute et
				duis anim non adipisicing ex. Magna adipisicing ex ad voluptate dolor consequat labore
				ullamco velit minim in nostrud ex incididunt. Laborum nostrud dolore voluptate sint. Laboris
				non ex ea velit. Aliquip adipisicing laborum laborum nulla elit enim magna culpa ut sunt
				veniam. Id non ullamco deserunt irure.
			</p>
			<p>
				Irure ut eiusmod nulla ea consectetur do ea. Voluptate cupidatat ea eiusmod elit officia
				minim aute dolor non cupidatat reprehenderit sunt sint ad. Officia proident aliquip Lorem
				culpa cillum culpa proident consequat fugiat fugiat quis deserunt cupidatat. Nostrud nostrud
				proident irure qui ea voluptate dolore occaecat labore. Non occaecat exercitation elit
				laborum eiusmod laboris.
			</p>
			<p>
				Nulla quis amet fugiat enim qui et occaecat. Dolor ipsum et adipisicing qui consectetur ut.
				Irure ipsum aliqua commodo et anim. Excepteur irure ullamco cupidatat mollit deserunt amet.
				Esse officia aute ea deserunt in aliquip laboris reprehenderit duis.
			</p>
		</div>
	);
};

export default Dashboard;
