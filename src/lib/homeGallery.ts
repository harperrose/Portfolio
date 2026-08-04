import type { ContentBlock, HomeGalleryItem, Project } from '../types/content';

export type HomeCard =
  | { kind: 'single'; slug: string; projectId: string; image: string; size: 'narrow' | 'wide' }
  | { kind: 'stack'; slug: string; projectId: string; images: [string, string] };

function itemToCard(
  item: HomeGalleryItem,
  slug: string,
  projectId: string,
): HomeCard | null {
  if (item.layout === 'stack') {
    return {
      kind: 'stack',
      slug,
      projectId,
      images: [item.imageTop, item.imageBottom],
    };
  }

  return {
    kind: 'single',
    slug,
    projectId,
    image: item.image,
    size: item.layout === 'wide' ? 'wide' : 'narrow',
  };
}

function fallbackCards(projects: Project[]): HomeCard[] {
  return projects
    .filter((project) => project.coverImage)
    .map((project) => ({
      kind: 'single' as const,
      slug: project.slug,
      projectId: project.id,
      image: project.coverImage,
      size: 'narrow' as const,
    }));
}

export function buildHomeGallery(projects: Project[]): HomeCard[] {
  const cards = projects.flatMap((project) =>
    (project.homeGallery ?? [])
      .map((item) => itemToCard(item, project.slug, project.id))
      .filter((card): card is HomeCard => card !== null),
  );

  return cards.length ? cards : fallbackCards(projects);
}

export function getPanelParagraphs(blocks: ContentBlock[]): string[] {
  return blocks
    .filter((block): block is Extract<ContentBlock, { _template: 'paragraph' }> => block._template === 'paragraph')
    .map((block) => block.text);
}

export function getPanelMediaBlocks(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.filter((block) => block._template !== 'paragraph');
}
