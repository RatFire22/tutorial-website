import type { Metadata } from 'next';
import ExpeditionClient from './ExpeditionClient';
import './expedition.css';

export const metadata: Metadata = {
  title: 'The 8,000M Summits of Engineering — Everest, K2 & Kangchenjunga | 2AMCoding',
  description: 'Three legendary Himalayan ascents: Mount Everest (8,848M AI), K2 (8,611M HLD), and Kangchenjunga (8,586M LLD). Your rock-face technical roadmaps.',
  openGraph: {
    title: 'The 8,000M Summits of Engineering — Everest, K2 & Kangchenjunga',
    description: 'Three summits: Mount Everest (8,848M AI), K2 (8,611M HLD), and Kangchenjunga (8,586M LLD).',
  },
};

export default function ExpeditionPage() {
  return <ExpeditionClient />;
}
