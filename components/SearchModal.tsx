'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { ArticleMeta } from '@/lib/articles';

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
        } else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? articles.slice(0, 4)
    : articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-input-row">
          <Search size={20} color="var(--text-muted)" />
          <input
            type="text"
            className="search-modal-input"
            placeholder="Search tutorials, topics, concepts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
            <X size={16} />
          </button>
        </div>

        <div className="search-modal-results">
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No tutorials found matching &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="search-result-item"
                onClick={onClose}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="search-result-title">{item.title}</div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
                <div className="search-result-desc">{item.description}</div>
                <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.4rem' }}>
                  <span className={`tag-badge ${item.tagClass}`} style={{ fontSize: '0.7rem' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.readTime}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
