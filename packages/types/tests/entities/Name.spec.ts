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

import { Name, NameOptionalAPI, NameOptionalUI } from '../../src/entities/fields/index.js';

describe('Name', () => {
	it('Can only contain letters and whitespace', () => {
		expect(Name.safeParse('Homer Simpson').success).true;
		expect(Name.safeParse('homer simpson').success).true;
		expect(Name.safeParse('Homer Simpon!').success).false;
		expect(Name.safeParse("D'oh").success).false;
		expect(Name.safeParse('Homer_Simpson').success).false;
		expect(Name.safeParse('-Homer Simpson').success).false;
		expect(Name.safeParse('Homer Simpson1').success).false;
		expect(Name.safeParse(undefined).success).false;
		expect(Name.safeParse(null).success).false;
		expect(Name.safeParse('').success).false;
		expect(Name.safeParse(' ').success).false;
	});
});

describe('NameOptionalAPI', () => {
	it('Can only contain letters and whitespace, or undefined', () => {
		expect(NameOptionalAPI.safeParse('Homer Simpson').success).true;
		expect(NameOptionalAPI.safeParse('homer simpson').success).true;
		expect(NameOptionalAPI.safeParse('Homer Simpon!').success).false;
		expect(NameOptionalAPI.safeParse("D'oh").success).false;
		expect(NameOptionalAPI.safeParse('Homer_Simpson').success).false;
		expect(NameOptionalAPI.safeParse('-Homer Simpson').success).false;
		expect(NameOptionalAPI.safeParse('Homer Simpson1').success).false;
		expect(NameOptionalAPI.safeParse(undefined).success).true;
		expect(NameOptionalAPI.safeParse(null).success).false;
		expect(NameOptionalAPI.safeParse('').success).false;
		expect(NameOptionalAPI.safeParse(' ').success).false;
	});
});

describe('NameOptionalUI', () => {
	it('Can only contain letters and whitespace, empty strings, or undefined', () => {
		expect(NameOptionalUI.safeParse('Homer Simpson').success).true;
		expect(NameOptionalUI.safeParse('homer simpson').success).true;
		expect(NameOptionalUI.safeParse('Homer Simpon!').success).false;
		expect(NameOptionalUI.safeParse("D'oh").success).false;
		expect(NameOptionalUI.safeParse('Homer_Simpson').success).false;
		expect(NameOptionalUI.safeParse('-Homer Simpson').success).false;
		expect(NameOptionalUI.safeParse('Homer Simpson1').success).false;
		expect(NameOptionalUI.safeParse(undefined).success).true;
		expect(NameOptionalUI.safeParse(null).success).false;
		expect(NameOptionalUI.safeParse('').success).true;
		expect(NameOptionalUI.safeParse(' ').success).true;
	});
});
