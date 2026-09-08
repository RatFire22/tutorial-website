'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Moon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { ArticleMeta } from '@/lib/articles';

export default function Navbar({ articles = [] }: { articles?: ArticleMeta[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="header-nav">
        <div className="container nav-inner">
          {/* Logo */}
          <Link href="/" className="brand-logo">
            <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #0284c7 100%)' }}>
              <Moon size={16} color="#facc15" fill="#facc15" />
            </div>
            <span>2AMCoding</span>
          </Link>

          {/* Nav Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link
                  href="/"
                  className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className={`nav-link ${pathname.startsWith('/tutorials') && pathname !== '/' ? 'active' : ''}`}
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/system-design"
                  className={`nav-link ${pathname === '/system-design' ? 'active' : ''}`}
                >
                  System Design
                </Link>
              </li>
              <li>
                <Link
                  href="/expedition"
                  className={`nav-link ${pathname === '/expedition' ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Learn AI</span>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', padding: '1px 6px', borderRadius: '999px', border: '1px solid rgba(245, 158, 11, 0.3)', fontWeight: 700 }}>8,848M</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                >
                  About
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
