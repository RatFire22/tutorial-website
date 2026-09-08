import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Guides & Tutorials — 2AMCoding',
  description: 'Browse the complete archive of technical guides, system architecture breakdowns, and frontend patterns.',
};

export default function TutorialsPage() {
  const articles = getAllArticles();

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          All Technical Tutorials
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          A complete, curated repository of deep technical tutorials, architectural walkthroughs, and practical guides.
        </p>
      </header>

      <div className="cards-grid">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
