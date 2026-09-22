import { type FormEvent, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Contact — concierge contact form + options
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="page-shell contact-shell">
      {/* Intro grid */}
      <section className="contact-intro">
        <div>
          <p className="eyebrow">AVERONIX CONCIERGE</p>
          <h1>
            How can we
            <br />
            <em>help you move?</em>
          </h1>
          <p>
            Fit advice, delivery questions, product care—or anything else that helps you move
            well. Our team is here Monday through Friday.
          </p>
        </div>
        <aside>
          <span>HELLO@AVERONIX.STUDIO</span>
          <span>MON—FRI / 9AM—5PM PST</span>
          <span>LOS ANGELES · CALIFORNIA</span>
        </aside>
      </section>

      {/* Topic cards */}
      <section className="contact-options">
        {[
          ['01', 'Find your fit', 'Ask a sizing question before you choose your next pair.', 'Ask about fit ↗'],
          ['02', 'Order support', 'Need help with a delivery, exchange, or return? We\u2019ve got you.', 'Get order help ↗'],
          ['03', 'Product care', 'Get more miles and better days from the pair you already love.', 'Care guidance ↗'],
        ].map(([num, title, desc, cta]) => (
          <article key={num}>
            <b>{num}</b>
            <h2>{title}</h2>
            <p>{desc}</p>
            <a href="mailto:hello@averonix.studio">{cta}</a>
          </article>
        ))}
      </section>

      {/* Message form */}
      <section className="contact-form-section">
        <div>
          <p className="eyebrow">SEND A NOTE</p>
          <h2>
            We read every
            <br />
            <em>message.</em>
          </h2>
        </div>

        <form onSubmit={submit} className="contact-form">
          <label>
            Name
            <input required placeholder="Your name" />
          </label>
          <label>
            Email
            <input required type="email" placeholder="you@email.com" />
          </label>
          <label>
            How can we help?
            <textarea required placeholder="Write your message" rows={5} />
          </label>
          <button className="button button-light">
            Send message <span>→</span>
          </button>
          {sent && (
            <p className="form-success">
              Thank you. Your message is saved locally in this frontend demonstration.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}
