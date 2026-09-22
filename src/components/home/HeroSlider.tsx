import { useEffect, useState, useRef } from 'react'
import type { Currency, Page, Product } from '../../types'
import { products } from '../../data/products'
import { formatPrice } from '../../utils/format'

type Props = {
  go: (page: Page) => void
  openProduct: (product: Product) => void
  currency?: Currency
}

export type HeroSlide = {
  id: string
  product: Product
  kicker: string
  collection: string
  eyebrow: string
  headingMain: string
  headingEm: string
  description: string
  weight: string
  drop: string
  cushion: string
  accentColor: string
  glowColor: string
  bgGradient: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    product: products[0], // Vanta Velocity
    kicker: 'SPRING / SUMMER 2026',
    collection: 'LOS ANGELES · PERFORMANCE / 01',
    eyebrow: 'NITROGEN-INFUSED HYPERFOAM™',
    headingMain: 'Every step.',
    headingEm: 'Everywhere.',
    description:
      'Engineered for effortless everyday momentum. Supercritical nitrogen foam absorbs impact instantly while returning 85% energy with every transition.',
    weight: '7.8 OZ (221G)',
    drop: '8 MM DROP',
    cushion: 'MAXIMUM NITRO PLUSH',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #1d4ed8 0%, #0c234a 35%, #040914 75%)',
  },
  {
    id: 'slide-2',
    product: products[1], // Redline 02
    kicker: 'SPEED DIVISION · TEMPO LAB',
    collection: 'TRACK & ROAD RACING / 02',
    eyebrow: 'DUAL-DENSITY CARBON SPINE',
    headingMain: 'Explosive rhythm.',
    headingEm: 'Instant kick.',
    description:
      'A razor-sharp platform tuned for tempo intervals, sprint kickdowns, and explosive stride transitions with zero mechanical lag.',
    weight: '6.9 OZ (195G)',
    drop: '6 MM DROP',
    cushion: 'BALANCED PROPULSION',
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #b91c1c 0%, #450a0a 35%, #0a0303 75%)',
  },
  {
    id: 'slide-3',
    product: products[8], // Aero Frame
    kicker: 'DISTANCE MARATHON LAB',
    collection: 'CARBON SERIES · SPEED / 03',
    eyebrow: '3D CURVED CARBON PROPULSION',
    headingMain: 'Pure speed.',
    headingEm: 'Unleashed.',
    description:
      'Ultra-lightweight distance racer with a full-length 3D curved carbon-composite plate tuned for explosive cadence and personal best pace.',
    weight: '6.4 OZ (181G)',
    drop: '7 MM DROP',
    cushion: 'CARBON PROPULSIVE',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #0e7490 0%, #082f49 35%, #020710 75%)',
  },
  {
    id: 'slide-4',
    product: products[4], // Terra Form
    kicker: 'ALL-TERRAIN EXPEDITION',
    collection: 'ALPINE TRAILS · VIBRAM® MATRIX',
    eyebrow: 'HYDRO-SHIELD & ROCK PLATE',
    headingMain: 'Beyond the',
    headingEm: 'pavement.',
    description:
      'Aggressive 4.5mm multidirectional lugs and rock-plate protection designed to conquer wet granite, loose scree, and technical mountain trails.',
    weight: '10.1 OZ (286G)',
    drop: '10 MM DROP',
    cushion: 'ALL-TERRAIN DAMPENING',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #047857 0%, #064e3b 35%, #020907 75%)',
  },
  {
    id: 'slide-5',
    product: products[2], // Forma Low
    kicker: 'ARCHITECTURAL LIFESTYLE',
    collection: 'TAILORED ESSENTIALS · ITALIAN LEATHER',
    eyebrow: 'SUPPLE ITALIAN GRAIN LEATHER',
    headingMain: 'Quiet form.',
    headingEm: 'Daily luxury.',
    description:
      'Hand-finished supple leather low-top with an ergonomic anatomic footbed crafted for 20,000 effortless steps across the metropolis.',
    weight: '9.2 OZ (260G)',
    drop: '4 MM DROP',
    cushion: 'ERGOCUSH ANATOMIC',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #b45309 0%, #451a03 35%, #0a0604 75%)',
  },
  {
    id: 'slide-6',
    product: products[3], // Kinetic Knit
    kicker: 'STUDIO AGILITY LAB',
    collection: 'DYNAMIC SIDE-WALL CAGE / 06',
    eyebrow: 'BREATHABLE ADAPTIVE MESH',
    headingMain: 'Precision locked.',
    headingEm: 'Zero slip.',
    description:
      'Stable under heavy load and agile in multi-directional HIIT transitions. The all-around trainer that meets your whole athletic regimen.',
    weight: '8.4 OZ (238G)',
    drop: '5 MM DROP',
    cushion: 'LATERAL CAGE LOCK',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #6d28d9 0%, #2e1065 35%, #070311 75%)',
  },
  {
    id: 'slide-7',
    product: products[11], // Ridge Shift
    kicker: 'EXPEDITION SUMMIT PRO',
    collection: 'KEVLAR® REINFORCED CHASSIS / 07',
    eyebrow: 'MULTIDIRECTIONAL DEEP TRACTION',
    headingMain: 'Conquer every',
    headingEm: 'elevation.',
    description:
      'An expedition-grade mountain explorer with reinforced Kevlar sidewalls, mud-shedding tread geometry, and dual-compound shock absorption.',
    weight: '10.8 OZ (306G)',
    drop: '10 MM DROP',
    cushion: 'KEVLAR DUALFOAM',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #be185d 0%, #500724 35%, #0c0206 75%)',
  },
  {
    id: 'slide-8',
    product: products[9], // Transit Form
    kicker: 'METROPOLITAN COMMUTER',
    collection: 'ANATOMIC CORK & MEMORY CORE / 08',
    eyebrow: 'ALL-DAY METROPOLIS ERGONOMICS',
    headingMain: 'Sculpted comfort.',
    headingEm: 'Endless transit.',
    description:
      'Structured enough for boardroom presentation, soft enough for 20,000 steps without fatigue. Features dual-layer antimicrobial footbeds.',
    weight: '8.9 OZ (252G)',
    drop: '5 MM DROP',
    cushion: 'MEMORY CORK HYBRID',
    accentColor: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #0f766e 0%, #042f2e 35%, #010a09 75%)',
  },
  {
    id: 'slide-9',
    product: products[7], // Element Pace
    kicker: 'WEATHERPROOF SERIES',
    collection: 'AQUAGUARD ALL-WEATHER GASKET / 09',
    eyebrow: 'STORM-TESTED HYDROPHOBIC SHIELD',
    headingMain: 'Defy elements.',
    headingEm: 'Never stop.',
    description:
      'Hydro-shield water-repellent barrier, plush underfoot dampening, and confident all-weather traction designed to perform through storms.',
    weight: '9.6 OZ (272G)',
    drop: '8 MM DROP',
    cushion: 'AQUAGUARD PLUSH',
    accentColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.45)',
    bgGradient: 'radial-gradient(circle at 75% 25%, #4338ca 0%, #1e1b4b 35%, #04030d 75%)',
  },
]

export default function HeroSlider({ go, openProduct, currency = 'USD' }: Props) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const thumbListRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)

  // Auto-advance timer (5.5s)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused])

  // Keep active thumbnail scrolled into view
  useEffect(() => {
    if (thumbListRef.current) {
      const activeThumb = thumbListRef.current.children[current] as HTMLElement | undefined
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [current])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart - touchEnd > 50) {
      nextSlide()
    }
    if (touchStart - touchEnd < -50) {
      prevSlide()
    }
    setTouchStart(null)
  }

  return (
    <div
      className="hero-slider-grand-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Averonix Footwear Hero Slider"
    >
      {/* ── Carousel Slide Track (9 Full Slides) ── */}
      <div
        className="hero-slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: 'transform 0.75s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <section
            key={slide.id}
            className={`hero-slide-item ${idx === current ? 'is-active-slide' : ''}`}
            style={{ background: slide.bgGradient }}
          >
            {/* Cinematic background image layer */}
            <div className="hero-slide-bg-wrap">
              <img
                src={slide.product.image}
                alt={slide.product.name}
                className="hero-slide-backdrop-img"
              />
              <div
                className="hero-slide-ambient-glow"
                style={{ background: slide.glowColor }}
              />
              <div className="hero-slide-overlay-mask" />
            </div>

            {/* Slide Content — centered */}
            <div className="hero-slide-inner hero-slide-center">
              <div className="hero-slide-copy hero-slide-copy-center">
                <h1 className="hero-title-animated">
                  {slide.headingMain}
                  <br />
                  <em>{slide.headingEm}</em>
                </h1>

                <p className="hero-text">{slide.description}</p>

                <div className="hero-actions hero-actions-center">
                  <button
                    className="button button-light hero-cta-btn"
                    onClick={() => go('arrivals')}
                  >
                    Explore collection <span>↗</span>
                  </button>
                  <button
                    className="quiet-button hero-shoe-quickview-btn"
                    onClick={() => openProduct(slide.product)}
                  >
                    View {slide.product.name} ({formatPrice(slide.product.price, currency)}) →
                  </button>
                </div>
              </div>

            </div>
          </section>
        ))}
      </div>

      {/* ── Floating Left / Right Slider Arrows ── */}
      <button
        className="hero-slider-nav-btn hero-slider-prev"
        onClick={prevSlide}
        aria-label="Previous shoe slide"
        title="Previous slide (Left Arrow)"
      >
        ❮
      </button>
      <button
        className="hero-slider-nav-btn hero-slider-next"
        onClick={nextSlide}
        aria-label="Next shoe slide"
        title="Next slide (Right Arrow)"
      >
        ❯
      </button>


    </div>
  )
}
