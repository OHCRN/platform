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

import { ReactNode } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { SingleValue } from 'react-select';

export type FormFieldTypeCheckboxRadio = 'checkbox' | 'radio';
export type FormFieldType =
	| FormFieldTypeCheckboxRadio
	| 'date'
	| 'select'
	| 'text'
	| 'textWithCheckbox';
export type FormTextInputType = 'email' | 'tel' | 'text';
export type FormSelectOnChangeArg<V extends string> = SingleValue<string | FormSelectOption<V>>;

// setup types for react-hook-forms API
type FormFieldName<T extends FieldValues> = Path<T>;

// fieldsets that use the FieldSet component

interface FormFieldSetSharedProps<T extends FieldValues> {
	className?: string;
	error?: any; // TODO map translations to RHF errors https://github.com/OHCRN/platform/issues/315
	label: string;
	name: FormFieldName<T>;
	required?: boolean;
}

export type FormFieldSetProps<T extends FieldValues> = FormFieldSetSharedProps<T> & {
	children: ReactNode;
};

export type FormTextFieldSetProps<T extends FieldValues> = FormFieldSetSharedProps<T> & {
	type?: FormTextInputType;
};

export type FormSelectFieldSetProps<
	T extends FieldValues,
	V extends string,
> = FormFieldSetSharedProps<T> & {
	options: FormSelectOption<V>[];
	placeholder: string;
};

// unique fieldsets

export type FormCheckboxFieldSetProps<T extends FieldValues> = Omit<
	FormFieldSetSharedProps<T>,
	'label' // uses title & description instead
> & {
	description: ReactNode;
	title?: string;
};

// field inputs

export interface FormInputProps<T extends FieldValues> {
	className?: string;
	name: FormFieldName<T>;
	required: boolean;
}

export type FormTextInputProps<T extends FieldValues> = FormInputProps<T> & {
	type: FormTextInputType;
};

export type FormRadioInputProps<T extends FieldValues, V extends string> = FormInputProps<T> & {
	value: V;
};

// select input

export type FormSelectInputProps<T extends FieldValues, V extends string> = FormInputProps<T> & {
	onChange: (val: FormSelectOnChangeArg<V>) => void;
	options: FormSelectOption<V>[];
	placeholder: string;
	value: V;
};

export type FormSelectOption<V extends string> = {
	label: string;
	value: V;
};
