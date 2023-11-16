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

function InProgress({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<g id="icons/inprogress">
				<path
					id="Oval"
					d="M51.2066 25C51.2066 38.2146 40.0086 49 26.1033 49C12.198 49 1 38.2146 1 25C1 11.7854 12.198 1 26.1033 1C40.0086 1 51.2066 11.7854 51.2066 25Z"
					stroke="currentColor"
					stroke-width="2"
				/>
				<ellipse id="Oval_2" cx="15.6617" cy="25" rx="3.13239" ry="3" fill="currentColor" />
				<ellipse id="Oval_3" cx="26.1031" cy="25" rx="3.13239" ry="3" fill="currentColor" />
				<ellipse id="Oval_4" cx="36.5445" cy="25" rx="3.13239" ry="3" fill="currentColor" />
			</g>
		</svg>
	);
}

export default InProgress;
