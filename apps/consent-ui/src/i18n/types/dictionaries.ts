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

import { ValidLanguage } from './languages';

export const namespaces = [
	'ancestry',
	'birth-sex',
	'common',
	'consents-step-1',
	'consents-step-2',
	'consents-step-3',
	'consents-step-4',
	'consents-step-5',
	'dashboard',
	'footer',
	'gender',
	'genetics-clinic',
	'header',
	'invite',
	'landing-page',
	'province',
	'register',
] as const;

export type ValidNamespace = (typeof namespaces)[number];

export type Translation = (k: string, params?: { [key: string]: string | number }) => string;

export type GetDictionary = {
	[k in ValidLanguage]: (namespace: ValidNamespace) => Promise<{ [k: string]: string }>;
};

export type GetTranslation = (
	language?: ValidLanguage,
	namespace?: ValidNamespace,
) => Promise<Translation>;
