'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const supabase = createClient();

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Error: ' + err.error);
        return;
      }

      const data = await res.json();
      setResults(data.results);
    } catch (e) {
      alert('Failed to evaluate');
    }
    setLoading(false);
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">CodeVault AI</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-900 border border-cyan-500/30 rounded p-2 text-white"
          >
            <option>Python</option>
            <option>JavaScript</option>
            <option>TypeScript</option>
            <option>Go</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full bg-gray-900 border border-cyan-500/30 rounded p-2 font-mono text-sm text-white"
            placeholder="Paste your code here..."
          />
        </div>

        <button
          onClick={handleEvaluate}
          disabled={loading || !code}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 px-6 rounded disabled:opacity-50"
        >
          {loading ? 'Evaluating...' : 'Evaluate with AI'}
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {results.map((r, i) => (
            <div key={i} className="bg-gray-900 border border-cyan-500/30 rounded p-4">
              <h3 className="text-lg font-semibold text-cyan-300">
                {r.model ? r.model.split('/').pop() : 'Model'}
              </h3>
              {r.error && <p className="text-red-400 text-sm">⚠️ {r.error}</p>}
              <div className="text-sm space-y-1 mt-2">
                <p>Correctness: <span className="text-cyan-400">{r.correctness}/100</span></p>
                <p>Performance: <span className="text-cyan-400">{r.performance}/100</span></p>
                <p>Edge Cases: <span className="text-cyan-400">{r.edgeCases}/100</span></p>
              </div>
              <p className="text-gray-300 mt-2 text-xs">{r.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
