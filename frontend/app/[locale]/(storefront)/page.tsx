import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CreditCard,
  Settings,
  Star,
  Smartphone,
  QrCode,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy to-brand-dark-green px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-lime">
            {t('hero.tagline')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="text-base" asChild>
              <Link href={`/${locale}/register`}>
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-base text-white hover:bg-white/10"
              asChild
            >
              <Link href="#how-it-works">{t('hero.ctaSecondary')}</Link>
            </Button>
          </div>
        </div>

        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-lime/20 blur-3xl" />
      </section>

      {/* Product Showcase */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('products.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CreditCard,
                title: 'NFC Review Card',
                price: '$29.99',
              },
              {
                icon: QrCode,
                title: 'QR Sticker Pack',
                price: '$19.99',
              },
              {
                icon: Smartphone,
                title: 'Table Display Stand',
                price: '$49.99',
              },
            ].map((product) => (
              <Card
                key={product.title}
                className="group transition-all hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex h-48 items-center justify-center rounded-lg bg-secondary">
                    <product.icon className="h-16 w-16 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    {product.title}
                  </h3>
                  <p className="mt-1 text-xl font-bold text-primary">
                    {product.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href={`/${locale}/products`}>
                {t('products.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-secondary px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('howItWorks.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                icon: CreditCard,
                title: t('howItWorks.step1.title'),
                description: t('howItWorks.step1.description'),
              },
              {
                step: '2',
                icon: Settings,
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
              },
              {
                step: '3',
                icon: Star,
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('pricing.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['1 device', '1 location', '2 review platforms', '30-day analytics'],
              },
              {
                name: 'Starter',
                price: '$9',
                features: ['5 devices', '1 location', '5 review platforms', '90-day analytics'],
                popular: true,
              },
              {
                name: 'Pro',
                price: '$29',
                features: [
                  '20 devices',
                  '5 locations',
                  'Unlimited platforms',
                  '1-year analytics',
                  'Custom landing page',
                ],
              },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.popular
                    ? 'relative border-2 border-primary shadow-lg'
                    : ''
                }
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Star className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={`/${locale}/register`}>
                      {t('pricing.viewPlans')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('testimonials.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Restaurant Owner',
                quote:
                  'BooztFrog doubled our Google reviews in just two months. The NFC cards are a game-changer.',
              },
              {
                name: 'Marcus Chen',
                role: 'Hotel Manager',
                quote:
                  'Our TripAdvisor rankings improved significantly after we started using BooztFrog at the front desk.',
              },
              {
                name: 'Emma Larsen',
                role: 'Salon Owner',
                quote:
                  'So easy to set up and our customers love the tap-to-review experience. Highly recommend!',
              },
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary to-brand-dark-green px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {t('cta.subtitle')}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 text-base"
            asChild
          >
            <Link href={`/${locale}/register`}>
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
