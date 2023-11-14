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

import { Province } from 'types/entities';

const dictionary = {
	ALBERTA: 'Alberta',
	BRITISH_COLUMBIA: 'British Columbia',
	MANITOBA: 'Manitoba',
	NEW_BRUNSWICK: 'New Brunswick',
	NEWFOUNDLAND_AND_LABRADOR: 'Newfoundland and Labrador',
	NORTHWEST_TERRITORIES: 'Northwest Territories',
	NOVA_SCOTIA: 'Nova Scotia',
	NUNAVUT: 'Nunavut',
	ONTARIO: 'Ontario',
	PRINCE_EDWARD_ISLAND: 'Prince Edward Island',
	QUEBEC: 'Quebec',
	SASKATCHEWAN: 'Saskatchewan',
	YUKON: 'Yukon',
} satisfies Record<Province, string>;

export type ProvinceDictionary = Record<keyof typeof dictionary, string>;

export default dictionary;
