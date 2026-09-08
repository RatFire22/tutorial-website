import { Network, Database, Zap, ShieldAlert, Server } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HLD (High-Level Design) — Distributed Systems & Cloud Architecture | 2AMCoding',
  description: 'Master High-Level Design: Microservices, load balancing, sharding, caching topologies, message queues, and global cloud scale.',
};

export default function HLDPage() {
  const articles = getAllArticles();
  const hldArticles = articles.filter(
    (a) =>
      a.category.toLowerCase().includes('cloud') ||
      a.category.toLowerCase().includes('typescript') ||
      a.tags.some((t) => ['edge functions', 'cloud', 'serverless', 'systems', 'vercel', 'devops'].includes(t.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem', background: 'rgba(56, 189, 248, 0.1)', color: '#0284c7' }}>
          <Server size={14} />
          <span>High-Level Design &amp; Global Scale</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          High-Level Design (HLD)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          End-to-end architectural blueprints for massive scalability: CDN caching, event-driven streaming, database partitioning, and high availability.
        </p>
      </header>

      {/* HLD Core Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Network size={18} color="#0284c7" /> Load Balancing &amp; Gateways
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            L4/L7 load balancers, DNS geo-steering, reverse proxies, and rate limiting algorithms (Token bucket, Leaky bucket).
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Database size={18} color="var(--primary)" /> Partitioning &amp; Replication
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Consistent hashing, database sharding, active-active multi-region replication, and CAP theorem tradeoffs.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Zap size={18} color="#ea580c" /> Caching Hierarchies
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            CDN edge caching, Redis clusters, cache-aside vs write-through patterns, and cache invalidation strategies.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <ShieldAlert size={18} color="#16a34a" /> Resiliency &amp; Disaster Recovery
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Bulkheads, circuit breakers, dead letter queues, and RPO/RTO disaster recovery planning.
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        HLD Blueprints &amp; Architecture Guides
      </h2>

      <div className="cards-grid">
        {hldArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
