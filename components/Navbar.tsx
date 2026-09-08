'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Moon, ChevronDown, Mountain } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { ArticleMeta } from '@/lib/articles';

export default function Navbar({ articles = [] }: { articles?: ArticleMeta[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navHeaderRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Clear timer and open the target dropdown smoothly
  const handleMouseEnter = (dropdownName: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(dropdownName);
  };

  // Grace period timer (250ms) so moving mouse into dropdown never causes flicker or disappearance
  const handleMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimerRef.current = null;
    }, 250);
  };

  const handleTriggerClick = (dropdownName: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const closeAllDropdowns = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(null);
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
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const isSystemDesignActive = pathname.startsWith('/system-design') && !pathname.includes('/expedition');
  const isExpeditionsActive = pathname === '/expedition' || pathname.includes('/expedition');

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

          {/* Nav Links */}
          <nav>
            <ul className="nav-links">
              {/* System Design Dropdown with Master Directories */}
              <li
                className="nav-dropdown-wrapper"
                onMouseEnter={() => handleMouseEnter('system-design')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${isSystemDesignActive ? 'active' : ''}`}
                  onClick={() => handleTriggerClick('system-design')}
                  aria-expanded={activeDropdown === 'system-design'}
                >
                  <span>System Design</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                {activeDropdown === 'system-design' && (
                  <div
                    className="nav-dropdown-menu"
                    style={{ minWidth: 300 }}
                    onMouseEnter={() => handleMouseEnter('system-design')}
                    onMouseLeave={handleMouseLeave}
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
                )}
              </li>

              {/* Expeditions Dropdown: The 8,000M Summits Trilogy */}
              <li
                className="nav-dropdown-wrapper"
                onMouseEnter={() => handleMouseEnter('expeditions')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${isExpeditionsActive ? 'active' : ''}`}
                  onClick={() => handleTriggerClick('expeditions')}
                  aria-expanded={activeDropdown === 'expeditions'}
                >
                  <Mountain size={14} style={{ opacity: 0.85 }} />
                  <span>Expeditions</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                {activeDropdown === 'expeditions' && (
                  <div
                    className="nav-dropdown-menu"
                    style={{ minWidth: 320 }}
                    onMouseEnter={() => handleMouseEnter('expeditions')}
                    onMouseLeave={handleMouseLeave}
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
                )}
              </li>

              {/* Blog Link */}
              <li>
                <Link
                  href="/blog"
                  className={`nav-link ${pathname.startsWith('/blog') ? 'active' : ''}`}
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
