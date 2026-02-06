'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Check } from 'lucide-react';

export default function SubscriptionPage() {
  const t = useTranslations('dashboard.subscription');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('currentPlan')}
              </CardTitle>
              <CardDescription className="mt-1">
                <Badge variant="secondary">{t('free')}</Badge>
              </CardDescription>
            </div>
            <Button>{t('changePlan')}</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 font-semibold">{t('usage')}</h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{t('devicesUsed', { used: 0, limit: 1 })}</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 w-0 rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{t('locationsUsed', { used: 0, limit: 1 })}</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 w-0 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 font-semibold">{t('features')}</h3>
            <ul className="space-y-2">
              {[
                '1 device',
                '1 location',
                '2 review platforms',
                '30-day analytics',
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <Button variant="outline">{t('manageBilling')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
