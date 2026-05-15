/* ═══════════════════════════════════════════════════════════════════
   ARTILING STUDIO — Quote form
   Multi-step wizard with conditional fields, file previews and
   restrained transitions matching the studio aesthetic.
   ═══════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  const wrapper = document.querySelector('[data-quote-form-wrapper]');
  const success = document.querySelector('[data-success]');
  const steps = Array.from(form.querySelectorAll('.quote-step'));
  const totalSteps = steps.length;

  const prevBtn = form.querySelector('[data-prev]');
  const nextBtn = form.querySelector('[data-next]');
  const submitBtn = form.querySelector('[data-submit]');
  const progressFill = form.querySelector('[data-progress-fill]');
  const stepIndicators = Array.from(form.querySelectorAll('[data-step-indicator]'));
  const stepCurrentEl = form.querySelector('[data-step-current]');
  const stepNameEl = form.querySelector('[data-step-name]');

  const stepNames = [
    'Project Type',
    'Material Situation',
    'Requirements',
    'Photos',
    'Timeline & Location',
    'Budget & Contact',
  ];

  let currentStep = 1;

  const getCheckedValue = (name) => {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };

  const quoteContext = () => ({
    project_type: getCheckedValue('projectType'),
    material_situation: getCheckedValue('materialSituation'),
    scope: getCheckedValue('scope'),
    timeline: getCheckedValue('timeline'),
    budget_range: getCheckedValue('budget'),
    page_path: '/quote/',
  });

  const storeQuoteContext = (context) => {
    try {
      window.sessionStorage.setItem(
        window.ArtilingTracking?.contextKey || 'artiling_quote_context',
        JSON.stringify(context)
      );
    } catch (error) {
      // Storage can fail in private browsing; submissions should still complete.
    }
  };

  /* ──────────────────────────────────────────────
     Step navigation
  ─────────────────────────────────────────────── */
  const goToStep = (n, { focus = true } = {}) => {
    if (n < 1 || n > totalSteps) return;
    currentStep = n;

    steps.forEach((step) => {
      const isActive = Number(step.dataset.step) === n;
      step.classList.toggle('is-active', isActive);
      step.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    updateProgress();
    updateNav();

    if (focus) {
      const top = form.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const updateProgress = () => {
    const ratio = (currentStep - 1) / (totalSteps - 1);
    if (progressFill) progressFill.style.transform = `scaleX(${ratio})`;

    stepIndicators.forEach((el) => {
      const n = Number(el.dataset.stepIndicator);
      el.classList.toggle('is-active', n === currentStep);
      el.classList.toggle('is-done', n < currentStep);
    });

    if (stepCurrentEl) stepCurrentEl.textContent = String(currentStep).padStart(2, '0');
    if (stepNameEl) stepNameEl.textContent = stepNames[currentStep - 1];
  };

  const updateNav = () => {
    prevBtn.hidden = currentStep === 1;
    nextBtn.hidden = currentStep === totalSteps;
    submitBtn.hidden = currentStep !== totalSteps;
  };

  /* ──────────────────────────────────────────────
     Validation
  ─────────────────────────────────────────────── */
  const validateStep = (n) => {
    const stepEl = steps[n - 1];
    const required = stepEl.querySelectorAll('[data-required]');
    let valid = true;
    let firstInvalid = null;

    required.forEach((el) => {
      const type = el.dataset.required;
      let isValid = true;

      if (type === 'radio-group') {
        const name = el.dataset.name;
        const checked = stepEl.querySelector(`input[name="${name}"]:checked`);
        isValid = !!checked;
      } else if (type === 'text') {
        if (el.type === 'email') {
          isValid = el.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        } else {
          isValid = el.value.trim() !== '';
        }
      } else if (type === 'checkbox') {
        isValid = el.checked;
      }

      el.classList.toggle('has-error', !isValid);
      if (!isValid) {
        valid = false;
        if (!firstInvalid) firstInvalid = el;
      }
    });

    if (firstInvalid) {
      const target = firstInvalid.tagName === 'DIV'
        ? firstInvalid.querySelector('input')
        : firstInvalid;
      if (target) {
        try { target.focus({ preventScroll: false }); } catch (e) { /* noop */ }
      }
      const rect = (firstInvalid.getBoundingClientRect && firstInvalid.getBoundingClientRect());
      if (rect) {
        const top = rect.top + window.scrollY - 120;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }

    return valid;
  };

  /* ──────────────────────────────────────────────
     Clear error on change
  ─────────────────────────────────────────────── */
  form.addEventListener('change', (e) => {
    const target = e.target;
    if (target.matches('input[type="radio"]')) {
      const name = target.name;
      const wrap = form.querySelector(`[data-required="radio-group"][data-name="${name}"]`);
      if (wrap) wrap.classList.remove('has-error');
    } else if (target.matches('input, textarea, select')) {
      target.classList.remove('has-error');
    }
  });

  form.addEventListener('input', (e) => {
    if (e.target.matches('[data-required="text"]')) {
      e.target.classList.remove('has-error');
    }
  });

  /* ──────────────────────────────────────────────
     Conditional sink fields
  ─────────────────────────────────────────────── */
  const sinkFields = form.querySelector('[data-sink-fields]');
  const projectInputs = form.querySelectorAll('input[name="projectType"]');

  const updateSinkFields = () => {
    const checked = form.querySelector('input[name="projectType"]:checked');
    const isSink = checked && checked.value === 'Bespoke porcelain sink';
    if (sinkFields) {
      sinkFields.hidden = !isSink;
      sinkFields.classList.toggle('is-visible', isSink);
    }
  };

  projectInputs.forEach((input) => input.addEventListener('change', updateSinkFields));

  /* ──────────────────────────────────────────────
     File uploads with previews
  ─────────────────────────────────────────────── */
  const fileInput = form.querySelector('[data-file-input]');
  const dropZone = form.querySelector('[data-drop-zone]');
  const previewsList = form.querySelector('[data-file-previews]');
  const turnstileWidget = form.querySelector('[data-turnstile-widget]');
  let uploadedFiles = [];

  const maxFiles = 6;
  const maxFileSize = 10 * 1024 * 1024;
  const allowedImageTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ]);

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const renderPreviews = () => {
    if (!previewsList) return;
    previewsList.innerHTML = '';

    uploadedFiles.forEach((file, index) => {
      const item = document.createElement('li');
      item.className = 'quote-preview';
      item.innerHTML = `
        <span class="quote-preview__thumb"><img alt="" /></span>
        <span class="quote-preview__meta">
          <span class="quote-preview__name">${escapeHtml(file.name)}</span>
          <span class="quote-preview__size">${formatBytes(file.size)}</span>
        </span>
        <button type="button" class="quote-preview__remove" data-remove-index="${index}" aria-label="Remove ${escapeHtml(file.name)}">×</button>
      `;
      previewsList.appendChild(item);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = item.querySelector('img');
        if (img) img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const isAllowedImage = (file) => {
    const type = (file.type || '').toLowerCase();
    const name = (file.name || '').toLowerCase();
    return allowedImageTypes.has(type) || (!type && /\.(heic|heif)$/.test(name));
  };

  const fileValidationMessage = (file) => {
    if (!isAllowedImage(file)) {
      return `${file.name} is not a supported image type. Please use JPG, PNG, WebP or HEIC.`;
    }
    if (file.size > maxFileSize) {
      return `${file.name} is larger than 10MB. Please choose a smaller image.`;
    }
    return '';
  };

  const addFiles = (files) => {
    const accepted = [];
    const rejected = [];

    files.forEach((file) => {
      const message = fileValidationMessage(file);
      if (message) {
        rejected.push(message);
        return;
      }
      if (uploadedFiles.length + accepted.length >= maxFiles) {
        rejected.push(`Only ${maxFiles} photos can be uploaded.`);
        return;
      }
      accepted.push(file);
    });

    uploadedFiles = uploadedFiles.concat(accepted);
    renderPreviews();

    if (rejected.length) {
      alert(rejected.join('\n'));
    }
  };

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      addFiles(Array.from(e.target.files));
      // Reset native input so the same file can be re-selected
      fileInput.value = '';
    });
  }

  if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('is-dragover');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('is-dragover');
    });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('is-dragover');
      const files = Array.from(e.dataTransfer.files || []);
      addFiles(files);
    });
  }

  if (previewsList) {
    previewsList.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-index]');
      if (!btn) return;
      const idx = Number(btn.dataset.removeIndex);
      uploadedFiles.splice(idx, 1);
      renderPreviews();
    });
  }

  /* ──────────────────────────────────────────────
     Cloudflare Turnstile
  ─────────────────────────────────────────────── */
  window.onQuoteTurnstileSuccess = (token) => {
    if (turnstileWidget) turnstileWidget.dataset.token = token || '';
  };

  window.onQuoteTurnstileExpired = () => {
    if (turnstileWidget) turnstileWidget.dataset.token = '';
  };

  window.onQuoteTurnstileError = () => {
    if (turnstileWidget) turnstileWidget.dataset.token = '';
  };

  const getTurnstileToken = () => {
    const field = form.querySelector('input[name="cf-turnstile-response"], textarea[name="cf-turnstile-response"]');
    return field?.value || turnstileWidget?.dataset.token || '';
  };

  /* ──────────────────────────────────────────────
     Step buttons
  ─────────────────────────────────────────────── */
  prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
  nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) goToStep(currentStep + 1);
  });

  /* ──────────────────────────────────────────────
     Submission
  ─────────────────────────────────────────────── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const formData = new FormData(form);
    formData.delete('photos');

    const turnstileToken = getTurnstileToken();
    if (!window.turnstile || !turnstileToken) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send request →';
      alert('Please complete the quick spam check before sending your request.');
      return;
    }

    formData.set('cf-turnstile-response', turnstileToken);

    // Attach uploaded photos
    uploadedFiles.forEach((file) => {
      formData.append('photos', file, file.name);
    });

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.message || 'Network error');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send request →';
      if (window.turnstile && turnstileWidget) {
        window.turnstile.reset();
        turnstileWidget.dataset.token = '';
      }
      // eslint-disable-next-line no-console
      console.error('Quote submission error:', err);
      alert(err.message || 'Sorry — something went wrong. Please email info@artilingstudio.co.uk directly.');
      return;
    }

    const context = quoteContext();
    storeQuoteContext(context);
    window.ArtilingTracking?.fireEvent?.('quote_form_submit', {
      form_type: 'quote_form',
      project_type: context.project_type,
      material_situation: context.material_situation,
      scope: context.scope,
      timeline: context.timeline,
      budget_range: context.budget_range,
      page_path: '/quote/',
    });
    window.location.assign('/thank-you/');
  });

  /* ──────────────────────────────────────────────
     Init
  ─────────────────────────────────────────────── */
  goToStep(1, { focus: false });
})();
