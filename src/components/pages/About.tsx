import type { Page } from '../../types'

// ─────────────────────────────────────────────────────────────────────────────
// About — brand story & philosophy page
// ─────────────────────────────────────────────────────────────────────────────

type Props = { go: (page: Page) => void }

export default function About({ go }: Props) {
  return (
    <main className="page-shell">
      <section className="about-hero">
        <p className="eyebrow">OUR PHILOSOPHY</p>
        <h1>
          Built for the
          <br />
          <em>way forward.</em>
        </h1>
        <p>Averonix exists to make footwear that feels effortless in motion and unmistakable at rest.</p>
        <button className="button button-light" onClick={() => go('shop')}>
          Meet the collection <span>→</span>
        </button>
      </section>

      <section className="pillars">
        {[
          ['01', 'Performance', 'first.', 'Responsive systems and technical materials designed to work hard without asking for attention.'],
          ['02', 'Less, but', 'better.', 'We make purposeful silhouettes with staying power, not a product calendar full of noise.'],
          ['03', 'Always in', 'motion.', 'From first train to last mile, our footwear is made to live at your pace.'],
        ].map(([num, line1, line2, desc]) => (
          <div key={num}>
            <span>{num}</span>
            <h2>
              {line1}
              <br />
              <em>{line2}</em>
            </h2>
            <p>{desc}</p>
          </div>
        ))}
      </section>

      <section className="about-cta">
        <p className="eyebrow">OUR COMMITMENT</p>
        <h2>
          Innovation you
          <br />
          can <em>feel.</em>
        </h2>
        <button className="button button-dark" onClick={() => go('contact')}>
          Talk to our team <span>→</span>
        </button>
      </section>
    </main>
  )
}
