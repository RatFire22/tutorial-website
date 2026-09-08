'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Moon, ChevronDown, Mountain, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { ArticleMeta } from '@/lib/articles';

export default function Navbar({ articles = [] }: { articles?: ArticleMeta[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navHeaderRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const handleTriggerClick = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  // Close when clicking outside of the header navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (navHeaderRef.current && !navHeaderRef.current.contains(e.target as Node)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const isSystemDesignActive = pathname.startsWith('/system-design') && !pathname.includes('/expedition');
  const isExpeditionsActive = pathname === '/expedition' || pathname.includes('/expedition');
  const isBlogActive = pathname.startsWith('/blog');

  return (
    <>
      <header className="header-nav" ref={navHeaderRef}>
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" className="brand-logo" onClick={closeAllDropdowns}>
            <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #0284c7 100%)' }}>
              <Moon size={16} color="#facc15" fill="#facc15" />
            </div>
            <span>2AMCoding</span>
          </Link>

          {/* Nav Links: System Design, Learn AI, Expeditions, Blog */}
          <nav>
            <ul className="nav-links">
              {/* 1. System Design Dropdown */}
              <li
                className={`nav-dropdown-wrapper ${openDropdown === 'system-design' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${isSystemDesignActive ? 'active' : ''}`}
                  onClick={() => handleTriggerClick('system-design')}
                  aria-expanded={openDropdown === 'system-design'}
                >
                  <span>System Design</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                <div
                  className="nav-dropdown-menu"
                  style={{ minWidth: 310 }}
                >
                  <Link
                    href="/system-design/hld"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>HLD Master Directory</span>
                      <span style={{ fontSize: '0.65rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>32 Systems</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Interactive blueprints, architectural specs &amp; scale targets
                    </div>
                  </Link>

                  <Link
                    href="/system-design/lld"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>LLD Master Directory</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>12 Problems</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Design patterns, class models, mutex locks &amp; clean code
                    </div>
                  </Link>

                  <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                  <Link
                    href="/system-design"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      Architecture Hub &amp; Core Pillars
                    </div>
                    <div className="dropdown-item-desc">
                      Foundations of scalability, caching, consensus &amp; reliability
                    </div>
                  </Link>
                </div>
              </li>

              {/* 2. Learn AI Dropdown (Mount Everest 8,848M Curriculum) */}
              <li
                className={`nav-dropdown-wrapper ${openDropdown === 'learn-ai' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  onClick={() => handleTriggerClick('learn-ai')}
                  aria-expanded={openDropdown === 'learn-ai'}
                >
                  <Sparkles size={13} style={{ color: '#38bdf8' }} />
                  <span>Learn AI</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                <div
                  className="nav-dropdown-menu"
                  style={{ minWidth: 320 }}
                >
                  <Link
                    href="/expedition?summit=everest"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>🏔️</span> Mount Everest AI Route
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,848M · 30 Pitches</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Autonomous AI &amp; LLM Engineering: From RAG to Multi-Agent Swarms
                    </div>
                  </Link>

                  <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                  <Link
                    href="/expedition?summit=everest#foundations"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>Stage 01: Base Camp</span>
                      <span style={{ fontSize: '0.65rem', color: '#64748b', background: 'var(--bg-surface)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>5,364M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Message schemas, token streaming &amp; structured outputs
                    </div>
                  </Link>

                  <Link
                    href="/expedition?summit=everest#rag"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>Stage 02: Khumbu Icefall</span>
                      <span style={{ fontSize: '0.65rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>6,065M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Tool-calling loops, pgvector &amp; hybrid RAG reranking
                    </div>
                  </Link>

                  <Link
                    href="/expedition?summit=everest#agents"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>Stage 03: Camp II (Western Cwm)</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>6,400M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      LangGraph cyclic state machines, checkpoints &amp; memory
                    </div>
                  </Link>

                  <Link
                    href="/expedition?summit=everest#mcp"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>Stage 04: Camp III (Lhotse Face)</span>
                      <span style={{ fontSize: '0.65rem', color: '#7c3aed', background: 'rgba(124, 58, 237, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>7,200M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Model Context Protocol (MCP) &amp; multi-agent swarms
                    </div>
                  </Link>

                  <Link
                    href="/expedition?summit=everest#reliability"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>Stage 05: South Col (Death Zone)</span>
                      <span style={{ fontSize: '0.65rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.12)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>7,906M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Hardened evals, OpenTelemetry tracing &amp; sandboxes
                    </div>
                  </Link>

                  <Link
                    href="/expedition?summit=everest#summit"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span>Stage 06: Summit Pinnacle</span>
                      <span style={{ fontSize: '0.65rem', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,848M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Enterprise platforms, multi-tenant swarms &amp; autonomy
                    </div>
                  </Link>
                </div>
              </li>

              {/* 3. Expeditions Dropdown: The 8,000M Summits Trilogy */}
              <li
                className={`nav-dropdown-wrapper ${openDropdown === 'expeditions' ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${isExpeditionsActive ? 'active' : ''}`}
                  onClick={() => handleTriggerClick('expeditions')}
                  aria-expanded={openDropdown === 'expeditions'}
                >
                  <Mountain size={14} style={{ opacity: 0.85 }} />
                  <span>Expeditions</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                <div
                  className="nav-dropdown-menu"
                  style={{ minWidth: 320 }}
                >
                  <Link
                    href="/expedition?summit=everest"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>🏔️</span> Mount Everest · AI
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,848M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      Autonomous AI &amp; LLM Engineering: 6 Camps, 30 Pitches from RAG to Swarms
                    </div>
                  </Link>

                  <Link
                    href="/system-design/hld/expedition"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>🧗</span> K2 · High-Level Design
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,611M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      The Savage Mountain: 24 Pitches of Distributed Systems, Caching &amp; Consensus
                    </div>
                  </Link>

                  <Link
                    href="/system-design/lld/expedition"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>⛏️</span> Kangchenjunga · Low-Level Design
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,586M</span>
                    </div>
                    <div className="dropdown-item-desc">
                      The Five Treasures: 20 Pitches of Clean Architecture, SOLID &amp; Concurrency
                    </div>
                  </Link>

                  <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                  <Link
                    href="/expedition"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                  >
                    <div className="dropdown-item-title" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      The 8,000M Trilogy Overview &amp; Ascent Log
                    </div>
                    <div className="dropdown-item-desc">
                      Track elevation progress across all 3 summits and 74 technical pitches
                    </div>
                  </Link>
                </div>
              </li>

              {/* 4. Blog Link */}
              <li>
                <Link
                  href="/blog"
                  className={`nav-link ${isBlogActive ? 'active' : ''}`}
                  onClick={closeAllDropdowns}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions: Search & Theme */}
          <div className="nav-actions">
            <button
              className="search-trigger-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search tutorials"
            >
              <Search size={15} />
              <span>Search</span>
              <span className="kbd-badge">Cmd+K</span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
      />
    </>
  );
}
