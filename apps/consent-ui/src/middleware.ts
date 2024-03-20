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

import { NextResponse, NextRequest } from 'next/server';

import { defaultLanguage, supportedLanguages } from 'src/i18n/settings';

import { auth } from './app/auth';

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		// '/((?!_next).*)',
		'/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
	],
};

function middleware(request: NextRequest) {
	// TODO: for debugging, TO BE REMOVED
	const requestUrl = request.url;
	const requestHeaders = request.headers;
	console.info('[middleware] Request URL:', requestUrl);
	console.info('[middleware] Request Headers:', requestHeaders);

	// Check if there is any supported locale in the pathname
	const pathname = request.nextUrl.pathname;
	const pathnameIsMissingLocale = supportedLanguages.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);
	// Redirect if there is no locale
	// this setup will result in a 404 if the locale is not supported, as it will be treated as the pathname
	// i.e. `/es` would redirect to `/en/es`
	if (pathnameIsMissingLocale) {
		// TODO: nice-to-have - try to find locale via provided path; if not found, set locale to defaultLanguage
		// i.e. "/tableau-de-bord" -> {fr: "dashboard"} -> locale = "fr"
		const locale = defaultLanguage;

		return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
	}
	return NextResponse.next();
}

export default auth(middleware);
