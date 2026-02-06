'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function LandingPageEditorPage() {
  const t = useTranslations('dashboard.landingPage');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t('headline')}</Label>
              <Input placeholder={t('headline')} />
            </div>
            <div className="space-y-2">
              <Label>{t('subheadline')}</Label>
              <Input placeholder={t('subheadline')} />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('backgroundColor')}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#FFFFFF"
                    className="h-10 w-10 cursor-pointer rounded border"
                  />
                  <Input defaultValue="#FFFFFF" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('textColor')}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#000000"
                    className="h-10 w-10 cursor-pointer rounded border"
                  />
                  <Input defaultValue="#000000" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('buttonColor')}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#4CAF50"
                    className="h-10 w-10 cursor-pointer rounded border"
                  />
                  <Input defaultValue="#4CAF50" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('buttonTextColor')}</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#FFFFFF"
                    className="h-10 w-10 cursor-pointer rounded border"
                  />
                  <Input defaultValue="#FFFFFF" className="flex-1" />
                </div>
              </div>
            </div>

            <Separator />

            <Button className="w-full">{t('saveChanges')}</Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('preview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/20" />
              <h3 className="mt-4 text-xl font-bold">Your Business Name</h3>
              <p className="mt-2 text-muted-foreground">
                Leave us a review!
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex h-10 w-48 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  Google
                </div>
                <div className="flex h-10 w-48 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  TripAdvisor
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
