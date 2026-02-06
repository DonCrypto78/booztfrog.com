'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { forgotPassword } from '@/lib/api';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsPending(true);
    try {
      await forgotPassword(data);
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="space-y-4">
            <div className="rounded-md bg-primary/10 p-4 text-sm text-primary">
              {t('success')}
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/${locale}/login`}>{t('backToLogin')}</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                {...register('email')}
                aria-invalid={!!errors.email}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? '...' : t('submit')}
            </Button>

            <Button variant="ghost" className="w-full" asChild>
              <Link href={`/${locale}/login`}>{t('backToLogin')}</Link>
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
