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

import React from 'react';

function Doctor({ classes }: { classes?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classes}
			width="45"
			height="52"
			fill="none"
			viewBox="0 0 45 52"
		>
			<path
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M35.147 2.96c1.76 0 3.186 1.464 3.186 3.269v5.719c0 8.572-12.745 15.523-12.745 15.523s-12.745-6.95-12.745-15.523v-5.72c0-1.804 1.427-3.267 3.186-3.267"
			></path>
			<path
				fillRule="evenodd"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M20.686 3.451a2.452 2.452 0 01-4.902 0 2.452 2.452 0 014.902 0zM35.392 3.451a2.452 2.452 0 01-4.902 0 2.452 2.452 0 014.902 0z"
				clipRule="evenodd"
			></path>
			<path
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M25.098 27.47v5.883M25.44 35.76v6.416c0 4.873 3.984 8.824 8.898 8.824 4.913 0 8.897-3.95 8.897-8.824 0-4.873-3.983-8.823-8.897-8.823H10.882M35.392 18.647s-3.297 1.96-10.294 1.96-10.294-1.96-10.294-1.96M40.294 42.176a5.882 5.882 0 11-5.883-5.882"
			></path>
			<path
				fillRule="evenodd"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M10.882 33.353a4.903 4.903 0 11-9.805-.001 4.903 4.903 0 019.805 0z"
				clipRule="evenodd"
			></path>
			<path
				fillRule="evenodd"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M6.96 33.353a.98.98 0 11-1.96 0 .98.98 0 111.96 0z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export default Doctor;
