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

import { z } from 'zod';
import { ComponentProps } from 'react';
import Link from 'next/link';

import { ValidLanguage } from 'src/i18n';

import { ButtonProps } from '../Button/types';

export const CONSENT_STEP_ROUTES = [
	'consent-1',
	'consent-2',
	'consent-3',
	'consent-4',
	'consent-5',
] as const;

export const ConsentStepRouteEnum = z.enum(CONSENT_STEP_ROUTES);
export type ConsentStepRoute = z.infer<typeof ConsentStepRouteEnum>;

const GENERAL_ROUTES = ['home', 'invite', 'register', 'dashboard'] as const;

export const GeneralRouteNameEnum = z.enum(GENERAL_ROUTES);
export type GeneralRouteName = z.infer<typeof GeneralRouteNameEnum>;

export const RouteNameEnum = GeneralRouteNameEnum.or(ConsentStepRouteEnum);
export type RouteName = z.infer<typeof RouteNameEnum>;

export type RouteParams = { [k: string]: string };
export type Route =
	| {
			name: 'home';
			params?: never;
	  }
	| {
			name: RouteName;
			params?: RouteParams;
	  };

export type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> &
	ButtonProps &
	Route & {
		linkLang: ValidLanguage;
		defaultStyle?: boolean;
	};
