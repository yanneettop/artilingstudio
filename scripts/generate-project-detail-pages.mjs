import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templateSlug = 'onyx-frame-porcelain-vanity';
const template = await readFile(path.join(root, 'projects', templateSlug, 'index.html'), 'utf8');

const context = { window: {} };
vm.createContext(context);
vm.runInContext(await readFile(path.join(root, 'assets/js/project-image-manifest.js'), 'utf8'), context);
vm.runInContext(await readFile(path.join(root, 'assets/js/portfolio-data.js'), 'utf8'), context);

const projects = context.window.ArtilingPortfolioProjects;
const imageManifest = context.window.ArtilingProjectImages || {};

const copy = {
  'rose-onyx-porcelain-sinks-large-format-bathroom-tiling': {
    status: 'Completed project · London',
    title: ['Rose Onyx', 'Bathrooms'],
    seoTitle: 'Rose Onyx Large Format Bathroom Tiling | Artiling Studio',
    lede: 'Two bathrooms finished with 1600 by 3200 mm porcelain slabs in a rose onyx pattern.',
    heading: 'Large porcelain slabs across walls and showers',
    paragraphs: [
      'The 1600 by 3200 mm slabs cover shower walls, feature walls and the area around the freestanding bath. Their size reduces the number of grout joints.',
      'The porcelain was cut around shower niches and corners so the rose pattern continues across adjoining surfaces.',
    ],
    galleryHeading: 'Sink, shower and wall details',
    cta: 'Planning a large format porcelain bathroom?',
  },
  'arabescato-oak-basin': {
    status: 'Completed project',
    title: ['Arabescato', 'Oak Basin'],
    seoTitle: 'Arabescato Porcelain Basin and Oak Vanity | Artiling Studio',
    lede: 'An Arabescato porcelain basin set over a warm oak vanity, with mitred edges and chrome wall taps.',
    heading: 'Arabescato porcelain above warm oak',
    paragraphs: [
      'Porcelain with an Arabescato pattern forms the worktop and integrated rectangular basin. Mitred joints define the bowl and the outer edges.',
      'The oak cabinet sits below the basin. Chrome taps and an illuminated mirror are mounted on the matching wall surface.',
    ],
    galleryHeading: 'Basin, vanity and wall views',
    cta: 'Planning a bespoke porcelain basin?',
  },
  'calacatta-line-sink': {
    status: 'Completed project',
    title: ['Calacatta', 'Line Sink'],
    seoTitle: 'Calacatta Porcelain Sink with Linear Drain | Artiling Studio',
    lede: 'A wall to wall Calacatta porcelain sink with an integrated basin, linear drain and black wall tap.',
    heading: 'A long sink fitted between two walls',
    paragraphs: [
      'The porcelain sink runs across the full width of the wall. Its integrated basin falls towards a narrow linear drain.',
      'Mitred edges contain the Calacatta pattern around the sink. A matte black tap mounted on the wall matches the other black bathroom fittings.',
    ],
    galleryHeading: 'Linear drain and basin details',
    cta: 'Planning a wall to wall porcelain sink?',
  },
  'floating-mitred-porcelain-sink': {
    status: 'Completed project',
    title: ['Floating Mitred', 'Sink'],
    seoTitle: 'Floating Mitred Porcelain Sink | Artiling Studio',
    lede: 'A floating porcelain sink in a warm stone pattern, with an integrated basin and brushed metal wall tap.',
    heading: 'A floating basin with no cabinet below',
    paragraphs: [
      'The sink projects from the wall and leaves the floor clear below it. Porcelain panels form the basin and outer faces with mitred joints.',
      'The warm stone pattern continues onto the surrounding wall. A brushed metal tap is mounted directly behind the basin.',
    ],
    galleryHeading: 'Basin, edge and wall details',
    cta: 'Planning a floating porcelain sink?',
  },
  'onyx-vein-floating-sink': {
    status: 'Completed project',
    title: ['Onyx Vein', 'Floating Sink'],
    seoTitle: 'Onyx Effect Floating Porcelain Sink | Artiling Studio',
    lede: 'A floating porcelain sink with an onyx pattern, integrated basin, mitred corners and taps mounted on the wall.',
    heading: 'The onyx pattern continues around the basin',
    paragraphs: [
      'Large veins run across the front, top and basin surfaces. The panels meet at mitred corners to keep the pattern visible around the block form.',
      'The sink is fixed clear of the floor against a pale porcelain wall. The taps are mounted above the integrated basin.',
    ],
    galleryHeading: 'Veining, basin and mitred edges',
    cta: 'Planning a porcelain feature sink?',
  },
  'statuario-linear-sink': {
    status: 'Design study',
    title: ['Statuario', 'Linear Sink'],
    seoTitle: 'Statuario Linear Porcelain Sink Study | Artiling Studio',
    lede: 'This linear sink study explores Statuario-pattern porcelain, mitred edges and the proportions of a long integrated basin.',
    heading: 'A study of length, edge detail and proportion',
    paragraphs: [
      'The proposal uses white porcelain with grey Statuario veining across a long sink and integrated basin.',
      'The study tests the depth of the front face, the basin opening and the mitred joints before fabrication details are agreed.',
    ],
    galleryHeading: 'Linear form and edge studies',
    cta: 'Planning a linear porcelain sink?',
  },
  'calacatta-gold-led-vanity': {
    status: 'Design study',
    title: ['Calacatta Gold', 'LED Vanity'],
    seoTitle: 'Calacatta Gold LED Vanity Study | Artiling Studio',
    lede: 'Calacatta Gold porcelain, vanity storage and lighting around the mirror are brought together in this design study.',
    heading: 'Porcelain, vanity storage and mirror lighting',
    paragraphs: [
      'The proposal places a porcelain basin and vanity below a mirror with integrated LED lighting. Calacatta Gold veining runs across the main surfaces.',
      'The study shows how the mirror, lighting and vanity could be aligned before dimensions and fabrication details are confirmed.',
    ],
    galleryHeading: 'Vanity and lighting study views',
    cta: 'Planning a porcelain vanity with lighting?',
  },
  'soft-stone-double-vanity': {
    status: 'Completed project',
    title: ['Soft Stone', 'Double Vanity'],
    seoTitle: 'Soft Stone Porcelain Double Vanity | Artiling Studio',
    lede: 'A double porcelain vanity with two integrated sinks, mitred edges and storage without handles.',
    heading: 'Two basins across one porcelain vanity',
    paragraphs: [
      'The double vanity uses porcelain with a soft stone pattern across both integrated sinks and the surrounding worktop.',
      'Storage sits below the basins with no handles on the fronts. Mitred lines define the outer corners and basin edges.',
    ],
    galleryHeading: 'Double basin and storage details',
    cta: 'Planning a porcelain double vanity?',
  },
  'beige-stone-floating-vanity': {
    status: 'Design study',
    title: ['Beige Stone', 'Floating Vanity'],
    seoTitle: 'Beige Stone Floating Vanity Study | Artiling Studio',
    lede: 'A floating vanity concept in beige stone-pattern porcelain, considered alongside the room’s large format wall surfaces.',
    heading: 'A floating vanity in a simple bathroom layout',
    paragraphs: [
      'The study places the vanity clear of the floor and uses a beige stone pattern across the basin and wall surfaces.',
      'The layout tests the relationship between the sink, open floor area and large porcelain wall panels.',
    ],
    galleryHeading: 'Layout and surface study views',
    cta: 'Planning a floating porcelain vanity?',
  },
  'framed-mirror-double-vanity': {
    status: 'Design study',
    title: ['Framed Mirror', 'Double Vanity'],
    seoTitle: 'Framed Mirror Double Vanity Study | Artiling Studio',
    lede: 'This double vanity proposal aligns framed mirrors, light porcelain surfaces, warm brass fittings and focused lighting.',
    heading: 'Two vanity positions aligned with framed mirrors',
    paragraphs: [
      'The proposal aligns each basin with a framed mirror and places lighting around the vanity area.',
      'Light porcelain surfaces form the backdrop, while brass taps and fittings introduce a warmer metal finish.',
    ],
    galleryHeading: 'Mirror and double vanity study views',
    cta: 'Planning a porcelain double vanity?',
  },
  'backlit-marble-double-vanity': {
    status: 'Design study',
    title: ['Backlit Marble', 'Double Vanity'],
    seoTitle: 'Backlit Marble Double Vanity Study | Artiling Studio',
    lede: 'A double vanity proposal combining marble-pattern porcelain with two basin positions and concealed mirror lighting.',
    heading: 'A double vanity below a backlit mirror',
    paragraphs: [
      'The proposal combines two basin positions with a wide mirror lit from behind. Porcelain with a marble pattern covers the vanity surfaces.',
      'The study tests the width of the vanity, the spacing between the basins and the line of light around the mirror.',
    ],
    galleryHeading: 'Double vanity and mirror study views',
    cta: 'Planning a double vanity with mirror lighting?',
  },
  'graphite-spa-bathroom': {
    status: 'Design study',
    title: ['Graphite Spa', 'Bathroom'],
    seoTitle: 'Graphite Porcelain Spa Bathroom Study | Artiling Studio',
    lede: 'A bathroom study using graphite porcelain, a floating sink, large wall panels and an open shower area.',
    heading: 'Dark porcelain across the sink and shower',
    paragraphs: [
      'Graphite porcelain covers the main wall surfaces and the floating sink. Lighting is positioned to show the texture of the darker material.',
      'The layout keeps the floor open below the basin and carries the same surface direction into the shower area.',
    ],
    galleryHeading: 'Sink, shower and lighting study views',
    cta: 'Planning a bathroom in dark porcelain?',
  },
  'mauve-stone-statement-bathroom': {
    status: 'Design study',
    title: ['Mauve Stone', 'Bathroom'],
    seoTitle: 'Mauve Stone Porcelain Bathroom Study | Artiling Studio',
    lede: 'A bathroom study with polished mauve brown porcelain, a bespoke sink and a defined shower area.',
    heading: 'Polished mauve surfaces around the room',
    paragraphs: [
      'The proposal uses deep mauve brown porcelain across the sink and principal wall surfaces.',
      'The study sets the basin, shower fittings and panel joints against the movement of the polished stone pattern.',
    ],
    galleryHeading: 'Material and bathroom study views',
    cta: 'Planning a bathroom with a coloured stone pattern?',
  },
  'onyx-feature-floating-sink': {
    status: 'Design study',
    title: ['Onyx Feature', 'Floating Sink'],
    seoTitle: 'Onyx Feature Floating Sink Study | Artiling Studio',
    lede: 'The floating sink study uses a pronounced onyx pattern across its front, top and integrated basin opening.',
    heading: 'An onyx pattern across a floating sink',
    paragraphs: [
      'The proposal uses the movement of the onyx pattern across the front and top of the sink.',
      'The study tests the floating position, basin opening and panel joints before a fabrication layout is prepared.',
    ],
    galleryHeading: 'Form and surface study views',
    cta: 'Planning a floating porcelain feature sink?',
  },
  'verde-marble-feature-bathroom': {
    status: 'Design study',
    title: ['Verde Marble', 'Bathroom'],
    seoTitle: 'Verde Marble Porcelain Bathroom Study | Artiling Studio',
    lede: 'A bathroom study using porcelain with a green marble pattern across the integrated sink and full height walls.',
    heading: 'Green porcelain across the sink and walls',
    paragraphs: [
      'The proposal carries the same green marble pattern from the integrated basin onto the surrounding wall panels.',
      'The study tests panel size, vein position and joints across the main surfaces of the room.',
    ],
    galleryHeading: 'Sink and wall study views',
    cta: 'Planning a bathroom in green porcelain?',
  },
  'walnut-double-vanity-suite': {
    status: 'Design study',
    title: ['Walnut', 'Double Vanity'],
    seoTitle: 'Walnut Double Vanity Bathroom Study | Artiling Studio',
    lede: 'A bathroom study combining walnut cabinetry, stone vanity surfaces, two basin positions and layered lighting.',
    heading: 'Walnut storage below a double vanity',
    paragraphs: [
      'The proposal places two basins above walnut cabinets and uses stone surfaces around the vanity.',
      'Lighting is arranged around the mirrors and cabinetry to show how the timber and stone finishes meet.',
    ],
    galleryHeading: 'Cabinet, vanity and lighting study views',
    cta: 'Planning a double vanity bathroom?',
  },
  'calacatta-gold-bespoke-bathroom': {
    status: 'Completed project · London',
    title: ['Calacatta Gold', 'Bathroom'],
    seoTitle: 'Calacatta Gold Bespoke Porcelain Bathroom | Artiling Studio',
    lede: 'A Calacatta Gold porcelain bathroom with a double basin vanity, large wall panels, wall taps and a niche.',
    heading: 'Calacatta Gold porcelain from vanity to walls',
    paragraphs: [
      'The double basin vanity and wall panels use the same Calacatta Gold porcelain. Vein positions were considered across the broad surfaces.',
      'Taps mounted on the wall keep the basin area clear. The material continues around the mirror, toilet area and recessed niche.',
    ],
    galleryHeading: 'Vanity, taps and niche details',
    cta: 'Planning a bespoke porcelain bathroom?',
  },
};

const metaDescriptions = {
  'rose-onyx-porcelain-sinks-large-format-bathroom-tiling': 'Completed London bathrooms with rose onyx-pattern large-format porcelain, bespoke sinks, shower walls and carefully aligned niches.',
  'arabescato-oak-basin': 'Completed bathroom project featuring an Arabescato porcelain basin, warm oak vanity, mitred edges and chrome taps mounted on the wall.',
  'calacatta-line-sink': 'Completed wall-to-wall Calacatta porcelain sink with an integrated basin, mitred edges, linear drain and matte black wall tap.',
  'floating-mitred-porcelain-sink': 'Completed floating porcelain sink in a warm stone pattern, formed with an integrated basin, mitred edges and brushed metal wall tap.',
  'onyx-vein-floating-sink': 'Completed floating porcelain sink with bold onyx veining, an integrated basin, precise mitred corners and taps mounted on the wall.',
  'statuario-linear-sink': 'Design study for a long Statuario porcelain sink, exploring an integrated basin, mitred edges and balanced proportions before fabrication.',
  'calacatta-gold-led-vanity': 'Design study pairing a Calacatta Gold porcelain vanity with two basin positions, storage and integrated lighting around the mirror.',
  'soft-stone-double-vanity': 'Completed porcelain double vanity with two integrated basins, clean mitred edges, wall-mounted taps and handle-free storage.',
  'beige-stone-floating-vanity': 'Design study for a floating beige stone-pattern porcelain vanity, integrated basin and large-format wall panels within an open layout.',
  'framed-mirror-double-vanity': 'Design study for a porcelain double vanity aligned with framed mirrors, warm brass fittings and carefully positioned bathroom lighting.',
  'backlit-marble-double-vanity': 'Design study exploring a marble-pattern porcelain double vanity, paired basin positions and a wide mirror with concealed backlighting.',
  'graphite-spa-bathroom': 'Design study using graphite large-format porcelain across a floating sink, textured wall surfaces and an open shower arrangement.',
  'mauve-stone-statement-bathroom': 'Design study for a bathroom with polished mauve stone-pattern porcelain, a bespoke sink, defined panel joints and shower fittings.',
  'onyx-feature-floating-sink': 'Design study for a floating porcelain sink with a pronounced onyx pattern, integrated basin opening and considered panel joints.',
  'verde-marble-feature-bathroom': 'Design study using green marble-pattern porcelain across an integrated sink and full-height walls, with vein positions considered.',
  'walnut-double-vanity-suite': 'Design study combining walnut cabinetry, a stone double vanity, paired basin positions, mirrors and layered bathroom lighting.',
  'calacatta-gold-bespoke-bathroom': 'Completed London bathroom with a Calacatta Gold porcelain double vanity, integrated basins, large-format walls and recessed niche.',
};

const enquiryIntros = [
  'Share the room dimensions, preferred surface and a few photographs. We can review the layout before arranging a site visit.',
  'Send the room size, reference images and the surface you are considering. We will review the practical details and advise on next steps.',
  'Tell us about the layout, tap position and porcelain finish. Photographs or drawings help us assess the work before a site visit.',
];

const studyDetailHeadings = [
  'Material and layout under review',
  'Proposed surfaces and arrangement',
  'Design direction and key details',
];

const clean = (value = '') => String(value)
  .replaceAll('push-to-open', 'push to open')
  .replaceAll('Rose onyx-effect porcelain slabs', 'Porcelain slabs with a rose onyx pattern')
  .replaceAll('rose onyx-effect porcelain', 'porcelain with a rose onyx pattern')
  .replaceAll('Arabescato-effect porcelain', 'Porcelain with an Arabescato pattern')
  .replaceAll('Calacatta-effect porcelain', 'Porcelain with a Calacatta pattern')
  .replaceAll('Calacatta marble-effect porcelain', 'Porcelain with a Calacatta marble pattern')
  .replaceAll('Warm neutral stone-effect porcelain', 'Porcelain with a warm neutral stone pattern')
  .replaceAll('Onyx-effect porcelain', 'Porcelain with an onyx pattern')
  .replaceAll('light stone-effect porcelain wall surfaces', 'light porcelain wall surfaces with a stone pattern')
  .replaceAll('Statuario marble-effect porcelain', 'Porcelain with a Statuario marble pattern')
  .replaceAll('Soft stone-effect porcelain', 'Porcelain with a soft stone pattern')
  .replaceAll('Beige stone-effect porcelain', 'Porcelain with a beige stone pattern')
  .replaceAll('Light stone-effect porcelain with brass fixtures', 'light porcelain with a stone pattern and brass fixtures')
  .replaceAll('Marble-effect porcelain with backlit mirror detailing', 'porcelain with a marble pattern and lighting behind the mirror')
  .replaceAll('Graphite stone-effect porcelain', 'porcelain with a graphite stone pattern')
  .replaceAll('Mauve-brown polished stone-effect porcelain', 'polished porcelain with a mauve brown stone pattern')
  .replaceAll('Verde marble-effect porcelain', 'Porcelain with a Verde marble pattern')
  .replaceAll('marble pattern porcelain', 'porcelain with a marble pattern')
  .replaceAll('stone pattern porcelain', 'porcelain with a stone pattern')
  .replaceAll('onyx pattern porcelain', 'porcelain with an onyx pattern')
  .replaceAll('wall-mounted tapware', 'tapware mounted on the wall')
  .replaceAll('Wall-mounted tapware', 'Tapware mounted on the wall')
  .replaceAll('wall-mounted taps', 'taps mounted on the wall')
  .replaceAll('Wall-mounted taps', 'Taps mounted on the wall')
  .replaceAll('wall-mounted tap', 'tap mounted on the wall')
  .replaceAll('Wall-mounted tap', 'Tap mounted on the wall')
  .replaceAll('handle-free', 'without handles')
  .replaceAll('large-format', 'large format')
  .replaceAll('wall-to-wall', 'wall to wall')
  .replaceAll('stone-effect', 'stone pattern')
  .replaceAll('marble-effect', 'marble pattern')
  .replaceAll('onyx-effect', 'onyx pattern')
  .replaceAll('Arabescato-effect', 'Arabescato pattern')
  .replaceAll('close-up', 'close view')
  .replaceAll('Close-up', 'Close view')
  .replaceAll('full-height', 'full height')
  .replaceAll('spa-style', 'spa')
  .replaceAll('spa-like', 'spa')
  .replaceAll('bookmatch-style', 'bookmatched')
  .replaceAll('deep-toned', 'deep coloured')
  .replaceAll('warm-veined', 'with warm veining')
  .replaceAll('refined', 'precise')
  .replaceAll('Refined', 'Precise')
  .replaceAll('dramatic', 'strong')
  .replaceAll('Dramatic', 'Strong')
  .replaceAll('expressive', 'visible')
  .replaceAll('Expressive', 'Visible')
  .replaceAll('sculptural', 'projecting')
  .replaceAll('Sculptural', 'Projecting')
  .replaceAll('minimal architectural bathroom composition', 'simple bathroom layout')
  .replaceAll('surface movement', 'surface pattern')
  .replaceAll('statement bathroom', 'bathroom')
  .replaceAll('Statement bathroom', 'Bathroom')
  .replaceAll('made-to-measure', 'made to fit the room')
  .replaceAll('Made-to-measure', 'Made to fit the room')
  .replaceAll('—', ' ')
  .replaceAll('–', ' ');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const sentence = (value = '') => {
  const result = clean(value).trim();
  return /[.!?]$/.test(result) ? result : `${result}.`;
};

const replaceOne = (html, pattern, replacement, label) => {
  const matches = html.match(pattern);
  if (!matches || matches.length !== 1) throw new Error(`Could not replace ${label}`);
  return html.replace(pattern, replacement);
};

const imageInfo = (src) => imageManifest[src] || { src, width: 1200, height: 900, srcset: '' };
const altFromPath = (src, project) => {
  const basename = path.basename(src, path.extname(src));
  if (/^cover$/i.test(basename)) return `${project.title}, front view`;
  if (/^collage\d*$/i.test(basename)) return `${project.title}, combined views`;
  const words = basename
    .replace(/^artiling[-_]/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\d+\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return words ? `${words.charAt(0).toUpperCase()}${words.slice(1)}` : `${project.title}, project view`;
};
const imageMarkup = (src, alt, sizes, { eager = false } = {}) => {
  const image = imageInfo(src);
  const srcset = image.srcset ? ` srcset="${escapeHtml(image.srcset)}"` : '';
  return `<img src="${escapeHtml(image.src)}"${srcset} sizes="${sizes}" alt="${escapeHtml(clean(alt))}" width="${image.width}" height="${image.height}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''} />`;
};

const imagesFor = async (project) => {
  const listed = [
    project.coverImage || project.cover,
    ...(project.galleryImages || []),
    ...(project.detailImages || []),
  ].filter(Boolean);
  const directory = path.join(root, 'public', 'projects', project.slug);
  const files = (await readdir(directory)).filter((name) => /\.(?:png|jpe?g|webp)$/i.test(name));
  for (const name of files) listed.push(`/public/projects/${project.slug}/${name}`);
  return [...new Set(listed)];
};

const factsFor = (project, pageCopy) => [
  ['Material', clean(project.details?.material || project.material)],
  ['Work', clean(project.details?.work || project.scope)],
  ['Detail', clean(project.details?.detail || (project.serviceTags || []).join(', '))],
  ['Type', pageCopy.status.split(' · ')[0]],
];

const detailPointsFor = (project) => [
  ['Material', sentence(project.details?.material || project.material)],
  ['Work', sentence(project.details?.work || project.scope)],
  ['Details', sentence(project.details?.detail || (project.serviceTags || []).join(', '))],
];

const schemaFor = (project, pageCopy, heroImage, status) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `https://www.artilingstudio.co.uk/projects/${project.slug}/#webpage`,
      url: `https://www.artilingstudio.co.uk/projects/${project.slug}/`,
      name: pageCopy.seoTitle,
      description: metaDescriptions[project.slug] || pageCopy.lede,
      breadcrumb: { '@id': `https://www.artilingstudio.co.uk/projects/${project.slug}/#breadcrumb` },
      mainEntity: { '@id': `https://www.artilingstudio.co.uk/projects/${project.slug}/#project` },
    },
    {
      '@type': 'CreativeWork',
      '@id': `https://www.artilingstudio.co.uk/projects/${project.slug}/#project`,
      name: project.title,
      headline: pageCopy.seoTitle.replace(' | Artiling Studio', ''),
      description: metaDescriptions[project.slug] || pageCopy.lede,
      creator: { '@id': 'https://www.artilingstudio.co.uk/#business' },
      genre: status,
      image: heroImage ? {
        '@type': 'ImageObject',
        url: `https://www.artilingstudio.co.uk${imageInfo(heroImage).src}`,
        caption: clean((project.imageAlts || [])[0] || project.alt || project.title),
      } : undefined,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `https://www.artilingstudio.co.uk/projects/${project.slug}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.artilingstudio.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.artilingstudio.co.uk/projects/' },
        { '@type': 'ListItem', position: 3, name: project.title },
      ],
    },
  ],
});

for (const project of projects) {
  if (project.slug === templateSlug) continue;
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const pageCopy = copy[project.slug];
  if (!pageCopy) throw new Error(`Missing copy for ${project.slug}`);
  const images = await imagesFor(project);
  if (images.length < 3) throw new Error(`${project.slug} needs at least three images`);
  const [heroImage, storyImage, ...galleryCandidates] = images;
  const galleryImages = galleryCandidates.slice(0, 3);
  const alts = project.imageAlts || [];
  const altFor = (index) => clean(alts[index] || (index === 0 && project.alt) || altFromPath(images[index], project));
  const facts = factsFor(project, pageCopy);
  const detailPoints = detailPointsFor(project);
  const status = pageCopy.status.startsWith('Design') ? 'Design study' : 'Completed project';
  const heroOptimized = imageInfo(heroImage);
  let html = template;

  html = html.replace(/\s*<meta name="robots"[^>]+>/, '');
  html = replaceOne(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(pageCopy.seoTitle)}</title>`, 'title');
  const metaDescription = metaDescriptions[project.slug] || pageCopy.lede;
  html = replaceOne(html, /<meta name="description"[^>]+>/, `<meta name="description" content="${escapeHtml(metaDescription)}" />`, 'description');
  html = replaceOne(html, /<link rel="canonical"[^>]+>/, `<link rel="canonical" href="https://www.artilingstudio.co.uk/projects/${project.slug}/" />`, 'canonical');
  html = replaceOne(html, /<meta property="og:title"[^>]+>/, `<meta property="og:title" content="${escapeHtml(project.title)} | Artiling Studio" />`, 'og title');
  html = replaceOne(html, /<meta property="og:description"[^>]+>/, `<meta property="og:description" content="${escapeHtml(metaDescription)}" />`, 'og description');
  html = replaceOne(html, /<meta property="og:url"[^>]+>/, `<meta property="og:url" content="https://www.artilingstudio.co.uk/projects/${project.slug}/" />`, 'og url');
  html = replaceOne(html, /<meta property="og:image"[^>]+>/, `<meta property="og:image" content="https://www.artilingstudio.co.uk${heroOptimized.src}" />`, 'og image');
  html = replaceOne(html, /<link rel="preload" as="image"[^>]+>/, `<link rel="preload" as="image" href="${heroOptimized.src}"${heroOptimized.srcset ? ` imagesrcset="${heroOptimized.srcset}"` : ''} imagesizes="(max-width: 760px) 100vw, 54vw" fetchpriority="high" />`, 'preload');
  html = replaceOne(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(schemaFor(project, pageCopy, heroImage, status), null, 2)}\n    </script>`, 'schema');
  html = replaceOne(html, /<nav class="project-breadcrumb"[\s\S]*?<\/nav>/, `<nav class="project-breadcrumb" aria-label="Breadcrumb"><a href="/projects/">Projects</a><span aria-hidden="true">/</span><span>${escapeHtml(project.title)}</span></nav>`, 'breadcrumb');
  html = replaceOne(html, /<p class="eyebrow">[\s\S]*?<\/p>/, `<p class="eyebrow">${escapeHtml(pageCopy.status)}</p>`, 'status');
  html = replaceOne(html, /<h1>[\s\S]*?<\/h1>/, `<h1>${escapeHtml(pageCopy.title[0])}<br /><em>${escapeHtml(pageCopy.title[1])}</em></h1>`, 'h1');
  html = replaceOne(html, /<p class="project-hero__lede">[\s\S]*?<\/p>/, `<p class="project-hero__lede">${escapeHtml(pageCopy.lede)}</p>`, 'lede');
  const heroClass = heroOptimized.width > heroOptimized.height ? 'project-hero__media project-hero__media--landscape' : 'project-hero__media';
  html = replaceOne(html, /<figure class="project-hero__media(?: project-hero__media--landscape)?">[\s\S]*?<\/figure>/, `<figure class="${heroClass}">\n              ${imageMarkup(heroImage, altFor(0), '(max-width: 760px) 100vw, 54vw', { eager: true })}\n            </figure>`, 'hero image');
  html = replaceOne(html, /<dl class="container project-facts__grid">[\s\S]*?<\/dl>/, `<dl class="container project-facts__grid">\n${facts.map(([label, value]) => `            <div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('\n')}\n          </dl>`, 'facts');
  html = replaceOne(html, /<div class="project-story__copy" data-reveal>[\s\S]*?<\/div>/, `<div class="project-story__copy" data-reveal>\n              <p class="project-kicker">${status === 'Design study' ? 'Study overview' : 'Project overview'}</p>\n              <h2>${escapeHtml(pageCopy.heading)}</h2>\n${pageCopy.paragraphs.map((paragraph) => `              <p>${escapeHtml(paragraph)}</p>`).join('\n')}\n            </div>`, 'story copy');
  html = replaceOne(html, /<figure class="project-story__media" data-reveal>[\s\S]*?<\/figure>/, `<figure class="project-story__media" data-reveal>\n              ${imageMarkup(storyImage, altFor(1), '(max-width: 760px) 92vw, 43vw')}\n            </figure>`, 'story image');
  html = replaceOne(html, /<div class="project-gallery__heading" data-reveal>[\s\S]*?<\/div>/, `<div class="project-gallery__heading" data-reveal>\n              <p class="project-kicker">Close views</p>\n              <h2 id="gallery-title">${escapeHtml(pageCopy.galleryHeading)}</h2>\n            </div>`, 'gallery heading');
  const galleryClass = galleryImages.length === 1 ? ' project-gallery__grid--single' : galleryImages.length === 2 ? ' project-gallery__grid--pair' : '';
  const figureClasses = ['project-gallery__wide', 'project-gallery__tall', 'project-gallery__final'];
  const galleryHtml = galleryImages.map((src, index) => {
    const caption = altFor(index + 2);
    return `              <figure class="${figureClasses[index]}" data-reveal>\n                ${imageMarkup(src, caption, `(max-width: 760px) 92vw, ${index === 0 ? '57vw' : index === 1 ? '35vw' : '48vw'}`)}\n                <figcaption>${escapeHtml(sentence(caption))}</figcaption>\n              </figure>`;
  }).join('\n');
  html = replaceOne(html, /<div class="project-gallery__grid">[\s\S]*?<\/div>\n          <\/div>\n        <\/section>/, `<div class="project-gallery__grid${galleryClass}">\n${galleryHtml}\n            </div>\n          </div>\n        </section>`, 'gallery');
  html = replaceOne(html, /<div class="project-details__heading" data-reveal>[\s\S]*?<\/div>/, `<div class="project-details__heading" data-reveal>\n              <p class="project-kicker">${status === 'Design study' ? 'Study specification' : 'Project specification'}</p>\n              <h2 id="details-title">${status === 'Design study' ? studyDetailHeadings[projectIndex % studyDetailHeadings.length] : 'Materials and work'}</h2>\n            </div>`, 'detail heading');
  const detailHtml = detailPoints.map(([label, value], index) => `              <div data-reveal><span>0${index + 1}</span><h3>${escapeHtml(label)}</h3><p>${escapeHtml(value)}</p></div>`).join('\n');
  html = replaceOne(html, /<div class="project-details__list">[\s\S]*?<\/div>\n          <\/div>\n        <\/section>/, `<div class="project-details__list">\n${detailHtml}\n            </div>\n          </div>\n        </section>`, 'details');
  html = replaceOne(html, /<div><p class="project-kicker">Start an enquiry<\/p><h2>[\s\S]*?<\/h2><\/div>/, `<div><p class="project-kicker">Start an enquiry</p><h2>${escapeHtml(pageCopy.cta)}</h2></div>`, 'cta');
  html = replaceOne(html, /<div><p>[^<]+<\/p><a href="\/quote\/"/, `<div><p>${escapeHtml(enquiryIntros[projectIndex % enquiryIntros.length])}</p><a href="/quote/"`, 'enquiry introduction');
  html = replaceOne(
    html,
    /<nav class="project-pagination"[\s\S]*?<\/nav>/,
    `<nav class="project-pagination" aria-label="Browse projects">
          <a class="project-pagination__item project-pagination__item--previous" href="/projects/${previousProject.slug}/" rel="prev">
            <span class="project-pagination__label"><span aria-hidden="true">←</span> Previous project</span>
            <strong>${escapeHtml(previousProject.title)}</strong>
          </a>
          <a class="project-pagination__all" href="/projects/">All projects</a>
          <a class="project-pagination__item project-pagination__item--next" href="/projects/${nextProject.slug}/" rel="next">
            <span class="project-pagination__label">Next project <span aria-hidden="true">→</span></span>
            <strong>${escapeHtml(nextProject.title)}</strong>
          </a>
        </nav>`,
    'project pagination',
  );

  const outputDirectory = path.join(root, 'projects', project.slug);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'index.html'), html, 'utf8');
}

console.log(`Generated ${projects.length - 1} project detail pages.`);
