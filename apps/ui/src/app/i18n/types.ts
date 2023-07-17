import { ValidLanguage } from 'common/@types/localization';

export const supportedNamespaces = ['common', 'header', 'second-page'] as const;
export type ValidNamespace = (typeof supportedNamespaces)[number];
export const defaultNS: ValidNamespace = 'common';

export type GetDictionary = {
  [k in ValidLanguage]: (
    namespace: ValidNamespace
  ) => Promise<{ [k: string]: string }>;
};

export type GetTranslation = (
  language: ValidLanguage,
  namespace?: ValidNamespace
) => Promise<
  (k: string, params?: { [key: string]: string | number }) => string
>;
