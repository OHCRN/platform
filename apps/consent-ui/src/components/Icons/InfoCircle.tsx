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

function InfoCircle({ classes }: { classes?: string }) {
	return (
		<svg className={classes} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
			<g clipPath="url(#clip0_34_3961)">
				<rect
					width="22"
					height="22"
					x="1"
					y="1.508"
					stroke="currentColor"
					strokeWidth="2"
					rx="11"
				></rect>
				<path fill="currentColor" d="M13 18H15V24H13z" transform="rotate(-180 13 18)"></path>
				<ellipse
					cx="12"
					cy="9"
					fill="currentColor"
					rx="1"
					ry="1"
					transform="rotate(-180 12 9)"
				></ellipse>
			</g>
			<defs>
				<clipPath id="clip0_34_3961">
					<path fill="#fff" d="M0 0H24V24H0z" transform="translate(0 .508)"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export default InfoCircle;
