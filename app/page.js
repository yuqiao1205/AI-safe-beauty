'use client'

import { useState, useRef } from 'react';
import { analyzeText, analyzeUrl, analyzeImage } from './actions';

const INTRO = "Transform your beauty routine with cutting-edge AI technology. Instantly analyze cosmetic ingredients for safety risks through intelligent text parsing, advanced image recognition, and comprehensive URL scanning. Discover hidden dangers and make informed choices for healthier skin.";

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleTextAnalysis = async () => {
    if (!textInput.trim()) {
      alert('Please enter text to analyze');
      return;
    }
    setLoading(true);
    try {
      const data = await analyzeText(textInput);
      setResult(data);
      setTextInput('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing text');
    }
    setLoading(false);
  };

  const handleUrlAnalysis = async () => {
    if (!urlInput.trim()) {
      alert('Please enter a URL');
      return;
    }
    setLoading(true);
    try {
      const data = await analyzeUrl(urlInput);
      setResult(data);
      setUrlInput('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing URL');
    }
    setLoading(false);
  };

  const handleImageAnalysis = async () => {
    if (!file) {
      alert('Please select an image');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const data = await analyzeImage(formData);
      setResult(data);
      setFile(null);
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing image');
    }
    setLoading(false);
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="result">
        <h2>Analysis Result</h2>
        <h3>Overall Score: {result.overall_score}</h3>

        {result.high_risk?.length > 0 && (
          <div className="risk-section high-risk">
            <h4>🔴 High Risk</h4>
            {result.high_risk.map((item, index) => (
              <div key={`high-${index}`}>
                <strong>{item.name}</strong>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {result.medium_risk?.length > 0 && (
          <div className="risk-section medium-risk">
            <h4>🟡 Medium Risk</h4>
            {result.medium_risk.map((item, index) => (
              <div key={`medium-${index}`}>
                <strong>{item.name}</strong>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {result.low_risk?.length > 0 && (
          <div className="risk-section low-risk">
            <h4>🟢 Low Risk</h4>
            {result.low_risk.map((item, index) => (
              <div key={`low-${index}-${typeof item === 'string' ? item : item.name}`}>
                <strong>{typeof item === 'string' ? item : item.name}</strong>
                {typeof item !== 'string' && <p>{item.summary}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="explanation">
          <h4>Overall Explanation</h4>
          <p>{result.explanation}</p>
        </div>
      </div>
    );
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

      <div className="main-content">
        <div className="input-section">
          <div className="features">
            <div className="feature-card">
              <div className="card-icon">📝</div>
              <h3>Analyze Text</h3>
              <p>Paste your ingredient list for instant safety analysis</p>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter ingredient list..."
              />
              <div className="button-group">
                <button className="clear-btn" onClick={() => setTextInput('')}>Clear</button>
                <button onClick={handleTextAnalysis} disabled={loading}>
                  {loading ? 'Analyzing...' : 'Analyze Text'}
                </button>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-icon">🖼️</div>
              <h3>Analyze Image</h3>
              <p>Upload product images to extract and analyze ingredients</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input"
                ref={fileInputRef}
              />
              {file && <p>Selected: {file.name}</p>}
              <div className="button-group">
                <button className="clear-btn" onClick={() => { setFile(null); fileInputRef.current.value = ''; }}>Clear</button>
                <button onClick={handleImageAnalysis} disabled={loading}>
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-icon">🔗</div>
              <h3>Analyze URL</h3>
              <p>Provide a product page URL for comprehensive analysis</p>
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter product page URL..."
              />
              <div className="button-group">
                <button className="clear-btn" onClick={() => setUrlInput('')}>Clear</button>
                <button onClick={handleUrlAnalysis} disabled={loading}>
                  {loading ? 'Analyzing...' : 'Analyze URL'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="result-section">
          {result ? renderResult() : (
            <div className="result-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📊</div>
                <h3>Analysis Results</h3>
                <p>Result will be shown here</p>
                <p className="placeholder-hint">Choose an analysis method on the left to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Yan Peng. All rights reserved.</p>
      </footer>
    </div>
  );
}