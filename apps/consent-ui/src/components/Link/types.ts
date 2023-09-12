import * as z from 'zod';
import { ComponentProps } from 'react';
import Link from 'next/link';

import { ValidLanguage } from '@/i18n';

const VALID_ROUTE_NAMES = [
	'home',
	'invite',
	'register',
	'dashboard',
	'consent-1',
	'consent-2',
	'consent-3',
	'consent-4',
	'consent-5',
] as const;

export const RouteNameEnum = z.enum(VALID_ROUTE_NAMES);
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
	Route & {
		linkLang: ValidLanguage;
	};
