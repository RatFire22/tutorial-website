'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { summits, SummitConfig } from '@/lib/summitsData';
import { Mountain, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import Link from 'next/link';

function SnowfallCanvas({ active }: { active: boolean }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const NUM_FLAKES = 110;
    const flakes = Array.from({ length: NUM_FLAKES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.6 + 0.8,
      opacity: Math.random() * 0.7 + 0.25,
      speedY: Math.random() * 1.6 + 0.7,
      speedX: Math.random() * 1.0 - 0.5,
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 248, 255, ${f.opacity})`;
        ctx.shadowBlur = f.radius > 2 ? 5 : 2;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();

        f.swayAngle += f.swaySpeed;
        f.x += f.speedX + Math.sin(f.swayAngle) * 0.65;
        f.y += f.speedY;

        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        else if (f.x < 0) f.x = width;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99,
      }}
    />
  );
}

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

  // Snowfall overlay toggle
  const [snowfallActive, setSnowfallActive] = useState<boolean>(true);

  // LocalStorage ascent tracker
  const [climbedPitches, setClimbedPitches] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(`2amcoding_climbed_${activeSummit}`);
        if (raw) {
          setClimbedPitches(JSON.parse(raw));
        } else {
          setClimbedPitches({});
        }
      } catch {
        setClimbedPitches({});
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeSummit]);

  const togglePitch = (stopNum: string) => {
    setClimbedPitches((prev) => {
      const next = { ...prev, [stopNum]: !prev[stopNum] };
      try {
        localStorage.setItem(`2amcoding_climbed_${activeSummit}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetAscent = () => {
    setClimbedPitches({});
    try {
      localStorage.removeItem(`2amcoding_climbed_${activeSummit}`);
    } catch {}
  };

  const totalPitches = expeditionRoute.reduce((acc, stage) => acc + stage.pitches.length, 0);
  const climbedCount = Object.values(climbedPitches).filter(Boolean).length;
  const ascentPercent = totalPitches > 0 ? Math.round((climbedCount / totalPitches) * 100) : 0;

  // Find next objective pitch (player position on adventure map)
  let nextObjectivePitch: string | null = null;
  for (const stage of expeditionRoute) {
    for (const p of stage.pitches) {
      if (!climbedPitches[p.stopNum]) {
        nextObjectivePitch = p.stopNum;
        break;
      }
    }
    if (nextObjectivePitch) break;
  }

  // Ref for the entire trail wrapper and continuous single SVG road path
  const trailWrapperRef = React.useRef<HTMLDivElement>(null);
  const [roadPathD, setRoadPathD] = useState<string>('');
  const [trailSize, setTrailSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const updateRoadPath = React.useCallback(() => {
    if (!trailWrapperRef.current) return;
    const wrapperRect = trailWrapperRef.current.getBoundingClientRect();
    const nodes = Array.from(trailWrapperRef.current.querySelectorAll('.milestone-node'));
    if (nodes.length < 2) return;

    setTrailSize({ width: wrapperRect.width, height: wrapperRect.height });

    const points = nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - wrapperRect.left,
        y: rect.top + rect.height / 2 - wrapperRect.top,
      };
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const midY = (p1.y + p2.y) / 2;
      d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    setRoadPathD(d);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(updateRoadPath, 40);
    const t2 = setTimeout(updateRoadPath, 200);
    const t3 = setTimeout(updateRoadPath, 600);
    window.addEventListener('resize', updateRoadPath);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && trailWrapperRef.current) {
      ro = new ResizeObserver(() => {
        updateRoadPath();
      });
      ro.observe(trailWrapperRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateRoadPath);
      if (ro) ro.disconnect();
    };
  }, [activeSummit, updateRoadPath]);

  const handleSelectSummit = (key: 'everest' | 'k2' | 'kangchenjunga') => {
    router.push(`/expedition?summit=${key}`, { scroll: false });
  };

  return (
    <div className="expedition-root">
      {/* Realtime Alpine Snowfall Canvas Overlay */}
      <SnowfallCanvas active={snowfallActive} />

      {/* 8,000M Summits Selector Bar */}
      <div
        style={{
          position: 'sticky',
          top: '72px',
          zIndex: 40,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(7, 10, 16, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.65rem 0',
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
      <section className="exp-hero">
        <div className="exp-wrap">
          <div className="badge-wrapper">
            <span
              className="badge"
              style={{
                borderColor: currentSummit.badgeColor,
                color: currentSummit.badgeColor,
              }}
            >
              {currentSummit.tagline}
            </span>
          </div>
          <h1>{currentSummit.title}</h1>
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
        </div>
      </section>

      {/* Climbing Progress HUD Bar */}
      <div
        style={{
          position: 'sticky',
          top: '122px',
          zIndex: 35,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'rgba(11, 17, 29, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.65rem 0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="exp-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--exp-paper-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Climbing Log: {climbedCount} of {totalPitches} Pitches Logged
              </span>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', fontWeight: 700 }}>
                {ascentPercent}% To Summit
              </span>
            </div>
            <div style={{ height: '7px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${ascentPercent}%`,
                  background: 'linear-gradient(90deg, #38BDF8, #22C55E)',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Snowfall Toggle */}
            <button
              type="button"
              onClick={() => setSnowfallActive(!snowfallActive)}
              style={{
                background: snowfallActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: snowfallActive ? '1px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.1)',
                color: snowfallActive ? '#38BDF8' : 'var(--exp-paper-muted)',
                fontSize: '0.725rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{snowfallActive ? '❄️ Snowfall: ON' : '❄️ Snowfall: OFF'}</span>
            </button>


            {climbedCount > 0 && (
              <button
                type="button"
                onClick={resetAscent}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#ef4444',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                <RotateCcw size={11} />
                <span>Reset Log</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expedition Trail (Continuous Mountain Trekking Switchback Path) */}
      <div className="expedition-trail">
        <div className="exp-wrap">
          <div className="trail-canvas-wrapper" ref={trailWrapperRef}>
            {/* Continuous Single SVG Mountain Trail Overlay */}
            <svg
              className="continuous-trail-svg"
              viewBox={`0 0 ${trailSize.width} ${trailSize.height}`}
              width={trailSize.width || '100%'}
              height={trailSize.height || '100%'}
            >
              <defs>
                <linearGradient id="ozGoldRoad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="35%" stopColor="#F59E0B" />
                  <stop offset="70%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="ozEmeraldRoad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#15803D" />
                  <stop offset="50%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#4ADE80" />
                </linearGradient>
              </defs>
              {roadPathD && (
                <g id="svg-road-layer">
                  {/* 1. Road Bed Foundation (outer rim) - Decreased width to 14px */}
                  <path
                    d={roadPathD}
                    fill="none"
                    stroke="rgba(245, 158, 11, 0.22)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 2. Main Paved Ribbon (Yellow-Brick / Alpine Gold) - Decreased width to 8px */}
                  <path
                    d={roadPathD}
                    fill="none"
                    stroke="url(#ozGoldRoad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 3. Stepping Pavers / Cobblestones - Decreased width to 4px */}
                  <path
                    d={roadPathD}
                    fill="none"
                    stroke="#FEF08A"
                    strokeWidth="4"
                    strokeDasharray="5 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 4. Glowing Trail Edges - Decreased width to 1.2px */}
                  <path
                    d={roadPathD}
                    fill="none"
                    stroke="#FDE68A"
                    strokeWidth="1.2"
                    strokeDasharray="3 5"
                    opacity="0.6"
                  />
                </g>
              )}
            </svg>

            {/* Dynamic Stages and Pitches Container */}
            {(() => {
              let globalPitchCounter = 0;

              return expeditionRoute.map((stage) => {
                return (
                  <div key={stage.waypoint}>
                    {/* Milestone Waypoint Landmark */}
                    <div id={stage.id} className="waypoint" style={{ scrollMarginTop: '130px' }}>
                      <div className="waypoint-badge">
                        <span className="alt-metric">{stage.alt}</span>
                        <span className="baro-metric">{stage.baro}</span>
                      </div>
                      <h2>{stage.waypoint}</h2>
                      <div className="waypoint-sub">{stage.sub}</div>
                      <p className="waypoint-brief">{stage.brief}</p>
                    </div>

                    {/* Camp Trailhead Gate */}
                    <div className="camp-trailhead-gate">
                      <div className="camp-gate-badge">
                        <span>🚩</span>
                        <span>{stage.waypoint} TRAILHEAD</span>
                        <span>↓</span>
                      </div>
                    </div>

                    {/* Mountain Switchback Pitch Rows */}
                    <div style={{ position: 'relative', marginTop: '20px' }}>
                      {stage.pitches.map((p) => {
                        const globalIdx = globalPitchCounter++;
                        const hazardClass = stage.hazard ? 'deathzone' : '';
                        const pinnacleClass = stage.pinnacle ? 'summit-ridge' : '';
                        const isClimbed = Boolean(climbedPitches[p.stopNum]);
                        const isNext = p.stopNum === nextObjectivePitch;

                        // Symmetrical alternating mountain switchback:
                        // Odd pitch ([01], [03], [05]...): Card on LEFT of node
                        // Even pitch ([02], [04], [06]...): Card on RIGHT of node
                        const isLeftCard = globalIdx % 2 === 0;
                        // Gentle serpentine meander down the center mountain trail
                        const nodeX = isLeftCard
                          ? (globalIdx % 4 === 0 ? 52 : 54)
                          : (globalIdx % 4 === 1 ? 48 : 46);

                        return (
                          <div
                            key={p.t}
                            className={`pitch-switchback-row ${hazardClass} ${pinnacleClass}`}
                          >
                            {/* Tactile Milestone Node Tile (Alpine Round Puck) */}
                            <button
                              type="button"
                              className={`milestone-node ${isClimbed ? 'climbed' : ''} ${isNext ? 'is-next' : ''}`}
                              style={{
                                left: `${nodeX}%`,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePitch(p.stopNum);
                              }}
                              title={`Pitch ${p.stopNum}: ${p.t} (Click to toggle climbed)`}
                            >
                              {isNext && <div className="game-node-pulse-ring" />}

                              {isClimbed ? (
                                <div className="game-node-stars">
                                  <span style={{ color: '#FBBF24' }}>★</span>
                                  <span style={{ color: '#FDE047', fontSize: '10px', transform: 'translateY(-1px)' }}>★</span>
                                  <span style={{ color: '#FBBF24' }}>★</span>
                                </div>
                              ) : isNext ? (
                                <div className="game-node-flag">
                                  <span>🧗 NEXT</span>
                                </div>
                              ) : null}

                              <span className="game-node-num">{p.stopNum}</span>
                            </button>

                            {/* Topic Dossier Card strictly alternating: Left of [01], Right of [02] */}
                            <div
                              className={`dossier-card ${isLeftCard ? 'card-left' : 'card-right'} ${isClimbed ? 'climbed' : ''}`}
                              style={{
                                right: isLeftCard ? `calc(${100 - nodeX}% + 36px)` : undefined,
                                left: !isLeftCard ? `calc(${nodeX}% + 36px)` : undefined,
                                cursor: 'pointer',
                                borderColor: isClimbed ? 'rgba(34, 197, 94, 0.45)' : undefined,
                              }}
                              onClick={() => router.push(`/expedition/${activeSummit}/pitch-${p.stopNum}`)}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                                  <span className="pitch-station">PITCH {p.stopNum}</span>
                                  <span style={{ opacity: 0.3 }}>•</span>
                                  <span className="pitch-gear" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.tech}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePitch(p.stopNum);
                                    }}
                                    style={{
                                      background: isClimbed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                                      border: isClimbed ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)',
                                      color: isClimbed ? '#22c55e' : 'var(--exp-paper-muted)',
                                      borderRadius: '9999px',
                                      padding: '2px 8px',
                                      fontSize: '0.675rem',
                                      fontWeight: 700,
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      transition: 'all 0.15s ease',
                                    }}
                                  >
                                    <CheckCircle2 size={11} />
                                    <span>{isClimbed ? 'CLIMBED' : 'LOG'}</span>
                                  </button>
                                  <span
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px',
                                      fontSize: '0.725rem',
                                      fontWeight: 600,
                                      color: currentSummit.badgeColor,
                                    }}
                                  >
                                    <span>Blueprint</span>
                                    <ArrowRight size={11} />
                                  </span>
                                </div>
                              </div>

                              <h3 style={{ margin: '2px 0 4px', fontSize: '1.05rem', lineHeight: 1.3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                <span>{p.t}</span>
                              </h3>
                              <p className="pitch-desc" style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {p.d}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
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
