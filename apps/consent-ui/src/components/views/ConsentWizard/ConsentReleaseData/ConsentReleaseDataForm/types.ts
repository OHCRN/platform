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

import { GenderDictionary } from 'src/i18n/locales/en/gender';
import { BirthSexDictionary } from 'src/i18n/locales/en/birthSex';
import { AncestryDictionary } from 'src/i18n/locales/en/ancestry';
import { HistoryOfCancerDictionary } from 'src/i18n/locales/en/historyOfCancer';
import { GeneticsClinicDictionary } from 'src/i18n/locales/en/geneticsClinic';
import { MolecularLabDictionary } from 'src/i18n/locales/en/molecularLab';
import { FormSelectOption } from 'src/components/common/Form/types';

export type GenderOption = FormSelectOption<keyof GenderDictionary>;
export type BirthSexOption = FormSelectOption<keyof BirthSexDictionary>;
export type AncestryOption = FormSelectOption<keyof AncestryDictionary>;
export type HistoryOfCancerOption = FormSelectOption<keyof HistoryOfCancerDictionary>;
export type GeneticsClinicOption = FormSelectOption<keyof GeneticsClinicDictionary>;
export type MolecularLabOption = FormSelectOption<keyof MolecularLabDictionary>;
