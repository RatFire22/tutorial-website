import { Cpu, Layers, GitBranch, Box, CheckCircle2 } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import LLDProblemDirectory from '@/components/LLDProblemDirectory';
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
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
          Practical mastery of class modeling, SOLID principles, creational/structural/behavioral design patterns, and thread-safe data structures.
        </p>

        {/* Kangchenjunga Summit Expedition Banner */}
        <Link
          href="/system-design/lld/expedition"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.1rem 1.75rem',
            maxWidth: '780px',
            width: '100%',
            background: 'linear-gradient(135deg, rgba(7, 10, 16, 0.95) 0%, rgba(26, 21, 60, 0.9) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            textAlign: 'left',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="card-interactive-hover"
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#818CF8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              <span>🏔️</span> SIKKIM EXPEDITION · 8,586M
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F4EFE6' }}>
              Kangchenjunga: Twenty pitches. The Five Treasures at 8,586M.
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              The craftsmanship route to pure code: 5 camps, SOLID invariants, design patterns, and thread-safe concurrency.
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#6366F1', color: '#ffffff', padding: '0.55rem 1.1rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.825rem', flexShrink: 0 }}>
            <span>Climb Kangchenjunga</span>
            <Layers size={14} />
          </div>
        </Link>
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

      {/* Interactive 12 Classic LLD Problem Directory & Specs */}
      <LLDProblemDirectory />
    </div>
  );
}
