'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/storefront/language-switcher';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  function toggleMobileDropdown(key: string) {
    setOpenMobileDropdown(openMobileDropdown === key ? null : key);
  }

  const productsItems = [
    {
      href: `/${locale}/products/nfc-cards`,
      label: t('productsMenu.nfcCards'),
      description: t('productsMenu.nfcCardsDesc'),
    },
    {
      href: `/${locale}/products/nfc-plaques`,
      label: t('productsMenu.nfcPlaques'),
      description: t('productsMenu.nfcPlaquesDesc'),
    },
    {
      href: `/${locale}/products/bulk-orders`,
      label: t('productsMenu.bulkOrders'),
      description: t('productsMenu.bulkOrdersDesc'),
    },
  ];

  const industriesItems = [
    { href: `/${locale}/industries/restaurants`, label: t('industriesMenu.restaurants') },
    { href: `/${locale}/industries/cafes`, label: t('industriesMenu.cafes') },
    { href: `/${locale}/industries/bars`, label: t('industriesMenu.bars') },
    { href: `/${locale}/industries/hotels`, label: t('industriesMenu.hotels') },
    { href: `/${locale}/industries/barbers`, label: t('industriesMenu.barbers') },
    { href: `/${locale}/industries/fitness`, label: t('industriesMenu.fitness') },
    { href: `/${locale}/industries/beauty`, label: t('industriesMenu.beauty') },
    { href: `/${locale}/industries/car-services`, label: t('industriesMenu.carServices') },
  ];

  const supportItems = [
    {
      href: `/${locale}/support/faq`,
      label: t('supportMenu.faq'),
      description: t('supportMenu.faqDesc'),
    },
    {
      href: `/${locale}/support/setup-guides`,
      label: t('supportMenu.setupGuides'),
      description: t('supportMenu.setupGuidesDesc'),
    },
    {
      href: `/${locale}/support/contact`,
      label: t('supportMenu.contact'),
      description: t('supportMenu.contactDesc'),
    },
    {
      href: `/${locale}/support/shipping`,
      label: t('supportMenu.shipping'),
      description: t('supportMenu.shippingDesc'),
    },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={`/${locale}`} className="shrink-0">
          <Image
            src="/img/logo.png"
            alt="BooztFrog"
            width={178}
            height={35}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Products dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground">
                {t('products')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[340px] gap-1 p-2">
                  {productsItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                          <p className="mt-1 text-xs leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* How It Works */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${locale}/how-it-works`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {t('howItWorks')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Pricing */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${locale}/pricing`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {t('pricing')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Industries dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground">
                {t('industries')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] grid-cols-2 gap-1 p-2">
                  {industriesItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Reviews */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${locale}/reviews`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {t('reviews')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Blog */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={`/${locale}/blog`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  {t('blog')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Support dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground">
                {t('support')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[340px] gap-1 p-2">
                  {supportItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                          <p className="mt-1 text-xs leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop right side: Language + Auth */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/login`}>{t('login')}</Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/register`}>{t('signup')}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="text-foreground lg:hidden"
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {/* Products (expandable) */}
            <MobileDropdown
              label={t('products')}
              isOpen={openMobileDropdown === 'products'}
              onToggle={() => toggleMobileDropdown('products')}
            >
              {productsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </MobileDropdown>

            {/* How It Works */}
            <Link
              href={`/${locale}/how-it-works`}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('howItWorks')}
            </Link>

            {/* Pricing */}
            <Link
              href={`/${locale}/pricing`}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('pricing')}
            </Link>

            {/* Industries (expandable) */}
            <MobileDropdown
              label={t('industries')}
              isOpen={openMobileDropdown === 'industries'}
              onToggle={() => toggleMobileDropdown('industries')}
            >
              {industriesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </MobileDropdown>

            {/* Reviews */}
            <Link
              href={`/${locale}/reviews`}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('reviews')}
            </Link>

            {/* Blog */}
            <Link
              href={`/${locale}/blog`}
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('blog')}
            </Link>

            {/* Support (expandable) */}
            <MobileDropdown
              label={t('support')}
              isOpen={openMobileDropdown === 'support'}
              onToggle={() => toggleMobileDropdown('support')}
            >
              {supportItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </MobileDropdown>

            {/* Auth section */}
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

function MobileDropdown({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="ml-3 space-y-1 border-l pl-3">
          {children}
        </div>
      )}
    </div>
  );
}
