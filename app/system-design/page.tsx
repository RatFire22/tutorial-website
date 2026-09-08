import { Cpu, Database, Network, ShieldCheck, Zap } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Design & Distributed Architecture — 2AMCoding',
  description: 'Deep dives into distributed systems, low-latency microservices, caching hierarchies, and cloud-native architecture.',
};

export default function SystemDesignPage() {
  const articles = getAllArticles();
  const systemArticles = articles.filter(
    (a) =>
      ['HLD', 'LLD'].includes(a.category.toUpperCase()) ||
      a.tags.some((t) => ['hld', 'lld', 'distributed systems', 'system design', 'scalability', 'concurrency'].includes(t.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>

      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem' }}>
          <Cpu size={14} />
          <span>High-Scale Engineering Architecture</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          System Design &amp; Scalability
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
          Practical blueprints for low-latency APIs, resilient distributed microservices, caching topologies, and global edge deployments.
        </p>

        {/* Quick Hub Navigation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '800px', margin: '0 auto 2.5rem auto', textAlign: 'left' }}>
          <a
            href="/system-design/lld"
            style={{
              display: 'block',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="card-interactive-hover"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                LOW-LEVEL DESIGN
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>12 Problems</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              LLD Master Problem Directory →
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Explore Parking Lot, Concurrency Scheduler, Elevator, BookMyShow, In-Memory File System, and Design Patterns.
            </p>
          </a>

          <a
            href="/system-design/hld"
            style={{
              display: 'block',
              padding: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="card-interactive-hover"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', background: 'rgba(56, 189, 248, 0.12)', padding: '2px 8px', borderRadius: '4px' }}>
                HIGH-LEVEL DESIGN
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>32 Systems</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
              HLD Master Architecture Directory →
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Explore Rate Limiter, Distributed Cache, Uber Geo-dispatch, Dropbox Sync, Kafka Streaming, and Multi-Region Scale.
            </p>
          </a>
        </div>
      </header>

      {/* Core Architectural Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Zap size={18} color="var(--primary)" /> Latency &amp; Edge
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            V8 isolate execution, geo-routing, CDN cache warming, and eliminating cold-starts.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Database size={18} color="#0284c7" /> Storage &amp; Caching
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Read replicas, Redis distributed locks, stale-while-revalidate, and event sourcing.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Network size={18} color="#ea580c" /> Concurrency &amp; Messaging
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Thread models, async runtimes, event queues, and backpressure mitigation.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="#16a34a" /> Fault Tolerance
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Circuit breakers, retry exponential backoff, rate limiters, and graceful degradation.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Architecture Guides &amp; Deep Dives
      </h2>

      <div className="cards-grid">
        {systemArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
