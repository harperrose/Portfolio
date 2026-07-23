import type { ContentBlock, Project } from '../types/content';

export type HomeCard =
  | { kind: 'single'; slug: string; projectId: string; image: string; size: 'narrow' | 'wide' }
  | { kind: 'stack'; slug: string; projectId: string; images: [string, string] };

const LAYOUT_PATTERN = [
  'narrow',
  'stack',
  'narrow',
  'wide',
  'stack',
  'narrow',
  'narrow',
  'narrow',
] as const;

function collectProjectImages(project: Project): string[] {
  const images: string[] = [];

  if (project.coverImage) images.push(project.coverImage);

  for (const panel of project.panels) {
    for (const block of panel.blocks) {
      if (block._template === 'image') images.push(block.src);
      if (block._template === 'doubleImage') {
        images.push(block.left, block.right);
      }
    }
  }

  return [...new Set(images.filter(Boolean))];
}

export function buildHomeGallery(projects: Project[]): HomeCard[] {
  const pool = projects.flatMap((project) =>
    collectProjectImages(project).map((image) => ({
      slug: project.slug,
      projectId: project.id,
      image,
    })),
  );

  const cards: HomeCard[] = [];
  let poolIndex = 0;
  let patternIndex = 0;

  while (poolIndex < pool.length) {
    const pattern = LAYOUT_PATTERN[patternIndex % LAYOUT_PATTERN.length];
    patternIndex += 1;

    if (pattern === 'stack') {
      const top = pool[poolIndex++];
      if (!top) break;
      const bottom = pool[poolIndex] ?? top;
      if (pool[poolIndex]) poolIndex += 1;
      cards.push({
        kind: 'stack',
        slug: top.slug,
        projectId: top.projectId,
        images: [top.image, bottom.image],
      });
      continue;
    }

    const item = pool[poolIndex++];
    if (!item) break;

    cards.push({
      kind: 'single',
      slug: item.slug,
      projectId: item.projectId,
      image: item.image,
      size: pattern === 'wide' ? 'wide' : 'narrow',
    });
  }

  return cards;
}

export function getPanelParagraphs(blocks: ContentBlock[]): string[] {
  return blocks
    .filter((block): block is Extract<ContentBlock, { _template: 'paragraph' }> => block._template === 'paragraph')
    .map((block) => block.text);
}

export function getPanelMediaBlocks(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.filter((block) => block._template !== 'paragraph');
}
