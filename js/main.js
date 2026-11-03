/**
 * main.js - Core UI Orchestrator
 * Renders portfolio sections dynamically from data.js, handles navigation, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('PORTFOLIO_DATA not found.');
    return;
  }

  // Render all dynamic sections
  renderHero(data);
  renderAbout(data);
  renderSkills(data);
  renderWork(data);
  renderContact(data);
  renderFooter(data);

  // Initialize interactive components
  initNavigation();
  initContactForm();

  // Handle direct hash navigation
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  // Initialize smooth animations
  if (window.PortfolioAnimations) {
    window.PortfolioAnimations.init();
  }
});

/* ==========================================================================
   Helper Functions
   ========================================================================== */

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   Section Render Functions
   ========================================================================== */

/**
 * 1. Render Hero Section
 */
function renderHero(data) {
  const container = document.getElementById('hero-content-container');
  if (!container) return;

  const { personal } = data;

  container.innerHTML = `
    <div class="hero-content">
      <div class="hero-micro-label">${escapeHtml(personal.roleLabel)}</div>
      <h1 class="hero-headline">${escapeHtml(personal.name)}</h1>
      <p class="hero-tagline">${escapeHtml(personal.tagline)}</p>
      <div class="hero-actions">
        <a href="#work" class="btn btn-primary">
          <span>View Work</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        <a href="${escapeHtml(personal.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  `;
}

/**
 * 2. Render About Section
 */
function renderAbout(data) {
  const container = document.getElementById('about-content-container');
  if (!container) return;

  const { personal } = data;

  const factsHtml = personal.facts
    .map(fact => `<span class="fact-item">${escapeHtml(fact.value)}</span>`)
    .join('<span class="fact-divider">·</span>');

  container.innerHTML = `
    <div class="about-content reveal">
      <div class="section-label">About</div>
      <p class="about-text">${escapeHtml(personal.aboutText)}</p>
      <div class="about-facts-row">
        ${factsHtml}
      </div>
    </div>
  `;
}

/**
 * 3. Render Skills Section
 */
function renderSkills(data) {
  const container = document.getElementById('skills-content-container');
  if (!container) return;

  const { skills } = data;

  const groupsHtml = skills.map(group => {
    const chipsHtml = group.items
      .map(item => `<span class="chip">${escapeHtml(item)}</span>`)
      .join('');

    return `
      <div class="skill-group-card reveal">
        <h3 class="skill-group-title">${escapeHtml(group.group)}</h3>
        <div class="skill-chips">
          ${chipsHtml}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="reveal">
      <div class="section-label">Skills</div>
    </div>
    <div class="skills-grid">
      ${groupsHtml}
    </div>
  `;
}

/**
 * 4. Render Work / Projects Section
 */
function renderWork(data) {
  const container = document.getElementById('work-content-container');
  if (!container) return;

  const { projects } = data;

  const cardsHtml = projects.map(project => {
    const isFlagship = Boolean(project.isFlagship);
    const tagsHtml = project.tags
      .map(tag => `<span class="tag-pill">${escapeHtml(tag)}</span>`)
      .join('');

    return `
      <article class="project-card ${isFlagship ? 'is-flagship' : ''} reveal">
        <div>
          <div class="card-header">
            ${isFlagship ? `
              <div class="flagship-badge">
                <span class="flagship-badge-dot" aria-hidden="true"></span>
                <span>Flagship</span>
              </div>
            ` : '<span></span>'}
          </div>
          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <p class="card-desc">${escapeHtml(project.description)}</p>
        </div>

        <div class="card-footer">
          <div class="card-tags">
            ${tagsHtml}
          </div>
          <a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="card-view-link" aria-label="View ${escapeHtml(project.title)} on GitHub">
            <span>View</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = `
    <div class="reveal">
      <div class="section-label">Selected Work</div>
    </div>
    <div class="projects-grid">
      ${cardsHtml}
    </div>
  `;
}

/**
 * 5. Render Contact Section
 */
function renderContact(data) {
  const container = document.getElementById('contact-content-container');
  if (!container) return;

  const { contact } = data;

  container.innerHTML = `
    <div class="contact-layout">
      <div class="contact-info reveal">
        <div class="section-label">Contact</div>
        <h2 class="contact-heading">${escapeHtml(contact.heading)}</h2>
        <p class="contact-subtext">Open for discussions about AI engineering, systems development, and building real products.</p>
        <a href="${escapeHtml(contact.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          <svg class="btn-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          <span>github.com/harsh77vardhan</span>
        </a>
      </div>

      <div class="contact-form-card reveal">
        <div id="contact-success-banner" class="form-success-banner" role="status" aria-live="polite">
          Thank you! Your message has been prepared and sent successfully.
        </div>

        <form id="portfolio-contact-form" novalidate>
          <div class="form-group" id="group-name">
            <label for="contact-name" class="form-label">Name</label>
            <input type="text" id="contact-name" class="form-input" placeholder="${escapeHtml(contact.formFields.namePlaceholder)}" required autocomplete="name" />
            <div class="form-error-msg">Please enter your name.</div>
          </div>

          <div class="form-group" id="group-email">
            <label for="contact-email" class="form-label">Email</label>
            <input type="email" id="contact-email" class="form-input" placeholder="${escapeHtml(contact.formFields.emailPlaceholder)}" required autocomplete="email" />
            <div class="form-error-msg">Please enter a valid email address.</div>
          </div>

          <div class="form-group" id="group-message">
            <label for="contact-message" class="form-label">Message</label>
            <textarea id="contact-message" class="form-textarea" placeholder="${escapeHtml(contact.formFields.messagePlaceholder)}" required></textarea>
            <div class="form-error-msg">Please write a short message.</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <span>Send Message</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  `;
}

/**
 * 6. Render Footer
 */
function renderFooter(data) {
  const container = document.getElementById('footer-content-container');
  if (!container) return;

  const { personal } = data;
  container.innerHTML = `
    <p>© ${escapeHtml(personal.copyrightYear)} ${escapeHtml(personal.name)}. All rights reserved.</p>
  `;
}

/* ==========================================================================
   Navigation & Scroll Handlers
   ========================================================================== */

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // Throttled scroll listener
  let isTicking = false;
  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollY = window.pageYOffset || (doc ? doc.scrollTop : 0) || 0;
        if (navbar) {
          navbar.classList.toggle('scrolled', scrollY > 30);
        }

        // Active link scroll spy
        const triggerPos = scrollY + 140;
        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = sections[i];
          if (triggerPos >= sec.offsetTop) {
            const id = sec.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
            break;
          }
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile drawer toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   Contact Form Validation
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const banner = document.getElementById('contact-success-banner');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  const groupName = document.getElementById('group-name');
  const groupEmail = document.getElementById('group-email');
  const groupMessage = document.getElementById('group-message');

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      groupName.classList.add('has-error');
      isValid = false;
    } else {
      groupName.classList.remove('has-error');
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      groupEmail.classList.add('has-error');
      isValid = false;
    } else {
      groupEmail.classList.remove('has-error');
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      groupMessage.classList.add('has-error');
      isValid = false;
    } else {
      groupMessage.classList.remove('has-error');
    }

    if (isValid) {
      if (banner) {
        banner.style.display = 'block';
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
      setTimeout(() => {
        if (banner) banner.style.display = 'none';
      }, 6000);
    }
  });

  // Clear errors on input
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.closest('.form-group')?.classList.remove('has-error');
      });
    }
  });
}
