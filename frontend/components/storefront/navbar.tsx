'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/storefront/language-switcher';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHomepage =
    pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomepage && !scrolled && !isMobileMenuOpen;

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/pricing`, label: t('pricing') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/img/logo.png"
              alt="BooztFrog"
              width={178}
              height={35}
              className={cn(
                'h-9 w-auto transition-all duration-300',
                isTransparent && 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            asChild
            className={cn(
              isTransparent && 'text-white hover:bg-white/10'
            )}
          >
            <Link href={`/${locale}/login`}>{t('login')}</Link>
          </Button>
          <Button
            asChild
            className={cn(
              isTransparent &&
                'bg-white text-brand-navy hover:bg-white/90'
            )}
          >
            <Link href={`/${locale}/register`}>{t('signup')}</Link>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            'md:hidden',
            isTransparent ? 'text-white' : 'text-foreground'
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-4">
              <div className="flex flex-col gap-2 px-3">
                <LanguageSwitcher />
                <Button variant="ghost" asChild className="justify-start">
                  <Link href={`/${locale}/login`}>{t('login')}</Link>
                </Button>
                <Button asChild>
                  <Link href={`/${locale}/register`}>{t('signup')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
