import { useMemo, useState } from 'react'
import type { Product } from '../../types'
import { products } from '../../data/products'
import { money } from '../../utils/format'

// ─────────────────────────────────────────────────────────────────────────────
// SiteSearch — full-screen search overlay
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  close: () => void
  openProduct: (product: Product) => void
}

const POPULAR = ['Running', 'New arrivals', 'Trail', 'Navy', 'Sale']

export default function SiteSearch({ close, openProduct }: Props) {
  const [query, setQuery] = useState('')

  const found = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <div className="search-overlay" onClick={close}>
      <section className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-top">
          <p className="eyebrow">SEARCH AVERONIX</p>
          <button aria-label="Close search" onClick={close}>×</button>
        </div>

        <label className="search-input">
          <span>⌕</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shoes, categories or colorways"
          />
        </label>

        {query ? (
          <div className="search-results">
            {found.length ? (
              found.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    openProduct(p)
                    close()
                  }}
                >
                  <img src={p.image} alt="" />
                  <span>
                    <b>{p.name}</b>
                    <small>
                      {p.category} · {p.color}
                    </small>
                  </span>
                  <strong>{money.format(p.price)}</strong>
                  <i>↗</i>
                </button>
              ))
            ) : (
              <p>
                No results for &ldquo;{query}&rdquo;. Try Running, Trail, Navy,
                or a product name.
              </p>
            )}
          </div>
        ) : (
          <div className="search-suggestions">
            <span>Popular searches</span>
            <div>
              {POPULAR.map((term) => (
                <button key={term} onClick={() => setQuery(term)}>
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
