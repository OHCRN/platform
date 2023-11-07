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

import { describe, expect, it } from 'vitest';

import { PostalCode } from '../../src/entities/index.js';

describe('PostalCode', () => {
	it('Must be 6 characters long', () => {
		expect(PostalCode.safeParse('T4B0V7').success).true;
		expect(PostalCode.safeParse('T4B0V7A').success).false;
		expect(PostalCode.safeParse('T4B0V').success).false;
		expect(PostalCode.safeParse(undefined).success).false;
		expect(PostalCode.safeParse(null).success).false;
	});
	it('Can only contain letters and numbers', () => {
		expect(PostalCode.safeParse('T4B 0V').success).false;
		expect(PostalCode.safeParse('T4B-0V').success).false;
	});
	it('Can contain lowercase letters', () => {
		// these are parsed into uppercase, so should not cause an error
		expect(PostalCode.safeParse('t4b0v7').success).true;
		expect(PostalCode.safeParse('T4B0v7').success).true;
	});
	it('Must contain characters in the correct order', () => {
		expect(PostalCode.safeParse('T4B07V').success).false;
		expect(PostalCode.safeParse('4B7O7V').success).false;
		expect(PostalCode.safeParse('ABC123').success).false;
	});
});
