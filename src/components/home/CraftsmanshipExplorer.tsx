import { useState } from 'react'

type Layer = {
  id: string
  num: string
  title: string
  subtitle: string
  metric: string
  metricLabel: string
  detail: string
  badge: string
  gradient: string
}

const LAYERS: Layer[] = [
  {
    id: 'nitro',
    num: '01',
    title: 'Nitro-Injected HyperFoam™',
    subtitle: 'Ultra-low density supercritical cushioning with 85% energy return.',
    metric: '85%',
    metricLabel: 'Energy Return Efficiency',
    detail:
      'We infuse molecular nitrogen under 300 bar of pressure into our closed-cell EVA copolymer matrix. The result is a featherlight platform that eliminates joint shock while propelling your next transition.',
    badge: 'Proprietary Compound',
    gradient: 'linear-gradient(135deg, #1b5edb 0%, #0c2b66 100%)',
  },
  {
    id: 'carbon',
    num: '02',
    title: 'Carbon Composite Propulsion Spine',
    subtitle: 'Spoon-shaped torsional plate for aggressive roll-through.',
    metric: '42%',
    metricLabel: 'Torsional Rigidity Boost',
    detail:
      'Engineered with aerospace-grade 3K carbon weave sandwiched between midsole layers. It flexes under landing and snaps forward during toe-off, saving critical muscular energy over long distances.',
    badge: 'Aerospace Grade',
    gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
  },
  {
    id: 'knit',
    num: '03',
    title: 'Adaptive Micro-Knit Upper',
    subtitle: 'Targeted zonal breathability woven from recycled marine polymers.',
    metric: '100%',
    metricLabel: 'Seamless One-Piece Construction',
    detail:
      'Mapped directly to foot thermo-scans, the upper features micro-vent apertures over the forefoot and high-density reinforcing cables along the midfoot harness for zero slippage.',
    badge: 'Zero Waste Knit',
    gradient: 'linear-gradient(135deg, #164e63 0%, #083344 100%)',
  },
  {
    id: 'vibram',
    num: '04',
    title: 'Continuous Traction Outsole',
    subtitle: 'Self-cleaning 4.5mm multi-angle lugs with wet-grip compound.',
    metric: '3.8x',
    metricLabel: 'Wet Surface Friction Coefficient',
    detail:
      'Custom rubber formulation designed in partnership with leading compound labs. Provides uncompromising grip across wet asphalt, marble tiles, loose gravel, and mountain scree.',
    badge: 'All-Terrain Tested',
    gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
  },
]

export default function CraftsmanshipExplorer() {
  const [activeLayerId, setActiveLayerId] = useState('nitro')
  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0]

  return (
    <section className="craftsmanship-section">
      <div className="craft-header">
        <p className="eyebrow">ANATOMY OF PERFORMANCE</p>
        <h2>
          Engineered from the <em>molecule up.</em>
        </h2>
        <p className="craft-subhead">
          Explore the four distinct engineering layers that make Averonix footwear an extension of your natural stride.
        </p>
      </div>

      <div className="craft-container">
        {/* Layer Selector Tabs */}
        <div className="craft-tabs">
          {LAYERS.map((layer) => (
            <button
              key={layer.id}
              className={`craft-tab-btn ${layer.id === activeLayerId ? 'active' : ''}`}
              onClick={() => setActiveLayerId(layer.id)}
            >
              <div className="tab-num">{layer.num}</div>
              <div className="tab-meta">
                <b>{layer.title}</b>
                <span>{layer.badge}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Layer Visual Display */}
        <div className="craft-display-card" style={{ background: activeLayer.gradient }}>
          <div className="craft-card-top">
            <span className="craft-badge">{activeLayer.badge}</span>
            <span className="craft-layer-num">LAYER {activeLayer.num} / 04</span>
          </div>

          <div className="craft-card-body">
            <h3>{activeLayer.title}</h3>
            <p className="craft-summary">{activeLayer.subtitle}</p>
            <p className="craft-detail">{activeLayer.detail}</p>
          </div>

          <div className="craft-card-footer">
            <div className="craft-metric-box">
              <span className="metric-val">{activeLayer.metric}</span>
              <span className="metric-lbl">{activeLayer.metricLabel}</span>
            </div>
            <div className="craft-status-pill">
              <i>●</i> Verified Lab Tested
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
