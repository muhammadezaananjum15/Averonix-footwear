import { useState } from 'react'
import type { CartItem, Currency, Page } from '../../types'
import { formatPrice } from '../../utils/format'

// ─────────────────────────────────────────────────────────────────────────────
// Bag — slide-out luxury cart drawer with shipping meter & coupon engine
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  cart: CartItem[]
  close: () => void
  updateQuantity: (index: number, quantity: number) => void
  total: number
  go: (page: Page) => void
  currency?: Currency
}

const FREE_SHIPPING_THRESHOLD = 150

export default function Bag({
  cart,
  close,
  updateQuantity,
  total,
  go,
  currency = 'USD',
}: Props) {
  const [promo, setPromo] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState(false)

  // Calculate discount rate
  let discountRate = 0
  if (appliedPromo === 'AVX15') discountRate = 0.15
  else if (appliedPromo === 'VIP20') discountRate = 0.20
  else if (appliedPromo === 'FIRSTMOVE') discountRate = 0.10

  const discountAmount = Math.round(total * discountRate)
  const subtotalAfterDiscount = total - discountAmount

  const isFreeShipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD || total === 0 || appliedPromo === 'FREESHIP'
  const shippingAmount = isFreeShipping ? 0 : 15
  const grandTotal = subtotalAfterDiscount + shippingAmount

  // Free shipping progress percentage
  const freeShipProgress = Math.min(100, Math.round((subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100))
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount)

  const handleApplyPromo = () => {
    const clean = promo.trim().toUpperCase()
    if (clean === 'AVX15' || clean === 'VIP20' || clean === 'FIRSTMOVE' || clean === 'FREESHIP') {
      setAppliedPromo(clean)
      setPromoError(false)
    } else {
      setPromoError(true)
    }
  }

  return (
    <div className="drawer-wrap" onClick={close}>
      <aside className="drawer premium-drawer modern-bag-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="drawer-close" onClick={close} aria-label="Close bag">
          ×
        </button>

        <p className="eyebrow">YOUR SHOPPING BAG</p>
        <h2>Good choices.</h2>

        {cart.length === 0 ? (
          <div className="empty-bag">
            <p>Your bag is currently empty. Discover our latest technical silhouettes and daily performance wear.</p>
            <button
              className="button button-dark"
              onClick={() => {
                close()
                go('shop')
              }}
            >
              Explore Collection <span>→</span>
            </button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Meter */}
            <div className="bag-free-shipping-meter">
              <div className="meter-text">
                {isFreeShipping ? (
                  <span>✦ <strong>Free Express Shipping unlocked!</strong></span>
                ) : (
                  <span>
                    Add <strong>{formatPrice(amountNeeded, currency)}</strong> more for <strong>Free Express Courier</strong>
                  </span>
                )}
              </div>
              <div className="meter-track">
                <div
                  className="meter-fill"
                  style={{ width: `${freeShipProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <ul className="bag-items-list">
              {cart.map((item, index) => (
                <li key={`${item.product.id}-${item.size}`} className="bag-item-row">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="bag-item-details">
                    <b>{item.product.name}</b>
                    <span className="bag-item-variant">
                      {item.product.color} · Size {item.size}
                    </span>
                    <div className="line-quantity">
                      <button onClick={() => updateQuantity(index, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="bag-item-price-col">
                    <strong>{formatPrice(item.product.price * item.quantity, currency)}</strong>
                    <button
                      className="line-remove"
                      onClick={() => updateQuantity(index, 0)}
                      aria-label={`Remove ${item.product.name}`}
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Promo Code Input */}
            <div className="bag-promo-section">
              <div className="promo-row">
                <input
                  value={promo}
                  onChange={(e) => {
                    setPromo(e.target.value)
                    setPromoError(false)
                  }}
                  placeholder="Enter coupon code (e.g. AVX15)"
                />
                <button onClick={handleApplyPromo}>
                  {appliedPromo ? 'Applied ✓' : 'Apply Code'}
                </button>
              </div>

              {appliedPromo && (
                <p className="promo-success-note">
                  ✓ Code &ldquo;{appliedPromo}&rdquo; active ({Math.round(discountRate * 100)}% discount applied)
                </p>
              )}

              {promoError && (
                <p className="promo-error-note">Invalid code. Try AVX15 or VIP20.</p>
              )}
            </div>

            {/* Drawer Totals */}
            <div className="drawer-totals">
              <p>
                <span>Subtotal</span>
                <b>{formatPrice(total, currency)}</b>
              </p>

              {appliedPromo && discountAmount > 0 && (
                <p className="discount-line">
                  <span>Promo Discount ({appliedPromo})</span>
                  <b>−{formatPrice(discountAmount, currency)}</b>
                </p>
              )}

              <p>
                <span>Courier Delivery</span>
                <b>{shippingAmount === 0 ? 'Complimentary' : formatPrice(shippingAmount, currency)}</b>
              </p>

              <div className="grand-total-row">
                <span>Estimated Total</span>
                <b>{formatPrice(grandTotal, currency)}</b>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="button button-dark bag-checkout-btn"
              onClick={() => {
                close()
                go('checkout')
              }}
            >
              Secure Checkout ({formatPrice(grandTotal, currency)}) <span>→</span>
            </button>

            <div className="bag-security-perks">
              <span>🔒 256-Bit Encrypted Checkout</span>
              <span>✦ 30-Day Wear Guarantee</span>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
