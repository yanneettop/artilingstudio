(() => {
  'use strict';

  const gallery = document.querySelector('[data-sinks-gallery]');
  if (gallery) {
    const items = [...gallery.querySelectorAll('.sinks-gallery-grid__item')]
      .map((figure) => {
        const trigger = figure.querySelector('[data-sinks-lightbox]');
        const image = trigger?.querySelector('img');
        const caption = figure.querySelector('figcaption');
        if (!trigger || !image) return null;
        return {
          trigger,
          src: image.currentSrc || image.src,
          alt: image.alt,
          caption: caption?.textContent.replace(/^\s*\d+\s*/, '').trim() || image.alt,
          kind: figure.dataset.galleryKind || 'Artiling Studio project',
        };
      })
      .filter(Boolean);

    if (items.length) {
      const lightbox = document.createElement('aside');
      lightbox.className = 'portfolio-lightbox portfolio-lightbox--sinks';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.setAttribute('aria-labelledby', 'sinks-lightbox-title');
      lightbox.innerHTML = `
        <div class="portfolio-lightbox__backdrop" data-sinks-lightbox-close></div>
        <div class="portfolio-lightbox__dialog" role="document">
          <header class="portfolio-lightbox__header">
            <div>
              <p class="portfolio-lightbox__kicker" data-sinks-lightbox-kind></p>
              <h2 id="sinks-lightbox-title" data-sinks-lightbox-title></h2>
            </div>
            <button class="portfolio-lightbox__close" type="button" data-sinks-lightbox-close aria-label="Close image gallery">Close</button>
          </header>
          <div class="portfolio-lightbox__stage">
            <button class="portfolio-lightbox__arrow portfolio-lightbox__arrow--prev" type="button" data-sinks-lightbox-prev aria-label="Previous image">Previous</button>
            <figure class="portfolio-lightbox__figure">
              <img alt="" data-sinks-lightbox-image />
            </figure>
            <button class="portfolio-lightbox__arrow portfolio-lightbox__arrow--next" type="button" data-sinks-lightbox-next aria-label="Next image">Next</button>
          </div>
          <footer class="portfolio-lightbox__footer">
            <span class="portfolio-lightbox__counter" data-sinks-lightbox-counter aria-live="polite"></span>
            <div class="portfolio-lightbox__thumbs" data-sinks-lightbox-thumbs aria-label="Choose gallery image"></div>
          </footer>
        </div>
      `;
      document.body.appendChild(lightbox);

      const imageEl = lightbox.querySelector('[data-sinks-lightbox-image]');
      const figureEl = lightbox.querySelector('.portfolio-lightbox__figure');
      const titleEl = lightbox.querySelector('[data-sinks-lightbox-title]');
      const kindEl = lightbox.querySelector('[data-sinks-lightbox-kind]');
      const counterEl = lightbox.querySelector('[data-sinks-lightbox-counter]');
      const thumbsEl = lightbox.querySelector('[data-sinks-lightbox-thumbs]');
      const closeButton = lightbox.querySelector('.portfolio-lightbox__close');
      const stageEl = lightbox.querySelector('.portfolio-lightbox__stage');
      const focusableSelector = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
      let activeIndex = 0;
      let activeTrigger = null;
      let savedScrollY = 0;
      let touchStartX = 0;
      let touchStartY = 0;
      let bodyStyles = null;

      thumbsEl.innerHTML = items
        .map((item, index) => `
          <button class="portfolio-lightbox__thumb" type="button" data-sinks-lightbox-index="${index}" aria-label="Show image ${index + 1}: ${item.alt.replace(/"/g, '&quot;')}">
            <img src="${item.src}" alt="" loading="lazy" decoding="async" />
          </button>
        `)
        .join('');

      const lockBody = () => {
        savedScrollY = window.scrollY;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        bodyStyles = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          right: document.body.style.right,
          width: document.body.style.width,
          overflow: document.body.style.overflow,
          paddingRight: document.body.style.paddingRight,
        };
        document.body.classList.add('is-lightbox-open');
        document.body.style.top = `-${savedScrollY}px`;
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      };

      const unlockBody = () => {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        document.body.classList.remove('is-lightbox-open');
        Object.entries(bodyStyles || {}).forEach(([property, value]) => {
          document.body.style[property] = value || '';
        });
        document.documentElement.offsetHeight;
        window.scrollTo({ top: savedScrollY, left: 0, behavior: 'auto' });
        root.style.scrollBehavior = previousScrollBehavior;
        bodyStyles = null;
      };

      const setImage = (index) => {
        activeIndex = (index + items.length) % items.length;
        const item = items[activeIndex];
        imageEl.classList.remove('is-loaded');
        imageEl.removeAttribute('src');
        imageEl.alt = item.alt;
        titleEl.textContent = item.caption;
        kindEl.textContent = item.kind;
        counterEl.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
        figureEl.scrollTop = 0;
        thumbsEl.querySelectorAll('button').forEach((button, indexValue) => {
          const isActive = indexValue === activeIndex;
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-current', isActive ? 'true' : 'false');
          if (isActive) button.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
        });
        requestAnimationFrame(() => {
          imageEl.src = item.src;
          if (imageEl.complete) imageEl.classList.add('is-loaded');
        });
      };

      const open = (index, trigger) => {
        if (lightbox.classList.contains('is-open')) return;
        activeTrigger = trigger;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        lockBody();
        setImage(index);
        window.setTimeout(() => closeButton.focus({ preventScroll: true }), 40);
      };

      const close = () => {
        if (!lightbox.classList.contains('is-open')) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        imageEl.removeAttribute('src');
        unlockBody();
        activeTrigger?.focus({ preventScroll: true });
        activeTrigger = null;
      };

      items.forEach((item, index) => {
        item.trigger.addEventListener('click', () => open(index, item.trigger));
      });
      imageEl.addEventListener('load', () => imageEl.classList.add('is-loaded'));
      lightbox.addEventListener('click', (event) => {
        if (event.target.closest('[data-sinks-lightbox-close]')) {
          close();
          return;
        }
        const thumb = event.target.closest('[data-sinks-lightbox-index]');
        if (thumb) setImage(Number(thumb.dataset.sinksLightboxIndex));
      });
      lightbox.querySelector('[data-sinks-lightbox-prev]').addEventListener('click', () => setImage(activeIndex - 1));
      lightbox.querySelector('[data-sinks-lightbox-next]').addEventListener('click', () => setImage(activeIndex + 1));
      stageEl.addEventListener('touchstart', (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }, { passive: true });
      stageEl.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
        setImage(deltaX > 0 ? activeIndex - 1 : activeIndex + 1);
      }, { passive: true });

      document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
          return;
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          setImage(event.key === 'ArrowLeft' ? activeIndex - 1 : activeIndex + 1);
          return;
        }
        if (event.key !== 'Tab') return;
        const focusable = [...lightbox.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
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
      });
    }
  }

  const faq = document.querySelector('[data-sinks-faq]');
  if (faq) {
    const items = [...faq.querySelectorAll('.service-faq__item')];
    const buttons = items.map((item, index) => {
      const heading = item.querySelector('h3');
      const answer = item.querySelector('p');
      if (!heading || !answer) return null;
      const questionText = heading.textContent.trim();
      const questionId = `sink-faq-question-${index + 1}`;
      const answerId = `sink-faq-answer-${index + 1}`;
      const button = document.createElement('button');
      button.className = 'service-faq__question';
      button.type = 'button';
      button.id = questionId;
      button.setAttribute('aria-controls', answerId);
      button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
      button.innerHTML = `<span>${questionText}</span><span class="service-faq__icon" aria-hidden="true"></span>`;
      heading.textContent = '';
      heading.appendChild(button);
      answer.classList.add('service-faq__answer');
      answer.id = answerId;
      answer.setAttribute('role', 'region');
      answer.setAttribute('aria-labelledby', questionId);
      answer.hidden = index !== 0;
      return button;
    }).filter(Boolean);

    const setExpanded = (button, expanded) => {
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (answer) answer.hidden = !expanded;
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
        buttons.forEach((other) => setExpanded(other, other === button && shouldOpen));
      });
      button.addEventListener('keydown', (event) => {
        let targetIndex = null;
        if (event.key === 'ArrowDown') targetIndex = (index + 1) % buttons.length;
        if (event.key === 'ArrowUp') targetIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') targetIndex = 0;
        if (event.key === 'End') targetIndex = buttons.length - 1;
        if (targetIndex === null) return;
        event.preventDefault();
        buttons[targetIndex].focus();
      });
    });
  }
})();
