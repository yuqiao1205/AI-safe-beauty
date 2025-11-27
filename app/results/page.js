'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function renderResult(result) {
  if (!result) return null;

  if (result.message) {
    return (
      <div className="result">
        <h2>Analysis Result</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>{result.message}</p>
      </div>
    );
  }

  return (
    <div className="result">
      <h2>Analysis Result</h2>
      <h3>Overall Score: {result.overall_score}</h3>

      {result.high_risk?.length > 0 && (
        <div className="risk-section high-risk">
          <details open>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🔴 High Risk ({result.high_risk.length} items)
            </summary>
            {result.high_risk.map((item, index) => (
              <div key={`high-${index}`}>
                <strong>{item.name}</strong>
                <p>{item.summary}</p>
              </div>
            ))}
          </details>
        </div>
      )}

      {result.medium_risk?.length > 0 && (
        <div className="risk-section medium-risk">
          <details open>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🟡 Medium Risk ({result.medium_risk.length} items)
            </summary>
            {result.medium_risk.map((item, index) => (
              <div key={`medium-${index}`}>
                <strong>{item.name}</strong>
                <p>{item.summary}</p>
              </div>
            ))}
          </details>
        </div>
      )}

      {result.low_risk?.length > 0 && (
        <div className="risk-section low-risk">
          <details open>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              🟢 Low Risk ({result.low_risk.length} items)
            </summary>
            {result.low_risk.map((item, index) => (
              <div key={`low-${index}-${typeof item === 'string' ? item : item.name}`}>
                <strong>{typeof item === 'string' ? item : item.name}</strong>
                {typeof item !== 'string' && <p>{item.summary}</p>}
              </div>
            ))}
          </details>
        </div>
      )}

      <div className="explanation">
        <h4>Overall Explanation</h4>
        <p>{result.explanation}</p>
      </div>
    </div>
  );
}

export default function Results() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');

  let result = null;
  if (dataParam) {
    try {
      result = JSON.parse(decodeURIComponent(dataParam));
    } catch (error) {
      console.error('Error parsing result data:', error);
    }
  }

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <Link href="/" className="back-button">
              ← Back to Ingredients Checker
            </Link>
            <h1>Ingredients Analysis Results</h1>
            <p>Your detailed safety assessment</p>
          </div>
          <div className="hero-right">
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">Detailed</div>
                <div className="stat-label">Breakdown</div>
              </div>
              <div className="stat">
                <div className="stat-number">Risk</div>
                <div className="stat-label">Assessment</div>
              </div>
              <div className="stat">
                <div className="stat-number">Safe</div>
                <div className="stat-label">Choices</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="result-section">
          {result ? (
            renderResult(result)
          ) : (
            <div className="result-placeholder" style={{ textAlign: 'center' }}>
              <div className="placeholder-content">
                <div className="placeholder-icon">📊</div>
                <h3>No Results Found</h3>
                <p>Please perform an analysis on the homepage first.</p>
                <Link href="/" className="back-button" style={{ display: 'inline-block', marginTop: '1rem' }}>
                  Go to Analyzer
                </Link>
              </div>
            </div>
          )}
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
