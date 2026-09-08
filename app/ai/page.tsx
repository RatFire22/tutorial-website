import { Bot, Sparkles, Database, Cpu, ShieldCheck } from 'lucide-react';
import { getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import AIProblemDirectory from '@/components/AIProblemDirectory';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Master Directory — Autonomous Agents, RAG & LLM Systems | 2AMCoding',
  description: 'Master AI Engineering: Autonomous agent swarms, LangGraph state machines, hybrid RAG, Model Context Protocol (MCP), and production evals.',
};

export default function AIPage() {
  const articles = getAllArticles();
  const aiArticles = articles.filter(
    (a) =>
      a.category.toLowerCase().includes('ai') ||
      a.tags.some((t) => ['ai', 'agents', 'langgraph', 'mcp', 'rag', 'llm', 'evals'].includes(t.toLowerCase()))
  );

  return (
    <div className="container" style={{ padding: '5rem 1.5rem 6rem 1.5rem' }}>
      <header style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <div className="hero-badge-pill" style={{ marginBottom: '1rem', background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>
          <Sparkles size={14} />
          <span>AI Master Directory &amp; Autonomous Systems</span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          AI Master Directory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
          Production architectural blueprints for generative AI: autonomous agentic swarms, LangGraph state channels, hybrid RAG, MCP tool servers, and enterprise evals.
        </p>

        {/* Mount Everest Summit Expedition Banner */}
        <Link
          href="/expedition?summit=everest"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.1rem 1.75rem',
            maxWidth: '780px',
            width: '100%',
            background: 'linear-gradient(135deg, rgba(7, 10, 16, 0.95) 0%, rgba(45, 26, 6, 0.9) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-lg)',
            textDecoration: 'none',
            textAlign: 'left',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="card-interactive-hover"
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              <span>🏔️</span> HIMALAYAN EXPEDITION · 8,848M
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F4EFE6' }}>
              Mount Everest: Thirty pitches. The Roof of the World at 8,848M.
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94A3B8', marginTop: '0.2rem' }}>
              The high-altitude autonomous route: 6 camps, LangGraph state channels, MCP swarms, and self-healing reflexion.
            </div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#d97706', color: '#ffffff', padding: '0.55rem 1.1rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.825rem', flexShrink: 0 }}>
            <span>Climb Everest</span>
            <Bot size={14} />
          </div>
        </Link>
      </header>

      {/* AI Core Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Bot size={18} color="#d97706" /> Agentic State Machines
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Cyclic LangGraph state channels, persistent thread checkpointers, human-in-the-loop approvals, and dynamic tool routers.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Database size={18} color="#0284c7" /> Hybrid RAG &amp; Vector Stores
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Dense vector search (HNSW), sparse BM25 indexing, Reciprocal Rank Fusion, Cross-Encoder rerankers, and GraphRAG.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <Cpu size={18} color="#9333ea" /> Model Context Protocol (MCP)
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            Standardized JSON-RPC tool servers, multi-client routing swarms, supervisor delegation trees, and sandbox execution.
          </p>
        </div>

        <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="#16a34a" /> Evals, Guardrails &amp; Safety
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            LLM-as-a-judge harnesses, hallucination citation check, prompt injection jailbreak red-teaming, and semantic caching.
          </p>
        </div>
      </div>

      {aiArticles.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            AI Blueprints &amp; Architecture Guides
          </h2>

          <div className="cards-grid" style={{ marginBottom: '4rem' }}>
            {aiArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </>
      )}

      {/* Interactive 30-System AI Problem Directory & Curriculum */}
      <AIProblemDirectory />
    </div>
  );
}
