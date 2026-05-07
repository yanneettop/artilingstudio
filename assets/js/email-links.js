(() => {
  'use strict';

  const email = ['info', 'artilingstudio.co.uk'].join('@');

  document.querySelectorAll('[data-email-link]').forEach((link) => {
    link.href = `mailto:${email}`;
    if (link.hasAttribute('data-email-display')) {
      link.textContent = email;
    }
  });
})();
