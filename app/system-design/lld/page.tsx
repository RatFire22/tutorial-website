import { Cpu, Layers, GitBranch, Box, CheckCircle2 } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LLD (Low-Level Design) — Object-Oriented Design & Design Patterns | 2AMCoding',
  description: 'Master Low-Level Design: Design patterns, clean code architecture, SOLID principles, schema design, and concurrency.',
};

export default function LLDPage() {
  const articles = getAllArticles();
  const lldArticles = articles.filter(
    (a) =>
      a.category.toUpperCase() === 'LLD' ||
      a.tags.some((t) => ['lld', 'oop', 'design patterns', 'concurrency', 'clean code'].includes(t.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
          <Layers size={14} />
          <span>Low-Level Design &amp; Code Craft</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Low-Level Design (LLD)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          Practical mastery of class modeling, SOLID principles, creational/structural/behavioral design patterns, and thread-safe data structures.
        </p>
      </header>

      {/* LLD Concept Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Box size={18} color="var(--primary)" /> SOLID &amp; Clean Code
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Single responsibility, Open/Closed, Liskov substitution, interface segregation, and dependency inversion.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <GitBranch size={18} color="#0284c7" /> Design Patterns
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Factory, Strategy, Observer, Decorator, Adapter, and State machines implemented in production code.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Cpu size={18} color="#ea580c" /> Concurrency Models
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Mutexes, read-write locks, message-passing channels, actors, and lock-free atomic primitives.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={18} color="#16a34a" /> Schema &amp; Entity Modeling
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Domain-driven design (DDD), database relational schemas, and immutable value objects.
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        LLD Tutorials &amp; Implementation Guides
      </h2>

      <div className="cards-grid">
        {lldArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
