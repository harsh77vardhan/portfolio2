/**
 * data.js - Single Source of Truth for Portfolio Content
 * Pure JavaScript objects defining portfolio content, skills, projects, and metadata.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Harsh Singh",
    roleLabel: "AI Engineer in Progress",
    tagline: "I build products from idea to production.",
    githubUrl: "https://github.com/harsh77vardhan",
    aboutText: "First-year AI & ML student at VIT Bhopal. I build real products end to end: UI, frontend, backend, AI integration and deployment.",
    facts: [
      { label: "Location", value: "India" },
      { label: "Degree", value: "B.Tech AIML" },
      { label: "Environment", value: "Linux (CachyOS)" }
    ],
    copyrightYear: 2026
  },

  skills: [
    {
      group: "Languages",
      items: ["Python", "C++", "JavaScript", "HTML", "CSS"]
    },
    {
      group: "Frontend",
      items: ["React", "Vite"]
    },
    {
      group: "Backend and AI",
      items: ["FastAPI", "Gemini API", "Supabase"]
    },
    {
      group: "Deploy and Tools",
      items: ["Git", "Vercel", "Docker", "Linux"]
    }
  ],

  projects: [
    {
      id: "technea",
      title: "Technea",
      badge: "Flagship",
      isFlagship: true,
      description: "AI-powered learning platform with personalized roadmaps and an AI mentor.",
      tags: ["React", "FastAPI", "Gemini", "Supabase"],
      link: "https://github.com/harsh77vardhan"
    },
    {
      id: "pawnhub",
      title: "PawnHub",
      badge: null,
      isFlagship: false,
      description: "Developer-focused landing website with a one-click browser install flow.",
      tags: ["SEO", "Vercel"],
      link: "https://github.com/harsh77vardhan"
    },
    {
      id: "portfolio",
      title: "Portfolio",
      badge: null,
      isFlagship: false,
      description: "Responsive, fast, SEO-optimized personal site.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://github.com/harsh77vardhan"
    },
    {
      id: "flouraa",
      title: "Flouraa",
      badge: null,
      isFlagship: false,
      description: "Modern flower shop landing page.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://github.com/harsh77vardhan"
    }
  ],

  contact: {
    heading: "Let's build something.",
    githubUrl: "https://github.com/harsh77vardhan",
    formFields: {
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Tell me about your project or idea..."
    }
  }
};

// Expose globally for browser
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
