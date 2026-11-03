/**
 * animations.js - Lightweight Smooth Motion & Parallax Orchestrator
 * Adheres strictly to design skill guidelines:
 * - Slow, smooth fades and slight upward reveals on scroll
 * - Very subtle background parallax
 * - Respects prefers-reduced-motion
 */

const PortfolioAnimations = {
  /**
   * Initializes IntersectionObserver for scroll-reveal animations
   */
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const checkVisible = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh + 100) {
          el.classList.add('is-revealed');
        }
      });
    };

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '300px 0px 300px 0px'
      }
    );

    revealElements.forEach(el => {
      revealObserver.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top <= (window.innerHeight || 900) + 200) {
        el.classList.add('is-revealed');
      }
    });
    window.addEventListener('scroll', checkVisible, { passive: true });
  },

  /**
   * Initializes background video controls:
   * - Pause when tab is hidden, resume when visible
   * - Respect prefers-reduced-motion (remove/pause video, keep poster)
   * - On mobile (<= 768px) or data-saver (navigator.connection.saveData), show poster
   * - If autoplay is blocked, retry on first user interaction
   */
  initBackgroundVideo() {
    const video = document.getElementById('bg-video');
    const stage = document.getElementById('bg-stage');
    if (!video || !stage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    const isSaveData = Boolean(
      navigator.connection && (navigator.connection.saveData === true || ['slow-2g', '2g'].includes(navigator.connection.effectiveType))
    );

    // If user prefers reduced motion or data saver / mobile fallback
    if (prefersReducedMotion || isSaveData || isMobile) {
      video.pause();
      video.style.display = 'none';
      return;
    }

    // Attempt video playback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented by browser policy - retry on first user gesture
        const resumeOnInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', resumeOnInteraction);
          window.removeEventListener('keydown', resumeOnInteraction);
          window.removeEventListener('touchstart', resumeOnInteraction);
        };
        window.addEventListener('click', resumeOnInteraction, { once: true });
        window.addEventListener('keydown', resumeOnInteraction, { once: true });
        window.addEventListener('touchstart', resumeOnInteraction, { once: true });
      });
    }

    // Visibility change: pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        video.pause();
      } else {
        if (!prefersReducedMotion && !isSaveData && window.innerWidth > 768) {
          video.play().catch(() => {});
        }
      }
    });

    // Handle fallback if video encounters any runtime error
    video.addEventListener('error', () => {
      video.style.display = 'none';
    });
  },

  /**
   * Very subtle mouse parallax on desktop (max 6px shift, no distortion)
   */
  initParallax() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 1024) return;

    const stage = document.getElementById('bg-stage');
    if (!stage) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const onMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Max 6px shift
      targetX = ((e.clientX - centerX) / centerX) * 6;
      targetY = ((e.clientY - centerY) / centerY) * 6;

      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      stage.style.transform = `translate3d(${-currentX.toFixed(2)}px, ${-currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
  },

  /**
   * Initializes all animations in sequence
   */
  init() {
    this.initBackgroundVideo();
    this.initScrollReveal();
    this.initParallax();
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.PortfolioAnimations = PortfolioAnimations;
}
