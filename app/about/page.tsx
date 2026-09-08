import { Terminal, Cpu, Cloud } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '@/components/Icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — 2AMCoding & Vishwajeet Gupta',
  description: 'About 2AMCoding, the writing philosophy, technical background, and site architecture.',
};

export default function AboutPage() {
  return (
    <div className="container-narrow" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>

      <header style={{ marginBottom: '2.5rem' }}>
        <div className="author-full-meta" style={{ marginBottom: '1.5rem' }}>
          <div
            className="author-full-avatar"
            style={{ width: 64, height: 64, fontSize: '1.5rem' }}
          >
            VG
          </div>
          <div className="author-full-info">
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Vishwajeet Gupta
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Founder, 2AMCoding • Systems &amp; Web Engineer
            </p>
          </div>
        </div>
      </header>

      <div className="article-prose">
        <p>
          Welcome to <strong>2AMCoding</strong>. The name comes from that unmistakable late-night flow state where curiosity takes over, side projects come alive, and the most satisfying technical breakthroughs happen.
        </p>

        <p>
          My writing philosophy is simple: <em>zero fluff, clear mental models, and real-world production code</em>. Every guide is battle-tested and drawn from years of scaling cloud infrastructure and fullstack applications.
        </p>

        <h2>Core Technical Stack &amp; Areas of Focus</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              <Cloud size={18} color="#0284c7" /> High-Level Design (HLD)
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Distributed systems at scale: Kafka event streaming, Redis caching, database sharding, Raft consensus, and multi-region resilience.
            </p>
          </div>

          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              <Cpu size={18} color="var(--primary)" /> Low-Level Design (LLD)
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Object-oriented craftsmanship: SOLID principles, design patterns (Strategy, State, Observer), lock-free CAS loops, and concurrency.
            </p>
          </div>

          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              <Terminal size={18} color="#ea580c" /> Autonomous AI &amp; Agents
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Agentic systems from the rock-face: LangGraph cyclic loops, Model Context Protocol (MCP), tool swarms, and zero-trust sandboxes.
            </p>
          </div>
        </div>

        <h2>Connect &amp; Collaborate</h2>
        <p>
          Whether you want to prepare for senior system design rounds, suggest new architectural blueprints, or discuss advisory:
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href="mailto:vishwajeet@2amcoding.in"
            className="share-action-btn"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem', background: 'var(--primary)', color: '#ffffff' }}
          >
            ✉️ vishwajeet@2amcoding.in
          </a>
          <a
            href="https://github.com/vishwajeetgupta"
            target="_blank"
            rel="noreferrer"
            className="share-action-btn"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href="https://x.com/vishwajeetgupta"
            target="_blank"
            rel="noreferrer"
            className="share-action-btn"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}
          >
            <TwitterIcon size={16} /> Twitter / X
          </a>
          <a
            href="https://linkedin.com/in/vishwajeetgupta"
            target="_blank"
            rel="noreferrer"
            className="share-action-btn"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
