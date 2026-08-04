import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Project, Service, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';
import SiteNav from '../components/SiteNav';
import SiteFooterLinks from '../components/SiteFooterLinks';
import ServiceCarousel from '../components/ServiceCarousel';

type InfoPageProps = {
  projects: Project[];
  services: Service[];
  site: SiteSettings;
};

export default function InfoPage({ projects, services, site }: InfoPageProps) {
  useEffect(() => {
    document.body.classList.add('body-6', 'info-route');
    return () => {
      document.body.classList.remove('body-6', 'info-route');
    };
  }, []);

  const nextProject = projects[0];

  return (
    <div className="info-page">
      <SiteNav contactHref={`mailto:${site.contactEmail ?? 'info@harperdaniel.com'}`} />

      <div className="title-nav-wrap _65vh">
        <div className="title-wrap grid">
          <p className="title">{site.infoHeroTitle}</p>
          {site.infoHeroImage ? (
            <img
              src={site.infoHeroImage}
              srcSet="/images/baby-p-500.webp 500w, /images/baby-p-800.webp 800w, /images/baby.webp 828w"
              sizes="(max-width: 700px) 100vw, min(42vw, 500px)"
              loading="lazy"
              alt=""
              className="image-5"
            />
          ) : null}
        </div>
      </div>

      <div className="info-wrap">
        <div className="dropdown-content into">
          {services.map((service) => (
            <section key={service.id} id={service.slug} className="service-item">
              <h4 className="heading">
                <a href={`#${service.slug}`} className="link-unstyled underlined">
                  {service.title}
                </a>
              </h4>
              <div className="link-unstyled _2-grid-cols">{service.description}</div>
              <ServiceCarousel items={service.items} />
            </section>
          ))}
        </div>
      </div>

      <section id="contact" className="contact-contact info-contact-section">
        <div className="contact-heading info-contact-heading">
          <h1 className="centered-heading">{site.contactHeading}</h1>
        </div>

        <div className="info-contact-static div-block-7">
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
            <SiteFooterLinks site={site} className="info-footer-links" />
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
            <span className="navigation-text">{site.copyrightText}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
