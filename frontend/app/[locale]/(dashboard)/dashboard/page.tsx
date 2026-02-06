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
import {
  BarChart3,
  Smartphone,
  Users,
  TrendingUp,
  Plus,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardOverviewPage() {
  const t = useTranslations('dashboard.overview');
  const { user } = useAuth();

  const stats = [
    {
      label: t('totalScans'),
      value: '0',
      icon: BarChart3,
      change: '+0%',
    },
    {
      label: t('uniqueVisitors'),
      value: '0',
      icon: Users,
      change: '+0%',
    },
    {
      label: t('activeDevices'),
      value: '0',
      icon: Smartphone,
      change: '0',
    },
    {
      label: t('reviewRate'),
      value: '0%',
      icon: TrendingUp,
      change: '+0%',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('welcome', { name: user?.name ?? '' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" />
              {t('addDevice')}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <MapPin className="h-4 w-4" />
              {t('addLocation')}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <BarChart3 className="h-4 w-4" />
              {t('viewAnalytics')}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivity')}</CardTitle>
            <CardDescription>{t('noActivity')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              {t('noActivity')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
