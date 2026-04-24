/* ═══════════════════════════════════════════════════════════════════
   ARTILING STUDIO — main.js
   Restrained, premium interactions only.
   ═══════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ──────────────────────────────────────────────
     1. Header: solid state on scroll
  ─────────────────────────────────────────────── */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ──────────────────────────────────────────────
     2. Mobile menu
  ─────────────────────────────────────────────── */
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuBtn && mobileMenu) {
    const setMenu = (open) => {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });

    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false))
    );

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ──────────────────────────────────────────────
     3. Scroll reveal
  ─────────────────────────────────────────────── */
  const portfolioSequenceRoot = document.querySelector('[data-portfolio-sequence]');

  if (portfolioSequenceRoot) {
    const portfolio = window.ArtilingPortfolio;
    const selectedWorksTeaser = portfolio
      ? portfolio.getBySlugs(portfolio.homepageSelectedWorkSlugs)
      : [];
    const teaserToneBySlug = {
      'calacatta-gold-bespoke-bathroom': 'warm',
      'mauve-stone-statement-bathroom': 'dark',
      'verde-marble-feature-bathroom': 'verde',
    };
    const projectImageFor = (project) =>
      project.galleryImages?.[0] || project.cover || project.collage || '';

    const renderSelectedWork = (project, index) => `
      <article class="selected-work selected-work--${teaserToneBySlug[project.slug] || 'warm'} selected-work--${project.slug}" data-reveal data-reveal-delay="${index * 90}">
        <figure class="selected-work__media">
          <img src="${projectImageFor(project)}" alt="${project.title}" loading="lazy" />
        </figure>
        <div class="selected-work__caption">
          <span class="selected-work__number">0${index + 1}</span>
          <div>
            <h3>${project.title}</h3>
            <p>${project.descriptor}</p>
          </div>
        </div>
      </article>
    `;

    portfolioSequenceRoot.innerHTML = selectedWorksTeaser
      .map((project, index) => renderSelectedWork(project, index))
      .join('');
  }
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-inview'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const delay = parseInt(el.dataset.revealDelay || '0', 10);
          setTimeout(() => el.classList.add('is-inview'), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  }

  /* ──────────────────────────────────────────────
     4. Active nav link on scroll
  ─────────────────────────────────────────────── */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkByHref = new Map(
      navLinks.map((a) => [a.getAttribute('href'), a])
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = '#' + entry.target.id;
          const link = linkByHref.get(id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((s) => activeObserver.observe(s));
  }

  /* ──────────────────────────────────────────────
     5. Hero parallax
  ─────────────────────────────────────────────── */
  const heroBg = document.querySelector('.hero__parallax-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;

    const updateParallax = () => {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────
     6. Year in footer (defensive)
  ─────────────────────────────────────────────── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const interactiveTiles = document.querySelectorAll(
      '.service-card, .selected-work, .project-feature, .project-card, .process__step, .sinks__visual, .sinks__strip figure'
    );

    interactiveTiles.forEach((tile) => {
      tile.addEventListener('mousemove', (event) => {
        const rect = tile.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        tile.style.setProperty('--pointer-x', `${x}%`);
        tile.style.setProperty('--pointer-y', `${y}%`);
      });

      tile.addEventListener('mouseleave', () => {
        tile.style.removeProperty('--pointer-x');
        tile.style.removeProperty('--pointer-y');
      });
    });
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

