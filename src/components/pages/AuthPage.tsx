import { type FormEvent, useState } from 'react'
import type { Page } from '../../types'

// ─────────────────────────────────────────────────────────────────────────────
// AuthPage — login & sign-up (shared component, controlled by `mode` prop)
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  mode: 'login' | 'signup'
  go: (page: Page) => void
}

export default function AuthPage({ mode, go }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const isSignUp = mode === 'signup'

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="page-shell auth-page">
      {/* Visual / benefits panel */}
      <section className="auth-visual">
        <p className="eyebrow">AVERONIX / MEMBERS</p>
        <h1>
          Made for
          <br />
          <em>your rhythm.</em>
        </h1>
        <p>
          Save your edit, review your orders, and be first through the door for new movement.
        </p>
        <div>
          <span>MEMBER BENEFIT / 01</span>
          <b>Private release access</b>
          <span>MEMBER BENEFIT / 02</span>
          <b>Fast, seamless checkout</b>
        </div>
      </section>

      {/* Form panel */}
      <section className="auth-panel">
        <p className="eyebrow">{isSignUp ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}</p>
        <h2>
          {isSignUp ? (
            <>
              Start your
              <br />
              <em>edit.</em>
            </>
          ) : (
            <>
              Good to see
              <br />
              <em>you.</em>
            </>
          )}
        </h2>

        {submitted ? (
          <div className="auth-success">
            <b>{isSignUp ? 'Your account is ready.' : 'You\u2019re signed in.'}</b>
            <p>This frontend demo does not create a real account. Continue to your personal edit.</p>
            <button className="button button-dark" onClick={() => go('account')}>
              Go to account <span>→</span>
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="auth-form">
            {isSignUp && (
              <label>
                Full name
                <input required placeholder="Your name" />
              </label>
            )}
            <label>
              Email address
              <input required type="email" placeholder="you@email.com" />
            </label>
            <label>
              Password
              <input required type="password" minLength={6} placeholder="At least 6 characters" />
            </label>
            {isSignUp && (
              <label className="consent">
                <input required type="checkbox" /> I agree to receive intentional things from
                Averonix.
              </label>
            )}
            <button className="button button-dark">
              {isSignUp ? 'Create account' : 'Log in'} <span>→</span>
            </button>
          </form>
        )}

        <p className="auth-switch">
          {isSignUp ? 'Already a member?' : 'New to Averonix?'}{' '}
          <button onClick={() => go(isSignUp ? 'login' : 'signup')}>
            {isSignUp ? 'Log in' : 'Create an account'}
          </button>
        </p>
        <button className="back-link" onClick={() => go('home')}>
          ← Return to shop
        </button>
      </section>
    </main>
  )
}
