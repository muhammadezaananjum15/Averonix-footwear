const STATS = [
  {
    num: '14,800+',
    label: 'PAIRS CRAFTED & DELIVERED',
    sub: 'Worn across 28 global metropolitan hubs',
  },
  {
    num: '85%',
    label: 'ENERGY RETURN CO-EFFICIENT',
    sub: 'Verified in independent biomechanical testing',
  },
  {
    num: '4.93 / 5',
    label: 'VERIFIED ATHLETE RATING',
    sub: 'Across 600+ multi-terrain review submissions',
  },
  {
    num: '100%',
    label: 'CARBON OFFSET ON ALL SHIPMENTS',
    sub: 'Zero single-use plastics in our packaging',
  },
]

export default function BrandStats() {
  return (
    <section className="brand-stats-section">
      <div className="stats-inner">
        <div className="stats-grid">
          {STATS.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-num">{stat.num}</span>
              <b className="stat-label">{stat.label}</b>
              <p className="stat-sub">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
