'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, BookOpen, Layers, Network, Mountain } from 'lucide-react';
import { ArticleMeta } from '@/lib/articles';
import { SearchItem, hldDirectoryItems, lldDirectoryItems, getSummitSearchItems } from '@/lib/searchIndex';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: ArticleMeta[];
}

export default function SearchModal({ isOpen, onClose, articles }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compile universal omnisearch database
  const universalItems = useMemo<SearchItem[]>(() => {
    const articleItems: SearchItem[] = articles.map((a) => ({
      id: `art-${a.slug}`,
      title: a.title,
      subtitle: `${a.category} · ${a.readTime} · ${a.description}`,
      url: `/blog/${a.slug}`,
      category: 'Article',
      badgeColor: '#16a34a',
      keywords: [a.title, a.description, a.category, ...a.tags],
    }));

    const summitItems = getSummitSearchItems();

    return [...articleItems, ...hldDirectoryItems, ...lldDirectoryItems, ...summitItems];
  }, [articles]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filtered = trimmed === ''
    ? universalItems.slice(0, 6)
    : universalItems.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(trimmed);
        const subtitleMatch = item.subtitle.toLowerCase().includes(trimmed);
        const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(trimmed));
        return titleMatch || subtitleMatch || keywordMatch;
      }).slice(0, 10);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Article':
        return <BookOpen size={13} color="#16a34a" />;
      case 'HLD System':
        return <Network size={13} color="#0284c7" />;
      case 'LLD Problem':
        return <Layers size={13} color="#6366F1" />;
      case 'Summit Pitch':
        return <Mountain size={13} color="#F59E0B" />;
      default:
        return <Search size={13} />;
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="search-modal-input-row">
          <Search size={20} color="var(--text-muted)" />
          <input
            type="text"
            className="search-modal-input"
            placeholder="Omnisearch: articles, 32 HLD systems, 12 LLD problems, 8,000M pitches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
            <X size={16} />
          </button>
        </div>

        {/* Omnisearch Category Badges */}
        <div style={{ padding: '0.6rem 1.25rem', display: 'flex', gap: '0.4rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Index:</span>
          <span style={{ fontSize: '0.725rem', color: '#16a34a', fontWeight: 600 }}>Articles</span>
          <span style={{ color: 'var(--border-subtle)' }}>·</span>
          <span style={{ fontSize: '0.725rem', color: '#0284c7', fontWeight: 600 }}>32 HLD Systems</span>
          <span style={{ color: 'var(--border-subtle)' }}>·</span>
          <span style={{ fontSize: '0.725rem', color: '#6366F1', fontWeight: 600 }}>12 LLD Problems</span>
          <span style={{ color: 'var(--border-subtle)' }}>·</span>
          <span style={{ fontSize: '0.725rem', color: '#F59E0B', fontWeight: 600 }}>74 Summit Pitches</span>
        </div>

        <div className="search-modal-results" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No matches found across articles, blueprints, or summits for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="search-result-item"
                onClick={onClose}
                style={{ padding: '0.85rem 1.25rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.675rem', fontWeight: 700, textTransform: 'uppercase', color: item.badgeColor, background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </div>
                    <div className="search-result-title" style={{ fontSize: '0.95rem' }}>
                      {item.title}
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                </div>
                <div className="search-result-desc" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  {item.subtitle}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
