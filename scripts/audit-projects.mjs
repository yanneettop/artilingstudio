import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.join(root, 'projects');
const siteUrl = 'https://www.artilingstudio.co.uk';
const context = { window: {} };
vm.createContext(context);
vm.runInContext(await readFile(path.join(root, 'assets/js/portfolio-data.js'), 'utf8'), context);
const projects = context.window.ArtilingPortfolioProjects;
const featuredSlugs = context.window.ArtilingPortfolio.projectsFeaturedSlugs;
const projectsJs = await readFile(path.join(root, 'assets/js/projects.js'), 'utf8');
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const failures = [];
const rows = [];
const titles = new Map();
const descriptions = new Map();
const capture = (html, pattern) => html.match(pattern)?.[1]?.trim() || '';
const addUnique = (map, value, slug, label) => {
  if (!value) return;
  if (map.has(value)) failures.push(`${slug}: duplicate ${label} with ${map.get(value)}`);
  map.set(value, slug);
};

const directories = (await readdir(projectRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory());
if (directories.length !== projects.length) failures.push(`Expected ${projects.length} project directories; found ${directories.length}`);

for (const project of projects) {
  const slug = project.slug;
  const file = path.join(projectRoot, slug, 'index.html');
  const html = await readFile(file, 'utf8');
  const title = capture(html, /<title>([\s\S]*?)<\/title>/i);
  const meta = capture(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/i);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const expectedCanonical = `${siteUrl}/projects/${slug}/`;
  const isStudy = /<p class="eyebrow">Design study/i.test(html);
  const inGrid = featuredSlugs.includes(slug) || projectsJs.includes(`'${slug}'`);
  const checks = {
    title: Boolean(title),
    meta: meta.length >= 110 && meta.length <= 165,
    canonical: canonical === expectedCanonical,
    h1: h1Count === 1,
    og: /property="og:title"/i.test(html) && /property="og:description"/i.test(html) && /property="og:image"/i.test(html),
    lang: /<html lang="en-GB">/i.test(html),
    indexable: !/noindex/i.test(html),
    breadcrumb: /"@type":\s*"BreadcrumbList"/i.test(html),
    allProjects: /class="project-pagination__all" href="\/projects\/"/i.test(html),
    sitemap: sitemap.includes(`<loc>${expectedCanonical}</loc>`),
    grid: inGrid,
  };
  for (const [name, ok] of Object.entries(checks)) if (!ok) failures.push(`${slug}: ${name} check failed${name === 'meta' ? ` (${meta.length} chars)` : ''}`);
  addUnique(titles, title, slug, 'title');
  addUnique(descriptions, meta, slug, 'meta description');

  for (const href of [...html.matchAll(/href="(\/projects\/[^"#?]+\/?)"/g)].map((match) => match[1])) {
    const target = path.join(root, href.replace(/^\//, ''), href.endsWith('/') ? 'index.html' : '');
    try { await access(target); } catch { failures.push(`${slug}: broken project link ${href}`); }
  }
  for (const src of [...html.matchAll(/(?:src|href)="(\/public\/projects\/[^"?]+)"/g)].map((match) => match[1])) {
    try { await access(path.join(root, src.replace(/^\//, ''))); } catch { failures.push(`${slug}: missing image ${src}`); }
  }
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(block[1]); } catch { failures.push(`${slug}: invalid JSON-LD`); }
  }
  rows.push({ title: project.title, type: isStudy ? 'Design study' : 'Completed project', grid: inGrid ? 'Yes' : 'No', metadata: checks.title && checks.meta && checks.canonical ? 'Pass' : 'Fail' });
}

console.table(rows);
if (failures.length) {
  console.error(`\nProject audit failed (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`\nProject audit passed for ${rows.length} detail pages.`);
}
