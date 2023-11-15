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
import { FormFieldType, FormTextInputType } from 'types/entities';

// fieldset setup

type Key = string | number | symbol;

export type FormFieldProps<T extends FieldValues> = {
	error?: string; // TODO translation key from form-errors
	fieldName: Path<T>;
	fieldType: FormFieldType;
	label: string;
	register: UseFormRegister<T>;
	required: boolean;
};

// TODO controlled fieldset

interface FormSelectOptions<V extends string> {
	options: { label: string; value: V }[];
}

// field inputs

interface FormInputProps<T extends FieldValues> {
	className?: string;
	fieldName: Path<T>;
	fieldType: FormFieldType;
	register: UseFormRegister<T>;
	required: boolean;
}

export type FormTextInputProps<T extends FieldValues> = FormInputProps<T> & {
	textInputType: FormTextInputType;
};

export type FormCheckboxRadioProps<T extends FieldValues, V extends string> = FormInputProps<T> & {
	value: V;
};

export type FormSelectProps<T extends FieldValues, V extends string> = FormInputProps<T> &
	FormSelectOptions<V>;

// field dictionaries

interface FormFieldsDictionary<T extends Key> {
	name: T;
	label: string;
	required: boolean;
}

export type TextFormFieldsDictionary<T extends Key> = Record<
	T,
	FormFieldsDictionary<T> & {
		fieldType: 'TEXT'; // TODO use FormFieldType type/enum
		textInputType: FormTextInputType;
	}
>;

export type CheckboxRadioFormFieldsDictionary<T extends Key, V extends string> = Record<
	T,
	FormFieldsDictionary<T> & {
		fieldType: 'checkbox' | 'radio'; // TODO use FormFieldType type/enum
		value: V;
		description?: ReactNode;
	}
>;

export type SelectFormFieldsDictionary<T extends Key, V extends string> = Record<
	T,
	FormFieldsDictionary<T> &
		FormSelectOptions<V> & {
			fieldType: 'select'; // TODO use FormFieldType type/enum
		}
>;
