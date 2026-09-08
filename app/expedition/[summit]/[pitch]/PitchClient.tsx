'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PitchDetail } from '@/lib/summitsData';
import { ArticleMeta } from '@/lib/articles';
import { Mountain, CheckCircle2, ArrowLeft, ArrowRight, Copy, Check, Terminal, ShieldAlert, Cpu, Sparkles, BookOpen } from 'lucide-react';

interface PitchClientProps {
  detail: PitchDetail;
  relatedArticle?: ArticleMeta | null;
}

export default function PitchClient({ detail, relatedArticle }: PitchClientProps) {
  const { summit, stage, pitch, prevPitch, nextPitch } = detail;
  const storageKey = `2amcoding_climbed_${summit.id}`;

  const [isClimbed, setIsClimbed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setIsClimbed(Boolean(parsed[pitch.stopNum]));
        }
      } catch {
        // Ignore localStorage read errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [storageKey, pitch.stopNum]);

  const toggleClimbed = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : {};
      const nextState = !isClimbed;
      if (nextState) {
        parsed[pitch.stopNum] = true;
      } else {
        delete parsed[pitch.stopNum];
      }
      localStorage.setItem(storageKey, JSON.stringify(parsed));
      setIsClimbed(nextState);
    } catch {
      setIsClimbed(!isClimbed);
    }
  };

  const sampleSnippet = `# ${summit.name} · Pitch ${pitch.stopNum} Implementation Blueprint
# System: ${pitch.t}
# Tech Stack: ${pitch.tech}

from typing import Dict, Any, List
import time

class ${pitch.t.replace(/[^a-zA-Z0-9]/g, '')}Engine:
    """
    ${pitch.d}
    """
    def __init__(self, config: Dict[str, Any] | None = None):
        self.config = config or {}
        self.initialized_at = time.time()
        self.status = "INITIALIZED"

    def execute_pitch_workflow(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        # Production execution pipeline
        start_time = time.perf_counter()
        
        # 1. Validation & Schema Enforcement
        # 2. Stateful Execution & Concurrency Lock
        # 3. Telemetry Dispatch
        
        latency_ms = (time.perf_counter() - start_time) * 1000
        return {
            "status": "SUCCESS",
            "pitch": "${pitch.stopNum}",
            "latency_ms": round(latency_ms, 2),
            "payload": payload
        }
`;

  const copyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sampleSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const summitUrl =
    summit.id === 'k2'
      ? '/system-design/hld/expedition'
      : summit.id === 'kangchenjunga'
      ? '/system-design/lld/expedition'
      : '/expedition?summit=everest';

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem 1.5rem', maxWidth: '880px', margin: '0 auto' }}>
      {/* Top Breadcrumb */}
      <div style={{ marginBottom: '2rem' }}>
        <Link
          href={summitUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            transition: 'all 0.15s ease',
          }}
        >
          <ArrowLeft size={14} />
          <span>Return to {summit.name} Expedition ({summit.elevation})</span>
        </Link>
      </div>

      {/* Pitch Header Card */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.25rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.725rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '3px 10px',
              borderRadius: '4px',
              background: `${summit.badgeColor}18`,
              color: summit.badgeColor,
              border: `1px solid ${summit.badgeColor}44`,
            }}
          >
            🏔️ {summit.name} · {summit.elevation}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.725rem',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {stage.waypoint} ({stage.alt})
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.725rem',
              fontWeight: 700,
              color: '#d97706',
              padding: '3px 10px',
              borderRadius: '4px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
            }}
          >
            PITCH {pitch.stopNum}
          </span>
        </div>

        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '0.85rem',
            color: 'var(--text-primary)',
          }}
        >
          {pitch.t}
        </h1>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.25rem',
            background: 'var(--bg-surface)',
            padding: '4px 10px',
            borderRadius: '4px',
          }}
        >
          <Cpu size={14} color={summit.badgeColor} />
          <span>Tech Stack: {pitch.tech}</span>
        </div>

        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            marginBottom: '1.75rem',
          }}
        >
          {pitch.d}
        </p>

        {/* Action Bar: Log Pitch Ascent */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <button
            type="button"
            onClick={toggleClimbed}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: isClimbed ? 'rgba(34, 197, 94, 0.15)' : 'var(--primary)',
              color: isClimbed ? '#22c55e' : '#ffffff',
              border: isClimbed ? '1px solid #22c55e' : 'none',
              boxShadow: isClimbed ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.15s ease',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{isClimbed ? 'ASCENT LOGGED · COMPLETED' : 'MARK PITCH AS CLIMBED'}</span>
          </button>

          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Stage {stage.sub}
          </span>
        </div>
      </div>

      {/* Published Deep Dive Guide Callout (If exists) */}
      {relatedArticle && (
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
              <BookOpen size={14} />
              <span>Published Blueprint Guide</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {relatedArticle.title}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {relatedArticle.description}
            </div>
          </div>

          <Link
            href={`/blog/${relatedArticle.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '6px',
              background: 'var(--primary)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.825rem',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span>Read Full Guide</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Blueprint Specifications Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Target Latency SLA
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            &lt; 50ms p99 Execution
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
            Bounded context buffer to avoid thread stalls or socket timeouts.
          </p>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Concurrency Invariant
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Thread-Safe Atomic State
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
            Strict mutual exclusion or optimistic lock guards on shared state channels.
          </p>
        </div>

        <div style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#ef4444', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldAlert size={13} /> Primary Production Risk
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Cascade Failure &amp; Memory Blowout
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
            Mitigated with token sliding windows and circuit-breaker backoffs.
          </p>
        </div>
      </div>

      {/* Code Blueprint Starter */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            <Terminal size={16} color="var(--primary)" />
            <span>Architecture Starter Blueprint</span>
          </div>

          <button
            type="button"
            onClick={copyCode}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              padding: '4px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {copied ? <Check size={13} color="#22c55e" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        <pre
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            overflowX: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            color: 'var(--text-primary)',
          }}
        >
          <code>{sampleSnippet}</code>
        </pre>
      </div>

      {/* Production Verification Checklist */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#f59e0b" />
          <span>Pitch Verification Checklist</span>
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
            <span>Establish deterministic schema validation for all inbound payload channels.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
            <span>Configure exponential backoff jitter to prevent thundering herd under upstream failures.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
            <span>Implement sliding window or durable checkpoint persistence to prevent state loss on crash.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: '#22c55e', marginTop: '2px' }}>✓</span>
            <span>Verify unit test coverage for edge condition retries and timeout cancellations.</span>
          </li>
        </ul>
      </div>

      {/* Navigation Footer: Prev / Index / Next */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {prevPitch ? (
          <Link
            href={`/expedition/${summit.id}/pitch-${prevPitch.stopNum}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <ArrowLeft size={14} />
            <span>Pitch {prevPitch.stopNum}: {prevPitch.title}</span>
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={summitUrl}
          style={{
            fontSize: '0.825rem',
            fontWeight: 700,
            color: summit.badgeColor,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <Mountain size={14} />
          <span>{summit.name} Route Index</span>
        </Link>

        {nextPitch ? (
          <Link
            href={`/expedition/${summit.id}/pitch-${nextPitch.stopNum}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <span>Pitch {nextPitch.stopNum}: {nextPitch.title}</span>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
