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

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { FormFieldType, FormTextInputType } from 'types/entities';

// field sets

export type FormTextFieldSetProps<T extends FieldValues> = {
	error?: string; // TODO harmonize error dictionary & RHF errors
	label: string;
	name: Path<T>;
	register: UseFormRegister<T>; // TODO use register type
	required?: boolean;
	type: FormTextInputType;
};

// field inputs

interface FormInputProps<T extends FieldValues> {
	className?: string;
	name: Path<T>;
	required?: boolean;
}

type FormRegisteredInputProps<T extends FieldValues> = FormInputProps<T> & {
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

export type FormSelectInputProps<T extends FieldValues, V extends string> = FormInputProps<T> & {
	options: { label: string; value: V }[];
};
