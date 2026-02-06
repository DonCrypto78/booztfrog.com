'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart3,
  Smartphone,
  MapPin,
  Star,
  FileText,
  ShoppingBag,
  CreditCard,
  Settings,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const t = useTranslations('dashboard.sidebar');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    {
      href: `/${locale}/dashboard`,
      label: t('overview'),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/dashboard/analytics`,
      label: t('analytics'),
      icon: BarChart3,
    },
    {
      href: `/${locale}/dashboard/devices`,
      label: t('devices'),
      icon: Smartphone,
    },
    {
      href: `/${locale}/dashboard/locations`,
      label: t('locations'),
      icon: MapPin,
    },
    {
      href: `/${locale}/dashboard/platforms`,
      label: t('platforms'),
      icon: Star,
    },
    {
      href: `/${locale}/dashboard/landing-page`,
      label: t('landingPage'),
      icon: FileText,
    },
    {
      href: `/${locale}/dashboard/orders`,
      label: t('orders'),
      icon: ShoppingBag,
    },
    {
      href: `/${locale}/dashboard/subscription`,
      label: t('subscription'),
      icon: CreditCard,
    },
    {
      href: `/${locale}/dashboard/settings`,
      label: t('settings'),
      icon: Settings,
    },
  ];

  function isActive(href: string) {
    if (href === `/${locale}/dashboard`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              Boozt<span className="text-sidebar-primary">Frog</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <p className="text-xs font-medium text-sidebar-accent-foreground">
              Free Plan
            </p>
            <p className="mt-1 text-xs text-sidebar-foreground/70">
              1/1 devices used
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
