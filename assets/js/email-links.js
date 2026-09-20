(() => {
  'use strict';

  const email = ['info', 'artilingstudio.co.uk'].join('@');

  document.querySelectorAll('[data-email-link]').forEach((link) => {
    const params = [];
    const subject = link.getAttribute('data-email-subject');
    const body = link.getAttribute('data-email-body');

    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body.replace(/\\n/g, '\n'))}`);

    link.href = `mailto:${email}${params.length ? `?${params.join('&')}` : ''}`;

    if (link.hasAttribute('data-email-display')) {
      link.textContent = email;
    }
  });
})();
