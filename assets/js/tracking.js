(() => {
  'use strict';

  const EMAIL_ADDRESS = 'info@artilingstudio.co.uk';
  const CONTEXT_KEY = 'artiling_quote_context';
  const SERVICE_PATHS = {
    '/bespoke-porcelain-sinks/': 'bespoke_porcelain_sinks',
    '/large-format-tiling-london/': 'large_format_tiling',
    '/wet-rooms-bathroom-tiling/': 'wet_rooms_bathroom_tiling',
    '/services/': 'services',
  };

  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:';

  const cleanParams = (params = {}) =>
    Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
    );

  const fireEvent = (eventName, params = {}) => {
    const payload = cleanParams(params);

    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...payload });
      }
      if (isLocal && window.console && typeof window.console.debug === 'function') {
        window.console.debug('[Artiling tracking]', eventName, payload);
      }
    } catch (error) {
      if (isLocal && window.console && typeof window.console.debug === 'function') {
        window.console.debug('[Artiling tracking skipped]', eventName, error);
      }
    }
  };

  const pagePath = () => window.location.pathname || '/';

  const targetPathFor = (href) => {
    if (!href) return undefined;
    try {
      const url = new URL(href, window.location.origin);
      return url.origin === window.location.origin ? `${url.pathname}${url.hash || ''}` : url.href;
    } catch (error) {
      return href;
    }
  };

  const textFor = (element) =>
    (element.getAttribute('aria-label') || element.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();

  const linkLocationFor = (element) => {
    if (element.closest('.site-header')) return 'header';
    if (element.closest('.mobile-menu')) return 'mobile_menu';
    if (element.closest('.footer')) return 'footer';
    if (element.closest('.hero, .service-hero, .quote-hero, .projects-hero, .contact-hero')) return 'hero';
    if (element.closest('.projects-final')) return 'final_cta';
    if (element.closest('[data-portfolio-sequence], [data-projects-featured], [data-projects-support]')) return 'portfolio';
    return 'content';
  };

  const serviceFor = (element, targetPath) => {
    const current = SERVICE_PATHS[pagePath()];
    if (current) return current;
    const normalizedTarget = targetPath && targetPath.split('#')[0];
    if (normalizedTarget && SERVICE_PATHS[normalizedTarget]) return SERVICE_PATHS[normalizedTarget];
    const text = textFor(element).toLowerCase();
    if (text.includes('bespoke') || text.includes('sink')) return 'bespoke_porcelain_sinks';
    if (text.includes('large format') || text.includes('surfaces')) return 'large_format_tiling';
    if (text.includes('wet room') || text.includes('bathroom')) return 'wet_rooms_bathroom_tiling';
    return undefined;
  };

  const trackThankYouView = () => {
    if (pagePath() !== '/thank-you/') return;

    let context = {};
    try {
      const stored = window.sessionStorage.getItem(CONTEXT_KEY);
      if (stored) context = JSON.parse(stored) || {};
    } catch (error) {
      context = {};
    }

    fireEvent('thank_you_view', {
      page_path: '/thank-you/',
      source: Object.keys(context).length ? 'quote_form' : undefined,
      project_type: context.project_type,
      material_situation: context.material_situation,
      scope: context.scope,
      timeline: context.timeline,
      budget_range: context.budget_range,
    });
  };

  document.addEventListener('click', (event) => {
    const element = event.target.closest('a, button');
    if (!element) return;

    const href = element.getAttribute('href') || '';
    const targetPath = targetPathFor(href);
    const ctaLabel = textFor(element);
    const linkLocation = linkLocationFor(element);
    const currentPath = pagePath();
    const projectSlug =
      element.dataset.lightboxOpen ||
      element.dataset.projectLightboxOpen ||
      element.closest('[data-project-slug]')?.dataset.projectSlug ||
      element.closest('[id]')?.id;

    if (element.matches('[data-email-link]') || href.startsWith('mailto:')) {
      fireEvent('email_click', {
        page_path: currentPath,
        email_address: EMAIL_ADDRESS,
        link_location: linkLocation,
        cta_label: ctaLabel || EMAIL_ADDRESS,
      });
      return;
    }

    if (href.includes('tiktok.com')) {
      fireEvent('social_click', {
        page_path: currentPath,
        platform: 'TikTok',
        target_url: href,
        link_location: linkLocation,
      });
      return;
    }

    if (element.matches('[data-lightbox-open], [data-project-lightbox-open]')) {
      fireEvent('portfolio_cta_click', {
        page_path: currentPath,
        cta_label: ctaLabel,
        project_slug: projectSlug,
        service: serviceFor(element, targetPath),
      });
      return;
    }

    if (
      currentPath === '/projects/' ||
      targetPath === '/projects/' ||
      targetPath === '#portfolio' ||
      targetPath === '/#portfolio'
    ) {
      fireEvent('portfolio_cta_click', {
        page_path: currentPath,
        cta_label: ctaLabel,
        target_path: targetPath,
        project_slug: projectSlug,
        service: serviceFor(element, targetPath),
      });
      return;
    }

    if (
      targetPath === '/quote/' ||
      targetPath === '/bespoke-porcelain-sinks/' ||
      targetPath === '/large-format-tiling-london/' ||
      targetPath === '/wet-rooms-bathroom-tiling/' ||
      targetPath === '/services/' ||
      SERVICE_PATHS[currentPath]
    ) {
      fireEvent('service_cta_click', {
        page_path: currentPath,
        source_page: currentPath,
        target_path: targetPath,
        cta_label: ctaLabel,
        service: serviceFor(element, targetPath),
      });
    }
  });

  window.ArtilingTracking = {
    fireEvent,
    contextKey: CONTEXT_KEY,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackThankYouView, { once: true });
  } else {
    trackThankYouView();
  }
})();
