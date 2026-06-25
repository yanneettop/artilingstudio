(() => {
  'use strict';

  const STORAGE_KEY = 'artiling_cookie_consent_v1';
  const GA_ID = 'G-E0QZDM72EE';
  const CLARITY_ID = 'wntbl05f7l';
  const AHREFS_KEY = '1jndHEhZBuhAFCR+grpuJg';

  const defaultConsent = {
    analytics: false,
    marketing: false,
    decided: false,
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

  // Google Consent Mode v2 default: deny non-essential storage before any analytics loads.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  const cleanConsent = (value) => ({
    analytics: !!value?.analytics,
    marketing: !!value?.marketing,
    decided: !!value?.decided,
  });

  const readConsent = () => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? cleanConsent(JSON.parse(stored)) : { ...defaultConsent };
    } catch (error) {
      return { ...defaultConsent };
    }
  };

  const writeConsent = (consent) => {
    const next = cleanConsent({ ...consent, decided: true });
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      // Consent still applies for this page view even if storage is unavailable.
    }
    return next;
  };

  const consentModePayload = (consent) => ({
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });

  const updateGoogleConsent = (consent) => {
    window[`ga-disable-${GA_ID}`] = !consent.analytics;
    window.gtag('consent', 'update', consentModePayload(consent));
  };

  const loadScript = (id, src, attrs = {}) => {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    document.head.appendChild(script);
  };

  let analyticsConfigured = false;

  const loadAnalytics = (consent) => {
    if (!consent.analytics) return;

    loadScript('artiling-ga4', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    if (!analyticsConfigured) {
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
      analyticsConfigured = true;
    }

    window.clarity = window.clarity || function clarity(){ (window.clarity.q = window.clarity.q || []).push(arguments); };
    loadScript('artiling-clarity', `https://www.clarity.ms/tag/${CLARITY_ID}`);
    loadScript('artiling-ahrefs', 'https://analytics.ahrefs.com/analytics.js', {
      'data-key': AHREFS_KEY,
    });
  };

  let currentConsent = readConsent();
  updateGoogleConsent(currentConsent);
  loadAnalytics(currentConsent);

  const closePanel = () => {
    document.querySelector('[data-cookie-consent]')?.remove();
  };

  const stopLoadedAnalytics = (previousConsent, nextConsent) => {
    if (!previousConsent.analytics || nextConsent.analytics) return false;

    document.getElementById('artiling-ga4')?.remove();
    document.getElementById('artiling-clarity')?.remove();
    document.getElementById('artiling-ahrefs')?.remove();
    analyticsConfigured = false;
    window.setTimeout(() => window.location.reload(), 40);
    return true;
  };

  const saveConsent = (consent) => {
    const previousConsent = currentConsent;
    currentConsent = writeConsent(consent);
    updateGoogleConsent(currentConsent);
    if (stopLoadedAnalytics(previousConsent, currentConsent)) return;
    loadAnalytics(currentConsent);
    closePanel();
  };

  const openPreferences = () => {
    renderConsentUi({ mode: 'preferences' });
  };

  const injectFooterLink = () => {
    const footerLegal = document.querySelector('.footer__legal');
    if (!footerLegal || footerLegal.querySelector('[data-cookie-settings]')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'footer__cookie-settings';
    button.dataset.cookieSettings = 'true';
    button.textContent = 'Cookie settings';
    button.addEventListener('click', openPreferences);
    footerLegal.appendChild(button);
  };

  const renderConsentUi = ({ mode = 'banner' } = {}) => {
    closePanel();

    const isPreferences = mode === 'preferences';
    const shell = document.createElement('div');
    shell.className = `cookie-consent${isPreferences ? ' is-expanded' : ''}`;
    shell.dataset.cookieConsent = 'true';
    shell.setAttribute('role', isPreferences ? 'dialog' : 'region');
    shell.setAttribute('aria-live', 'polite');
    if (isPreferences) shell.setAttribute('aria-modal', 'true');

    shell.innerHTML = `
      <div class="cookie-consent__panel">
        <div class="cookie-consent__copy">
          <h2>Cookie preferences</h2>
          <p>${isPreferences ? 'Choose which optional cookies Artiling Studio can use for analytics, enquiry measurement and future marketing.' : 'Essential cookies keep the site working. Optional analytics and marketing help us measure enquiries.'}</p>
        </div>

        <div class="cookie-consent__prefs" ${isPreferences ? '' : 'hidden'}>
          <label class="cookie-consent__row">
            <span>
              <strong>Strictly necessary cookies</strong>
              <small>Required for core website and form functionality.</small>
            </span>
            <span class="cookie-consent__toggle">
              <input type="checkbox" checked disabled />
              <span class="cookie-consent__toggle-face" aria-hidden="true"></span>
            </span>
          </label>
          <label class="cookie-consent__row">
            <span>
              <strong>Analytics cookies</strong>
              <small>Help us understand site usage and measure enquiries.</small>
            </span>
            <span class="cookie-consent__toggle">
              <input type="checkbox" data-cookie-analytics ${currentConsent.analytics ? 'checked' : ''} />
              <span class="cookie-consent__toggle-face" aria-hidden="true"></span>
            </span>
          </label>
          <label class="cookie-consent__row">
            <span>
              <strong>Marketing cookies</strong>
              <small>Optional measurement for future advertising activity.</small>
            </span>
            <span class="cookie-consent__toggle">
              <input type="checkbox" data-cookie-marketing ${currentConsent.marketing ? 'checked' : ''} />
              <span class="cookie-consent__toggle-face" aria-hidden="true"></span>
            </span>
          </label>
        </div>

        <div class="cookie-consent__actions">
          ${isPreferences ? '<button type="button" class="btn btn--dark" data-cookie-save>Save preferences</button>' : ''}
          <button type="button" class="btn btn--dark" data-cookie-accept>Accept all</button>
          <button type="button" class="btn btn--ghost" data-cookie-reject>Reject optional</button>
          ${isPreferences ? '' : '<button type="button" class="btn btn--ghost" data-cookie-manage>Customise</button>'}
        </div>
      </div>
    `;

    shell.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
      saveConsent({ analytics: true, marketing: true });
    });

    shell.querySelector('[data-cookie-reject]')?.addEventListener('click', () => {
      saveConsent({ analytics: false, marketing: false });
    });

    shell.querySelector('[data-cookie-manage]')?.addEventListener('click', openPreferences);

    shell.querySelector('[data-cookie-save]')?.addEventListener('click', () => {
      saveConsent({
        analytics: !!shell.querySelector('[data-cookie-analytics]')?.checked,
        marketing: !!shell.querySelector('[data-cookie-marketing]')?.checked,
      });
    });

    document.body.appendChild(shell);
  };

  window.ArtilingConsent = {
    getConsent: () => ({ ...currentConsent }),
    hasAnalyticsConsent: () => !!currentConsent.analytics,
    openPreferences,
  };

  const init = () => {
    injectFooterLink();
    if (!currentConsent.decided) {
      const showBanner = () => renderConsentUi();
      if (window.matchMedia('(max-width: 640px)').matches) {
        window.requestAnimationFrame(() => window.setTimeout(showBanner, 800));
      } else {
        showBanner();
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
