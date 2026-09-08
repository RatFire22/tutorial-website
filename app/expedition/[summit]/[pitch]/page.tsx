import { notFound } from 'next/navigation';
import { getPitchDetail, getAllPitchParams } from '@/lib/summitsData';
import { getAllArticles } from '@/lib/articles';
import PitchClient from './PitchClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPitchParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ summit: string; pitch: string }>;
}): Promise<Metadata> {
  const { summit, pitch } = await params;
  const detail = getPitchDetail(summit, pitch);

  if (!detail) {
    return {
      title: 'Pitch Not Found — 2AMCoding Expeditions',
    };
  }

  return {
    title: `Pitch ${detail.pitch.stopNum}: ${detail.pitch.t} — ${detail.summit.name} (${detail.summit.elevation}) | 2AMCoding`,
    description: `${detail.pitch.d} Part of ${detail.summit.name} ${detail.summit.domain} alpine expedition.`,
    openGraph: {
      title: `Pitch ${detail.pitch.stopNum}: ${detail.pitch.t} — ${detail.summit.name}`,
      description: detail.pitch.d,
      type: 'article',
    },
  };
}

export default async function PitchPage({
  params,
}: {
  params: Promise<{ summit: string; pitch: string }>;
}) {
  const { summit, pitch } = await params;
  const detail = getPitchDetail(summit, pitch);

  if (!detail) {
    notFound();
  }

  const articles = getAllArticles();
  const pitchTitleLower = detail.pitch.t.toLowerCase();
  const pitchTechLower = detail.pitch.tech.toLowerCase();

  // Match relevant published article if available
  const relatedArticle =
    articles.find((a) => {
      const title = a.title.toLowerCase();
      const tags = a.tags.map((t) => t.toLowerCase());

      if (pitchTitleLower.includes('langgraph') || pitchTechLower.includes('langgraph')) {
        return tags.includes('langgraph');
      }
      if (pitchTitleLower.includes('rate limit') || pitchTechLower.includes('rate limit')) {
        return tags.includes('rate limiter');
      }
      if (pitchTitleLower.includes('cache') || pitchTechLower.includes('cache')) {
        return tags.includes('redis') || tags.includes('caching');
      }
      if (pitchTitleLower.includes('notification') || pitchTechLower.includes('notification')) {
        return title.includes('notification');
      }
      if (pitchTitleLower.includes('parking') || pitchTechLower.includes('parking')) {
        return title.includes('parking');
      }
      if (pitchTitleLower.includes('scheduler') || pitchTechLower.includes('scheduler')) {
        return title.includes('scheduler');
      }
      return false;
    }) || null;

  return <PitchClient detail={detail} relatedArticle={relatedArticle} />;
}
