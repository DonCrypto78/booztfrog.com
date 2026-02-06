import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/storefront/language-switcher';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const sections = [
    {
      title: t('product'),
      links: [
        { label: t('features'), href: `/${locale}/products` },
        { label: t('pricing'), href: `/${locale}/pricing` },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: t('about'), href: `/${locale}/about` },
        { label: t('contact'), href: `/${locale}/contact` },
        { label: t('blog'), href: `/${locale}/blog` },
      ],
    },
    {
      title: t('support'),
      links: [
        { label: t('helpCenter'), href: `/${locale}/help` },
        { label: t('documentation'), href: `/${locale}/docs` },
      ],
    },
    {
      title: t('legal'),
      links: [
        { label: t('privacy'), href: `/${locale}/privacy` },
        { label: t('terms'), href: `/${locale}/terms` },
        { label: t('cookies'), href: `/${locale}/cookies` },
      ],
    },
  ];

  return (
    <footer className="border-t bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-xl font-bold">
                Boozt<span className="text-primary">Frog</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">{t('tagline')}</p>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
