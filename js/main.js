/**
 * main.js - Core Application Script
 * Dynamically renders portfolio sections from data.js, handles navigation, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('Portfolio data not loaded.');
    return;
  }

  // Render All Dynamic Sections
  renderHero(data);
  renderAbout(data);
  renderSkills(data);
  renderProjects(data);
  renderWorkflow(data);
  renderExperience(data);
  renderDevSetup(data);
  renderPhilosophy(data);
  renderContact(data);
  renderFooter(data);

  // Initialize UI Handlers
  initNavigation();
  initContactForm();

  // Instant scroll if hash present on load
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      window.scrollTo(0, target.offsetTop - 70);
    }
  }

  // Initialize Animations
  if (window.PortfolioAnimations) {
    window.PortfolioAnimations.init();
  }
});

/* ==========================================================================
   Render Functions
   ========================================================================== */

/**
 * Renders the Hero Section and reference-inspired card
 */
function renderHero(data) {
  const heroCard = document.getElementById('hero-card-container');
  if (!heroCard) return;

  const { personal, heroStats, heroWorkflowBar } = data;

  // Build 2x2 Stats Grid HTML
  const statsHtml = heroStats.map(stat => `
    <div class="stat-item">
      <span class="stat-label">${escapeHtml(stat.label)}</span>
      <span class="stat-value" ${stat.isNumeric ? `data-counter-target="${stat.value}"` : ''}>
        ${stat.isNumeric ? '0' : escapeHtml(stat.value)}
      </span>
    </div>
  `).join('');

  // Build Segmented Progress Bar HTML (Directly mirroring reference screenshot)
  const totalSegments = heroWorkflowBar.segmentsTotal;
  const stripedCount = heroWorkflowBar.stripedCount;
  const filledCount = heroWorkflowBar.filledCount;

  let segmentsHtml = '';
  for (let i = 0; i < totalSegments; i++) {
    let state = 'empty';
    if (i < stripedCount) {
      state = 'striped';
    } else if (i < stripedCount + filledCount) {
      state = 'filled';
    }
    segmentsHtml += `<div class="segment-cell" data-state="${state}"></div>`;
  }

  const milestonesHtml = heroWorkflowBar.milestones.map(m => `
    <div class="milestone-item">
      <div class="milestone-tick"></div>
      <span class="milestone-text">${escapeHtml(m.name)}</span>
    </div>
  `).join('');

  heroCard.innerHTML = `
    <!-- Top Brand Mark inside card (matches screenshot) -->
    <div class="hero-card-brand">
      <div class="brand-badge">${escapeHtml(personal.initials)}</div>
      <span class="hero-card-brand-title">${escapeHtml(personal.name)}</span>
      <span class="brand-cursor" aria-hidden="true"></span>
      <div class="hero-live-pill">
        <span class="hero-live-dot" aria-hidden="true"></span>
        <span>${escapeHtml(personal.roleLabel)}</span>
      </div>
    </div>

    <!-- Main Headline & Subtitle -->
    <h1 class="hero-heading">${escapeHtml(personal.headline)}</h1>
    <p class="hero-subtitle">${escapeHtml(personal.subtitle)}</p>

    <!-- Action Buttons -->
    <div class="hero-actions">
      <a href="#projects" class="btn btn-primary">
        <span>View Projects</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
      <a href="${escapeHtml(personal.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        <span>GitHub</span>
      </a>
    </div>

    <!-- 2x2 Stats Grid (Reference UI Style) -->
    <div class="hero-stats-grid" role="region" aria-label="Key Highlights">
      ${statsHtml}
    </div>

    <!-- Segmented Workflow Progress Bar (Reference UI Style) -->
    <div class="segmented-progress-wrapper" role="region" aria-label="Workflow Status">
      <div class="segmented-progress-header">
        <span class="segmented-progress-label">${escapeHtml(heroWorkflowBar.label)}</span>
        <span class="segmented-progress-status">Active Pipeline</span>
      </div>
      <div class="segmented-bar" aria-hidden="true">
        ${segmentsHtml}
      </div>
      <div class="segmented-milestones">
        ${milestonesHtml}
      </div>
    </div>
  `;
}

/**
 * Renders the About Section
 */
function renderAbout(data) {
  const container = document.getElementById('about-content-container');
  if (!container) return;

  const { personal, aboutInterests } = data;

  const chipsHtml = aboutInterests.map(interest => `
    <span class="chip">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${escapeHtml(interest)}</span>
    </span>
  `).join('');

  container.innerHTML = `
    <div class="about-grid">
      <!-- Left Card: Bio, Avatar Placeholder & Interests -->
      <div class="about-card reveal">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div class="avatar-placeholder-box" title="Avatar Placeholder (Replace with personal portrait)">
            <span>${escapeHtml(personal.initials)}</span>
          </div>
          <div>
            <h3 style="font-size: 1.35rem; font-weight: 700; color: #fff;">${escapeHtml(personal.name)}</h3>
            <p style="font-size: 0.875rem; color: var(--color-accent-cyan); font-weight: 500;">
              ${escapeHtml(personal.roleLabel)}
            </p>
          </div>
        </div>

        <p class="about-bio-text">${escapeHtml(personal.bio)}</p>

        <div>
          <h4 style="font-size: 0.875rem; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">
            Core Engineering Interests
          </h4>
          <div class="chips-cloud">
            ${chipsHtml}
          </div>
        </div>
      </div>

      <!-- Right Card: Quick Facts & Long-term Goal -->
      <div class="about-card reveal delay-1">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #fff;">Quick Facts</h3>
        
        <div class="about-facts-grid">
          <div class="fact-item">
            <span class="fact-label">Location</span>
            <span class="fact-value">${escapeHtml(personal.location)}</span>
          </div>
          <div class="fact-item">
            <span class="fact-label">Education</span>
            <span class="fact-value">${escapeHtml(personal.education)}</span>
          </div>
          <div class="fact-item">
            <span class="fact-label">Daily Driver</span>
            <span class="fact-value">${escapeHtml(personal.dailyDriver)}</span>
          </div>
        </div>

        <!-- Long-Term Goal Quote -->
        <div class="quote-card">
          <div class="quote-mark" aria-hidden="true">“</div>
          <p class="quote-text">${escapeHtml(personal.goalQuote)}</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the Skills Section with honest segmented proficiency bars
 */
function renderSkills(data) {
  const container = document.getElementById('skills-grid-container');
  if (!container) return;

  const html = data.skillsCategories.map((cat, catIdx) => {
    const skillsRows = cat.skills.map(skill => {
      // Create 10 mini segments for the skill bar
      let segsHtml = '';
      for (let i = 0; i < skill.max; i++) {
        const isActive = i < skill.level;
        segsHtml += `<div class="skill-bar-seg" data-state="${isActive ? 'active' : 'empty'}"></div>`;
      }

      return `
        <div class="skill-row">
          <div class="skill-row-meta">
            <span class="skill-row-name">${escapeHtml(skill.name)}</span>
            <span class="skill-row-level">${skill.level}/${skill.max}</span>
          </div>
          <div class="skill-bar" aria-label="${escapeHtml(skill.name)} proficiency ${skill.level} of ${skill.max}">
            ${segsHtml}
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="skill-category-card reveal delay-${(catIdx % 3) + 1}">
        <div class="skill-category-header">
          <h3 class="skill-category-title">${escapeHtml(cat.category)}</h3>
        </div>
        <div class="skill-list">
          ${skillsRows}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/**
 * Renders the Projects Section (Technea flagship + standard cards)
 */
function renderProjects(data) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const flagship = data.projects.find(p => p.isFlagship);
  const others = data.projects.filter(p => !p.isFlagship);

  // 1. Flagship HTML (Technea)
  let flagshipHtml = '';
  if (flagship) {
    const stackTags = flagship.stack.map(s => `<span class="stack-tag">${escapeHtml(s)}</span>`).join('');
    const featuresList = flagship.features.map(f => `<li class="feature-item">${escapeHtml(f)}</li>`).join('');
    const aiMentorList = flagship.aiMentorArchitecture.map(a => `<li class="feature-item">${escapeHtml(a)}</li>`).join('');
    const roadmapList = flagship.roadmap.map(r => `<li class="feature-item">${escapeHtml(r)}</li>`).join('');

    flagshipHtml = `
      <div class="flagship-card reveal">
        <div class="flagship-badge">${escapeHtml(flagship.badge)}</div>
        <div class="flagship-header">
          <h3 class="flagship-title">${escapeHtml(flagship.title)}</h3>
          <span class="flagship-role">${escapeHtml(flagship.role)}</span>
        </div>
        <p class="flagship-desc">${escapeHtml(flagship.description)}</p>

        <div class="stack-tags" aria-label="Tech Stack">
          ${stackTags}
        </div>

        <div class="flagship-details-grid">
          <div>
            <h4 class="feature-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>Platform Features</span>
            </h4>
            <ul class="feature-list">${featuresList}</ul>
          </div>

          <div>
            <h4 class="feature-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
              <span>AI Mentor Architecture</span>
            </h4>
            <ul class="feature-list">${aiMentorList}</ul>
          </div>

          <div>
            <h4 class="feature-block-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
              <span>Roadmap (What's Next)</span>
            </h4>
            <ul class="feature-list">${roadmapList}</ul>
          </div>
        </div>

        <div>
          <a href="${escapeHtml(flagship.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>Repository on GitHub</span>
          </a>
        </div>
      </div>
    `;
  }

  // 2. Standard Projects Grid HTML
  const standardHtml = others.map((project, idx) => {
    const stackTags = project.stack.map(s => `<span class="stack-tag">${escapeHtml(s)}</span>`).join('');
    const featuresList = project.features.map(f => `<li class="feature-item">${escapeHtml(f)}</li>`).join('');

    return `
      <div class="project-card reveal delay-${(idx % 3) + 1}">
        <div class="project-card-visual">
          <div class="project-card-visual-watermark">${escapeHtml(project.title)}</div>
        </div>

        <div class="project-card-header">
          <h4 class="project-card-title">${escapeHtml(project.title)}</h4>
          <span class="project-card-role">${escapeHtml(project.role)}</span>
        </div>

        <p class="project-card-desc">${escapeHtml(project.description)}</p>

        <div class="stack-tags" style="margin-bottom: 16px;">
          ${stackTags}
        </div>

        <ul class="feature-list" style="margin-bottom: 24px; flex-grow: 1;">
          ${featuresList}
        </ul>

        <div>
          <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>View Repository</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="projects-stack">
      ${flagshipHtml}
      <div class="standard-projects-grid">
        ${standardHtml}
      </div>
    </div>
  `;
}

/**
 * Renders Product Workflow Timeline
 */
function renderWorkflow(data) {
  const container = document.getElementById('workflow-container');
  if (!container) return;

  const stepsHtml = data.workflowSteps.map((step, idx) => `
    <div class="workflow-step reveal delay-${(idx % 4) + 1}">
      <span class="workflow-step-num">${escapeHtml(step.step)}</span>
      <div class="workflow-step-indicator">
        <div class="workflow-step-dot" aria-hidden="true"></div>
        <div class="workflow-step-line" aria-hidden="true"></div>
      </div>
      <div class="workflow-step-content">
        <h4 class="workflow-step-name">${escapeHtml(step.name)}</h4>
        <p class="workflow-step-desc">${escapeHtml(step.desc)}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="workflow-container">
      <div class="workflow-track" role="list">
        ${stepsHtml}
      </div>
    </div>
  `;
}

/**
 * Renders Experience and Learning Sections
 */
function renderExperience(data) {
  const container = document.getElementById('experience-grid-container');
  if (!container) return;

  const { engineeringExperience, currentlyLearning, futureGoals } = data.experienceAndLearning;

  const expList = engineeringExperience.map(item => `
    <div class="experience-pill-item">
      <span>${escapeHtml(item)}</span>
    </div>
  `).join('');

  const learningList = currentlyLearning.map(item => `
    <div class="experience-pill-item">
      <span>${escapeHtml(item)}</span>
    </div>
  `).join('');

  const goalsList = futureGoals.map(item => `
    <div class="experience-pill-item">
      <span>${escapeHtml(item)}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="experience-grid">
      <div class="experience-card reveal">
        <h3 class="experience-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          <span>Engineering Experience</span>
        </h3>
        <div class="experience-pill-list">${expList}</div>
      </div>

      <div class="experience-card reveal delay-1">
        <h3 class="experience-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          <span>Currently Learning</span>
        </h3>
        <div class="experience-pill-list">${learningList}</div>
      </div>

      <div class="experience-card reveal delay-2">
        <h3 class="experience-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          <span>Future Goals</span>
        </h3>
        <div class="experience-pill-list">${goalsList}</div>
      </div>
    </div>
  `;
}

/**
 * Renders Dev Setup terminal-style card
 */
function renderDevSetup(data) {
  const container = document.getElementById('devsetup-container');
  if (!container) return;

  const specsHtml = data.devSetup.map(item => `
    <div class="terminal-spec">
      <span class="terminal-key">${escapeHtml(item.key)}:</span>
      <span class="terminal-val">${escapeHtml(item.value)}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="terminal-card reveal">
      <div class="terminal-header">
        <div class="terminal-controls" aria-hidden="true">
          <span class="terminal-dot close"></span>
          <span class="terminal-dot minimize"></span>
          <span class="terminal-dot maximize"></span>
        </div>
        <span class="terminal-title">harsh@cachyos:~</span>
        <div style="width: 48px;"></div>
      </div>

      <div class="terminal-body">
        <div class="terminal-prompt">
          <span>harsh@cachyos</span>:<span>~</span>$ neofetch
        </div>
        <div class="terminal-grid">
          ${specsHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders Philosophy pull-quote
 */
function renderPhilosophy(data) {
  const container = document.getElementById('philosophy-container');
  if (!container) return;

  container.innerHTML = `
    <div class="philosophy-container reveal">
      <blockquote class="philosophy-quote">
        "${escapeHtml(data.personal.philosophyQuote)}"
      </blockquote>
      <div class="philosophy-author">
        — ${escapeHtml(data.personal.name)}
      </div>
    </div>
  `;
}

/**
 * Renders Contact Section & Form
 */
function renderContact(data) {
  const container = document.getElementById('contact-container');
  if (!container) return;

  const { personal } = data;

  // Check placeholders: hide if empty string, or format cleanly
  const emailItem = personal.emailPlaceholder && personal.emailPlaceholder.trim() !== ''
    ? `
      <div class="contact-link-pill" title="Email Placeholder">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span>${escapeHtml(personal.emailPlaceholder)}</span>
      </div>
    `
    : '';

  const linkedinItem = personal.linkedinPlaceholder && personal.linkedinPlaceholder.trim() !== ''
    ? `
      <div class="contact-link-pill" title="LinkedIn Placeholder">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
        <span>${escapeHtml(personal.linkedinPlaceholder)}</span>
      </div>
    `
    : '';

  container.innerHTML = `
    <div class="contact-layout">
      <!-- Left: Contact Details & GitHub CTA -->
      <div class="contact-info reveal">
        <h3 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: #fff;">
          Let's build something.
        </h3>
        <p style="font-size: 1.0625rem; color: var(--text-secondary); line-height: 1.6;">
          Have a product idea, collaboration opportunity, or questions about my engineering work? Reach out through the form or check my latest code on GitHub.
        </p>

        <div class="contact-links-list">
          <a href="${escapeHtml(personal.githubUrl)}" target="_blank" rel="noopener noreferrer" class="contact-link-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>github.com/harsh77vardhan</span>
          </a>
          ${emailItem}
          ${linkedinItem}
        </div>
      </div>

      <!-- Right: Front-end Validated Contact Form -->
      <div class="contact-form-card reveal delay-1">
        <form id="portfolio-contact-form" novalidate>
          <div class="form-group" id="group-name">
            <label for="contact-name" class="form-label">Name *</label>
            <input type="text" id="contact-name" name="name" class="form-input" placeholder="Your Name" required />
            <span class="form-error-msg" id="error-name">Please enter your name.</span>
          </div>

          <div class="form-group" id="group-email">
            <label for="contact-email" class="form-label">Email *</label>
            <input type="email" id="contact-email" name="email" class="form-input" placeholder="you@domain.com" required />
            <span class="form-error-msg" id="error-email">Please enter a valid email address.</span>
          </div>

          <div class="form-group" id="group-message">
            <label for="contact-message" class="form-label">Message *</label>
            <textarea id="contact-message" name="message" class="form-textarea" placeholder="Tell me about your product or idea..." required></textarea>
            <span class="form-error-msg" id="error-message">Message must be at least 10 characters long.</span>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <span>Send Message</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>

          <div id="contact-success-banner" class="form-success-banner" role="status" aria-live="polite">
            ✓ Thanks for reaching out! Your message has been recorded.
          </div>
        </form>
      </div>
    </div>
  `;
}

/**
 * Renders Footer
 */
function renderFooter(data) {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <div class="footer-container">
      <div class="footer-copy">
        © ${data.personal.copyrightYear} ${escapeHtml(data.personal.name)}. All rights reserved.
      </div>
      <a href="#hero" class="footer-back-to-top">
        <span>Back to top</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
      </a>
    </div>
  `;
}

/* ==========================================================================
   Navigation Handlers
   ========================================================================== */

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar glass blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Mobile Hamburger Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Link Scroll-Spy
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   Contact Form Validation
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const successBanner = document.getElementById('contact-success-banner');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      document.getElementById('group-name').classList.add('has-error');
      isValid = false;
    } else {
      document.getElementById('group-name').classList.remove('has-error');
    }

    // Validate Email
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('group-email').classList.add('has-error');
      isValid = false;
    } else {
      document.getElementById('group-email').classList.remove('has-error');
    }

    // Validate Message (min 10 chars)
    if (messageInput.value.trim().length < 10) {
      document.getElementById('group-message').classList.add('has-error');
      isValid = false;
    } else {
      document.getElementById('group-message').classList.remove('has-error');
    }

    if (isValid) {
      // Simulate successful frontend message transmission
      form.reset();
      successBanner.classList.add('visible');
      setTimeout(() => {
        successBanner.classList.remove('visible');
      }, 6000);
    }
  });

  // Clear errors on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    }
  });
}

/**
 * Escapes HTML string to prevent XSS
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
