import { useLayoutEffect } from 'react'
import type { GsapRuntime } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// useGsap — attach GSAP entrance animations on every page change
// ─────────────────────────────────────────────────────────────────────────────

export function useGsap(page: string) {
  useLayoutEffect(() => {
    const runtime = window as typeof window & {
      gsap?: GsapRuntime
      ScrollTrigger?: unknown
    }
    const gsap = runtime.gsap
    if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    const hasScrollTrigger = Boolean(runtime.ScrollTrigger)
    if (hasScrollTrigger) gsap.registerPlugin(runtime.ScrollTrigger)

    const ctx = gsap.context(() => {
      const hero = document.querySelector('.premium-hero')
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.announcement', { yPercent: -100, duration: 0.55 })
          .from('.store-nav', { y: -25, autoAlpha: 0, duration: 0.6 }, '-=.22')
          .from('.premium-hero .hero-kicker', { y: 14, autoAlpha: 0, duration: 0.45 }, '-=.08')
          .from('.premium-hero .eyebrow', { y: 20, autoAlpha: 0, duration: 0.55 }, '-=.08')
          .from('.premium-hero h1', { y: 68, autoAlpha: 0, duration: 0.95 }, '-=.22')
          .from(
            '.premium-hero .hero-text, .premium-hero .hero-actions',
            { y: 26, autoAlpha: 0, stagger: 0.12, duration: 0.58 },
            '-=.5',
          )
          .from(
            '.premium-hero .hero-spec, .premium-hero .hero-scroll',
            { y: 16, autoAlpha: 0, stagger: 0.1, duration: 0.45 },
            '-=.2',
          )
          .from('.premium-hero .hero-art', { scale: 1.06, autoAlpha: 0, duration: 1.15 }, '-=1.15')
          .from('.premium-hero .hero-ring', { scale: 0.72, autoAlpha: 0, duration: 0.9 }, '-=.9')
          .from(
            '.premium-hero .hero-card, .premium-hero .art-caption, .premium-hero .hero-label, .premium-hero .hero-data',
            { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.55 },
            '-=.55',
          )

        if (hasScrollTrigger)
          gsap.to('.premium-hero .hero-art img', {
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.premium-hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })

        gsap.to('.premium-hero .hero-ring', {
          rotation: 360,
          duration: 70,
          ease: 'none',
          repeat: -1,
        })
      }

      if (hasScrollTrigger) {
        gsap.utils
          .toArray(
            'main section:not(.hero):not(.page-hero), main .product-card, main .support-grid article, main .disclaimer-content article, main .contact-options article',
          )
          .forEach((el) => {
            gsap.from(el, {
              y: 48,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            })
          })

        gsap.utils.toArray('.feature-image img, .category-tile img').forEach((el) => {
          const parent = (el as Element).parentElement ?? (el as Element)
          gsap.to(el, {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom top', scrub: 1 },
          })
        })
      }
    })

    return () => ctx.revert()
  }, [page])
}
