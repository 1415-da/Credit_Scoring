import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const FEATURES = [
  'DerogCnt', 'CollectCnt', 'BanruptcyInd', 'InqCnt06', 'InqTimeLast',
  'InqFinanceCnt24', 'TLTimeFirst', 'TLTimeLast', 'TLCnt03', 'TLCnt12',
  'TLCnt24', 'TLCnt', 'TLSum', 'TLMaxSum', 'TLSatCnt', 'TLDel60Cnt',
  'TLBadCnt24', 'TL75UtilCnt', 'TL50UtilCnt', 'TLBalHCPct', 'TLSatPct',
  'TLDel3060Cnt24', 'TLDel90Cnt24', 'TLDel60CntAll', 'TLOpenPct',
  'TLBadDerogCnt', 'TLOpen24Pct'
];

// Short descriptions for each feature
const FEATURE_DESCRIPTIONS = {
  DerogCnt: 'Number of major derogatory reports',
  CollectCnt: 'Number of collection accounts',
  BanruptcyInd: 'Bankruptcy indicator (1 = Yes, 0 = No)',
  InqCnt06: 'Number of credit inquiries in last 6 months',
  InqTimeLast: 'Months since last inquiry',
  InqFinanceCnt24: 'Number of finance inquiries in last 24 months',
  TLTimeFirst: 'Months since first trade line opened',
  TLTimeLast: 'Months since most recent trade line opened',
  TLCnt03: 'Number of trade lines opened in last 3 months',
  TLCnt12: 'Number of trade lines opened in last 12 months',
  TLCnt24: 'Number of trade lines opened in last 24 months',
  TLCnt: 'Total number of trade lines',
  TLSum: 'Total balance across all trade lines',
  TLMaxSum: 'Maximum balance on a single trade line',
  TLSatCnt: 'Number of satisfactory trade lines',
  TLDel60Cnt: 'Number of trade lines delinquent 60+ days',
  TLBadCnt24: 'Number of bad trade lines in last 24 months',
  TL75UtilCnt: 'Number of trade lines with 75%+ utilization',
  TL50UtilCnt: 'Number of trade lines with 50%+ utilization',
  TLBalHCPct: 'Percent of balance on high credit lines',
  TLSatPct: 'Percent of satisfactory trade lines',
  TLDel3060Cnt24: 'Number of trade lines 30-60 days delinquent (24 mo)',
  TLDel90Cnt24: 'Number of trade lines 90+ days delinquent (24 mo)',
  TLDel60CntAll: 'Number of trade lines 60+ days delinquent (all time)',
  TLOpenPct: 'Percent of open trade lines',
  TLBadDerogCnt: 'Number of bad/derogatory trade lines',
  TLOpen24Pct: 'Percent of trade lines opened in last 24 months',
};

function LandingPage() {
  return (
    <div className="container landing">
      <h1>Credit Scoring App</h1>
      <p>Predict your credit score and get a detailed breakdown.</p>
      <Link to="/form" className="btn primary">Get Started</Link>
    </div>
  );
}

function InputForm() {
  const navigate = useNavigate();
  // Load previous input from localStorage if available
  const getInitialForm = () => {
    const saved = localStorage.getItem('lastCreditInput');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...Object.fromEntries(FEATURES.map(f => [f, ''])), ...parsed };
      } catch {
        return Object.fromEntries(FEATURES.map(f => [f, '']));
      }
    }
    return Object.fromEntries(FEATURES.map(f => [f, '']));
  };
  const [form, setForm] = useState(getInitialForm());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Save input to localStorage
      localStorage.setItem('lastCreditInput', JSON.stringify(form));
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(
          FEATURES.map(f => [f, parseFloat(form[f]) || 0])
        ))
      });
      if (!res.ok) throw new Error('Prediction failed');
      const data = await res.json();
      navigate('/results', { state: { ...data, input: form } });
    } catch (err) {
      setError('Failed to get prediction. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form">
      <h2>Enter Your Credit Information</h2>
      <p className="form-desc">
        Please enter your financial and credit-related details for each field below. Use numbers only. If you are unsure about a field, enter 0 or leave it blank.
      </p>
      <form onSubmit={handleSubmit} className="credit-form">
        <div className="form-grid">
          {FEATURES.map(f => (
            <div key={f} className="form-group">
              <label>{f}</label>
              <div className="feature-desc">{FEATURE_DESCRIPTIONS[f]}</div>
              <input
                type="number"
                name={f}
                value={form[f]}
                onChange={handleChange}
                step="any"
                required
              />
            </div>
          ))}
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Predicting...' : 'Predict'}</button>
      </form>
    </div>
  );
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  // Convert angles to radians
  const start = (Math.PI / 180) * startAngle;
  const end = (Math.PI / 180) * endAngle;
  // Start and end points
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  // Large arc flag
  const largeArc = endAngle - startAngle > 180 ? '1' : '0';
  return [
    'M', x1, y1,
    'A', r, r, 0, largeArc, 1, x2, y2
  ].join(' ');
}

function CreditScoreMeter({ probability, label }) {
  // Map probability (0-1) to a score (300-850 typical credit score range)
  const score = Math.round(300 + probability * 550);
  // Gauge settings
  const min = 300, max = 850;
  const angleStart = -120, angleEnd = 120; // degrees
  const percent = (score - min) / (max - min);
  const angle = angleStart + (angleEnd - angleStart) * percent;
  // Fixed arc segment boundaries for guaranteed visibility
  const redEnd = -12;    // -120° to -12° (40%)
  const yellowEnd = 72;  // -12° to 72° (35%)
  const arcDefs = [
    { color: '#e53935', from: angleStart, to: redEnd }, // Poor
    { color: '#fbc02d', from: redEnd, to: yellowEnd }, // Good
    { color: '#43a047', from: yellowEnd, to: angleEnd } // Excellent
  ];
  // Tick marks and labels
  const total = angleEnd - angleStart;
  const ticks = [
    { value: 300, angle: angleStart },
    { value: 500, angle: angleStart + total * ((500-min)/(max-min)) },
    { value: 650, angle: angleStart + total * ((650-min)/(max-min)) },
    { value: 850, angle: angleEnd }
  ];
  return (
    <div className="score-meter-gauge">
      <svg width="240" height="150" viewBox="0 0 240 150">
        {/* Gauge background arcs */}
        {arcDefs.map((arc, i) => (
          <path
            key={arc.color}
            d={describeArc(120, 120, 90, arc.from, arc.to)}
            fill="none"
            stroke={arc.color}
            strokeWidth="18"
            strokeLinecap="round"
          />
        ))}
        {/* Tick marks and numeric labels */}
        {ticks.map((tick, i) => {
          const rad = (Math.PI / 180) * tick.angle;
          const x1 = 120 + 80 * Math.cos(rad);
          const y1 = 120 + 80 * Math.sin(rad);
          const x2 = 120 + 95 * Math.cos(rad);
          const y2 = 120 + 95 * Math.sin(rad);
          const lx = 120 + 110 * Math.cos(rad);
          const ly = 120 + 110 * Math.sin(rad);
          return (
            <g key={tick.value}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="2" />
              <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="1rem" fill="#444" fontWeight="bold">{tick.value}</text>
            </g>
          );
        })}
        {/* Needle/arrow */}
        <g transform={`rotate(${angle} 120 120)`}>
          <rect x="117" y="50" width="6" height="70" rx="3" fill="#222" />
          <polygon points="120,38 125,58 115,58" fill="#222" />
        </g>
        {/* Center circle */}
        <circle cx="120" cy="120" r="12" fill="#fff" stroke="#888" strokeWidth="3" />
      </svg>
      {/* Score text below the gauge */}
      <div className="gauge-score-value" style={{marginTop: '0.7rem', fontSize: '2rem', fontWeight: 'bold', color: '#222', letterSpacing: '2px', textAlign: 'center'}}>{score}</div>
      <div className="gauge-labels">
        <span style={{ color: '#e53935' }}>Poor</span>
        <span style={{ color: '#fbc02d' }}>Good</span>
        <span style={{ color: '#43a047' }}>Excellent</span>
      </div>
      <div style={{fontSize: '0.95rem', color: '#888', marginTop: '0.2rem', textAlign: 'center'}}>
        <span>Gauge shows your predicted credit score range</span>
      </div>
    </div>
  );
}

function ResultsDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  if (!state) {
    navigate('/form');
    return null;
  }
  const { predicted_class, probability, credit_score_label, input } = state;
  return (
    <div className="container results">
      <h2>Prediction Results</h2>
      <CreditScoreMeter probability={probability} label={credit_score_label} />
      <div className="result-summary">
        <div className={`score-label ${credit_score_label.toLowerCase()}`}>{credit_score_label}</div>
        <div className="score-prob">Probability: {(probability * 100).toFixed(2)}%</div>
        <div className="score-class">Predicted Class: {predicted_class}</div>
      </div>
      <button className="btn secondary" onClick={() => navigate('/breakdown', { state })}>View Score Breakdown</button>
      <button className="btn" onClick={() => navigate('/form')}>Try Again</button>
    </div>
  );
}

function ScoreBreakdown() {
  const location = useLocation();
  const { state } = location;
  if (!state) return <div className="container">No data to show.</div>;
  const { input, probability, credit_score_label } = state;
  return (
    <div className="container breakdown">
      <h2>Score Breakdown</h2>
      <div className="breakdown-summary">
        <div className="score-label {credit_score_label.toLowerCase()}">{credit_score_label}</div>
        <div className="score-prob">Probability: {(probability * 100).toFixed(2)}%</div>
      </div>
      <h3>Input Features</h3>
      <div className="breakdown-grid">
        {Object.entries(input).map(([k, v]) => (
          <div key={k} className="breakdown-item">
            <span className="feature-name">{k}</span>
            <span className="feature-value">{v}</span>
          </div>
        ))}
      </div>
      <Link to="/form" className="btn">Back to Form</Link>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-logo">CreditScoring</Link>
        <div className="nav-links">
          <Link to="/form">Input Form</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<InputForm />} />
        <Route path="/results" element={<ResultsDashboard />} />
        <Route path="/breakdown" element={<ScoreBreakdown />} />
      </Routes>
    </>
  );
}

export default App;
