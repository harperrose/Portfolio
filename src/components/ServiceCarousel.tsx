import type { ServiceItem } from '../types/content';
import { resolveItemUrl } from '../lib/content';

type ServiceCarouselProps = {
  items: ServiceItem[];
};

export default function ServiceCarousel({ items }: ServiceCarouselProps) {
  return (
    <div className="service-scroll">
      <div className="service-scroll-track">
        {items.map((item, index) => {
          const href = resolveItemUrl(item);
          const linked = href !== '#';
          const image = (
            <img src={item.image} loading="lazy" alt="" className="image-3 info service-scroll-image" />
          );
          const caption = (
            <h2 className="image-caption-text info service-carousel-link">{item.title}</h2>
          );

          return (
            <div key={`${item.title}-${item.image}-${index}`} className="service-scroll-item">
              {linked ? (
                <a href={href} className="section_feature info w-inline-block">
                  {image}
                  {caption}
                </a>
              ) : (
                <div className="section_feature info service-scroll-card">
                  {image}
                  {caption}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
