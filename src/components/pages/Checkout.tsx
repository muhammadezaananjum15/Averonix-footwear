import { type FormEvent, useState } from 'react'
import type { CartItem, Order, Page } from '../../types'
import { money } from '../../utils/format'

// ─────────────────────────────────────────────────────────────────────────────
// Checkout — order form + order-summary sidebar
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  cart: CartItem[]
  total: number
  go: (page: Page) => void
  completeOrder: () => Order
}

function OrderSummary({ cart, total }: { cart: CartItem[]; total: number }) {
  return (
    <aside className="order-summary">
      <p className="eyebrow">ORDER SUMMARY</p>
      {cart.map((item) => (
        <div className="summary-item" key={`${item.product.id}-${item.size}`}>
          <img src={item.product.image} alt="" />
          <span>
            <b>{item.product.name}</b>
            <small>
              {item.size} · Qty {item.quantity}
            </small>
          </span>
          <b>{money.format(item.product.price * item.quantity)}</b>
        </div>
      ))}
      <div className="summary-total">
        <span>Total</span>
        <b>{money.format(total)}</b>
      </div>
    </aside>
  )
}

export default function Checkout({ cart, total, go, completeOrder }: Props) {
  const [order, setOrder] = useState<Order | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOrder(completeOrder())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Success state ──
  if (order) {
    return (
      <main className="page-shell success-page">
        <p className="eyebrow">ORDER CONFIRMED / {order.id}</p>
        <h1>
          It&rsquo;s on
          <br />
          <em>the way.</em>
        </h1>
        <p>
          Your order has been saved to this browser. You can follow its preparation and
          revisit every item from your Averonix account.
        </p>
        <div className="confirmation-card">
          <span>ORDER TOTAL</span>
          <b>{money.format(order.total)}</b>
          <span>STATUS</span>
          <b>{order.status}</b>
        </div>
        <button className="button button-light" onClick={() => go('account')}>
          Track your order <span>→</span>
        </button>
      </main>
    )
  }

  // ── Checkout form ──
  return (
    <main className="page-shell checkout-page">
      <div className="checkout-form">
        <p className="eyebrow">CHECKOUT / SECURE DEMO</p>
        <h1>
          Make it
          <br />
          <em>official.</em>
        </h1>

        {cart.length ? (
          <form onSubmit={submit}>
            <div className="form-section">
              <h3>Contact</h3>
              <label>
                Email address
                <input required type="email" placeholder="you@email.com" />
              </label>
            </div>

            <div className="form-section">
              <h3>Delivery</h3>
              <div className="form-two">
                <label>
                  First name
                  <input required />
                </label>
                <label>
                  Last name
                  <input required />
                </label>
              </div>
              <label>
                Address
                <input required placeholder="Street and number" />
              </label>
              <div className="form-two">
                <label>
                  City
                  <input required />
                </label>
                <label>
                  Postal code
                  <input required />
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment</h3>
              <p className="payment-note">
                This frontend demonstration saves an order to your browser only. No payment
                information is processed or stored.
              </p>
              <label>
                Card number
                <input required inputMode="numeric" placeholder="4242 4242 4242 4242" />
              </label>
            </div>

            <button className="button button-light">
              Place demo order <span>→</span>
            </button>
          </form>
        ) : (
          <>
            <p className="empty">There&rsquo;s nothing in your bag yet.</p>
            <button className="button button-light" onClick={() => go('shop')}>
              Shop the collection <span>→</span>
            </button>
          </>
        )}
      </div>

      <OrderSummary cart={cart} total={total} />
    </main>
  )
}
