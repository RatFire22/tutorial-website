import { Network, Database, Zap, ShieldAlert, Server } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import HLDProblemDirectory from '@/components/HLDProblemDirectory';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HLD (High-Level Design) — Distributed Systems & Cloud Architecture | 2AMCoding',
  description: 'Master High-Level Design: Microservices, load balancing, sharding, caching topologies, message queues, and global cloud scale.',
};

export default function HLDPage() {
  const articles = getAllArticles();
  const hldArticles = articles.filter(
    (a) =>
      a.category.toUpperCase() === 'HLD' ||
      a.tags.some((t) => ['hld', 'distributed systems', 'scalability', 'redis', 'caching', 'kafka'].includes(t.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem', background: 'rgba(56, 189, 248, 0.1)', color: '#0284c7' }}>
          <Server size={14} />
          <span>High-Level Design &amp; Global Scale</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          High-Level Design (HLD)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
          End-to-end architectural blueprints for massive scalability: CDN caching, event-driven streaming, database partitioning, and high availability.
        </p>

        {/* K2 Summit Expedition Banner */}
        <Link
          href="/system-design/hld/expedition"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.1rem 1.75rem',
            maxWidth: '780px',
            width: '100%',
            background: 'linear-gradient(135deg, rgba(7, 10, 16, 0.95) 0%, rgba(14, 30, 56, 0.9) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            textAlign: 'left',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="card-interactive-hover"
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              <span>🏔️</span> KARAKORAM EXPEDITION · 8,611M
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F4EFE6' }}>
              K2: Twenty-four pitches. The Savage Summit at 8,611M.
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              The high-altitude technical route to planetary scale: 6 camps, Raft consensus, sharding, and zero-RTO disaster recovery.
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#0284c7', color: '#ffffff', padding: '0.55rem 1.1rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.825rem', flexShrink: 0 }}>
            <span>Climb K2</span>
            <Server size={14} />
          </div>
        </Link>
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

      {/* Interactive 32-System HLD Curriculum & Problem Directory */}
      <HLDProblemDirectory />
    </div>
  );
}
