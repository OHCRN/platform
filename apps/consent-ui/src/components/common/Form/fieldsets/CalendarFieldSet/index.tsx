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

'use client';

import { useId } from 'react';
import { FieldValues } from 'react-hook-form';
import clsx from 'clsx';

import useTooltip from 'src/components/common/Form/fieldsets/Tooltip/useTooltip';
import FieldSet from 'src/components/common/Form/fieldsets/FieldSet';
import CalendarInput from 'src/components/common/Form/fieldsets/inputs/CalendarInput';
import { FormFieldSetWithTooltipProps } from 'src/components/common/Form/types';

import styles from './CalendarFieldSet.module.scss';

type CalendarFieldSetProps<T extends FieldValues> = FormFieldSetWithTooltipProps<T> & {
	placeholder?: string;
};

const CalendarFieldSet = <T extends FieldValues>({
	className,
	disabled,
	error,
	infoButtonProps,
	label,
	name,
	required,
	tooltipContent,
	withNarrowDesktopLayout,
}: CalendarFieldSetProps<T>) => {
	const { tooltipVisible, hideTooltip, showTooltip } = useTooltip();

	const idPrefix = useId();
	const fieldId = `${idPrefix}-${name}`;
	const tooltipId = `${idPrefix}-tooltip`;

	return (
		<FieldSet
			className={clsx(styles.CalendarFieldSet, className)}
			error={error}
			fieldId={fieldId}
			infoButtonProps={infoButtonProps}
			label={label}
			required={required}
			tooltipContent={tooltipContent}
			tooltipId={tooltipId}
			tooltipVisible={tooltipVisible}
			withNarrowDesktopLayout={withNarrowDesktopLayout}
		>
			<CalendarInput
				ariaProps={tooltipContent ? { 'aria-describedby': tooltipId } : {}}
				disabled={disabled}
				className={clsx(styles.CalendarInput, error && styles.hasError)}
				popperClassName={clsx(styles.CalendarPopper)}
				id={fieldId}
				name={name}
				onBlur={hideTooltip}
				onFocus={showTooltip}
				required={required}
			/>
		</FieldSet>
	);
};

export default CalendarFieldSet;
