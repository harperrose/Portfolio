import { useEffect, useRef, useState } from 'react';
import type { SiteSettings } from '../types/content';

type ContactMenuProps = {
  site: SiteSettings;
  buttonClassName?: string;
  variant?: 'home' | 'nav';
};

export default function ContactMenu({
  site,
  buttonClassName = '',
  variant = 'nav',
}: ContactMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const email = site.contactEmail ?? 'info@harperdaniel.com';
  const arena = site.arenaUrl ?? 'https://www.are.na/harper-daniel/channels';
  const instagram = site.instagramUrl ?? 'https://www.instagram.com/harper__daniel/';

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const linkClass = buttonClassName || 'site-nav-link';

  return (
    <div
      ref={menuRef}
      className={`contact-menu contact-menu--${variant}${open ? ' is-open' : ''}`}
    >
      {open ? (
        <div className="contact-menu-links">
          <a href={`mailto:${email}`} className={`${linkClass} contact-menu-link`}>
            Email
          </a>
          <a href={arena} className={`${linkClass} contact-menu-link`} target="_blank" rel="noreferrer">
            Are.na
          </a>
          <a href={instagram} className={`${linkClass} contact-menu-link`} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      ) : (
        <button
          type="button"
          className={`contact-menu-toggle ${linkClass}`}
          onClick={() => setOpen(true)}
          aria-expanded={false}
        >
          Contact
        </button>
      )}
    </div>
  );
}
