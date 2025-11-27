'use client'

import Link from 'next/link';
import highRiskIngredients from '../highRiskData';

export default function HighRisk() {
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <Link href="/" className="back-button" style={{ position: 'absolute', top: '1rem', left: '2rem' }}>
              ← Back to Home
            </Link>
            <h1>High Risk Ingredients Collection</h1>
            <p>Comprehensive list of ingredients with known safety concerns</p>
          </div>
        </div>
      </div>

      <div className="main-content" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="result-section">
          <div className="result">
            <h2>⚠️ High Risk Cosmetic Ingredients</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              This collection lists ingredients that have been identified with potential safety concerns based on scientific research and regulatory assessments.
              Always consult with healthcare professionals for personal advice.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {highRiskIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: 'var(--glass-shadow)'
                  }}
                >
                  <details>
                    <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#d32f2f', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      {ingredient.name} ({ingredient.risks.length} risks)
                    </summary>
                    <p style={{ color: 'var(--primary-color)', fontWeight: '500', margin: '0 0 1rem 0' }}>
                      Type: {ingredient.type}
                    </p>
                    <div>
                      <h4 style={{ color: '#666', margin: '0 0 0.5rem 0' }}>Known Risks:</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {ingredient.risks.map((risk, riskIndex) => (
                          <li key={riskIndex} style={{ marginBottom: '0.25rem', color: '#555' }}>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ↑ Back to Top
        </button>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Yan Peng. All rights reserved.</p>
      </footer>
    </div>
  );
}