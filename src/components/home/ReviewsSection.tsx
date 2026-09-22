import { useState, useRef, useEffect } from 'react'
import type { Review } from '../../types'

type Props = {
  reviews: Review[]
  openReviewModal: () => void
}

// Avatar initials helper
function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Gradient palette cycling for avatar orbs
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
]

export default function ReviewsSection({ reviews, openReviewModal }: Props) {
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStartX = useRef(0)
  const total = reviews.length

  // Auto-advance every 5s
  useEffect(() => {
    const t = setInterval(() => {
      if (!dragging) setActive((p) => (p + 1) % total)
    }, 5000)
    return () => clearInterval(t)
  }, [dragging, total])

  const prev = () => setActive((p) => (p - 1 + total) % total)
  const next = () => setActive((p) => (p + 1) % total)

  const onMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX
    setDragging(false)
  }
  const onMouseUp = (e: React.MouseEvent) => {
    const delta = e.clientX - dragStartX.current
    if (delta < -50) next()
    else if (delta > 50) prev()
  }

  // Compute card position class: active, left-1, left-2, right-1, right-2, hidden
  function getPos(idx: number) {
    const diff = ((idx - active) + total) % total
    if (diff === 0) return 'rc-center'
    if (diff === 1) return 'rc-right1'
    if (diff === 2) return 'rc-right2'
    if (diff === total - 1) return 'rc-left1'
    if (diff === total - 2) return 'rc-left2'
    return 'rc-hidden'
  }

  const featured = reviews[active]

  return (
    <section className="testi-section">
      {/* ── Ambient background orbs ── */}
      <div className="testi-orb testi-orb-a" />
      <div className="testi-orb testi-orb-b" />

      {/* ── Section Header ── */}
      <div className="testi-header">
        <p className="eyebrow testi-eyebrow">VERIFIED CLIENT VOICES</p>
        <h2 className="testi-heading">
          Loved by the <em>obsessed.</em>
        </h2>
        <div className="testi-rating-row">
          <span className="testi-stars">★★★★★</span>
          <span className="testi-rating-label">
            <strong>4.9 / 5.0</strong> · 600+ verified endurance athletes
          </span>
        </div>
      </div>

      {/* ── Hero Featured Quote ── */}
      <div className="testi-hero-quote">
        <span className="testi-big-quote">"</span>
        <p className="testi-quote-text">{featured.comment}</p>
        <div className="testi-quote-author">
          <span
            className="testi-avatar"
            style={{ background: AVATAR_GRADIENTS[active % AVATAR_GRADIENTS.length] }}
          >
            {getInitials(featured.author)}
          </span>
          <div>
            <strong>{featured.author}</strong>
            <span>{featured.location}</span>
          </div>
          <div className="testi-quote-product">
            <span>{featured.productName}</span>
            <span className="testi-verified">✓ Verified</span>
          </div>
        </div>
      </div>

      {/* ── 3D Card Carousel ── */}
      <div
        className="testi-carousel-scene"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {reviews.map((rev, idx) => {
          const pos = getPos(idx)
          return (
            <article
              key={rev.id}
              className={`testi-card ${pos}`}
              onClick={() => pos !== 'rc-center' && setActive(idx)}
            >
              {/* Glassmorphic card inner */}
              <div className="testi-card-inner">
                <div className="testi-card-top">
                  <div className="testi-card-stars">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                  <span className="testi-card-date">{rev.date}</span>
                </div>

                <h3 className="testi-card-title">"{rev.title}"</h3>
                <p className="testi-card-comment">{rev.comment}</p>

                <div className="testi-card-footer">
                  <span
                    className="testi-card-avatar"
                    style={{ background: AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length] }}
                  >
                    {getInitials(rev.author)}
                  </span>
                  <div className="testi-card-author-info">
                    <strong>{rev.author}</strong>
                    <span>{rev.location}</span>
                  </div>
                  {rev.verified && (
                    <span className="testi-card-verified">✓</span>
                  )}
                </div>

                <div className="testi-card-product-badge">
                  {rev.productName}
                </div>

                {/* 3D shine overlay */}
                <div className="testi-card-shine" />
              </div>
            </article>
          )
        })}
      </div>

      {/* ── Controls ── */}
      <div className="testi-controls">
        <button className="testi-nav-btn" onClick={prev} aria-label="Previous review">❮</button>

        <div className="testi-dots">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              className={`testi-dot ${idx === active ? 'active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        <button className="testi-nav-btn" onClick={next} aria-label="Next review">❯</button>

        <button className="testi-write-btn button button-light" onClick={openReviewModal}>
          Write a Review <span>+</span>
        </button>
      </div>
    </section>
  )
}
