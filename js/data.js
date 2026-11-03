/**
 * data.js - Single Source of Truth for Portfolio Content
 * All content, skills, projects, and workflow steps are defined here as pure JS objects.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Harsh Singh",
    initials: "HS",
    roleLabel: "AI Engineer in Progress",
    headline: "Harsh Singh builds real products, from idea to production.",
    subtitle: "AI Engineer in Progress | Full Stack Developer | Product Builder",
    githubUrl: "https://github.com/harsh77vardhan",
    emailPlaceholder: "[YOUR EMAIL]",
    linkedinPlaceholder: "[YOUR LINKEDIN]",
    location: "India",
    education: "B.Tech AIML, VIT Bhopal University",
    studyYear: "1st Year",
    dailyDriver: "CachyOS Linux",
    bio: "I'm a first-year Artificial Intelligence and Machine Learning student who focuses on building real products instead of only practicing coding problems. I enjoy taking an idea from zero to production: designing the UI, developing the frontend and backend, integrating AI, deploying applications, optimizing SEO and performance, and continuously improving the product.",
    goalQuote: "Become an AI Engineer and Full Stack Software Architect while building globally used SaaS products.",
    philosophyQuote: "Software engineering is best learned by building real-world products. Every project is an opportunity to improve my skills in architecture, development, deployment, AI integration, and product design.",
    copyrightYear: 2026
  },

  heroStats: [
    { label: "Projects Built", value: 4, isNumeric: true },
    { label: "Flagship Product", value: "Technea", isNumeric: false },
    { label: "Current Study", value: "B.Tech AIML, VIT Bhopal (1st Year)", isNumeric: false },
    { label: "Focus", value: "AI + Full Stack + SaaS", isNumeric: false }
  ],

  heroWorkflowBar: {
    label: "Idea → Production",
    segmentsTotal: 14,
    stripedCount: 3,
    filledCount: 6,
    milestones: [
      { name: "Idea", segmentIndex: 1 },
      { name: "Architecture", segmentIndex: 4 },
      { name: "Build", segmentIndex: 9 },
      { name: "Production", segmentIndex: 14 }
    ]
  },

  aboutInterests: [
    "Artificial Intelligence",
    "Full Stack Development",
    "SaaS",
    "Developer Tools",
    "Product Design",
    "AI Agents",
    "System Design",
    "Automation"
  ],

  skillsCategories: [
    {
      category: "Languages",
      icon: "code",
      skills: [
        { name: "Python", level: 8, max: 10 },
        { name: "C++", level: 7, max: 10 },
        { name: "JavaScript", level: 8, max: 10 },
        { name: "HTML5", level: 8, max: 10 },
        { name: "CSS3", level: 8, max: 10 }
      ]
    },
    {
      category: "Frontend",
      icon: "layout",
      skills: [
        { name: "React", level: 8, max: 10 },
        { name: "Vite", level: 8, max: 10 },
        { name: "Responsive Design", level: 8, max: 10 },
        { name: "Component Architecture", level: 7, max: 10 },
        { name: "SPA Development", level: 8, max: 10 },
        { name: "SEO Optimization", level: 7, max: 10 }
      ]
    },
    {
      category: "Backend",
      icon: "server",
      skills: [
        { name: "FastAPI", level: 8, max: 10 },
        { name: "REST APIs", level: 8, max: 10 },
        { name: "API Design", level: 7, max: 10 },
        { name: "Authentication", level: 7, max: 10 },
        { name: "AI API Integration", level: 8, max: 10 }
      ]
    },
    {
      category: "AI",
      icon: "cpu",
      skills: [
        { name: "Google Gemini API", level: 8, max: 10 },
        { name: "Prompt Engineering", level: 8, max: 10 },
        { name: "AI Chatbots", level: 8, max: 10 },
        { name: "AI Mentor Systems", level: 8, max: 10 },
        { name: "Multi-Agent Architecture Design", level: 7, max: 10 },
        { name: "Context Management", level: 7, max: 10 },
        { name: "LLM Integration", level: 8, max: 10 }
      ]
    },
    {
      category: "Databases",
      icon: "database",
      skills: [
        { name: "Supabase", level: 7, max: 10 },
        { name: "PostgreSQL (basic)", level: 6, max: 10 }
      ]
    },
    {
      category: "DevOps / Deployment",
      icon: "cloud",
      skills: [
        { name: "Git", level: 8, max: 10 },
        { name: "GitHub", level: 8, max: 10 },
        { name: "GitHub Workflows", level: 7, max: 10 },
        { name: "Vercel", level: 8, max: 10 },
        { name: "Environment Variables", level: 8, max: 10 },
        { name: "DNS and Custom Domains", level: 7, max: 10 },
        { name: "PWA Deployment", level: 7, max: 10 },
        { name: "Android builds with Capacitor", level: 6, max: 10 },
        { name: "Docker (images, containers, Dockerfiles, basic compose)", level: 6, max: 10 }
      ]
    },
    {
      category: "Tools",
      icon: "terminal",
      skills: [
        { name: "Linux (CachyOS)", level: 8, max: 10 },
        { name: "VS Code", level: 8, max: 10 },
        { name: "Node.js", level: 7, max: 10 },
        { name: "npm", level: 8, max: 10 },
        { name: "Fish Shell", level: 8, max: 10 },
        { name: "Starship", level: 8, max: 10 },
        { name: "g++", level: 7, max: 10 },
        { name: "Debugging Tools", level: 7, max: 10 }
      ]
    }
  ],

  projects: [
    {
      id: "technea",
      isFlagship: true,
      title: "Technea",
      badge: "Flagship Product",
      role: "Founder, Full Stack Developer, AI System Architect",
      description: "An AI-powered learning platform that helps students learn software engineering using personalized roadmaps and an intelligent AI mentor.",
      stack: ["React + Vite", "FastAPI", "Gemini API", "Supabase", "Vercel"],
      githubUrl: "https://github.com/harsh77vardhan",
      features: [
        "Authentication & Security",
        "Interactive Dashboard",
        "Personalized Profile & Avatar Upload",
        "XP & Gamification System",
        "Personalized Roadmap Builder",
        "AI Mentor Assistant",
        "Comprehensive Progress Tracking",
        "Public Shareable Profiles",
        "Global Search",
        "Community Foundation"
      ],
      aiMentorArchitecture: [
        "Google Gemini API integration with streaming real-time tokens",
        "Context-aware memory & multi-turn conversation history",
        "Clean service-layer architecture with provider abstraction",
        "Strict JSON schema validation for structured roadmap outputs",
        "Custom engineering AI persona with dynamic prompt tuning"
      ],
      roadmap: [
        "AI Generated Projects & Sandbox",
        "Interactive Coding Challenges",
        "Technical Interview Prep Simulation",
        "Peer Community Hub",
        "Native Android App (Capacitor)",
        "Offline-first PWA Architecture",
        "Automated AI Quality Evaluation Pipeline",
        "Autonomous Multi-Agent Learning System"
      ]
    },
    {
      id: "pawnhub",
      isFlagship: false,
      title: "PawnHub",
      badge: "Web Platform",
      role: "Developer",
      description: "Developer-focused landing website featuring complete landing page design, SEO optimization, a one-click browser installation flow, deployment optimization, Vercel hosting, performance improvements, and modern UI refinements.",
      stack: ["HTML5", "CSS3", "JavaScript", "Vercel", "SEO"],
      githubUrl: "https://github.com/harsh77vardhan",
      features: [
        "Complete responsive landing page",
        "Full SEO & metadata optimization",
        "One-click browser installation flow",
        "Vercel deployment & performance tuning",
        "Modern developer-centric UI refinements"
      ]
    },
    {
      id: "portfolio",
      isFlagship: false,
      title: "Portfolio Website",
      badge: "Personal Showcase",
      role: "Developer & Designer",
      description: "A modern personal portfolio showcasing projects, skills, and achievements. Features responsive UI, SEO architecture, lightweight animations, mobile compatibility, and deployment on Vercel.",
      stack: ["HTML5", "CSS3", "Vanilla JS", "Glassmorphism", "Vercel"],
      githubUrl: "https://github.com/harsh77vardhan",
      features: [
        "Pure vanilla frontend with zero build tool dependencies",
        "Glassmorphic design language inspired by anime sky art",
        "Segmented progress tracking system",
        "IntersectionObserver scroll choreography",
        "Accessible, high-contrast, fully responsive layout"
      ]
    },
    {
      id: "flouraa",
      isFlagship: false,
      title: "Flouraa",
      badge: "E-Commerce Landing",
      role: "Frontend Developer",
      description: "Modern flower shop landing page featuring a responsive design, clean typographic hierarchy, and interactive product presentation built with HTML, CSS, and JavaScript.",
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
      githubUrl: "https://github.com/harsh77vardhan",
      features: [
        "Modern floral commerce aesthetic",
        "Smooth interactive micro-animations",
        "Mobile-first responsive grid",
        "Clean semantic component layout"
      ]
    }
  ],

  workflowSteps: [
    { step: "01", name: "Idea", desc: "Identify real user problems and define the core value proposition." },
    { step: "02", name: "Research", desc: "Analyze technical feasibility, user personas, and state-of-the-art tools." },
    { step: "03", name: "UI Design", desc: "Draft high-contrast, accessible layouts, glass tokens, and component states." },
    { step: "04", name: "Frontend", desc: "Build responsive, semantic interfaces with zero fluff and instant feedback." },
    { step: "05", name: "Backend", desc: "Architect RESTful endpoints, auth flows, and schema-validated schemas." },
    { step: "06", name: "AI Integration", desc: "Orchestrate LLM prompts, context windows, and streaming responses." },
    { step: "07", name: "Testing", desc: "Validate edge cases, mobile touch targets, and cross-browser consistency." },
    { step: "08", name: "Deployment", desc: "Configure custom domains, CI/CD pipelines, and edge network hosting." },
    { step: "09", name: "SEO", desc: "Implement Open Graph, JSON-LD structured data, and search indexability." },
    { step: "10", name: "Performance Optimization", desc: "Refactor bottlenecks, prune unused assets, and guarantee 60fps scrolling." },
    { step: "11", name: "Continuous Improvements", desc: "Collect telemetry, review feedback, and iterate on product features." }
  ],

  experienceAndLearning: {
    engineeringExperience: [
      "Building products from scratch",
      "Frontend and backend architecture",
      "API design",
      "AI integration",
      "Authentication systems",
      "Deployment",
      "Production debugging",
      "Git workflows",
      "Refactoring",
      "Performance and SEO optimization"
    ],
    currentlyLearning: [
      "Advanced React",
      "FastAPI",
      "AI Systems",
      "Docker",
      "System Design",
      "Machine Learning",
      "Cloud Deployment",
      "Software Architecture",
      "SaaS Development"
    ],
    futureGoals: [
      "Build successful SaaS products",
      "Become an AI Engineer",
      "Become a Full Stack Software Architect",
      "Build globally used AI products",
      "Secure internships at top technology companies",
      "Contribute to open source"
    ]
  },

  devSetup: [
    { key: "OS", value: "CachyOS Linux" },
    { key: "Desktop", value: "GNOME on Wayland" },
    { key: "Editor", value: "VS Code" },
    { key: "Shell", value: "Fish + Starship" },
    { key: "VCS", value: "Git and GitHub" },
    { key: "Deploy", value: "Vercel" },
    { key: "Containers", value: "Docker" },
    { key: "Package manager", value: "npm" },
    { key: "Compiler", value: "g++" }
  ]
};

// Export to window for vanilla JS access
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
