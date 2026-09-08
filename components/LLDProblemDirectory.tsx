'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ExternalLink, Sparkles, CheckCircle2, Clock, X, Layers, Code, Check } from 'lucide-react';

interface LLDProblem {
  id: string;
  title: string;
  category: 'State Machines' | 'Resource Allocation' | 'Concurrency & Queues' | 'Game Design' | 'File & Infra';
  summary: string;
  patterns: string[];
  keyClasses: string[];
  articleSlug?: string;
  difficulty: 'Medium' | 'Hard' | 'Senior/Staff';
  requirements: {
    functional: string[];
    nonFunctional: string[];
  };
  designHighlights: string[];
}

const lldProblems: LLDProblem[] = [
  {
    id: 'parking-lot',
    title: 'Parking Lot Management System',
    category: 'Resource Allocation',
    summary: 'Multi-floor parking garage supporting vehicle spot allocation (Compact, Large, EV charging), dynamic hourly fee computation, and concurrency-safe spot reservation.',
    patterns: ['Strategy Pattern', 'Factory Pattern', 'Singleton', 'Mutex Locking'],
    keyClasses: ['ParkingLot', 'ParkingFloor', 'ParkingSpot', 'Vehicle', 'Ticket', 'FeeCalculator'],
    articleSlug: 'parking-lot-system-lld',
    difficulty: 'Medium',
    requirements: {
      functional: [
        'Support multiple vehicle types: Motorcycle, Compact Car, Large Truck, EV.',
        'Multiple entry and exit terminals with automated ticket issuance.',
        'Real-time available capacity display per floor and spot category.',
        'Dynamic fee calculation based on duration and vehicle classification.',
      ],
      nonFunctional: [
        'Thread-safe spot assignment under high simultaneous arrivals.',
        'O(1) spot lookup and release using categorized free-spot heaps or bitsets.',
        'Extensible fee calculator using Strategy pattern without modifying core checkout.',
      ],
    },
    designHighlights: [
      'Spot inheritance hierarchy: ParkingSpot -> CompactSpot, LargeSpot, ElectricSpot with specialized attributes.',
      'PaymentStrategy interface allowing FlatFee, HourlyFee, and PeakSurgeFee calculation.',
      'Floor-level synchronized locks to prevent race conditions during peak rush-hour arrivals.',
    ],
  },
  {
    id: 'concurrency-task-scheduler',
    title: 'Concurrency-Safe Task Scheduler & Worker Pool',
    category: 'Concurrency & Queues',
    summary: 'Production thread-safe job execution engine featuring priority queues, delay timers, graceful shutdown, exponential backoff, and poison pill termination.',
    patterns: ['Worker Pool', 'Producer-Consumer', 'Condition Variables', 'Observer Pattern'],
    keyClasses: ['TaskScheduler', 'WorkerPool', 'WorkerThread', 'PriorityBlockingQueue', 'ScheduledTask'],
    articleSlug: 'concurrency-safe-task-scheduler-lld',
    difficulty: 'Senior/Staff',
    requirements: {
      functional: [
        'Schedule one-off immediate tasks, delayed tasks (run at timestamp T), and recurring cron tasks.',
        'Configurable worker pool with minimum and maximum concurrency bounds.',
        'Task cancellation and priority preemption for mission-critical workloads.',
        'Execution metrics: queue latency, task duration, retry attempts, and failures.',
      ],
      nonFunctional: [
        'Zero thread starvation using priority heaps backed by condition variable notifications.',
        'Graceful shutdown draining in-flight jobs within configurable timeout threshold.',
        'Strict isolation: individual worker task panics do not terminate the parent process.',
      ],
    },
    designHighlights: [
      'DelayQueue backed by a min-heap sorted by next execution timestamp.',
      'Worker state machine: IDLE -> EXECUTING -> PAUSED -> TERMINATED with heartbeat tracking.',
      'Exponential backoff decorator wrapping retryable task execution.',
    ],
  },
  {
    id: 'elevator-system',
    title: 'Elevator Control System (Multi-Car)',
    category: 'State Machines',
    summary: 'Multi-car elevator bank servicing high-rise traffic using the SCAN/LOOK disk scheduling algorithm, request queues, and state-driven floor transitions.',
    patterns: ['State Pattern', 'Strategy Pattern', 'Observer Pattern', 'Command Pattern'],
    keyClasses: ['ElevatorController', 'ElevatorCar', 'FloorRequest', 'InternalButton', 'ExternalDispatcher'],
    difficulty: 'Medium',
    requirements: {
      functional: [
        'Coordinate N elevators across M floors with internal and external call buttons.',
        'Handle directional pickup requests (UP/DOWN buttons on floors).',
        'Emergency stop, door sensor obstacle detection, and weight capacity warnings.',
        'Energy-efficient idle parking distribution across lower, middle, and upper zones.',
      ],
      nonFunctional: [
        'Minimize average passenger wait time and prevent starvation at intermediate floors.',
        'Thread safety: each elevator operates its own motion loop decoupled from dispatch.',
        'Fault tolerance: car failure automatically triggers reallocation of pending requests.',
      ],
    },
    designHighlights: [
      'Car State Machine: MOVING_UP, MOVING_DOWN, IDLE, MAINTENANCE with strict transition guards.',
      'SCAN / LOOK algorithm utilizing two sorted sets (up-stops and down-stops) per car.',
      'ElevatorDispatcher selects best candidate car based on proximity, direction, and load factor.',
    ],
  },
  {
    id: 'movie-ticket-booking',
    title: 'Movie Ticket Booking System (BookMyShow)',
    category: 'Resource Allocation',
    summary: 'Seat reservation engine handling high-contention flash sales with 10-minute temporary locks, optimistic concurrency, and payment timeout rollbacks.',
    patterns: ['Unit of Work', 'Optimistic Locking', 'State Pattern', 'Factory Pattern'],
    keyClasses: ['Cinema', 'Auditorium', 'Showtime', 'Seat', 'Booking', 'SeatLockManager', 'Payment'],
    difficulty: 'Hard',
    requirements: {
      functional: [
        'Users can browse cities, cinemas, auditoriums, and showtimes.',
        'Interactive seat map with tiered pricing (Silver, Gold, Platinum VIP).',
        'Temporary lock on chosen seats for 10 minutes while user completes payment.',
        'Auto-release locked seats back into inventory if payment is not confirmed.',
      ],
      nonFunctional: [
        'Strict zero-double-booking guarantee under massive simultaneous flash ticket drops.',
        'Low-latency read path for real-time seat availability maps.',
        'High cohesion: separate seat locking from payment processing gateway.',
      ],
    },
    designHighlights: [
      'SeatLockManager maintains ephemeral locks in Redis/Memory with TTL expiration events.',
      'Versioned seat state machine: AVAILABLE -> TEMPORARILY_LOCKED -> BOOKED -> CANCELLED.',
      'Optimistic locking with atomic Compare-And-Swap (CAS) to avoid deadlocks.',
    ],
  },
  {
    id: 'amazon-locker',
    title: 'Amazon Locker Self-Service Delivery',
    category: 'Resource Allocation',
    summary: 'Automated package drop-off and customer pickup station with compartment size matching (Small, Medium, Large), OTP verification, and timeout eviction.',
    patterns: ['State Pattern', 'Factory Pattern', 'Observer Pattern', 'Strategy Pattern'],
    keyClasses: ['LockerHub', 'Compartment', 'Package', 'DeliveryPerson', 'Customer', 'AccessCodeManager'],
    difficulty: 'Medium',
    requirements: {
      functional: [
        'Assign optimal locker compartment based on package dimensions (S, M, L, XL).',
        'Generate secure 6-digit cryptographic OTP / barcode for customer pickup.',
        'Door auto-pop mechanism on valid code entry; door-closed sensor verification.',
        'Return-to-warehouse workflow if package is unclaimed after 3 calendar days.',
      ],
      nonFunctional: [
        'Offline capability: locker kiosk can authenticate codes locally via HMAC tokens.',
        'Real-time hardware status synchronization with central logistics cloud.',
        'High security: lock-out after 3 failed OTP attempts to prevent brute-force entry.',
      ],
    },
    designHighlights: [
      'Compartment state: EMPTY -> RESERVED -> OCCUPIED -> UNLOCKED -> FAULTY.',
      'Best-fit algorithm prioritizing the smallest eligible compartment to maximize capacity.',
      'LockerEventBus notifies backend microservices upon drop-off, pickup, and timeout triggers.',
    ],
  },
  {
    id: 'in-memory-filesystem',
    title: 'In-Memory File System (Unix VFS)',
    category: 'File & Infra',
    summary: 'Hierarchical directory and file tree modeling Linux Virtual File System (VFS) with path resolution, read/write streams, permissions, and hard/soft links.',
    patterns: ['Composite Pattern', 'Proxy Pattern', 'Iterator Pattern', 'Flyweight'],
    keyClasses: ['Node', 'FileNode', 'DirectoryNode', 'FileSystem', 'PathParser', 'InodeMetadata'],
    difficulty: 'Hard',
    requirements: {
      functional: [
        'Support mkdir, rmdir, touch, read, write, append, and ls -la operations.',
        'Absolute (/a/b/c) and relative (../../d) path traversal with . and .. resolution.',
        'Symbolic soft links and hard links pointing to underlying Inodes.',
        'User/Group permission flags (read, write, execute: rwxr-xr--).',
      ],
      nonFunctional: [
        'O(depth) path lookup efficiency using hash map child directories.',
        'Thread safety: ReadWriteLocks on directory nodes to allow concurrent reads and exclusive writes.',
        'Memory efficiency: dynamic byte buffer allocation for file contents.',
      ],
    },
    designHighlights: [
      'Composite Pattern: Abstract Node class inherited by FileNode and DirectoryNode.',
      'DirectoryNode holds Map<string, Node> children for instant sub-element resolution.',
      'Path tokenizer normalizing redundant slashes, dot-dots, and resolving symlink loops.',
    ],
  },
  {
    id: 'in-memory-ratelimiter',
    title: 'In-Memory Rate Limiter (Core OOP)',
    category: 'Concurrency & Queues',
    summary: 'Modular client-side / service-level rate limiter implementing Token Bucket, Leaky Bucket, and Sliding Window Log algorithms with pluggable strategies.',
    patterns: ['Strategy Pattern', 'Decorator Pattern', 'Singleton', 'Template Method'],
    keyClasses: ['RateLimiter', 'RateLimitStrategy', 'TokenBucket', 'SlidingWindowLog', 'ClientRuleConfig'],
    difficulty: 'Medium',
    requirements: {
      functional: [
        'Allow or reject incoming requests based on client identifier (IP, API Key, User ID).',
        'Support configurable limits: e.g., 100 req/min with burst allowance of 20 req.',
        'Provide Retry-After metadata headers upon 429 Too Many Requests response.',
        'Dynamic rule reconfiguration without server restart.',
      ],
      nonFunctional: [
        'Sub-microsecond execution time overhead per request.',
        'Thread safety: AtomicLong or lock-free timestamp comparisons.',
        'Garbage collection: auto-eviction of inactive client buckets to prevent memory leaks.',
      ],
    },
    designHighlights: [
      'RateLimitStrategy interface with allowRequest(clientId) method.',
      'Lazy token replenishment: calculates tokens to add based on elapsed time delta instead of a ticking background timer.',
      'Sliding Window Counter dividing time into discrete sub-windows for smooth rate limiting.',
    ],
  },
  {
    id: 'logging-framework',
    title: 'Logging Framework (Log4j / Winston)',
    category: 'File & Infra',
    summary: 'Asynchronous extensible logging engine with hierarchical loggers, custom appenders (Console, File, Network Socket), log levels, and ring buffer queues.',
    patterns: ['Chain of Responsibility', 'Observer Pattern', 'Factory Pattern', 'Singleton'],
    keyClasses: ['Logger', 'LoggerFactory', 'LogAppender', 'ConsoleAppender', 'FileAppender', 'LogFormatter'],
    difficulty: 'Senior/Staff',
    requirements: {
      functional: [
        'Hierarchical loggers (e.g., com.app.service inherits from com.app).',
        'Log levels: TRACE, DEBUG, INFO, WARN, ERROR, FATAL with runtime filtering.',
        'Multiple pluggable appenders per logger: Console, Rotating File, Remote Syslog.',
        'Custom formatters supporting JSON, Plaintext, and Timestamp masking.',
      ],
      nonFunctional: [
        'Non-blocking logging: calling logger.info() must never block critical application execution paths.',
        'Lock-free high throughput using LMAX Disruptor ring buffer or bounded blocking queues.',
        'Graceful flush on application termination to ensure zero message loss.',
      ],
    },
    designHighlights: [
      'Chain of Responsibility / Filter pipeline evaluating log level thresholds before dispatch.',
      'Worker thread dedicated to consuming log events asynchronously from ring buffer.',
      'RollingFileAppender managing file size limits and compressed log archival.',
    ],
  },
  {
    id: 'inventory-system',
    title: 'Inventory Management & Warehouse System',
    category: 'Resource Allocation',
    summary: 'Enterprise inventory ledger tracking SKU availability, atomic stock reservations during checkout, replenishment triggers, and warehouse bin locations.',
    patterns: ['Observer Pattern', 'Command Pattern', 'Unit of Work', 'Repository Pattern'],
    keyClasses: ['InventoryService', 'SKU', 'Warehouse', 'StockReservation', 'ReplenishmentPolicy', 'AuditLog'],
    difficulty: 'Hard',
    requirements: {
      functional: [
        'Track stock across multi-region fulfillment warehouses.',
        'Reserve items for active cart/order checkout with configurable timeout.',
        'Commit reservation on successful payment or roll back on payment failure.',
        'Automated reorder triggers when stock breaches safety replenishment threshold.',
      ],
      nonFunctional: [
        'Strict ACID consistency for inventory counts to eliminate overselling.',
        'High concurrency: pessimistic row-level locking or optimistic version checks for high-demand items.',
        'Auditable append-only ledger tracking every stock increment and decrement.',
      ],
    },
    designHighlights: [
      'Separation of Available vs Reserved vs In-Transit inventory counts.',
      'InventoryReservation lifecycle: CREATED -> CONFIRMED -> FULFILLED -> EXPIRED.',
      'Observer pattern publishing StockDepletedEvent to procurement microservice.',
    ],
  },
  {
    id: 'connect-four',
    title: 'Connect Four / Tic-Tac-Toe Game Engine',
    category: 'Game Design',
    summary: 'Turn-based two-player board game with gravity-drop physics, circular turn enforcement, winning condition vector evaluations, and minimax AI bot support.',
    patterns: ['Template Method', 'Strategy Pattern', 'State Pattern', 'Command Pattern (Undo/Redo)'],
    keyClasses: ['ConnectFourGame', 'Board', 'Player', 'HumanPlayer', 'AIPlayer', 'Move', 'WinChecker'],
    difficulty: 'Medium',
    requirements: {
      functional: [
        'Standard 6-row x 7-column vertical grid where pieces drop to lowest unoccupied slot.',
        'Two-player alternated turns (Red vs Yellow).',
        'Automatic win detection for 4 consecutive pieces horizontally, vertically, or diagonally.',
        'Move history with full Undo/Redo capability.',
      ],
      nonFunctional: [
        'O(1) win verification checking only lines radiating from the newly placed piece.',
        'Extensible for N-in-a-row variations and arbitrary board sizes (M x N).',
        'Clean decoupling between game logic, board state representation, and UI renderer.',
      ],
    },
    designHighlights: [
      'Bitboard representation or 2D array with column top-pointer arrays for instant drop.',
      'Directional vector scanning: (1,0), (0,1), (1,1), (1,-1) to verify 4-in-a-row.',
      'Command Pattern enabling undo/redo by pushing and popping previous Move objects.',
    ],
  },
  {
    id: 'chess-engine',
    title: 'Chess Game & Move Validation Engine',
    category: 'Game Design',
    summary: 'Full chess board model with piece polymorphism (King, Queen, Rook, Bishop, Knight, Pawn), legal move generation, check/checkmate detection, and special moves.',
    patterns: ['Polymorphism', 'Strategy Pattern', 'State Pattern', 'Flyweight'],
    keyClasses: ['ChessGame', 'Board', 'Piece', 'King', 'Pawn', 'Move', 'Square', 'GameStatus'],
    difficulty: 'Hard',
    requirements: {
      functional: [
        '8x8 grid with standard initial chess piece setup.',
        'Move validation for all 6 piece types respecting obstacle paths (except Knight).',
        'Special rules: En Passant, Castling (kingside/queenside), and Pawn Promotion.',
        'Check, Checkmate, and Stalemate detection algorithms.',
      ],
      nonFunctional: [
        'Move calculation efficiency: validate King safety before confirming move validity.',
        'Immutable board state representation for game replay and branch simulation.',
        'FEN (Forsyth-Edwards Notation) serializer and deserializer for game persistence.',
      ],
    },
    designHighlights: [
      'Abstract Piece class with abstract canMove(Board, from, to) and getValidMoves().',
      'King safety checker simulating move and verifying whether King square is under attack.',
      'Turn-based state machine: WHITE_TURN -> BLACK_TURN -> CHECK -> CHECKMATE -> STALEMATE.',
    ],
  },
  {
    id: 'splitwise',
    title: 'Splitwise / Expense Sharing App',
    category: 'Resource Allocation',
    summary: 'Group expense ledger supporting equal, percentage, and exact split strategies, multi-currency balances, and greedy graph debt simplification algorithms.',
    patterns: ['Strategy Pattern', 'Factory Pattern', 'Observer Pattern', 'Composite Pattern'],
    keyClasses: ['SplitwiseApp', 'Group', 'User', 'Expense', 'Split', 'EqualSplit', 'DebtSimplifier'],
    difficulty: 'Hard',
    requirements: {
      functional: [
        'Create groups, invite users, and log shared expenses paid by one or multiple users.',
        'Support split types: EQUAL, EXACT amounts, and PERCENTAGE splits with 100% sum validation.',
        'Display real-time balance sheet: "You owe $X to Bob" and "Alice owes you $Y".',
        'Settle balance feature with record keeping.',
      ],
      nonFunctional: [
        'Debt simplification: minimize the total number of transactions required to settle group debts using graph bipartite matching or greedy heap balance settlement.',
        'Floating-point safety: strict integer cent math to prevent rounding drift.',
        'Thread-safe balance ledger for concurrent expense submissions.',
      ],
    },
    designHighlights: [
      'ExpenseSplitStrategy interface with validate() and computeShares() implementations.',
      'Net balance graph: each user is assigned net balance (credited - debited).',
      'Min-cash-flow algorithm matching maximum creditor with maximum debtor to reduce N transaction edges to <= N-1.',
    ],
  },
];

const categories = ['All', 'Resource Allocation', 'Concurrency & Queues', 'State Machines', 'Game Design', 'File & Infra'] as const;

export default function LLDProblemDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProblem, setSelectedProblem] = useState<LLDProblem | null>(null);

  const filtered = lldProblems.filter((prob) => {
    const matchesCategory = activeCategory === 'All' || prob.category === activeCategory;
    const matchesSearch =
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.patterns.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prob.keyClasses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const publishedCount = lldProblems.filter((p) => p.articleSlug).length;

  return (
    <section style={{ marginTop: '2.5rem' }}>
      {/* Search & Category Filter Bar */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Sparkles size={18} color="var(--primary)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                FAANG LLD Master Problem Directory
              </h2>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              {lldProblems.length} standard Low-Level Design interview problems categorized by design patterns, classes, and concurrency blueprints.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '9999px',
                background: 'rgba(22, 163, 74, 0.1)',
                color: '#16a34a',
                border: '1px solid rgba(22, 163, 74, 0.25)',
              }}
            >
              {publishedCount} Published In-Depth
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '9999px',
                background: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--primary)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
              }}
            >
              {lldProblems.length - publishedCount} Curriculum Blueprints
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search problems by title, pattern (Strategy, State, Worker Pool), or key classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.6rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--primary)' : 'var(--bg-surface)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of LLD Problems */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filtered.map((prob) => {
          const isPublished = Boolean(prob.articleSlug);

          return (
            <div
              key={prob.id}
              onClick={() => setSelectedProblem(prob)}
              style={{
                background: 'var(--bg-card)',
                border: isPublished ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                position: 'relative',
              }}
              className="card-interactive-hover"
            >
              <div>
                {/* Top badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--primary)',
                      background: 'rgba(99, 102, 241, 0.08)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {prob.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color:
                          prob.difficulty === 'Senior/Staff'
                            ? '#ef4444'
                            : prob.difficulty === 'Hard'
                            ? '#f97316'
                            : '#10b981',
                        background: 'var(--bg-surface)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {prob.difficulty}
                    </span>

                    {isPublished ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#16a34a',
                          background: 'rgba(22, 163, 74, 0.1)',
                          padding: '2px 7px',
                          borderRadius: '4px',
                        }}
                      >
                        <CheckCircle2 size={11} />
                        <span>LIVE</span>
                      </span>
                    ) : (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: 'var(--text-muted)',
                          background: 'var(--bg-surface)',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <Clock size={11} />
                        <span>CURRICULUM</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Problem Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem', lineHeight: 1.3 }}>
                  {prob.title}
                </h3>

                {/* Summary */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 1rem 0' }}>
                  {prob.summary}
                </p>

                {/* Patterns */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
                  {prob.patterns.map((p) => (
                    <span
                      key={p}
                      style={{
                        fontSize: '0.72rem',
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

                {/* Key Classes Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.725rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Code size={12} style={{ flexShrink: 0 }} />
                  <span>{prob.keyClasses.slice(0, 3).join(', ')}...</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div
                style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProblem(prob);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: 500,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Inspect Architecture Specs
                </button>

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
                    <span>Read Code Walkthrough</span>
                    <ExternalLink size={13} />
                  </Link>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    <Clock size={12} />
                    <span>In Pipeline</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Blueprint Detail Modal */}
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
              maxWidth: '680px',
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

            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  background: 'rgba(99, 102, 241, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {selectedProblem.category}
              </span>
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  color:
                    selectedProblem.difficulty === 'Senior/Staff'
                      ? '#ef4444'
                      : selectedProblem.difficulty === 'Hard'
                      ? '#f97316'
                      : '#10b981',
                  background: 'var(--bg-surface)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                {selectedProblem.difficulty}
              </span>
              {selectedProblem.articleSlug ? (
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#16a34a', background: 'rgba(22, 163, 74, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                  Full Article Live
                </span>
              ) : (
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '4px' }}>
                  Curriculum Spec
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', paddingRight: '2rem' }}>
              {selectedProblem.title}
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedProblem.summary}
            </p>

            {/* Key Patterns & Classes */}
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                  Design Patterns Applied
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedProblem.patterns.map((pat) => (
                    <span
                      key={pat}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--primary)',
                        background: 'rgba(99, 102, 241, 0.08)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                      }}
                    >
                      {pat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                  Core Entities &amp; Class Model
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedProblem.keyClasses.map((cls) => (
                    <span
                      key={cls}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-primary)',
                        background: 'var(--bg-card)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Functional Requirements */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Check size={16} color="#16a34a" /> Functional Requirements
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedProblem.requirements.functional.map((req, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Non-Functional Requirements */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} color="var(--primary)" /> Non-Functional &amp; Concurrency Bounds
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedProblem.requirements.nonFunctional.map((req, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Architectural Highlights */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} color="#eab308" /> Architectural Highlights
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedProblem.designHighlights.map((hl, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>{hl}</li>
                ))}
              </ul>
            </div>

            {/* Bottom action */}
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
                  <span>Read Complete Walkthrough</span>
                  <ExternalLink size={14} />
                </Link>
              ) : (
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                  }}
                >
                  Vishwajeet Gupta is authoring this walkthrough
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
