import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/content';
import { getProjectBySlug, projectUrl } from '../lib/content';
import PanelRenderer from '../components/PanelRenderer';
import ContactForm from '../components/ContactForm';

type CaseStudyPageProps = {
  project: Project;
  allProjects: Project[];
};

export default function CaseStudyPage({ project, allProjects }: CaseStudyPageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const panels = project.panels.length
    ? project.panels
    : [{ label: 'Overview', blocks: [] }];
  const activePanel = panels[activeTab] ?? panels[0];
  const nextProject = project.nextProjectSlug
    ? getProjectBySlug(project.nextProjectSlug)
    : allProjects.find((p) => p.slug !== project.slug);

  return (
    <>
      <div data-current={`Tab ${activeTab + 1}`} className="tab-panels w-tabs">
        <div className="flex row is-tabs w-tab-menu">
          {panels.map((panel, index) => (
            <button
              key={panel.label}
              type="button"
              className={`navigation-item w-inline-block w-tab-link${
                index === activeTab ? ' w--current' : ''
              }`}
              onClick={() => setActiveTab(index)}
            >
              <div>{panel.label}</div>
            </button>
          ))}
        </div>
        <div className="tabs-content-2 w-tab-content">
          <div className="w-tab-pane w--tab-active">
            <PanelRenderer
              blocks={activePanel.blocks}
              title={project.title}
              summary={project.summary}
            />
          </div>
        </div>
      </div>

      <div className="div-block-6">
        <div className="navigation-item _2col work-info">
          <Link to="/" className="navigation-text name">
            Harper Daniel
          </Link>
          <Link to="/info" className="navigation-text">
            Info
          </Link>
          <a href="#contact" className="navigation-text">
            Contact
          </a>
        </div>
      </div>

      {nextProject ? (
        <div className="next-project">
          <Link to={projectUrl(nextProject.slug)} className="next-project-link w-inline-block">
            <img loading="lazy" alt="" src={nextProject.coverImage} className="next-project-image" />
            <div className="text-block-15">Next Project</div>
            <h1 className="heading-9">{nextProject.title}</h1>
          </Link>
        </div>
      ) : null}

      <div id="1800-contact-me" className="footer-contact div-block-11">
        <ContactForm />
      </div>
    </>
  );
}
