import { Link } from 'react-router-dom';
import type { Project, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';

type NavGridProps = {
  projects: Project[];
  site: SiteSettings;
  variant?: 'home' | 'info';
  activeProjectId?: string | null;
  activeCapabilities?: string[];
  activeProjectQuote?: string;
  capabilitiesList?: string[];
};

export default function NavGrid({
  projects,
  site,
  variant = 'info',
  activeProjectId = null,
  activeCapabilities = [],
  activeProjectQuote,
  capabilitiesList,
}: NavGridProps) {
  const homeCapabilities = capabilitiesList ?? site.capabilities.map((cap) => cap.label);
  const quote = activeProjectQuote?.trim();

  return (
    <div id="hd-grid" className={variant === 'home' ? 'hd-nav-home' : 'hd-nav-info'}>
      {variant === 'info' ? (
        <div className="hd-col" id="hd-col-nav">
          <Link to="/" className="nav-link">
            Work
          </Link>
          <Link to="/info" className="nav-link" style={{ color: 'white' }}>
            Info
          </Link>
        </div>
      ) : null}

      <div className="hd-col" id="hd-col-projects">
        <ul id="hd-projects-list" className="hd-projects-inline">
          {projects.map((project) => (
            <li
              key={project.id}
              data-project-id={project.id}
              className={activeProjectId === project.id ? 'hd-current' : ''}
            >
              <Link to={projectUrl(project.slug)}>{project.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="hd-col" id="hd-col-capabilities">
        <ul id="hd-capabilities-list">
          {variant === 'home'
            ? homeCapabilities.map((cap) => (
                <li
                  key={cap}
                  data-cap={cap}
                  className={activeCapabilities.includes(cap) ? 'hd-active' : ''}
                >
                  {cap}
                </li>
              ))
            : site.capabilities.map((cap) => (
                <li
                  key={`${cap.label}-${cap.anchorId}`}
                  data-target-id={cap.anchorId}
                  className={activeCapabilities.includes(cap.label) ? 'hd-active' : ''}
                >
                  <Link to={`/info#${cap.anchorId}`}>{cap.label}</Link>
                </li>
              ))}
        </ul>
      </div>

      <div className="hd-col hd-col-right" id="hd-col-right">
        {variant === 'home' ? (
          <div id="hd-quote" className={quote ? 'state-on' : 'state-off'}>
            {quote}
          </div>
        ) : (
          <a href={`mailto:${site.contactEmail ?? 'info@harperdaniel.com'}`} className="nav-link" style={{ color: 'white' }}>
            Contact
          </a>
        )}
      </div>
    </div>
  );
}
