import { useState } from 'react'
import type { Currency, Product } from '../../types'
import { sizes } from '../../data/products'
import { formatPrice } from '../../utils/format'

type Props = {
  product: Product
  close: () => void
  add: (product: Product, size?: string, quantity?: number) => void
  saved: boolean
  toggleSaved: () => void
  currency?: Currency
  openSizeGuide?: () => void
  openCompare?: (product: Product) => void
  isCompared?: boolean
}

export default function ProductDetail({
  product,
  close,
  add,
  saved,
  toggleSaved,
  currency = 'USD',
  openSizeGuide,
  openCompare,
  isCompared,
}: Props) {
  const [size, setSize] = useState('US 9')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(product.image)

  const imagesList = product.alternateImages || [product.image]

  return (
    <div className="modal-backdrop" onClick={close}>
      <section className="product-modal modern-product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close product view">
          ×
        </button>

        {/* ── Left Column: Media & Thumbnails ── */}
        <div className="modal-gallery">
          <div className="modal-main-image-wrap">
            <img src={activeImage} alt={product.name} className="modal-featured-img" />
            <span className="modal-badge-tag">{product.category}</span>
          </div>

          {imagesList.length > 1 && (
            <div className="modal-thumb-strip">
              {imagesList.map((img, i) => (
                <button
                  key={i}
                  className={`modal-thumb-btn ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Column: Specs & Purchasing ── */}
        <div className="modal-info">
          <div className="modal-header-top">
            <p className="eyebrow">{product.category.toUpperCase()} / PERFORMANCE LAB</p>
            <div className="modal-rating-badge">
              <span>★ {product.rating || 4.9}</span>
              <small>({product.reviewsCount || 120} reviews)</small>
            </div>
          </div>

          <h2>{product.name}</h2>

          <p className="modal-price">
            {formatPrice(product.price, currency)}{' '}
            {product.previous && <del>{formatPrice(product.previous, currency)}</del>}
          </p>

          <p className="modal-copy">{product.description}</p>

          {/* Technical Specs Mini-Table */}
          <div className="modal-specs-grid">
            <div className="spec-pill">
              <span>WEIGHT</span>
              <b>{product.specs?.weight || '7.8 oz'}</b>
            </div>
            <div className="spec-pill">
              <span>DROP</span>
              <b>{product.specs?.drop || '8 mm'}</b>
            </div>
            <div className="spec-pill">
              <span>CUSHION</span>
              <b>{product.specs?.cushion || 'Plush'}</b>
            </div>
          </div>

          <div className="colour-row">
            <span>Colourway</span>
            <b>{product.color}</b>
          </div>

          {/* Size Selector */}
          <div className="size-row">
            <span>
              Size (US Unisex){' '}
              {openSizeGuide && (
                <button type="button" onClick={openSizeGuide} className="size-guide-link">
                  ⚡ Fit Guide & Calculator
                </button>
              )}
            </span>
            <div className="size-chips-grid">
              {sizes.map((item) => (
                <button
                  key={item}
                  className={size === item ? 'selected' : ''}
                  onClick={() => setSize(item)}
                >
                  {item.replace('US ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="purchase-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button
              className="button button-dark modal-add-bag-btn"
              onClick={() => add(product, size, quantity)}
            >
              Add {quantity > 1 ? `${quantity} pairs` : 'to bag'} <span>→</span>
            </button>
          </div>

          {/* Wishlist & Compare Links */}
          <div className="modal-aux-actions">
            <button
              className={saved ? 'wish active' : 'wish'}
              onClick={toggleSaved}
            >
              {saved ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}
            </button>

            {openCompare && (
              <button
                className="compare-link-btn"
                onClick={() => openCompare(product)}
              >
                ⚖ {isCompared ? 'In Compare List' : 'Compare Specs'}
              </button>
            )}
          </div>

          {/* Assurance Perks */}
          <div className="detail-perks">
            <span>Complimentary Express Courier</span>
            <span>30-Day Wear Trial</span>
            <span>Carbon Neutral</span>
          </div>
        </div>
      </section>
    </div>
  )
}
