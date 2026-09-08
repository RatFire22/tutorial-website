'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

export interface AIProblem {
  id: string;
  title: string;
  stageNum: string;
  category: 'Foundations & Streaming' | 'RAG & Retrieval' | 'Autonomous Agents' | 'MCP & Swarms' | 'Evals & Reliability' | 'Production Platforms';
  summary: string;
  tech: string;
  patterns: string[];
  specs: {
    latency: string;
    tokenBudget: string;
    contextWindow: string;
    primaryRisk: string;
  };
  blueprint: {
    pipeline: string[];
    keyComponents: string[];
    failureMitigation: string;
    sampleCodeSnippet?: string;
  };
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced' | 'Enterprise/Staff';
  articleSlug?: string;
}

export const aiProblems: AIProblem[] = [
  {
    id: 'cli-llm-chatbot',
    title: 'CLI LLM Chatbot with Context Management',
    stageNum: '01',
    category: 'Foundations & Streaming',
    summary: 'A robust terminal interface managing message object schemas, system prompts, rolling token counters, and sliding-window context truncation.',
    tech: 'Python · Anthropic / OpenAI APIs · Pydantic · Tiktoken',
    patterns: ['Token Counting', 'Context Truncation', 'Message Schemas', 'Graceful Degradation'],
    specs: {
      latency: '< 400ms TTFT',
      tokenBudget: '4k tokens/turn',
      contextWindow: '128k context',
      primaryRisk: 'Context blowout causing 400 Bad Request error',
    },
    blueprint: {
      pipeline: ['User Stdin', 'Token Validation & Truncation Buffer', 'Model API Request', 'Streaming Token Consumer', 'Stdout Render'],
      keyComponents: ['Tiktoken counter', 'Sliding window buffer', 'JSON system prompt formatter', 'Rate limit exponential backoff'],
      failureMitigation: 'Automatically prune oldest non-system messages when context exceeds 85% of model limit.',
      sampleCodeSnippet: `def prune_messages(messages: list[dict], max_tokens: int = 4000) -> list[dict]:
    # Retain system prompt at index 0, prune oldest user/assistant turns
    while sum(count_tokens(m["content"]) for m in messages) > max_tokens and len(messages) > 2:
        messages.pop(1)
    return messages`,
    },
    difficulty: 'Foundational',
  },
  {
    id: 'streaming-chat-api',
    title: 'High-Throughput Streaming Chat API',
    stageNum: '02',
    category: 'Foundations & Streaming',
    summary: 'Asynchronous streaming microservice serving real-time tokens over Server-Sent Events (SSE) with backpressure handling and client disconnect detection.',
    tech: 'FastAPI · Asyncio · Server-Sent Events (SSE) · Redis',
    patterns: ['SSE Protocol', 'Async Generators', 'Backpressure Handling', 'Connection Cleanup'],
    specs: {
      latency: '< 150ms TTFT',
      tokenBudget: '50-100 tokens/sec',
      contextWindow: 'Dynamic',
      primaryRisk: 'Orphaned model connections consuming API quota on client disconnect',
    },
    blueprint: {
      pipeline: ['HTTP POST Request', 'FastAPI Async Generator', 'Anthropic Streaming Client', 'SSE Yield Chunk', 'EventStream Chunk Delivery'],
      keyComponents: ['StreamingResponse(media_type="text/event-stream")', 'asyncio.shield()', 'Client disconnect poller', 'Redis session tracker'],
      failureMitigation: 'Hook into request.is_disconnected() in the generator loop to cancel upstream LLM requests immediately.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'structured-output-extractor',
    title: 'Deterministic Structured Output Extractor',
    stageNum: '03',
    category: 'Foundations & Streaming',
    summary: 'Coerces probabilistic LLM completions into strictly verified JSON schemas with automatic validation retry loops and schema repair.',
    tech: 'Pydantic v2 · JSON Mode · Function Calling · Instructor',
    patterns: ['JSON Schema Enforcement', 'Pydantic Validation', 'Self-Healing Retry', 'Grammar Masking'],
    specs: {
      latency: '< 800ms P95',
      tokenBudget: '1k-2k tokens',
      contextWindow: '32k context',
      primaryRisk: 'Hallucinated types, missing required fields, or trailing markdown fences',
    },
    blueprint: {
      pipeline: ['Raw Text Input', 'System Schema Injection', 'Function Calling Output', 'Pydantic parse_raw()', 'Verified Domain Model'],
      keyComponents: ['Pydantic BaseModel schema', 'Validation error re-prompt loop', 'Regex JSON extractor fallback', 'Schema grammar constraints'],
      failureMitigation: 'Feed Pydantic ValidationError back into LLM context as a system correction prompt for up to 3 retry attempts.',
    },
    difficulty: 'Foundational',
  },
  {
    id: 'multi-model-gateway',
    title: 'Multi-Model Fallback & Routing Gateway',
    stageNum: '04',
    category: 'Foundations & Streaming',
    summary: 'Unified gateway providing automatic provider failovers (Claude ↔ GPT-4o ↔ Gemini ↔ Ollama) with latency-based load balancing and circuit breakers.',
    tech: 'Python · AsyncIO · Circuit Breakers · Redis · OpenTelemetry',
    patterns: ['Provider Abstraction', 'Circuit Breakers', 'Semantic Fallback', 'Cost Optimization'],
    specs: {
      latency: '< 50ms gateway overhead',
      tokenBudget: 'Configurable',
      contextWindow: 'Provider Adaptive',
      primaryRisk: 'Provider outage, rate limit cascades, or vendor lock-in',
    },
    blueprint: {
      pipeline: ['Client Request', 'Cost/Latency Router', 'Primary Provider Request', 'Circuit Breaker Monitor', 'Automatic Fallback Execution'],
      keyComponents: ['Unified Message Protocol', 'Sliding window failure detector', 'Model capability matrix', 'Telemetry emitter'],
      failureMitigation: 'Trigger circuit trip on 3 consecutive 5xx errors or 429 rate limits, instantly routing traffic to secondary provider.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'llm-cost-auditor',
    title: 'LLM Cost, Quota & Latency Auditor',
    stageNum: '05',
    category: 'Foundations & Streaming',
    summary: 'High-throughput accounting system capturing input/output token volume, millisecond latencies, and dollar expense per user and team with hard budget halts.',
    tech: 'FastAPI · PostgreSQL · Redis · TimescaleDB',
    patterns: ['Event Sourcing', 'Real-Time Quotas', 'Sliding Window Rate Limits', 'Cost Aggregation'],
    specs: {
      latency: '< 5ms audit latency',
      tokenBudget: 'Enterprise multi-tenant',
      contextWindow: 'N/A',
      primaryRisk: 'Unchecked loop incurring thousands of dollars in automated API billing',
    },
    blueprint: {
      pipeline: ['Pre-flight Quota Check', 'API Execution', 'Token Metadata Extraction', 'Redis Atomic Counter', 'Postgres TimescaleDB Log'],
      keyComponents: ['Redis INCRBY token counter', 'Hard budget circuit breaker', 'Pricing rate table', 'Async background queue'],
      failureMitigation: 'Hard reject requests returning 402 Payment Required once monthly organizational budget cap is reached.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'tool-calling-engine',
    title: 'Autonomous Tool-Calling Re-prompt Engine',
    stageNum: '06',
    category: 'Autonomous Agents',
    summary: 'The fundamental agentic loop: parses tool calls, validates parameters against Pydantic definitions, executes local functions, and feeds results back to LLM.',
    tech: 'Python · LangChain Core · Pydantic · AsyncIO',
    patterns: ['Re-prompt Loop', 'Schema Registration', 'Execution Sandboxing', 'Tool Error Injection'],
    specs: {
      latency: '< 1.2s per tool turn',
      tokenBudget: '2k-4k tokens',
      contextWindow: '64k context',
      primaryRisk: 'Hallucinated function arguments or infinite re-prompt tool execution loops',
    },
    blueprint: {
      pipeline: ['User Query', 'LLM Generates ToolCall', 'Parameter Schema Validation', 'Local Function Invocation', 'ToolOutput Fed Back', 'Final Synthesis'],
      keyComponents: ['Tool registry with docstrings', 'Pydantic argument parser', 'Execution timeout sandbox', 'Loop termination counter'],
      failureMitigation: 'Cap maximum tool turns at 5; inject system warning if the model calls the same tool with identical parameters.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'safe-sql-agent',
    title: 'Safe Text-to-SQL Execution Agent',
    stageNum: '07',
    category: 'Autonomous Agents',
    summary: 'Natural language interface translating complex analytical queries into SQL with AST parsing, read-only transaction locks, and query cost estimation.',
    tech: 'LangGraph · PostgreSQL · sqlparse · AST Analyzers',
    patterns: ['AST Query Validation', 'Read-Only DB Pool', 'Schema Pruning', 'Explain Cost Analysis'],
    specs: {
      latency: '< 900ms query generation',
      tokenBudget: '2k tokens schema injection',
      contextWindow: '32k context',
      primaryRisk: 'Accidental DELETE/DROP queries, SQL injection, or unindexed full table scans',
    },
    blueprint: {
      pipeline: ['Natural Language Question', 'Schema Context Pruner', 'SQL Query Generator', 'sqlparse AST Inspector', 'EXPLAIN Query Cost Check', 'Read-Only DB Exec'],
      keyComponents: ['SQL AST validator', 'Read-only DB replica user', 'Query timeout limit (3s)', 'Markdown table formatter'],
      failureMitigation: 'Reject queries containing mutate statements (INSERT, UPDATE, DROP, ALTER) at the parser AST level before touching the DB.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'basic-vector-rag',
    title: 'Semantic Vector RAG Pipeline',
    stageNum: '08',
    category: 'RAG & Retrieval',
    summary: 'End-to-end semantic retrieval system: document chunking, embeddings generation, vector storage, and cosine similarity lookup over private docs.',
    tech: 'Python · pgvector / ChromaDB · OpenAI Embeddings · FastAPI',
    patterns: ['Semantic Chunking', 'Vector Embeddings', 'Cosine Similarity', 'Context Stuffing'],
    specs: {
      latency: '< 250ms retrieval',
      tokenBudget: '1.5k chunk tokens',
      contextWindow: '16k-32k context',
      primaryRisk: 'Chunk fragmentation breaking syntactic sentences or loss of contextual references',
    },
    blueprint: {
      pipeline: ['Document Upload', 'Recursive Character Splitter', 'Vector Embeddings', 'pgvector HNSW Index', 'K-Nearest Neighbors Query', 'Prompt Context Augmentation'],
      keyComponents: ['500-token chunker with 50-token overlap', 'text-embedding-3-small', 'pgvector IVFFlat/HNSW', 'System prompt injector'],
      failureMitigation: 'Use recursive boundary splitting on paragraph and sentence boundaries instead of arbitrary character slices.',
    },
    difficulty: 'Foundational',
  },
  {
    id: 'citation-rag-engine',
    title: 'Production Citation & Grounded RAG',
    stageNum: '09',
    category: 'RAG & Retrieval',
    summary: 'Enterprise document intelligence system with strict metadata filtering, paragraph-level source attribution, and verifiable hallucination checks.',
    tech: 'LangChain · PostgreSQL + pgvector · Cross-Encoders · Pydantic',
    patterns: ['Source Attribution', 'Metadata Filtering', 'Hallucination Checks', 'Chunk Hashing'],
    specs: {
      latency: '< 600ms P95',
      tokenBudget: '3k-6k tokens',
      contextWindow: '64k context',
      primaryRisk: 'Model hallucinating fake citations or attributing facts to the wrong source file',
    },
    blueprint: {
      pipeline: ['User Query', 'Tenant Metadata Filter', 'pgvector Retrieval', 'Source Chunk Numbering', 'Attributed Synthesis', 'Verification Validator'],
      keyComponents: ['Deterministic chunk UUIDs', 'Numbered bracket citations [1][2]', 'Post-generation citation verifier', 'Fact extraction grader'],
      failureMitigation: 'Run post-generation verification regex ensuring every citation bracket directly maps to a retrieved chunk in the prompt.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'hybrid-search-reranking',
    title: 'Hybrid Search with Cross-Encoder Reranker',
    stageNum: '10',
    category: 'RAG & Retrieval',
    summary: 'Combines dense vector retrieval with sparse keyword BM25 search using Reciprocal Rank Fusion (RRF) and Cohere/bge cross-encoder reranking.',
    tech: 'BM25 · pgvector · Cohere Rerank / BGE-Reranker · Python',
    patterns: ['Dense + Sparse Fusion', 'Reciprocal Rank Fusion', 'Cross-Encoder Scoring', 'Score Normalization'],
    specs: {
      latency: '< 350ms total retrieval',
      tokenBudget: 'Top 5 reranked chunks',
      contextWindow: '32k context',
      primaryRisk: 'Keyword-exact part numbers missed by vectors, or conceptual queries missed by BM25',
    },
    blueprint: {
      pipeline: ['Query', 'Parallel Dense + Sparse Search', 'Top 50 Candidates', 'Reciprocal Rank Fusion (RRF)', 'Cross-Encoder Reranker', 'Top 5 Relevant Chunks'],
      keyComponents: ['PostgreSQL Full-Text Search (tsvector)', 'pgvector embeddings', 'RRF weighting formula', 'Cross-encoder scoring engine'],
      failureMitigation: 'Score normalization ensures neither lexical search nor vector cosine similarity unilaterally dominates ranking.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'iterative-web-researcher',
    title: 'Iterative Autonomous Web Researcher',
    stageNum: '11',
    category: 'Autonomous Agents',
    summary: 'Multi-step autonomous exploration: generates exploratory queries, scrapes pages, synthesizes preliminary insights, and recursively queries missing facts.',
    tech: 'LangGraph · Tavily / Brave Search API · Playwright · Python',
    patterns: ['Recursive Exploration', 'Dynamic Query Generation', 'Information Density Pruning', 'Confidence Scoring'],
    specs: {
      latency: '5s - 15s multi-turn',
      tokenBudget: '8k-16k tokens',
      contextWindow: '128k context',
      primaryRisk: 'Web crawler traps, paywalls, and low-quality SEO spam polluting synthesis',
    },
    blueprint: {
      pipeline: ['Research Topic', 'Query Formulation Node', 'Search API Exec', 'HTML Scraper & Markdown Cleaner', 'Reflection Evaluator Node', 'Final Report Compiler'],
      keyComponents: ['LangGraph state graph', 'Markdown text extractor', 'Information completeness evaluator', 'Dedup URL cache'],
      failureMitigation: 'Evaluator node scores information sufficiency; stops recursion when score > 0.85 or search iteration reaches 4.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'custom-stategraph-loop',
    title: 'Custom LangGraph Cyclic State Machine',
    stageNum: '12',
    category: 'Autonomous Agents',
    summary: 'Constructing robust cyclic computation graphs from scratch: managing typed state channels, conditional routing edges, and deterministic termination guards.',
    tech: 'LangGraph · Python Typing · Pydantic · StateGraph',
    patterns: ['Cyclic Graphs', 'Typed State Channels', 'Conditional Edge Routers', 'Termination Guards'],
    specs: {
      latency: '< 2s per cycle',
      tokenBudget: '4k tokens per turn',
      contextWindow: '64k context',
      primaryRisk: 'Infinite recursion cycling between two nodes without reaching end state',
    },
    blueprint: {
      pipeline: ['Input State', 'Planner Node', 'Conditional Router', 'Execution Node', 'Critique Node', 'Loop or END'],
      keyComponents: ['TypedDict AgentState', 'add_conditional_edges()', 'Recursion limit guard (max=10)', 'State mutation reducers'],
      failureMitigation: 'Enforce max_iterations counter in AgentState; force routing to END node if counter exceeds limit.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'durable-stateful-agent',
    title: 'Durable Stateful Agent with Checkpointers',
    stageNum: '13',
    category: 'Autonomous Agents',
    summary: 'Fault-tolerant multi-turn state persistence: serializes agent graphs to PostgreSQL checkpointers, allowing execution to resume seamlessly after server crashes.',
    tech: 'LangGraph · PostgresSaver Checkpointer · Redis · FastAPI',
    patterns: ['State Serialization', 'Thread Checkpointing', 'Time-Travel Debugging', 'Crash Recovery'],
    specs: {
      latency: '< 20ms checkpoint write',
      tokenBudget: 'Multi-turn memory',
      contextWindow: 'Persistent',
      primaryRisk: 'State drift or deserialization failures between app code versions',
    },
    blueprint: {
      pipeline: ['Agent Step Execution', 'State Delta Generated', 'PostgresSaver.put()', 'Thread ID Checkpoint Commit', 'Resume on Next Request'],
      keyComponents: ['PostgresSaver engine', 'Thread ID routing', 'Time-travel state replay', 'Schema version migration'],
      failureMitigation: 'Store state snapshots as versioned JSONB in PostgreSQL with monotonic sequence IDs for atomic rollback.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'human-in-the-loop-agent',
    title: 'Human-in-the-Loop (HITL) Interrupter',
    stageNum: '14',
    category: 'Autonomous Agents',
    summary: 'Strategic pause checkpoints that freeze agent execution graphs before executing destructive or financial actions, awaiting authorized human approval.',
    tech: 'LangGraph Interrupts · Webhooks · Slack Bot API · FastAPI',
    patterns: ['Graph Interruption', 'Approval Webhooks', 'State Resumption', 'Audited Overrides'],
    specs: {
      latency: 'Asynchronous (minutes to hours)',
      tokenBudget: 'Frozen state',
      contextWindow: 'Checkpointed',
      primaryRisk: 'Unintended wire transfers or database modifications without explicit signoff',
    },
    blueprint: {
      pipeline: ['Action Proposed', 'HITL Risk Classifier', 'interrupt() Graph Pause', 'Slack Approval Notification', 'Human Decision Webhook', 'Resume Graph Execution'],
      keyComponents: ['LangGraph interrupt() hook', 'Webhook callback endpoint', 'HMAC signature verification', 'State diff preview UI'],
      failureMitigation: 'Graph remains frozen in PostgreSQL until approved; auto-reject and abort execution if no human response after 24 hours.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'long-term-memory-vault',
    title: 'Dual-Tier Long-Term Memory Vault',
    stageNum: '15',
    category: 'Autonomous Agents',
    summary: 'Decoupled memory architecture: combines short-term conversation thread buffers with associative long-term vector memory for cross-session recall.',
    tech: 'LangGraph · pgvector · OpenAI Embeddings · Semantic Router',
    patterns: ['Episodic vs Semantic Memory', 'Memory Consolidation', 'Cross-Session Recall', 'Salience Scoring'],
    specs: {
      latency: '< 180ms memory lookup',
      tokenBudget: '500 tokens memory context',
      contextWindow: 'Adaptive',
      primaryRisk: 'Stale memories contaminating new conversations with out-of-date preferences',
    },
    blueprint: {
      pipeline: ['User Input', 'Memory Retrieval Query', 'Associative Vector Match', 'Current Turn Synthesis', 'Background Memory Extractor', 'Vault Upsert'],
      keyComponents: ['Memgraph / pgvector user memories table', 'Salience extractor LLM prompt', 'TTL & recency decay weights', 'Memory invalidator'],
      failureMitigation: 'Apply time-decay scoring to associative vector matches; update or supersede memories with newer factual timestamps.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'custom-mcp-server',
    title: 'Custom Model Context Protocol (MCP) Server',
    stageNum: '16',
    category: 'MCP & Swarms',
    summary: 'Build a production Model Context Protocol server exposing internal enterprise databases, APIs, and file structures over stdio and SSE transports.',
    tech: 'MCP Python SDK · AsyncIO · JSON-RPC 2.0 · Server-Sent Events',
    patterns: ['MCP Protocol', 'Tool Schemas', 'Resource Templates', 'Transport Multiplexing'],
    specs: {
      latency: '< 30ms JSON-RPC latency',
      tokenBudget: 'Protocol standard',
      contextWindow: 'Universal',
      primaryRisk: 'Unrestricted database credentials leaked through exposed MCP endpoints',
    },
    blueprint: {
      pipeline: ['MCP Client Handshake', 'tools/list Discovery', 'tools/call Request', 'Input Schema Validation', 'Database Query Exec', 'JSON-RPC ToolResult'],
      keyComponents: ['FastMCP / mcp.server.stdio', 'Pydantic tool contracts', 'Resource URI templates (db://users/{id})', 'Error response schemas'],
      failureMitigation: 'Strictly validate all tool arguments against Pydantic schemas and run queries with lowest-privilege database roles.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'multi-mcp-gateway',
    title: 'Multi-MCP Client Swarm Gateway',
    stageNum: '17',
    category: 'MCP & Swarms',
    summary: 'A master autonomous agent capable of dynamically discovering, authenticating, and orchestrating tools across decentralized GitHub, Slack, and Jira MCP servers.',
    tech: 'LangGraph · Model Context Protocol (MCP) · Docker · AsyncIO',
    patterns: ['Decentralized Tooling', 'Dynamic Discovery', 'Namespaced Tools', 'Subprocess Lifecycle'],
    specs: {
      latency: '< 250ms tool routing',
      tokenBudget: 'Dynamic tool context',
      contextWindow: '128k context',
      primaryRisk: 'Tool namespace collisions (e.g. search_files across multiple servers)',
    },
    blueprint: {
      pipeline: ['Agent Request', 'Multi-MCP Hub Discovery', 'Namespace Prefixing (github__*, jira__*)', 'Subprocess Stdio Route', 'Aggregated Tool Response'],
      keyComponents: ['AsyncExitStack process manager', 'Namespace tool transformer', 'Subprocess health monitor', 'Dynamic capability registry'],
      failureMitigation: 'Prefix all tool names with server identifier (e.g., github__create_issue vs jira__create_issue) to prevent collisions.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'hierarchical-swarm',
    title: 'Hierarchical Supervisor Agent Swarm',
    stageNum: '18',
    category: 'MCP & Swarms',
    summary: 'A supervisor agent coordinating specialized sub-agents: Web Ingestor, Quantitative Analyst, and Lead Editor with structured delegation protocols.',
    tech: 'LangGraph · Supervisor Architecture · Pydantic · Python',
    patterns: ['Supervisor-Worker Pattern', 'Structured Delegation', 'Context Partitioning', 'Swarm Synthesis'],
    specs: {
      latency: '8s - 25s multi-agent',
      tokenBudget: '20k-40k tokens across swarm',
      contextWindow: 'Clean partitioned contexts',
      primaryRisk: 'Workers duplicating research or supervisor losing track of sub-task completion',
    },
    blueprint: {
      pipeline: ['Complex Request', 'Supervisor Decomposition', 'Delegation to Worker 1 & 2', 'Worker Execution', 'Report Back to Supervisor', 'Final Consensus Synthesis'],
      keyComponents: ['Supervisor routing prompt', 'Specialized worker node graphs', 'Handoff schema contract', 'Parallel execution scheduler'],
      failureMitigation: 'Workers receive only task-relevant context rather than entire history, eliminating context bloat and hallucination.',
    },
    difficulty: 'Enterprise/Staff',
  },
  {
    id: 'deep-research-engine',
    title: 'Deep Research Tree-Planning Engine',
    stageNum: '19',
    category: 'Autonomous Agents',
    summary: 'Multi-hour recursive exploration systems that adaptively expand research trees, follow leads, verify claims across multiple citations, and prune low-value branches.',
    tech: 'Deep Agents · Tree Planning · Tavily · LangGraph · Python',
    patterns: ['Tree-of-Thoughts', 'Branch Pruning', 'Multi-Source Verification', 'Recursive Breadth Search'],
    specs: {
      latency: '2m - 10m deep analysis',
      tokenBudget: '100k+ tokens',
      contextWindow: 'Extensive multi-doc',
      primaryRisk: 'Exponential branch explosion consuming immense API tokens on rabbit holes',
    },
    blueprint: {
      pipeline: ['Primary Hypothesis', 'Sub-question Decomposition', 'Parallel Deep Branch Exploration', 'Cross-Validation Grader', 'Low-value Branch Prune', 'Comprehensive Whitepaper'],
      keyComponents: ['Tree search manager', 'Branch utility scoring function', 'Cross-source fact validator', 'Markdown document compiler'],
      failureMitigation: 'Cap maximum branching factor to 3 sub-hypotheses and depth to 3 levels; score node relevance before expanding.',
    },
    difficulty: 'Enterprise/Staff',
  },
  {
    id: 'agent-evaluation-harness',
    title: 'Automated Agent Evaluation Harness',
    stageNum: '20',
    category: 'Evals & Reliability',
    summary: 'Deterministic CI/CD benchmarking framework assessing agent trajectory accuracy, tool selection correctness, and token efficiency against gold test suites.',
    tech: 'Python · Pytest · LangSmith / DeepEval · GitHub Actions',
    patterns: ['Trajectory Evals', 'LLM-as-a-Judge', 'Gold Standard Benchmarks', 'Regression Testing'],
    specs: {
      latency: 'CI/CD pipeline test run',
      tokenBudget: 'Test suite bounded',
      contextWindow: 'Evaluator isolated',
      primaryRisk: 'Prompt tweaks improving one edge case while silently regressing critical customer flows',
    },
    blueprint: {
      pipeline: ['Git Pull Request', 'Pytest Eval Suite Trigger', 'Agent Execution on 50 Gold Scenarios', 'Trajectory & Output Grader', 'Pass/Fail Quality Gate'],
      keyComponents: ['Gold dataset JSONL', 'Trajectory step comparator', 'LLM-as-a-Judge grading rubrics', 'Cost/latency regression monitor'],
      failureMitigation: 'Block merge in GitHub Actions if agent trajectory accuracy drops by > 2% or token consumption spikes > 15%.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'opentelemetry-tracing',
    title: 'Distributed OpenTelemetry Agent Tracing',
    stageNum: '21',
    category: 'Evals & Reliability',
    summary: 'Full observability across agent loops: captures nested spans for LLM calls, tool executions, vector retrievals, and latency waterfalls in Jaeger and Langfuse.',
    tech: 'OpenTelemetry · Langfuse / Arize Phoenix · Jaeger · FastAPI',
    patterns: ['Distributed Tracing', 'Nested Spans', 'Latency Waterfalls', 'Trace Context Propagation'],
    specs: {
      latency: '< 2ms instrumentation overhead',
      tokenBudget: 'Trace payload metadata',
      contextWindow: 'N/A',
      primaryRisk: 'Agent hangs or failures becoming opaque black boxes in production',
    },
    blueprint: {
      pipeline: ['Incoming Request', 'Root Trace Span Created', 'Child Spans (Retriever, Tool, LLM)', 'Token Count & Latency Injected', 'Export to OTLP Collector'],
      keyComponents: ['OpenTelemetry TracerProvider', 'Baggage context propagation', 'OTLP HTTP exporter', 'Langfuse / Jaeger dashboard'],
      failureMitigation: 'Attach request thread_id and user_id to every trace span to allow instant filtering of failed customer sessions.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'self-correction-agent',
    title: 'Self-Correction & Reflexion Loop',
    stageNum: '22',
    category: 'Evals & Reliability',
    summary: 'Reflexive agent architecture: executes code or logic, captures errors and unit test failures, analyzes root cause, and autonomously writes targeted fixes.',
    tech: 'LangGraph · Reflexion Pattern · Pytest · AST Validator',
    patterns: ['Reflexion', 'Self-Healing Loops', 'Unit Test Feedback', 'Critique & Refine'],
    specs: {
      latency: '< 4s per reflection cycle',
      tokenBudget: '4k-8k tokens',
      contextWindow: '32k context',
      primaryRisk: 'Loop repeating the same faulty patch in an infinite circular fix cycle',
    },
    blueprint: {
      pipeline: ['Code Generated', 'Sandbox Pytest Execution', 'Test Failure Output Captured', 'Reflexion Critic Analyzes Bug', 'Patch Generated', 'Verify Patch'],
      keyComponents: ['Test execution sandbox', 'Reflexion memory log', 'Diff generator and patch applier', 'Termination criteria validator'],
      failureMitigation: 'Maintain a history of attempted patches; if an approach fails twice, instruct the model to abandon the strategy entirely.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'jailbreak-redteaming-suite',
    title: 'Adversarial Jailbreak & Guardrail Suite',
    stageNum: '23',
    category: 'Evals & Reliability',
    summary: 'Hardened safety layer defending agents against prompt injections, system prompt extraction, indirect data poisoning, and unsafe tool parameters.',
    tech: 'LlamaGuard · NeMo Guardrails · Regex Heuristics · Python',
    patterns: ['Prompt Injection Defense', 'Input Sanitization', 'Output Guardrails', 'Canary Tokens'],
    specs: {
      latency: '< 80ms guardrail check',
      tokenBudget: 'Negligible',
      contextWindow: 'Input level',
      primaryRisk: 'Untrusted user input or retrieved web content hijacking agent system instructions',
    },
    blueprint: {
      pipeline: ['User Input', 'LlamaGuard / Heuristic Scanner', 'Canary Token Injection', 'Agent Execution', 'Output Safety Filter', 'Response Delivered'],
      keyComponents: ['Zero-width canary token detector', 'Indirect injection pattern classifier', 'Strict input boundary delimiters', 'Tool execution allowlist'],
      failureMitigation: 'Wrap all retrieved untrusted content in `<untrusted_data>` tags and inject secret canary tokens to detect instruction leakage.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'code-execution-sandbox',
    title: 'Zero-Trust Code Execution Sandbox',
    stageNum: '24',
    category: 'Evals & Reliability',
    summary: 'Isolated compute environments executing LLM-generated Python code with strict gVisor/Docker virtualization, no network egress, and hard memory limits.',
    tech: 'Docker · gVisor (runsc) · Linux cgroups · Python · FastAPI',
    patterns: ['Zero-Trust Virtualization', 'Egress Filtering', 'cgroups Resource Limits', 'Ephemeral Containers'],
    specs: {
      latency: '< 300ms container spin-up',
      tokenBudget: 'N/A',
      contextWindow: 'N/A',
      primaryRisk: 'Malicious generated code reading host environment variables or staging DDoS attacks',
    },
    blueprint: {
      pipeline: ['Agent Emits Code', 'Static AST Safety Check', 'Ephemeral gVisor Container Spun Up', 'Read-Only Filesystem Mount', 'Execution Timeout', 'Stdout Returned'],
      keyComponents: ['gVisor runsc runtime', 'iptables network block (drop all outbound)', 'Memory cap (512MB) & CPU limit (1 core)', 'Ephemeral tmpfs mount'],
      failureMitigation: 'Disable all container network interfaces (except loopback) and terminate execution after 5,000ms wall-clock time.',
    },
    difficulty: 'Enterprise/Staff',
  },
  {
    id: 'multimodal-agent',
    title: 'Enterprise Multimodal OCR & Vision Agent',
    stageNum: '25',
    category: 'Production Platforms',
    summary: 'Processes scanned invoices, handwritten notes, and architecture diagrams into structured JSON with bounding box validation and vision-guided tool use.',
    tech: 'GPT-4o / Claude 3.5 Sonnet Vision · PDFPlumber · Pydantic',
    patterns: ['Visual Grounding', 'Bounding Box Verification', 'Multimodal Parsing', 'Image Chunking'],
    specs: {
      latency: '< 1.8s per page',
      tokenBudget: 'High-res image tokens',
      contextWindow: '128k context',
      primaryRisk: 'Low-contrast handwriting causing silent hallucination of monetary numbers',
    },
    blueprint: {
      pipeline: ['PDF / Image Ingest', 'Resolution Normalization (2048px)', 'Vision Model Extraction', 'Bounding Box Tagging', 'Pydantic Financial Model Validation'],
      keyComponents: ['Image pre-processing pipeline', 'Line-item table extractor', 'Confidence scoring per field', 'Human audit fallback queue'],
      failureMitigation: 'Flag fields with OCR confidence < 0.90 for human review before initiating ERP accounting entry.',
    },
    difficulty: 'Advanced',
  },
  {
    id: 'autonomous-migration-engine',
    title: 'Autonomous Codebase Migration Engine',
    stageNum: '26',
    category: 'Production Platforms',
    summary: 'Multi-step code migration system: parses legacy ASTs (e.g. JavaScript to TypeScript, or Python 2 to 3), applies type inference, and validates with unit tests.',
    tech: 'LangGraph · Tree-Sitter AST · Git Worktrees · Pytest',
    patterns: ['AST Transformation', 'Git Worktree Sandboxing', 'Iterative Type Inference', 'Automated PR Creation'],
    specs: {
      latency: '5m - 30m per repo',
      tokenBudget: '50k+ tokens',
      contextWindow: 'Full file context',
      primaryRisk: 'Subtle semantic behavior changes escaping undetected in production runtime',
    },
    blueprint: {
      pipeline: ['Git Worktree Checkout', 'Tree-Sitter AST Dep Graph', 'Topological Sort of Files', 'File Migration Agent', 'Compile & Test Verification', 'Git Commit & PR'],
      keyComponents: ['Tree-Sitter language parsers', 'Isolated git branch worktrees', 'Compiler error loop resolver', 'Automated git PR committer'],
      failureMitigation: 'Require 100% pass rate on existing unit test suite before git commit can be pushed to remote repository.',
    },
    difficulty: 'Enterprise/Staff',
  },
  {
    id: 'self-healing-devops-swarm',
    title: 'Self-Healing Infrastructure DevOps Swarm',
    stageNum: '27',
    category: 'Production Platforms',
    summary: 'Autonomous site reliability agents: ingests Prometheus alerts, inspects Kubernetes pod logs, diagnoses root causes, and executes safe remediation scripts.',
    tech: 'LangGraph · Kubernetes API · Prometheus · Datadog · Python',
    patterns: ['Alert Triaging', 'Log Correlation', 'Runbook Execution', 'Gradual Rollback'],
    specs: {
      latency: '< 45s mean time to remediate',
      tokenBudget: '8k tokens log context',
      contextWindow: '64k context',
      primaryRisk: 'Automated remediation taking down healthy clusters or misdiagnosing root causes',
    },
    blueprint: {
      pipeline: ['Prometheus Alert Webhook', 'Pod Log Aggregator', 'Root Cause Diagnosis Agent', 'Remediation Plan Generator', 'HITL Approval / Runbook Exec', 'Post-Fix Verify'],
      keyComponents: ['Kubernetes Python client', 'Prometheus metrics query engine', 'Sanitized runbook registry', 'Rollback failsafe trigger'],
      failureMitigation: 'Limit automated remediation actions to approved runbooks (restart pod, rollback deployment); require human approval for scale-down.',
    },
    difficulty: 'Enterprise/Staff',
  },
  {
    id: 'agent-governance-platform',
    title: 'Enterprise Multi-Tenant Agent Governance Platform',
    stageNum: '28',
    category: 'Production Platforms',
    summary: 'Centralized control plane managing enterprise agent deployments: role-based access control (RBAC), prompt versioning, token billing, and audit log compliance.',
    tech: 'Next.js · PostgreSQL · Redis · OpenFGA (Zanzibar RBAC) · FastAPI',
    patterns: ['Zanzibar ReBAC', 'Audit Logging', 'Prompt Registry & Diffing', 'Multi-Tenant Isolation'],
    specs: {
      latency: '< 10ms auth overhead',
      tokenBudget: 'Enterprise multi-tenant',
      contextWindow: 'Global',
      primaryRisk: 'Cross-tenant data leakage or unversioned prompt edits breaking production bots',
    },
    blueprint: {
      pipeline: ['API Request with JWT', 'OpenFGA Permission Check', 'Prompt Version Lookup', 'Agent Execution Engine', 'Immutable Audit Event Emitted'],
      keyComponents: ['Zanzibar relationship-based access control', 'Semantic prompt versioning', 'Tamper-evident audit log stream', 'Tenant isolation barrier'],
      failureMitigation: 'Enforce row-level security (RLS) in PostgreSQL with strict tenant_id constraints on all agent state queries.',
    },
    difficulty: 'Enterprise/Staff',
  },
  {
    id: 'semantic-cache-engine',
    title: 'Semantic Vector Cache for LLMs',
    stageNum: '29',
    category: 'Foundations & Streaming',
    summary: 'High-speed semantic caching: computes vector similarity on incoming queries to return cached responses within 15ms, slashing API costs by up to 60%.',
    tech: 'Redis VSS · pgvector · FastEmbed · Python · FastAPI',
    patterns: ['Semantic Caching', 'Vector Similarity Thresholding', 'TTL Invalidation', 'Exact + Semantic Match'],
    specs: {
      latency: '< 15ms cache hit',
      tokenBudget: '0 tokens on hit',
      contextWindow: 'N/A',
      primaryRisk: 'Serving an answer from an old query when slight phrasing changes alter intent',
    },
    blueprint: {
      pipeline: ['User Query', 'Exact Hash Match Check', 'Vector Embedding Generated', 'Redis VSS Cosine Search', 'Similarity Threshold Check (> 0.96)', 'Return Cached Response'],
      keyComponents: ['Local ONNX embedding model (FastEmbed)', 'Redis Vector Similarity Search', 'Strict cosine threshold (> 0.96)', 'Cache invalidation tags'],
      failureMitigation: 'Set high cosine similarity threshold (0.96+) and allow clients to pass `no-cache: true` headers to bypass.',
    },
    difficulty: 'Intermediate',
  },
  {
    id: 'graphrag-knowledge-engine',
    title: 'GraphRAG: Knowledge Graph Augmented Retrieval',
    stageNum: '30',
    category: 'RAG & Retrieval',
    summary: 'Connects unstructured document chunks with an explicit Neo4j knowledge graph of entities and relationships for complex multi-hop reasoning.',
    tech: 'Neo4j · Cypher · LangChain · pgvector · Python',
    patterns: ['GraphRAG', 'Entity Extraction', 'Multi-Hop Reasoning', 'Knowledge Graph Fusion'],
    specs: {
      latency: '< 450ms hybrid graph lookup',
      tokenBudget: '4k tokens graph context',
      contextWindow: '64k context',
      primaryRisk: 'Graph extraction noise creating circular or disconnected entity networks',
    },
    blueprint: {
      pipeline: ['Document Chunks', 'LLM Entity & Relation Extractor', 'Neo4j Graph Construction', 'Query Entity Extractor', 'Cypher Graph Traversal', 'Graph + Vector Fusion Synthesis'],
      keyComponents: ['Entity resolution engine', 'Cypher query generator', 'Neo4j AuraDB instance', 'Hybrid graph-vector context combiner'],
      failureMitigation: 'Combine Cypher path traversal results with standard vector top-k to ensure answers are grounded in both entities and text.',
    },
    difficulty: 'Enterprise/Staff',
  },
];

export default function AIProblemDirectory() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeModalProblem, setActiveModalProblem] = useState<AIProblem | null>(null);

  const categories = [
    'All',
    'Foundations & Streaming',
    'RAG & Retrieval',
    'Autonomous Agents',
    'MCP & Swarms',
    'Evals & Reliability',
    'Production Platforms',
  ];

  const difficulties = ['All', 'Foundational', 'Intermediate', 'Advanced', 'Enterprise/Staff'];

  const filteredProblems = aiProblems.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patterns.some((pattern) => pattern.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <section style={{ marginTop: '2.5rem' }}>
      {/* Search & Filter Toolbar */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '500px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search by system (e.g. LangGraph, RAG, MCP, Tracing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              DIFFICULTY:
            </span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: selectedDifficulty === diff ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                  background: selectedDifficulty === diff ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  color: selectedDifficulty === diff ? '#0284c7' : 'var(--text-secondary)',
                  fontWeight: selectedDifficulty === diff ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Pills */}
        <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                fontSize: '0.8rem',
                padding: '5px 12px',
                borderRadius: '6px',
                border: selectedCategory === cat ? '1px solid #38bdf8' : '1px solid transparent',
                background: selectedCategory === cat ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-surface)',
                color: selectedCategory === cat ? '#0284c7' : 'var(--text-secondary)',
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', padding: '0 0.25rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          Showing <strong>{filteredProblems.length}</strong> of {aiProblems.length} Production AI &amp; Agent Blueprints
        </span>
      </div>

      {/* Problems Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filteredProblems.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              if (p.articleSlug) {
                router.push(`/blog/${p.articleSlug}`);
              } else {
                setActiveModalProblem(p);
              }
            }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="card-interactive-hover"
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    color: '#0284c7',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  SYSTEM #{p.stageNum}
                </span>

                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background:
                      p.difficulty === 'Enterprise/Staff'
                        ? 'rgba(239, 68, 68, 0.1)'
                        : p.difficulty === 'Advanced'
                        ? 'rgba(245, 158, 11, 0.1)'
                        : 'rgba(34, 197, 94, 0.1)',
                    color:
                      p.difficulty === 'Enterprise/Staff'
                        ? '#ef4444'
                        : p.difficulty === 'Advanced'
                        ? '#f59e0b'
                        : '#16a34a',
                  }}
                >
                  {p.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem', lineHeight: 1.35 }}>
                {p.title}
              </h3>

              <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                {p.tech}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {p.summary}
              </p>
            </div>

            <div>
              {/* Pattern Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                {p.patterns.map((pat) => (
                  <span
                    key={pat}
                    style={{
                      fontSize: '0.7rem',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-secondary)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {pat}
                  </span>
                ))}
              </div>

              <div
                style={{
                  paddingTop: '0.65rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>⚡ {p.specs.latency}</span>
                <span style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  Inspect Spec →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Blueprint & Architecture Spec Modal */}
      {activeModalProblem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setActiveModalProblem(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalProblem(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '4px',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284c7', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                SYSTEM #{activeModalProblem.stageNum} · {activeModalProblem.category.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{activeModalProblem.difficulty}</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {activeModalProblem.title}
            </h2>

            <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
              {activeModalProblem.tech}
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {activeModalProblem.summary}
            </p>

            {/* Target Telemetry & Specs */}
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Target Telemetry &amp; Resource Envelope
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target Latency</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeModalProblem.specs.latency}</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Token Budget</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeModalProblem.specs.tokenBudget}</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Context Window</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeModalProblem.specs.contextWindow}</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Primary Failure Risk</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444' }}>{activeModalProblem.specs.primaryRisk}</div>
              </div>
            </div>

            {/* Execution Pipeline */}
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Execution Pipeline
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {activeModalProblem.blueprint.pipeline.map((step, idx) => (
                <div key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--text-primary)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    {idx + 1}. {step}
                  </span>
                  {idx < activeModalProblem.blueprint.pipeline.length - 1 && (
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Failure Mitigation */}
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                🛡️ Production Guardrail &amp; Failure Mitigation
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                {activeModalProblem.blueprint.failureMitigation}
              </p>
            </div>

            {/* Sample Code Snippet if present */}
            {activeModalProblem.blueprint.sampleCodeSnippet && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  CORE LOGIC IMPLEMENTATION
                </div>
                <pre
                  style={{
                    background: '#070A10',
                    color: '#F8FAFC',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    overflowX: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <code>{activeModalProblem.blueprint.sampleCodeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Link
                href="/expedition?summit=everest"
                className="share-action-btn"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem', background: 'var(--primary)', color: '#FFFFFF', textDecoration: 'none' }}
              >
                Climb Mount Everest AI Route (8,848M) →
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
