import Link from 'next/link';
import { FileText, PhoneCall, Video, Cpu, Bot, Zap, CheckCircle, Mail, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Mentorship — 2AMCoding | Vishwajeet Gupta',
  description: '1-on-1 mentorship, resume reviews, mock interviews (HLD/LLD), and engineering architecture advisory by Vishwajeet Gupta.',
};

export default function ServicesPage() {
  return (
    <div className="container" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} />
          <span>Mentorship, Mock Interviews &amp; Advisory</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Engineering Services &amp; 1:1 Mentorship
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
          Practical guidance from a senior engineer. Whether you want to land a top-tier role, prepare for system design rounds, or architect resilient cloud systems.
        </p>
      </header>

      {/* Section 1: Career & Interview Mentorship */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.8rem', background: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 10px', borderRadius: '999px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            CAREER ACCELERATION
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Mentorship &amp; Interview Prep
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {/* Resume Review */}
          <div id="resume-review" className="article-card" style={{ padding: '2.25rem', borderTop: '4px solid var(--primary)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
              <FileText size={24} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Resume Review
              </h3>
              <span style={{ fontSize: '0.75rem', background: 'var(--tag-react-bg)', color: 'var(--tag-react-text)', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
                48h Delivery
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              A line-by-line deep audit of your engineering resume. Convert generic tasks into high-impact bullet points using the Google X-Y-Z formula to pass automated ATS filters and catch engineering managers&apos; attention.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', marginTop: 'auto' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Line-by-line technical rewrite &amp; metric quantification
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> ATS compatibility check &amp; keyword alignment
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Video walkthrough + annotated PDF feedback
              </li>
            </ul>
            <a
              href="mailto:vjgupta78@gmail.com?subject=Resume%20Review%20Inquiry%20-%202AMCoding"
              className="btn-primary"
              style={{ textAlign: 'center', display: 'block', padding: '0.7rem' }}
            >
              Request Resume Review
            </a>
          </div>

          {/* One to One Call */}
          <div id="one-to-one" className="article-card" style={{ padding: '2.25rem', borderTop: '4px solid #0284c7' }}>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '1.25rem' }}>
              <PhoneCall size={24} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                1-on-1 Mentorship Call
              </h3>
              <span style={{ fontSize: '0.75rem', background: 'var(--tag-ts-bg)', color: 'var(--tag-ts-text)', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
                60 Mins
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Direct, unfiltered technical consultation. Discuss career roadmaps, transitioning from mid-level to senior/staff, tech stack selection for side projects, or unblocking complex architectural hurdles.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', marginTop: 'auto' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Personalized engineering career roadmap
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Deep architectural and code review Q&amp;A
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Actionable written summary of next steps post-call
              </li>
            </ul>
            <a
              href="mailto:vjgupta78@gmail.com?subject=1-on-1%20Mentorship%20Call%20Booking%20-%202AMCoding"
              className="btn-primary"
              style={{ textAlign: 'center', display: 'block', padding: '0.7rem' }}
            >
              Book 1-on-1 Call
            </a>
          </div>

          {/* Mock Interview */}
          <div id="mock-interview" className="article-card" style={{ padding: '2.25rem', borderTop: '4px solid #ea580c' }}>
            <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'rgba(234, 88, 12, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', marginBottom: '1.25rem' }}>
              <Video size={24} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Mock Interview (HLD/LLD)
              </h3>
              <span style={{ fontSize: '0.75rem', background: 'var(--tag-rust-bg)', color: 'var(--tag-rust-text)', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
                Live 60 Mins
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Simulate realistic high-stakes FAANG &amp; startup interview rounds. Choose High-Level Design (HLD), Low-Level Design (LLD), or Machine Coding rounds with real-time whiteboarding and structured scoring.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem', marginTop: 'auto' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> 45 min live interview simulation + 15 min feedback
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> HLD (Scalability, Sharding, Caching) or LLD (OOP, Patterns)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Detailed rubric scorecard with blindspots &amp; strengths
              </li>
            </ul>
            <a
              href="mailto:vjgupta78@gmail.com?subject=Mock%20Interview%20Session%20Booking%20-%202AMCoding"
              className="btn-primary"
              style={{ textAlign: 'center', display: 'block', padding: '0.7rem' }}
            >
              Schedule Mock Interview
            </a>
          </div>
        </div>
      </div>

      {/* Section 2: Technical Consulting & Advisory */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.8rem', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', padding: '3px 10px', borderRadius: '999px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            ENTERPRISE &amp; STARTUPS
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Architecture Consulting
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {/* Advisory 1 */}
          <div className="article-card" style={{ padding: '2rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(79, 70, 229, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
              <Cpu size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Distributed Systems Architecture
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Architecting fault-tolerant microservices, low-latency caching topologies (Redis, edge KV), and eliminating single points of failure.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> API Gateway &amp; Microservice Blueprints
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> High-Concurrency Rust &amp; Go Backends
              </li>
            </ul>
          </div>

          {/* Advisory 2 */}
          <div className="article-card" style={{ padding: '2rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '1.25rem' }}>
              <Bot size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Autonomous AI &amp; Agent Platforms
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Deterministic agent workflows, Model Context Protocol (MCP) integrations, LangGraph state machines, and sandboxed code execution.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Custom MCP Server &amp; Tool Infrastructure
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Multi-Agent Swarms with State Checkpoints
              </li>
            </ul>
          </div>

          {/* Advisory 3 */}
          <div className="article-card" style={{ padding: '2rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '1.25rem' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Fullstack Performance &amp; Edge Scaling
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Turbocharging Next.js applications, optimizing Core Web Vitals, global edge distribution, and trimming cloud hosting bills.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: 'auto' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Next.js App Router Architecture Audits
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle size={15} color="#22c55e" /> Sub-50ms Global Edge Endpoints
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Inquiry / Booking CTA */}
      <section className="newsletter-card" style={{ margin: '0 auto', maxWidth: '820px' }}>
        <h2 className="newsletter-title">Have a Custom Requirement or Question?</h2>
        <p className="newsletter-subtitle">
          Whether you want to bundle multiple mock interviews, need continuous 1:1 mentorship, or have a custom consulting project, let&apos;s discuss.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <a
            href="mailto:vjgupta78@gmail.com?subject=Custom%20Mentorship%20/%20Service%20Inquiry%20-%202AMCoding"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.8rem' }}
          >
            <Mail size={18} />
            <span>Email Vishwajeet Gupta</span>
          </a>
          <Link
            href="/about"
            className="share-action-btn"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
          >
            <span>Read About Vishwajeet</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
