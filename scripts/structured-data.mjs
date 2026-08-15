import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const siteUrl = 'https://www.artilingstudio.co.uk';

const business = {
  '@type': ['Organization', 'HomeAndConstructionBusiness'],
  '@id': `${siteUrl}/#business`,
  name: 'Artiling Studio',
  url: `${siteUrl}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': `${siteUrl}/#logo`,
    url: `${siteUrl}/assets/images/artiling_logo.webp`,
  },
  image: [`${siteUrl}/og-image-v2.jpg`, `${siteUrl}/assets/images/artiling_logo.webp`],
  description:
    'London-based studio specialising in bespoke porcelain sinks, porcelain fabrication, large-format tiling, wet rooms, bathroom tiling, mitred porcelain edges, vanity units and custom porcelain surfaces.',
  email: 'info@artilingstudio.co.uk',
  telephone: '+447481613339',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    addressCountry: 'GB',
  },
  areaServed: [
    { '@type': 'City', name: 'London' },
    { '@type': 'AdministrativeArea', name: 'Greater London' },
  ],
  knowsAbout: [
    'Bespoke porcelain sinks',
    'Bespoke porcelain basins',
    'Made-to-measure bathroom basins',
    'Porcelain fabrication',
    'Large format tiling',
    'Wet rooms',
    'Bathroom tiling',
    'Mitred porcelain edges',
    'Custom bathroom surfaces',
  ],
  sameAs: ['https://www.tiktok.com/@artiling.ltd'],
};

const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'Artiling Studio',
  alternateName: 'Artiling Studio | Bespoke Porcelain Sinks & Tiling London',
  url: `${siteUrl}/`,
  publisher: { '@id': `${siteUrl}/#business` },
  inLanguage: 'en-GB',
};

const services = [
  ['Bespoke Porcelain Sinks', `${siteUrl}/bespoke-porcelain-sinks/`],
  ['Porcelain Fabrication', `${siteUrl}/porcelain-fabrication-london/`],
  ['Large Format Tiling', `${siteUrl}/large-format-tiling-london/`],
  ['Wet Rooms', `${siteUrl}/wet-rooms-bathroom-tiling/`],
  ['Bathroom Tiling', `${siteUrl}/wet-rooms-bathroom-tiling/`],
  ['Mitred Porcelain Edges', `${siteUrl}/porcelain-fabrication-london/`],
  ['Custom Bathroom Surfaces', `${siteUrl}/microcement-alternative-london/`],
];

const offerCatalog = {
  '@type': 'OfferCatalog',
  '@id': `${siteUrl}/#services`,
  name: 'Artiling Studio porcelain and tiling services',
  itemListElement: services.map(([name, url]) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name,
      url,
      provider: { '@id': `${siteUrl}/#business` },
      areaServed: business.areaServed,
    },
  })),
};

const page = ({
  url,
  name,
  description,
  type = 'WebPage',
  image = `${siteUrl}/og-image-v2.jpg`,
  dateModified,
  primaryImage = false,
}) => ({
  '@type': type,
  '@id': `${url}#webpage`,
  url,
  name,
  description,
  image,
  ...(primaryImage ? {
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
    },
  } : {}),
  ...(dateModified ? { dateModified } : {}),
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${siteUrl}/#business` },
  inLanguage: 'en-GB',
});

const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  '@id': `${items.at(-1).url}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const service = ({ url, name, description, serviceType, image }) => ({
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  description,
  serviceType,
  url,
  image,
  provider: { '@id': `${siteUrl}/#business` },
  areaServed: business.areaServed,
});

const faq = (url, questions) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  url,
  mainEntity: questions.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: {
      '@type': 'Answer',
      text,
    },
  })),
});

const projectItems = [
  {
    name: 'Onyx Frame Vanity',
    url: `${siteUrl}/projects/#onyx-frame-porcelain-vanity`,
    image: `${siteUrl}/public/projects/onyx-frame-porcelain-vanity/bespoke-mitred-porcelain-vanity-blue-onyx-wall-london.webp`,
    description:
      'A bespoke mitred porcelain sink and vanity unit with matching push-to-open drawers, beige marble-effect porcelain and a blue onyx-effect feature wall.',
  },
  {
    name: 'Rose Onyx Porcelain Sinks',
    url: `${siteUrl}/projects/#rose-onyx-porcelain-sinks-large-format-bathroom-tiling`,
    image: `${siteUrl}/public/projects/rose-onyx-porcelain-sinks-large-format-bathroom-tiling/bespoke-rose-onyx-porcelain-sink-wall-mounted-taps-london.webp`,
    description:
      'Bespoke rose onyx-effect porcelain sinks and large format bathroom tiling completed across two bathrooms in the same London home.',
  },
  {
    name: 'Soft Stone Double Vanity',
    url: `${siteUrl}/projects/#soft-stone-double-vanity`,
    image: `${siteUrl}/public/projects/soft-stone-double-vanity/cover.png`,
    description:
      'Bespoke porcelain double vanity with integrated sink proportions, clean storage lines and soft stone-effect surfaces.',
  },
  {
    name: 'Calacatta Gold Bespoke Bathroom',
    url: `${siteUrl}/projects/#calacatta-gold-bespoke-bathroom`,
    image: `${siteUrl}/public/projects/calacatta-gold-bespoke-bathroom/calacatta-gold-integrated-vanity-sink-london-bathroom.webp`,
    description:
      'Calacatta Gold porcelain bathroom with large-format wall surfaces, tailored vanity detailing and refined transitions.',
  },
  {
    name: 'Porcelain Sink and Vanity Material Studies',
    url: `${siteUrl}/projects/#details-material-studies`,
    image: `${siteUrl}/og-image-v2.jpg`,
    description:
      'Studio previews and material studies exploring porcelain tone, proportion, mitred details and bathroom surface composition.',
  },
];

const common = [business, website];
const homeCrumb = [{ name: 'Home', url: `${siteUrl}/` }];
const servicesCrumb = [...homeCrumb, { name: 'Services', url: `${siteUrl}/services/` }];

const pageSchemas = {
  'index.html': [
    {
      ...business,
      hasOfferCatalog: { '@id': `${siteUrl}/#services` },
    },
    website,
    offerCatalog,
    page({
      url: `${siteUrl}/`,
      name: 'Artiling Studio | Bespoke Porcelain Sinks & Tiling London',
      description:
        'Bespoke porcelain sinks, vanity units, large-format tiling, wet rooms and mitred bathroom details for refined London interiors.',
      type: 'CollectionPage',
    }),
    breadcrumb(homeCrumb),
  ],
  'services/index.html': [
    ...common,
    offerCatalog,
    page({
      url: `${siteUrl}/services/`,
      name: 'Porcelain and Tiling Services London',
      description:
        'Service overview for bespoke porcelain sinks, porcelain fabrication, large-format tiling, wet rooms and custom bathroom surfaces in London.',
      type: 'CollectionPage',
    }),
    breadcrumb(servicesCrumb),
    faq(`${siteUrl}/services/`, [
      ['Do you create bespoke porcelain sinks in London?', 'Yes. We create made-to-measure porcelain sinks for bathrooms, cloakrooms and refined interiors across London.'],
      ['Can you install large-format porcelain tiles?', 'Yes. We install large-format porcelain tiles and surfaces with careful preparation, setting out, alignment and edge control.'],
      ['Can you work with porcelain supplied by the client?', 'In many cases, yes. We can review client-supplied porcelain, drawings and dimensions before confirming suitability.'],
      ['Do you handle wet room and bathroom tiling?', 'Yes. We handle wet rooms, bathrooms, vanity areas and porcelain feature spaces where waterproofing and finish need close coordination.'],
    ]),
  ],
  'bespoke-porcelain-sinks/index.html': [
    ...common,
    page({
      url: `${siteUrl}/bespoke-porcelain-sinks/`,
      name: 'Bespoke Porcelain Sinks & Basins London | Made to Measure',
      description:
        'Made-to-measure porcelain sinks and bathroom basins fabricated in London. Trough basins, floating designs, vanity tops and integrated porcelain surfaces.',
      image: `${siteUrl}/assets/images/services/service-bespoke-porcelain-sinks.webp`,
      dateModified: '2026-08-15',
      primaryImage: true,
    }),
    service({
      url: `${siteUrl}/bespoke-porcelain-sinks/`,
      name: 'Bespoke Porcelain Sinks & Basins London',
      description:
        'Made-to-measure porcelain sinks and bathroom basins fabricated around room dimensions, taps, drainage, support and installation in London.',
      serviceType: ['Bespoke porcelain sinks', 'Bespoke porcelain basins', 'Made-to-measure bathroom basins', 'Mitred porcelain sinks', 'Porcelain vanity units'],
      image: `${siteUrl}/assets/images/services/bespoke-sinks/bespoke-porcelain-floating-trough-grey.webp`,
    }),
    breadcrumb([...servicesCrumb, { name: 'Bespoke Porcelain Sinks & Basins', url: `${siteUrl}/bespoke-porcelain-sinks/` }]),
    faq(`${siteUrl}/bespoke-porcelain-sinks/`, [
      ['How much does a bespoke porcelain sink cost in London?', 'The cost depends on the size, porcelain slab, edge detail, vanity layout and installation requirements. Send us the approximate measurements and a few photos, and we can guide you with a clear quotation.'],
      ['Can you make a porcelain sink to any size?', 'Most designs can be made to measure, depending on the space, slab size, drainage position and installation access. We confirm these details before fabrication.'],
      ['Are mitred porcelain sinks durable?', 'Yes, when fabricated and installed correctly. Porcelain is dense, water-resistant and suitable for bathroom use, while mitred edges create a clean architectural finish.'],
      ['Do you also make porcelain vanity tops and splashbacks?', 'Yes. We can create porcelain vanity tops, splashbacks, shelves and matching bathroom surfaces alongside the sink.'],
      ['Can you help source the porcelain slab?', 'Yes. We can help narrow down suitable porcelain options and finishes, or review a slab you already have in mind before the design is confirmed.'],
      ['What drainage options are available?', 'Waste details can include discreet standard outlets or linear drain arrangements, depending on the basin design, falls and chosen porcelain.'],
      ['Can the sink accommodate wall-mounted or deck-mounted taps?', 'Yes. The sink can be planned around wall-mounted or deck-mounted taps, with positions and clearances agreed before fabrication.'],
      ['Do you provide delivery and installation?', 'Yes. Delivery and installation can be included in the agreed project scope, with access and site conditions checked in advance.'],
      ['How long does fabrication usually take?', 'Timing varies with the design, porcelain availability, templating and current workload. We confirm the programme once the design and site details are agreed.'],
      ['Do you visit to measure or create a template?', 'Where required, yes. A site measure or template may be needed for wall-to-wall sinks, irregular walls, or polygonal and other custom shapes.'],
      ["What wall support or preparation is required?", "The support must suit the sink's weight, fixing method and wall construction. We review the substrate, support and adjoining finishes before fabrication or installation."],
      ['Which areas of London do you cover?', 'We work across London and Greater London. Send the project postcode with your enquiry and we will confirm coverage and access arrangements.'],
      ['What is the difference between a bespoke sink and a bespoke basin?', 'For bathroom projects, bespoke sink, bespoke basin and washbasin are often used interchangeably. Basin or washbasin is more commonly used in the UK; Artiling designs the complete porcelain form around the room, taps, waste, support and adjoining surfaces.'],
      ['Can you make a bathroom basin to exact dimensions?', 'Yes. Most bathroom basins can be fabricated to a project-specific width, depth and overall geometry, subject to available slab dimensions, drainage, structural support and installation access.'],
      ['Do you make small bespoke basins for cloakrooms?', 'Yes. Compact made-to-measure porcelain basins can be designed for cloakrooms and small bathrooms, including wall-hung forms and basins integrated into a vanity.'],
    ]),
  ],
  'porcelain-fabrication-london/index.html': [
    ...common,
    page({
      url: `${siteUrl}/porcelain-fabrication-london/`,
      name: 'Porcelain Fabrication London',
      description:
        'Custom porcelain fabrication in London for mitred sinks, vanity tops, splashbacks, returns, slab cut-outs and connected bathroom surfaces.',
    }),
    service({
      url: `${siteUrl}/porcelain-fabrication-london/`,
      name: 'Porcelain Fabrication London',
      description:
        'Made-to-measure porcelain fabrication in London for mitred sinks, vanity tops, splashbacks, returns, slab cut-outs and connected bathroom surfaces.',
      serviceType: ['Porcelain fabrication', 'Mitred porcelain edges', 'Porcelain vanity tops', 'Bespoke bathroom surfaces'],
      image: `${siteUrl}/assets/images/services/porcelain-fabrication/mitred-porcelain-stone-sink-fabrication-london.webp`,
    }),
    breadcrumb([...servicesCrumb, { name: 'Porcelain Fabrication', url: `${siteUrl}/porcelain-fabrication-london/` }]),
    faq(`${siteUrl}/porcelain-fabrication-london/`, [
      ['What is porcelain fabrication?', 'Porcelain fabrication is the process of cutting, mitring and finishing large-format porcelain slabs into made-to-measure surfaces such as sinks, vanity tops, splashbacks, shelves, returns and bathroom panels.'],
      ['Can porcelain be fabricated into a sink?', 'Yes. Porcelain can be fabricated into mitred sinks, trough basins and vanity compositions when the slab, support, falls, waste position and edge details are planned correctly.'],
      ['What details are needed for a porcelain fabrication quote?', 'Useful details include dimensions, photos or drawings, the porcelain finish, sink or vanity layout, tap and waste positions, splashback height, return details and the project location.'],
      ['Is porcelain fabrication suitable for bathrooms and wet rooms?', 'Porcelain fabrication is well suited to bathrooms and wet rooms where the surface needs to be durable, water resistant and visually calm, with fewer separate components and cleaner transitions.'],
    ]),
  ],
  'large-format-tiling-london/index.html': [
    ...common,
    page({
      url: `${siteUrl}/large-format-tiling-london/`,
      name: 'Large Format Porcelain Tiling and Slabs London',
      description:
        'Large-format porcelain tiling and slab installation in London for bathrooms, floors, wet rooms, feature walls and architectural surfaces.',
    }),
    service({
      url: `${siteUrl}/large-format-tiling-london/`,
      name: 'Large Format Tiling London',
      description:
        'Large-format porcelain tile and slab installation for calm, refined bathrooms, floors, wet rooms, feature walls and architectural surfaces in London.',
      serviceType: ['Large format tiling', 'Large format porcelain slabs', 'Premium bathroom tiling'],
      image: `${siteUrl}/assets/images/services/large-format/large-format-porcelain-surfaces-hero.webp`,
    }),
    breadcrumb([...servicesCrumb, { name: 'Large Format Tiling', url: `${siteUrl}/large-format-tiling-london/` }]),
    faq(`${siteUrl}/large-format-tiling-london/`, [
      ['What should be prepared before large porcelain tile installation?', "The substrate, levels, tile layout, cuts, grout lines, edges and transitions should all be reviewed before installation begins. Industry guidance such as The Tile Association Tiling Guide and MAPEI's large-format ceramic tile installation manual also emphasises preparation and setting-out for reliable tiling work."],
      ['Are large format porcelain tiles suitable for smaller bathrooms?', 'Yes, when the layout is planned carefully. Fewer grout lines can help a smaller bathroom feel calmer and more continuous.'],
      ['Can large format tiling be used in wet rooms?', 'Yes, depending on the tile, substrate and installation details. Wet room areas need careful planning around falls, waterproofing, edges and drainage.'],
      ['Do you install feature walls and vanity areas?', 'Yes. We install large format porcelain across feature walls, vanity areas, bathroom surfaces and architectural details.'],
    ]),
  ],
  'wet-rooms-bathroom-tiling/index.html': [
    ...common,
    page({
      url: `${siteUrl}/wet-rooms-bathroom-tiling/`,
      name: 'Wet Room and Bathroom Tiling in London',
      description:
        'Specialist wet room and bathroom tiling in London using premium tiling, porcelain surfaces, planned waterproofing and careful setting out.',
    }),
    service({
      url: `${siteUrl}/wet-rooms-bathroom-tiling/`,
      name: 'Wet Rooms and Bathroom Tiling London',
      description:
        'Wet room and bathroom tiling for London interiors, including porcelain surfaces, waterproofing coordination, drainage planning and refined edge details.',
      serviceType: ['Wet rooms', 'Bathroom tiling', 'Porcelain bathroom surfaces'],
      image: `${siteUrl}/assets/images/services/wet-rooms/wet-room-porcelain-surfaces-hero.webp`,
    }),
    breadcrumb([...servicesCrumb, { name: 'Wet Rooms & Bathroom Tiling', url: `${siteUrl}/wet-rooms-bathroom-tiling/` }]),
    faq(`${siteUrl}/wet-rooms-bathroom-tiling/`, [
      ['How much does wet room tiling cost in London?', 'Wet room tiling costs in London depend on the room size, tile or porcelain format, substrate condition, tanking requirements, drainage details and finish level. Share dimensions and photos and we can advise on the right route.'],
      ['Do wet rooms need tanking?', 'Yes. Wet rooms need a suitable waterproofing system, often referred to as tanking, before tiling. Industry guidance notes that tiled surfaces are not a complete waterproof layer on their own, so the substrate and tanking system need to be planned together.'],
      ['How long does a wet room tiling project take?', 'Timelines vary by preparation, tanking, tile format, drying times and the complexity of cuts or details. A compact wet room may be quicker than a full luxury bathroom with large-format porcelain surfaces.'],
      ['Can large-format porcelain be used in wet rooms?', 'Yes, where the tile, substrate and layout are suitable. Large-format porcelain can create calmer wet room surfaces with fewer grout lines and cleaner visual flow.'],
    ]),
  ],
  'microcement-alternative-london/index.html': [
    ...common,
    page({
      url: `${siteUrl}/microcement-alternative-london/`,
      name: 'Microcement Alternative London',
      description:
        'Large-format porcelain surfaces as a microcement alternative for seamless-looking bathrooms, wet rooms and luxury interiors in London.',
    }),
    service({
      url: `${siteUrl}/microcement-alternative-london/`,
      name: 'Microcement Alternative London',
      description:
        'Large-format porcelain surfaces for London bathrooms and wet rooms where clients want a seamless-looking, durable alternative to microcement.',
      serviceType: ['Custom bathroom surfaces', 'Microcement alternative', 'Large format porcelain surfaces'],
      image: `${siteUrl}/assets/images/services/service-microcement-alternative.webp`,
    }),
    breadcrumb([...servicesCrumb, { name: 'Microcement Alternative', url: `${siteUrl}/microcement-alternative-london/` }]),
    faq(`${siteUrl}/microcement-alternative-london/`, [
      ['Is large-format porcelain a true microcement alternative?', "Large-format porcelain achieves a similar seamless, continuous look to microcement by using oversized slabs with minimal grout lines. The result is visually quiet without the hand-applied cement surface system, while keeping porcelain's durability and maintenance profile."],
      ['What does a microcement alternative cost in London?', 'Cost depends on slab size, finish, room dimensions, substrate preparation, waterproofing and the complexity of cuts and edge details. Share photos and dimensions and we can advise on the right route for the project.'],
      ['How long does large-format porcelain last compared with microcement?', 'Porcelain is generally rated for several decades when installed on a sound substrate, with no resealing required. Microcement typically needs periodic resealing and may need re-application or repair sooner where the surface sees heavy water, abrasion or movement.'],
      ['Can large-format porcelain be used in a wet room like microcement?', 'Yes. Porcelain is non-porous and well suited to wet rooms when the tanking, falls, drainage and edge details are planned correctly. The seamless look comes from large slab size and careful setting-out rather than from a hand-applied cement coating; The Tile Association Tiling Guide is a useful reference for the preparation principles behind reliable tiling work.'],
      ['Is porcelain easier to repair than microcement?', 'Individual porcelain slabs can be lifted and replaced if damaged, provided spare material is held. Microcement repairs usually involve patching, blending and resealing a wider area to keep the surface visually consistent.'],
    ]),
  ],
  'projects/index.html': [
    ...common,
    page({
      url: `${siteUrl}/projects/`,
      name: 'Porcelain Sink Projects and Studio Previews London',
      description:
        'A curated mix of completed bespoke porcelain sink projects and studio previews for porcelain fabrication, mitred edges and bathroom vanity tops in London.',
      type: 'CollectionPage',
    }),
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/projects/#project-list`,
      name: 'Selected bespoke sink projects and studio previews',
      itemListElement: projectItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          '@id': `${item.url}#creativework`,
          name: item.name,
          url: item.url,
          description: item.description,
          creator: { '@id': `${siteUrl}/#business` },
          image: {
            '@type': 'ImageObject',
            url: item.image,
            caption: item.name,
          },
        },
      })),
    },
    breadcrumb([...homeCrumb, { name: 'Projects', url: `${siteUrl}/projects/` }]),
    faq(`${siteUrl}/projects/`, [
      ['Do you create bespoke porcelain sinks in London?', 'Yes. We create made-to-measure porcelain sinks for bathrooms, cloakrooms and refined interiors across London.'],
      ['Can you install large-format porcelain tiles?', 'Yes. We install large-format porcelain tiles and surfaces with careful preparation, setting out, alignment and edge control.'],
      ['Can you work with porcelain supplied by the client?', 'In many cases, yes. We can review client-supplied porcelain, drawings and dimensions before confirming suitability.'],
      ['Do you handle wet room and bathroom tiling?', 'Yes. We handle wet rooms, bathrooms, vanity areas and porcelain feature spaces where waterproofing and finish need close coordination.'],
      ['How can I request a quote?', 'Use the quote form to share your project type, location, dimensions, photos and drawings. We will respond with next steps.'],
    ]),
  ],
  'studio/index.html': [
    ...common,
    page({
      url: `${siteUrl}/studio/`,
      name: 'Artiling Studio',
      description:
        'Studio page for Artiling Studio, a London-based specialist in bespoke porcelain sinks, porcelain fabrication and premium bathroom surface work.',
      type: 'AboutPage',
    }),
    breadcrumb([...homeCrumb, { name: 'Studio', url: `${siteUrl}/studio/` }]),
  ],
  'contact/index.html': [
    ...common,
    page({
      url: `${siteUrl}/contact/`,
      name: 'Contact Artiling Studio',
      description: 'Contact Artiling Studio for bespoke porcelain sink, tiling and bathroom surface enquiries in London.',
      type: 'ContactPage',
    }),
    breadcrumb([...homeCrumb, { name: 'Contact', url: `${siteUrl}/contact/` }]),
  ],
  'quote/index.html': [
    ...common,
    page({
      url: `${siteUrl}/quote/`,
      name: 'Request a Quote',
      description: 'Request a quote for bespoke porcelain sinks, porcelain fabrication, large-format tiling and wet room projects in London.',
    }),
    breadcrumb([...homeCrumb, { name: 'Quote', url: `${siteUrl}/quote/` }]),
  ],
  'privacy-policy/index.html': [
    ...common,
    page({
      url: `${siteUrl}/privacy-policy/`,
      name: 'Privacy Policy',
      description: 'Privacy policy for Artiling Studio.',
    }),
    breadcrumb([...homeCrumb, { name: 'Privacy Policy', url: `${siteUrl}/privacy-policy/` }]),
  ],
};

const toJsonLd = (graph) =>
  JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': dedupeGraph(graph),
    },
    null,
    2,
  )
    .split('\n')
    .map((line) => `      ${line}`)
    .join('\n');

function dedupeGraph(graph) {
  const seen = new Set();
  return graph.filter((node) => {
    const key = node['@id'] || `${node['@type']}:${node.name || node.url || JSON.stringify(node).slice(0, 80)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function injectSchema(filePath, graph) {
  const abs = join(root, filePath);
  let html = readFileSync(abs, 'utf8');
  const headMatch = html.match(/<head>[\s\S]*?<\/head>/i);
  if (!headMatch) throw new Error(`Missing <head> in ${filePath}`);

  const head = headMatch[0].replace(/\s*<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  const insertionPoint = head.search(/<link rel="preconnect"|<link rel="stylesheet"|<\/head>/i);
  const beforeSchema = head.slice(0, insertionPoint).trimEnd();
  const afterSchema = head.slice(insertionPoint).trimStart();
  const schema = `    <script type="application/ld+json" data-artiling-schema>\n${toJsonLd(graph)}\n    </script>`;
  const nextHead = `${beforeSchema}\n${schema}${'\n'.repeat(8)}    ${afterSchema}`;
  html = html.replace(headMatch[0], nextHead);
  writeFileSync(abs, html);
}

for (const [file, graph] of Object.entries(pageSchemas)) {
  injectSchema(file, graph);
}

console.log(`Updated structured data for ${Object.keys(pageSchemas).length} pages.`);
