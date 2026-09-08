import Link from 'next/link';
import { Clock } from 'lucide-react';
import { ArticleMeta } from '@/lib/articles';

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="article-card">
      <div className="card-top-meta">
        <span className={`tag-badge ${article.tagClass}`}>
          {article.category}
        </span>
        <div className="reading-time">
          <Clock size={13} />
          <span>{article.readTime}</span>
        </div>
      </div>

      <Link href={`/blog/${article.slug}`}>
        <h3 className="card-title">{article.title}</h3>
      </Link>

      <p className="card-description">{article.description}</p>

      <div className="card-footer">
        <div className="author-meta">
          <div className="author-avatar">{article.author.avatar}</div>
          <div>
            <div className="author-name">{article.author.name}</div>
          </div>
        </div>
        <div className="card-date">{article.date}</div>
      </div>
    </article>
  );
}
