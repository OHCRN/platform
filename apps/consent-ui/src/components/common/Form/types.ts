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

import { FieldValues, Path } from 'react-hook-form';

// setup types for react-hook-forms API
type FormFieldName<T extends FieldValues> = Path<T>;

// fieldsets that use the FieldSet component

export type FormFieldSetSharedProps<T extends FieldValues> = {
	className?: string;
	disabled?: boolean;
	error?: any; // TODO map translations to RHF errors https://github.com/OHCRN/platform/issues/315
	label: string;
	name: FormFieldName<T>;
	required?: boolean;
	withNarrowDesktopLayout?: boolean;
};

// field inputs

export interface FormInputProps<T extends FieldValues> {
	className?: string;
	id: string; // use useId() to generate this
	name: FormFieldName<T>;
	required: boolean;
}

export interface FormSelectOption<V extends string> {
	label: string;
	value: V;
}

export type FormTextInputType = 'email' | 'tel' | 'text';
