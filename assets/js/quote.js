(() => {
  'use strict';

  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  form.classList.add('quote-form--single');
  form.innerHTML = `
    <div class="quote-form__heading">
      <p class="eyebrow">Request a quote</p>
      <h2 class="quote-step__title">Tell us about your project.</h2>
      <p class="quote-step__sub">Share the essentials and we will come back with the next steps.</p>
    </div>

    <div class="quote-step is-active" data-step="1">
      <div class="quote-input-row quote-input-row--double">
        <label class="quote-input">
          <span class="quote-input__label">Name <span class="req">*</span></span>
          <input type="text" name="name" autocomplete="name" data-required="text" required />
        </label>
        <label class="quote-input">
          <span class="quote-input__label">Email <span class="req">*</span></span>
          <input type="email" name="email" autocomplete="email" data-required="text" required />
        </label>
      </div>

      <label class="quote-input">
        <span class="quote-input__label">Phone <span class="quote-optional">optional</span></span>
        <input type="tel" name="phone" autocomplete="tel" placeholder="+44..." />
      </label>

      <label class="quote-input">
        <span class="quote-input__label">Project type <span class="req">*</span></span>
        <select name="projectType" data-required="text" required>
          <option value="">Choose a service</option>
          <option value="Bespoke porcelain sink">Bespoke porcelain sink</option>
          <option value="Large-format porcelain tiling">Large-format porcelain tiling</option>
          <option value="Wet room and bathroom tiling">Wet room and bathroom tiling</option>
          <option value="Porcelain fabrication">Porcelain fabrication</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>

      <div class="quote-input-row quote-input-row--double">
        <label class="quote-input">
          <span class="quote-input__label">Location <span class="quote-optional">optional</span></span>
          <input type="text" name="location" autocomplete="address-level2" placeholder="e.g. Notting Hill, London" />
        </label>
        <label class="quote-input">
          <span class="quote-input__label">Dimensions <span class="quote-optional">optional</span></span>
          <input type="text" name="dimensions" placeholder="e.g. 1200 x 450mm or 18m2" />
        </label>
      </div>

      <label class="quote-input quote-input--full">
        <span class="quote-input__label">Brief description <span class="req">*</span></span>
        <textarea name="projectMessage" rows="6" data-required="text" required placeholder="Tell us what you are planning, where the piece or tiling will go, and anything already decided."></textarea>
        <span class="quote-input__hint">Photos, sketches and rough measurements are welcome.</span>
      </label>

      <label class="quote-drop" data-drop-zone>
        <input type="file" name="photos" multiple accept="image/*" data-file-input hidden />
        <span class="quote-drop__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </span>
        <span class="quote-drop__text">
          <span class="quote-drop__primary">Upload photos or drawings</span>
          <span class="quote-drop__secondary">Optional. JPG, PNG, WebP or HEIC up to 10MB each</span>
        </span>
      </label>

      <ul class="quote-previews" data-file-previews aria-live="polite"></ul>

      <label class="quote-consent">
        <input type="checkbox" name="consent" data-required="checkbox" required />
        <span class="quote-consent__face" aria-hidden="true"></span>
        <span class="quote-consent__text">
          I agree to be contacted about this enquiry and understand my details
          will be handled in line with the
          <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">Artiling Studio Privacy Policy</a>.
        </span>
      </label>

      <div
        class="cf-turnstile"
        data-turnstile-widget
        data-sitekey="0x4AAAAAADQE2tP_lox31aIG"
        data-callback="onQuoteTurnstileSuccess"
        data-expired-callback="onQuoteTurnstileExpired"
        data-error-callback="onQuoteTurnstileError"
      ></div>
    </div>

    <div class="quote-form__nav">
      <p class="quote-reassurance">We will review your project carefully and reply with next steps.</p>
      <button type="submit" class="btn btn--dark" data-submit>Request my quote <span aria-hidden="true">-&gt;</span></button>
    </div>
  `;

  const turnstileWidget = form.querySelector('[data-turnstile-widget]');
  const submitBtn = form.querySelector('[data-submit]');
  const fileInput = form.querySelector('[data-file-input]');
  const dropZone = form.querySelector('[data-drop-zone]');
  const previewsList = form.querySelector('[data-file-previews]');
  let uploadedFiles = [];

  const getProjectType = () => form.querySelector('[name="projectType"]')?.value || '';

  const quoteContext = () => ({
    project_type: getProjectType(),
    project_message: form.querySelector('[name="projectMessage"]')?.value.trim() || '',
    location: form.querySelector('[name="location"]')?.value.trim() || '',
    dimensions: form.querySelector('[name="dimensions"]')?.value.trim() || '',
    page_path: '/quote/',
  });

  const serviceTypeFor = (projectType) => {
    const normalized = String(projectType || '').toLowerCase();
    if (normalized.includes('sink')) return 'bespoke_porcelain_sinks';
    if (normalized.includes('large-format') || normalized.includes('large format')) return 'large_format_tiling';
    if (normalized.includes('wet room') || normalized.includes('bathroom')) return 'wet_rooms_bathroom_tiling';
    if (normalized.includes('fabrication')) return 'porcelain_fabrication';
    return undefined;
  };

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

  const validateForm = () => {
    const required = form.querySelectorAll('[data-required]');
    let valid = true;
    let firstInvalid = null;

    required.forEach((el) => {
      const type = el.dataset.required;
      let isValid = true;

      if (type === 'text') {
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
      try { firstInvalid.focus({ preventScroll: true }); } catch (error) { /* noop */ }
      const rect = firstInvalid.getBoundingClientRect?.();
      if (rect) {
        window.scrollTo({ top: rect.top + window.scrollY - 130, behavior: 'smooth' });
      }
    }

    return valid;
  };

  form.addEventListener('input', (event) => {
    if (event.target.matches('[data-required]')) {
      event.target.classList.remove('has-error');
    }
  });

  form.addEventListener('change', (event) => {
    if (event.target.matches('[data-required]')) {
      event.target.classList.remove('has-error');
    }
  });

  const maxFiles = 6;
  const maxFileSize = 10 * 1024 * 1024;
  const allowedImageTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ]);

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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
        <button type="button" class="quote-preview__remove" data-remove-index="${index}" aria-label="Remove ${escapeHtml(file.name)}">x</button>
      `;
      previewsList.appendChild(item);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = item.querySelector('img');
        if (img) img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const addFiles = (files) => {
    const rejected = [];

    files.forEach((file) => {
      const message = fileValidationMessage(file);
      if (message) {
        rejected.push(message);
        return;
      }
      if (uploadedFiles.length >= maxFiles) {
        rejected.push(`Only ${maxFiles} photos can be uploaded.`);
        return;
      }
      uploadedFiles.push(file);
    });

    renderPreviews();
    if (rejected.length) alert(rejected.join('\n'));
  };

  fileInput?.addEventListener('change', (event) => {
    addFiles(Array.from(event.target.files || []));
    fileInput.value = '';
  });

  if (dropZone) {
    dropZone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropZone.classList.add('is-dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('is-dragover');
    });

    dropZone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropZone.classList.remove('is-dragover');
      addFiles(Array.from(event.dataTransfer.files || []));
    });
  }

  previewsList?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-remove-index]');
    if (!btn) return;
    uploadedFiles.splice(Number(btn.dataset.removeIndex), 1);
    renderPreviews();
  });

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

  const validationResponseCodes = new Set([
    'VALIDATION_ERROR',
    'FILE_VALIDATION_ERROR',
    'TURNSTILE_REQUIRED',
    'TURNSTILE_FAILED',
  ]);

  const submissionFailureMessage =
    'We could not send your request right now. Please try again or email info@artilingstudio.co.uk directly.';

  const responseError = async (response) => {
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      // Non-JSON responses are treated as backend failures, never as field validation.
    }

    if (response.ok && payload?.ok) return null;

    const code = typeof payload?.code === 'string' ? payload.code : '';
    const isValidationError = validationResponseCodes.has(code)
      || (!code && response.status >= 400 && response.status < 500);
    const message = isValidationError
      ? (payload?.message || 'Please review the highlighted fields and try again.')
      : submissionFailureMessage;
    const error = new Error(message);
    error.category = isValidationError ? 'validation' : 'server';
    error.code = code || (isValidationError ? 'VALIDATION_ERROR' : 'SUBMISSION_FAILED');
    error.status = response.status;
    return error;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(form);
    formData.delete('photos');

    const turnstileToken = getTurnstileToken();
    if (!window.turnstile || !turnstileToken) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request my quote ->';
      alert('Please complete the quick spam check before sending your request.');
      return;
    }

    formData.set('cf-turnstile-response', turnstileToken);
    uploadedFiles.forEach((file) => formData.append('photos', file, file.name));

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const error = await responseError(res);
      if (error) throw error;
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request my quote ->';
      if (window.turnstile && turnstileWidget) {
        window.turnstile.reset();
        turnstileWidget.dataset.token = '';
      }
      console.error('Quote submission error:', error);
      alert(error.category === 'validation' ? error.message : submissionFailureMessage);
      return;
    }

    const context = quoteContext();
    storeQuoteContext(context);

    window.ArtilingTracking?.fireEvent?.('quote_form_submit', {
      form_name: 'request_quote',
      page_path: window.location.pathname || context.page_path,
      service_type: serviceTypeFor(context.project_type),
      project_type: context.project_type,
      project_message_provided: context.project_message ? 'yes' : 'no',
      location_provided: context.location ? 'yes' : 'no',
      dimensions_provided: context.dimensions ? 'yes' : 'no',
      transport_type: 'beacon',
    });

    window.location.assign('/thank-you/');
  });
})();
