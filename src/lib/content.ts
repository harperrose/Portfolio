import { parse as parseYaml } from 'yaml';
import siteJson from '../../content/site/settings.json';
import type {
  ContentBlock,
  Project,
  ProjectPanel,
  Service,
  ServiceItem,
  SiteContent,
  SiteSettings,
} from '../types/content';

const projectFiles = import.meta.glob('../../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const serviceFiles = import.meta.glob('../../content/services/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): Record<string, unknown> {
  if (!raw.startsWith('---')) return {};
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return {};
  const yamlText = raw.slice(4, end);
  const parsed = parseYaml(yamlText);
  return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
}

function refToSlug(ref?: string): string | undefined {
  if (!ref) return undefined;
  const match = ref.match(/content\/projects\/(.+)\.md$/);
  return match?.[1];
}

function idFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/);
  return match?.[1] ?? path;
}

function normalizeBlocks(blocks: unknown): ContentBlock[] {
  if (!Array.isArray(blocks)) return [];
  return blocks.filter(Boolean) as ContentBlock[];
}

function normalizePanels(panels: unknown): ProjectPanel[] {
  if (!Array.isArray(panels)) return [];
  return panels.map((panel) => ({
    label: String((panel as ProjectPanel).label ?? 'Panel'),
    blocks: normalizeBlocks((panel as ProjectPanel).blocks),
  }));
}

function normalizeProject(raw: Record<string, unknown>, path: string): Project {
  return {
    id: idFromPath(path),
    title: String(raw.title ?? ''),
    slug: String(raw.slug ?? idFromPath(path)),
    coverImage: String(raw.coverImage ?? ''),
    quote: raw.quote ? String(raw.quote) : undefined,
    summary: raw.summary ? String(raw.summary) : undefined,
    capabilities: Array.isArray(raw.capabilities)
      ? raw.capabilities.map(String)
      : [],
    order: typeof raw.order === 'number' ? raw.order : undefined,
    draft: raw.draft === true,
    hidden: raw.hidden === true,
    nextProjectSlug: refToSlug(raw.nextProject as string | undefined),
    panels: normalizePanels(raw.panels),
  };
}

function normalizeServiceItem(item: Record<string, unknown>): ServiceItem {
  return {
    title: String(item.title ?? ''),
    image: String(item.image ?? ''),
    url: item.url ? String(item.url) : undefined,
    caseStudySlug: refToSlug(item.caseStudy as string | undefined),
  };
}

function normalizeService(raw: Record<string, unknown>, path: string): Service {
  const items = Array.isArray(raw.items)
    ? raw.items.map((item) => normalizeServiceItem(item as Record<string, unknown>))
    : [];

  return {
    id: idFromPath(path),
    title: String(raw.title ?? ''),
    slug: String(raw.slug ?? idFromPath(path)),
    description: raw.description ? String(raw.description) : undefined,
    order: typeof raw.order === 'number' ? raw.order : undefined,
    items,
  };
}

function loadProjects(): Project[] {
  return Object.entries(projectFiles)
    .map(([path, raw]) => normalizeProject(parseFrontmatter(raw), path))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

function loadServices(): Service[] {
  return Object.entries(serviceFiles)
    .map(([path, raw]) => normalizeService(parseFrontmatter(raw), path))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

let cachedContent: SiteContent | null = null;

export function getSiteContent(): SiteContent {
  if (cachedContent) return cachedContent;

  cachedContent = {
    site: siteJson as SiteSettings,
    projects: loadProjects(),
    services: loadServices(),
  };

  return cachedContent;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getSiteContent().projects.find((project) => project.slug === slug);
}

export function isProjectListed(project: Project): boolean {
  return !project.draft && !project.hidden;
}

export function getListedProjects(): Project[] {
  return getSiteContent().projects.filter(isProjectListed);
}

export function resolveNextProject(project: Project): Project | undefined {
  const projects = getSiteContent().projects;
  const visited = new Set<string>();
  let slug = project.nextProjectSlug;

  while (slug && !visited.has(slug)) {
    visited.add(slug);
    const candidate = projects.find((entry) => entry.slug === slug);
    if (!candidate || candidate.draft) return undefined;
    if (isProjectListed(candidate)) return candidate;
    slug = candidate.nextProjectSlug;
  }

  return getListedProjects().find((entry) => entry.slug !== project.slug);
}

export function projectUrl(slug: string): string {
  return `/${slug}`;
}

export function resolveItemUrl(item: ServiceItem): string {
  if (item.caseStudySlug) {
    const project = getProjectBySlug(item.caseStudySlug);
    if (project && !project.draft) return projectUrl(item.caseStudySlug);
  }
  return item.url ?? '#';
}
