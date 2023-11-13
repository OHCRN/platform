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

// indicates which react component to use
export type FormFieldTypes = 'checkbox' | 'date' | 'radio' | 'select' | 'text' | 'textWithCheckbox';

// indicates the HTML type attribute for inputs that are or look like text fields
export type FormTextInputTypes = 'email' | 'tel' | 'text';

export interface FormFieldProps<T extends FieldValues> {
	error?: string;
	fieldName: Path<T>;
	fieldType: FormFieldTypes;
	label: string;
	register: UseFormRegister<T>;
	required?: boolean;
}

interface FormInputProps<T extends FieldValues> {
	fieldName: Path<T>;
	fieldType: FormFieldTypes;
	register: UseFormRegister<T>;
	required?: boolean;
}

export type FormTextInputProps<T extends FieldValues> = FormInputProps<T> & {
	textInputType: FormTextInputTypes;
};

export type FormCheckboxRadioProps<T extends FieldValues, V extends string> = FormInputProps<T> & {
	value: V;
	description?: ReactNode;
};

interface FormFieldsDictionary {
	name: string;
	label: string;
	required: boolean;
}

export type TextFormFieldsDictionary = Record<
	string,
	FormFieldsDictionary & {
		fieldType: 'text';
		textInputType: FormTextInputTypes;
	}
>;

export type CheckboxRadioFormFieldsDictionary = Record<
	string,
	FormFieldsDictionary & {
		fieldType: 'checkbox' | 'radio';
		value: string;
		description?: ReactNode;
	}
>;

export type SelectFormFieldsDictionary = Record<
	string,
	FormFieldsDictionary & {
		fieldType: 'select';
		options: { label: string; value: string }[];
	}
>;
