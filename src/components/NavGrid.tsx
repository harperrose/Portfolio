import { Link } from 'react-router-dom';
import type { Project, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';

type NavGridProps = {
  site: SiteSettings;
  variant?: 'home' | 'info';
  projects?: Project[];
  activeProjectId?: string | null;
  activeProject?: Project | null;
  capabilitiesList?: string[];
};

export default function NavGrid({
  site,
  variant = 'info',
  projects = [],
  activeProjectId = null,
  activeProject = null,
  capabilitiesList = [],
}: NavGridProps) {
  if (variant === 'home') {
    const description = activeProject?.quote?.trim() || activeProject?.summary?.trim() || '';
    const services = capabilitiesList.length
      ? capabilitiesList
      : site.capabilities.map((cap) => cap.label);
    const activeCaps = activeProject?.capabilities ?? [];

    return (
      <div
        id="hd-grid"
        className={`hd-nav-home${activeProjectId ? ' is-visible' : ''}`}
      >
        <div className="hd-col hd-col-projects" id="hd-col-projects">
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

        <div className="hd-col hd-col-desc" id="hd-col-desc">
          <p className={`hd-project-desc${description ? ' is-visible' : ''}`}>{description}</p>
        </div>

        <div className="hd-col hd-col-services" id="hd-col-services">
          <ul id="hd-capabilities-list">
            {services.map((cap) => (
              <li
                key={cap}
                data-cap={cap}
                className={activeCaps.includes(cap) ? 'hd-active' : ''}
              >
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
