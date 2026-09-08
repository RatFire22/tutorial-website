'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ExternalLink, Clock, X, Layers } from 'lucide-react';

interface HLDProblem {
  id: string;
  title: string;
  domain: string;
  category: 'Social & Feeds' | 'Streaming & Media' | 'Storage & Infra' | 'FinTech & E-Commerce' | 'Geospatial & Real-time';
  summary: string;
  patterns: string[];
  scale: string;
  articleSlug?: string;
  difficulty: 'Medium' | 'Hard' | 'Senior/Staff';
}

const hldProblems: HLDProblem[] = [
  {
    id: 'rate-limiter',
    title: 'Distributed Rate Limiter',
    domain: 'API Security & Gateways',
    category: 'Storage & Infra',
    summary: 'Multi-region token bucket and sliding window counter using atomic Redis Lua scripts to eliminate race conditions.',
    patterns: ['Token Bucket', 'Sliding Window', 'Redis Lua', 'Fail-Open Topology'],
    scale: '5M+ QPS · < 2ms Latency',
    articleSlug: 'designing-distributed-rate-limiter-hld',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'distributed-cache',
    title: 'Distributed In-Memory Cache',
    domain: 'High-Throughput Storage',
    category: 'Storage & Infra',
    summary: 'Global distributed key-value cache with consistent hashing, virtual nodes, write-back policies, and stampede protection.',
    patterns: ['Consistent Hashing', 'Virtual Nodes', 'LRU Eviction', 'Cache Stampede'],
    scale: '10M+ Reads/sec · Sub-millisecond',
    articleSlug: 'designing-distributed-cache-consistent-hashing-hld',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'notification-system',
    title: 'Distributed Notification Service',
    domain: 'Real-Time Messaging',
    category: 'Streaming & Media',
    summary: 'Multi-channel notification engine across APNs, FCM, Twilio SMS, and SES Email with strict user rate limits and deduplication.',
    patterns: ['Kafka Partitions', 'Idempotency Keys', 'Circuit Breakers', 'Priority Queues'],
    scale: '500M+ Messages/Day · < 1s P99',
    articleSlug: 'designing-distributed-notification-service-hld',
    difficulty: 'Medium',
  },
  {
    id: 'ticketmaster',
    title: 'Ticketmaster / Flash Booking',
    domain: 'High Contention Ticketing',
    category: 'FinTech & E-Commerce',
    summary: 'High-concurrency concert ticket reservation with distributed seat locking, virtual waiting rooms, and timeout rollbacks.',
    patterns: ['Distributed Locks', 'Virtual Waiting Room', 'Optimistic Locking', 'Payment Sagas'],
    scale: '50,000 Seats Sold in 10s',
    difficulty: 'Hard',
  },
  {
    id: 'dropbox',
    title: 'Dropbox / Google Drive',
    domain: 'Cloud File Storage & Sync',
    category: 'Storage & Infra',
    summary: 'File synchronization platform featuring block-level chunking, content hash deduplication, metadata DB, and delta sync engines.',
    patterns: ['Content Chunking (4MB)', 'Deduplication', 'Metadata Store', 'S3 Multipart'],
    scale: '50PB+ Storage · 1B+ Syncs',
    difficulty: 'Hard',
  },
  {
    id: 'uber',
    title: 'Uber / Lyft Ride Hailing',
    domain: 'Real-Time Geospatial Dispatch',
    category: 'Geospatial & Real-time',
    summary: 'Location ping ingestion from drivers, geospatial proximity matching using Google S2 / H3, dynamic surge pricing, and trip state machines.',
    patterns: ['Google S2 / H3', 'WebSockets', 'Geohashing', 'Dynamic Surge Pricing'],
    scale: '1M+ Drivers Live · 5s Location Pings',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'fb-news-feed',
    title: 'Facebook News Feed',
    domain: 'Social Graphs & Feed Generation',
    category: 'Social & Feeds',
    summary: 'Feed fan-out architectures comparing Fan-out-on-Write for normal users vs Fan-out-on-Read for celebrities, backed by Redis clusters.',
    patterns: ['Fan-out on Write/Read', 'Ranking Algorithms', 'Redis Feed Cache', 'Graph DB'],
    scale: '2B+ Active Users · 500k Posts/sec',
    difficulty: 'Hard',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp / Messenger',
    domain: 'End-to-End Encrypted Chat',
    category: 'Streaming & Media',
    summary: 'Real-time 1:1 and group chat architecture with WebSocket connection gateways, offline message queues, and read receipts.',
    patterns: ['WebSockets', 'Cassandra Chat History', 'Heartbeat Gateways', 'E2E Encryption'],
    scale: '100B+ Messages/Day · 2B Users',
    difficulty: 'Hard',
  },
  {
    id: 'youtube-netflix',
    title: 'YouTube / Netflix Video Streaming',
    domain: 'Video Processing & Content Delivery',
    category: 'Streaming & Media',
    summary: 'Video ingestion pipeline with chunked chunk transcoders (HLS/DASH), multi-CDN distribution, and adaptive bitrate streaming.',
    patterns: ['Adaptive Bitrate (HLS)', 'Async Transcoding', 'CDN Origin Shielding', 'Blob Storage'],
    scale: '1B+ Hours Streamed Daily',
    difficulty: 'Hard',
  },
  {
    id: 'tinder',
    title: 'Tinder Dating & Matchmaking',
    domain: 'Geospatial Recommendation Swiping',
    category: 'Geospatial & Real-time',
    summary: 'Geospatial recommendation feed generation with double-blind swipe caches, mutual match detection, and ephemeral swipe queues.',
    patterns: ['Geohash Bucketing', 'Ephemeral Swipe Cache', 'Mutual Match Signals', 'Kafka'],
    scale: '2B+ Swipes Daily',
    difficulty: 'Medium',
  },
  {
    id: 'leetcode',
    title: 'LeetCode / Online Judge',
    domain: 'Untrusted Code Sandboxing',
    category: 'Storage & Infra',
    summary: 'Secure code execution system using isolated Docker containers, cgroups resource limits, and asynchronous judge result polling.',
    patterns: ['Sandbox Isolation (gVisor)', 'cgroups & CPU Quotas', 'Worker Pools', 'Judge Queue'],
    scale: '100k+ Code Runs/min',
    difficulty: 'Medium',
  },
  {
    id: 'bitly',
    title: 'Bitly / TinyURL',
    domain: 'High-Read URL Shortener',
    category: 'Storage & Infra',
    summary: 'URL shortening service utilizing Base62 tokenization, pre-generated sequence ranges, and high-ratio distributed cache reads.',
    patterns: ['Base62 Encoding', 'Key Generation Service', 'Read-Heavy Cache', '301 vs 302'],
    scale: '100M URLs Created/Month · 10B Clicks',
    difficulty: 'Medium',
  },
  {
    id: 'youtube-top-k',
    title: 'YouTube Top-K Heavy Hitters',
    domain: 'Streaming Analytics & Aggregation',
    category: 'Streaming & Media',
    summary: 'Real-time identification of trending videos over rolling 1-hour windows using Count-Min Sketch and sliding window heaps.',
    patterns: ['Count-Min Sketch', 'Sliding Window Top-K', 'Apache Flink', 'Heavy Hitters'],
    scale: '1M+ View Events/sec',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'fb-live-comments',
    title: 'Facebook Live Stream Comments',
    domain: 'Extreme Fan-Out Real-Time Chat',
    category: 'Streaming & Media',
    summary: 'Broadcast live comment stream where 1M viewers watch a celebrity simultaneously, utilizing message sampling and Redis pub/sub.',
    patterns: ['Pub/Sub Fan-out', 'Adaptive Rate Dropping', 'In-Memory Ring Buffers'],
    scale: '1M+ Concurrent Viewers/Stream',
    difficulty: 'Hard',
  },
  {
    id: 'web-crawler',
    title: 'Distributed Web Crawler',
    domain: 'Big Data Ingestion & Scraping',
    category: 'Storage & Infra',
    summary: 'High-throughput web scraping fleet with URL frontier prioritization, polite domain rate limiting, SimHash deduplication, and DNS caching.',
    patterns: ['URL Frontier Queue', 'SimHash Deduplication', 'Robots.txt Cache', 'Worker Nodes'],
    scale: '1B+ Webpages Crawled / Month',
    difficulty: 'Hard',
  },
  {
    id: 'ad-click-aggregator',
    title: 'Ad Click Aggregator',
    domain: 'Real-Time Financial Streaming',
    category: 'FinTech & E-Commerce',
    summary: 'Accurate click-through aggregation pipeline for ad billing, ensuring exactly-once processing with Kafka streams and watermark windows.',
    patterns: ['Exactly-Once Semantics', 'Tumbling Windows', 'Click-Deduplication', 'Time-Series DB'],
    scale: '500,000 Clicks/sec · $100M+ Billing',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'fb-post-search',
    title: 'Facebook Post Search',
    domain: 'Distributed Full-Text Search',
    category: 'Social & Feeds',
    summary: 'Inverted index search infrastructure with custom tokenizers, document partition routers, and real-time index segment updates.',
    patterns: ['Inverted Index', 'Distributed Lucene', 'Document vs Term Partitioning'],
    scale: '1 Trillion Posts Indexed',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'yelp-google-maps',
    title: 'Yelp / Google Maps Proximity',
    domain: 'Point-of-Interest Search',
    category: 'Geospatial & Real-time',
    summary: 'Location search querying restaurants within a 5-mile radius using hierarchical Quadtrees and geohash prefix range scans.',
    patterns: ['Quadtrees', 'Geohash Range Queries', 'Read-Heavy Spatial Index', 'CDN Edge'],
    scale: '100M+ Points of Interest',
    difficulty: 'Medium',
  },
  {
    id: 'instagram',
    title: 'Instagram Photos & Stories',
    domain: 'Media Sharing & Ephemeral Feeds',
    category: 'Social & Feeds',
    summary: 'High-volume photo and ephemeral 24-hour Story service with asynchronous resizing pipelines and memory-buffered story views.',
    patterns: ['Async Image Resizers', '24h Ephemeral TTLs', 'Timeline Fan-out', 'Object Storage'],
    scale: '500M Daily Active Users',
    difficulty: 'Medium',
  },
  {
    id: 'strava',
    title: 'Strava GPS Leaderboards',
    domain: 'Polyline Tracking & Segment Matching',
    category: 'Geospatial & Real-time',
    summary: 'Ingestion of raw GPX coordinates, Douglas-Peucker polyline simplification, and segment leaderboard rank updates.',
    patterns: ['Douglas-Peucker Algorithm', 'Segment Spatial Matching', 'Redis Sorted Sets (ZSET)'],
    scale: '50M+ Recorded Activities/Week',
    difficulty: 'Hard',
  },
  {
    id: 'online-auction',
    title: 'Online Live Auction (eBay)',
    domain: 'Real-Time Bidding & Ordering',
    category: 'FinTech & E-Commerce',
    summary: 'Microsecond bid processing with strict monotonic order increments, countdown timers, and automated sniper bid resolution.',
    patterns: ['Distributed Mutex', 'Event Sourcing', 'WebSockets', 'Strict Ordering Queue'],
    scale: '10,000 Bids/sec at Auction Close',
    difficulty: 'Hard',
  },
  {
    id: 'job-scheduler',
    title: 'Distributed Job Scheduler',
    domain: 'Cluster Workload Orchestration',
    category: 'Storage & Infra',
    summary: 'Fault-tolerant distributed cron execution platform with ZooKeeper leader consensus, heartbeat monitoring, and at-least-once execution.',
    patterns: ['Leader Election', 'ZooKeeper Ephemeral Nodes', 'Time Wheel Hashed Queues'],
    scale: '10M+ Scheduled Tasks Daily',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'google-news',
    title: 'Google News Aggregator',
    domain: 'Content Clustering & Ranking',
    category: 'Social & Feeds',
    summary: 'Automated news extraction from 50,000 publishers with TF-IDF/BERT article embedding clustering and localized trending ranking.',
    patterns: ['Text Embeddings & Clustering', 'Deduplication', 'Personalized Feed Router'],
    scale: '50,000 Publishers · Real-Time',
    difficulty: 'Hard',
  },
  {
    id: 'camelcamelcamel',
    title: 'CamelCamelCamel Price Tracker',
    domain: 'Price Scraping & Alert Triggers',
    category: 'FinTech & E-Commerce',
    summary: 'Amazon product price tracking daemon with adaptive polling intervals based on product volatility and instant email/push threshold triggers.',
    patterns: ['Adaptive Polling Frequency', 'Time-Series Compression', 'Alert Evaluation Matrix'],
    scale: '100M Products Monitored',
    difficulty: 'Medium',
  },
  {
    id: 'robinhood',
    title: 'Robinhood Stock Trading Engine',
    domain: 'Order Matching & Execution',
    category: 'FinTech & E-Commerce',
    summary: 'High-frequency order book matching (Limit, Market, Stop-loss), FIX protocol execution, and ACID double-entry ledger transactions.',
    patterns: ['In-Memory Order Book (L2/L3)', 'Double-Entry Bookkeeping', 'FIX Protocol'],
    scale: 'Microsecond Execution · Zero Data Loss',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'google-docs',
    title: 'Google Docs Real-Time Collaboration',
    domain: 'Collaborative Document Editing',
    category: 'Streaming & Media',
    summary: 'Real-time multi-user document editor with Conflict-Free Replicated Data Types (CRDTs), vector clocks, and WebSocket session coordinators.',
    patterns: ['CRDT (Yjs/Automerge)', 'Operational Transformation (OT)', 'Vector Clocks'],
    scale: '100+ Concurrent Editors per Doc',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'payment-system',
    title: 'Payment Gateway & Ledger (Stripe)',
    domain: 'Mission-Critical Financial Transactions',
    category: 'FinTech & E-Commerce',
    summary: 'Zero-tolerance financial payment processing with strict idempotency keys, two-phase commit database ledgers, and third-party failover.',
    patterns: ['Double-Entry Ledger', 'Idempotency Layer', 'Reconciliation Pipeline', 'PCI-DSS Compliance'],
    scale: '$500B+ Annual Volume · 99.999% SLA',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'metrics-monitoring',
    title: 'Metrics & Monitoring System (Datadog)',
    domain: 'Telemetry & Time-Series Alerts',
    category: 'Storage & Infra',
    summary: 'High-velocity metric ingestion pipeline supporting counters, gauges, histograms, Gorilla delta-of-delta compression, and alerting evaluation.',
    patterns: ['Gorilla Compression', 'Time-Series Database', 'Push vs Pull Agents', 'Rollup Aggregations'],
    scale: '100M Data Points/sec Ingested',
    difficulty: 'Hard',
  },
  {
    id: 'online-chess',
    title: 'Online Chess Game Server',
    domain: 'Turn-Based Multiplayer State',
    category: 'Streaming & Media',
    summary: 'Authoritative server-side game state engine managing move validation, FEN strings, clock timers, and matchmaking ELO ladders.',
    patterns: ['Authoritative Game State', 'WebSockets', 'In-Memory State Machine', 'ELO Matchmaking'],
    scale: '1M+ Concurrent Live Games',
    difficulty: 'Medium',
  },
  {
    id: 'chatgpt-platform',
    title: 'ChatGPT & LLM Serving Platform',
    domain: 'AI Gateway & Token Streaming',
    category: 'Storage & Infra',
    summary: 'High-throughput LLM gateway coordinating GPU cluster inference, Server-Sent Events (SSE) token streaming, KV-cache reuse, and context management.',
    patterns: ['SSE Token Streaming', 'KV-Cache Sharing', 'Model Gateway Router', 'Dynamic Batching'],
    scale: '100M Active Prompts Daily',
    difficulty: 'Senior/Staff',
  },
  {
    id: 'flash-sale',
    title: 'E-Commerce Flash Sale System',
    domain: 'Extreme Stock Contention',
    category: 'FinTech & E-Commerce',
    summary: 'Preventing overselling when 1M shoppers attempt to buy 500 limited items in 3 seconds using Redis DECR and asynchronous order fulfillment.',
    patterns: ['Redis Atomic Decr', 'Asynchronous Order Queue', 'Rate Limiter Buffering', 'Pessimistic Locking'],
    scale: '1M Users for 500 Inventory Items',
    difficulty: 'Hard',
  },
  {
    id: 'gopuff-doordash',
    title: 'Local Delivery Service (DoorDash)',
    domain: 'Order Batching & Dispatch',
    category: 'Geospatial & Real-time',
    summary: 'Real-time order dispatching and courier route batching, dynamic ETA estimation, and live inventory state locks across local dark stores.',
    patterns: ['Vehicle Routing Problem (VRP)', 'Order Batching', 'Geospatial Sharding', 'Inventory State Machine'],
    scale: '5M Orders/Day · 500k Couriers',
    difficulty: 'Hard',
  },
];

const categories = ['All', 'Social & Feeds', 'Streaming & Media', 'Storage & Infra', 'FinTech & E-Commerce', 'Geospatial & Real-time'] as const;

export default function HLDProblemDirectory() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<HLDProblem | null>(null);

  const filtered = hldProblems.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.patterns.some((pattern) => pattern.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ marginTop: '3.5rem', marginBottom: '4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span>HLD Problem Breakdowns &amp; Architecture Blueprints</span>
            <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#0284c7', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
              {hldProblems.length} Systems
            </span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.35rem 0 0 0' }}>
            Industry-standard distributed systems asked at FAANG, Tier-1 tech companies, and high-scale startups.
          </p>
        </div>

        {/* Search Box */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search problems or patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem 0.55rem 2.2rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Category Filter Row */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Problems Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((prob) => {
          const isPublished = Boolean(prob.articleSlug);

          return (
            <div
              key={prob.id}
              onClick={() => {
                if (prob.articleSlug) {
                  router.push(`/blog/${prob.articleSlug}`);
                } else {
                  setSelectedProblem(prob);
                }
              }}
              style={{
                background: 'var(--bg-card)',
                border: isPublished ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                cursor: 'pointer',
              }}
              className="card-interactive-hover"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', background: 'rgba(56, 189, 248, 0.12)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    {prob.domain}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {prob.difficulty}
                    </span>
                    {isPublished ? (
                      <span style={{ fontSize: '0.65rem', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        PUBLISHED
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.65rem', background: 'var(--bg-surface)', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                        CURRICULUM
                      </span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                  {prob.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 1rem 0' }}>
                  {prob.summary}
                </p>

                {/* Pattern Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {prob.patterns.map((p) => (
                    <span
                      key={p}
                      style={{
                        fontSize: '0.725rem',
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-surface)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {prob.scale}
                </span>

                {isPublished ? (
                  <Link
                    href={`/blog/${prob.articleSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.8rem',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Read Architecture</span>
                    <ExternalLink size={13} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProblem(prob);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <Clock size={12} />
                    <span>View Spec</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedProblem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
          }}
          onClick={() => setSelectedProblem(null)}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProblem(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#0284c7',
                  background: 'rgba(56, 189, 248, 0.12)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {selectedProblem.domain}
              </span>
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  background: 'var(--bg-surface)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {selectedProblem.difficulty}
              </span>
              {selectedProblem.articleSlug ? (
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                  Full Guide Live
                </span>
              ) : (
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '4px' }}>
                  Curriculum Blueprint
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', paddingRight: '2rem' }}>
              {selectedProblem.title}
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedProblem.summary}
            </p>

            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                System Scale &amp; Performance Target
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {selectedProblem.scale}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} color="var(--primary)" /> Key Architectural Patterns &amp; Building Blocks
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {selectedProblem.patterns.map((pat) => (
                  <span
                    key={pat}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      background: 'rgba(99, 102, 241, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                    }}
                  >
                    {pat}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setSelectedProblem(null)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>

              {selectedProblem.articleSlug ? (
                <Link
                  href={`/blog/${selectedProblem.articleSlug}`}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>Read Complete Blueprint</span>
                  <ExternalLink size={14} />
                </Link>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Vishwajeet Gupta is authoring this architectural guide
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
