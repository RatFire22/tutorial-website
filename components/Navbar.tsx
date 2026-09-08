'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Moon, ChevronDown, Mountain } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { ArticleMeta } from '@/lib/articles';

export default function Navbar({ articles = [] }: { articles?: ArticleMeta[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navHeaderRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (dropdownName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      closeAllDropdowns();
    }, 75);
  };

  const handleTriggerClick = (dropdownName: string, e?: React.MouseEvent) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (e && e.currentTarget instanceof HTMLElement) {
      e.currentTarget.blur();
    }
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const closeAllDropdowns = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isSystemDesignActive = pathname.startsWith('/system-design') && !pathname.includes('/expedition');
  const isLearnAiActive = pathname === '/ai' || pathname.startsWith('/ai');
  const isExpeditionsActive = pathname === '/expedition' || pathname.includes('/expedition');
  const isBlogActive = pathname.startsWith('/blog');

  return (
    <>
      <header className="header-nav" ref={navHeaderRef}>
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" className="brand-logo" onClick={closeAllDropdowns} onMouseEnter={closeAllDropdowns}>
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
                onMouseEnter={() => handleMouseEnter('system-design')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${isSystemDesignActive ? 'active' : ''}`}
                  onClick={(e) => handleTriggerClick('system-design', e)}
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
                </div>
              </li>

              {/* 2. Learn AI Link (Direct Link to AI Master Directory) */}
              <li onMouseEnter={closeAllDropdowns}>
                <Link
                  href="/ai"
                  className={`nav-link ${isLearnAiActive ? 'active' : ''}`}
                  onClick={closeAllDropdowns}
                >
                  Learn AI
                </Link>
              </li>

              {/* 3. Expeditions Dropdown: The 8,000M Summits Trilogy */}
              <li
                className={`nav-dropdown-wrapper ${openDropdown === 'expeditions' ? 'open' : ''}`}
                onMouseEnter={() => handleMouseEnter('expeditions')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${isExpeditionsActive ? 'active' : ''}`}
                  onClick={(e) => handleTriggerClick('expeditions', e)}
                  aria-expanded={openDropdown === 'expeditions'}
                >
                  <Mountain size={14} style={{ opacity: 0.85 }} />
                  <span>Expeditions</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                <div
                  className="nav-dropdown-menu"
                  style={{ minWidth: 350 }}
                >
                  <Link
                    href="/expedition?summit=everest"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                    style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', alignItems: 'center' }}
                  >
                    <Image
                      src="/images/summits/everest.jpg"
                      alt="Mount Everest"
                      width={48}
                      height={48}
                      style={{
                        borderRadius: '6px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="dropdown-item-title">
                        <span>Mount Everest · AI</span>
                        <span style={{ fontSize: '0.65rem', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,848M</span>
                      </div>
                      <div className="dropdown-item-desc">
                        Autonomous AI &amp; LLM Engineering: 6 Camps, 30 Pitches
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/system-design/hld/expedition"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                    style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', alignItems: 'center' }}
                  >
                    <Image
                      src="/images/summits/k2.jpg"
                      alt="K2 Savage Mountain"
                      width={48}
                      height={48}
                      style={{
                        borderRadius: '6px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="dropdown-item-title">
                        <span>K2 · High-Level Design</span>
                        <span style={{ fontSize: '0.65rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,611M</span>
                      </div>
                      <div className="dropdown-item-desc">
                        The Savage Summit: 24 Pitches of Distributed Scale &amp; Raft
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/system-design/lld/expedition"
                    className="nav-dropdown-item"
                    onClick={closeAllDropdowns}
                    style={{ display: 'flex', flexDirection: 'row', gap: '0.75rem', alignItems: 'center' }}
                  >
                    <Image
                      src="/images/summits/kangchenjunga.jpg"
                      alt="Kangchenjunga"
                      width={48}
                      height={48}
                      style={{
                        borderRadius: '6px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid rgba(99, 102, 241, 0.4)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="dropdown-item-title">
                        <span>Kangchenjunga · Low-Level Design</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>8,586M</span>
                      </div>
                      <div className="dropdown-item-desc">
                        The Five Treasures: 20 Pitches of Clean Architecture &amp; SOLID
                      </div>
                    </div>
                  </Link>
                </div>
              </li>

              {/* 4. Blog Link */}
              <li onMouseEnter={closeAllDropdowns}>
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
          <div className="nav-actions" onMouseEnter={closeAllDropdowns}>
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
