'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { summits, SummitConfig } from '@/lib/summitsData';
import { Mountain, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function ExpeditionContent({ initialSummit }: { initialSummit?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const querySummit = searchParams.get('summit');
  const activeSummit: 'everest' | 'k2' | 'kangchenjunga' = (
    querySummit && summits[querySummit]
      ? querySummit
      : initialSummit || 'everest'
  ) as 'everest' | 'k2' | 'kangchenjunga';

  const currentSummit: SummitConfig = summits[activeSummit] || summits.everest;
  const expeditionRoute = currentSummit.stages;

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const pitchElements = document.querySelectorAll('.pitch');
    pitchElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeSummit]);

  const handleSelectSummit = (key: 'everest' | 'k2' | 'kangchenjunga') => {
    router.push(`/expedition?summit=${key}`, { scroll: false });
  };

  return (
    <div className="expedition-root">
      {/* 8,000M Summits Selector Bar */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 40,
          backdropFilter: 'blur(16px)',
          background: 'rgba(7, 10, 16, 0.88)',
          borderBottom: '1px solid rgba(224, 242, 254, 0.12)',
          padding: '0.75rem 1rem',
        }}
      >
        <div className="exp-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mountain size={18} color="#38BDF8" />
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--exp-ice)' }}>
              The 8,000M Summits Trilogy:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Everest Tab */}
            <button
              onClick={() => handleSelectSummit('everest')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                background: activeSummit === 'everest' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: activeSummit === 'everest' ? '#38BDF8' : 'var(--exp-paper-muted)',
                border: activeSummit === 'everest' ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span>Everest</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.85 }}>8,848M</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.2)', padding: '1px 5px', borderRadius: '4px' }}>AI</span>
            </button>

            {/* K2 Tab */}
            <button
              onClick={() => handleSelectSummit('k2')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                background: activeSummit === 'k2' ? 'rgba(2, 132, 199, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                color: activeSummit === 'k2' ? '#38BDF8' : 'var(--exp-paper-muted)',
                border: activeSummit === 'k2' ? '1px solid #0284c7' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span>K2 (Savage Peak)</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.85 }}>8,611M</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(2, 132, 199, 0.25)', padding: '1px 5px', borderRadius: '4px' }}>HLD</span>
            </button>

            {/* Kangchenjunga Tab */}
            <button
              onClick={() => handleSelectSummit('kangchenjunga')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                background: activeSummit === 'kangchenjunga' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                color: activeSummit === 'kangchenjunga' ? '#a5b4fc' : 'var(--exp-paper-muted)',
                border: activeSummit === 'kangchenjunga' ? '1px solid #6366F1' : '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span>Kangchenjunga</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.85 }}>8,586M</span>
              <span style={{ fontSize: '0.65rem', background: 'rgba(99, 102, 241, 0.25)', padding: '1px 5px', borderRadius: '4px' }}>LLD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="exp-wrap exp-hero">
        <div className="exp-badge-cluster">
          <div className="expedition-pill">{currentSummit.routeStandard}</div>
          <div className="coord-pill">{currentSummit.coords}</div>
        </div>

        <h1 style={{ lineHeight: 1.15 }}>
          {currentSummit.name}: {currentSummit.title}.<br />
          One <em>summit</em> at {currentSummit.elevation}.
        </h1>

        <div className="exp-hero-sub-grid">
          <p className="lede">{currentSummit.lede}</p>
          <div className="exp-hero-stats">
            <div className="exp-stat-item">
              <span>Vertical Rise</span>
              <strong>{currentSummit.stats.verticalRise}</strong>
            </div>
            <div className="exp-stat-item">
              <span>Waypoints</span>
              <strong>{currentSummit.stats.waypoints}</strong>
            </div>
            <div className="exp-stat-item">
              <span>Crux Pitch</span>
              <strong>{currentSummit.stats.cruxPitch}</strong>
            </div>
          </div>
        </div>

        {/* Topo Ridge Vector */}
        <div className="topo-strip">
          <svg className="topo-svg" viewBox="0 0 1000 140" preserveAspectRatio="none">
            <defs>
              <linearGradient id="topo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              className="ridge-line"
              d={
                activeSummit === 'k2'
                  ? 'M0,135 L120,118 L280,102 L440,76 L600,56 L760,34 L880,16 L1000,2'
                  : activeSummit === 'kangchenjunga'
                  ? 'M0,128 L150,112 L310,90 L480,68 L640,48 L790,32 L910,18 L1000,5'
                  : 'M0,130 L160,110 L300,95 L460,70 L620,52 L780,30 L900,18 L1000,4'
              }
            />
          </svg>
        </div>
      </div>

      {/* Expedition Trail */}
      <div className="expedition-trail">
        <div className="fixed-line" />
        <div className="exp-wrap">
          {expeditionRoute.map((stage) => {
            return (
              <div key={stage.waypoint}>
                {/* Milestone Waypoint */}
                <div id={stage.id} className="waypoint" style={{ scrollMarginTop: '130px' }}>
                  <div className="waypoint-badge">
                    <span className="alt-metric">{stage.alt}</span>
                    <span className="baro-metric">{stage.baro}</span>
                  </div>
                  <h2>{stage.waypoint}</h2>
                  <div className="waypoint-sub">{stage.sub}</div>
                  <p className="waypoint-brief">{stage.brief}</p>
                </div>

                {/* Pitch Stations */}
                <div className="pitches">
                  {stage.pitches.map((p) => {
                    const isPort = p.index % 2 !== 0;
                    const sideClass = isPort ? 'port' : 'starboard';
                    const hazardClass = stage.hazard ? 'deathzone' : '';
                    const pinnacleClass = stage.pinnacle ? 'summit-ridge' : '';

                    return (
                      <div
                        key={p.t}
                        className={`pitch ${sideClass} ${hazardClass} ${pinnacleClass}`}
                      >
                        {isPort ? (
                          <>
                            <div className="pitch-card">
                              <div className="pitch-meta">
                                <span className="pitch-station">PITCH {p.stopNum}</span>
                              </div>
                              <h3>{p.t}</h3>
                              <div className="pitch-gear">{p.tech}</div>
                              <p className="pitch-desc">{p.d}</p>
                            </div>
                            <div className="carabiner" />
                            <div />
                          </>
                        ) : (
                          <>
                            <div />
                            <div className="carabiner" />
                            <div className="pitch-card">
                              <div className="pitch-meta">
                                <span className="pitch-station">PITCH {p.stopNum}</span>
                              </div>
                              <h3>{p.t}</h3>
                              <div className="pitch-gear">{p.tech}</div>
                              <p className="pitch-desc">{p.d}</p>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summit Pinnacle */}
      <div className="exp-wrap summit-pinnacle">
        <div className="prayer-flags">
          <div className="flag-tag flag-blue" />
          <div className="flag-tag flag-white" />
          <div className="flag-tag flag-red" />
          <div className="flag-tag flag-green" />
          <div className="flag-tag flag-yellow" />
        </div>
        <h2>{currentSummit.name} Summit: {currentSummit.elevation}</h2>
        <p style={{ maxWidth: '680px', margin: '0 auto' }}>
          {activeSummit === 'k2'
            ? 'You have conquered the Savage Mountain of High-Level Design. You no longer build brittle single-node architectures; you design planetary-scale distributed fabrics that shrug off network partitions and regional disasters.'
            : activeSummit === 'kangchenjunga'
            ? 'You have claimed the Five Treasures of Kangchenjunga. You craft software with structural purity, immaculate SOLID discipline, and rock-solid multi-threaded concurrency.'
            : 'You are no longer an engineer wrapper-calling proprietary APIs. You are an infrastructure architect running reliable, observable autonomous swarms at enterprise scale.'}
        </p>

        {/* Quick Link to Master Directories */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {activeSummit === 'k2' && (
            <Link
              href="/system-design/hld"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#0284c7',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              <span>Explore 32 HLD Master Problem Blueprints</span>
              <ArrowRight size={16} />
            </Link>
          )}

          {activeSummit === 'kangchenjunga' && (
            <Link
              href="/system-design/lld"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#6366F1',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              <span>Explore 12 Classic LLD Problem Specs</span>
              <ArrowRight size={16} />
            </Link>
          )}

          {activeSummit === 'everest' && (
            <Link
              href="/blog/architecting-multi-agent-workflows-langgraph-ai"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#38BDF8',
                color: '#070A10',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              <span>Read LangGraph Multi-Agent Architecture Guide</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Logbook */}
      <div className="exp-wrap">
        <div className="logbook">
          <h3>Expedition Protocol &amp; Engineering Principles</h3>
          <ul>
            {activeSummit === 'k2' ? (
              <>
                <li>
                  <strong>Respect the Death Zone Bottleneck (Stage 05):</strong> When network partitions sever cross-data-center links, split-brain crashes destroy databases. Never rely on uncoordinated distributed locks; always issue monotonic fencing tokens.
                </li>
                <li>
                  <strong>Avoid Premature Distributed Complexity:</strong> Before introducing Kafka clusters and 2PC coordination, exhaust vertical caching and read replica architectures. Every distributed edge introduces partial failure modes.
                </li>
                <li>
                  <strong>Measure P99.9, Never Averages:</strong> In multi-service microservice graphs, a single slow service with high tail latency degrades the entire user journey. Protect downstream systems with circuit breakers and dead-letter queues.
                </li>
              </>
            ) : activeSummit === 'kangchenjunga' ? (
              <>
                <li>
                  <strong>Guard Against Flawed Invariants (Stop 03):</strong> The Liskov Substitution Principle is not academic theory. Overriding a base method only to throw an UnsupportedOperationException shatters callers and guarantees runtime crashes.
                </li>
                <li>
                  <strong>Respect Memory Visibility &amp; Barriers (Stop 14):</strong> Multithreaded systems running on modern multi-core CPUs reorder instructions aggressively. Double-checked locking without volatile keywords will read half-initialized objects.
                </li>
                <li>
                  <strong>Prefer Composition over Inheritance:</strong> Deep class inheritance trees create brittle, unbreakable coupling. Use Strategy and Decorator patterns to compose runtime behavior dynamically.
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Respect the Death Zone (Stops 23–27):</strong> Most developers rush into multi-agent swarms and die on unhandled network timeouts, non-deterministic loops, or missing idempotency keys. Reliability isn&apos;t an afterthought—it&apos;s your oxygen tank.
                </li>
                <li>
                  <strong>Build without sherpas first (Stop 13):</strong> Framework abstractions will rescue you until they swallow a critical stack trace. Hand-crafting an agent graph with raw state vectors is what separates real engineers from prompt wrappers.
                </li>
                <li>
                  <strong>Carry production-weight telemetry:</strong> Stop 24 (OpenTelemetry tracing) feels pedantic during local development. In production, an untraced agent loop will burn thousands in model credits before your alerting pipeline even notices.
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <footer className="exp-footer">
        ROUTE DISPATCH · {currentSummit.name.toUpperCase()} ({currentSummit.elevation}) · {currentSummit.title.toUpperCase()} · ASCENT LOGGED · 2AMCODING
      </footer>
    </div>
  );
}

export default function ExpeditionClient({ initialSummit }: { initialSummit?: string }) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070A10', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>ACCLIMATIZING TO HIGH ALTITUDE...</div>}>
      <ExpeditionContent initialSummit={initialSummit} />
    </Suspense>
  );
}
