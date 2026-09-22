import { useState } from 'react'
import type { Currency, Product, ProductActions } from '../../types'
import { sizes } from '../../data/products'
import { formatPrice } from '../../utils/format'

type Props = ProductActions & {
  product: Product
  quickAddOpen: boolean
  onToggleQuickAdd: (id: number | null) => void
  currency?: Currency
  isCompared?: boolean
  onToggleCompare?: (product: Product) => void
}

export default function ProductCard({
  product,
  add,
  openProduct,
  saved,
  toggleSaved,
  quickAddOpen,
  onToggleQuickAdd,
  currency = 'USD',
  isCompared = false,
  onToggleCompare,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<string>('US 9')
  const [currentImage, setCurrentImage] = useState<string>(product.image)
  const [justAdded, setJustAdded] = useState(false)

  const handleQuickAdd = () => {
    add(product, selectedSize)
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
      onToggleQuickAdd(null)
    }, 900)
  }

  const isSaved = saved.includes(product.id)

  return (
    <article className={`product-card ${quickAddOpen ? 'quick-add-open' : ''}`}>
      <div className="product-image">
        {/* Category / special badge label */}
        <span className="product-badge">
          {product.badge || (product.offer ? 'Special Price' : product.category)}
        </span>

        {/* Top Action Badges: Wishlist + Compare */}
        <div className="product-card-top-actions">
          {onToggleCompare && (
            <button
              className={`compare-btn-badge ${isCompared ? 'active' : ''}`}
              aria-label={`Compare ${product.name}`}
              title={isCompared ? 'In comparison' : 'Add to compare'}
              onClick={(e) => {
                e.stopPropagation()
                onToggleCompare(product)
              }}
            >
              ⚖
            </button>
          )}

          <button
            className={`save-button ${isSaved ? 'saved' : ''}`}
            aria-label={`Save ${product.name}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleSaved(product.id)
            }}
          >
            {isSaved ? '♥' : '♡'}
          </button>
        </div>

        {/* Product Image */}
        <img
          onClick={() => openProduct(product)}
          src={currentImage}
          alt={product.name}
          className="card-main-image"
        />

        {/* Quick-add Trigger Bar */}
        <div className="quick-add-trigger-bar">
          <button
            className="quick-add-open-btn"
            aria-expanded={quickAddOpen}
            onClick={() => onToggleQuickAdd(quickAddOpen ? null : product.id)}
          >
            <span>+ Quick Add Size</span>
            <small>{formatPrice(product.price, currency)}</small>
          </button>
        </div>

        {/* ── Luxury Quick-Add Glassmorphic Drawer / Modal ── */}
        <div className={`quick-add-modal-drawer ${quickAddOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <div className="drawer-title-wrap">
              <h4>{product.name}</h4>
              <span>{formatPrice(product.price, currency)} · Select Size</span>
            </div>
            <button
              className="drawer-close-btn"
              onClick={() => onToggleQuickAdd(null)}
              aria-label="Close quick add"
            >
              ×
            </button>
          </div>

          {/* Color swatch previews if alternate images available */}
          {product.alternateImages && product.alternateImages.length > 1 && (
            <div className="card-swatches">
              <span>View Angle:</span>
              <div className="swatch-dots">
                {product.alternateImages.map((img, i) => (
                  <button
                    key={i}
                    className={`swatch-dot ${currentImage === img ? 'active' : ''}`}
                    onClick={() => setCurrentImage(img)}
                    title={`View angle ${i + 1}`}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Chips */}
          <div className="size-selector-chips">
            {sizes.map((sz) => (
              <button
                key={sz}
                className={`size-chip-btn ${selectedSize === sz ? 'selected' : ''}`}
                onClick={() => setSelectedSize(sz)}
              >
                {sz.replace('US ', '')}
              </button>
            ))}
          </div>

          {/* In Stock & Dispatch Guarantee */}
          <div className="stock-guarantee-pill">
            <i>●</i> In Stock · Free 2-Day Express Shipping
          </div>

          {/* Action Row */}
          <div className="drawer-action-row">
            <button
              className={`button button-dark drawer-add-btn ${justAdded ? 'added' : ''}`}
              onClick={handleQuickAdd}
            >
              {justAdded ? 'Added to Bag ✓' : `Add ${selectedSize} to Bag ↗`}
            </button>
            <button
              className="drawer-detail-link"
              onClick={() => openProduct(product)}
            >
              Full specs →
            </button>
          </div>
        </div>
      </div>

      {/* ── Product Info Below Image ── */}
      <div className="product-info">
        <button className="product-title-btn" onClick={() => openProduct(product)}>
          <h3>{product.name}</h3>
          <p className="product-color-category">
            {product.category} · {product.color}
          </p>
        </button>

        <div className="product-pricing">
          <strong>{formatPrice(product.price, currency)}</strong>
          {product.previous && (
            <del>{formatPrice(product.previous, currency)}</del>
          )}
        </div>
      </div>
    </article>
  )
}
