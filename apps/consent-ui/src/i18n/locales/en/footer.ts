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

const dictionary = {
	oicrLogoAlt: 'Link to OICR Home',
	instagramLogoAlt: 'Link to Instagram',
	twitterLogoAlt: 'Link to Twitter',
	onGovtLogoAlt: 'Link to Ontario Government Home',
	overtureAlt: 'Link to Overture Home',
	githubAlt: 'Link to GitHub',
	about: 'About OHCRN',
	help: 'Help Centre',
	contact: 'Contact',
	privacy: 'Privacy Policy',
	terms: 'Terms & Conditions',
	copyright: '© {{ year }} Ontario Hereditary Cancer Research Network. All rights reserved.',
	ohcrnRegistry: 'OHCRN Registry {{ registryVersion }}',
	poweredBy: 'Powered by',
	api: 'API {{ apiVersion }}',
} satisfies Record<string, string>;

export type FooterDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
