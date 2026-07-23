import type { ServiceItem } from '../types/content';
import { resolveItemUrl } from '../lib/content';

type ServiceCarouselProps = {
  items: ServiceItem[];
};

export default function ServiceCarousel({ items }: ServiceCarouselProps) {
  return (
    <div className="service-scroll">
      <div className="service-scroll-track">
        {items.map((item, index) => (
          <div key={`${item.title}-${item.image}-${index}`} className="service-scroll-item">
            <a href={resolveItemUrl(item)} className="section_feature info w-inline-block">
              <img src={item.image} loading="lazy" alt="" className="image-3 info service-scroll-image" />
              <h2 className="image-caption-text info service-carousel-link">{item.title}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
