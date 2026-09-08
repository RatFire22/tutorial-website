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
      a.category.toLowerCase().includes('system') ||
      a.category.toLowerCase().includes('typescript') ||
      a.category.toLowerCase().includes('cloud') ||
      a.category.toLowerCase().includes('rust') ||
      a.tags.some((t) => ['systems', 'concurrency', 'edge functions', 'cloud', 'serverless'].includes(t.toLowerCase()))
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
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          Practical blueprints for low-latency APIs, resilient distributed microservices, caching topologies, and global edge deployments.
        </p>
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
