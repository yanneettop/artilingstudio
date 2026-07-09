(() => {
  'use strict';

  const featuredRoot = document.querySelector('[data-projects-featured]');
  const moreRoot = document.querySelector('[data-projects-more]');
  const studiesRoot = document.querySelector('[data-projects-studies]');
  const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));

  if (!featuredRoot || (!moreRoot && !studiesRoot)) return;

  const portfolio = window.ArtilingPortfolio;
  const projects = portfolio ? portfolio.projects : [];
  const featuredRank = new Map(
    (portfolio ? portfolio.projectsFeaturedSlugs : []).map((slug, index) => [slug, index])
  );
  const featuredProjects = portfolio
    ? portfolio.getBySlugs(portfolio.projectsFeaturedSlugs)
    : [];
  /* Additional real, completed work shown under "More Porcelain Sink & Vanity Projects" */
  const morePorcelainSlugs = [
    'soft-stone-double-vanity',
    'calacatta-gold-bespoke-bathroom',
  ];
  /* Studio previews / concept visuals shown under "Design Studies & Sink Concepts" */
  const designStudySlugs = [
    'statuario-linear-sink',
    'calacatta-gold-led-vanity',
    'beige-stone-floating-vanity',
    'framed-mirror-double-vanity',
    'backlit-marble-double-vanity',
  ];
  const detailStudyLabels = {
    'statuario-linear-sink': 'Bespoke Porcelain Sink · Mitred Edges',
    'calacatta-gold-led-vanity': 'Porcelain Vanity Unit · Calacatta Marble Effect',
    'beige-stone-floating-vanity': 'Floating Sink · Large Format Tiling',
    'framed-mirror-double-vanity': 'Porcelain Vanity Unit · Bathroom Porcelain',
    'backlit-marble-double-vanity': 'Porcelain Vanity Unit · Bathroom Porcelain',
  };
  const detailStudyTitles = {
    'statuario-linear-sink': 'Statuario Linear Porcelain Sink Study',
    'calacatta-gold-led-vanity': 'Calacatta Gold LED Vanity Study',
    'beige-stone-floating-vanity': 'Beige Stone Floating Vanity Study',
    'framed-mirror-double-vanity': 'Framed Mirror Double Vanity Study',
    'backlit-marble-double-vanity': 'Backlit Marble Double Vanity Study',
  };

  /* Editorial descriptions for featured projects */
  const editorialDescriptions = {
    'arabescato-oak-basin': 'Made-to-measure porcelain basin with Arabescato-style surfaces, mitred edges, an integrated rectangular sink and a warm oak vanity.',
    'calacatta-line-sink': 'Wall-to-wall porcelain sink with an integrated basin, slim linear drain, matte black wall tap and clean Calacatta-style surface movement.',
    'floating-mitred-porcelain-sink': 'Floating bespoke porcelain sink in warm neutral stone tones, detailed with mitred edges, an integrated basin and wall-mounted tap.',
    'onyx-vein-floating-sink': 'Statement floating porcelain sink with dramatic onyx-style veining, integrated basin and a clean mitred block form.',
    'soft-stone-double-vanity': 'Bespoke porcelain double vanity with integrated sink proportions, clean storage lines and soft stone-effect surfaces for a contemporary London bathroom.',
    'calacatta-gold-bespoke-bathroom': 'Calacatta Gold porcelain bathroom with large-format wall surfaces, tailored vanity detailing and refined transitions around the mirror and storage.',
  };

  const moreProjects = portfolio
    ? portfolio.getBySlugs(morePorcelainSlugs)
    : projects.filter((project) => !featuredRank.has(project.slug)).slice(0, 2);
  const studyProjects = portfolio
    ? portfolio.getBySlugs(designStudySlugs)
    : [];

  const matchesFilter = (project, filter) =>
    filter === 'all' || (project.categories || []).includes(filter);
  const withAssetVersion = (src) =>
    src ? `${src}${src.includes('?') ? '&' : '?'}v=20260424-lightbox-gallery` : '';
  const projectImageFor = (project) =>
    withAssetVersion(project.coverImage || project.cover || project.galleryImages?.[0] || project.collage || '');
  const projectAltFor = (project) => project.alt || project.title;
  const projectDescriptionFor = (project) =>
    project.seoDescription || editorialDescriptions[project.slug] || project.summary || project.descriptor || '';
  const projectTagsFor = (project) => {
    const tags = project.serviceTags || [];
    if (tags.length) return tags;
    const fallbackTags = [];
    if ((project.categories || []).includes('bespoke-sinks')) fallbackTags.push('Bespoke Sink');
    if ((project.categories || []).includes('bathrooms')) fallbackTags.push('Bathroom Tiling');
    if ((project.categories || []).includes('premium-tiling')) fallbackTags.push('Large Format Tiling');
    fallbackTags.push('Porcelain');
    return Array.from(new Set(fallbackTags)).slice(0, 4);
  };
  const renderDetails = (project) => {
    const details = project.details;
    if (!details) return '';
    const rows = [
      ['Material', details.material],
      ['Work', details.work],
      ['Detail', details.detail],
    ].filter(([, value]) => value);
    if (!rows.length) return '';
    return `
      <dl class="project-card__details">
        ${rows
          .map(
            ([label, value]) => `
          <div class="project-card__detail-row">
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(value)}</dd>
          </div>`
          )
          .join('')}
      </dl>
    `;
  };
  const renderTags = (project, max) => {
    let tags = projectTagsFor(project);
    if (typeof max === 'number') tags = tags.slice(0, max);
    if (!tags.length) return '';
    return `
      <ul class="project-card__tags" aria-label="Services">
        ${tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}
      </ul>
    `;
  };
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
        project.imageAlts?.[imageIndex] ||
        (imageIndex === 0
          ? projectAltFor(project)
          : `${project.title} ${imageIndex <= (project.galleryImages || []).length ? 'gallery' : 'detail'} image ${imageIndex}`),
    }));
  };
  let hasRenderedOnce = false;

  /* ── Featured project renderer ── */
  const renderFeaturedProject = (project, index) => `
    <article id="${escapeHtml(project.slug)}" class="project-feature project-feature--${index + 1} project-feature--${project.slug}" data-reveal>
        <button class="project-feature__media" type="button" data-project-lightbox-open="${project.slug}" aria-label="View ${escapeHtml(project.title)} gallery">
          <img src="${projectImageFor(project)}" alt="${escapeHtml(projectAltFor(project))}" loading="${index === 0 ? 'eager' : 'lazy'}" />
        </button>
        <div class="project-feature__caption">
          <span class="project-card__index">0${index + 1}</span>
          <div>
            <h3><button class="project-card__title-action" type="button" data-project-lightbox-open="${project.slug}">${escapeHtml(project.title)}</button></h3>
          <p>${escapeHtml(project.category || project.descriptor)}</p>
          <p class="project-feature__editorial-desc">${escapeHtml(projectDescriptionFor(project))}</p>
          ${renderDetails(project)}
          ${renderTags(project, 3)}
          <button class="project-card__view" type="button" data-project-lightbox-open="${project.slug}">View Project<span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>
  `;

  /* ── Support / detail study renderer ── */
  const renderSupportProject = (project, index, offset = featuredProjects.length, options = {}) => {
    const isStudy = Boolean(options.isStudy);
    const indexStr = String(index + offset + 1).padStart(2, '0');
    const label = escapeHtml(detailStudyLabels[project.slug] || project.category || project.descriptor || '');
    const title = escapeHtml(detailStudyTitles[project.slug] || project.title);
    const descriptor = escapeHtml(projectDescriptionFor(project));
    const descHtml = descriptor && descriptor !== label
      ? `<p class="project-card__desc">${descriptor}</p>`
      : '';
    const viewLabel = isStudy ? 'View Study' : 'View Project';

    return `
      <article id="${escapeHtml(project.slug)}" class="project-card project-card--${(index % 2) + 1} project-card--${project.slug}${isStudy ? ' project-card--study' : ''}" data-reveal>
        <button class="project-card__media" type="button" data-project-lightbox-open="${project.slug}" aria-label="View ${escapeHtml(project.title)} gallery">
          <img src="${projectImageFor(project)}" alt="${escapeHtml(projectAltFor(project))}" loading="lazy" />
          ${isStudy ? '<span class="project-card__badge project-card__badge--overlay">Design Study</span>' : ''}
        </button>
        <div class="project-card__caption">
          <span class="project-card__index">${indexStr}&thinsp;/</span>
          <div>
            <h3><button class="project-card__title-action" type="button" data-project-lightbox-open="${project.slug}">${title}</button></h3>
            <p>${label}</p>
            ${descHtml}
            ${renderDetails(project)}
            ${renderTags(project)}
            <button class="project-card__view" type="button" data-project-lightbox-open="${project.slug}">${viewLabel}<span aria-hidden="true">+</span></button>
          </div>
        </div>
      </article>
    `;
  };

  /* ── Lightbox ── */
  const createProjectLightbox = () => {
    const lightbox = document.createElement('aside');
    lightbox.className = 'portfolio-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.innerHTML = `
      <div class="portfolio-lightbox__backdrop" data-project-lightbox-close></div>
      <div class="portfolio-lightbox__dialog" role="document">
        <header class="portfolio-lightbox__header">
          <div>
            <p class="portfolio-lightbox__kicker" data-project-lightbox-category></p>
            <h2 data-project-lightbox-title></h2>
            <p class="portfolio-lightbox__description" data-project-lightbox-description hidden></p>
            <div class="portfolio-lightbox__sections" data-project-lightbox-sections hidden></div>
            <ul class="portfolio-lightbox__features" data-project-lightbox-features hidden></ul>
          </div>
          <button class="portfolio-lightbox__close" type="button" data-project-lightbox-close aria-label="Close gallery">Close</button>
        </header>
        <div class="portfolio-lightbox__stage">
          <button class="portfolio-lightbox__arrow portfolio-lightbox__arrow--prev" type="button" data-project-lightbox-prev aria-label="Previous image">Prev</button>
          <figure class="portfolio-lightbox__figure">
            <img alt="" data-project-lightbox-image />
          </figure>
          <button class="portfolio-lightbox__arrow portfolio-lightbox__arrow--next" type="button" data-project-lightbox-next aria-label="Next image">Next</button>
        </div>
        <footer class="portfolio-lightbox__footer">
          <span class="portfolio-lightbox__counter" data-project-lightbox-counter></span>
          <div class="portfolio-lightbox__thumbs" data-project-lightbox-thumbs></div>
        </footer>
      </div>
    `;
    document.body.appendChild(lightbox);

    const bySlug = new Map(projects.map((project) => [project.slug, project]));
    const titleEl = lightbox.querySelector('[data-project-lightbox-title]');
    const categoryEl = lightbox.querySelector('[data-project-lightbox-category]');
    const descriptionEl = lightbox.querySelector('[data-project-lightbox-description]');
    const sectionsEl = lightbox.querySelector('[data-project-lightbox-sections]');
    const featuresEl = lightbox.querySelector('[data-project-lightbox-features]');
    const imageEl = lightbox.querySelector('[data-project-lightbox-image]');
    const counterEl = lightbox.querySelector('[data-project-lightbox-counter]');
    const thumbsEl = lightbox.querySelector('[data-project-lightbox-thumbs]');
    const stageEl = lightbox.querySelector('.portfolio-lightbox__stage');
    const closeBtn = lightbox.querySelector('.portfolio-lightbox__close');
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
            <button class="portfolio-lightbox__thumb" type="button" data-project-lightbox-index="${index}" aria-label="Show image ${index + 1}">
              <img src="${image.src}" alt="${escapeHtml(image.alt)}" loading="lazy" />
            </button>
          `
        )
        .join('');
    };

    const open = (slug, index = 0) => {
      const project = bySlug.get(slug);
      if (!project) return;
      activeImages = projectGalleryFor(project);
      if (!activeImages.length) return;
      titleEl.textContent = project.title;
      categoryEl.textContent = project.category || project.descriptor || project.scope || '';
      const description = project.fullDescription || '';
      descriptionEl.textContent = description;
      descriptionEl.hidden = !description;
      const sections = project.projectSections || [];
      sectionsEl.innerHTML = sections
        .map((section) => `
          <section class="portfolio-lightbox__section">
            <h3>${escapeHtml(section.title)}</h3>
            <p>${escapeHtml(section.body)}</p>
          </section>
        `)
        .join('');
      sectionsEl.hidden = !sections.length;
      const features = project.features || [];
      featuresEl.innerHTML = features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('');
      featuresEl.hidden = !features.length;
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

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-project-lightbox-open]');
      if (!trigger) return;
      event.preventDefault();
      open(trigger.dataset.projectLightboxOpen, Number(trigger.dataset.projectLightboxIndex || 0));
    });

    imageEl.addEventListener('load', () => imageEl.classList.add('is-loaded'));
    lightbox.addEventListener('click', (event) => {
      if (event.target.closest('[data-project-lightbox-close]')) close();
      const thumb = event.target.closest('[data-project-lightbox-index]');
      if (thumb) setImage(Number(thumb.dataset.projectLightboxIndex || 0));
    });
    lightbox.querySelector('[data-project-lightbox-prev]').addEventListener('click', () => setImage(activeIndex - 1));
    lightbox.querySelector('[data-project-lightbox-next]').addEventListener('click', () => setImage(activeIndex + 1));
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

  /* ── Render ── */
  const renderProjects = (filter = 'all') => {
    const visibleFeatured = featuredProjects.filter((project) => matchesFilter(project, filter));
    const visibleMore = moreProjects.filter((project) => matchesFilter(project, filter));
    const visibleStudies = studyProjects.filter((project) => matchesFilter(project, filter));

    featuredRoot.innerHTML = visibleFeatured
      .map((project, index) => renderFeaturedProject(project, index))
      .join('');

    if (moreRoot) {
      moreRoot.innerHTML = visibleMore
        .map((project, index) => renderSupportProject(project, index, visibleFeatured.length))
        .join('');
      moreRoot.hidden = visibleMore.length === 0;
    }

    if (studiesRoot) {
      studiesRoot.innerHTML = visibleStudies
        .map((project, index) => renderSupportProject(project, index, 0, { isStudy: true }))
        .join('');
      studiesRoot.hidden = visibleStudies.length === 0;
    }

    featuredRoot.hidden = visibleFeatured.length === 0;

    if (hasRenderedOnce) {
      requestAnimationFrame(() => {
        document
          .querySelectorAll('.projects-results [data-reveal], .projects-featured [data-reveal], .projects-support [data-reveal]')
          .forEach((element) => element.classList.add('is-inview'));
      });
    }

    hasRenderedOnce = true;
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.projectFilter || 'all';

      filterButtons.forEach((currentButton) => {
        const active = currentButton === button;
        currentButton.classList.toggle('is-active', active);
        currentButton.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      renderProjects(filter);
    });
  });

  createProjectLightbox();
  renderProjects();
})();
