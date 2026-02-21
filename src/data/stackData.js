// StackFit – Comprehensive Technology Stack Data
// Each technology has: name, category, description, pros, cons, costRange, scalabilityScore, tags, icon

export const CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DATABASE: 'database',
  AUTH: 'auth',
  HOSTING: 'hosting',
  CICD: 'cicd',
};

export const CATEGORY_LABELS = {
  [CATEGORIES.FRONTEND]: 'Frontend',
  [CATEGORIES.BACKEND]: 'Backend',
  [CATEGORIES.DATABASE]: 'Database',
  [CATEGORIES.AUTH]: 'Authentication',
  [CATEGORIES.HOSTING]: 'Hosting',
  [CATEGORIES.CICD]: 'CI/CD',
};

export const CATEGORY_ICONS = {
  [CATEGORIES.FRONTEND]: 'Monitor',
  [CATEGORIES.BACKEND]: 'Server',
  [CATEGORIES.DATABASE]: 'Database',
  [CATEGORIES.AUTH]: 'Shield',
  [CATEGORIES.HOSTING]: 'Cloud',
  [CATEGORIES.CICD]: 'GitBranch',
};

export const techStack = {
  // ═══════════════════════════════════════════════
  // FRONTEND FRAMEWORKS
  // ═══════════════════════════════════════════════
  [CATEGORIES.FRONTEND]: [
    {
      id: 'react',
      name: 'React',
      description: 'Component-based UI library by Meta. The most popular frontend choice with a massive ecosystem.',
      pros: ['Huge ecosystem & community', 'Flexible architecture', 'React Native for mobile', 'Great DevTools', 'Abundant job market'],
      cons: ['Requires additional libraries for routing/state', 'JSX learning curve', 'Frequent ecosystem changes'],
      costRange: [0, 0],
      scalabilityScore: 9,
      tags: ['spa', 'large-team', 'enterprise', 'mobile', 'web-app', 'saas', 'ecommerce'],
      color: '#61DAFB',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      description: 'Full-stack React framework with SSR, SSG, and API routes. Production-ready out of the box.',
      pros: ['Server-side rendering', 'Static generation', 'API routes built-in', 'Image optimization', 'Great SEO'],
      cons: ['Vercel vendor lock-in risk', 'Complex deployment otherwise', 'Opinionated structure'],
      costRange: [0, 0],
      scalabilityScore: 10,
      tags: ['ssr', 'seo', 'enterprise', 'ecommerce', 'saas', 'web-app', 'large-team'],
      color: '#000000',
    },
    {
      id: 'vue',
      name: 'Vue.js',
      description: 'Progressive framework for building UIs. Gentle learning curve with powerful features.',
      pros: ['Easy learning curve', 'Excellent documentation', 'Reactive data binding', 'Small bundle size', 'Great for rapid prototyping'],
      cons: ['Smaller ecosystem than React', 'Fewer enterprise adoptions', 'Limited mobile options'],
      costRange: [0, 0],
      scalabilityScore: 8,
      tags: ['spa', 'small-team', 'startup', 'rapid', 'web-app'],
      color: '#4FC08D',
    },
    {
      id: 'svelte',
      name: 'Svelte / SvelteKit',
      description: 'Compiler-based framework with no virtual DOM. Fastest runtime performance.',
      pros: ['No virtual DOM overhead', 'Smallest bundle size', 'Simple syntax', 'Built-in animations', 'SvelteKit for full-stack'],
      cons: ['Smaller community', 'Fewer libraries', 'Less job market demand'],
      costRange: [0, 0],
      scalabilityScore: 7,
      tags: ['performance', 'small-team', 'solo', 'rapid', 'web-app'],
      color: '#FF3E00',
    },
    {
      id: 'angular',
      name: 'Angular',
      description: 'Full-featured enterprise framework by Google with TypeScript, DI, and RxJS built-in.',
      pros: ['Complete framework', 'TypeScript built-in', 'Enterprise-ready', 'Strong opinions = consistency', 'Great for large teams'],
      cons: ['Steep learning curve', 'Heavy bundle size', 'Complex for small projects', 'Verbose'],
      costRange: [0, 0],
      scalabilityScore: 9,
      tags: ['enterprise', 'large-team', 'web-app', 'saas'],
      color: '#DD0031',
    },
    {
      id: 'astro',
      name: 'Astro',
      description: 'Content-focused framework with partial hydration. Ship zero JavaScript by default.',
      pros: ['Zero JS by default', 'Use any UI framework', 'Excellent for content sites', 'Fast page loads', 'Island architecture'],
      cons: ['Not ideal for highly interactive apps', 'Newer ecosystem', 'Limited SPA patterns'],
      costRange: [0, 0],
      scalabilityScore: 7,
      tags: ['content', 'blog', 'seo', 'performance', 'solo', 'small-team'],
      color: '#FF5D01',
    },
  ],

  // ═══════════════════════════════════════════════
  // BACKEND FRAMEWORKS
  // ═══════════════════════════════════════════════
  [CATEGORIES.BACKEND]: [
    {
      id: 'nodejs-express',
      name: 'Node.js + Express',
      description: 'Lightweight, fast, and flexible backend. Perfect for JavaScript full-stack development.',
      pros: ['Same language as frontend', 'Huge npm ecosystem', 'Fast I/O', 'Easy to learn', 'Great for APIs'],
      cons: ['Single-threaded', 'Callback complexity', 'Not great for CPU-heavy tasks'],
      costRange: [0, 50],
      scalabilityScore: 8,
      tags: ['api', 'realtime', 'startup', 'web-app', 'saas', 'solo', 'small-team', 'rapid'],
      color: '#339933',
    },
    {
      id: 'django',
      name: 'Django (Python)',
      description: 'Batteries-included Python framework. Excellent for rapid development with built-in admin.',
      pros: ['Batteries included', 'Built-in admin panel', 'ORM included', 'Security features', 'Great for data-heavy apps'],
      cons: ['Monolithic architecture', 'Slower than Node/Go', 'Django ORM limitations'],
      costRange: [0, 50],
      scalabilityScore: 7,
      tags: ['api', 'startup', 'data', 'ml', 'web-app', 'ecommerce', 'small-team'],
      color: '#092E20',
    },
    {
      id: 'fastapi',
      name: 'FastAPI (Python)',
      description: 'Modern, fast Python framework with automatic API docs and type hints.',
      pros: ['Fastest Python framework', 'Auto-generated docs', 'Type safety', 'Async support', 'Great for ML APIs'],
      cons: ['Newer ecosystem', 'Less batteries than Django', 'Smaller community'],
      costRange: [0, 30],
      scalabilityScore: 8,
      tags: ['api', 'ml', 'performance', 'startup', 'saas', 'solo', 'small-team'],
      color: '#009688',
    },
    {
      id: 'go-fiber',
      name: 'Go + Fiber',
      description: 'High-performance compiled language. Excellent for microservices and concurrent systems.',
      pros: ['Blazing fast', 'Low memory usage', 'Great concurrency', 'Single binary deployment', 'Strong typing'],
      cons: ['Verbose error handling', 'Smaller web ecosystem', 'Learning curve if from JS/Python'],
      costRange: [0, 30],
      scalabilityScore: 10,
      tags: ['performance', 'microservices', 'enterprise', 'large-team', 'api'],
      color: '#00ADD8',
    },
    {
      id: 'rails',
      name: 'Ruby on Rails',
      description: 'Convention-over-configuration framework. Fastest path from idea to MVP.',
      pros: ['Fastest MVP development', 'Convention over configuration', 'Huge gem ecosystem', 'Great for startups'],
      cons: ['Slower performance', 'Ruby declining in popularity', 'Scaling challenges'],
      costRange: [0, 50],
      scalabilityScore: 6,
      tags: ['startup', 'rapid', 'mvp', 'web-app', 'ecommerce', 'solo', 'small-team'],
      color: '#CC0000',
    },
    {
      id: 'spring-boot',
      name: 'Spring Boot (Java)',
      description: 'Enterprise-grade Java framework. The gold standard for large-scale enterprise applications.',
      pros: ['Enterprise-proven', 'Massive ecosystem', 'Excellent security', 'Strong typing', 'Microservices ready'],
      cons: ['Heavy & verbose', 'Slow startup', 'Complex configuration', 'High memory usage'],
      costRange: [0, 100],
      scalabilityScore: 10,
      tags: ['enterprise', 'large-team', 'microservices', 'api', 'saas'],
      color: '#6DB33F',
    },
    {
      id: 'nestjs',
      name: 'NestJS',
      description: 'Progressive Node.js framework with Angular-like architecture. TypeScript-first.',
      pros: ['TypeScript-first', 'Modular architecture', 'Built-in DI', 'Great for enterprise Node', 'Microservices support'],
      cons: ['Learning curve from Express', 'Heavier than Express', 'Opinionated'],
      costRange: [0, 50],
      scalabilityScore: 9,
      tags: ['enterprise', 'api', 'microservices', 'large-team', 'saas', 'web-app'],
      color: '#E0234E',
    },
  ],

  // ═══════════════════════════════════════════════
  // DATABASES
  // ═══════════════════════════════════════════════
  [CATEGORIES.DATABASE]: [
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      description: 'Advanced open-source relational database. Best for complex queries and data integrity.',
      pros: ['ACID compliant', 'JSON support', 'Full-text search', 'Extensions (PostGIS)', 'Extremely reliable'],
      cons: ['More complex setup', 'Slower for simple reads vs NoSQL', 'Requires tuning at scale'],
      costRange: [0, 100],
      scalabilityScore: 9,
      tags: ['relational', 'enterprise', 'data-integrity', 'analytics', 'saas', 'ecommerce'],
      color: '#4169E1',
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      description: 'Document-oriented NoSQL database. Flexible schema for rapid iteration.',
      pros: ['Flexible schema', 'Easy to start', 'Horizontal scaling', 'Great for prototyping', 'Atlas cloud'],
      cons: ['No ACID by default', 'Data duplication', 'Complex joins', 'Can get expensive at scale'],
      costRange: [0, 60],
      scalabilityScore: 8,
      tags: ['nosql', 'startup', 'rapid', 'content', 'realtime', 'mvp'],
      color: '#47A248',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      description: 'World\'s most popular open-source relational database. Simple, reliable, proven.',
      pros: ['Battle-tested', 'Simple to use', 'Wide hosting support', 'Great performance for reads', 'Huge community'],
      cons: ['Limited JSON support', 'Fewer advanced features than Postgres', 'Scaling limitations'],
      costRange: [0, 50],
      scalabilityScore: 7,
      tags: ['relational', 'web-app', 'ecommerce', 'small-team', 'startup'],
      color: '#4479A1',
    },
    {
      id: 'supabase-db',
      name: 'Supabase (Postgres)',
      description: 'Open-source Firebase alternative with PostgreSQL. Real-time subscriptions included.',
      pros: ['Postgres power + real-time', 'Row-level security', 'Auto-generated APIs', 'Free tier', 'Auth built-in'],
      cons: ['Vendor dependency', 'Limited customization', 'Newer platform'],
      costRange: [0, 25],
      scalabilityScore: 8,
      tags: ['realtime', 'startup', 'rapid', 'solo', 'small-team', 'mvp', 'saas'],
      color: '#3ECF8E',
    },
    {
      id: 'redis',
      name: 'Redis',
      description: 'In-memory data store. Perfect for caching, sessions, and real-time features.',
      pros: ['Blazing fast', 'Versatile data structures', 'Pub/Sub', 'Caching standard', 'Session store'],
      cons: ['Memory-limited', 'Data persistence concerns', 'Usually a complement, not primary DB'],
      costRange: [0, 30],
      scalabilityScore: 9,
      tags: ['caching', 'realtime', 'performance', 'session', 'enterprise'],
      color: '#DC382D',
    },
    {
      id: 'firebase-db',
      name: 'Firebase Firestore',
      description: 'Google\'s real-time NoSQL cloud database. Seamless with Firebase ecosystem.',
      pros: ['Real-time sync', 'Serverless', 'Offline support', 'Easy to start', 'Free tier'],
      cons: ['Vendor lock-in', 'Complex queries limited', 'Can get expensive', 'NoSQL limitations'],
      costRange: [0, 50],
      scalabilityScore: 7,
      tags: ['realtime', 'mobile', 'solo', 'startup', 'rapid', 'mvp'],
      color: '#FFCA28',
    },
  ],

  // ═══════════════════════════════════════════════
  // AUTH STRATEGIES
  // ═══════════════════════════════════════════════
  [CATEGORIES.AUTH]: [
    {
      id: 'auth0',
      name: 'Auth0',
      description: 'Enterprise identity platform. Supports social login, MFA, and RBAC out of the box.',
      pros: ['Enterprise-ready', 'Social login', 'MFA support', 'RBAC', 'SDKs for all platforms'],
      cons: ['Expensive at scale', 'Vendor lock-in', 'Complex pricing'],
      costRange: [0, 200],
      scalabilityScore: 10,
      tags: ['enterprise', 'saas', 'large-team', 'social-login', 'mfa'],
      color: '#EB5424',
    },
    {
      id: 'firebase-auth',
      name: 'Firebase Auth',
      description: 'Google\'s authentication service. Quick setup with social providers and phone auth.',
      pros: ['Easy setup', 'Social providers', 'Phone auth', 'Free tier generous', 'Firebase integration'],
      cons: ['Vendor lock-in', 'Limited customization', 'No RBAC built-in'],
      costRange: [0, 0],
      scalabilityScore: 8,
      tags: ['startup', 'solo', 'rapid', 'mobile', 'mvp', 'social-login'],
      color: '#FFCA28',
    },
    {
      id: 'supabase-auth',
      name: 'Supabase Auth',
      description: 'Open-source auth with Row Level Security. Works seamlessly with Supabase database.',
      pros: ['Open source', 'Row-level security', 'Social login', 'Magic link', 'Free tier'],
      cons: ['Supabase dependency', 'Newer platform', 'Smaller community'],
      costRange: [0, 25],
      scalabilityScore: 8,
      tags: ['startup', 'solo', 'rapid', 'small-team', 'mvp', 'saas'],
      color: '#3ECF8E',
    },
    {
      id: 'clerk',
      name: 'Clerk',
      description: 'Modern auth with beautiful pre-built components. Best developer experience.',
      pros: ['Beautiful UI components', 'Easy integration', 'Session management', 'Webhooks', 'Organizations support'],
      cons: ['Relatively new', 'Pricing can add up', 'Vendor dependency'],
      costRange: [0, 100],
      scalabilityScore: 8,
      tags: ['saas', 'startup', 'small-team', 'rapid', 'web-app'],
      color: '#6C47FF',
    },
    {
      id: 'nextauth',
      name: 'NextAuth.js / Auth.js',
      description: 'Open-source authentication for Next.js. Full control with zero vendor lock-in.',
      pros: ['Open source', 'No vendor lock-in', 'Database adapters', 'Social providers', 'Self-hosted'],
      cons: ['Next.js focused', 'More setup required', 'Session management complexity'],
      costRange: [0, 0],
      scalabilityScore: 7,
      tags: ['solo', 'startup', 'small-team', 'self-hosted', 'web-app'],
      color: '#000000',
    },
    {
      id: 'custom-jwt',
      name: 'Custom JWT Auth',
      description: 'Build your own authentication with JSON Web Tokens. Maximum flexibility and control.',
      pros: ['Full control', 'No vendor dependency', 'Lightweight', 'Stateless', 'Custom logic'],
      cons: ['Security risks if done wrong', 'More development time', 'Must handle edge cases'],
      costRange: [0, 0],
      scalabilityScore: 7,
      tags: ['enterprise', 'large-team', 'custom', 'api'],
      color: '#000000',
    },
  ],

  // ═══════════════════════════════════════════════
  // HOSTING
  // ═══════════════════════════════════════════════
  [CATEGORIES.HOSTING]: [
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Edge-first platform optimized for Next.js. Best frontend DX with global CDN.',
      pros: ['Instant deployments', 'Global CDN', 'Preview URLs', 'Analytics', 'Edge functions'],
      cons: ['Expensive at scale', 'Vendor lock-in', 'Limited backend capabilities'],
      costRange: [0, 150],
      scalabilityScore: 9,
      tags: ['frontend', 'startup', 'solo', 'small-team', 'saas', 'web-app'],
      color: '#000000',
    },
    {
      id: 'aws',
      name: 'AWS',
      description: 'The largest cloud provider. Virtually unlimited services and scaling options.',
      pros: ['Unlimited services', 'Global infrastructure', 'Enterprise features', 'Auto-scaling', 'Pay-as-you-go'],
      cons: ['Complex pricing', 'Steep learning curve', 'Over-engineered for small projects'],
      costRange: [5, 500],
      scalabilityScore: 10,
      tags: ['enterprise', 'large-team', 'microservices', 'custom', 'saas'],
      color: '#FF9900',
    },
    {
      id: 'railway',
      name: 'Railway',
      description: 'Modern PaaS for deploying any stack. Simple pricing, great DX.',
      pros: ['Simple deployment', 'Database hosting', 'Preview environments', 'Fair pricing', 'Great DX'],
      cons: ['Less customization', 'Newer platform', 'Limited regions'],
      costRange: [5, 50],
      scalabilityScore: 7,
      tags: ['startup', 'solo', 'small-team', 'rapid', 'api', 'web-app'],
      color: '#0B0D0E',
    },
    {
      id: 'fly-io',
      name: 'Fly.io',
      description: 'Deploy apps close to users globally. Excellent for edge computing and containers.',
      pros: ['Global edge deployment', 'Docker-native', 'Low latency', 'Fair pricing', 'Postgres included'],
      cons: ['Learning curve', 'Debugging complexity', 'Smaller community'],
      costRange: [0, 100],
      scalabilityScore: 9,
      tags: ['performance', 'edge', 'startup', 'small-team', 'api', 'realtime'],
      color: '#8B5CF6',
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      description: 'Developer-friendly cloud hosting. Simple, affordable, and well-documented.',
      pros: ['Simple pricing', 'Great documentation', 'Managed databases', 'App Platform', 'Kubernetes'],
      cons: ['Fewer services than AWS', 'Less enterprise features', 'Limited regions'],
      costRange: [5, 200],
      scalabilityScore: 8,
      tags: ['startup', 'small-team', 'api', 'web-app', 'saas'],
      color: '#0080FF',
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Platform for modern web projects. Excellent for static sites and JAMstack.',
      pros: ['Easy deploys', 'Free tier', 'Edge functions', 'Forms & identity', 'Split testing'],
      cons: ['Limited backend', 'Build time limits', 'Bandwidth limits on free tier'],
      costRange: [0, 100],
      scalabilityScore: 7,
      tags: ['frontend', 'solo', 'startup', 'content', 'blog', 'small-team'],
      color: '#00C7B7',
    },
  ],

  // ═══════════════════════════════════════════════
  // CI/CD
  // ═══════════════════════════════════════════════
  [CATEGORIES.CICD]: [
    {
      id: 'github-actions',
      name: 'GitHub Actions',
      description: 'Native CI/CD for GitHub repos. Vast marketplace of community actions.',
      pros: ['GitHub native', 'Free for public repos', 'Huge marketplace', 'Matrix builds', 'Easy setup'],
      cons: ['GitHub dependency', 'Limited minutes on free tier', 'YAML complexity'],
      costRange: [0, 40],
      scalabilityScore: 9,
      tags: ['startup', 'solo', 'small-team', 'large-team', 'enterprise', 'web-app', 'saas'],
      color: '#2088FF',
    },
    {
      id: 'gitlab-ci',
      name: 'GitLab CI',
      description: 'Built-in CI/CD in GitLab. Complete DevOps platform in one tool.',
      pros: ['All-in-one platform', 'Free shared runners', 'Docker native', 'Security scanning', 'Self-hosted option'],
      cons: ['GitLab dependency', 'Slower shared runners', 'Complex YAML'],
      costRange: [0, 100],
      scalabilityScore: 9,
      tags: ['enterprise', 'large-team', 'self-hosted', 'saas'],
      color: '#FC6D26',
    },
    {
      id: 'vercel-ci',
      name: 'Vercel (Built-in)',
      description: 'Zero-config deployments on git push. Preview deployments for every PR.',
      pros: ['Zero config', 'Preview per PR', 'Instant rollbacks', 'Edge deployment', 'No CI/CD files needed'],
      cons: ['Vercel only', 'Limited customization', 'Not for non-web workloads'],
      costRange: [0, 20],
      scalabilityScore: 8,
      tags: ['frontend', 'startup', 'solo', 'small-team', 'rapid'],
      color: '#000000',
    },
    {
      id: 'docker-compose',
      name: 'Docker + Docker Compose',
      description: 'Containerized deployment. Consistent environments from dev to prod.',
      pros: ['Environment consistency', 'Portable', 'Microservices ready', 'Local dev parity', 'Industry standard'],
      cons: ['Learning curve', 'Overhead for simple apps', 'Orchestration complexity'],
      costRange: [0, 0],
      scalabilityScore: 9,
      tags: ['enterprise', 'large-team', 'microservices', 'self-hosted', 'custom'],
      color: '#2496ED',
    },
    {
      id: 'circleci',
      name: 'CircleCI',
      description: 'Powerful CI/CD platform with great performance and caching.',
      pros: ['Fast builds', 'Great caching', 'Docker support', 'Orbs marketplace', 'Parallelism'],
      cons: ['Pricing can escalate', 'Complex configuration', 'Outage history'],
      costRange: [0, 100],
      scalabilityScore: 8,
      tags: ['enterprise', 'large-team', 'saas', 'startup'],
      color: '#343434',
    },
  ],
};

// Helper to get all techs in a category
export const getTechsByCategory = (category) => techStack[category] || [];

// Helper to get a single tech by id across all categories
export const getTechById = (id) => {
  for (const category of Object.values(techStack)) {
    const found = category.find((t) => t.id === id);
    if (found) return found;
  }
  return null;
};

// Migration paths between technologies
export const migrationPaths = {
  // Frontend migrations
  'react→nextjs': {
    from: 'react', to: 'nextjs',
    difficulty: 'Low',
    timeEstimate: '1–2 weeks',
    steps: [
      'Install Next.js and configure project structure',
      'Move pages to /app or /pages directory',
      'Convert client-side routing to file-based routing',
      'Add SSR/SSG to performance-critical pages',
      'Migrate API calls to API routes',
    ],
    risks: ['Routing pattern changes', 'Build configuration differences'],
  },
  'vue→react': {
    from: 'vue', to: 'react',
    difficulty: 'Medium',
    timeEstimate: '3–6 weeks',
    steps: [
      'Set up React project alongside Vue',
      'Convert Vue components to React components',
      'Replace Vuex with React state management',
      'Migrate templates to JSX',
      'Update routing from Vue Router to React Router',
    ],
    risks: ['Complete rewrite required', 'Template → JSX conversion', 'State management differences'],
  },
  // Backend migrations
  'nodejs-express→nestjs': {
    from: 'nodejs-express', to: 'nestjs',
    difficulty: 'Medium',
    timeEstimate: '2–4 weeks',
    steps: [
      'Set up NestJS project structure',
      'Create modules for each feature area',
      'Migrate routes to controllers with decorators',
      'Implement dependency injection for services',
      'Add validation pipes and guards',
    ],
    risks: ['Architecture paradigm shift', 'Middleware differences'],
  },
  'django→fastapi': {
    from: 'django', to: 'fastapi',
    difficulty: 'Medium',
    timeEstimate: '3–5 weeks',
    steps: [
      'Set up FastAPI project with async support',
      'Replace Django ORM with SQLAlchemy or Tortoise',
      'Convert views to path operation functions',
      'Migrate middleware to FastAPI dependencies',
      'Update authentication to OAuth2/JWT',
    ],
    risks: ['Loss of Django admin', 'ORM migration', 'Async conversion'],
  },
  // Database migrations
  'mongodb→postgresql': {
    from: 'mongodb', to: 'postgresql',
    difficulty: 'High',
    timeEstimate: '4–8 weeks',
    steps: [
      'Design relational schema from document structure',
      'Create migration scripts for data transformation',
      'Update ORM/query layer',
      'Implement transactions where needed',
      'Test data integrity thoroughly',
    ],
    risks: ['Schema design complexity', 'Data loss risk', 'Query pattern changes'],
  },
  'firebase-db→supabase-db': {
    from: 'firebase-db', to: 'supabase-db',
    difficulty: 'Medium',
    timeEstimate: '2–4 weeks',
    steps: [
      'Export Firestore data',
      'Design PostgreSQL tables from document collections',
      'Set up Supabase project and import data',
      'Replace Firestore SDK with Supabase client',
      'Implement Row Level Security policies',
    ],
    risks: ['Real-time subscription differences', 'RLS learning curve'],
  },
  // Hosting migrations
  'vercel→aws': {
    from: 'vercel', to: 'aws',
    difficulty: 'High',
    timeEstimate: '2–4 weeks',
    steps: [
      'Set up AWS account and IAM roles',
      'Configure S3 + CloudFront for static assets',
      'Set up Lambda or ECS for server functions',
      'Configure Route 53 for DNS',
      'Set up CI/CD pipeline with CodePipeline or GitHub Actions',
    ],
    risks: ['Significant complexity increase', 'Cost management', 'Security configuration'],
  },
  'netlify→vercel': {
    from: 'netlify', to: 'vercel',
    difficulty: 'Low',
    timeEstimate: '1–2 days',
    steps: [
      'Connect repository to Vercel',
      'Configure build settings',
      'Migrate environment variables',
      'Update DNS settings',
      'Test preview and production deployments',
    ],
    risks: ['Minimal — platforms are similar', 'Edge function API differences'],
  },
};

export const getMigrationPath = (fromId, toId) => {
  return migrationPaths[`${fromId}→${toId}`] || null;
};
