import Link from 'next/link';
import { Cpu, Bot, Zap, CheckCircle, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Consulting & Services — 2AMCoding',
  description: 'Specialized consulting in distributed systems, autonomous AI agents, performance engineering, and technical mentorship by Vishwajeet Gupta.',
};

export default function ServicesPage() {
  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>

      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem' }}>
          <Zap size={14} />
          <span>High-Impact Engineering Expertise</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Engineering Services &amp; Advisory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
          Helping engineering teams and startups design bulletproof distributed architectures, integrate production-grade autonomous AI swarms, and scale gracefully.
        </p>
      </header>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', marginBottom: '4.5rem' }}>
        {/* Service 1 */}
        <div className="article-card" style={{ padding: '2rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
            <Cpu size={22} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Distributed Systems &amp; Architecture Advisory
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Architecting fault-tolerant microservices, designing low-latency caching topologies (Redis, edge KV), and eliminating single points of failure across your cloud stack.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> API Gateway &amp; Microservice Blueprints
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> High-Concurrency Rust &amp; Go Backends
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Zero-Downtime Database Migration Plans
            </li>
          </ul>
        </div>

        {/* Service 2 */}
        <div className="article-card" style={{ padding: '2rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '1.25rem' }}>
            <Bot size={22} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Autonomous AI &amp; Agent Platform Engineering
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Moving beyond toy chatbots into deterministic agent workflows: Model Context Protocol (MCP) integrations, LangGraph state machines, sandboxed code execution, and telemetry.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Custom MCP Tool &amp; Server Infrastructure
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Multi-Agent Swarms with State Checkpoints
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Production RAG with Hybrid Reranking
            </li>
          </ul>
        </div>

        {/* Service 3 */}
        <div className="article-card" style={{ padding: '2rem' }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '1.25rem' }}>
            <Zap size={22} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Fullstack Performance &amp; Edge Optimization
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Turbocharging Next.js web applications, optimizing Core Web Vitals, configuring global edge distribution, and trimming cloud hosting bills.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Next.js App Router Architecture Audits
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Sub-50ms Global Edge Endpoints
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={15} color="#22c55e" /> Bundle Size &amp; Render Pipeline Optimization
            </li>
          </ul>
        </div>
      </div>

      {/* Inquiry / Booking CTA */}
      <section className="newsletter-card" style={{ margin: '0 auto', maxWidth: '820px' }}>
        <h2 className="newsletter-title">Let&apos;s Build Something Resilient Together</h2>
        <p className="newsletter-subtitle">
          Whether you need a dedicated architectural review, advisory on AI agent infrastructure, or fractional staff engineering, reach out directly.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href="mailto:vjgupta78@gmail.com"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.8rem' }}
          >
            <Mail size={18} />
            <span>Email Vishwajeet</span>
          </a>
          <Link
            href="/about"
            className="share-action-btn"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
          >
            <span>Learn About My Background</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
