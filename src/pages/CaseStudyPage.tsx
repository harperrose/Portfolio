import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project, SiteSettings } from '../types/content';
import { resolveNextProject, projectUrl } from '../lib/content';
import SiteNav from '../components/SiteNav';
import CaseStudySection from '../components/CaseStudySection';
import ContactForm from '../components/ContactForm';

type CaseStudyPageProps = {
  project: Project;
  site: SiteSettings;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function CaseStudyPage({ project, site }: CaseStudyPageProps) {
  const panels = project.panels.length ? project.panels : [{ label: 'Overview', blocks: [] }];
  const nextProject = resolveNextProject(project);

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState<number[]>(() => panels.map(() => 0));

  const sectionMeta = useMemo(
    () =>
      panels.map((panel, index) => ({
        title: index === 0 ? project.title : panel.label,
        intro: index === 0 ? project.summary : undefined,
        blocks: panel.blocks,
      })),
    [panels, project.summary, project.title],
  );

  const updateScrollState = useCallback(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const scrollY = window.scrollY;
    const viewportAnchor = scrollY + window.innerHeight * 0.28;
    const navOffset = 120;

    let nextActive = 0;
    for (let index = 0; index < sections.length; index += 1) {
      const section = sections[index];
      if (section.offsetTop - navOffset <= viewportAnchor) {
        nextActive = index;
      }
    }

    const progress = sections.map((section) => {
      const sectionTop = section.offsetTop - navOffset;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (viewportAnchor <= sectionTop) return 0;
      if (viewportAnchor >= sectionBottom) return 1;
      return clamp((viewportAnchor - sectionTop) / Math.max(section.offsetHeight, 1));
    });

    setActiveIndex(nextActive);
    setSegmentProgress(progress);
  }, []);

  useEffect(() => {
    document.body.classList.add('body-6', 'case-study-route');
    return () => {
      document.body.classList.remove('body-6', 'case-study-route');
    };
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, sectionMeta.length]);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (!section) return;
    window.scrollTo({
      top: Math.max(section.offsetTop - 72, 0),
      behavior: 'smooth',
    });
  };

  return (
    <div className="case-study-page">
      <SiteNav
        projectTitle={project.title}
        panels={panels}
        activeIndex={activeIndex}
        segmentProgress={segmentProgress}
        onSectionClick={scrollToSection}
      />

      <main className="cs-main">
        {sectionMeta.map((section, index) => (
          <CaseStudySection
            key={`${section.title}-${index}`}
            ref={(node) => {
              sectionRefs.current[index] = node;
            }}
            index={index}
            title={section.title}
            intro={section.intro}
            blocks={section.blocks}
          />
        ))}
      </main>

      {nextProject ? (
        <div className="next-project">
          <Link to={projectUrl(nextProject.slug)} className="next-project-link w-inline-block">
            <img loading="lazy" alt="" src={nextProject.coverImage} className="next-project-image" />
            <div className="next-project-copy">
              <div className="text-block-15">Next Project</div>
              <h1 className="heading-9">{nextProject.title}</h1>
            </div>
          </Link>
        </div>
      ) : null}

      <div id="1800-contact-me" className="footer-contact div-block-11">
        <ContactForm arenaUrl={site.arenaUrl} />
        <div className="navigation-item footer">
          <a href="#" className="navigation-text centered">
            Colophon
          </a>
          <span className="navigation-text">
            {site.colophonText}
            {site.colophonLinkText ? (
              <>
                <br />
                <br />
                Before the domain was mine it was {site.colophonLinkText}
              </>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}
