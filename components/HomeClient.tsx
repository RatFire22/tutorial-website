'use client';

import { useState } from 'react';
import ArticleCard from './ArticleCard';
import { ArticleMeta } from '@/lib/articles';
import { Sparkles, Mail } from 'lucide-react';

export default function HomeClient({ articles }: { articles: ArticleMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const categories = ['All', 'Next.js', 'TypeScript', 'Cloud', 'CSS', 'Rust'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase() || a.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase()));

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
            <span>Modern Developer Tutorials & Architecture</span>
          </div>

          <h1 className="hero-title">
            Crafting clean code &amp; <span className="hero-title-highlight">deep technical guides</span>
          </h1>

          <p className="hero-subtitle">
            Exploring modern web development, cloud architectures, and system design. High-signal tutorials written for engineers.
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
        <div className="cards-grid">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Newsletter CTA Section */}
        <section className="newsletter-card">
          <h2 className="newsletter-title">Stay Ahead of Modern Web Architecture</h2>
          <p className="newsletter-subtitle">
            Get practical engineering articles, zero-fluff breakdowns, and technical case studies delivered directly to your inbox.
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
