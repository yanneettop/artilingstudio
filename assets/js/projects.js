(() => {
  'use strict';

  const featuredRoot = document.querySelector('[data-projects-featured]');
  const supportRoot = document.querySelector('[data-projects-support]');
  const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));

  if (!featuredRoot || !supportRoot) return;

  const portfolio = window.ArtilingPortfolio;
  const projects = portfolio ? portfolio.projects : [];
  const featuredRank = new Map(
    (portfolio ? portfolio.projectsFeaturedSlugs : []).map((slug, index) => [slug, index])
  );
  const featuredProjects = portfolio
    ? portfolio.getBySlugs(portfolio.projectsFeaturedSlugs)
    : [];
  const supportProjects = projects.filter((project) => !featuredRank.has(project.slug));

  const matchesFilter = (project, filter) =>
    filter === 'all' || (project.categories || []).includes(filter);
  const projectImageFor = (project) =>
    project.galleryImages?.[0] || project.cover || project.collage || '';
  let hasRenderedOnce = false;

  const renderFeaturedProject = (project, index) => `
    <article class="project-feature project-feature--${index + 1} project-feature--${project.slug}" data-reveal>
      <figure class="project-feature__media">
        <img src="${projectImageFor(project)}" alt="${project.title}" loading="${index === 0 ? 'eager' : 'lazy'}" />
      </figure>
      <div class="project-feature__caption">
        <span class="project-card__index">0${index + 1}</span>
        <div>
          <h3>${project.title}</h3>
          <p>${project.descriptor}</p>
        </div>
      </div>
    </article>
  `;

  const renderSupportProject = (project, index) => `
    <article class="project-card project-card--${(index % 3) + 1} project-card--${project.slug}" data-reveal>
      <figure class="project-card__media">
        <img src="${projectImageFor(project)}" alt="${project.title}" loading="lazy" />
      </figure>
      <div class="project-card__caption">
        <span class="project-card__index">${String(index + 5).padStart(2, '0')}</span>
        <div>
          <h3>${project.title}</h3>
          <p>${project.descriptor}</p>
        </div>
      </div>
    </article>
  `;

  const renderProjects = (filter = 'all') => {
    const visibleFeatured = featuredProjects.filter((project) => matchesFilter(project, filter));
    const visibleSupport = supportProjects.filter((project) => matchesFilter(project, filter));

    featuredRoot.innerHTML = visibleFeatured
      .map((project, index) => renderFeaturedProject(project, index))
      .join('');
    supportRoot.innerHTML = visibleSupport
      .map((project, index) => renderSupportProject(project, index))
      .join('');

    featuredRoot.hidden = visibleFeatured.length === 0;
    supportRoot.hidden = visibleSupport.length === 0;

    if (hasRenderedOnce) {
      requestAnimationFrame(() => {
        document
          .querySelectorAll('.projects-results [data-reveal]')
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

  renderProjects();
})();
