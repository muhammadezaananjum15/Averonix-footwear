import { useState } from 'react'
import type { Currency, Product } from '../../types'
import { products } from '../../data/products'
import { formatPrice } from '../../utils/format'

type Props = {
  openProduct: (product: Product) => void
  add: (product: Product, size?: string) => void
  currency?: Currency
}

type Look = {
  id: string
  title: string
  subtitle: string
  tag: string
  image: string
  product: Product
  pinPosition: { top: string; left: string }
}

const LOOKS: Look[] = [
  {
    id: 'look-1',
    title: 'The Dawn Velocity',
    subtitle: 'High-tempo urban intervals through foggy morning streets.',
    tag: 'Look 01 · Speed Training',
    image: 'https://images.unsplash.com/photo-1483721074577-01777b7891fa?auto=format&fit=crop&w=1200&q=85',
    product: products[0], // Vanta Velocity
    pinPosition: { top: '78%', left: '46%' },
  },
  {
    id: 'look-2',
    title: 'Minimalist Commute',
    subtitle: 'Subtle sophistication from design review to evening dining.',
    tag: 'Look 02 · Tailored Lifestyle',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    product: products[2], // Forma Low
    pinPosition: { top: '82%', left: '52%' },
  },
  {
    id: 'look-3',
    title: 'Alpine Ascent',
    subtitle: 'Technical waterproof protection for unpredictable high passes.',
    tag: 'Look 03 · Trail Exploration',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=85',
    product: products[4], // Terra Form
    pinPosition: { top: '74%', left: '58%' },
  },
]

export default function Lookbook({ openProduct, add, currency = 'USD' }: Props) {
  const [activeLookIndex, setActiveLookIndex] = useState(0)
  const [activePin, setActivePin] = useState(true)

  const activeLook = LOOKS[activeLookIndex]

  return (
    <section className="lookbook-section">
      <div className="lookbook-header">
        <div>
          <p className="eyebrow">EDITORIAL / SS26 LOOKBOOK</p>
          <h2>
            Shoppable <em>in motion.</em>
          </h2>
        </div>
        <div className="lookbook-nav-tabs">
          {LOOKS.map((look, index) => (
            <button
              key={look.id}
              className={`lookbook-tab ${index === activeLookIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveLookIndex(index)
                setActivePin(true)
              }}
            >
              <span>{`0${index + 1}`}</span> {look.title}
            </button>
          ))}
        </div>
      </div>

      <div className="lookbook-stage">
        <div className="lookbook-media">
          <img src={activeLook.image} alt={activeLook.title} className="lookbook-img" />
          <div className="lookbook-overlay-gradient" />

          {/* Hotspot Pin */}
          <div
            className="lookbook-pin"
            style={{ top: activeLook.pinPosition.top, left: activeLook.pinPosition.left }}
            onClick={() => setActivePin(!activePin)}
          >
            <div className="pin-pulse" />
            <div className="pin-core">✦</div>
          </div>

          {/* Floating Product Tag Card */}
          {activePin && (
            <div
              className="lookbook-product-popup"
              style={{
                top: `calc(${activeLook.pinPosition.top} - 100px)`,
                left: `calc(${activeLook.pinPosition.left} + 25px)`,
              }}
            >
              <img src={activeLook.product.image} alt={activeLook.product.name} />
              <div className="popup-info">
                <span className="popup-badge">{activeLook.product.category}</span>
                <h4>{activeLook.product.name}</h4>
                <p className="popup-price">{formatPrice(activeLook.product.price, currency)}</p>
                <div className="popup-actions">
                  <button
                    className="popup-btn-primary"
                    onClick={() => openProduct(activeLook.product)}
                  >
                    Quick View ↗
                  </button>
                  <button
                    className="popup-btn-secondary"
                    onClick={() => add(activeLook.product, 'US 10')}
                  >
                    Add US 10 +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lookbook-caption-card">
          <span className="caption-tag">{activeLook.tag}</span>
          <h3>{activeLook.title}</h3>
          <p>{activeLook.subtitle}</p>
          <div className="caption-product-strip">
            <div className="strip-thumb">
              <img src={activeLook.product.image} alt={activeLook.product.name} />
            </div>
            <div>
              <b>{activeLook.product.name}</b>
              <span>{formatPrice(activeLook.product.price, currency)} · {activeLook.product.color}</span>
            </div>
            <button
              className="strip-btn"
              onClick={() => openProduct(activeLook.product)}
              aria-label={`View ${activeLook.product.name}`}
            >
              Shop Look →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
