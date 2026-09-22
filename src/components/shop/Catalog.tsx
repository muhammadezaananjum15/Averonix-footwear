import { useMemo, useState } from 'react'
import type { Category, Currency, Page, ProductActions } from '../../types'
import { products } from '../../data/products'
import ProductGrid from './ProductGrid'

// ─────────────────────────────────────────────────────────────────────────────
// Catalog — shop / arrivals / best / offers listing page
// ─────────────────────────────────────────────────────────────────────────────

type Props = ProductActions & {
  page: Page
  currency?: Currency
  comparedIds?: number[]
}

const HEADLINES: Record<string, [string, string, string]> = {
  shop: ['The', 'collection.', 'Premium technical footwear for the way your day actually moves.'],
  arrivals: ['New', 'motion.', 'Fresh laboratory profiles. Same uncompromising performance.'],
  best: ['Most', 'wanted.', 'The flagship pairs that earned their permanent place in the rotation.'],
  offers: ['Considered', 'value.', 'Selected seasonal archive styles, priced for the present.'],
}

const PRICE_FILTERS: [string, string][] = [
  ['all', 'All prices'],
  ['under150', 'Under $150'],
  ['150to180', '$150 — $180'],
  ['over180', '$180 and up'],
]

export default function Catalog({
  page,
  add,
  openProduct,
  saved,
  toggleSaved,
  currency = 'USD',
  openCompare,
  comparedIds,
}: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'All' | Category>('All')
  const [sort, setSort] = useState('featured')
  const [price, setPrice] = useState('all')
  const [saleOnly, setSaleOnly] = useState(false)

  const source =
    page === 'arrivals'
      ? products.filter((p) => p.arrival)
      : page === 'best'
        ? products.filter((p) => p.best)
        : page === 'offers'
          ? products.filter((p) => p.offer)
          : products

  const shown = useMemo(
    () =>
      source
        .filter((p) => {
          const matchCategory = category === 'All' || p.category === category
          const matchQuery = `${p.name} ${p.category} ${p.color} ${p.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
          const matchSale = !saleOnly || p.offer
          const matchPrice =
            price === 'all' ||
            (price === 'under150' && p.price < 150) ||
            (price === '150to180' && p.price >= 150 && p.price <= 180) ||
            (price === 'over180' && p.price > 180)
          return matchCategory && matchQuery && matchSale && matchPrice
        })
        .sort((a, b) =>
          sort === 'low'
            ? a.price - b.price
            : sort === 'high'
              ? b.price - a.price
              : sort === 'newest'
                ? Number(Boolean(b.arrival)) - Number(Boolean(a.arrival))
                : sort === 'rating'
                  ? (b.rating || 4.5) - (a.rating || 4.5)
                  : 0,
        ),
    [source, category, query, sort, saleOnly, price],
  )

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
    setSort('featured')
    setPrice('all')
    setSaleOnly(false)
  }

  const [first, second, copy] = HEADLINES[page] || ['The', 'collection.', 'Technical footwear for everyday.']

  return (
    <main className="page-shell">
      <section className="page-hero catalog-hero">
        <p className="eyebrow">AVERONIX / {page.toUpperCase()}</p>
        <h1>
          {first} <em>{second}</em>
        </h1>
        <p>{copy}</p>
      </section>

      <section className="catalog-layout">
        {/* ── Sidebar filters ── */}
        <aside className="catalog-sidebar">
          <div className="filter-heading">
            <p>FILTER BY</p>
            <button onClick={clearFilters}>Clear all</button>
          </div>

          <span className="filter-label">Category</span>
          {(['All', 'Running', 'Lifestyle', 'Training', 'Trail'] as const).map((item) => (
            <button
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}

          <span className="filter-label spaced">Price Range</span>
          {PRICE_FILTERS.map(([value, label]) => (
            <button
              key={value}
              className={price === value ? 'active' : ''}
              onClick={() => setPrice(value)}
            >
              {label}
            </button>
          ))}

          <label className="sale-filter">
            <input
              type="checkbox"
              checked={saleOnly}
              onChange={(e) => setSaleOnly(e.target.checked)}
            />{' '}
            Private sale styles only
          </label>
        </aside>

        {/* ── Product listing ── */}
        <div className="catalog-main">
          <div className="catalog-tools">
            <p>{shown.length} styles available</p>
            <div>
              <input
                aria-label="Search shoes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, color, or tech..."
              />
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured Stride</option>
                <option value="rating">Top Rated (★)</option>
                <option value="newest">Newest Arrivals</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {shown.length ? (
            <ProductGrid
              products={shown}
              add={add}
              openProduct={openProduct}
              saved={saved}
              toggleSaved={toggleSaved}
              currency={currency}
              openCompare={openCompare}
              comparedIds={comparedIds}
            />
          ) : (
            <div className="empty-results">
              <p>No styles match your filter selection.</p>
              <button className="button button-light" onClick={clearFilters}>
                Reset filters <span>→</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
