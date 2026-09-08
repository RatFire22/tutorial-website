import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Deep Dives — 2AMCoding',
  description: 'Browse the complete collection of technical articles, deep dives, system architectures, and engineering war stories.',
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="container" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Engineering Blog &amp; Deep Dives
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Thoughts, technical breakthroughs, and architectural guides written in the late-night flow state.
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
