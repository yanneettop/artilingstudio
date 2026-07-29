import { materials, type Material } from "../data/materials";

const filters = [["All", "all"], ["Best for Sinks", "best-for-sinks"], ["Marble & Onyx", "marble-onyx"], ["Stone Effect", "stone-effect"], ["Decorative", "decorative"], ["Outdoor", "outdoor"]] as const;

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
const renderTags = (items: string[], limit = 3) => items.slice(0, limit).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
const staticAssetUrl = (path: string) => path.startsWith("/images/") ? `/public${path}` : path;

const renderCard = (material: Material, index: number) => {
  const gallery = material.inspirationImages ?? [];
  const materialImageUrl = staticAssetUrl(material.image);
  const galleryAttributes = gallery.length ? ` role="button" tabindex="0" data-tile-style-gallery="${material.slug}" aria-label="Open ${escapeHtml(material.title)} image gallery"` : "";
  const hoverImage = gallery[0] ? `<img class="tile-style-card__hover-image" src="${staticAssetUrl(gallery[0].src)}" alt="" loading="lazy" decoding="async" aria-hidden="true" />` : "";
  const materialImage = material.image ? `<img src="${materialImageUrl}" alt="${escapeHtml(material.imageAlt)}" loading="lazy" decoding="async" />` : "";
  const badge = material.badge ? `<p class="tile-style-card__sink-label tile-style-card__sink-label--${material.sinkSuitability}">${escapeHtml(material.badge)}</p>` : `<p class="tile-style-card__sink-label tile-style-card__sink-label--${material.sinkSuitability}">${escapeHtml(material.sinkSuitabilityLabel)}</p>`;
  return `<article class="tile-style-card tile-style-card--${material.slug}" id="${material.slug}" data-tile-style-card data-filter-groups="${material.filterGroups.join(" ")}" data-sink-suitability="${material.sinkSuitability}" data-reveal data-reveal-delay="${(index % 2) * 70}"><figure class="tile-style-card__sample"><div class="tile-style-card__media" data-image-path="${materialImageUrl}"${galleryAttributes}>${materialImage}${hoverImage}${gallery.length ? '<span class="tile-style-card__gallery-hint">View images <span aria-hidden="true">↗</span></span>' : ""}</div><figcaption>${material.colours.map(escapeHtml).join(" / ")}</figcaption></figure><div class="tile-style-card__body"><p class="tile-style-card__category">${escapeHtml(material.categoryLabel)}</p><h3>${escapeHtml(material.title)}</h3><p class="tile-style-card__use">${escapeHtml(material.subtitle)}</p>${badge}<p>${escapeHtml(material.description)}</p><div class="tile-style-card__details"><div class="tile-style-card__group"><span>Best for</span><ul>${renderTags(material.applications)}</ul></div><div class="tile-style-card__group tile-style-card__group--finishes"><span>Finishes</span><ul>${renderTags(material.finishes, 2)}</ul></div></div><a href="/quote/?style=${encodeURIComponent(material.slug)}" class="text-link">Ask about this look <span aria-hidden="true">-&gt;</span></a></div></article>`;
};

const grid = document.querySelector<HTMLElement>("[data-tile-style-grid]");
if (grid) {
  const filtersMount = document.querySelector<HTMLElement>("[data-tile-style-filters]");
  const resultCount = document.querySelector<HTMLElement>("[data-tile-style-count]");
  const cards = materials;
  if (filtersMount) filtersMount.innerHTML = filters.map(([label, value], index) => `<button class="tile-style-filter${index === 0 ? " is-active" : ""}" type="button" data-tile-style-filter="${value}" aria-pressed="${index === 0}">${label}</button>`).join("");
  grid.innerHTML = cards.map(renderCard).join("");

  const setFilter = (filterValue: string) => {
    let visibleCount = 0;
    grid.querySelectorAll<HTMLElement>("[data-tile-style-card]").forEach((card) => { const visible = filterValue === "all" || (card.dataset.filterGroups ?? "").split(" ").includes(filterValue); card.hidden = !visible; card.classList.toggle("is-filtered-out", !visible); if (visible) visibleCount += 1; });
    if (resultCount) resultCount.textContent = `${visibleCount} style${visibleCount === 1 ? "" : "s"}`;
    document.querySelectorAll<HTMLButtonElement>("[data-tile-style-filter]").forEach((button) => { const active = button.dataset.tileStyleFilter === filterValue; button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active)); });
  };
  setFilter("all");
  document.addEventListener("click", (event) => { const target = event.target as HTMLElement; const control = target.closest<HTMLElement>("[data-tile-style-filter], [data-tile-style-filter-trigger]"); if (!control) return; setFilter(control.dataset.tileStyleFilter ?? control.dataset.tileStyleFilterTrigger ?? "all"); if (control.dataset.tileStyleFilterTrigger) document.querySelector<HTMLElement>(".tile-style-filter-bar")?.scrollIntoView({ behavior: "smooth", block: "start" }); });

  const gallery = document.createElement("div");
  gallery.className = "tile-style-gallery";
  gallery.setAttribute("aria-hidden", "true");
  gallery.innerHTML = `<div class="tile-style-gallery__backdrop" data-tile-style-gallery-close></div><div class="tile-style-gallery__dialog" role="dialog" aria-modal="true" aria-labelledby="tile-style-gallery-title" aria-describedby="tile-style-gallery-description" tabindex="-1"><div class="tile-style-gallery__topbar"><button class="tile-style-gallery__close" type="button" aria-label="Close material image gallery" data-tile-style-gallery-close><span aria-hidden="true"></span></button></div><div class="tile-style-gallery__content"><p class="eyebrow">Inspiration</p><h2 id="tile-style-gallery-title"></h2><div class="tile-style-gallery__grid"></div><div class="tile-style-gallery__info"><p class="tile-style-gallery__description" id="tile-style-gallery-description"></p><dl class="tile-style-gallery__facts"><div><dt>Colour family</dt><dd data-material-colours></dd></div><div><dt>Applications</dt><dd data-material-applications></dd></div><div><dt>Finishes</dt><dd data-material-finishes></dd></div></dl><p class="tile-style-gallery__badge" data-material-badge hidden></p><div class="tile-style-gallery__actions"><a class="btn btn--dark" data-material-cta href="/quote/">Ask about this material</a></div><div class="tile-style-gallery__related" data-material-related hidden><span>Similar materials</span><div data-material-related-list></div></div></div></div></div>`;
  document.body.appendChild(gallery);
  const zoom = document.createElement("div");
  zoom.className = "tile-style-gallery-zoom";
  zoom.setAttribute("aria-hidden", "true");
  zoom.innerHTML = `<div class="tile-style-gallery-zoom__backdrop" data-tile-style-gallery-zoom-close></div><div class="tile-style-gallery-zoom__stage" role="dialog" aria-modal="true" aria-label="Fullscreen material image"><button class="tile-style-gallery-zoom__close" type="button" aria-label="Close fullscreen material image" data-tile-style-gallery-zoom-close><span aria-hidden="true"></span></button><img src="" alt="" /></div>`;
  document.body.appendChild(zoom);
  const zoomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches ? document.createElement("div") : null;
  if (zoomCursor) { zoomCursor.className = "view-cursor view-cursor--zoom"; zoomCursor.textContent = "Zoom"; document.body.appendChild(zoomCursor); }
  const zoomImage = zoom.querySelector<HTMLImageElement>("img");
  let lastZoomTrigger: HTMLElement | null = null;
  const closeZoom = () => { zoom.classList.remove("is-open"); zoom.setAttribute("aria-hidden", "true"); if (dialog) dialog.inert = false; if (zoomImage) { zoomImage.removeAttribute("src"); zoomImage.alt = ""; } lastZoomTrigger?.focus({ preventScroll: true }); };
  const openZoom = (trigger: HTMLElement) => {
    if (!zoomImage) return;
    zoomCursor?.classList.remove("is-visible");
    lastZoomTrigger = trigger;
    zoomImage.src = trigger.dataset.imageSrc ?? "";
    zoomImage.alt = trigger.dataset.imageAlt ?? "";
    zoom.classList.add("is-open");
    zoom.setAttribute("aria-hidden", "false");
    if (dialog) dialog.inert = true;
    window.setTimeout(() => zoom.querySelector<HTMLButtonElement>(".tile-style-gallery-zoom__close")?.focus({ preventScroll: true }), 50);
  };
  const dialog = gallery.querySelector<HTMLElement>(".tile-style-gallery__dialog");
  const galleryTitle = gallery.querySelector<HTMLElement>("#tile-style-gallery-title");
  const galleryGrid = gallery.querySelector<HTMLElement>(".tile-style-gallery__grid");
  const description = gallery.querySelector<HTMLElement>(".tile-style-gallery__description");
  const colours = gallery.querySelector<HTMLElement>("[data-material-colours]");
  const applications = gallery.querySelector<HTMLElement>("[data-material-applications]");
  const finishes = gallery.querySelector<HTMLElement>("[data-material-finishes]");
  const badge = gallery.querySelector<HTMLElement>("[data-material-badge]");
  const cta = gallery.querySelector<HTMLAnchorElement>("[data-material-cta]");
  const related = gallery.querySelector<HTMLElement>("[data-material-related]");
  const relatedList = gallery.querySelector<HTMLElement>("[data-material-related-list]");
  let lastTrigger: HTMLElement | null = null;
  let savedPageScrollY: number | null = null;
  let previousRootScrollBehavior = "";
  let previousBodyStyles: Partial<Record<"position" | "top" | "left" | "right" | "width" | "overflow" | "paddingRight", string>> = {};
  const focusableSelector = "button:not([disabled]), a[href], [tabindex]:not([tabindex=\"-1\"])";

  const lockPageScroll = () => {
    if (savedPageScrollY !== null) return;
    savedPageScrollY = window.scrollY;
    previousRootScrollBehavior = document.documentElement.style.scrollBehavior;
    previousBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    document.body.classList.add("is-tile-style-gallery-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedPageScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
  };

  const unlockPageScroll = () => {
    if (savedPageScrollY === null) return;
    const restoreScrollY = savedPageScrollY;
    document.documentElement.style.scrollBehavior = "auto";
    document.body.classList.remove("is-tile-style-gallery-open");
    document.body.style.position = previousBodyStyles.position ?? "";
    document.body.style.top = previousBodyStyles.top ?? "";
    document.body.style.left = previousBodyStyles.left ?? "";
    document.body.style.right = previousBodyStyles.right ?? "";
    document.body.style.width = previousBodyStyles.width ?? "";
    document.body.style.overflow = previousBodyStyles.overflow ?? "";
    document.body.style.paddingRight = previousBodyStyles.paddingRight ?? "";
    void document.documentElement.offsetHeight;
    window.scrollTo(0, restoreScrollY);
    document.documentElement.style.scrollBehavior = previousRootScrollBehavior;
    savedPageScrollY = null;
    previousBodyStyles = {};
    previousRootScrollBehavior = "";
  };

  const resetGalleryScroll = () => {
    if (!dialog) return;
    dialog.scrollTop = 0;
    requestAnimationFrame(() => {
      dialog.scrollTop = 0;
    });
  };

  const closeGallery = () => {
    if (!gallery.classList.contains("is-open")) return;
    if (zoom.classList.contains("is-open")) closeZoom();
    gallery.classList.remove("is-open");
    gallery.setAttribute("aria-hidden", "true");
    if (dialog) dialog.scrollTop = 0;
    unlockPageScroll();
    if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    lastTrigger = null;
  };
  const openGallery = (slug: string, trigger: HTMLElement) => {
    const material = cards.find((item) => item.slug === slug);
    if (!material?.inspirationImages?.length || !dialog || !galleryTitle || !galleryGrid || !description || !colours || !applications || !finishes || !badge || !cta || !related || !relatedList) return;
    const isAlreadyOpen = gallery.classList.contains("is-open");
    if (!isAlreadyOpen) {
      lastTrigger = trigger;
      lockPageScroll();
    }
    galleryTitle.textContent = material.title;
    description.textContent = material.modalDescription ?? material.description;
    colours.textContent = material.colours.join(" / ");
    applications.textContent = material.applications.join(" / ");
    finishes.textContent = material.finishes.join(" / ");
    badge.hidden = !material.badge;
    badge.textContent = material.badge ?? "";
    cta.href = `/quote/?material=${encodeURIComponent(material.title)}`;
    galleryGrid.innerHTML = material.inspirationImages.map((image) => { const imageUrl = staticAssetUrl(image.src); return `<figure class="tile-style-gallery__item"><button type="button" class="tile-style-gallery__zoom-trigger" data-material-zoom data-image-src="${imageUrl}" data-image-alt="${escapeHtml(image.alt)}" aria-label="Open ${escapeHtml(image.caption)} fullscreen"><img src="${imageUrl}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async" /></button><figcaption>${escapeHtml(image.caption)}</figcaption></figure>`; }).join("");
    const similar = (material.relatedMaterials ?? []).map((slug) => cards.find((item) => item.slug === slug)).filter((item): item is Material => Boolean(item));
    related.hidden = similar.length === 0;
    relatedList.innerHTML = similar.map((item) => `<button type="button" class="tile-style-gallery__related-link" data-tile-style-gallery="${item.slug}">${escapeHtml(item.title)}</button>`).join("");
    resetGalleryScroll();
    gallery.classList.add("is-open");
    gallery.setAttribute("aria-hidden", "false");
    resetGalleryScroll();
    window.setTimeout(() => gallery.querySelector<HTMLButtonElement>(".tile-style-gallery__close")?.focus({ preventScroll: true }), 50);
  };

  document.addEventListener("click", (event) => { const target = event.target as HTMLElement; const zoomTrigger = target.closest<HTMLElement>("[data-material-zoom]"); if (zoomTrigger) { openZoom(zoomTrigger); return; } if (target.closest("[data-tile-style-gallery-zoom-close]")) { closeZoom(); return; } const trigger = target.closest<HTMLElement>("[data-tile-style-gallery]"); if (trigger) openGallery(trigger.dataset.tileStyleGallery ?? "", trigger); if (target.closest("[data-tile-style-gallery-close]")) closeGallery(); });
  document.addEventListener("mousemove", (event) => { if (!zoomCursor || zoom.classList.contains("is-open")) return; const target = (event.target as HTMLElement).closest<HTMLElement>(".tile-style-gallery__zoom-trigger"); if (!target) { zoomCursor.classList.remove("is-visible"); return; } zoomCursor.style.left = `${event.clientX}px`; zoomCursor.style.top = `${event.clientY}px`; zoomCursor.classList.add("is-visible"); });
  document.addEventListener("mouseleave", () => zoomCursor?.classList.remove("is-visible"));
  document.addEventListener("scroll", () => zoomCursor?.classList.remove("is-visible"), { passive: true });
  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    const trigger = target.closest<HTMLElement>("[data-tile-style-gallery]");
    if (trigger && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openGallery(trigger.dataset.tileStyleGallery ?? "", trigger); return; }
    const zoomTrigger = target.closest<HTMLElement>("[data-material-zoom]");
    if (zoomTrigger && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openZoom(zoomTrigger); return; }
    if (zoom.classList.contains("is-open")) {
      if (event.key === "Escape") { event.preventDefault(); closeZoom(); return; }
      if (event.key === "Tab") {
        const zoomFocusable = Array.from(zoom.querySelectorAll<HTMLElement>(focusableSelector));
        if (!zoomFocusable.length) return;
        const first = zoomFocusable[0];
        const last = zoomFocusable[zoomFocusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      return;
    }
    if (!gallery.classList.contains("is-open")) return;
    if (event.key === "Escape") { event.preventDefault(); closeGallery(); return; }
    if (event.key === "Tab" && dialog) { const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
  });
}
