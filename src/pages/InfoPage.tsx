import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Project, Service, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';
import NavGrid from '../components/NavGrid';
import ServiceCarousel from '../components/ServiceCarousel';
import ContactForm from '../components/ContactForm';

type InfoPageProps = {
  projects: Project[];
  services: Service[];
  site: SiteSettings;
};

export default function InfoPage({ projects, services, site }: InfoPageProps) {
  useEffect(() => {
    const capList = document.getElementById('hd-capabilities-list');
    if (!capList) return;

    const capItems = capList.querySelectorAll('li');
    const uniqueTargets = [...new Set(site.capabilities.map((cap) => cap.anchorId))];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          capItems.forEach((li) => li.classList.remove('hd-active'));
          document
            .querySelectorAll(`#hd-capabilities-list li[data-target-id="${entry.target.id}"]`)
            .forEach((li) => li.classList.add('hd-active'));
        });
      },
      { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    uniqueTargets.forEach((targetId) => {
      const section = document.getElementById(targetId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [site.capabilities]);

  const nextProject = projects[0];

  return (
    <div className="body-6">
      <div className="title-nav-wrap _65vh">
        <div className="title-wrap grid">
          <p className="title">{site.infoHeroTitle}</p>
          {site.infoHeroImage ? (
            <img src={site.infoHeroImage} loading="lazy" height={500} alt="" className="image-5" />
          ) : null}
        </div>
      </div>

      <div className="info-wrap">
        <div className="code-embed w-embed w-script">
          <NavGrid projects={projects} site={site} variant="info" />
        </div>

        <div className="dropdown-content into">
          {services.map((service) => (
            <section key={service.id} id={service.slug} className="service-item">
              <h4 className="heading">{service.title}</h4>
              <div className="link-unstyled _2-grid-cols">{service.description}</div>
              <ServiceCarousel items={service.items} />
            </section>
          ))}
        </div>
      </div>

      <section id="contact" className="contact-contact">
        <div className="contact-heading">
          <h1 className="centered-heading">{site.contactHeading}</h1>
        </div>
        <div className="div-block-7">
          <div className="navigation-item footer">
            <a href="#" className="navigation-text centered">
              Colophon
            </a>
            <div className="navigation-text">
              {site.colophonText}
              {site.colophonLinkUrl && site.colophonLinkText ? (
                <>
                  <br />
                  <br />
                  Before the domain was mine it was{' '}
                  <a href={site.colophonLinkUrl} className="navigation-text underlined">
                    {site.colophonLinkText}
                  </a>
                </>
              ) : null}
            </div>
          </div>
          <div className="navigation-item footer">
            {nextProject ? (
              <Link to={projectUrl(nextProject.slug)} className="w-inline-block">
                <p className="navigation-text centered">Next Project</p>
                <img loading="lazy" src={nextProject.coverImage} alt="" className="image-full-width" />
                <p className="navigation-text padding-top">{nextProject.title}</p>
                <div className="dividing-line" />
              </Link>
            ) : null}
            {projects.map((project) => (
              <Link key={project.id} to={projectUrl(project.slug)} className="navigation-text">
                {project.title}
              </Link>
            ))}
          </div>
          <div className="navigation-item footer">
            <Link to="/" className="navigation-text">
              Work
            </Link>
            <a href="#" className="navigation-text">
              {site.copyrightText}
            </a>
          </div>
          <ContactForm arenaUrl={site.arenaUrl} successMessage={site.contactSuccessMessage} />
        </div>
      </section>
    </div>
  );
}
