import { Link } from 'react-router-dom';
import type { Project, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';

type NavGridProps = {
  site: SiteSettings;
  variant?: 'home' | 'info';
  activeProject?: Project | null;
};

export default function NavGrid({
  site,
  variant = 'info',
  activeProject = null,
}: NavGridProps) {
  if (variant === 'home') {
    const description = activeProject?.quote?.trim() || activeProject?.summary?.trim() || '';

    return (
      <div id="hd-grid" className="hd-nav-home">
        <div className="hd-col hd-col-title" id="hd-col-title">
          {activeProject ? (
            <Link to={projectUrl(activeProject.slug)} className="hd-project-title">
              {activeProject.title}
            </Link>
          ) : null}
        </div>

        <div className="hd-col hd-col-desc" id="hd-col-desc">
          <p className={`hd-project-desc${description ? ' is-visible' : ''}`}>{description}</p>
        </div>

        <div className="hd-col hd-col-services" id="hd-col-services">
          <ul id="hd-capabilities-list">
            {(activeProject?.capabilities ?? []).map((cap) => (
              <li key={cap} data-cap={cap}>
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div id="hd-grid" className="hd-nav-info">
      <div className="hd-col" id="hd-col-nav">
        <Link to="/" className="nav-link">
          Work
        </Link>
        <Link to="/info" className="nav-link" style={{ color: 'white' }}>
          Info
        </Link>
      </div>
    </div>
  );
}
