import { useState } from 'react'

type Props = {
  close: () => void
}

const SIZE_CHART = [
  { usMen: '6.0', usWomen: '7.5', uk: '5.5', eu: '38.5', cm: '24.0', inches: '9.45"' },
  { usMen: '7.0', usWomen: '8.5', uk: '6.0', eu: '40.0', cm: '25.0', inches: '9.84"' },
  { usMen: '8.0', usWomen: '9.5', uk: '7.0', eu: '41.0', cm: '26.0', inches: '10.24"' },
  { usMen: '9.0', usWomen: '10.5', uk: '8.0', eu: '42.5', cm: '27.0', inches: '10.63"' },
  { usMen: '10.0', usWomen: '11.5', uk: '9.0', eu: '44.0', cm: '28.0', inches: '11.02"' },
  { usMen: '11.0', usWomen: '12.5', uk: '10.0', eu: '45.0', cm: '29.0', inches: '11.42"' },
  { usMen: '12.0', usWomen: '13.5', uk: '11.0', eu: '46.5', cm: '30.0', inches: '11.81"' },
]

export default function SizeGuideModal({ close }: Props) {
  const [activeTab, setActiveTab] = useState<'chart' | 'calculator' | 'howTo'>('calculator')
  const [typicalSize, setTypicalSize] = useState('10')
  const [footWidth, setFootWidth] = useState<'narrow' | 'standard' | 'wide'>('standard')
  const [shoeType, setShoeType] = useState<'running' | 'lifestyle' | 'trail'>('running')

  const calculateRecommendation = () => {
    const base = parseFloat(typicalSize) || 10
    if (footWidth === 'wide' || shoeType === 'trail') {
      return `US ${(base + 0.5).toFixed(1)} (We recommend sizing up 1/2 size for toe splay)`
    }
    if (footWidth === 'narrow') {
      return `US ${base.toFixed(1)} (Our adaptive knit will provide a locked-in ergonomic hug)`
    }
    return `US ${base.toFixed(1)} (True to size with standard athletic socks)`
  }

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-panel size-guide-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close size guide">
          ×
        </button>

        <p className="eyebrow">FIT ARCHITECTURE</p>
        <h2>Size & Fit Guide</h2>

        <div className="size-guide-tabs">
          <button
            className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            ⚡ Fit Calculator
          </button>
          <button
            className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            Conversion Table
          </button>
          <button
            className={`tab-btn ${activeTab === 'howTo' ? 'active' : ''}`}
            onClick={() => setActiveTab('howTo')}
          >
            How to Measure
          </button>
        </div>

        {activeTab === 'calculator' && (
          <div className="fit-calculator-content">
            <p className="calc-desc">
              Answer 3 quick questions to receive a tailored size recommendation for the Averonix last:
            </p>

            <div className="calc-group">
              <label>1. Your typical athletic sneaker size (US):</label>
              <div className="size-pill-selector">
                {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'].map((s) => (
                  <button
                    key={s}
                    className={`size-pill ${typicalSize === s ? 'active' : ''}`}
                    onClick={() => setTypicalSize(s)}
                  >
                    US {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-group">
              <label>2. Your foot width / volume profile:</label>
              <div className="option-row">
                <button
                  className={`option-btn ${footWidth === 'narrow' ? 'active' : ''}`}
                  onClick={() => setFootWidth('narrow')}
                >
                  <b>Narrow Foot</b>
                  <span>Low volume, snug heel preference</span>
                </button>
                <button
                  className={`option-btn ${footWidth === 'standard' ? 'active' : ''}`}
                  onClick={() => setFootWidth('standard')}
                >
                  <b>Standard / Medium</b>
                  <span>Most standard athletic fits</span>
                </button>
                <button
                  className={`option-btn ${footWidth === 'wide' ? 'active' : ''}`}
                  onClick={() => setFootWidth('wide')}
                >
                  <b>Wide / High Instep</b>
                  <span>Requires roomy forefoot toe box</span>
                </button>
              </div>
            </div>

            <div className="calc-group">
              <label>3. Primary intended use:</label>
              <div className="option-row">
                <button
                  className={`option-btn ${shoeType === 'running' ? 'active' : ''}`}
                  onClick={() => setShoeType('running')}
                >
                  Road Running & Intervals
                </button>
                <button
                  className={`option-btn ${shoeType === 'lifestyle' ? 'active' : ''}`}
                  onClick={() => setShoeType('lifestyle')}
                >
                  Daily Lifestyle / Commute
                </button>
                <button
                  className={`option-btn ${shoeType === 'trail' ? 'active' : ''}`}
                  onClick={() => setShoeType('trail')}
                >
                  Trail & Mountain Hiking
                </button>
              </div>
            </div>

            <div className="recommendation-box">
              <span className="rec-eyebrow">YOUR RECOMMENDED AVERONIX SIZE</span>
              <h3>{calculateRecommendation()}</h3>
              <p>
                Backed by our 30-day trial guarantee. If your pair does not fit like a second skin, exchanges are 100% complimentary.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'chart' && (
          <div className="size-chart-table-wrap">
            <table className="size-chart-table">
              <thead>
                <tr>
                  <th>US Men</th>
                  <th>US Women</th>
                  <th>UK</th>
                  <th>EU</th>
                  <th>CM</th>
                  <th>Inches</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row, i) => (
                  <tr key={i}>
                    <td><strong>US {row.usMen}</strong></td>
                    <td>US {row.usWomen}</td>
                    <td>{row.uk}</td>
                    <td>{row.eu}</td>
                    <td>{row.cm} cm</td>
                    <td>{row.inches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'howTo' && (
          <div className="how-to-measure-content">
            <div className="measure-step">
              <span className="step-num">01</span>
              <div>
                <b>Place paper against a wall</b>
                <p>Stand on a piece of paper with your heel lightly touching a flat vertical wall.</p>
              </div>
            </div>
            <div className="measure-step">
              <span className="step-num">02</span>
              <div>
                <b>Mark your longest toe</b>
                <p>Use a pencil held perpendicular to mark the furthest point of your longest toe onto the paper.</p>
              </div>
            </div>
            <div className="measure-step">
              <span className="step-num">03</span>
              <div>
                <b>Measure and compare</b>
                <p>Measure the distance from the edge of the paper to the mark in centimeters, then match with our chart.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
