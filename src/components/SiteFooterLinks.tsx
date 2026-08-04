import type { SiteSettings } from '../types/content';

type SiteFooterLinksProps = {
  site: SiteSettings;
  className?: string;
};

export default function SiteFooterLinks({ site, className = '' }: SiteFooterLinksProps) {
  const email = site.contactEmail ?? 'info@harperdaniel.com';
  const arena = site.arenaUrl ?? 'https://www.are.na/harper-daniel/channels';

  return (
    <nav className={`site-footer-links${className ? ` ${className}` : ''}`}>
      <a href={`mailto:${email}`} className="site-footer-link">
        {email}
      </a>
      <a href={arena} className="site-footer-link" target="_blank" rel="noreferrer">
        Are.na
      </a>
    </nav>
  );
}
