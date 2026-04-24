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
      document.body.classList.toggle('is-menu-open', open);
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
      'soft-stone-double-vanity': 'warm',
      'calacatta-gold-bespoke-bathroom': 'warm',
      'dark-emperador-floating-sink': 'dark',
      'mauve-stone-statement-bathroom': 'dark',
      'verde-marble-feature-bathroom': 'verde',
    };
    const withAssetVersion = (src) =>
      src ? `${src}${src.includes('?') ? '&' : '?'}v=20260424-lightbox-gallery` : '';
    const projectImageFor = (project) =>
      withAssetVersion(project.coverImage || project.cover || project.galleryImages?.[0] || project.collage || '');
    const projectAltFor = (project) => project.alt || project.title;
    const escapeHtml = (value = '') =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    const projectGalleryFor = (project) => {
      const images = [
        project.coverImage || project.cover,
        ...(project.galleryImages || []),
        ...(project.detailImages || []),
      ].filter(Boolean);
      return images.map((src, imageIndex) => ({
        src: withAssetVersion(src),
        alt:
          imageIndex === 0
            ? projectAltFor(project)
            : `${project.title} ${imageIndex <= (project.galleryImages || []).length ? 'gallery' : 'detail'} image ${imageIndex}`,
      }));
    };

    const renderSelectedWork = (project, index) => `
      <article class="selected-work selected-work--${teaserToneBySlug[project.slug] || 'warm'} selected-work--${project.slug}" data-project-slug="${project.slug}" data-reveal data-reveal-delay="${index * 90}">
        <button class="selected-work__media" type="button" data-lightbox-open="${project.slug}" aria-label="View ${escapeHtml(project.title)} gallery">
          <img src="${projectImageFor(project)}" alt="${escapeHtml(projectAltFor(project))}" loading="lazy" />
        </button>
        <div class="selected-work__caption">
          <span class="selected-work__number">0${index + 1}</span>
          <div>
            <h3><button class="selected-work__title-action" type="button" data-lightbox-open="${project.slug}">${escapeHtml(project.title)}</button></h3>
            <p>${escapeHtml(project.category || project.descriptor)}</p>
            <button class="selected-work__view" type="button" data-lightbox-open="${project.slug}">View project<span aria-hidden="true">+</span></button>
          </div>
        </div>
      </article>
    `;

    portfolioSequenceRoot.innerHTML = selectedWorksTeaser
      .map((project, index) => renderSelectedWork(project, index))
      .join('');

    const createPortfolioLightbox = (projects) => {
      const lightbox = document.createElement('aside');
      lightbox.className = 'portfolio-lightbox';
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.innerHTML = `
        <div class="portfolio-lightbox__backdrop" data-lightbox-close></div>
        <div class="portfolio-lightbox__dialog" role="document">
          <header class="portfolio-lightbox__header">
            <div>
              <p class="portfolio-lightbox__kicker" data-lightbox-category></p>
              <h2 data-lightbox-title></h2>
            </div>
            <button class="portfolio-lightbox__close" type="button" data-lightbox-close aria-label="Close gallery">Close</button>
          </header>
          <div class="portfolio-lightbox__stage">
            <button class="portfolio-lightbox__arrow portfolio-lightbox__arrow--prev" type="button" data-lightbox-prev aria-label="Previous image">Prev</button>
            <figure class="portfolio-lightbox__figure">
              <img alt="" data-lightbox-image />
            </figure>
            <button class="portfolio-lightbox__arrow portfolio-lightbox__arrow--next" type="button" data-lightbox-next aria-label="Next image">Next</button>
          </div>
          <footer class="portfolio-lightbox__footer">
            <span class="portfolio-lightbox__counter" data-lightbox-counter></span>
            <div class="portfolio-lightbox__thumbs" data-lightbox-thumbs></div>
          </footer>
        </div>
      `;
      document.body.appendChild(lightbox);

      const bySlug = new Map(projects.map((project) => [project.slug, project]));
      const titleEl = lightbox.querySelector('[data-lightbox-title]');
      const categoryEl = lightbox.querySelector('[data-lightbox-category]');
      const imageEl = lightbox.querySelector('[data-lightbox-image]');
      const counterEl = lightbox.querySelector('[data-lightbox-counter]');
      const thumbsEl = lightbox.querySelector('[data-lightbox-thumbs]');
      const stageEl = lightbox.querySelector('.portfolio-lightbox__stage');
      const closeBtn = lightbox.querySelector('.portfolio-lightbox__close');
      let activeProject = null;
      let activeImages = [];
      let activeIndex = 0;
      let scrollY = 0;
      let touchStartX = 0;

      const setBodyLock = (locked) => {
        if (locked) {
          scrollY = window.scrollY;
          document.body.classList.add('is-lightbox-open');
          document.body.style.top = `-${scrollY}px`;
          return;
        }
        document.body.classList.remove('is-lightbox-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
      };

      const setImage = (index) => {
        if (!activeImages.length) return;
        activeIndex = (index + activeImages.length) % activeImages.length;
        const image = activeImages[activeIndex];
        imageEl.classList.remove('is-loaded');
        imageEl.src = image.src;
        imageEl.alt = image.alt;
        counterEl.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(activeImages.length).padStart(2, '0')}`;
        thumbsEl.querySelectorAll('button').forEach((button, thumbIndex) => {
          const isActive = thumbIndex === activeIndex;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-current', isActive ? 'true' : 'false');
          if (isActive) button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
      };

      const renderThumbs = () => {
        thumbsEl.innerHTML = activeImages
          .map(
            (image, index) => `
              <button class="portfolio-lightbox__thumb" type="button" data-lightbox-index="${index}" aria-label="Show image ${index + 1}">
                <img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy" />
              </button>
            `
          )
          .join('');
      };

      const open = (slug, index = 0) => {
        activeProject = bySlug.get(slug);
        if (!activeProject) return;
        activeImages = projectGalleryFor(activeProject);
        if (!activeImages.length) return;
        titleEl.textContent = activeProject.title;
        categoryEl.textContent = activeProject.category || activeProject.descriptor || activeProject.scope || '';
        renderThumbs();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        setBodyLock(true);
        setImage(index);
        closeBtn.focus({ preventScroll: true });
      };

      const close = () => {
        if (!lightbox.classList.contains('is-open')) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        imageEl.removeAttribute('src');
        setBodyLock(false);
      };

      portfolioSequenceRoot.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-lightbox-open]');
        if (!trigger) return;
        event.preventDefault();
        open(trigger.dataset.lightboxOpen, Number(trigger.dataset.lightboxIndex || 0));
      });

      imageEl.addEventListener('load', () => imageEl.classList.add('is-loaded'));
      lightbox.addEventListener('click', (event) => {
        if (event.target.closest('[data-lightbox-close]')) close();
        const thumb = event.target.closest('[data-lightbox-index]');
        if (thumb) setImage(Number(thumb.dataset.lightboxIndex || 0));
      });
      lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => setImage(activeIndex - 1));
      lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => setImage(activeIndex + 1));
      stageEl.addEventListener('click', (event) => {
        if (event.target === stageEl || event.target.classList.contains('portfolio-lightbox__figure')) close();
      });
      stageEl.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
      }, { passive: true });
      stageEl.addEventListener('touchend', (event) => {
        const delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) < 48) return;
        setImage(delta > 0 ? activeIndex - 1 : activeIndex + 1);
      }, { passive: true });
      document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (event.key === 'Escape') close();
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setImage(activeIndex - 1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          setImage(activeIndex + 1);
        }
      });
    };

    createPortfolioLightbox(selectedWorksTeaser);
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

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const viewCursor = document.createElement('div');
    viewCursor.className = 'view-cursor';
    viewCursor.textContent = 'View';
    document.body.appendChild(viewCursor);

    const moveViewCursor = (event) => {
      const target = event.target.closest('.selected-work__media, .project-feature__media, .project-card__media');
      if (!target) {
        viewCursor.classList.remove('is-visible');
        return;
      }

      viewCursor.style.left = `${event.clientX}px`;
      viewCursor.style.top = `${event.clientY}px`;
      viewCursor.classList.add('is-visible');
    };

    document.addEventListener('mousemove', moveViewCursor);
    document.addEventListener('mouseleave', () => viewCursor.classList.remove('is-visible'));
    document.addEventListener('scroll', () => viewCursor.classList.remove('is-visible'), { passive: true });
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

