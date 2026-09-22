import type { Currency, Product } from '../../types'
import { formatPrice } from '../../utils/format'

type Props = {
  productsToCompare: Product[]
  close: () => void
  removeProduct: (id: number) => void
  openProduct: (product: Product) => void
  add: (product: Product, size?: string) => void
  currency?: Currency
}

export default function ProductCompareModal({
  productsToCompare,
  close,
  removeProduct,
  openProduct,
  add,
  currency = 'USD',
}: Props) {
  if (productsToCompare.length === 0) return null

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-panel compare-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close comparison">
          ×
        </button>

        <p className="eyebrow">HEAD-TO-HEAD COMPARISON</p>
        <h2>Technical Specification Matrix</h2>
        <p className="compare-sub">
          Comparing {productsToCompare.length} performance {productsToCompare.length === 1 ? 'model' : 'models'} across laboratory parameters.
        </p>

        <div className="compare-grid" style={{ gridTemplateColumns: `160px repeat(${productsToCompare.length}, 1fr)` }}>
          {/* Header Row: Products */}
          <div className="compare-label-cell product-cell-header">Model</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-product-header">
              <button
                className="compare-remove-btn"
                onClick={() => removeProduct(p.id)}
                title="Remove from compare"
              >
                ✕
              </button>
              <img src={p.image} alt={p.name} onClick={() => openProduct(p)} />
              <h4>{p.name}</h4>
              <span className="compare-price">{formatPrice(p.price, currency)}</span>
              <button
                className="button button-dark compare-add-btn"
                onClick={() => add(p, 'US 10')}
              >
                Add to Bag ↗
              </button>
            </div>
          ))}

          {/* Category */}
          <div className="compare-label-cell">Discipline</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              <strong>{p.category}</strong>
            </div>
          ))}

          {/* Weight */}
          <div className="compare-label-cell">Shoe Weight</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              {p.specs?.weight || '8.2 oz (232g)'}
            </div>
          ))}

          {/* Heel Drop */}
          <div className="compare-label-cell">Heel-to-Toe Drop</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              {p.specs?.drop || '8 mm'}
            </div>
          ))}

          {/* Cushioning */}
          <div className="compare-label-cell">Cushion Feel</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              <span className="cushion-tag">{p.specs?.cushion || 'Balanced'}</span>
            </div>
          ))}

          {/* Ideal Surface */}
          <div className="compare-label-cell">Primary Surface</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              {p.specs?.surface || 'All-Day Road'}
            </div>
          ))}

          {/* Midsole Technology */}
          <div className="compare-label-cell">Core Tech</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              <small>{p.specs?.midsole || 'Nitro-Injected Foam'}</small>
            </div>
          ))}

          {/* Rating */}
          <div className="compare-label-cell">Athlete Rating</div>
          {productsToCompare.map((p) => (
            <div key={p.id} className="compare-data-cell">
              ★ {p.rating || 4.9} ({p.reviewsCount || 80}+ reviews)
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
