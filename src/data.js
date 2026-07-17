import { 
  Code2, 
  Globe2, 
  Mail, 
  MessageCircle,
  Bug,
  Rocket,
  Search,
  ClipboardCheck,
  Paintbrush,
  Cpu,
  Database,
  ServerCog,
  Zap,
  TrendingUp,
  Brain,
  Layers,
} from 'lucide-react';

export const personalInfo = {
  name: 'Suresh S',
  title: 'Freelance Full Stack Developer',
  subtitle: 'MERN, SaaS, AI Integration',
  location: 'Chennai, Tamil Nadu',
  locationDetail: 'Chennai, Tamil Nadu · Available for remote freelance & full-time',
  email: 'suresh2309@proton.me',
  phone: '+91 6379080247',
  whatsapp: '+916379080247',
  linkedin: 'linkedin.com/in/suresh-sundharrajan',
  linkedinUrl: 'https://www.linkedin.com/in/suresh-sundharrajan',
  github: 'github.com/Suresh-Master001',
  githubUrl: 'https://github.com/Suresh-Master001',
  website: 'codenxte.com',
  websiteUrl: 'https://codenxte.com',
  resumeUrl: '#',
  freelanceTagline: 'Available for freelance - MERN stack, SaaS platforms & AI integrations',
  completionRate: '98%',
  responseTime: '< 4 hours',
  projectsDelivered: '20+',
};

export const hero = {
  kicker: 'Available for freelance & full-time roles',
  title: 'Building Modern SaaS &',
  titleHighlight: 'AI-Powered Solutions',
  tagline: 'Freelance full-stack & AI product developer. Specializing in MERN stack applications, SaaS platforms and AI/RAG integrations that help brands grow online.',
  roles: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'SaaS Developer',
    'React.js Developer',
    'Node.js Developer',
    'AI Integration Developer',
    'RAG / LLM Developer',
  ],
};

export const about = {
  kicker: 'About Me',
  title: 'Full Stack & AI Developer Who Builds Products That Grow Businesses',
  bio: `Hi, I'm Suresh S - a passionate Full Stack Developer and Freelance Software Developer based in Chennai, India. I help startups, entrepreneurs and businesses transform ideas into high-performing digital products that are fast, scalable and user-friendly.

I specialize in MERN Stack Development, SaaS Applications, API Integrations and AI-Powered Solutions. From custom dashboards and multi-tenant platforms to full-stack applications and AI/RAG pipelines, I deliver solutions designed for performance, reliability and long-term growth.

Whether you need a custom MERN stack application, a complete SaaS platform or an AI-powered assistant - I focus on building solutions that not only work well but also deliver real business value.

Let's turn your ideas into powerful digital experiences.`,
  credibility: [
    { icon: Code2,        label: 'MERN stack - React, Node, Express, MongoDB, MySQL' },
    { icon: Layers,       label: 'Multi-tenant SaaS - RBAC, billing, admin dashboards' },
    { icon: Cpu,          label: 'AI/RAG integrations - Gemini, OpenAI, LangChain, Pinecone' },
    { icon: TrendingUp,   label: 'Performance, security & conversion focused' },
  ],
  stats: [
    { value: 20, suffix: '+', label: 'Projects Delivered' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 3,  suffix: 'h', label: 'Avg Response Time' },
    { value: 8,  suffix: '+', label: 'Technologies' },
  ],
};

export const services = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    desc: 'End-to-end web applications with React frontends, Node.js backends and scalable database architectures.',
    points: ['React Applications', 'Node.js APIs', 'MongoDB/MySQL', 'JWT & RBAC Authentication'],
  },
  {
    icon: Layers,
    title: 'SaaS MVP Build',
    desc: 'Launch-ready SaaS platforms with subscription billing, multi-tenant architecture and admin dashboards.',
    points: ['Multi-Tenant Apps', 'Subscription Systems (Razorpay)', 'Admin Panels', 'Analytics & Reporting'],
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    desc: 'Seamlessly integrate AI into your product - chatbots, document QA, RAG pipelines and intelligent automation.',
    points: ['OpenAI & Gemini APIs', 'AI Chatbots', 'RAG Applications (LangChain, Pinecone)', 'Workflow Automation'],
  },
  {
    icon: ServerCog,
    title: 'API & Backend Engineering',
    desc: 'Robust, well-documented backend systems with real-time features and background job processing.',
    points: ['REST API Design', 'Socket.io Real-Time Features', 'Redis / BullMQ Queues', 'Raw SQL & Query Optimization'],
  },
];

export const processSteps = [
  {
    icon: Search,
    title: 'Discover',
    desc: 'Learn about your business, goals, target audience and requirements to define scope clearly.',
    timeframe: 'Day 1-3',
    deliverable: 'Project brief + success metrics',
    bullets: [
      'Stakeholder interview + requirements mapping',
      'Scope, risks, timeline and feature priorities',
      'Technical direction (MERN vs SaaS architecture) aligned with goals',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Design',
    desc: 'Create wireframes and high-fidelity UI mockups for review and approval before development.',
    timeframe: 'Week 1',
    deliverable: 'Approved UI + UX flow',
    bullets: [
      'Information architecture + user journeys',
      'Component-driven UI mockups and responsive layouts',
      'Design review + iteration until approval',
    ],
  },
  {
    icon: Code2,
    title: 'Build',
    desc: 'Develop your project using the MERN stack with clean, maintainable code practices.',
    timeframe: 'Week 2-4',
    deliverable: 'Working product (MVP-ready)',
    bullets: [
      'Frontend + backend implementation with best practices',
      'API integration, authentication and data modeling',
      'Performance, security and maintainability baked-in from day one',
    ],
  },
  {
    icon: Bug,
    title: 'Test',
    desc: 'Comprehensive testing across browsers and devices. Performance and security verified.',
    timeframe: 'Week 5',
    deliverable: 'Quality checks + fixes',
    bullets: [
      'Functional checks, edge cases and regression testing',
      'Performance tuning and security validation',
      'Cross-browser QA + final polish',
    ],
  },
  {
    icon: Rocket,
    title: 'Launch',
    desc: 'Deploy to production, provide documentation and offer post-launch support for smooth transition.',
    timeframe: 'Launch day + 7 days',
    deliverable: 'Deployment + handover',
    bullets: [
      'Production deployment with environment setup',
      'Documentation, training and issue triage',
      'Post-launch monitoring + iterative improvements',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Handover & Support',
    desc: 'Ensure your team can confidently use, manage and evolve the product after the handover.',
    timeframe: '2-4 weeks',
    deliverable: 'Support window + optimization backlog',
    bullets: [
      'Knowledge transfer: deployment, admin workflows and common fixes',
      'Bug fixes + minor enhancements based on real usage feedback',
      'Roadmap suggestions to improve conversion, speed and features',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'CareerSphereAI',
    type: 'SaaS Platform',
    duration: 'Jun 2026 - Present',
    desc: 'A production-grade full-stack SaaS platform with AI-powered career tools, resume builder and skill assessment.',
    tech: ['React', 'Node.js', 'MySQL', 'Gemini AI', 'Razorpay', 'BullMQ'],
    githubUrl: 'https://github.com/suresh-s/careersphereai',
    liveUrl: 'https://careersphereai.vercel.app',
    tags: ['SaaS', 'AI', 'MERN'],
  },
  {
    id: 2,
    title: 'MentorMind',
    type: 'AI Project Management',
    duration: 'Feb 2026 - Mar 2026',
    desc: 'An AI-powered project management platform that auto-generates tasks, assigns priorities and tracks progress.',
    tech: ['MERN', 'OpenAI', 'JWT', 'RBAC', 'Kanban'],
    githubUrl: 'https://github.com/suresh-s/mentormind',
    liveUrl: 'https://mentormind.vercel.app',
    tags: ['AI', 'SaaS', 'Management'],
  },
  {
    id: 3,
    title: 'AlphaLegalGPT',
    type: 'RAG Legal Assistant',
    duration: 'Mar 2026 - Apr 2026',
    desc: 'An AI-powered legal assistant for document QA using RAG pipeline with Gemini and Pinecone vector search.',
    tech: ['Node.js', 'Express', 'Gemini API', 'LangChain', 'Pinecone', 'React'],
    githubUrl: 'https://github.com/suresh-s/alphalegalgpt',
    liveUrl: 'https://alphalegalgpt.vercel.app',
    tags: ['RAG', 'AI', 'LegalTech'],
  },
];

export const techStack = [
  { name: 'React',        icon: Code2 },
  { name: 'Node.js',      icon: ServerCog },
  { name: 'MongoDB',      icon: Database },
  { name: 'MySQL',        icon: Database },
  { name: 'Express.js',   icon: ServerCog },
  { name: 'Tailwind',     icon: Paintbrush },
  { name: 'Next.js',      icon: Code2 },
  { name: 'Gemini AI',    icon: Brain },
  { name: 'OpenAI',       icon: Brain },
  { name: 'LangChain',    icon: Brain },
  { name: 'Pinecone',     icon: Cpu },
  { name: 'Socket.io',    icon: MessageCircle },
  { name: 'Redis',        icon: Database },
  { name: 'PostgreSQL',   icon: Database },
  { name: 'Razorpay',     icon: Zap },
  { name: 'JWT / RBAC',   icon: ClipboardCheck },
  { name: 'GSAP',         icon: Zap },
  { name: 'Three.js',     icon: Cpu },
  { name: 'Framer Motion',icon: Rocket },
];

export const techStackDots = {
  'React':          '#61dafb',
  'Node.js':        '#8cc84b',
  'MongoDB':        '#4db33d',
  'MySQL':          '#4479a1',
  'Express.js':     '#666666',
  'Tailwind':       '#38bdf8',
  'Next.js':        '#000000',
  'Gemini AI':      '#4285f4',
  'OpenAI':         '#412991',
  'LangChain':      '#1c3c3c',
  'Pinecone':       '#0e4bff',
  'Socket.io':      '#010101',
  'Redis':          '#dc382d',
  'PostgreSQL':     '#336791',
  'Razorpay':       '#3395ff',
  'JWT / RBAC':     '#d63aff',
  'GSAP':           '#88ce02',
  'Three.js':       '#049ef4',
  'Framer Motion':  '#e535ab',
};

export const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Product Manager, TechStart',
    avatar: 'AJ',
    content: 'Suresh delivered our SaaS platform 2 weeks ahead of schedule. The code quality is exceptional and the AI integration works flawlessly.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Founder, CareerSphereAI',
    avatar: 'SC',
    content: 'A true full-stack wizard. Built our entire career platform from scratch with MERN stack and Gemini AI. Highly recommend!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'CTO, LegalTech Solutions',
    avatar: 'MR',
    content: 'The RAG pipeline for our legal document assistant was complex, but Suresh nailed it. Great communication throughout.',
    rating: 5,
  },
];

export const contact = {
  kicker: 'Get In Touch',
  title: "Let's build something great together",
  subtitle: "Available for freelance projects, contract work and full-time roles. Let's discuss your next project.",
  availability: 'Available immediately · Remote/freelance',
  links: [
    { label: 'Email',        value: 'suresh2309@proton.me',         href: 'mailto:suresh2309@proton.me',      icon: Mail },
    { label: 'LinkedIn',     value: 'linkedin.com/in/suresh-sundharrajan', href: 'https://www.linkedin.com/in/suresh-sundharrajan', icon: Globe2 },
  ],
};

export const footer = {
  name: 'Suresh S',
  tagline: 'Freelance Full Stack Developer · Building digital experiences',
  year: 2025,
  socials: [
    { icon: 'github',   label: 'GitHub',   href: 'https://github.com/Suresh-Master001' },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/suresh-sundharrajan' },
    { icon: 'mail',     label: 'Email',    href: 'mailto:suresh2309@proton.me' },
  ],
};