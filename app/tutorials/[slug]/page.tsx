import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import MDXContent from '@/components/MDXContent';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found — CodeCraft' };
  }

  return {
    title: `${article.title} — CodeCraft`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <div className="container">
        {/* Article Header */}
        <header className="article-page-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to All Tutorials</span>
          </Link>

          <h1 className="article-headline">{article.title}</h1>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {article.tags.map((tag) => (
              <span key={tag} className={`tag-badge ${article.tagClass}`}>
                {tag}
              </span>
            ))}
          </div>

          <div className="article-header-meta">
            <div className="author-full-meta">
              <div className="author-full-avatar">{article.author.avatar}</div>
              <div className="author-full-info">
                <h4>{article.author.name}</h4>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={13} /> {article.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} /> {article.readTime}
                  </span>
                </p>
              </div>
            </div>

            <ShareButtons title={article.title} />
          </div>
        </header>

        {/* Content & Sticky TOC */}
        <div className="article-content-wrapper">
          <div>
            <MDXContent source={article.content} />
          </div>

          <TableOfContents toc={article.toc} />
        </div>

        {/* Related Tutorials Section */}
        {relatedArticles.length > 0 && (
          <section style={{ margin: '3rem 0 6rem 0', borderTop: '1px solid var(--border-subtle)', paddingTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              More Guides to Explore
            </h3>
            <div className="cards-grid">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
