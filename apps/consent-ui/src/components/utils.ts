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

import { format } from 'date-fns';
import { SyntheticEvent } from 'react';

import { DATE_NUMERIC_FORMAT } from 'src/constants';

export const scrollToTop = () => window.scroll(0, 0);

/**
 * Add this onMouseDown handler to elements that use onClick events,
 * on pages with onBlur events (e.g. form validation). Defers blur events
 * until after click events, so the blur events don't block click events.
 * @example <Button onMouseDown={handleMouseDownBlur} />
 */
export const handleMouseDownBlur = (e: SyntheticEvent) => {
	// prevent default blur event until after click event
	e.preventDefault();
};

/**
 * Format date to YYYY-MM-DD.
 * @param date Date
 * @returns string, ex. 2024-11-15
 */
export const formatDate = (date: Date) => format(date, DATE_NUMERIC_FORMAT);
