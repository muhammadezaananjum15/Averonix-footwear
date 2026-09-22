import type { Page } from '../../types'

// ─────────────────────────────────────────────────────────────────────────────
// Support — delivery, returns, fit & care FAQ
// ─────────────────────────────────────────────────────────────────────────────

type Props = { go: (page: Page) => void }

const TOPICS = [
  ['01', 'Delivery', 'Orders over $150 ship complimentary. Standard delivery arrives in 3–5 business days; you\u2019ll receive tracking as soon as your order moves.'],
  ['02', 'Returns', 'Try your pair indoors and decide within 30 days. Returns are simple, complimentary and designed to be frictionless.'],
  ['03', 'Fit guidance', 'Our shoes are made true to size. Between sizes? Pick the larger size for running, and your usual size for lifestyle styles.'],
  ['04', 'Care', 'Use a soft brush, gentle soap and cold water. Air dry away from direct heat to preserve shape and performance.'],
]

export default function Support({ go }: Props) {
  return (
    <main className="page-shell support-page">
      <section className="page-hero">
        <p className="eyebrow">AVERONIX SUPPORT</p>
        <h1>
          Good to
          <br />
          <em>know.</em>
        </h1>
        <p>Everything you need to get the best fit, make a return, or follow your delivery.</p>
      </section>

      <section className="support-grid">
        {TOPICS.map(([num, title, desc]) => (
          <article key={num}>
            <span>{num}</span>
            <h2>{title}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      <section className="support-cta">
        <p>Still need a hand?</p>
        <button className="button button-light" onClick={() => go('contact')}>
          Speak to concierge <span>→</span>
        </button>
      </section>
    </main>
  )
}
