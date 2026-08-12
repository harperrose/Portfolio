export type ContentBlock =
  | { _template: 'image'; src: string; alt?: string; caption?: string }
  | { _template: 'paragraph'; text: string }
  | {
      _template: 'doubleImage';
      left: string;
      right: string;
      leftCaption?: string;
      rightCaption?: string;
    }
  | {
      _template: 'gallery';
      items: Array<{ image: string; caption?: string }>;
    }
  | { _template: 'iframe'; src: string; height?: string }
  | {
      _template: 'beforeAfter';
      before: string;
      after: string;
      alt?: string;
      caption?: string;
    };

export type HomeGalleryLayout = 'single' | 'wide' | 'stack';

export type HomeGalleryItem =
  | { layout: 'single' | 'wide'; image: string }
  | { layout: 'stack'; imageTop: string; imageBottom: string };

export type ProjectPanel = {
  label: string;
  blocks: ContentBlock[];
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  quote?: string;
  summary?: string;
  heroDescription?: string;
  heroSecondaryDescription?: string;
  capabilities: string[];
  order?: number;
  draft?: boolean;
  hidden?: boolean;
  nextProjectSlug?: string;
  homeGallery?: HomeGalleryItem[];
  panels: ProjectPanel[];
};

export type ServiceItem = {
  title: string;
  image: string;
  url?: string;
  caseStudySlug?: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  order?: number;
  items: ServiceItem[];
};

export type SiteSettings = {
  infoHeroTitle: string;
  infoHeroImage?: string;
  homeIntroTitle?: string;
  homeBackgroundImage?: string;
  contactHeading?: string;
  contactEmail?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  colophonText?: string;
  colophonLinkText?: string;
  colophonLinkUrl?: string;
  copyrightText?: string;
  arenaUrl?: string;
  contactSuccessMessage?: string;
  capabilities: { label: string; anchorId: string }[];
};

export type SiteContent = {
  site: SiteSettings;
  projects: Project[];
  services: Service[];
};

export const CAPABILITIES_LIST = [
  'Product Design',
  'Digital Design',
  'Testing and Optimization',
  'Branding & Visual',
  'Web Development',
] as const;
