import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
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
    return { title: 'Article Not Found — 2AMCoding' };
  }

  return {
    title: `${article.title} — 2AMCoding`,
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
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <div className="container">
        {/* Article Header */}
        <header className="article-page-header">
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

        {/* Previous & Next Article Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            margin: '3.5rem 0 2rem 0',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {prevArticle ? (
            <Link
              href={`/blog/${prevArticle.slug}`}
              style={{
                padding: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="card-interactive-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                <ArrowLeft size={13} />
                <span>PREVIOUS BLUEPRINT</span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {prevArticle.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                {prevArticle.category} · {prevArticle.readTime}
              </div>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/blog/${nextArticle.slug}`}
              style={{
                padding: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'right',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="card-interactive-hover"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>
                <span>NEXT BLUEPRINT</span>
                <ArrowRight size={13} />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                {nextArticle.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>
                {nextArticle.category} · {nextArticle.readTime}
              </div>
            </Link>
          ) : <div />}
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section style={{ margin: '2rem 0 6rem 0', borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              More Articles from the Blog
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
