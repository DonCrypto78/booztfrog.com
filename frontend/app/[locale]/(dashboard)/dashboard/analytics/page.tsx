'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, Users, Star, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const t = useTranslations('dashboard.analytics');

  const stats = [
    { label: t('totalScans'), value: '0', icon: BarChart3 },
    { label: t('uniqueVisitors'), value: '0', icon: Users },
    { label: t('topPlatform'), value: '-', icon: Star },
    { label: t('scansTrend'), value: '0%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('dateRange')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">{t('last7Days')}</SelectItem>
            <SelectItem value="30">{t('last30Days')}</SelectItem>
            <SelectItem value="90">{t('last90Days')}</SelectItem>
            <SelectItem value="365">{t('lastYear')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('scansOverTime')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground">
              {t('scansOverTime')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('platformBreakdown')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground">
              {t('platformBreakdown')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('deviceBreakdown')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground">
              {t('deviceBreakdown')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('locationBreakdown')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed text-sm text-muted-foreground">
              {t('locationBreakdown')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
