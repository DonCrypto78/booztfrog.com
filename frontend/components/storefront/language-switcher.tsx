'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales } from '@/i18n/routing';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex h-9 w-[120px] items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none">
        {t(locale)}
        <ChevronDown className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleChange(loc)}
            className={loc === locale ? 'font-medium' : ''}
          >
            {t(loc)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
