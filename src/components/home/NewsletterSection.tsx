import { Mail } from 'lucide-react';
import { Container } from '../layout/Container';
import { NewsletterForm } from '../layout/NewsletterForm';
import { ScrollReveal } from '../ui/ScrollReveal';

export function NewsletterSection() {
  return (
    <section
      id="newsletter-subscription"
      aria-labelledby="newsletter-section-heading"
      className="border-t border-line/70 bg-brand-pale py-14 sm:py-16 md:py-20 transition-colors"
    >
      <Container>
        <ScrollReveal yOffset={24} duration={0.7}>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              NEWSLETTER
            </p>

            <h2
              id="newsletter-section-heading"
              className="mt-2 font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl"
            >
              Join our beauty community
            </h2>

            <p className="mt-3 text-sm text-ink-2 sm:text-base leading-relaxed">
              Receive skincare routine guides, early access to new arrivals, and members-first offers directly to your inbox. No spam, ever.
            </p>

            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-md">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

