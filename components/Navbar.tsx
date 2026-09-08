'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Moon, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { ArticleMeta } from '@/lib/articles';

export default function Navbar({ articles = [] }: { articles?: ArticleMeta[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
              {/* System Design Dropdown with LLD & HLD */}
              <li
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${pathname.startsWith('/system-design') ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                >
                  <span>System Design</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                {isDropdownOpen && (
                  <div className="nav-dropdown-menu">
                    <Link
                      href="/system-design/lld"
                      className="nav-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="dropdown-item-title">
                        <span>LLD</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>Low-Level</span>
                      </div>
                      <div className="dropdown-item-desc">
                        OOP, design patterns, concurrency &amp; clean code
                      </div>
                    </Link>

                    <Link
                      href="/system-design/hld"
                      className="nav-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="dropdown-item-title">
                        <span>HLD</span>
                        <span style={{ fontSize: '0.7rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>High-Level</span>
                      </div>
                      <div className="dropdown-item-desc">
                        Distributed systems, microservices &amp; cloud scale
                      </div>
                    </Link>

                    <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                    <Link
                      href="/system-design"
                      className="nav-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="dropdown-item-title" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                        Overview &amp; Core Pillars
                      </div>
                    </Link>
                  </div>
                )}
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
                  href="/tutorials"
                  className={`nav-link ${pathname === '/tutorials' || pathname === '/' ? 'active' : ''}`}
                >
                  Tutorials
                </Link>
              </li>
              {/* Services Dropdown */}
              <li
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-dropdown-trigger ${pathname.startsWith('/services') ? 'active' : ''}`}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  aria-expanded={isServicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown size={14} className="chevron" />
                </button>

                {isServicesOpen && (
                  <div className="nav-dropdown-menu" style={{ minWidth: 260 }}>
                    <Link
                      href="/services#resume-review"
                      className="nav-dropdown-item"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <div className="dropdown-item-title">
                        <span>Resume Review</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'var(--primary-light)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>48h</span>
                      </div>
                      <div className="dropdown-item-desc">
                        Line-by-line audit &amp; ATS keyword optimization
                      </div>
                    </Link>

                    <Link
                      href="/services#one-on-one"
                      className="nav-dropdown-item"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <div className="dropdown-item-title">
                        <span>1-on-1 Call</span>
                        <span style={{ fontSize: '0.7rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>60 Mins</span>
                      </div>
                      <div className="dropdown-item-desc">
                        Career roadmapping, staff level guidance &amp; Q&amp;A
                      </div>
                    </Link>

                    <Link
                      href="/services#mock-interview"
                      className="nav-dropdown-item"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <div className="dropdown-item-title">
                        <span>Mock Interview</span>
                        <span style={{ fontSize: '0.7rem', color: '#ea580c', background: 'rgba(234, 88, 12, 0.15)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>Live Round</span>
                      </div>
                      <div className="dropdown-item-desc">
                        HLD, LLD &amp; coding rounds with structured feedback
                      </div>
                    </Link>

                    <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0.2rem 0' }} />

                    <Link
                      href="/services"
                      className="nav-dropdown-item"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <div className="dropdown-item-title" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                        All Services &amp; Advisory
                      </div>
                    </Link>
                  </div>
                )}
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
