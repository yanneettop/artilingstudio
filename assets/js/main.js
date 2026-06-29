/* ═══════════════════════════════════════════════════════════════════
   ARTILING STUDIO — main.js
   Restrained, premium interactions only.
   ═══════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ──────────────────────────────────────────────
     0. Scroll progress bar
  ─────────────────────────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

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
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu__close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.setAttribute('data-menu-close', '');
    closeBtn.innerHTML = '<span></span><span></span>';
    mobileMenu.prepend(closeBtn);

    const setMenu = (open) => {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('is-menu-open', open);
      closeBtn.tabIndex = open ? 0 : -1;
    };

    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });

    closeBtn.addEventListener('click', () => setMenu(false));

    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false))
    );

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    setMenu(false);
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
    const conceptTitles = {
      'soft-stone-double-vanity': 'Floating Porcelain Sink Concept',
      'calacatta-gold-bespoke-bathroom': 'Integrated Vanity Sink Concept',
      'dark-emperador-floating-sink': 'Mitred Porcelain Basin Concept',
    };
    const conceptDescriptions = {
      'soft-stone-double-vanity': 'A design concept for made-to-measure porcelain sinks, floating proportions and soft stone-effect bathroom vanity tops.',
      'calacatta-gold-bespoke-bathroom': 'A concept preview for an integrated vanity layout with warm porcelain finishes, storage lines and mitred edge detailing.',
      'dark-emperador-floating-sink': 'A porcelain basin concept inspired by real fabrication work, showing darker marble-effect surfaces and sculptural bathroom details.',
    };
    const conceptAltText = [
      'Concept preview of a bespoke porcelain sink with mitred edges',
      'Design concept for a made-to-measure porcelain vanity sink',
      'Porcelain basin concept inspired by real fabrication work',
    ];
    const completedProjects = [
      {
        title: 'Bespoke Porcelain Sink, London',
        image: './assets/images/services/bespoke-sinks/tanis-floating-trough-grey.webp',
        alt: 'Completed bespoke porcelain sink installation in London',
        description: 'Made-to-measure porcelain sink with mitred edges, fabricated and installed to fit the client\'s bathroom layout.',
        details: ['Mitred porcelain edges', 'Custom measurements', 'Fabricated & installed in London'],
      },
      {
        title: 'Double Porcelain Vanity Sink',
        image: './assets/images/services/bespoke-sinks/tanis-double-porcelain-sink.webp',
        alt: 'Made-to-measure porcelain sink with mitred edges',
        description: 'A completed double vanity formed from porcelain with integrated basins, clean surface returns and bathroom-ready proportions.',
        details: ['Double basin layout', 'Made-to-measure porcelain sinks', 'Bathroom vanity top fabrication'],
      },
      {
        title: 'Mitred Porcelain Basin Detail',
        image: './assets/images/services/porcelain-fabrication/mitred-porcelain-sink-basin-detail-london.webp',
        alt: 'Real porcelain bathroom surface installation by Artiling Studio',
        description: 'Real fabrication work showing porcelain cutouts, mitred edges and the precision needed before final installation.',
        details: ['Porcelain fabrication', 'Mitred edge work', 'Surface and basin detailing'],
      },
    ];
    const selectedWorkTitles = conceptTitles;
    const selectedWorkDescriptions = conceptDescriptions;
    const localAssetSrc = (src) =>
      window.location.protocol === 'file:' && src.startsWith('/') ? `.${src}` : src;
    const withAssetVersion = (src) => {
      const assetSrc = localAssetSrc(src);
      return assetSrc
        ? `${assetSrc}${assetSrc.includes('?') ? '&' : '?'}v=20260424-lightbox-gallery`
        : '';
    };
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
        <button class="selected-work__media" type="button" data-lightbox-open="${project.slug}" aria-label="View ${escapeHtml(selectedWorkTitles[project.slug] || project.title)} gallery">
          <img src="${projectImageFor(project)}" alt="${escapeHtml(projectAltFor(project))}" loading="lazy" />
        </button>
        <div class="selected-work__caption">
          <span class="selected-work__number">0${index + 1}</span>
          <div>
            <h3><button class="selected-work__title-action" type="button" data-lightbox-open="${project.slug}">${escapeHtml(selectedWorkTitles[project.slug] || project.title)}</button></h3>
            <p>${escapeHtml(selectedWorkDescriptions[project.slug] || project.category || project.descriptor)}</p>
            <button class="selected-work__view" type="button" data-lightbox-open="${project.slug}">Open gallery <span aria-hidden="true">→</span></button>
          </div>
        </div>
      </article>
    `;

    const renderConceptWork = (project, index) => `
      <article class="selected-work selected-work--${teaserToneBySlug[project.slug] || 'warm'} selected-work--${project.slug}" data-project-slug="${project.slug}" data-reveal data-reveal-delay="${index * 90}">
        <button class="selected-work__media" type="button" data-lightbox-open="${project.slug}" aria-label="View ${escapeHtml(conceptTitles[project.slug] || project.title)} gallery">
          <img src="${projectImageFor(project)}" alt="${escapeHtml(conceptAltText[index] || projectAltFor(project))}" loading="lazy" />
        </button>
        <div class="selected-work__caption">
          <span class="selected-work__number">0${index + 1}</span>
          <div>
            <h3><button class="selected-work__title-action" type="button" data-lightbox-open="${project.slug}">${escapeHtml(conceptTitles[project.slug] || project.title)}</button></h3>
            <p>${escapeHtml(conceptDescriptions[project.slug] || project.summary || project.descriptor)}</p>
          </div>
        </div>
      </article>
    `;

    const renderCompletedProject = (project, index) => `
      <article class="completed-project-card" data-reveal data-reveal-delay="${index * 90}">
        <figure class="completed-project-card__media">
          <img src="${withAssetVersion(project.image)}" alt="${escapeHtml(project.alt)}" loading="lazy" />
          <figcaption class="portfolio-badge portfolio-badge--solid">Completed Project</figcaption>
        </figure>
        <div class="completed-project-card__body">
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <ul class="completed-project-card__details">
            ${project.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}
          </ul>
          <a href="/quote/" class="completed-project-card__link">Discuss a Similar Project <span aria-hidden="true">→</span></a>
        </div>
      </article>
    `;

    portfolioSequenceRoot.innerHTML = `
      <section class="portfolio-group portfolio-group--concepts" aria-labelledby="portfolio-concepts-title">
        <header class="portfolio-group__head" data-reveal>
          <p class="eyebrow">Inspiration ideas</p>
          <h3 id="portfolio-concepts-title">Design Concepts</h3>
          <p>Visual ideas inspired by real porcelain fabrication work, created to help clients explore possible sink styles, vanity layouts, porcelain finishes and mitred bathroom details.</p>
        </header>
        <div class="portfolio-concepts-grid">
          ${selectedWorksTeaser.map((project, index) => renderConceptWork(project, index)).join('')}
        </div>
      </section>

      <section class="portfolio-group portfolio-group--completed" aria-labelledby="portfolio-completed-title">
        <header class="portfolio-group__head" data-reveal>
          <p class="eyebrow">Real installations</p>
          <h3 id="portfolio-completed-title">Completed Projects</h3>
          <p>Real installations fabricated and fitted for clients across London, using made-to-measure porcelain pieces, mitred edges and carefully planned bathroom details.</p>
        </header>
        <div class="completed-projects-grid">
          ${completedProjects.map((project, index) => renderCompletedProject(project, index)).join('')}
        </div>
      </section>
    `;

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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealAll = () => {
    document.documentElement.classList.add('reveal-failsafe');
    revealTargets.forEach((el) => el.classList.add('is-inview'));
  };

  if (!revealTargets.length || prefersReducedMotion) {
    revealAll();
  } else {
    document.documentElement.classList.add('js-reveal');
    const failsafeTimer = window.setTimeout(revealAll, 3000);

    if (!('IntersectionObserver' in window)) {
      window.clearTimeout(failsafeTimer);
      revealAll();
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
  }

  const countTargets = document.querySelectorAll('[data-count-to]');
  if (countTargets.length) {
    const setCountValue = (el, value) => {
      const suffix = el.dataset.countSuffix || '';
      el.textContent = `${value}${suffix}`;
    };

    const animateCount = (el) => {
      if (el.dataset.countDone === 'true') return;
      el.dataset.countDone = 'true';

      const end = parseInt(el.dataset.countTo || '0', 10);
      if (prefersReducedMotion || !Number.isFinite(end)) {
        setCountValue(el, end);
        return;
      }

      const duration = 1200;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCountValue(el, Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };

      setCountValue(el, 0);
      requestAnimationFrame(tick);
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      countTargets.forEach(animateCount);
    } else {
      const countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.45 }
      );
      countTargets.forEach((el) => countObserver.observe(el));
    }
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
      const offset = window.scrollY * 0.24;
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
      '.service-card, .service-editorial-card, .selected-work, .project-feature, .project-card, .process__step, .sinks__visual, .sinks__strip figure'
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

  const clickableServiceCards = document.querySelectorAll('.service-editorial-card');
  clickableServiceCards.forEach((card) => {
    const link = card.querySelector('.link-arrow[href]');
    if (!link) return;

    card.classList.add('is-clickable-card');
    card.setAttribute('role', 'link');
    card.tabIndex = card.tabIndex >= 0 ? card.tabIndex : 0;

    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      window.location.href = link.href;
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (event.target.closest('a, button')) return;
      event.preventDefault();
      window.location.href = link.href;
    });
  });

  /* ──────────────────────────────────────────────
     7. Sink photo zoom (FLIP lightbox)
        Click a sink photo → it lifts into the window.
        Click again (or Esc) → it settles back.
  ─────────────────────────────────────────────── */
  const zoomables = document.querySelectorAll('.sinks__photo, .sinks__strip-photo');
  if (zoomables.length) {
    let active = null;
    const close = () => {
      if (!active) return;
      const overlay = active;
      active = null;
      overlay.classList.remove('is-open');
      const remove = () => {
        overlay.removeEventListener('transitionend', remove);
        overlay.remove();
        document.body.classList.remove('is-sink-zoom-open');
      };
      overlay.addEventListener('transitionend', remove);
      window.setTimeout(remove, 260);
    };

    const open = (source) => {
      if (active) return;
      const overlay = document.createElement('div');
      overlay.className = 'sink-zoom';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      const backdrop = document.createElement('div');
      backdrop.className = 'sink-zoom__backdrop';

      const clone = document.createElement('img');
      clone.className = 'sink-zoom__img';
      clone.src = source.currentSrc || source.src;
      clone.alt = source.alt || '';
      clone.decoding = 'async';

      const figure = source.closest('figure');
      const capText = figure && figure.querySelector('figcaption')
        ? figure.querySelector('figcaption').textContent.trim()
        : '';

      overlay.appendChild(backdrop);
      overlay.appendChild(clone);
      if (capText) {
        const cap = document.createElement('p');
        cap.className = 'sink-zoom__cap';
        cap.textContent = capText;
        overlay.appendChild(cap);
      }
      document.body.appendChild(overlay);
      document.body.classList.add('is-sink-zoom-open');
      active = overlay;
      requestAnimationFrame(() => overlay.classList.add('is-open'));
    };

    zoomables.forEach((img) => {
      img.addEventListener('click', (event) => {
        event.preventDefault();
        open(img);
      });
    });

    document.addEventListener('click', (event) => {
      if (active && event.target.closest('.sink-zoom')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (active && event.key === 'Escape') close();
    });
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
