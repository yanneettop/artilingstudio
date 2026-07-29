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
    const mobileNav = mobileMenu.querySelector('nav');
    const currentPath = `${window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/'}/`.replace('//', '/');
    const primaryLinks = [
      ['Home', '/'],
      ['Projects', '/projects/'],
      ['Tile Style Library', '/tile-style-library/'],
      ['Contact', '/contact/'],
    ];
    const serviceLinks = [
      ['Bespoke Porcelain Sinks', '/bespoke-porcelain-sinks/'],
      ['Large Format Tiling', '/large-format-tiling-london/'],
      ['Wet Rooms & Bathroom Tiling', '/wet-rooms-bathroom-tiling/'],
      ['Porcelain Fabrication', '/porcelain-fabrication-london/'],
      ['Microcement Alternative', '/microcement-alternative-london/'],
    ];
    const linkMarkup = ([label, href], className = '') => {
      const isCurrent = currentPath === href;
      return `<a href="${href}"${className ? ` class="${className}"` : ''}${isCurrent ? ' aria-current="page"' : ''}>${label}</a>`;
    };

    if (mobileNav) {
      const servicesAreCurrent = serviceLinks.some(([, href]) => currentPath === href);
      mobileNav.innerHTML = `
        <div class="mobile-menu__primary">${primaryLinks.map((link) => linkMarkup(link)).join('')}</div>
        <div class="mobile-menu__services">
          <button class="mobile-menu__services-toggle" type="button" aria-expanded="${servicesAreCurrent}" aria-controls="mobile-menu-services">
            <span>Services</span><span class="mobile-menu__services-icon" aria-hidden="true"></span>
          </button>
          <div class="mobile-menu__services-list" id="mobile-menu-services"${servicesAreCurrent ? '' : ' hidden'}>
            ${serviceLinks.map((link) => linkMarkup(link)).join('')}
          </div>
        </div>
        ${linkMarkup(['Start a Bespoke Sink Enquiry', '/quote/'], 'btn btn--dark mobile-menu__cta')}
      `;
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu__close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.setAttribute('data-menu-close', '');
    closeBtn.innerHTML = '<span></span><span></span>';
    mobileMenu.prepend(closeBtn);

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const servicesToggle = mobileMenu.querySelector('.mobile-menu__services-toggle');
    const servicesList = mobileMenu.querySelector('.mobile-menu__services-list');
    let menuScrollY = 0;
    let menuIsOpen = false;

    servicesToggle?.addEventListener('click', () => {
      const expanded = servicesToggle.getAttribute('aria-expanded') === 'true';
      servicesToggle.setAttribute('aria-expanded', String(!expanded));
      if (servicesList) servicesList.hidden = expanded;
    });

    const setMenu = (open, restoreFocus = false) => {
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      mobileMenu.inert = !open;
      document.body.classList.toggle('is-menu-open', open);
      closeBtn.tabIndex = open ? 0 : -1;
      if (open) {
        menuScrollY = window.scrollY;
        menuIsOpen = true;
        document.body.style.top = `-${menuScrollY}px`;
        window.setTimeout(() => closeBtn.focus({ preventScroll: true }), 50);
      } else if (menuIsOpen) {
        menuIsOpen = false;
        document.body.style.removeProperty('top');
        window.scrollTo(0, menuScrollY);
        if (restoreFocus) menuBtn.focus({ preventScroll: true });
      }
    };

    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });

    closeBtn.addEventListener('click', () => setMenu(false, true));

    mobileMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => setMenu(false))
    );

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (menuBtn.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenu(false, true);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = [...mobileMenu.querySelectorAll(focusableSelector)]
        .filter((element) => !element.hasAttribute('disabled') && !element.closest('[hidden]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
      'mauve-stone-statement-bathroom': 'dark',
      'verde-marble-feature-bathroom': 'verde',
    };
    /* Titles come from the portfolio data so the homepage, projects page and
       lightbox modals all use the same project names. */
    const conceptTitles = {};
    const conceptDescriptions = {
      'soft-stone-double-vanity': 'A soft stone vanity direction with made-to-measure proportions, floating lines and calm porcelain surface detail.',
      'calacatta-gold-bespoke-bathroom': 'An integrated vanity layout with warm porcelain finishes, storage lines and mitred edge detailing.',
    };
    const conceptAltText = [
      'Studio preview of a bespoke porcelain sink with mitred edges',
      'Made-to-measure porcelain vanity sink preview',
      'Porcelain basin study inspired by real fabrication work',
    ];
    const selectedProjectSlugs = [
      'rose-onyx-porcelain-sinks-large-format-bathroom-tiling',
      'onyx-frame-porcelain-vanity',
      'floating-mitred-porcelain-sink',
    ];
    const selectedProjectTitles = {
      'rose-onyx-porcelain-sinks-large-format-bathroom-tiling': 'Rose Onyx Large Format Bathroom',
      'onyx-frame-porcelain-vanity': 'Onyx Frame Vanity',
      'floating-mitred-porcelain-sink': 'Floating Mitred Porcelain Sinks',
    };
    const selectedProjects = portfolio
      ? portfolio.getBySlugs(selectedProjectSlugs).map((project) => ({
          ...project,
          title: selectedProjectTitles[project.slug] || project.title,
        }))
      : [];
    const selectedProjectLabels = {
      'rose-onyx-porcelain-sinks-large-format-bathroom-tiling': 'Large Format Bathroom',
      'onyx-frame-porcelain-vanity': 'Bespoke Vanity',
      'floating-mitred-porcelain-sink': 'Bespoke Sinks',
    };
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
    const projectModalGalleryFor = (project) => {
      const images = project.modalGalleryImages?.length
        ? project.modalGalleryImages
        : [
            project.coverImage || project.cover,
            ...(project.galleryImages || []),
            ...(project.detailImages || []),
          ].filter(Boolean);

      return images.map((src, imageIndex) => ({
        src: withAssetVersion(src),
        alt:
          project.modalImageAlts?.[imageIndex] ||
          project.imageAlts?.[imageIndex] ||
          (imageIndex === 0 ? projectAltFor(project) : `${project.title} gallery image ${imageIndex}`),
      }));
    };

    const renderSelectedWork = (project, index) => `
      <article class="selected-work selected-work--${teaserToneBySlug[project.slug] || 'warm'} selected-work--${project.slug}" data-project-slug="${project.slug}" data-reveal="card" data-reveal-delay="${index * 90}">
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
      <article class="selected-work selected-work--${teaserToneBySlug[project.slug] || 'warm'} selected-work--${project.slug}" data-project-slug="${project.slug}" data-reveal="card" data-reveal-delay="${index * 90}">
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

    const selectedProjectImageFor = (project) =>
      project.coverImage || project.cover || project.galleryImages?.[0] || '';
    const selectedProjectHoverImageFor = (project) =>
      project.galleryImages?.[0] || project.coverImage || project.cover || '';
    const selectedProjectAltFor = (project) => projectAltFor(project);
    const selectedProjectMetaFor = (project) => {
      const parts = [project.scope || project.category || project.descriptor, project.location].filter(Boolean);
      return parts.join(' · ');
    };
    const selectedProjectDescriptionFor = (project) =>
      project.seoDescription || project.summary || project.descriptor || '';
    const renderSelectedProject = (project, index) => {
      const label = selectedProjectLabels[project.slug] || project.serviceTags?.[0] || project.scope;
      const description = index === 0
        ? `<p class="home-selected-project__description">${escapeHtml(selectedProjectDescriptionFor(project))}</p>`
        : '';

      return `
        <article class="home-selected-project home-selected-project--${index === 0 ? 'featured' : 'support'}" data-reveal="card" data-reveal-delay="${index * 90}">
          <button class="home-selected-project__media" type="button" data-lightbox-open="${project.slug}" aria-label="Open ${escapeHtml(project.title)} gallery">
            <img class="home-selected-project__image home-selected-project__image--primary" src="${withAssetVersion(selectedProjectImageFor(project))}" alt="${escapeHtml(selectedProjectAltFor(project))}" loading="lazy" />
            <img class="home-selected-project__image home-selected-project__image--hover" src="${withAssetVersion(selectedProjectHoverImageFor(project))}" alt="" loading="lazy" aria-hidden="true" />
            <span class="home-selected-project__label">${escapeHtml(label)}</span>
          </button>
          <div class="home-selected-project__info">
            <div class="home-selected-project__copy">
              <h3><button type="button" data-lightbox-open="${project.slug}">${escapeHtml(project.title)}</button></h3>
              <p class="home-selected-project__meta">${escapeHtml(selectedProjectMetaFor(project))}</p>
              ${description}
            </div>
            <button class="home-selected-project__link" type="button" data-lightbox-open="${project.slug}">View project <span aria-hidden="true">→</span></button>
          </div>
        </article>
      `;
    };

    portfolioSequenceRoot.innerHTML = `
      <section class="portfolio-group portfolio-group--concepts" aria-labelledby="portfolio-concepts-title">
        <header class="portfolio-group__head" data-reveal="copy">
          <p class="eyebrow">Studio previews</p>
          <h3 id="portfolio-concepts-title">Material Studies</h3>
          <p>Porcelain sink and vanity directions shaped around real fabrication details, helping clients picture possible proportions, finishes and mitred bathroom surfaces.</p>
        </header>
        <div class="portfolio-concepts-grid">
          ${selectedWorksTeaser.map((project, index) => renderConceptWork(project, index)).join('')}
        </div>
      </section>

      <section class="home-selected-projects" aria-labelledby="home-selected-projects-title">
        <header class="home-selected-projects__header" data-reveal="copy">
          <div class="home-selected-projects__intro">
            <p class="home-selected-projects__eyebrow">Selected Projects</p>
            <h2 id="home-selected-projects-title">Selected projects</h2>
            <p>Bespoke porcelain fabrication, large-format tiling and carefully resolved bathroom surfaces across London.</p>
          </div>
          <a class="home-selected-projects__all" href="/projects/">Explore all projects <span aria-hidden="true">→</span></a>
        </header>
        <div class="home-selected-projects__grid">
          ${selectedProjects.map((project, index) => renderSelectedProject(project, index)).join('')}
        </div>
      </section>
    `;

    const createPortfolioLightbox = (projects) => {
      const lightbox = document.createElement('aside');
      lightbox.className = 'portfolio-lightbox';
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-labelledby', 'homepage-project-lightbox-title');
      lightbox.innerHTML = `
        <div class="portfolio-lightbox__backdrop" data-lightbox-close></div>
        <div class="portfolio-lightbox__dialog" role="document">
          <header class="portfolio-lightbox__header">
            <div>
              <p class="portfolio-lightbox__kicker" data-lightbox-category></p>
              <h2 id="homepage-project-lightbox-title" data-lightbox-title></h2>
              <p class="portfolio-lightbox__description" data-lightbox-description hidden></p>
              <div class="portfolio-lightbox__sections" data-lightbox-sections hidden></div>
              <div class="portfolio-lightbox__details" data-lightbox-details hidden></div>
              <ul class="portfolio-lightbox__features" data-lightbox-features hidden></ul>
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
      const descriptionEl = lightbox.querySelector('[data-lightbox-description]');
      const sectionsEl = lightbox.querySelector('[data-lightbox-sections]');
      const detailsEl = lightbox.querySelector('[data-lightbox-details]');
      const featuresEl = lightbox.querySelector('[data-lightbox-features]');
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
      let activeTrigger = null;
      const lightboxFocusable = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

      const setBodyLock = (locked) => {
        if (locked) {
          scrollY = window.scrollY;
          document.body.classList.add('is-lightbox-open');
          document.body.style.top = `-${scrollY}px`;
          return;
        }
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        document.body.classList.remove('is-lightbox-open');
        document.body.style.top = '';
        window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
        root.style.scrollBehavior = previousScrollBehavior;
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

      const open = (slug, index = 0, trigger = null) => {
        activeProject = bySlug.get(slug);
        if (!activeProject) return;
        activeImages = projectModalGalleryFor(activeProject);
        if (!activeImages.length) return;
        titleEl.textContent = activeProject.title;
        categoryEl.textContent = activeProject.category || activeProject.descriptor || activeProject.scope || '';
        const description = activeProject.fullDescription || '';
        descriptionEl.textContent = description;
        descriptionEl.hidden = !description;
        const sections = activeProject.projectSections || [];
        sectionsEl.innerHTML = sections
          .map((section) => `
            <section class="portfolio-lightbox__section">
              <h3>${escapeHtml(section.title)}</h3>
              <p>${escapeHtml(section.body)}</p>
            </section>
          `)
          .join('');
        sectionsEl.hidden = !sections.length;
        const detailRows = [
          ['Material', activeProject.details?.material],
          ['Work', activeProject.details?.work],
          ['Detail', activeProject.details?.detail],
        ].filter(([, value]) => value);
        detailsEl.innerHTML = detailRows.length
          ? `
            <h3>Details</h3>
            <dl>
              ${detailRows
                .map(
                  ([label, value]) => `
                <div>
                  <dt>${escapeHtml(label)}</dt>
                  <dd>${escapeHtml(value)}</dd>
                </div>`
                )
                .join('')}
            </dl>
          `
          : '';
        detailsEl.hidden = !detailRows.length;
        const features = activeProject.features || [];
        featuresEl.innerHTML = features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('');
        featuresEl.hidden = !features.length;
        activeTrigger = trigger;
        renderThumbs();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        setBodyLock(true);
        setImage(index);
        window.setTimeout(() => closeBtn.focus({ preventScroll: true }), 50);
      };

      const close = () => {
        if (!lightbox.classList.contains('is-open')) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        imageEl.removeAttribute('src');
        setBodyLock(false);
        if (activeTrigger?.isConnected) activeTrigger.focus({ preventScroll: true });
        activeTrigger = null;
      };

      portfolioSequenceRoot.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-lightbox-open]');
        if (!trigger) return;
        event.preventDefault();
        open(trigger.dataset.lightboxOpen, Number(trigger.dataset.lightboxIndex || 0), trigger);
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
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          return;
        }
        if (event.key === 'Tab') {
          const focusable = [...lightbox.querySelectorAll(lightboxFocusable)];
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          return;
        }
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

    createPortfolioLightbox([...selectedWorksTeaser, ...selectedProjects]);
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
  const parallaxTargets = document.querySelectorAll('.hero__parallax-bg, [data-parallax-bg]');
  const mobileHero = window.matchMedia('(max-width: 767px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (parallaxTargets.length && !mobileHero.matches && !reducedMotion.matches) {
    let ticking = false;

    const updateParallax = () => {
      parallaxTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top) / window.innerHeight));
        const strength = target.hasAttribute('data-parallax-bg') ? 34 : window.scrollY * 0.24;

        if (target.hasAttribute('data-parallax-bg')) {
          target.style.setProperty('--parallax-y', `${progress * strength}px`);
        } else {
          target.style.transform = `translateY(${strength}px)`;
        }
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  } else {
    parallaxTargets.forEach((target) => {
      target.style.removeProperty('transform');
      target.style.setProperty('--parallax-y', '0px');
    });
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

    const zoomEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const zoomDuration = 430;
    const getZoomPadding = () => Math.min(Math.max(window.innerWidth * 0.03, 14), 36);
    const getImageRect = (image) => {
      const rect = image.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    };
    const getFinalRect = (image) => {
      const padding = getZoomPadding();
      const maxWidth = Math.min(window.innerWidth - padding * 2, 1480);
      const maxHeight = window.innerHeight * 0.88;
      const sourceRect = image.getBoundingClientRect();
      const aspect =
        image.naturalWidth && image.naturalHeight
          ? image.naturalWidth / image.naturalHeight
          : sourceRect.width / sourceRect.height || 1;

      let width = maxWidth;
      let height = width / aspect;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspect;
      }

      return {
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
        width,
        height,
      };
    };
    const applyRect = (image, rect) => {
      image.style.left = `${rect.left}px`;
      image.style.top = `${rect.top}px`;
      image.style.width = `${rect.width}px`;
      image.style.height = `${rect.height}px`;
    };

    const close = () => {
      if (!active) return;
      const { overlay, clone, source } = active;
      active = null;
      if (source && source.isConnected) {
        applyRect(clone, getImageRect(source));
      }
      overlay.classList.remove('is-open');
      const remove = (event) => {
        if (event && event.target !== overlay) return;
        clone.removeEventListener('transitionend', remove);
        overlay.remove();
        document.body.classList.remove('is-sink-zoom-open');
        if (source?.isConnected) source.focus({ preventScroll: true });
      };
      clone.addEventListener('transitionend', remove);
      window.setTimeout(remove, zoomDuration + 120);
    };

    const open = (source) => {
      if (active) return;
      const overlay = document.createElement('div');
      overlay.className = 'sink-zoom';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Expanded project image. Press Escape to close.');
      overlay.tabIndex = -1;

      const backdrop = document.createElement('div');
      backdrop.className = 'sink-zoom__backdrop';

      const clone = document.createElement('img');
      clone.className = 'sink-zoom__img';
      clone.src = source.currentSrc || source.src;
      clone.alt = source.alt || '';
      clone.decoding = 'async';
      clone.style.transitionDuration = `${zoomDuration}ms`;
      clone.style.transitionTimingFunction = zoomEase;
      applyRect(clone, getImageRect(source));

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
      active = { overlay, clone, source };
      requestAnimationFrame(() => {
        overlay.classList.add('is-open');
        applyRect(clone, getFinalRect(source));
        overlay.focus({ preventScroll: true });
      });
    };

    zoomables.forEach((img) => {
      img.setAttribute('role', 'button');
      img.tabIndex = img.tabIndex >= 0 ? img.tabIndex : 0;
      img.setAttribute('aria-label', img.alt ? `Zoom image: ${img.alt}` : 'Zoom image');
      img.addEventListener('click', (event) => {
        event.preventDefault();
        open(img);
      });
      img.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        open(img);
      });
    });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const zoomCursor = document.createElement('div');
      zoomCursor.className = 'view-cursor view-cursor--zoom';
      zoomCursor.textContent = 'Zoom';
      document.body.appendChild(zoomCursor);

      const moveZoomCursor = (event) => {
        const target = event.target.closest('.sinks__photo, .sinks__strip-photo');
        if (!target || active) {
          zoomCursor.classList.remove('is-visible');
          return;
        }

        zoomCursor.style.left = `${event.clientX}px`;
        zoomCursor.style.top = `${event.clientY}px`;
        zoomCursor.classList.add('is-visible');
      };

      document.addEventListener('mousemove', moveZoomCursor);
      document.addEventListener('mouseleave', () => zoomCursor.classList.remove('is-visible'));
      document.addEventListener('scroll', () => zoomCursor.classList.remove('is-visible'), { passive: true });
    }

    document.addEventListener('click', (event) => {
      if (active && event.target.closest('.sink-zoom')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (active && event.key === 'Escape') close();
    });
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (!document.querySelector('[data-whatsapp-float]')) {
    const whatsappFloat = document.createElement('a');
    whatsappFloat.className = 'whatsapp-float';
    whatsappFloat.href = 'https://wa.me/447481613339?text=Hello%20Artiling%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20project.';
    whatsappFloat.target = '_blank';
    whatsappFloat.rel = 'noopener noreferrer';
    whatsappFloat.setAttribute('aria-label', 'Chat with Artiling Studio on WhatsApp');
    whatsappFloat.setAttribute('data-whatsapp-float', '');
    whatsappFloat.innerHTML = `
      <span class="whatsapp-float__signal" aria-hidden="true"></span>
      <span class="whatsapp-float__label" aria-hidden="true">WhatsApp</span>
      <span class="whatsapp-float__icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false">
          <path d="M16 3.6c-6.8 0-12.4 5.5-12.4 12.3 0 2.2.6 4.4 1.7 6.3L3.6 28.4l6.4-1.7c1.8 1 3.9 1.5 6 1.5 6.8 0 12.4-5.5 12.4-12.3S22.8 3.6 16 3.6Zm0 22.5c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.8 1 1-3.7-.2-.4c-1.1-1.6-1.6-3.5-1.6-5.5 0-5.6 4.6-10.2 10.3-10.2s10.3 4.6 10.3 10.2S21.7 26.1 16 26.1Zm5.6-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.7.8.2 1.4.2 2 .1.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4Z"/>
        </svg>
      </span>
    `;
    document.body.appendChild(whatsappFloat);
  }

})();
