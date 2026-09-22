import type { Currency, Page, Product, ProductActions, Review } from '../../types'
import { products, images } from '../../data/products'
import ProductGrid from '../shop/ProductGrid'
import HeroSlider from '../home/HeroSlider'
import CraftsmanshipExplorer from '../home/CraftsmanshipExplorer'
import ReviewsSection from '../home/ReviewsSection'
import BrandStats from '../home/BrandStats'
import RecentlyViewed from '../shop/RecentlyViewed'

// ─────────────────────────────────────────────────────────────────────────────
// Home — landing page with hero slider, lookbook, tech breakdown & reviews
// ─────────────────────────────────────────────────────────────────────────────

type Props = ProductActions & {
  go: (page: Page) => void
  currency?: Currency
  reviews: Review[]
  openReviewModal: () => void
  recentProducts: Product[]
  comparedIds?: number[]
}

const CATEGORIES = ['Running', 'Lifestyle', 'Training', 'Trail'] as const

export default function Home({
  go,
  add,
  openProduct,
  saved,
  toggleSaved,
  currency = 'USD',
  reviews,
  openReviewModal,
  recentProducts,
  openCompare,
  comparedIds,
}: Props) {
  return (
    <main>
      {/* ── Luxury Interactive Hero Carousel ── */}
      <HeroSlider go={go} openProduct={openProduct} currency={currency} />

      {/* ── Category Grid ── */}
      <section className="collection">
        <div className="section-top">
          <div>
            <p className="eyebrow">SHOP BY INTENTION</p>
            <h2>
              Designed for <em>everywhere.</em>
            </h2>
          </div>
          <button className="text-action" onClick={() => go('shop')}>
            Shop all styles →
          </button>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              className="category-tile"
              onClick={() => go('shop')}
            >
              <img src={images[index + 1]} alt={category} />
              <span>{category}</span>
              <b>Explore Collection ↗</b>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Products Grid ── */}
      <section className="collection featured">
        <div className="section-top">
          <div>
            <p className="eyebrow">THE EDIT / MOST WANTED</p>
            <h2>
              Chosen by the
              <br />
              <em>in motion.</em>
            </h2>
          </div>
          <button className="text-action" onClick={() => go('best')}>
            See all bestsellers →
          </button>
        </div>
        <ProductGrid
          products={products.slice(0, 4)}
          add={add}
          openProduct={openProduct}
          saved={saved}
          toggleSaved={toggleSaved}
          currency={currency}
          openCompare={openCompare}
          comparedIds={comparedIds}
        />
      </section>


      {/* ── Craftsmanship & Material 3D Breakdown ── */}
      <CraftsmanshipExplorer />

      {/* ── Brand Milestones & Performance Counters ── */}
      <BrandStats />

      {/* ── Editorial Feature Split ── */}
      <section className="feature">
        <div className="feature-image">
          <img
            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=85"
            alt="Averonix performance footwear craftsmanship"
          />
          <p>
            DESIGNED
            <br />
            TO GO <b>↘</b>
          </p>
        </div>
        <div className="feature-copy">
          <p className="eyebrow">THE AVX PHILOSOPHY</p>
          <h2>
            Made for the
            <br />
            <em>long way.</em>
          </h2>
          <p>
            Every component earns its place: purposeful nitrogen cushioning, breathable adaptive knit structure,
            and an ergonomic heel cup that disappears underfoot for 20,000 continuous steps.
          </p>
          <button className="text-action dark-text" onClick={() => go('about')}>
            Discover our standards →
          </button>
        </div>
      </section>

      {/* ── Verified Customer Reviews & Testimonials ── */}
      <ReviewsSection reviews={reviews} openReviewModal={openReviewModal} />

      {/* ── Field Notes / Editorial ── */}
      <section className="field-notes">
        <div>
          <p className="eyebrow">FIELD NOTES & JOURNAL</p>
          <h2>
            The art of
            <br />
            <em>showing up.</em>
          </h2>
        </div>
        <div className="notes-grid">
          <article>
            <span>01 / CULTURE</span>
            <h3>
              A city is a
              <br />
              starting line.
            </h3>
            <p>Small rituals for getting out the door and locking into your natural stride.</p>
            <button onClick={() => go('about')}>Read story →</button>
          </article>
          <article>
            <span>02 / DESIGN</span>
            <h3>
              Why we make
              <br />
              fewer pairs.
            </h3>
            <p>The uncompromising argument for keeping timeless, serviceable pieces in your rotation.</p>
            <button onClick={() => go('about')}>Read story →</button>
          </article>
        </div>
      </section>

      {/* ── Service Strip ── */}
      <section className="service-strip">
        <div>
          <b>01</b>
          <span>
            Free express delivery
            <br />
            on all orders over $150
          </span>
        </div>
        <div>
          <b>02</b>
          <span>
            30-day wear trial
            <br />
            with free global returns
          </span>
        </div>
        <div>
          <b>03</b>
          <span>
            Bespoke fit concierge
            <br />
            available 7 days a week
          </span>
        </div>
      </section>

      {/* ── Recently Viewed Rail ── */}
      <RecentlyViewed
        recentProducts={recentProducts}
        openProduct={openProduct}
        add={add}
        saved={saved}
        toggleSaved={toggleSaved}
        currency={currency}
      />

      {/* ── VIP Newsletter Promo ── */}
      <section className="home-promo">
        <p className="eyebrow">THE AVERONIX INNER CIRCLE</p>
        <h2>
          More than a
          <br />
          <em>mailing list.</em>
        </h2>
        <p>
          Receive private drop invites, laboratory prototypes, and an instant 15% discount code applied to your order.
        </p>
        <button className="button button-light" onClick={() => go('offers')}>
          Explore seasonal offers <span>→</span>
        </button>
      </section>
    </main>
  )
}
