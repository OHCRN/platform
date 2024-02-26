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

import { type NextRequest } from 'next/server';

/**
 * @openapi
 * tags:
 *   - name: Mock Requests
 *     description: Mock API requests for initial UI development
 */

/**
 * @openapi
 * /api/mock
 * 	get:
 * 		tags:
 * 			- Mock Requests
 *  	name: Get Mock Data
 * 		description: Get back exactly what you send in the URL parameters, for initial UI development.
 * 		parameters:
 *			- name: body
 *				in: query
 *				description: JSON object of data you expect to receive from this GET request.
 * 				schema:
 * 					type: string
 * 			- name: status
 *				in: query
 *				description: Status code for API response.
 * 				schema:
 * 					type: string
 * 			- name: statusText
 *				in: query
 *				description: Status text for API response.
 * 				schema:
 * 					type: string
 * 		responses:
 * 			200:
 * 				description: You'll receive what you send in, or 200 OK & empty {} body if there's no parameters.
 */
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const statusString = searchParams.get('status') || '200';
	const status = Number(statusString) || 200;
	const statusText = searchParams.get('statusText') || 'OK';
	const bodyString = searchParams.get('body') || '{}';
	const body = JSON.parse(bodyString);

	return Response.json(body, { status, statusText });
}

/**
 * @openapi
 * /api/mock
 *   post:
 *     tags:
 *       - Mock Requests
 *   name: Post Mock Data
 *   description: Get back exactly what you send in the request body, for initial UI development.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            body:
 *              type: object
 *            status:
 *              type: number
 *            statusText
 *              type: string
 *   responses:
 *     200:
 *       description: You'll receive what you send in, or 200 OK & empty {} body if there's no body provided.
 */
export async function POST(request: Request) {
	const data = await request.json();
	const { body = {}, status = 200, statusText = 'OK' } = data;

	return Response.json(body, { status, statusText });
}
