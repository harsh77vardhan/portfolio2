/**
 * animations.js - Lightweight Vanilla Animation Orchestrator
 * Handles Scroll Reveals, Segmented Bar Fillings, Count-up Numbers, and Subtle Parallax
 */

const PortfolioAnimations = {
  /**
   * Initializes IntersectionObserver for scroll-reveal animations
   */
  initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '100px 0px 50px 0px'
      }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      // Immediate check for elements already in viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150 && rect.bottom > -50) {
        el.classList.add('is-revealed');
      }
      revealObserver.observe(el);
    });
  },

  /**
   * Animates numeric counter stats (e.g. Projects Built: 4)
   */
  initStatCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    if (!counterElements.length) return;

    // Initialize content so numbers are never blank or zero if observer delays
    counterElements.forEach(el => {
      el.textContent = el.getAttribute('data-counter-target');
    });

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-counter-target'), 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1000; // ms
            const stepTime = Math.max(Math.floor(duration / target), 40);

            const timer = setInterval(() => {
              current += 1;
              el.textContent = current;
              if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
              }
            }, stepTime);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    counterElements.forEach(el => counterObserver.observe(el));
  },

  /**
   * Animates segmented skill bars and hero bar when scrolled into view
   */
  initSegmentedBars() {
    const barElements = document.querySelectorAll('.skill-bar, .segmented-bar');
    if (!barElements.length) return;

    const barObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const segments = bar.querySelectorAll('.skill-bar-seg, .segment-cell');
            
            segments.forEach((seg, idx) => {
              setTimeout(() => {
                const targetState = seg.getAttribute('data-state');
                if (targetState === 'striped') {
                  seg.classList.add('striped');
                } else if (targetState === 'filled' || targetState === 'active') {
                  seg.classList.add('filled', 'active');
                }
              }, idx * 60);
            });

            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.25 }
    );

    barElements.forEach(el => barObserver.observe(el));
  },

  /**
   * Subtle, smooth background parallax without distorting the composition
   */
  initParallax() {
    // Only run on desktop/devices with hover and no reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 1024) return;

    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            // Very subtle shift (0.035 factor) that maintains coverage and sharpness
            const offset = scrollY * 0.035;
            document.body.style.backgroundPositionY = `calc(50% + ${offset}px)`;
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  },

  /**
   * Initializes all animations in sequence
   */
  init() {
    this.initScrollReveal();
    this.initStatCounters();
    this.initSegmentedBars();
    this.initParallax();
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.PortfolioAnimations = PortfolioAnimations;
}
