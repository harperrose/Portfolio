export type ContentBlock =
  | { _template: 'image'; src: string; alt?: string }
  | { _template: 'paragraph'; text: string }
  | { _template: 'doubleImage'; left: string; right: string }
  | { _template: 'iframe'; src: string; height?: string }
  | { _template: 'beforeAfter'; before: string; after: string; alt?: string };

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
  capabilities: string[];
  order?: number;
  draft?: boolean;
  hidden?: boolean;
  nextProjectSlug?: string;
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
