import type { Page } from '../../types'

// ─────────────────────────────────────────────────────────────────────────────
// Disclaimer — frontend-only demo notice
// ─────────────────────────────────────────────────────────────────────────────

type Props = { go: (page: Page) => void }

const ITEMS = [
  ['01 / DEMONSTRATION', 'Frontend only', 'This website is a demonstration storefront. Its products, prices, reviews, promotions, order numbers, delivery information, and support details are sample content created for interface presentation.'],
  ['02 / PAYMENTS & ORDERS', 'No transactions', 'Checkout does not process payments or create a real purchase. Form entries and order details are stored only in your current browser for the purposes of demonstrating the shopping flow.'],
  ['03 / PRIVACY', 'Local browser data', 'Your bag, saved styles, and demo orders can be retained with local browser storage. They are not sent to an Averonix server. You can clear this information by clearing your browser site data.'],
  ['04 / IMAGERY & CONTENT', 'Conceptual presentation', 'All brand copy, product data and imagery in this prototype are for visual demonstration. They should not be treated as a live offer, a guarantee, or customer service information.'],
]

export default function Disclaimer({ go }: Props) {
  return (
    <main className="page-shell disclaimer-page">
      <section className="page-hero">
        <p className="eyebrow">SITE DISCLAIMER</p>
        <h1>
          Clear by
          <br />
          <em>design.</em>
        </h1>
        <p>Important information about this Averonix frontend experience.</p>
      </section>

      <section className="disclaimer-content">
        {ITEMS.map(([eyebrow, title, body]) => (
          <article key={eyebrow}>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="support-cta">
        <p>Need help using the site?</p>
        <button className="button button-light" onClick={() => go('contact')}>
          Contact concierge <span>→</span>
        </button>
      </section>
    </main>
  )
}
