import type { Metadata } from 'next';
import ExpeditionClient from '@/app/expedition/ExpeditionClient';
import '@/app/expedition/expedition.css';

export const metadata: Metadata = {
  title: 'Kangchenjunga: 8,586M — The Low-Level Design & Code Craftsmanship Expedition | 2AMCoding',
  description: 'The Five Treasures of Great Snow. 20 pitches from Yalung Base Camp to the 8,586M Summit of SOLID, Design Patterns & Thread Safety.',
  openGraph: {
    title: 'Kangchenjunga: 8,586M — The Low-Level Design Expedition',
    description: 'Claim the Five Treasures of Software Craftsmanship: SOLID, Design Patterns & Concurrency.',
  },
};

export default function KangchenjungaExpeditionPage() {
  return <ExpeditionClient initialSummit="kangchenjunga" />;
}
