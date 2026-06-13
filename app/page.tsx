'use client';

import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      if (res.ok) {
        setResults(data.results);
      } else {
        alert('Error: ' + data.error);
      }
    } catch {
      alert('Failed to evaluate');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#00e5ff' }}>CodeVault AI</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Language </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '0.5rem', background: '#111', color: '#fff', border: '1px solid #00e5ff' }}
        >
          <option>Python</option>
          <option>JavaScript</option>
          <option>TypeScript</option>
        </select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        style={{
          width: '100%',
          padding: '0.5rem',
          background: '#111',
          color: '#fff',
          border: '1px solid #00e5ff',
          fontFamily: 'monospace',
        }}
        placeholder="Paste your code here..."
      />

      <button
        onClick={handleEvaluate}
        disabled={loading || !code}
        style={{
          marginTop: '1rem',
          padding: '0.7rem 1.5rem',
          background: '#00e5ff',
          color: '#000',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Evaluating...' : 'Evaluate with AI'}
      </button>

      {results && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          {results.map((r: any, i: number) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: '#111',
                border: '1px solid #00e5ff',
                padding: '1rem',
              }}
            >
              <h3 style={{ color: '#00e5ff' }}>{r.model?.split('/').pop()}</h3>
              {r.error && <p style={{ color: 'red' }}>⚠️ {r.error}</p>}
              <p>Correctness: {r.correctness}/100</p>
              <p>Performance: {r.performance}/100</p>
              <p>Edge Cases: {r.edgeCases}/100</p>
              <p style={{ fontSize: '0.9rem' }}>{r.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
