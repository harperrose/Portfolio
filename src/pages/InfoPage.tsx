import { useEffect } from 'react';
import type { Service, SiteSettings } from '../types/content';
import SiteNav from '../components/SiteNav';
import ServiceCarousel from '../components/ServiceCarousel';

type InfoPageProps = {
  services: Service[];
  site: SiteSettings;
};

export default function InfoPage({ services, site }: InfoPageProps) {
  const farewellBg = site.homeBackgroundImage ?? '/images/background.png';

  useEffect(() => {
    document.body.classList.add('body-6', 'info-route');
    return () => {
      document.body.classList.remove('body-6', 'info-route');
    };
  }, []);

  return (
    <div className="info-page">
      <SiteNav site={site} hideInfo />

      <div className="title-nav-wrap _65vh">
        <div className="title-wrap grid info-hero">
          <p className="title info-hero-title">{site.infoHeroTitle}</p>
        </div>
      </div>

      <div className="info-wrap">
        <div className="dropdown-content into">
          {services.map((service) => (
            <section key={service.id} id={service.slug} className="service-item">
              <h4 className="heading">{service.title}</h4>
              <div className="link-unstyled _2-grid-cols service-description">{service.description}</div>
              <ServiceCarousel items={service.items} />
            </section>
          ))}
        </div>
      </div>

      <section className="info-colophon">
        <div className="info-colophon-inner">
          <span className="navigation-text">Colophon</span>
          <p className="navigation-text">
            {site.colophonText}
            {site.colophonLinkUrl && site.colophonLinkText ? (
              <>
                {' '}
                Before the domain was mine it was{' '}
                <a href={site.colophonLinkUrl} className="navigation-text underlined">
                  {site.colophonLinkText}
                </a>
              </>
            ) : null}
          </p>
        </div>
      </section>

      <section
        className="info-farewell"
        style={{ backgroundImage: `url(${farewellBg})` }}
      >
        <h1 className="centered-heading">{site.contactHeading}</h1>
      </section>
    </div>
  );
}
