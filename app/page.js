'use client';

import { useState } from 'react';
import BrandForm from './components/BrandForm';
import LoadingState from './components/LoadingState';
import ResultsDisplay from './components/ResultsDisplay';

export default function Home() {
  const [status, setStatus] = useState('idle'); // idle, loading, results, error
  const [results, setResults] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setStatus('loading');
    setBrandName(formData.brandName);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResults(data);
      setStatus('results');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred during analysis');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setResults(null);
    setBrandName('');
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#111827] to-[#0A0F1F] py-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        {/* Idle state - Show form */}
        {status === 'idle' && (
          <BrandForm onSubmit={handleSubmit} isLoading={false} />
        )}

        {/* Loading state */}
        {status === 'loading' && (
          <LoadingState />
        )}

        {/* Results state */}
        {status === 'results' && results && (
          <ResultsDisplay
            results={results}
            brandName={brandName}
            onReset={handleReset}
          />
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-sm">
        <p>Powered by Gemini AI • Analyzing brand visibility across ChatGPT, Gemini, and Perplexity</p>
      </footer>
    </div>
  );
}
