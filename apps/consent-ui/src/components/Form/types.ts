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
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { SingleValue } from 'react-select';

export type FormFieldType = 'checkbox' | 'date' | 'radio' | 'select' | 'text' | 'textWithCheckbox';
export type FormTextInputType = 'email' | 'tel' | 'text';

// field sets

interface FormFieldSetSharedProps<T extends FieldValues> {
	className?: string;
	error?: string; // TODO harmonize error dictionary & RHF errors
	name: Path<T>;
	required?: boolean;
}

export type FormFieldSetProps<T extends FieldValues> = FormFieldSetSharedProps<T> & {
	children: ReactNode;
	label: string;
};

export type FormCheckboxFieldSetProps<
	T extends FieldValues,
	V extends string,
> = FormFieldSetSharedProps<T> & {
	description: ReactNode;
	register: UseFormRegister<T>;
	title?: string;
	value: V;
};

export type FormTextFieldSetProps<T extends FieldValues> = FormFieldSetSharedProps<T> & {
	label: string;
	register: UseFormRegister<T>;
	type?: FormTextInputType;
};

// field inputs

interface FormInputSharedProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	required: boolean;
}

type FormRegisteredInputProps<T extends FieldValues> = FormInputSharedProps<T> & {
	register: UseFormRegister<T>;
};

export type FormTextInputProps<T extends FieldValues> = FormRegisteredInputProps<T> & {
	type: FormTextInputType;
};

export type FormCheckboxRadioInputProps<
	T extends FieldValues,
	V extends string,
> = FormRegisteredInputProps<T> & {
	type: FormFieldType;
	value: V;
};

// select input props

export type FormSelectOnChangeArg<V extends string> = SingleValue<string | FormSelectOption<V>>;

export type FormSelectInputProps<
	T extends FieldValues,
	V extends string,
> = FormInputSharedProps<T> & {
	onChange: (val: FormSelectOnChangeArg<V>) => void;
	options: FormSelectOption<V>[];
	placeholder: string;
	value?: V;
};

export type FormSelectOption<V extends string> = {
	label: string;
	value: V;
};
