import type { Metadata } from 'next';
import ExpeditionClient from './ExpeditionClient';
import './expedition.css';

export const metadata: Metadata = {
  title: 'Chomolungma: 8,848M — An AI Engineering Expedition | 2AMCoding',
  description: 'Thirty pitches. One summit at 8,848M. Your technical roadmap from Base Camp to the Everest Summit of Autonomous AI Engineering.',
  openGraph: {
    title: 'Chomolungma: 8,848M — An AI Engineering Expedition',
    description: 'Thirty pitches from Base Camp to the 8,848M Summit of Autonomous AI Engineering.',
  },
};

export default function ExpeditionPage() {
  return <ExpeditionClient />;
}
