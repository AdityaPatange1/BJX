'use client';

import { useState } from 'react';
import { Dna, Send, Loader2, Sparkles, Shield, Copyright } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <Dna className="w-10 h-10 text-blue-400" />
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold glow-text tracking-tight">
              BJX
            </h1>
            <p className="text-sm text-blue-300 tracking-widest">
              BLUE JAIL XENOME
            </p>
          </div>
          <Dna className="w-10 h-10 text-blue-400" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Tagline */}
          <div className="text-center mb-8">
            <p className="text-blue-200 italic text-sm md:text-base flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              In the name of Bunny Rapper, The Triads are powering the BJX System.
              <Sparkles className="w-4 h-4" />
            </p>
          </div>

          {/* Input Section */}
          <div className="glass-card rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="input" className="block text-lg font-semibold text-blue-200 mb-2">
                Enter your query (Plain English)
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Animals that can regenerate limbs, or creatures with bioluminescence..."
                className="w-full h-32 p-4 rounded-xl bg-black/50 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-primary w-full py-3 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Genetic Systems...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Analyze Genetic System
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className="glass-card rounded-2xl p-6 border-red-500/50">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-blue-200 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Genetic Analysis Result
              </h2>
              <div className="bg-black/40 rounded-xl p-4 whitespace-pre-wrap text-gray-100 font-mono text-sm leading-relaxed">
                {result}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-white/10 bg-black/50">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <p className="text-blue-300 font-semibold">
            Aditya Patange Productions
          </p>
          <p className="text-gray-400 text-sm">
            Powered by EB WiFi
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <Copyright className="w-3 h-3" />
            <span>{new Date().getFullYear()} All Rights Reserved</span>
            <span className="mx-2">|</span>
            <span>Trademark</span>
            <span className="mx-2">|</span>
            <span>Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
