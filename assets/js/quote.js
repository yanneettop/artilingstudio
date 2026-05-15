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

    // Web3Forms configuration
    formData.append('access_key', 'f0ae1e03-05a1-4ad8-8fb6-e5fad0fffce5');
    formData.append('subject', 'New Quote Request — Artiling Studio');
    formData.append('from_name', 'Artiling Studio Quote Form');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Network error');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send request →';
      // eslint-disable-next-line no-console
      console.error('Quote submission error:', err);
      alert('Sorry — something went wrong. Please email info@artilingstudio.co.uk directly.');
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
