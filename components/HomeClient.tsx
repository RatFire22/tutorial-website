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
        {/* Featured 8,000M Summits Trilogy Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                <Mountain size={14} />
                <span>The 8,000M Engineering Summits of 2AMCoding</span>
              </div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Three Summits. Zero Fluff. Pure Technical Mastery.
              </h2>
            </div>
            <Link
              href="/expedition"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--primary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span>Explore All Summits</span>
              <Mountain size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {/* Summit 1: Everest (8,848M) */}
            <Link
              href="/expedition?summit=everest"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'radial-gradient(ellipse at 90% 10%, rgba(56, 189, 248, 0.12) 0%, rgba(7, 10, 16, 0.95) 75%), #070A10',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
                textDecoration: 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="card-interactive-hover"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(245, 158, 11, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    SUMMIT #1 · 8,848M
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 600 }}>6 Camps · 30 Pitches</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4EFE6', margin: '0 0 0.4rem 0' }}>
                  Mount Everest: Autonomous AI
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.55 }}>
                  The definitive rock-face route from CLI model wrappers to autonomous LangGraph loops, MCP tool swarms, and multi-agent platforms.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>Chomolungma Route</span>
                <span style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>Ascent Route →</span>
                </span>
              </div>
            </Link>

            {/* Summit 2: K2 (8,611M) */}
            <Link
              href="/system-design/hld/expedition"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'radial-gradient(ellipse at 90% 10%, rgba(2, 132, 199, 0.15) 0%, rgba(7, 10, 16, 0.95) 75%), #070A10',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(2, 132, 199, 0.35)',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
                textDecoration: 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="card-interactive-hover"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(56, 189, 248, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                    SUMMIT #2 · 8,611M
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>6 Camps · 24 Pitches</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4EFE6', margin: '0 0 0.4rem 0' }}>
                  K2: High-Level Design (HLD)
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.55 }}>
                  Scale the Savage Mountain of distributed systems: Raft consensus, database sharding, Kafka streams, and multi-region 10M+ QPS topologies.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>Abruzzi Spur Route</span>
                <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>Ascent Route →</span>
                </span>
              </div>
            </Link>

            {/* Summit 3: Kangchenjunga (8,586M) */}
            <Link
              href="/system-design/lld/expedition"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                background: 'radial-gradient(ellipse at 90% 10%, rgba(99, 102, 241, 0.15) 0%, rgba(7, 10, 16, 0.95) 75%), #070A10',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
                textDecoration: 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="card-interactive-hover"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#a5b4fc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(99, 102, 241, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    SUMMIT #3 · 8,586M
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#818CF8', fontWeight: 600 }}>5 Camps · 20 Pitches</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F4EFE6', margin: '0 0 0.4rem 0' }}>
                  Kangchenjunga: Low-Level (LLD)
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0, lineHeight: 1.55 }}>
                  The Five Treasures of code craftsmanship: SOLID principles, structural &amp; behavioral design patterns, memory barriers, and thread safety.
                </p>
              </div>
              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>Southwest Face Route</span>
                <span style={{ fontSize: '0.8rem', color: '#818CF8', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>Ascent Route →</span>
                </span>
              </div>
            </Link>
          </div>
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
