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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('businessProfile')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t('businessName')}</Label>
              <Input placeholder={t('businessName')} />
            </div>
            <div className="space-y-2">
              <Label>{t('businessSlug')}</Label>
              <Input placeholder={t('businessSlug')} />
            </div>
            <div className="space-y-2">
              <Label>{t('website')}</Label>
              <Input placeholder="https://" type="url" />
            </div>
            <div className="space-y-2">
              <Label>{t('phone')}</Label>
              <Input placeholder={t('phone')} type="tel" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>{t('address')}</Label>
              <Input placeholder={t('address')} />
            </div>
            <div className="space-y-2">
              <Label>{t('city')}</Label>
              <Input placeholder={t('city')} />
            </div>
            <div className="space-y-2">
              <Label>{t('country')}</Label>
              <Input placeholder={t('country')} />
            </div>
            <div className="space-y-2">
              <Label>{t('timezone')}</Label>
              <Select defaultValue="UTC">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="Europe/Oslo">Europe/Oslo</SelectItem>
                  <SelectItem value="America/New_York">
                    America/New_York
                  </SelectItem>
                  <SelectItem value="Europe/London">Europe/London</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('language')}</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="nb">Norsk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button>{t('saveChanges')}</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {t('dangerZone')}
          </CardTitle>
          <CardDescription>{t('deleteWarning')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">{t('deleteBusiness')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
