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

import { describe, expect, it } from 'vitest';

import { checkAge18AndOver } from '../../src/entities/fields/index.js';

describe('Date of Birth', () => {
	const today = new Date();
	const month = today.getMonth();
	const day = today.getDate();
	const year = today.getFullYear();

	const todayMinus18Years = new Date(`${month}/${day}/${year - 18}`);
	const adultDateOfBirth = new Date(`10/01/${year - 50}`);
	const childDateOfBirth = new Date(`09/12/${year - 10}`);
	const futureDateOfBirth = new Date(`03/25/${year + 50}`);

	it('must return true if user is an adult', () => {
		expect(checkAge18AndOver(adultDateOfBirth)).true;
		expect(checkAge18AndOver(todayMinus18Years)).true;
	});

	it('must return false if user is a minor', () => {
		expect(checkAge18AndOver(today)).false;
		expect(checkAge18AndOver(childDateOfBirth)).false;
		expect(checkAge18AndOver(futureDateOfBirth)).false;
	});
});
