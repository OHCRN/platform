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

import axios from 'axios';
import { RequestHandler } from 'express';
import { ErrorName, ErrorResponse } from 'types/httpErrors';

const { RECAPTCHA_ERROR } = ErrorName;

import { getAppConfig } from '../config.js';

const verifyRecaptcha = async (recaptchaToken?: string | null) => {
	const config = getAppConfig();

	if (!recaptchaToken) {
		// token not required for dev, but will be processed if provided.
		return process.env.NODE_ENV === 'development';
	}

	try {
		const recaptchaVerification = await axios.post(
			`https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.secretKey}&response=${recaptchaToken}`,
		);
		console.log('success?');
		return !!recaptchaVerification.data.success;
	} catch (error) {
		console.error('reCAPTCHA error', error);
		return false;
	}
};

/**
 * Router middleware to ensure the incoming request includes a valid reCAPTCHA token.
 * When added to a router, it is expected that the incoming request has a property in the request body
 *  containing a valid reCAPTCHA token. Any request missing this token or with an invalid token will be
 *  rejected with an HTTP 400 status.
 *
 * **Note:** the openAPI docs for this method will need to be manually updated to declare that a recaptcha
 *  token is needed!
 * @example
 * ```
 * router.post('/', recaptchaMiddleware, async (req, res) => {
 * 	// handle request knowing it has passed recaptcha validation
 * }
 * ```
 *
 * @param req
 * @param res
 * @param next
 */
export const recaptchaMiddleware: RequestHandler = async (req, res, next) => {
	const { recaptchaToken } = req.body;

	const recaptchaVerified = await verifyRecaptcha(recaptchaToken);

	if (recaptchaVerified) {
		next();
	} else {
		// TODO: Need a formatted error for reCAPTCHA validation failures
		res.status(400).json(ErrorResponse(RECAPTCHA_ERROR, 'Valid reCAPTCHA token is required.'));
	}
};
