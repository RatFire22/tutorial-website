import { summits } from './summitsData';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: 'Article' | 'HLD System' | 'LLD Problem' | 'Summit Pitch';
  badgeColor: string;
  keywords: string[];
}

export const hldDirectoryItems: SearchItem[] = [
  {
    id: 'hld-rate-limiter',
    title: 'Distributed Rate Limiter',
    subtitle: 'Multi-region sliding window counter using Redis Lua scripts (5M+ QPS)',
    url: '/blog/designing-distributed-rate-limiter-hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['rate limiter', 'redis lua', 'token bucket', 'sliding window', 'api security'],
  },
  {
    id: 'hld-cache',
    title: 'Distributed In-Memory Cache',
    subtitle: 'Consistent hashing with virtual nodes and stampede protection (10M+ reads/sec)',
    url: '/blog/designing-distributed-cache-consistent-hashing-hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['cache', 'consistent hashing', 'virtual nodes', 'lru', 'redis'],
  },
  {
    id: 'hld-notification',
    title: 'Distributed Notification Service',
    subtitle: 'Multi-channel APNs/FCM/Twilio with Kafka partitions and user deduplication (500M+ msg/day)',
    url: '/blog/designing-distributed-notification-service-hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['notification', 'kafka', 'push', 'apns', 'fcm', 'idempotency'],
  },
  {
    id: 'hld-ticketmaster',
    title: 'Ticketmaster / Flash Booking',
    subtitle: 'High-concurrency seat reservation with distributed locks and virtual waiting rooms',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['ticketmaster', 'flash sale', 'seat lock', 'booking', 'virtual queue'],
  },
  {
    id: 'hld-dropbox',
    title: 'Dropbox / Google Drive',
    subtitle: 'Block-level chunking (4MB), content hash deduplication and delta sync (50PB+)',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['dropbox', 'google drive', 'chunking', 'deduplication', 'sync', 's3'],
  },
  {
    id: 'hld-uber',
    title: 'Uber / Lyft Ride Hailing',
    subtitle: 'Geospatial proximity matching using Google S2/H3 and real-time trip state machines',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['uber', 'lyft', 'geospatial', 's2', 'h3', 'geohash', 'websockets'],
  },
  {
    id: 'hld-news-feed',
    title: 'Facebook News Feed',
    subtitle: 'Fan-out on Write for users vs Fan-out on Read for celebrities (2B+ users)',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['facebook', 'news feed', 'fan-out', 'redis timeline', 'social graph'],
  },
  {
    id: 'hld-whatsapp',
    title: 'WhatsApp / Messenger',
    subtitle: 'WebSocket connection gateways, offline Cassandra message queues and E2E encryption',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['whatsapp', 'messenger', 'chat', 'websockets', 'e2e encryption', 'cassandra'],
  },
  {
    id: 'hld-youtube',
    title: 'YouTube / Netflix Video Streaming',
    subtitle: 'Adaptive Bitrate Streaming (HLS/DASH), multi-resolution transcoding DAGs and CDN edges',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['youtube', 'netflix', 'streaming', 'hls', 'dash', 'transcoding', 'video'],
  },
  {
    id: 'hld-url-shortener',
    title: 'TinyURL / Bitly URL Shortener',
    subtitle: 'Base62 key encoding with pre-generated range tokens (100k writes/sec, 1B reads)',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['tinyurl', 'bitly', 'url shortener', 'base62', 'hashing', 'redis'],
  },
  {
    id: 'hld-crawler',
    title: 'Web Crawler (Google Scale)',
    subtitle: 'Politeness delays, URL frontier priority queues, DNS caching and Bloom filters (10B pages)',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['crawler', 'web crawler', 'bloom filter', 'url frontier', 'robot.txt'],
  },
  {
    id: 'hld-payment',
    title: 'Stripe Payment Gateway & Ledger',
    subtitle: 'Double-entry bookkeeping, two-phase commit sagas, and idempotent idempotency-key locks',
    url: '/system-design/hld',
    category: 'HLD System',
    badgeColor: '#0284c7',
    keywords: ['stripe', 'payment', 'ledger', 'double-entry', 'idempotency', 'saga'],
  },
];

export const lldDirectoryItems: SearchItem[] = [
  {
    id: 'lld-parking-lot',
    title: 'Parking Lot Management System',
    subtitle: 'Strategy & Factory patterns, vehicle spots (EV/Compact), multi-floor synchronized locks',
    url: '/blog/parking-lot-system-lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['parking lot', 'strategy', 'factory', 'mutex', 'concurrency', 'spot'],
  },
  {
    id: 'lld-task-scheduler',
    title: 'Concurrency-Safe Task Scheduler',
    subtitle: 'Worker pool, delay queues, exponential backoff and graceful poison pill shutdown',
    url: '/blog/concurrency-safe-task-scheduler-lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['task scheduler', 'worker pool', 'concurrency', 'thread pool', 'delay queue'],
  },
  {
    id: 'lld-elevator',
    title: 'Elevator Control System (Multi-Car)',
    subtitle: 'SCAN/LOOK disk scheduling, State Pattern, and internal/external call dispatchers',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['elevator', 'state pattern', 'scan algorithm', 'dispatch', 'car'],
  },
  {
    id: 'lld-bookmyshow',
    title: 'Movie Ticket Booking (BookMyShow)',
    subtitle: '10-minute temporary seat locks, optimistic concurrency, and CAS rollbacks',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['bookmyshow', 'movie ticket', 'seat lock', 'optimistic lock', 'concurrency'],
  },
  {
    id: 'lld-amazon-locker',
    title: 'Amazon Locker Self-Service Hub',
    subtitle: 'Compartment sizing (S/M/L), OTP cryptographic validation, and auto-timeout eviction',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['amazon locker', 'locker', 'otp', 'state pattern', 'hardware'],
  },
  {
    id: 'lld-vfs',
    title: 'In-Memory File System (Linux VFS)',
    subtitle: 'Composite pattern, Inode directory trees, path tokenizer, and read/write stream handles',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['file system', 'vfs', 'composite pattern', 'inode', 'path resolution'],
  },
  {
    id: 'lld-ratelimiter',
    title: 'In-Memory Rate Limiter (Core OOP)',
    subtitle: 'Token Bucket & Sliding Window Log in pure classes with microsecond overhead',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['rate limiter', 'token bucket', 'sliding window', 'strategy pattern'],
  },
  {
    id: 'lld-logging',
    title: 'Logging Framework (Log4j / Winston)',
    subtitle: 'Hierarchical loggers, custom appenders, Observer pattern, and async ring buffer queues',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['logging', 'log4j', 'observer pattern', 'appender', 'ring buffer'],
  },
  {
    id: 'lld-splitwise',
    title: 'Splitwise / Expense Sharing App',
    subtitle: 'Equal, percentage, and exact split strategies with graph balance simplification',
    url: '/system-design/lld',
    category: 'LLD Problem',
    badgeColor: '#6366F1',
    keywords: ['splitwise', 'expense sharing', 'strategy pattern', 'graph debt simplification'],
  },
];

// Extract summit pitches into search index
export function getSummitSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  Object.values(summits).forEach((summit) => {
    summit.stages.forEach((stage) => {
      stage.pitches.forEach((pitch) => {
        items.push({
          id: `pitch-${summit.id}-${pitch.stopNum}`,
          title: `${pitch.t} (Pitch ${pitch.stopNum})`,
          subtitle: `${summit.name} (${summit.elevation}) · ${pitch.tech}`,
          url:
            summit.id === 'k2'
              ? `/system-design/hld/expedition#${stage.id}`
              : summit.id === 'kangchenjunga'
              ? `/system-design/lld/expedition#${stage.id}`
              : `/expedition#${stage.id}`,
          category: 'Summit Pitch',
          badgeColor: summit.badgeColor,
          keywords: [pitch.t, pitch.tech, summit.name, stage.waypoint, 'expedition', 'summit'],
        });
      });
    });
  });

  return items;
}
