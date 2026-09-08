import type { Metadata } from 'next';
import ExpeditionClient from '@/app/expedition/ExpeditionClient';
import '@/app/expedition/expedition.css';

export const metadata: Metadata = {
  title: 'K2: 8,611M — The High-Level Design & Distributed Systems Expedition | 2AMCoding',
  description: 'The Savage Mountain of Software Engineering. 24 pitches from Godwin-Austen Base Camp to the 8,611M Summit of Global Distributed Architecture.',
  openGraph: {
    title: 'K2: 8,611M — The Distributed Systems Expedition',
    description: 'Scale the Savage Mountain of Distributed Systems: Partitioning, Kafka, Consensus & Multi-Region Scale.',
  },
};

export default function K2ExpeditionPage() {
  return <ExpeditionClient initialSummit="k2" />;
}
