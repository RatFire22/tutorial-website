'use client';

import React, { useEffect } from 'react';

interface PitchItem {
  stopNum: string;
  index: number;
  t: string;
  tech: string;
  d: string;
}

interface StageItem {
  id: string;
  waypoint: string;
  alt: string;
  baro: string;
  sub: string;
  brief: string;
  hazard?: boolean;
  pinnacle?: boolean;
  pitches: PitchItem[];
}

const rawStages = [
  {
    id: "foundations",
    waypoint: "Base Camp",
    alt: "ELEV 5,364M",
    baro: "530 hPa · TRAILHEAD",
    sub: "Stage 01: Foundations & The Model Protocol",
    brief: "Before navigating dynamic ice falls, understand your primary ropes: message schemas, raw byte streaming, and structured token validation.",
    pitches: [
      { t: "CLI LLM Chatbot", tech: "Python · Anthropic/OpenAI APIs · Pydantic", d: "A terminal interface where message objects, system prompts, context truncation, and raw token counters stop being theoretical." },
      { t: "Streaming Chat API", tech: "FastAPI · Asyncio · Server-Sent Events (SSE)", d: "Engineered for real-time token delivery over HTTP. First exposure to async concurrency under severe latency constraints." },
      { t: "Structured Output Extractor", tech: "Pydantic · Function Schemas · JSON Mode", d: "Coerce probabilistic LLM completions into strictly verified JSON models. The core dependency of all production data extractors." },
      { t: "Multi-Model Gateway", tech: "LangChain · Gemini · Claude · Ollama", d: "One unified interface supporting failovers and drop-in provider replacements. Eliminates vendor lock-in at the root." },
      { t: "LLM Cost & Latency Auditor", tech: "FastAPI · PostgreSQL · Redis", d: "Accounting system capturing token volume, millisecond latencies, and real-time dollar expense per request." }
    ]
  },
  {
    id: "rag",
    waypoint: "Khumbu Icefall & Camp I",
    alt: "ELEV 6,065M",
    baro: "475 hPa · ACTIVE HAZARD",
    sub: "Stage 02: Tools, Tool-Calling & Dense Retrieval",
    brief: "Give the model physical hands and a grounded memory library. If your retrieval is noisy, your agent will hallucinate across the crevasse.",
    pitches: [
      { t: "Tool-Calling Engine", tech: "LangChain Core · Pydantic Tools", d: "Calculator, web query, and system inspectors. The core re-prompt loop that forms the basis of all future autonomy." },
      { t: "Safe SQL Execution Agent", tech: "LangGraph · PostgreSQL · AST Parsers", d: "Natural language translation into executable SQL queries with strict query sanitization and read-only schema locks." },
      { t: "Basic Vector RAG", tech: "ChromaDB / pgvector · Semantic Chunking", d: "Document ingestion, embeddings, chunking strategies, and semantic retrieval over private technical documentation." },
      { t: "Production Citation RAG", tech: "LangChain · PostgreSQL + pgvector", d: "Add strict metadata filtering and character-level verifiable source citations to convert a toy demo into a compliant enterprise system." },
      { t: "Hybrid Search & Reranking", tech: "BM25 · Cross-Encoder Reranker · pgvector", d: "Dense vector retrieval coupled with sparse lexical search and cross-encoder score normalization for production search accuracy." }
    ]
  },
  {
    id: "agents",
    waypoint: "Camp II: The Western Cwm",
    alt: "ELEV 6,400M",
    baro: "440 hPa · VALLEY OF SILENCE",
    sub: "Stage 03: Autonomous Loops & State Machines",
    brief: "Transitioning from rigid pipelines to autonomous graphs where the model determines its own iteration pathways, edges, and memory checkpoints.",
    pitches: [
      { t: "Iterative Web Researcher", tech: "LangGraph · Web Search APIs", d: "Autonomous multi-step discovery: formulate queries, extract search findings, evaluate confidence, and draft research briefs." },
      { t: "Customer Resolution Agent", tech: "LangGraph · FastAPI · Document Store", d: "Orchestrate real support ticket resolution using multi-modal tooling and real-time contextual policy manuals." },
      { t: "Custom StateGraph Loop", tech: "LangGraph · Raw Python States", d: "Build an autonomous cyclic graph from scratch: implement state channels, nodes, edges, and conditional routing logic." },
      { t: "Durable Stateful Agent", tech: "PostgreSQL Checkpointers · Redis", d: "Thread checkpointing allowing multi-turn conversations and long-running execution graphs to survive cluster restarts." },
      { t: "Human-in-the-Loop Interrupter", tech: "LangGraph Interrupts · Webhooks", d: "Strategic approval checkpoints that halt agent execution graphs before executing irreversible real-world transactions." },
      { t: "Long-Term Memory Vault", tech: "Vector DB · Semantic Memory Router", d: "Partitioned conversational state: episodic conversation buffers combined with associative long-term memory retrieval." }
    ]
  },
  {
    id: "mcp",
    waypoint: "Camp III: The Lhotse Face",
    alt: "ELEV 7,200M",
    baro: "380 hPa · SHEER BLUE ICE",
    sub: "Stage 04: The Model Context Protocol (MCP) & Multi-Agent Swarms",
    brief: "Single agents hit performance ceilings. Scale operations by dividing responsibilities across modular specialists connected through unified protocols.",
    pitches: [
      { t: "Custom MCP Server", tech: "MCP Python SDK · AsyncIO", d: "Expose internal company databases and custom endpoints through the industry-standard Model Context Protocol." },
      { t: "Multi-MCP Client Gateway", tech: "LangGraph · MCP Ecosystem", d: "A master agent capable of dynamically discovering tools across decentralized GitHub, Slack, and Jira MCP servers." },
      { t: "Hierarchical Research Swarm", tech: "LangGraph · Supervisor Architectures", d: "A supervisor agent coordinating specialized sub-agents: Web Ingestor, Quantitative Analyst, and Lead Editor." },
      { t: "Deep Research Autonomous Engine", tech: "Deep Agents · Tree Planning · MCP", d: "Multi-hour recursive exploration systems that adaptively expand research scope while aggressively pruning irrelevant context." },
      { t: "Autonomous Coding Agent", tech: "Docker Engine · Python AST · Terminal MCP", d: "An agent that inspects source trees, writes patches, executes tests in sandboxes, and loops until tests pass." },
      { t: "Full Software Engineering Pod", tech: "LangGraph · Git Integrations · Test Harnesses", d: "Emulate a software squad: PRD Author → System Architect → Code Engine → Test Reviewer." }
    ]
  },
  {
    id: "reliability",
    waypoint: "South Col & The Death Zone",
    alt: "ELEV 7,906M",
    baro: "355 hPa · CRITICAL SURVIVAL",
    sub: "Stage 05: Hardened Reliability, Sandboxing & Observability",
    brief: "The altitude where most agents die. Hardened telemetry, zero-trust sandboxes, and circuit-breaker designs to withstand unexpected failures.",
    hazard: true,
    pitches: [
      { t: "Agent Evaluation Matrix", tech: "LangSmith · Pytest · Synthetic Datasets", d: "Automated regression testing. Measure accuracy, drift, tool call fidelity, and output conformity on every git commit." },
      { t: "Full Trace Observability Hub", tech: "LangSmith · OpenTelemetry · Tracing", d: "Correlate every step, LLM completion, token footprint, and tool latency to debug production failures instantly." },
      { t: "Fault-Tolerant Resilient Agent", tech: "LangGraph · Circuit Breakers · Exponential Backoff", d: "Self-healing architectures that gracefully degrade during API outages, rate limits, or network partitions." },
      { t: "Durable Background Daemon", tech: "Redis Queue · Cron · Distributed Checkpoints", d: "Agents running as non-terminating system daemons, executing periodic audits and autonomous data operations." },
      { t: "Zero-Trust Code Sandbox", tech: "Docker Engine · gVisor / Firecracker · cgroups", d: "Hermetically sealed, resource-constrained environments to execute untrusted agent-written code securely." }
    ]
  },
  {
    id: "summit",
    waypoint: "The Hillary Step to Summit",
    alt: "ELEV 8,848M",
    baro: "314 hPa · HIGHEST POINT ON EARTH",
    sub: "Stage 06: Production Enterprise Platforms",
    brief: "Zoom out from individual agents to the cloud-scale infrastructure required to orchestrate, isolate, and serve enterprise AI fleets.",
    pinnacle: true,
    pitches: [
      { t: "Scalable Agent Service Platform", tech: "Kubernetes · FastAPI · Redis Clusters", d: "High-throughput, multi-tenant agent execution platform with elastic horizontal auto-scaling and connection pooling." },
      { t: "Enterprise Incident Responder", tech: "LangGraph · Jira/Slack APIs · Trace Logs", d: "A mission-critical agent that triages production incidents, queries telemetry logs, inspects PRs, and drafts RCAs." },
      { t: "Autonomous AI Engineering Platform", tech: "Full Technical Stack Consolidated", d: "The complete enterprise ecosystem: multi-agent runtime, dynamic sandboxing, MCP gateways, and real-time observability." }
    ]
  }
];

// Precompute pitch indexes immutably
let counter = 0;
const expeditionRoute: StageItem[] = rawStages.map((stage) => ({
  ...stage,
  pitches: stage.pitches.map((p) => {
    counter += 1;
    return {
      ...p,
      index: counter,
      stopNum: String(counter).padStart(2, '0')
    };
  })
}));

export default function ExpeditionClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const pitchElements = document.querySelectorAll('.pitch');
    pitchElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="expedition-root">
      {/* Hero Section */}
      <div className="exp-wrap exp-hero">
        <div className="exp-badge-cluster">
          <div className="expedition-pill">Himalayan Route Standard</div>
          <div className="coord-pill">27°59&apos;17&quot;N · 86°55&apos;31&quot;E · SOUTH COL ROUTE</div>
        </div>

        <h1>
          Thirty pitches.<br />
          One <em>summit</em> at 8,848M.
        </h1>

        <div className="exp-hero-sub-grid">
          <p className="lede">
            You do not master autonomous agents by watching tutorials from sea level. You learn them on the rock face—debugging context bloat, recovering from infinite tool loops, and engineering deterministic behavior from stochastic models. This is your technical route from Base Camp to the Everest Summit.
          </p>
          <div className="exp-hero-stats">
            <div className="exp-stat-item">
              <span>Vertical Rise</span>
              <strong>3,484m</strong>
            </div>
            <div className="exp-stat-item">
              <span>Waypoints</span>
              <strong>6 Camps</strong>
            </div>
            <div className="exp-stat-item">
              <span>Crux Pitch</span>
              <strong>Stop 27</strong>
            </div>
          </div>
        </div>

        {/* Topo Ridge Vector */}
        <div className="topo-strip">
          <svg className="topo-svg" viewBox="0 0 1000 140" preserveAspectRatio="none">
            <defs>
              <linearGradient id="topo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              className="ridge-line"
              d="M0,130 L160,110 L300,95 L460,70 L620,52 L780,30 L900,18 L1000,4"
            />
          </svg>
        </div>
      </div>

      {/* Expedition Trail */}
      <div className="expedition-trail">
        <div className="fixed-line" />
        <div className="exp-wrap">
          {expeditionRoute.map((stage) => {
            return (
              <div key={stage.waypoint}>
                {/* Milestone Waypoint */}
                <div id={stage.id} className="waypoint" style={{ scrollMarginTop: '100px' }}>
                  <div className="waypoint-badge">
                    <span className="alt-metric">{stage.alt}</span>
                    <span className="baro-metric">{stage.baro}</span>
                  </div>
                  <h2>{stage.waypoint}</h2>
                  <div className="waypoint-sub">{stage.sub}</div>
                  <p className="waypoint-brief">{stage.brief}</p>
                </div>

                {/* Pitch Stations */}
                <div className="pitches">
                  {stage.pitches.map((p) => {
                    const isPort = p.index % 2 !== 0;
                    const sideClass = isPort ? 'port' : 'starboard';
                    const hazardClass = stage.hazard ? 'deathzone' : '';
                    const pinnacleClass = stage.pinnacle ? 'summit-ridge' : '';

                    return (
                      <div
                        key={p.t}
                        className={`pitch ${sideClass} ${hazardClass} ${pinnacleClass}`}
                      >
                        {isPort ? (
                          <>
                            <div className="pitch-card">
                              <div className="pitch-meta">
                                <span className="pitch-station">PITCH {p.stopNum}</span>
                              </div>
                              <h3>{p.t}</h3>
                              <div className="pitch-gear">{p.tech}</div>
                              <p className="pitch-desc">{p.d}</p>
                            </div>
                            <div className="carabiner" />
                            <div />
                          </>
                        ) : (
                          <>
                            <div />
                            <div className="carabiner" />
                            <div className="pitch-card">
                              <div className="pitch-meta">
                                <span className="pitch-station">PITCH {p.stopNum}</span>
                              </div>
                              <h3>{p.t}</h3>
                              <div className="pitch-gear">{p.tech}</div>
                              <p className="pitch-desc">{p.d}</p>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summit Pinnacle */}
      <div className="exp-wrap summit-pinnacle">
        <div className="prayer-flags">
          <div className="flag-tag flag-blue" />
          <div className="flag-tag flag-white" />
          <div className="flag-tag flag-red" />
          <div className="flag-tag flag-green" />
          <div className="flag-tag flag-yellow" />
        </div>
        <h2>Summit: 8,848 Meters</h2>
        <p>
          You are no longer an engineer wrapper-calling proprietary APIs. You are an infrastructure architect running reliable, observable autonomous swarms at enterprise scale.
        </p>
      </div>

      {/* Logbook */}
      <div className="exp-wrap">
        <div className="logbook">
          <h3>Expedition Protocol &amp; Principles</h3>
          <ul>
            <li>
              <strong>Respect the Death Zone (Stops 23–27):</strong> Most developers rush into multi-agent swarms and die on unhandled network timeouts, non-deterministic loops, or missing idempotency keys. Reliability isn&apos;t an afterthought—it&apos;s your oxygen tank.
            </li>
            <li>
              <strong>Build without sherpas first (Stop 13):</strong> Framework abstractions will rescue you until they swallow a critical stack trace. Hand-crafting an agent graph with raw state vectors is what separates real engineers from prompt wrappers.
            </li>
            <li>
              <strong>Carry production-weight telemetry:</strong> Stop 24 (OpenTelemetry tracing) feels pedantic during local development. In production, an untraced agent loop will burn thousands in model credits before your alerting pipeline even notices.
            </li>
          </ul>
        </div>
      </div>

      <footer className="exp-footer">
        ROUTE DISPATCH · KHUMBU TO CHOMOLUNGMA SUMMIT · ASCENT COMPLETE · 2AMCODING
      </footer>
    </div>
  );
}
