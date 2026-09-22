import type { Currency, Product, ProductActions } from '../../types'
import { formatPrice } from '../../utils/format'

type Props = ProductActions & {
  recentProducts: Product[]
  currency?: Currency
}

export default function RecentlyViewed({
  recentProducts,
  openProduct,
  add,
  saved,
  toggleSaved,
  currency = 'USD',
}: Props) {
  if (recentProducts.length === 0) return null

  return (
    <section className="recently-viewed-section">
      <div className="section-top">
        <div>
          <p className="eyebrow">YOUR RECENT EXPLORATIONS</p>
          <h2>
            Recently <em>viewed styles.</em>
          </h2>
        </div>
      </div>

      <div className="recent-scroll-rail">
        {recentProducts.map((p) => (
          <div key={p.id} className="recent-card">
            <div className="recent-thumb">
              <button
                className={saved.includes(p.id) ? 'save-button saved' : 'save-button'}
                aria-label={`Save ${p.name}`}
                onClick={() => toggleSaved(p.id)}
              >
                ♡
              </button>
              <img src={p.image} alt={p.name} onClick={() => openProduct(p)} />
            </div>
            <div className="recent-meta">
              <button className="recent-title-btn" onClick={() => openProduct(p)}>
                <h4>{p.name}</h4>
                <p>{p.category} · {p.color}</p>
              </button>
              <div className="recent-bottom">
                <strong>{formatPrice(p.price, currency)}</strong>
                <button
                  className="recent-quick-add"
                  onClick={() => add(p, 'US 10')}
                  title="Quick add size US 10"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
