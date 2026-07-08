(function () {
  const quoteHref = (slug) => `/quote/?style=${encodeURIComponent(slug)}`;

  const filters = [
    { label: "All", value: "all" },
    { label: "Best for Sinks", value: "best-for-sinks" },
    { label: "Marble & Onyx", value: "marble-onyx" },
    { label: "Stone Effect", value: "stone-effect" },
    { label: "Decorative", value: "decorative" },
    { label: "Outdoor", value: "outdoor" },
  ];

  const tileStyles = [
    {
      title: "Calacatta Marble Effect",
      slug: "calacatta-marble-effect",
      category: "Marble Effect Porcelain",
      description:
        "A bright white porcelain look with elegant grey or gold veining, often used for luxury bathrooms, feature walls and bespoke sinks.",
      bestFor: ["Bespoke sinks", "Feature walls", "Wet rooms", "Vanity tops"],
      finishes: ["Matt", "Polished"],
      colourFamily: ["White", "Grey", "Gold"],
      image: "/images/tile-styles/calacatta-marble-effect.jpg",
      alt: "Calacatta marble effect porcelain tile sample with grey and subtle gold veining",
      filterGroups: ["best-for-sinks", "marble-onyx"],
      sinkSuitability: "great",
      sinkSuitabilityLabel: "Great for bespoke sinks",
      recommendedUseShort: "Sinks, walls & vanities",
    },
    {
      title: "Nero Marquina Marble Effect",
      slug: "nero-marquina-marble-effect",
      category: "Marble Effect Porcelain",
      description:
        "A dramatic black marble-effect porcelain with white veining, ideal for bold feature walls, statement sinks and darker luxury bathrooms.",
      bestFor: ["Statement sinks", "Feature walls", "Shower walls", "Vanity areas"],
      finishes: ["Matt", "Polished"],
      colourFamily: ["Black", "White"],
      image: "/images/tile-styles/nero-marquina-marble-effect.jpg",
      alt: "Nero Marquina marble effect porcelain tile sample with white veining",
      filterGroups: ["best-for-sinks", "marble-onyx"],
      sinkSuitability: "great",
      sinkSuitabilityLabel: "Great for bespoke sinks",
      recommendedUseShort: "Statement sinks & walls",
    },
    {
      title: "Green Onyx Effect",
      slug: "green-onyx-effect",
      category: "Onyx Effect Porcelain",
      description:
        "A gemstone-inspired porcelain look with green, blue and cloudy translucent-style veining, perfect for statement sinks and feature surfaces.",
      bestFor: ["Statement sinks", "Feature walls", "Vanity tops", "Luxury bathrooms"],
      finishes: ["Matt", "Polished", "Gloss"],
      colourFamily: ["Green", "Blue", "White"],
      image: "/images/tile-styles/green-onyx-effect.jpg",
      alt: "Green onyx effect porcelain tile sample with soft green veining",
      filterGroups: ["best-for-sinks", "marble-onyx"],
      sinkSuitability: "great",
      sinkSuitabilityLabel: "Great for bespoke sinks",
      recommendedUseShort: "Statement sinks & features",
    },
    {
      title: "Blue Onyx Effect",
      slug: "blue-onyx-effect",
      category: "Onyx Effect Porcelain",
      description:
        "A cool blue-toned onyx-effect porcelain with soft movement and stone-like depth, suited to calm but distinctive bathroom designs.",
      bestFor: ["Feature walls", "Bespoke sinks", "Shower walls", "Vanity tops"],
      finishes: ["Matt", "Polished", "Gloss"],
      colourFamily: ["Blue", "Grey", "White"],
      image: "/images/tile-styles/blue-onyx-effect.jpg",
      alt: "Blue onyx effect porcelain tile sample with pale blue translucent veining",
      filterGroups: ["best-for-sinks", "marble-onyx"],
      sinkSuitability: "great",
      sinkSuitabilityLabel: "Great for bespoke sinks",
      recommendedUseShort: "Sinks, walls & vanities",
    },
    {
      title: "Travertine Effect",
      slug: "travertine-effect",
      category: "Stone Effect Porcelain",
      description:
        "A warm beige stone-effect porcelain inspired by travertine, often chosen for calm spa-style bathrooms and soft neutral interiors.",
      bestFor: ["Wet rooms", "Bathroom floors", "Feature walls", "Bespoke sinks"],
      finishes: ["Matt", "Honed", "Textured"],
      colourFamily: ["Beige", "Ivory", "Warm neutral"],
      image: "/images/tile-styles/travertine-effect.jpg",
      alt: "Travertine effect porcelain tile sample with warm beige linear stone texture",
      filterGroups: ["best-for-sinks", "stone-effect"],
      sinkSuitability: "great",
      sinkSuitabilityLabel: "Great for bespoke sinks",
      recommendedUseShort: "Warm spa-style bathrooms",
    },
    {
      title: "Limestone Effect",
      slug: "limestone-effect",
      category: "Stone Effect Porcelain",
      description:
        "A soft natural stone look with quiet movement and neutral tones, useful for timeless bathrooms, floors and understated surfaces.",
      bestFor: ["Bathroom floors", "Wet rooms", "Walls", "Minimal interiors"],
      finishes: ["Matt", "Honed", "Textured"],
      colourFamily: ["Ivory", "Beige", "Grey"],
      image: "/images/tile-styles/limestone-effect.jpg",
      alt: "Limestone effect porcelain tile sample with soft greige stone texture",
      filterGroups: ["best-for-sinks", "stone-effect"],
      sinkSuitability: "great",
      sinkSuitabilityLabel: "Great for bespoke sinks",
      recommendedUseShort: "Calm neutral bathrooms",
    },
    {
      title: "Concrete / Microcement Effect",
      slug: "concrete-microcement-effect",
      category: "Concrete Effect Porcelain",
      description:
        "A smooth industrial-inspired porcelain look that gives bathrooms and wet rooms a seamless, minimal and contemporary feel.",
      bestFor: ["Wet rooms", "Bathroom floors", "Modern walls", "Minimal interiors"],
      finishes: ["Matt", "Textured", "Anti-slip"],
      colourFamily: ["Grey", "Taupe", "Warm neutral"],
      image: "/images/tile-styles/concrete-microcement-effect.jpg",
      alt: "Concrete microcement effect porcelain tile sample with soft grey matte texture",
      filterGroups: ["stone-effect"],
      sinkSuitability: "possible",
      sinkSuitabilityLabel: "Possible for minimal sinks",
      recommendedUseShort: "Minimal wet rooms",
    },
    {
      title: "Terrazzo",
      slug: "terrazzo",
      category: "Terrazzo / Speckled Surfaces",
      description:
        "A speckled surface with stone-chip character, often used for playful but premium bathrooms, floors and feature details.",
      bestFor: ["Bathroom floors", "Feature walls", "Vanity areas", "Shower floors"],
      finishes: ["Matt", "Polished", "Textured"],
      colourFamily: ["White", "Grey", "Beige", "Mixed"],
      image: "/images/tile-styles/terrazzo.jpg",
      alt: "Terrazzo effect porcelain tile sample with ivory base and grey beige stone chips",
      filterGroups: ["decorative"],
      sinkSuitability: "possible",
      sinkSuitabilityLabel: "Possible for selected sinks",
      recommendedUseShort: "Floors, details & vanities",
    },
    {
      title: "Zellige / Handmade Look",
      slug: "zellige-handmade-look",
      category: "Handmade Look Tiles",
      description:
        "Glossy characterful tiles with subtle variation, uneven reflections and a handcrafted feel, often used for feature walls and splashbacks.",
      bestFor: ["Feature walls", "Shower walls", "Splashbacks", "Decorative details"],
      finishes: ["Gloss", "Handmade look"],
      colourFamily: ["Green", "White", "Blue", "Terracotta"],
      image: "/images/tile-styles/zellige-handmade-look.jpg",
      alt: "Green zellige handmade look tile sample with glossy glazed finish",
      filterGroups: ["decorative"],
      sinkSuitability: "not-usually",
      sinkSuitabilityLabel: "Better for walls",
      recommendedUseShort: "Feature walls & splashbacks",
    },
    {
      title: "Mosaic Details",
      slug: "mosaic-details",
      category: "Mosaic Tiles",
      description:
        "Small-format tiles used for shower floors, niches, borders and detailed areas where grip, scale or decorative rhythm matters.",
      bestFor: ["Shower floors", "Niches", "Borders", "Feature details"],
      finishes: ["Matt", "Gloss", "Textured", "Anti-slip"],
      colourFamily: ["Mixed", "Stone", "Green", "White"],
      image: "/images/tile-styles/mosaic-details.jpg",
      alt: "Sage green square mosaic tile sample with light grout lines",
      filterGroups: ["decorative"],
      sinkSuitability: "not-usually",
      sinkSuitabilityLabel: "Better for small details",
      recommendedUseShort: "Niches & shower floors",
    },
    {
      title: "Fluted / Ribbed Tiles",
      slug: "fluted-ribbed-tiles",
      category: "Textured Wall Tiles",
      description:
        "Linear textured tiles that add depth, shadow and architectural rhythm to feature walls, vanity areas and bathroom details.",
      bestFor: ["Feature walls", "Vanity areas", "Bathroom details", "Decorative surfaces"],
      finishes: ["Matt", "Gloss", "Textured"],
      colourFamily: ["White", "Ivory", "Grey", "Green"],
      image: "/images/tile-styles/fluted-ribbed-tiles.jpg",
      alt: "Ivory fluted ribbed porcelain tile sample with vertical textured lines",
      filterGroups: ["decorative"],
      sinkSuitability: "possible",
      sinkSuitabilityLabel: "Possible for feature details",
      recommendedUseShort: "Feature walls & vanities",
    },
    {
      title: "Outdoor Anti-Slip Porcelain",
      slug: "outdoor-anti-slip-porcelain",
      category: "Outdoor Porcelain",
      description:
        "Durable grip-friendly porcelain designed for patios, steps, external floors and areas exposed to water or changing weather.",
      bestFor: ["Patios", "Steps", "Outdoor floors", "External tiling"],
      finishes: ["Textured", "Grip", "Anti-slip"],
      colourFamily: ["Grey", "Beige", "Stone", "Concrete"],
      image: "/images/tile-styles/outdoor-anti-slip-porcelain.jpg",
      alt: "Outdoor anti-slip porcelain tile sample with textured warm grey beige stone surface",
      filterGroups: ["stone-effect", "outdoor"],
      sinkSuitability: "not-usually",
      sinkSuitabilityLabel: "Better for outdoor floors",
      recommendedUseShort: "Patios, steps & exteriors",
    },
  ].map((style) => ({
    ...style,
    quoteHref: quoteHref(style.slug),
  }));

  const renderTags = (items, limit = 3) =>
    items.slice(0, limit).map((item) => `<li>${item}</li>`).join("");

  const renderFilterButtons = () =>
    filters
      .map(
        (filter, index) =>
          `<button class="tile-style-filter${index === 0 ? " is-active" : ""}" type="button" data-tile-style-filter="${filter.value}" aria-pressed="${index === 0 ? "true" : "false"}">${filter.label}</button>`,
      )
      .join("");

  const renderCard = (style, index) => `
    <article class="tile-style-card tile-style-card--${style.slug}" id="${style.slug}" data-tile-style-card data-filter-groups="${style.filterGroups.join(" ")}" data-sink-suitability="${style.sinkSuitability}" data-reveal data-reveal-delay="${(index % 2) * 70}">
      <figure class="tile-style-card__sample">
        <div class="tile-style-card__media" data-image-path="${style.image}">
          <img src="${style.image}" alt="${style.alt}" loading="lazy" decoding="async" />
        </div>
        <figcaption>${style.colourFamily.join(" / ")}</figcaption>
      </figure>
      <div class="tile-style-card__body">
        <p class="tile-style-card__category">${style.category}</p>
        <h3>${style.title}</h3>
        <p class="tile-style-card__use">${style.recommendedUseShort}</p>
        <p class="tile-style-card__sink-label tile-style-card__sink-label--${style.sinkSuitability}">${style.sinkSuitabilityLabel}</p>
        <p>${style.description}</p>
        <div class="tile-style-card__details">
          <div class="tile-style-card__group">
            <span>Best for</span>
            <ul>${renderTags(style.bestFor)}</ul>
          </div>
          <div class="tile-style-card__group tile-style-card__group--finishes">
            <span>Finishes</span>
            <ul>${renderTags(style.finishes, 2)}</ul>
          </div>
        </div>
        <a href="${style.quoteHref}" class="text-link">Ask about this look <span aria-hidden="true">-&gt;</span></a>
      </div>
    </article>
  `;

  const grid = document.querySelector("[data-tile-style-grid]");
  if (!grid) return;

  const filtersMount = document.querySelector("[data-tile-style-filters]");
  const resultCount = document.querySelector("[data-tile-style-count]");

  if (filtersMount) {
    filtersMount.innerHTML = renderFilterButtons();
  }

  grid.innerHTML = tileStyles.map(renderCard).join("");

  const cards = Array.from(grid.querySelectorAll("[data-tile-style-card]"));

  grid.querySelectorAll(".tile-style-card__media img").forEach((image) => {
    const hideMissingImage = () => {
      image.hidden = true;
      image.closest(".tile-style-card__media")?.classList.add("is-missing-image");
    };

    const verifyImageLoaded = () => {
      if (image.naturalWidth === 0) {
        hideMissingImage();
      }
    };

    image.addEventListener("error", hideMissingImage);
    image.addEventListener("load", verifyImageLoaded);

    if (image.complete && image.naturalWidth === 0) {
      hideMissingImage();
    }

    window.setTimeout(() => {
      if (image.complete && image.naturalWidth === 0) {
        hideMissingImage();
      }
    }, 1200);
  });

  const setFilter = (filterValue) => {
    let visibleCount = 0;

    cards.forEach((card) => {
      const groups = (card.getAttribute("data-filter-groups") || "").split(" ");
      const isVisible = filterValue === "all" || groups.includes(filterValue);
      card.hidden = !isVisible;
      card.classList.toggle("is-filtered-out", !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (resultCount) {
      resultCount.textContent = `${visibleCount} style${visibleCount === 1 ? "" : "s"}`;
    }

    document.querySelectorAll("[data-tile-style-filter]").forEach((button) => {
      const isActive = button.getAttribute("data-tile-style-filter") === filterValue;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  document.addEventListener("click", (event) => {
    const control = event.target.closest(
      "[data-tile-style-filter], [data-tile-style-filter-trigger]",
    );
    if (!control) return;

    const filterValue =
      control.getAttribute("data-tile-style-filter") ||
      control.getAttribute("data-tile-style-filter-trigger") ||
      "all";

    setFilter(filterValue);

    if (control.matches("[data-tile-style-filter-trigger]")) {
      document.querySelector(".tile-style-filter-bar")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  setFilter("all");
})();
