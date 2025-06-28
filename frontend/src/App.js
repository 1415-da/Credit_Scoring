import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, animate } from "framer-motion";
import './App.css';

// Organized features by category for better form layout
const FEATURE_CATEGORIES = {
  'Credit History & Inquiries': [
    'InqCnt06',
    'InqTimeLast', 
    'InqFinanceCnt24',
    'TLTimeFirst',
    'TLTimeLast'
  ],
  'Account Activity': [
    'TLCnt03',
    'TLCnt12', 
    'TLCnt24',
    'TLCnt',
    'TLOpenPct',
    'TLOpen24Pct'
  ],
  'Account Balances': [
    'TLSum',
    'TLMaxSum',
    'TLBalHCPct'
  ],
  'Account Status': [
    'TLSatCnt',
    'TLSatPct',
    'TLDel60Cnt',
    'TLDel60CntAll',
    'TLDel3060Cnt24',
    'TLDel90Cnt24'
  ],
  'Credit Utilization': [
    'TL75UtilCnt',
    'TL50UtilCnt'
  ],
  'Negative Indicators': [
    'DerogCnt',
    'CollectCnt',
    'BanruptcyInd',
    'TLBadCnt24',
    'TLBadDerogCnt'
  ]
};

// Flattened array for backward compatibility
const FEATURES = Object.values(FEATURE_CATEGORIES).flat();

// Professional banking descriptions for each feature
const FEATURE_DESCRIPTIONS = {
  DerogCnt: 'Number of major derogatory reports on your credit file',
  CollectCnt: 'Number of accounts currently in collection',
  BanruptcyInd: 'Bankruptcy indicator (1 = Yes, 0 = No)',
  InqCnt06: 'Number of credit inquiries in the last 6 months',
  InqTimeLast: 'Months since your last credit inquiry',
  InqFinanceCnt24: 'Number of finance-related inquiries in last 24 months',
  TLTimeFirst: 'Months since your first credit account was opened',
  TLTimeLast: 'Months since your most recent credit account was opened',
  TLCnt03: 'Number of new credit accounts opened in last 3 months',
  TLCnt12: 'Number of new credit accounts opened in last 12 months',
  TLCnt24: 'Number of new credit accounts opened in last 24 months',
  TLCnt: 'Total number of credit accounts on your file',
  TLSum: 'Total outstanding balance across all credit accounts',
  TLMaxSum: 'Highest balance on any single credit account',
  TLSatCnt: 'Number of accounts in good standing',
  TLDel60Cnt: 'Number of accounts 60+ days past due',
  TLBadCnt24: 'Number of accounts with negative status in last 24 months',
  TL75UtilCnt: 'Number of accounts with 75%+ credit utilization',
  TL50UtilCnt: 'Number of accounts with 50%+ credit utilization',
  TLBalHCPct: 'Percentage of balance relative to high credit limits',
  TLSatPct: 'Percentage of accounts in good standing',
  TLDel3060Cnt24: 'Number of accounts 30-60 days past due (24 months)',
  TLDel90Cnt24: 'Number of accounts 90+ days past due (24 months)',
  TLDel60CntAll: 'Total number of accounts 60+ days past due (all time)',
  TLOpenPct: 'Percentage of accounts currently open',
  TLBadDerogCnt: 'Number of accounts with derogatory status',
  TLOpen24Pct: 'Percentage of accounts opened in last 24 months',
};

function LandingPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || !consent) return;
    
    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      navigate('/form');
    }, 1000);
  };

  return (
    <div className="landing-page">
      {/* Header Section */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🏦</div>
            <h1>Secure Bank</h1>
          </div>
          <nav className="header-nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <Link to="/form" className="nav-cta">Credit Assessment</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Check Your <strong>FREE</strong> Credit Score</h2>
            <p className="hero-subtitle">
              Get detailed credit report insights, free monthly updates, and personalized loan & credit card offers
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Detailed Credit Report Insights</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔄</span>
                <span>Free Monthly Updates</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💳</span>
                <span>Personalized Loan & Credit Card Offers</span>
              </div>
            </div>
          </div>
          
          <div className="credit-score-form">
            <div className="form-header">
              <h3>Let's Get Started</h3>
              <p>Enter your details to check your credit score</p>
            </div>
            
            <form onSubmit={handleSubmit} className="score-check-form">
              <div className="form-group">
                <label>Mobile Number</label>
                <div className="phone-input">
                  <span className="country-code">🇮🇳 +91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>
              </div>
              
              <div className="consent-section">
                <label className="consent-checkbox">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                  />
                  <span className="checkmark"></span>
                  I hereby appoint <strong>Secure Bank</strong> as my authorised representative to receive my credit information from CIBIL/Equifax/Experian/CRIF Highmark (bureau).
                </label>
                
                <label className="consent-checkbox">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                  />
                  <span className="checkmark"></span>
                  I hereby unconditionally consent to and instruct bureau to provide my credit information to me and <strong>Secure Bank</strong> on a month to month basis.
                </label>
              </div>
              
              <button 
                type="submit" 
                className="check-score-btn"
                disabled={!phoneNumber || !consent || loading}
              >
                {loading ? 'Processing...' : 'Check Free Credit Score'}
              </button>
            </form>
            
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="badge-icon">🔒</span>
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">🛡️</span>
                <span>FDIC Insured</span>
              </div>
              <div className="trust-badge">
                <span className="badge-icon">⚡</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Credit Score Section */}
      <section className="about-section" id="about">
        <div className="about-content">
          <h2>CIBIL Score Calculation</h2>
          <p className="about-description">
            CIBIL score calculation depends on your past credit history and it determines your creditworthiness. 
            The four major credit bureaus or Credit Information Companies (CICs) of India calculate, generate, 
            and issue the credit scores of individuals by using their unique statistical algorithms.
          </p>
          
          <div className="factors-grid">
            <div className="factor-card">
              <div className="factor-icon">📈</div>
              <h3>Credit Repayment History</h3>
              <p>Your credit score is calculated based on your credit history. Financial institutions share consumer credit information with credit bureaus twice every month.</p>
            </div>
            
            <div className="factor-card">
              <div className="factor-icon">💳</div>
              <h3>Credit Utilisation Ratio</h3>
              <p>The amount you spend on your credit card to the total available credit limit is considered as the Credit Utilisation Ratio.</p>
            </div>
            
            <div className="factor-card">
              <div className="factor-icon">🏦</div>
              <h3>Credit Mix</h3>
              <p>Your CIBIL score depends on the composition of your loan portfolio which may consist of both secured and unsecured credit.</p>
            </div>
            
            <div className="factor-card">
              <div className="factor-icon">🔍</div>
              <h3>Recent Credit Enquiries</h3>
              <p>Any credit enquiry done by a lender on your behalf is considered a hard enquiry. Multiple enquiries in short span shows your hunger for credit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Score Section */}
      <section className="ideal-score-section">
        <div className="ideal-score-content">
          <h2>An Ideal CIBIL Score</h2>
          <p>An ideal CIBIL Score for loans or credit is generally any score between 750 and 900. A good CIBIL score ensures a higher chance of your loan application getting approved.</p>
          
          <div className="score-ranges">
            <div className="score-range excellent">
              <div className="range-label">Excellent</div>
              <div className="range-score">750-900</div>
              <div className="range-desc">High approval chances</div>
            </div>
            <div className="score-range good">
              <div className="range-label">Good</div>
              <div className="range-score">650-749</div>
              <div className="range-desc">Moderate approval chances</div>
            </div>
            <div className="score-range poor">
              <div className="range-label">Poor</div>
              <div className="range-score">300-649</div>
              <div className="range-desc">Low approval chances</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Secure Bank</h4>
            <p>Your trusted financial partner for credit assessment and banking solutions.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/form">Credit Assessment</Link>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📞 1-800-SECURE</p>
            <p>📧 support@securebank.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Secure Bank. All rights reserved.</p>
        </div>
      </footer>
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
      
      // Use environment variable for API URL, fallback to localhost for development
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(
          FEATURES.map(f => [f, parseFloat(form[f]) || 0])
        ))
      });
      
      if (!res.ok) {
        // If backend is not available, show demo data
        if (res.status === 404 || res.status === 0) {
          console.log('Backend not available, showing demo data');
          const demoData = {
            predicted_class: 'Good',
            probability: 0.75,
            credit_score_label: 'Good'
          };
          navigate('/results', { state: { ...demoData, input: form } });
          return;
        }
        throw new Error('Assessment failed');
      }
      
      const data = await res.json();
      navigate('/results', { state: { ...data, input: form } });
    } catch (err) {
      console.error('API Error:', err);
      // Show demo data if backend is not available
      const demoData = {
        predicted_class: 'Good',
        probability: 0.75,
        credit_score_label: 'Good'
      };
      navigate('/results', { state: { ...demoData, input: form } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form">
      <div className="form-header">
        <h2>Credit Assessment Form</h2>
        <p className="form-desc">
          Please provide your financial information for a comprehensive credit assessment. 
          All data is encrypted and secure. Use numbers only - if unsure about a field, enter 0.
        </p>
        <div className="form-progress">
          <div className="progress-step active">
            <span className="step-number">1</span>
            <span className="step-label">Enter Details</span>
          </div>
          <div className="progress-line"></div>
          <div className="progress-step">
            <span className="step-number">2</span>
            <span className="step-label">Get Results</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="credit-form">
        {Object.entries(FEATURE_CATEGORIES).map(([categoryName, categoryFeatures]) => (
          <div key={categoryName} className="form-category">
            <h3 className="category-title">{categoryName}</h3>
            <div className="form-grid">
              {categoryFeatures.map(f => (
                <div key={f} className="form-group">
                  <label className="field-label">{f}</label>
                  <div className="feature-desc">{FEATURE_DESCRIPTIONS[f]}</div>
                  <input
                    type="number"
                    name={f}
                    value={form[f]}
                    onChange={handleChange}
                    step="any"
                    required
                    placeholder="Enter value"
                    className="field-input"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {error && <div className="error">{error}</div>}
        <div className="form-footer">
          <div className="security-notice">
            <span>🔒</span> Your information is protected with bank-level security
          </div>
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Processing Assessment...' : 'Generate Credit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

const GaugeMeter = ({ score }) => {
  const angle = useMotionValue(-90); // Start angle at -90° (left)

  useEffect(() => {
    const mappedAngle = (score / 100) * 180 - 90;
    animate(angle, mappedAngle, {
      type: "spring",
      stiffness: 80,
      damping: 12,
    });
  }, [score, angle]);

  // Calculate a credit score range (300-850) for display
  const creditScore = Math.round(300 + (score / 100) * 550);

  // Coordinates for value labels (manually placed along arc)
  const labels = [
    { value: "300", x: 40, y: 135 },
    { value: "500", x: 95, y: 45 },
    { value: "650", x: 205, y: 45 },
    { value: "850", x: 255, y: 135 },
  ];

  return (
    <div className="score-meter-gauge">
      <svg width="300" height="160" viewBox="0 0 300 160">
        {/* Red segment (0–33) */}
        <path
          d="M 50 130 A 100 100 0 0 1 110 50"
          fill="none"
          stroke="#ff6b6b"
          strokeWidth="20"
        />
        {/* Yellow segment (34–66) */}
        <path
          d="M 110 50 A 100 100 0 0 1 190 50"
          fill="none"
          stroke="#ffd93d"
          strokeWidth="20"
        />
        {/* Green segment (67–100) */}
        <path
          d="M 190 50 A 100 100 0 0 1 250 130"
          fill="none"
          stroke="#6bcf7f"
          strokeWidth="20"
        />

        {/* Value Labels */}
        {labels.map((label, idx) => (
          <text
            key={idx}
            x={label.x}
            y={label.y}
            fill="#e0e0e0"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
          >
            {label.value}
          </text>
        ))}

        {/* Needle */}
        <motion.line
          x1="150"
          y1="130"
          x2="150"
          y2="40"
          stroke="#64b5f6"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            transformBox: "fill-box",
            transformOrigin: "150px 130px",
            rotate: angle,
          }}
        />

        {/* Center Knob */}
        <circle cx="150" cy="130" r="6" fill="#2a2a2a" stroke="#64b5f6" strokeWidth="2" />
      </svg>

      <div className="gauge-score-value">{creditScore}</div>
      <div className="gauge-labels">
        <span style={{ color: '#ff6b6b' }}>High Risk</span>
        <span style={{ color: '#ffd93d' }}>Moderate</span>
        <span style={{ color: '#6bcf7f' }}>Low Risk</span>
      </div>
      <div style={{fontSize: '0.95rem', color: '#b0b0b0', marginTop: '0.2rem', textAlign: 'center'}}>
        <span>Credit Score Range Assessment</span>
      </div>
    </div>
  );
};

function ResultsDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  if (!state) {
    navigate('/form');
    return null;
  }
  const { predicted_class, probability, credit_score_label } = state;
  
  // Map credit score labels to banking terminology
  const getRiskCategory = (label) => {
    switch(label.toLowerCase()) {
      case 'excellent': return 'Low Risk';
      case 'good': return 'Moderate Risk';
      case 'poor': return 'High Risk';
      default: return label;
    }
  };
  
  const riskCategory = getRiskCategory(credit_score_label);
  
  return (
    <div className="container results">
      <div className="results-header">
        <h2>Your Credit Assessment Report</h2>
        <p className="report-subtitle">Generated by Secure Bank's AI Analysis System</p>
      </div>
      <GaugeMeter score={probability * 100} />
      <div className="result-summary">
        <div className={`score-label ${credit_score_label.toLowerCase()}`}>{riskCategory}</div>
        <div className="score-prob">Confidence Level: {(probability * 100).toFixed(1)}%</div>
        <div className="score-class">Risk Category: {predicted_class}</div>
      </div>
      <div className="action-buttons">
        <button className="btn secondary" onClick={() => navigate('/breakdown', { state })}>
           View Detailed Analysis
        </button>
        <button className="btn" onClick={() => navigate('/form')}>
           New Assessment
        </button>
      </div>
      <div className="disclaimer">
        <p>This assessment is for informational purposes only and does not constitute financial advice. 
        For personalized financial guidance, please consult with a Secure Bank representative.</p>
      </div>
    </div>
  );
}

function ScoreBreakdown() {
  const location = useLocation();
  const { state } = location;
  if (!state) return <div className="container">No assessment data available.</div>;
  const { input: formInput, probability, credit_score_label } = state;
  
  // Map credit score labels to banking terminology
  const getRiskCategory = (label) => {
    switch(label.toLowerCase()) {
      case 'excellent': return 'Low Risk';
      case 'good': return 'Moderate Risk';
      case 'poor': return 'High Risk';
      default: return label;
    }
  };
  
  const riskCategory = getRiskCategory(credit_score_label);
  
  return (
    <div className="container breakdown">
      <div className="breakdown-header">
        <h2>Detailed Credit Analysis</h2>
        <p className="breakdown-subtitle">Comprehensive breakdown of your financial profile</p>
      </div>
      <div className="breakdown-summary">
        <div className={`score-label ${credit_score_label.toLowerCase()}`}>{riskCategory}</div>
        <div className="score-prob">Assessment Confidence: {(probability * 100).toFixed(1)}%</div>
      </div>
      <h3>Financial Profile Data</h3>
      <div className="breakdown-grid">
        {Object.entries(formInput).map(([k, v]) => (
          <div key={k} className="breakdown-item">
            <span className="feature-name">{k}</span>
            <span className="feature-value">{v}</span>
          </div>
        ))}
      </div>
      <div className="breakdown-footer">
        <Link to="/form" className="btn">← Back to Assessment</Link>
        <div className="data-notice">
          <span></span> Data provided for analysis purposes only
        </div>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  return (
    <>
      {!isLandingPage && (
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🏦</span>
            Secure Bank
          </Link>
          <div className="nav-links">
            <Link to="/form">Credit Assessment</Link>
            <Link to="/" className="home-link">Home</Link>
          </div>
        </nav>
      )}
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
