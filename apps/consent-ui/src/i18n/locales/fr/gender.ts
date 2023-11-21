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

import { GenderDictionary } from '@/i18n/locales/en/gender';

const dictionary = {
	GENDER_FLUID: 'Gender Fluid',
	GENDER_QUEER: 'Gender queer',
	MAN: 'Man',
	NON_BINARY: 'Non-binary',
	PREFER_NOT_TO_ANSWER: 'Prefer not to answer',
	PREFER_TO_SELF_IDENTIFY: 'Prefer to self-identify',
	QUESTIONING: 'Questioning',
	TRANSGENDER_MAN_TRANSMAN: 'Transgender man / Transman',
	TRANSGENDER_WOMAN_TRANSWOMAN: 'Transgender woman / Transwoman',
	TWO_SPIRIT: 'Two-Spirit',
	WOMAN: 'Woman',
} satisfies GenderDictionary;

export default dictionary;
