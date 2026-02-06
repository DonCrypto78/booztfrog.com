'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const locale = useLocale();
  const router = useRouter();
  const { register: registerUser, isRegisterPending, registerError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      await registerUser({ ...data, language: locale });
      router.push(`/${locale}/dashboard`);
    } catch {
      // Error is handled by the mutation
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {registerError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {(registerError as { message?: string })?.message ??
                t('title')}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">{t('nameLabel')}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t('namePlaceholder')}
              {...register('name')}
              aria-invalid={!!errors.name}
            />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="password">{t('passwordLabel')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t('passwordPlaceholder')}
              {...register('password')}
              aria-invalid={!!errors.password}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">
              {t('confirmPasswordLabel')}
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder={t('confirmPasswordPlaceholder')}
              {...register('password_confirmation')}
              aria-invalid={!!errors.password_confirmation}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isRegisterPending}
          >
            {isRegisterPending ? '...' : t('submit')}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {t.rich('terms', {
              terms: (chunks) => (
                <Link
                  href={`/${locale}/terms`}
                  className="text-primary hover:underline"
                >
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link
                  href={`/${locale}/privacy`}
                  className="text-primary hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {t('hasAccount')}{' '}
          <Link
            href={`/${locale}/login`}
            className="font-medium text-primary hover:underline"
          >
            {t('loginLink')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
