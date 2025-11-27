'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { analyzeText, analyzeUrl, analyzeImage } from './actions';

const INTRO = "Transform your beauty routine with cutting-edge AI technology. Instantly analyze cosmetic ingredients for safety risks through intelligent text parsing, advanced image recognition, and comprehensive URL scanning. Discover hidden dangers and make informed choices for healthier skin.";

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleClear = () => {
    setTextInput('');
    setUrlInput('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!textInput.trim() && !urlInput.trim() && !file) {
      alert('Please provide text, a URL, or an image to analyze.');
      return;
    }
    setLoading(true);
    try {
      let data;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        data = await analyzeImage(formData);
      } else if (textInput.trim()) {
        data = await analyzeText(textInput.trim());
      } else if (urlInput.trim()) {
        data = await analyzeUrl(urlInput.trim());
      }
      if (data?.error) {
        alert(data.error);
        return;
      }
      if (!data) {
        alert('No result returned');
        return;
      }
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(data))}`);
      handleClear();
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing input');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Discover Safe Beauty</h1>
         
            <p>{INTRO}</p>
          </div>
          <div className="hero-right">
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">AI-Powered</div>
                <div className="stat-label">Analysis</div>
              </div>
              <div className="stat">
                <div className="stat-number">Instant</div>
                <div className="stat-label">Results</div>
              </div>
              <div className="stat">
                <div className="stat-number">Safe</div>
                <div className="stat-label">Beauty</div>
              </div>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <span className="hero-icon">📝</span>
                <span>Text Analysis</span>
              </div>
              <div className="hero-feature">
                <span className="hero-icon">🖼️</span>
                <span>Image Recognition</span>
              </div>
              <div className="hero-feature">
                <span className="hero-icon">🔗</span>
                <span>URL Scanning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Ready Banner */}
      <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', padding: '1rem 2rem', maxWidth: '800px', margin: '1rem auto', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.18)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>🔍 Unlock the secrets behind every Ingredients</h3>
          {/* <p style={{ fontSize: '1rem', margin: '0', opacity: '0.8' }}>Enter your ingredients below to get safety insights</p> */}
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/highrisk" style={{ color: '#d32f2f', textDecoration: 'underline', fontWeight: '500', fontSize: '1rem' }}>
              ⚠️ High Risk Ingredients
            </Link>
            <Link href="/goodingredients" style={{ color: '#2e7d32', textDecoration: 'underline', fontWeight: '500', fontSize: '1rem' }}>
              🌿 Beneficial Ingredients
            </Link>
          </div>
        </div>
      </div>

      {/* Unified Inputs Below */}
      <div className="main-content" style={{
        gridTemplateColumns: '1fr',
        maxWidth: '800px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(248,249,250,0.1) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
      }}>
        <div className="input-section">
          <div className="feature-card analyzer-card">
            <div className="card-icon" style={{ fontSize: '4rem' }}>🚀</div>
            <h3>Start Your Analysis</h3>
            <p>Enter ingredients, upload an image, or provide a URL</p>

            {/* Text Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>📝 Paste Ingredients Below</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste your ingredient list here..."
                style={{ minHeight: '80px' }}
              />
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>🖼️ Upload Ingredients Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input"
                ref={fileInputRef}
              />
              {file && <p style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>Selected: {file.name}</p>}
            </div>

            {/* URL Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>🔗 Paste Product URL</label>
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter product page URL..."
                style={{ minHeight: '80px' }}
              />
            </div>

            <div className="button-group" style={{ justifyContent: 'center', gap: '1rem' }}>
              <button className="clear-btn" onClick={handleClear} disabled={loading}>Clear All</button>
              <button onClick={handleAnalyze} disabled={loading}>
                {loading ? 'Analyzing and holding on...' : '🚀 Start Analyze'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Yan Peng. All rights reserved.</p>
      </footer>
    </div>
  );
}
