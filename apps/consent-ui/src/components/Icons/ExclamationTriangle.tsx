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

function ExclamationTriangle({ classes }: { classes?: string }) {
	return (
		<svg className={classes} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 24">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M4.195 23.433A4.199 4.199 0 010 19.238c0-.73.192-1.448.555-2.082l8.741-15.3a3.691 3.691 0 016.406 0l8.745 15.3a4.195 4.195 0 01-3.644 6.277H4.195zM11.327 3.02l-8.741 15.3a1.851 1.851 0 001.609 2.769h16.608a1.851 1.851 0 001.609-2.77L13.671 3.02a1.347 1.347 0 00-2.344 0z"
				clipRule="evenodd"
			></path>
			<path fill="currentColor" d="M11.327 8.2H13.671V14.448999999999998H11.327z"></path>
			<circle cx="12.499" cy="17.574" r="1.172" fill="currentColor"></circle>
		</svg>
	);
}

export default ExclamationTriangle;
