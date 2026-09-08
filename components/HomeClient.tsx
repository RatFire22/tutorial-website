'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { ArticleMeta } from '@/lib/articles';
import { Sparkles, Mail, Mountain } from 'lucide-react';

export default function HomeClient({ articles }: { articles: ArticleMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const categories = ['All', 'HLD', 'LLD', 'AI & Agents', 'Distributed Systems', 'Design Patterns'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => {
        const cat = selectedCategory.toLowerCase();
        return (
          a.category.toLowerCase() === cat ||
          a.tags.some(t => t.toLowerCase() === cat || t.toLowerCase().includes(cat) || cat.includes(t.toLowerCase()))
        );
      });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge-pill">
            <Sparkles size={14} />
            <span>High-Level Design • Low-Level Design • AI Engineering</span>
          </div>

          <h1 className="hero-title">
            Mastering System Design &amp; <span className="hero-title-highlight">Autonomous AI Fleets</span>
          </h1>

          <p className="hero-subtitle">
            Authoritative, zero-fluff blueprints on High-Level Design (HLD), Low-Level Design (LLD), object-oriented patterns, and enterprise AI engineering.
          </p>

          {/* Category Filter Pills */}
          <div className="filter-pills-row">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Cards Grid */}
      <div className="container">
        {/* Featured Expedition Roadmap Card */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/expedition"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              background: 'radial-gradient(ellipse at 80% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(7, 10, 16, 0.95) 70%), #070A10',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem 2.25rem',
              color: '#F4EFE6',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              textDecoration: 'none',
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', background: 'rgba(245, 158, 11, 0.12)', padding: '3px 10px', borderRadius: '999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <span>●</span> HIMALAYAN ROUTE STANDARD · 8,848M
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#F4EFE6', margin: '0.2rem 0 0.4rem 0', fontFamily: 'serif' }}>
                Chomolungma: Thirty pitches. One summit at 8,848M.
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0, maxWidth: '650px', lineHeight: 1.5 }}>
                The definitive rock-face route to autonomous agents: 6 camps, 30 engineering pitches, and zero fluff.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '0.65rem 1.25rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.875rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <span>Start Ascent</span>
              <Mountain size={16} />
            </div>
          </Link>
        </div>

        <div className="cards-grid">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Newsletter CTA Section */}
        <section className="newsletter-card">
          <h2 className="newsletter-title">Stay Ahead of Modern System Design &amp; AI</h2>
          <p className="newsletter-subtitle">
            Get practical HLD blueprints, LLD patterns, and autonomous agent breakdowns delivered directly to your inbox. Zero fluff.
          </p>

          {subscribed ? (
            <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
              🎉 Thank you for subscribing! Check your inbox for the welcome issue.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                required
                className="newsletter-input"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={16} />
                <span>Subscribe</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
