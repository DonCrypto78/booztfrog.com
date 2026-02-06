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
  ArrowRight,
  Check,
  Quote,
} from 'lucide-react';

function HeroDecoration() {
  return (
    <div className="relative h-[500px] w-full">
      {/* Main phone mockup */}
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border-4 border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg">
        <div className="mx-auto mt-8 w-[170px] space-y-3 p-3">
          <div className="h-8 w-8 rounded-full bg-brand-lime/40" />
          <div className="h-3 w-3/4 rounded-full bg-white/30" />
          <div className="h-3 w-1/2 rounded-full bg-white/20" />
          <div className="mt-6 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex h-10 items-center justify-center rounded-xl bg-white/20 text-xs font-medium text-white">
              Google
            </div>
            <div className="flex h-10 items-center justify-center rounded-xl bg-white/15 text-xs font-medium text-white/80">
              TripAdvisor
            </div>
            <div className="flex h-10 items-center justify-center rounded-xl bg-white/10 text-xs font-medium text-white/60">
              Trustpilot
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative shapes */}
      <div className="absolute right-12 top-8 h-16 w-16 animate-float rounded-xl bg-brand-lime/30 blur-sm" />
      <div className="absolute bottom-16 left-8 h-20 w-20 animate-float-delayed rounded-full bg-brand-green/40 blur-sm" />
      <div className="absolute left-4 top-24 h-12 w-12 animate-float-slow rounded-lg bg-white/15 rotate-12" />
      <div className="absolute bottom-32 right-4 h-10 w-10 animate-float rounded-full bg-white/10" />

      {/* SVG rings */}
      <svg
        className="absolute right-0 top-0 h-32 w-32 text-white/10"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      {/* Dot grid */}
      <svg
        className="absolute bottom-0 left-0 h-24 w-24 text-white/10"
        viewBox="0 0 80 80"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <circle
            key={i}
            cx={(i % 4) * 20 + 10}
            cy={Math.floor(i / 4) * 20 + 10}
            r="2"
            fill="currentColor"
          />
        ))}
      </svg>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-dark-green px-4 pb-20 pt-16 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div className="max-w-xl">
              <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-widest text-brand-lime backdrop-blur-sm">
                {t('hero.tagline')}
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                {t('hero.subtitle')}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-base font-semibold text-brand-navy shadow-lg hover:bg-white/90"
                  asChild
                >
                  <Link href={`/${locale}/register`}>
                    {t('hero.cta')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-base text-white hover:bg-white hover:text-brand-navy"
                  asChild
                >
                  <Link href="#how-it-works">{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
            </div>

            {/* Right: Decorative */}
            <div className="hidden lg:block">
              <HeroDecoration />
            </div>
          </div>
        </div>

        {/* Background blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-green/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full bg-brand-lime/10 blur-[120px]" />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L60,85.3C120,75,240,53,360,48C480,43,600,53,720,69.3C840,85,960,107,1080,106.7C1200,107,1320,85,1380,74.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
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
                className="group overflow-hidden rounded-2xl border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="flex h-52 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/10 to-brand-lime/10">
                    <product.icon className="h-16 w-16 text-primary transition-transform duration-300 group-hover:scale-110" />
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

          <div className="mt-10 text-center">
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

          <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {/* Connector line (desktop only) */}
            <div className="pointer-events-none absolute left-[20%] right-[20%] top-10 hidden h-0.5 border-t-2 border-dashed border-primary/30 md:block" />

            {[
              {
                step: '1',
                title: t('howItWorks.step1.title'),
                description: t('howItWorks.step1.description'),
              },
              {
                step: '2',
                title: t('howItWorks.step2.title'),
                description: t('howItWorks.step2.description'),
              },
              {
                step: '3',
                title: t('howItWorks.step3.title'),
                description: t('howItWorks.step3.description'),
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-brand-dark-green text-3xl font-bold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
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

          <div className="mt-12 grid items-center gap-8 md:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                features: [
                  '1 device',
                  '1 location',
                  '2 review platforms',
                  '30-day analytics',
                ],
              },
              {
                name: 'Starter',
                price: '$9',
                features: [
                  '5 devices',
                  '1 location',
                  '5 review platforms',
                  '90-day analytics',
                ],
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
                    ? 'relative z-10 scale-105 border-2 border-primary shadow-xl'
                    : 'border-0 shadow-md'
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
                        <Check className="h-4 w-4 shrink-0 text-primary" />
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
                initials: 'SJ',
              },
              {
                name: 'Marcus Chen',
                role: 'Hotel Manager',
                quote:
                  'Our TripAdvisor rankings improved significantly after we started using BooztFrog at the front desk.',
                initials: 'MC',
              },
              {
                name: 'Emma Larsen',
                role: 'Salon Owner',
                quote:
                  'So easy to set up and our customers love the tap-to-review experience. Highly recommend!',
                initials: 'EL',
              },
            ].map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-dark-green to-primary px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {t('cta.subtitle')}
          </p>
          <Button
            size="lg"
            className="mt-8 bg-white text-base font-semibold text-brand-navy shadow-lg hover:bg-white/90"
            asChild
          >
            <Link href={`/${locale}/register`}>
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-lime/10 blur-[80px]" />
      </section>
    </>
  );
}
