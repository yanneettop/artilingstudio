import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', 'dist', 'node_modules']);

const collectHtml = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtml(fullPath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath);
  }
  return files;
};

const exists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const htmlFiles = await collectHtml(root);
const htmlCache = new Map();
const issues = [];

for (const sourceFile of htmlFiles) {
  const sourceHtml = await readFile(sourceFile, 'utf8');
  const links = [...sourceHtml.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)];

  for (const [, rawHref] of links) {
    if (/^(?:https?:|mailto:|tel:|sms:|javascript:)/i.test(rawHref)) continue;
    if (rawHref === '#') continue;

    const [rawPath, fragment = ''] = rawHref.split('#', 2);
    const linkPath = rawPath.split('?', 1)[0];
    const decodedPath = decodeURIComponent(linkPath || path.relative(root, sourceFile).replaceAll('\\', '/'));
    let targetFile;

    if (!linkPath) {
      targetFile = sourceFile;
    } else if (decodedPath.startsWith('/')) {
      const relativeTarget = decodedPath.replace(/^\/+/, '');
      targetFile = decodedPath.endsWith('/')
        ? path.join(root, relativeTarget, 'index.html')
        : path.join(root, relativeTarget);
    } else {
      const absoluteTarget = path.resolve(path.dirname(sourceFile), decodedPath);
      targetFile = decodedPath.endsWith('/') ? path.join(absoluteTarget, 'index.html') : absoluteTarget;
    }

    if (!path.extname(targetFile)) {
      const directoryIndex = path.join(targetFile, 'index.html');
      if (await exists(directoryIndex)) targetFile = directoryIndex;
    }

    if (!await exists(targetFile)) {
      issues.push(`${path.relative(root, sourceFile)} -> ${rawHref} (missing page)`);
      continue;
    }

    if (fragment && targetFile.endsWith('.html')) {
      const targetHtml = htmlCache.get(targetFile) || await readFile(targetFile, 'utf8');
      htmlCache.set(targetFile, targetHtml);
      const escapedFragment = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\bid=["']${escapedFragment}["']`, 'i').test(targetHtml)) {
        issues.push(`${path.relative(root, sourceFile)} -> ${rawHref} (missing anchor)`);
      }
    }
  }
}

if (issues.length) {
  console.error(`Internal link audit found ${issues.length} issue(s):\n${issues.join('\n')}`);
  process.exit(1);
}

console.log(`Internal link audit passed across ${htmlFiles.length} source pages.`);
