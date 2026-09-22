import type { Order, Page, Product } from '../../types'
import { products } from '../../data/products'
import { money } from '../../utils/format'

// ─────────────────────────────────────────────────────────────────────────────
// Account — order history + saved styles
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  go: (page: Page) => void
  saved: number[]
  orders: Order[]
  openProduct: (product: Product) => void
}

export default function Account({ go, saved, orders, openProduct }: Props) {
  const savedProducts = products.filter((p) => saved.includes(p.id))

  return (
    <main className="page-shell account-page">
      <section>
        <p className="eyebrow">MY AVERONIX</p>
        <h1>
          Your personal
          <br />
          <em>edit.</em>
        </h1>
        <p>Follow your orders, save your next pair and return to the styles that keep up.</p>
      </section>

      <div className="account-grid">
        {/* Order history */}
        <article className="orders-card">
          <p className="eyebrow">ORDER HISTORY</p>
          {orders.length ? (
            orders.map((order) => (
              <div className="order-row" key={order.id}>
                <div>
                  <b>{order.id}</b>
                  <span>
                    {order.placedAt} ·{' '}
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
                <strong>
                  {order.status}
                  <small>{money.format(order.total)}</small>
                </strong>
              </div>
            ))
          ) : (
            <>
              <h3>No orders yet.</h3>
              <span>Once you place a demo order it will be saved here.</span>
              <button onClick={() => go('shop')}>Shop the collection →</button>
            </>
          )}
        </article>

        {/* Saved styles */}
        <article>
          <p className="eyebrow">SAVED STYLES</p>
          <h3>
            {savedProducts.length} {savedProducts.length === 1 ? 'style' : 'styles'}
          </h3>
          {savedProducts.length ? (
            <div className="saved-thumbs">
              {savedProducts.slice(0, 3).map((product) => (
                <button key={product.id} onClick={() => openProduct(product)}>
                  <img src={product.image} alt={product.name} />
                </button>
              ))}
            </div>
          ) : (
            <>
              <span>Tap the heart on any product to start your edit.</span>
              <button onClick={() => go('shop')}>Browse styles →</button>
            </>
          )}
        </article>
      </div>
    </main>
  )
}
