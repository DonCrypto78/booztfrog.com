import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'nb'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});
