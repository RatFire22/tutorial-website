import Link from 'next/link';
import { ArrowLeft, Terminal, Cpu, Cloud } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '@/components/Icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — 2AMCoding & Vishwajeet Gupta',
  description: 'About 2AMCoding, the writing philosophy, technical background, and site architecture.',
};

export default function AboutPage() {
  return (
    <div className="container-narrow" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      <Link href="/" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Tutorials</span>
      </Link>

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
              <Cpu size={18} color="var(--primary)" /> Frontend Systems
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Next.js, React Server Components, TypeScript, and modern CSS architecture.
            </p>
          </div>

          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              <Cloud size={18} color="#0284c7" /> Cloud &amp; Edge
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Serverless runtimes, V8 isolates, CDN edge caching, and Vercel deployments.
            </p>
          </div>

          <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              <Terminal size={18} color="#ea580c" /> Systems Programming
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Rust, Tokio async runtime, Axum, and high-concurrency microservices.
            </p>
          </div>
        </div>

        <h2>How This Site is Built</h2>
        <p>
          This website is deliberately built with minimal dependencies:
        </p>
        <ul>
          <li><strong>Next.js 15+ App Router</strong> with Static Site Generation (SSG) for instant page loads.</li>
          <li><strong>MDX Content Pipeline</strong>: Markdown files versioned directly in Git, requiring no database.</li>
          <li><strong>Vanilla CSS</strong> with modern design tokens, smooth dark/light transitions, and responsive grid.</li>
          <li><strong>100% Free Vercel Hosting</strong>: Automated CI/CD, global edge distribution, and zero hosting costs.</li>
        </ul>

        <h2>Connect &amp; Collaborate</h2>
        <p>
          Feel free to reach out, suggest new tutorial topics, or connect across social channels:
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="share-action-btn"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="share-action-btn"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}
          >
            <TwitterIcon size={16} /> Twitter / X
          </a>
          <a
            href="https://linkedin.com"
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
