export interface PitchItem {
  stopNum: string;
  index: number;
  t: string;
  tech: string;
  d: string;
}

export interface StageItem {
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

export interface SummitConfig {
  id: 'everest' | 'k2' | 'kangchenjunga';
  name: string;
  nativeName: string;
  title: string;
  elevation: string;
  elevationNum: number;
  verticalRise: string;
  coords: string;
  routeStandard: string;
  domain: string;
  badgeColor: string;
  accentColor: string;
  tagline: string;
  lede: string;
  stats: {
    verticalRise: string;
    waypoints: string;
    cruxPitch: string;
  };
  stages: StageItem[];
}

interface RawStageItem {
  id: string;
  waypoint: string;
  alt: string;
  baro: string;
  sub: string;
  brief: string;
  hazard?: boolean;
  pinnacle?: boolean;
  pitches: { t: string; tech: string; d: string }[];
}

function indexStages(stages: RawStageItem[]): StageItem[] {
  let counter = 0;
  return stages.map((stage) => ({
    ...stage,
    pitches: stage.pitches.map((p) => {
      counter += 1;
      return {
        ...p,
        index: counter,
        stopNum: String(counter).padStart(2, '0'),
      };
    }),
  }));
}

export const summits: Record<string, SummitConfig> = {
  everest: {
    id: 'everest',
    name: 'Mount Everest',
    nativeName: 'Chomolungma / Sagarmāthā',
    title: 'Autonomous AI Engineering',
    elevation: '8,848M',
    elevationNum: 8848,
    verticalRise: '3,484m',
    coords: '27°59\'17"N · 86°55\'31"E · SOUTH COL ROUTE',
    routeStandard: 'Himalayan Route Standard · 8,848M',
    domain: 'Learn AI',
    badgeColor: '#38BDF8',
    accentColor: '#38BDF8',
    tagline: 'Thirty pitches. One summit at 8,848M.',
    lede: 'You do not master autonomous agents by watching tutorials from sea level. You learn them on the rock face—debugging context bloat, recovering from infinite tool loops, and engineering deterministic behavior from stochastic models. This is your technical route from Base Camp to the Everest Summit.',
    stats: {
      verticalRise: '3,484m',
      waypoints: '6 Camps',
      cruxPitch: 'Stop 27',
    },
    stages: indexStages([
      {
        id: 'foundations',
        waypoint: 'Base Camp',
        alt: 'ELEV 5,364M',
        baro: '530 hPa · TRAILHEAD',
        sub: 'Stage 01: Foundations & The Model Protocol',
        brief: 'Before navigating dynamic ice falls, understand your primary ropes: message schemas, raw byte streaming, and structured token validation.',
        pitches: [
          { t: 'CLI LLM Chatbot', tech: 'Python · Anthropic/OpenAI APIs · Pydantic', d: 'A terminal interface where message objects, system prompts, context truncation, and raw token counters stop being theoretical.' },
          { t: 'Streaming Chat API', tech: 'FastAPI · Asyncio · Server-Sent Events (SSE)', d: 'Engineered for real-time token delivery over HTTP. First exposure to async concurrency under severe latency constraints.' },
          { t: 'Structured Output Extractor', tech: 'Pydantic · Function Schemas · JSON Mode', d: 'Coerce probabilistic LLM completions into strictly verified JSON models. The core dependency of all production data extractors.' },
          { t: 'Multi-Model Gateway', tech: 'LangChain · Gemini · Claude · Ollama', d: 'One unified interface supporting failovers and drop-in provider replacements. Eliminates vendor lock-in at the root.' },
          { t: 'LLM Cost & Latency Auditor', tech: 'FastAPI · PostgreSQL · Redis', d: 'Accounting system capturing token volume, millisecond latencies, and real-time dollar expense per request.' },
        ],
      },
      {
        id: 'rag',
        waypoint: 'Khumbu Icefall & Camp I',
        alt: 'ELEV 6,065M',
        baro: '475 hPa · ACTIVE HAZARD',
        sub: 'Stage 02: Tools, Tool-Calling & Dense Retrieval',
        brief: 'Give the model physical hands and a grounded memory library. If your retrieval is noisy, your agent will hallucinate across the crevasse.',
        pitches: [
          { t: 'Tool-Calling Engine', tech: 'LangChain Core · Pydantic Tools', d: 'Calculator, web query, and system inspectors. The core re-prompt loop that forms the basis of all future autonomy.' },
          { t: 'Safe SQL Execution Agent', tech: 'LangGraph · PostgreSQL · AST Parsers', d: 'Natural language translation into executable SQL queries with strict query sanitization and read-only schema locks.' },
          { t: 'Basic Vector RAG', tech: 'ChromaDB / pgvector · Semantic Chunking', d: 'Document ingestion, embeddings, chunking strategies, and semantic retrieval over private technical documentation.' },
          { t: 'Production Citation RAG', tech: 'LangChain · PostgreSQL + pgvector', d: 'Add strict metadata filtering and character-level verifiable source citations to convert a toy demo into a compliant enterprise system.' },
          { t: 'Hybrid Search & Reranking', tech: 'BM25 · Cross-Encoder Reranker · pgvector', d: 'Dense vector retrieval coupled with sparse lexical search and cross-encoder score normalization for production search accuracy.' },
        ],
      },
      {
        id: 'agents',
        waypoint: 'Camp II: The Western Cwm',
        alt: 'ELEV 6,400M',
        baro: '440 hPa · VALLEY OF SILENCE',
        sub: 'Stage 03: Autonomous Loops & State Machines',
        brief: 'Transitioning from rigid pipelines to autonomous graphs where the model determines its own iteration pathways, edges, and memory checkpoints.',
        pitches: [
          { t: 'Iterative Web Researcher', tech: 'LangGraph · Web Search APIs', d: 'Autonomous multi-step discovery: formulate queries, extract search findings, evaluate confidence, and draft research briefs.' },
          { t: 'Customer Resolution Agent', tech: 'LangGraph · FastAPI · Document Store', d: 'Orchestrate real support ticket resolution using multi-modal tooling and real-time contextual policy manuals.' },
          { t: 'Custom StateGraph Loop', tech: 'LangGraph · Raw Python States', d: 'Build an autonomous cyclic graph from scratch: implement state channels, nodes, edges, and conditional routing logic.' },
          { t: 'Durable Stateful Agent', tech: 'PostgreSQL Checkpointers · Redis', d: 'Thread checkpointing allowing multi-turn conversations and long-running execution graphs to survive cluster restarts.' },
          { t: 'Human-in-the-Loop Interrupter', tech: 'LangGraph Interrupts · Webhooks', d: 'Strategic approval checkpoints that halt agent execution graphs before executing irreversible real-world transactions.' },
          { t: 'Long-Term Memory Vault', tech: 'Vector DB · Semantic Memory Router', d: 'Partitioned conversational state: episodic conversation buffers combined with associative long-term memory retrieval.' },
        ],
      },
      {
        id: 'mcp',
        waypoint: 'Camp III: The Lhotse Face',
        alt: 'ELEV 7,200M',
        baro: '380 hPa · SHEER BLUE ICE',
        sub: 'Stage 04: The Model Context Protocol (MCP) & Multi-Agent Swarms',
        brief: 'Single agents hit performance ceilings. Scale operations by dividing responsibilities across modular specialists connected through unified protocols.',
        pitches: [
          { t: 'Custom MCP Server', tech: 'MCP Python SDK · AsyncIO', d: 'Expose internal company databases and custom endpoints through the industry-standard Model Context Protocol.' },
          { t: 'Multi-MCP Client Gateway', tech: 'LangGraph · MCP Ecosystem', d: 'A master agent capable of dynamically discovering tools across decentralized GitHub, Slack, and Jira MCP servers.' },
          { t: 'Hierarchical Research Swarm', tech: 'LangGraph · Supervisor Architectures', d: 'A supervisor agent coordinating specialized sub-agents: Web Ingestor, Quantitative Analyst, and Lead Editor.' },
          { t: 'Deep Research Autonomous Engine', tech: 'Deep Agents · Tree Planning · MCP', d: 'Multi-hour recursive exploration systems that adaptively expand research scope while aggressively pruning irrelevant context.' },
          { t: 'Autonomous Coding Agent', tech: 'Docker Engine · Python AST · Terminal MCP', d: 'An agent that inspects source trees, writes patches, executes tests in sandboxes, and loops until tests pass.' },
          { t: 'Full Software Engineering Pod', tech: 'LangGraph · Git Integrations · Test Harnesses', d: 'Emulate a software squad: PRD Author → System Architect → Code Engine → Test Reviewer.' },
        ],
      },
      {
        id: 'reliability',
        waypoint: 'South Col & The Death Zone',
        alt: 'ELEV 7,906M',
        baro: '355 hPa · CRITICAL SURVIVAL',
        sub: 'Stage 05: Hardened Reliability, Sandboxing & Observability',
        brief: 'The altitude where most agents die. Hardened telemetry, zero-trust sandboxes, and circuit-breaker designs to withstand unexpected failures.',
        hazard: true,
        pitches: [
          { t: 'Agent Evaluation Matrix', tech: 'LangSmith · Pytest · Synthetic Datasets', d: 'Automated regression testing. Measure accuracy, drift, tool call fidelity, and output conformity on every git commit.' },
          { t: 'Full Trace Observability Hub', tech: 'LangSmith · OpenTelemetry · Tracing', d: 'Correlate every step, LLM completion, token footprint, and tool latency to debug production failures instantly.' },
          { t: 'Fault-Tolerant Resilient Agent', tech: 'LangGraph · Circuit Breakers · Exponential Backoff', d: 'Self-healing architectures that gracefully degrade during API outages, rate limits, or network partitions.' },
          { t: 'Durable Background Daemon', tech: 'Redis Queue · Cron · Distributed Checkpoints', d: 'Agents running as non-terminating system daemons, executing periodic audits and autonomous data operations.' },
          { t: 'Zero-Trust Code Sandbox', tech: 'Docker Engine · gVisor / Firecracker · cgroups', d: 'Hermetically sealed, resource-constrained environments to execute untrusted agent-written code securely.' },
        ],
      },
      {
        id: 'summit',
        waypoint: 'The Hillary Step to Summit',
        alt: 'ELEV 8,848M',
        baro: '314 hPa · HIGHEST POINT ON EARTH',
        sub: 'Stage 06: Production Enterprise Platforms',
        brief: 'Zoom out from individual agents to the cloud-scale infrastructure required to orchestrate, isolate, and serve enterprise AI fleets.',
        pinnacle: true,
        pitches: [
          { t: 'Scalable Agent Service Platform', tech: 'Kubernetes · FastAPI · Redis Clusters', d: 'High-throughput, multi-tenant agent execution platform with elastic horizontal auto-scaling and connection pooling.' },
          { t: 'Enterprise Incident Responder', tech: 'LangGraph · Jira/Slack APIs · Trace Logs', d: 'A mission-critical agent that triages production incidents, queries telemetry logs, inspects PRs, and drafts RCAs.' },
          { t: 'Autonomous AI Engineering Platform', tech: 'Full Technical Stack Consolidated', d: 'The complete enterprise ecosystem: multi-agent runtime, dynamic sandboxing, MCP gateways, and real-time observability.' },
        ],
      },
    ]),
  },

  k2: {
    id: 'k2',
    name: 'K2 (Chhogori)',
    nativeName: 'The Savage Mountain',
    title: 'High-Level Design & Global Scale',
    elevation: '8,611M',
    elevationNum: 8611,
    verticalRise: '3,461m',
    coords: '35°52\'57"N · 76°30\'48"E · ABRUZZI SPUR ROUTE',
    routeStandard: 'Karakoram Standard · 8,611M',
    domain: 'High-Level Design',
    badgeColor: '#0284c7',
    accentColor: '#38BDF8',
    tagline: 'Twenty-four pitches. The Savage Summit at 8,611M.',
    lede: 'K2 is the most technically lethal mountain on Earth—where unpredictable storms, steep vertical rock, and merciless bottlenecks punish every weak point. In distributed systems, scale is your K2. When 10M+ QPS surges across continents, only rigorous partitioning, consensus, and fault-tolerance survive.',
    stats: {
      verticalRise: '3,461m',
      waypoints: '6 Camps',
      cruxPitch: 'Stop 20',
    },
    stages: indexStages([
      {
        id: 'k2-base',
        waypoint: 'Godwin-Austen Base Camp',
        alt: 'ELEV 5,150M',
        baro: '545 hPa · TRAILHEAD',
        sub: 'Stage 01: Scale Foundations, L4/L7 Gateways & Edge Steering',
        brief: 'Before tackling the Abruzzi Spur, master the physics of distributed latency: L4/L7 proxying, DNS Geo-steering, and ingress rate limiting.',
        pitches: [
          { t: 'Latency Numbers Every Architect Knows', tech: 'L1/L2/RAM vs SSD vs Cross-DC RTT', d: 'Quantify distributed bottlenecks from first principles: 0.5ns CPU cache to 150ms cross-Atlantic packet propagation.' },
          { t: 'Anycast Geo-DNS Steering', tech: 'BGP Anycast · Cloudflare · Route53', d: 'Steer global user requests to the nearest edge Point of Presence (PoP) with automated health failover.' },
          { t: 'L4 vs L7 Reverse Proxy Mesh', tech: 'Envoy · Nginx · HAProxy · gRPC Multiplexing', d: 'TLS termination, connection pooling, HTTP/2 multiplexing, and layer-7 path routing under 100k+ concurrent sockets.' },
          { t: 'Distributed Token Bucket Ingress', tech: 'Redis Lua · Envoy Global Rate Limiter', d: 'Protect downstream microservices from volumetric DDoS and thundering herds with atomic sliding window limiters.' },
        ],
      },
      {
        id: 'k2-chimney',
        waypoint: 'House\'s Chimney & Camp I',
        alt: 'ELEV 6,600M',
        baro: '435 hPa · VERTICAL CRACK',
        sub: 'Stage 02: Database Partitioning, Sharding & Consistent Hashing',
        brief: 'A 100-foot sheer vertical rock chimney. Single database instances crack here; scale requires mathematical ring partitioning and replication.',
        pitches: [
          { t: 'Consistent Hash Ring & Virtual Nodes', tech: 'MurmurHash3 · Virtual Vnodes · Ring Rebalancing', d: 'Distribute keys across N storage nodes with minimal key migration churn (K/N) when nodes join or fail.' },
          { t: 'Dynamic Database Sharding Coordinator', tech: 'Range vs Directory vs Hash Sharding', d: 'Scale relational databases horizontally: shard key selection, re-sharding strategies, and cross-shard scatter-gather queries.' },
          { t: 'CDC & Semi-Synchronous Replication', tech: 'Debezium · Kafka · Postgres WAL', d: 'Replicate data to read replicas asynchronously while tracking replication lag and handling failover split-brains.' },
          { t: 'Distributed 64-Bit ID Generator', tech: 'Twitter Snowflake · Zookeeper Ephemeral Nodes', d: 'Generate 10M+ globally unique, time-sortable IDs per second without database lock coordination.' },
        ],
      },
      {
        id: 'k2-pyramid',
        waypoint: 'Camp II: The Black Pyramid',
        alt: 'ELEV 7,200M',
        baro: '390 hPa · MIXED ROCK & ICE',
        sub: 'Stage 03: Distributed Caching Hierarchies & Edge Acceleration',
        brief: 'Exposed technical climbing over shattered dark rock. Protect primary storage systems with multi-tiered caching topology.',
        pitches: [
          { t: 'Multi-Region Redis Cluster Architecture', tech: 'Redis Cluster · CRC16 Slots · Sentinel Failover', d: 'Partition 16,384 hash slots across primary-replica pairs with automated failover and sub-millisecond read latency.' },
          { t: 'Cache Stampede & Thundering Herd Defense', tech: 'Probabilistic Early Expiration (XFetch) · Distributed Mutex', d: 'Prevent database meltdown when popular cache keys expire simultaneously under 50,000 QPS spikes.' },
          { t: 'Write-Back & Write-Around Buffer Daemons', tech: 'Redis Streams · Async Bulk Flusher · PostgreSQL', d: 'Absorb extreme write velocity in memory buffers while asynchronously batch-writing to durable persistence layers.' },
          { t: 'Dynamic Edge Cache Invalidation', tech: 'Fastly Varnish · Surrogate-Keys · Stale-While-Revalidate', d: 'Purge CDN edge cache globally in under 150ms using tag-based surrogate keys and stale-while-revalidate pipelines.' },
        ],
      },
      {
        id: 'k2-shoulder',
        waypoint: 'Camp III & IV: The Shoulder',
        alt: 'ELEV 7,900M',
        baro: '355 hPa · ABRUZZI SHOULDER',
        sub: 'Stage 04: Event-Driven Streaming, Kafka Topologies & Buffers',
        brief: 'The high-altitude plateau before the summit pyramid. Decouple high-velocity microservices using partitioned event logs.',
        pitches: [
          { t: 'Kafka Partition Key Distribution & Skew', tech: 'Apache Kafka · Consumer Groups · Rebalance Protocol', d: 'Optimize throughput and eliminate hot partition lag across consumer worker groups during extreme message bursts.' },
          { t: 'Transactional Outbox Engine', tech: 'PostgreSQL · CDC Debezium · Kafka Connect', d: 'Guarantee dual-write atomicity between database updates and message publishing without heavy 2-Phase Commit.' },
          { t: 'Exactly-Once Processing Semantics (EOS)', tech: 'Kafka Transactions · Idempotent Producer · Flink', d: 'Achieve end-to-end exactly-once message delivery using transaction coordinators and atomic producer markers.' },
          { t: 'Dead-Letter Queue & Poison Pill Isolation', tech: 'DLQ Retry Loops · Exponential Backoff · Circuit Breakers', d: 'Quarantine unprocessable messages automatically to prevent consumer worker thread stall and memory leakage.' },
        ],
      },
      {
        id: 'k2-bottleneck',
        waypoint: 'The Bottleneck & Serac',
        alt: 'ELEV 8,200M',
        baro: '335 hPa · CRITICAL DEATH ZONE',
        sub: 'Stage 05: Distributed Consensus, Fencing Locks & Sagas',
        brief: 'The most dangerous passage in world mountaineering: an 80-degree ice couloir beneath a 100m overhanging serac. Distributed coordination under network failure.',
        hazard: true,
        pitches: [
          { t: 'Raft Consensus Engine', tech: 'Leader Election · Log Replication · Heartbeats', d: 'Maintain consistent state machine replication across server quorums even during network partitions and node crashes.' },
          { t: 'Distributed Lock with Fencing Tokens', tech: 'Redlock / etcd · Monotonic Fencing Tokens', d: 'Eliminate split-brain updates from GC-paused zombie processes using strict monotonic fencing numbers.' },
          { t: 'Orchestrated Saga Payment Engine', tech: 'Temporal.io / AWS Step Functions · Compensating Tx', d: 'Coordinate long-running cross-service workflows with automated rollback compensation upon payment or inventory failures.' },
          { t: 'Vector Clocks & Dynamo Conflict Resolution', tech: 'Vector Clocks · LWW (Last-Write-Wins) · CRDTs', d: 'Resolve concurrent diverging writes across masterless multi-region clusters with convergent data structures.' },
        ],
      },
      {
        id: 'k2-summit',
        waypoint: 'The Savage Summit of K2',
        alt: 'ELEV 8,611M',
        baro: '318 hPa · SUMMIT OF THE SAVAGE MOUNTAIN',
        sub: 'Stage 06: Planetary Multi-Region Active-Active Platforms',
        brief: 'Stand upon the summit of K2. Architect global platforms that operate across multiple continents with zero downtime and automatic chaos resilience.',
        pinnacle: true,
        pitches: [
          { t: 'Global Multi-Region Active-Active Mesh', tech: 'CockroachDB / Spanner · AWS Global Accelerator', d: 'Bi-directional multi-continental replication with local read/write steering and bounded clock drift (TrueTime).' },
          { t: 'Planetary Flash Ticket System', tech: 'Virtual Waiting Rooms · Redis Distributed Locks · Kafka', d: 'Process 500,000 requests per second for 50,000 high-contention seats with strictly zero double-booking.' },
          { t: 'Automated Chaos Engineering & Disaster Recovery', tech: 'Chaos Mesh · Automated AZ Kill Drills · RPO=0 / RTO<10s', d: 'Continuously inject packet loss, sever inter-region fiber links, and verify automatic failovers in production.' },
        ],
      },
    ]),
  },

  kangchenjunga: {
    id: 'kangchenjunga',
    name: 'Kangchenjunga',
    nativeName: 'The Five Treasures of Great Snow',
    title: 'Low-Level Design & Code Craftsmanship',
    elevation: '8,586M',
    elevationNum: 8586,
    verticalRise: '3,436m',
    coords: '27°42\'12"N · 88°08\'51"E · SOUTHWEST FACE ROUTE',
    routeStandard: 'Sikkim-Himalayan Standard · 8,586M',
    domain: 'Low-Level Design',
    badgeColor: '#6366F1',
    accentColor: '#818CF8',
    tagline: 'Twenty pitches. The Five Treasures Summit at 8,586M.',
    lede: 'Kangchenjunga represents the "Five Treasures of Snow"—gold, silver, gems, grain, and holy books. In software engineering, these five treasures represent SOLID principles, design patterns, clean architecture, thread safety, and production system modeling. Low-level design is the pure craftsmanship that ensures our software structures never buckle under stress.',
    stats: {
      verticalRise: '3,436m',
      waypoints: '5 Camps',
      cruxPitch: 'Stop 16',
    },
    stages: indexStages([
      {
        id: 'kang-solid',
        waypoint: 'Yalung Base Camp',
        alt: 'ELEV 5,400M',
        baro: '525 hPa · TRAILHEAD',
        sub: 'The First Treasure: SOLID & Clean Code Architecture',
        brief: 'The first treasure: foundational class structure. Eliminate tight coupling and spaghetti dependencies before beginning the technical ascent.',
        pitches: [
          { t: 'Single Responsibility Decomposition', tech: 'Cohesion Metrics · Class Responsibilities', d: 'Refactor 2,000-line God objects into high-cohesion, single-purpose classes with explicit boundaries.' },
          { t: 'Open/Closed Extensibility Harness', tech: 'Strategy Interfaces · Polymorphic Hooks', d: 'Design classes open for feature expansion but closed for modification—adding new behavior without touching tested code.' },
          { t: 'Liskov Substitution Contract Verification', tech: 'Behavioral Subtyping · Preconditions & Postconditions', d: 'Ensure derived classes preserve superclass invariants and behaviors without throwing unexpected NotImplemented exceptions.' },
          { t: 'Interface Segregation & Inversion of Control', tech: 'Lean Role Interfaces · IoC Containers', d: 'Split bloated monolithic interfaces into focused client-specific role contracts; decouple dependencies via constructor injection.' },
        ],
      },
      {
        id: 'kang-structural',
        waypoint: 'The Great Shelf & Camp II',
        alt: 'ELEV 6,200M',
        baro: '460 hPa · SHELF CROSSING',
        sub: 'The Second Treasure: Creational & Structural Design Patterns',
        brief: 'The second treasure: robust object assembly and composition. Assemble complex software modules with clean structural decoupling.',
        pitches: [
          { t: 'Factory & Abstract Factory Architecture', tech: 'Creational Patterns · Dynamic Registry', d: 'Decouple client code from concrete class instantiation; support dynamic runtime plugin registration.' },
          { t: 'Double-Checked Locking Singleton', tech: 'Memory Barriers · Volatile Keywords · Thread Safety', d: 'Implement thread-safe, lazily initialized singletons with memory barrier safety across multi-core processors.' },
          { t: 'Adapter & Facade Decoupler', tech: 'Structural Patterns · Third-Party Wrappers', d: 'Isolate third-party libraries behind clean domain adapters to make external dependencies easily swappable.' },
          { t: 'Composite Inode Directory Tree', tech: 'Composite Pattern · Recursive Traversals', d: 'Model Linux VFS hierarchical directories and files using the Composite pattern with unified traversal interfaces.' },
        ],
      },
      {
        id: 'kang-behavioral',
        waypoint: 'The North Col & Camp III',
        alt: 'ELEV 7,100M',
        baro: '395 hPa · RIDGE CREST',
        sub: 'The Third Treasure: Behavioral Dynamics & State Machines',
        brief: 'The third treasure: state transitions and event orchestration. Model dynamic workflows without deeply nested if-else ladders.',
        pitches: [
          { t: 'Finite State Machine Pattern', tech: 'State Pattern · State Transition Table', d: 'Implement clean state pattern for elevator cars (MOVING_UP, IDLE, DOORS_OPEN) and booking lifecycles with transition guards.' },
          { t: 'Strategy Payment & Fee Engine', tech: 'Strategy Pattern · Dynamic Polymorphism', d: 'Swap fee computation algorithms (Flat, Hourly, Peak Surge) dynamically at runtime without modifying checkout code.' },
          { t: 'Observer Reactive Event Bus', tech: 'Observer Pattern · Pub/Sub · Weak References', d: 'Build a memory-leak-safe event notification bus decoupling domain events from email, SMS, and webhook listeners.' },
          { t: 'Command Pattern with Undo/Redo Stacks', tech: 'Command Pattern · Memento Pattern · Action History', d: 'Encapsulate user actions into executable command objects supporting multi-level undo, redo, and macro playback.' },
        ],
      },
      {
        id: 'kang-concurrency',
        waypoint: 'The West Face Death Zone',
        alt: 'ELEV 7,950M',
        baro: '350 hPa · ACTIVE HAZARD',
        sub: 'The Fourth Treasure: Thread Safety, Memory Models & Concurrency',
        brief: 'The fourth treasure: multi-threaded safety. The lethal altitude where race conditions, deadlocks, and memory visibility bugs corrupt data.',
        hazard: true,
        pitches: [
          { t: 'Read-Write Lock & Mutex Guards', tech: 'Mutex · ReentrantReadWriteLock · Deadlock Avoidance', d: 'Allow concurrent multi-threaded reads while guaranteeing exclusive write serialization without priority inversion.' },
          { t: 'Bounded Blocking Producer-Consumer Queue', tech: 'Condition Variables · Wait/Notify · Spurious Wakeups', d: 'Implement thread-safe blocking queue handling ring buffers, capacity saturation, and poison pill termination.' },
          { t: 'Lock-Free Atomic State & CAS Loops', tech: 'AtomicReference · Compare-And-Swap · ABA Problem', d: 'Achieve high-throughput thread coordination without mutex locks using hardware-level atomic CAS instructions.' },
          { t: 'Concurrency-Safe Task Scheduler', tech: 'PriorityBlockingQueue · Work-Stealing Workers', d: 'Schedule immediate and delayed cron tasks across dedicated thread worker pools with graceful drain shutdown.' },
        ],
      },
      {
        id: 'kang-summit',
        waypoint: 'The Five Treasures Pinnacle',
        alt: 'ELEV 8,586M',
        baro: '320 hPa · SUMMIT OF THE FIVE TREASURES',
        sub: 'The Fifth Treasure: Full Production System Implementations',
        brief: 'Reach the summit of Kangchenjunga. Consolidate SOLID, design patterns, and thread safety into full real-world FAANG low-level systems.',
        pinnacle: true,
        pitches: [
          { t: 'Parking Lot Management System', tech: 'OOP Full Model · Vehicle Hierarchy · Concurrency Locks', d: 'Complete multi-floor spot allocation, automated ticket terminals, dynamic fee strategies, and spot reservation locks.' },
          { t: 'High-Contention Movie Seat Reservation', tech: 'Redis Ephemeral Locks · CAS Concurrency · Booking State Machine', d: 'Design BookMyShow seat allocation with 10-minute temporary holds, optimistic locks, and automatic expiry rollbacks.' },
          { t: 'In-Memory File System (Linux VFS)', tech: 'Composite Inodes · Path Parser · RW-Locks · Soft/Hard Links', d: 'Complete in-memory VFS supporting mkdir, touch, read/write streams, and relative path navigation.' },
          { t: 'In-Memory Rate Limiter Engine', tech: 'Token Bucket · Sliding Window Log · Lazy Replenishment', d: 'Sub-microsecond thread-safe rate limiter with dynamic rule configuration and zero memory leakage.' },
        ],
      },
    ]),
  },
};

export function getSummit(id: string): SummitConfig {
  return summits[id] || summits.everest;
}
