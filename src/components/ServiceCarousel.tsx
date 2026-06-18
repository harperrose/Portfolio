import { useEffect, useRef } from 'react';
import type { ServiceItem } from '../types/content';
import { resolveItemUrl } from '../lib/content';

type ServiceCarouselProps = {
  items: ServiceItem[];
};

export default function ServiceCarousel({ items }: ServiceCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slideItems = container.querySelectorAll('.slide_item');
    const leftArrow = container.querySelector('.slide_arrow.is--left');
    const rightArrow = container.querySelector('.slide_arrow.is--right');
    if (!slideItems.length || !leftArrow || !rightArrow) return;

    slideItems[0]?.classList.add('is--current');
    leftArrow.classList.add('is--disabled-arrow');

    const getSlideWidth = () =>
      (slideItems[0] as HTMLElement).offsetWidth - (window.innerWidth < 992 ? 0 : 20);

    const updateArrows = (currentIndex: number) => {
      leftArrow.classList.toggle('is--disabled-arrow', currentIndex === 0);
      rightArrow.classList.toggle(
        'is--disabled-arrow',
        currentIndex === slideItems.length - 1,
      );
    };

    const moveTo = (index: number) => {
      slideItems.forEach((item) => item.classList.remove('is--current'));
      slideItems[index]?.classList.add('is--current');
      const move = getSlideWidth() * index;
      slideItems.forEach((item, i) => {
        if (i >= index) {
          (item as HTMLElement).style.transform = `translateX(-${move}px)`;
        } else {
          (item as HTMLElement).style.transform = 'translateX(0px)';
        }
      });
      updateArrows(index);
    };

    const onRight = (e: Event) => {
      e.preventDefault();
      const current = container.querySelector('.slide_item.is--current');
      const currentIndex = current ? Array.from(slideItems).indexOf(current) : 0;
      if (currentIndex < slideItems.length - 1) moveTo(currentIndex + 1);
    };

    const onLeft = (e: Event) => {
      e.preventDefault();
      const current = container.querySelector('.slide_item.is--current');
      const currentIndex = current ? Array.from(slideItems).indexOf(current) : 0;
      if (currentIndex > 0) moveTo(currentIndex - 1);
    };

    rightArrow.addEventListener('click', onRight);
    leftArrow.addEventListener('click', onLeft);

    return () => {
      rightArrow.removeEventListener('click', onRight);
      leftArrow.removeEventListener('click', onLeft);
    };
  }, [items]);

  return (
    <div className="slide_contain" ref={containerRef}>
      <div className="slide_wrap">
        <div className="slide_list">
          {items.map((item) => (
            <div key={`${item.title}-${item.image}`} className="slide_item">
              <div className="slide_card image_container smaller info">
                <a href={resolveItemUrl(item)} className="section_feature info w-inline-block">
                  <img src={item.image} loading="lazy" alt="" className="image-3 info" />
                  <h2 className="image-caption-text info">{item.title}</h2>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="slide_arrows">
        <a href="#" className="slide_arrow is--left is--disabled-arrow w-inline-block">
          <div className="slide_svg is--flip w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 12 12">
              <g transform="translate(0, 0)">
                <path d="M1,7H8.586L6.293,9.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.416l-4-4A1,1,0,0,0,6.293,2.707L8.586,5H1A1,1,0,0,0,1,7Z" fill="currentColor" />
              </g>
            </svg>
          </div>
        </a>
        <a href="#" className="slide_arrow is--right w-inline-block">
          <div className="slide_svg w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 12 12">
              <g transform="translate(0, 0)">
                <path d="M1,7H8.586L6.293,9.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.416l-4-4A1,1,0,0,0,6.293,2.707L8.586,5H1A1,1,0,0,0,1,7Z" fill="currentColor" />
              </g>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
}
