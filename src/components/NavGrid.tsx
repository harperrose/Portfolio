import { Link, useLocation } from 'react-router-dom';
import type { Project, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';
import ContactForm from './ContactForm';

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
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isInfo = location.pathname === '/info';
  const showQuote = variant === 'home' && activeProjectId;
  const homeCapabilities = capabilitiesList ?? site.capabilities.map((cap) => cap.label);

  return (
    <div id="hd-grid" className={variant === 'home' ? 'hd-nav-home' : 'hd-nav-info'}>
      <div className="hd-col" id="hd-col-nav">
        <Link to="/" className="nav-link" style={isHome ? { color: 'white' } : undefined}>
          Work
        </Link>
        <Link to="/info" className="nav-link" style={isInfo ? { color: 'white' } : undefined}>
          Info
        </Link>
      </div>

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

      <div className="hd-col" id="hd-col-right">
        {variant === 'home' ? (
          <>
            <div id="hd-quote" className={showQuote ? 'state-on' : 'state-off'}>
              {activeProjectQuote}
            </div>
            <div id="hd-contact" className={showQuote ? 'state-off' : 'state-on'}>
              <ContactForm compact arenaUrl={site.arenaUrl} />
            </div>
          </>
        ) : (
          <a href="#contact" className="nav-link" style={{ color: 'white' }}>
            Contact
          </a>
        )}
      </div>
    </div>
  );
}
