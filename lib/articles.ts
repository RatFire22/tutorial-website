import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tagClass: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured: boolean;
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface ArticleDetail extends ArticleMeta {
  content: string;
  toc: TocItem[];
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled Article',
        description: data.description || '',
        date: data.date || '',
        readTime: data.readTime || '5 min read',
        category: data.category || 'General',
        tagClass: data.tagClass || 'tag-react',
        tags: data.tags || [],
        author: data.author || {
          name: 'Vishwajeet Gupta',
          role: 'Founder, 2AMCoding',
          avatar: 'VG'
        },
        featured: Boolean(data.featured)
      };
    });

  // Sort by date or featured status
  return allArticles.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getArticleBySlug(slug: string): ArticleDetail | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    let fileContents: string;

    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdPath = path.join(articlesDirectory, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);

    // Generate Table of Contents
    const toc: TocItem[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const rawTitle = match[2].trim();
      const id = rawTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      toc.push({ id, title: rawTitle, level });
    }

    return {
      slug,
      title: data.title || 'Untitled Article',
      description: data.description || '',
      date: data.date || '',
      readTime: data.readTime || '5 min read',
      category: data.category || 'General',
      tagClass: data.tagClass || 'tag-react',
      tags: data.tags || [],
      author: data.author || {
        name: 'Vishwajeet Gupta',
        role: 'Founder, 2AMCoding',
        avatar: 'VG'
      },
      featured: Boolean(data.featured),
      content,
      toc
    };
  } catch {
    return null;
  }
}
