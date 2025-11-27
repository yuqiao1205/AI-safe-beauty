'use client'

import Link from 'next/link';
import ingredientsData from '../goodIngredientsData';

export default function GoodIngredients() {
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <Link href="/" className="back-button" style={{ display: 'block', marginBottom: '2rem', fontSize: '1.1rem' }}>
              ← Back to Home
            </Link>
            <h1>Beneficial Ingredients Collection</h1>
            <p>Discover effective and safe skincare ingredients</p>
          </div>
        </div>
      </div>

      <div className="main-content" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="result-section">
          <div className="result">
            <h2>🌿 Beneficial Skincare Ingredients</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              This collection highlights proven, beneficial ingredients commonly used in skincare.
              Always patch test and consult professionals for your specific skin needs.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {ingredientsData.map((ingredient, index) => (
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
                    <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#2e7d32', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      {ingredient.name} ({ingredient.benefits.length} benefits)
                    </summary>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                      {ingredient.chinese} • {ingredient.type}
                    </p>
                    <div>
                      <h4 style={{ color: '#2e7d32', margin: '0 0 0.5rem 0' }}>Benefits:</h4>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {ingredient.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} style={{ marginBottom: '0.25rem', color: '#555' }}>
                            {benefit}
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