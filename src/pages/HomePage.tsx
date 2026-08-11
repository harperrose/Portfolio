import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import type { Project, SiteSettings } from '../types/content';
import { CAPABILITIES_LIST } from '../types/content';
import { buildHomeGallery, type HomeCard } from '../lib/homeGallery';
import { projectUrl } from '../lib/content';
import NavGrid from '../components/NavGrid';
import ContactMenu from '../components/ContactMenu';
import HomeIntroTitle from '../components/HomeIntroTitle';

type HomePageProps = {
  projects: Project[];
  site: SiteSettings;
};

function renderGalleryCard(card: HomeCard, index: number, keyPrefix: string) {
  if (card.kind === 'stack') {
    return (
      <div
        key={`${keyPrefix}-stack-${index}`}
        className="hd-card hd-card--stack"
        data-project-id={card.projectId}
      >
        <div className="hd-stack">
          {card.images.map((image, imageIndex) => (
            <Link
              key={`${keyPrefix}-${image}-${imageIndex}`}
              to={projectUrl(card.slug)}
              className="hd-card-link hd-card-link--stack"
            >
              <div className="image-wrap">
                <img src={image} alt="" loading={index < 4 ? 'eager' : 'lazy'} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      key={`${keyPrefix}-single-${index}`}
      className={`hd-card hd-card--${card.size === 'wide' ? 'landscape' : 'portrait'}`}
      data-project-id={card.projectId}
    >
      <Link to={projectUrl(card.slug)} className="hd-card-link">
        <div className="image-wrap">
          <img src={card.image} alt="" loading={index < 4 ? 'eager' : 'lazy'} />
        </div>
      </Link>
    </div>
  );
}

export default function HomePage({ projects, site }: HomePageProps) {
  const navProjects = useMemo(
    () => [...projects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title)),
    [projects],
  );

  const galleryCards = useMemo(() => buildHomeGallery(navProjects), [navProjects]);
  const loopSets = 3;
  const backgroundImage = site.homeBackgroundImage ?? '/images/background.png';

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [happyReveal, setHappyReveal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLElement>(null);
  const hasScrolledRef = useRef(false);
  const setWidthRef = useRef(0);

  const activeProject = navProjects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    document.body.classList.add('home-route', 'body-5');
    return () => {
      document.body.classList.remove('home-route', 'body-5');
    };
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl || !galleryCards.length) return;

    const setLayoutMetrics = () => {
      const gridEl = document.getElementById('hd-grid');
      const topBarBottom = topBarRef.current
        ? Math.ceil(topBarRef.current.getBoundingClientRect().bottom)
        : 52;
      document.documentElement.style.setProperty('--home-top-offset', `${topBarBottom}px`);

      if (!gridEl) return;
      const gridTop = gridEl.getBoundingClientRect().top;
      const height = Math.max(80, Math.round(gridTop - topBarBottom - 16));
      document.documentElement.style.setProperty('--card-h', `${height}px`);
    };

    const measureSetWidth = () => {
      const setEl = trackEl.querySelector<HTMLElement>('.hd-loop-set');
      if (!setEl) return 0;
      setWidthRef.current = setEl.offsetWidth;
      return setEl.offsetWidth;
    };

    const getSpacerScrollPosition = () => {
      const sets = trackEl.querySelectorAll<HTMLElement>('.hd-loop-set');
      const middleSet = sets[1];
      const spacer = middleSet?.querySelector<HTMLElement>('.hd-loop-spacer');
      if (!middleSet || !spacer) return setWidthRef.current;

      return middleSet.offsetLeft + spacer.offsetLeft;
    };

    setLayoutMetrics();
    window.addEventListener('resize', setLayoutMetrics);

    const lenis = new Lenis({
      wrapper: scrollEl,
      content: trackEl,
      eventsTarget: scrollEl,
      orientation: 'horizontal',
      gestureOrientation: 'vertical',
      smoothWheel: false,
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      lenis.scrollTo(lenis.scroll + e.deltaY, { immediate: true });
    };
    scrollEl.addEventListener('wheel', handleWheel, { passive: false });

    const updateActive = () => {
      const vw = scrollEl.clientWidth;
      const vpCenter = vw / 2;
      let nearest: string | null = null;
      let minDist = Infinity;
      let anyVisible = false;

      trackEl.querySelectorAll('.hd-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(vpCenter - (rect.left + rect.width / 2));
        if (dist < minDist) {
          minDist = dist;
          nearest = (card as HTMLElement).dataset.projectId ?? null;
        }
        if (rect.right > 0 && rect.left < vw) anyVisible = true;
      });

      setActiveProjectId(anyVisible && nearest ? nearest : null);
      setLayoutMetrics();
    };

    const wrapScroll = () => {
      const setWidth = setWidthRef.current || measureSetWidth();
      if (!setWidth) return;

      const scroll = lenis.scroll;
      if (scroll >= setWidth * 2) {
        lenis.scrollTo(scroll - setWidth, { immediate: true });
      } else if (scroll < setWidth) {
        lenis.scrollTo(scroll + setWidth, { immediate: true });
      }
    };

    lenis.on('scroll', () => {
      wrapScroll();
      updateActive();
    });

    requestAnimationFrame(() => {
      setLayoutMetrics();
      measureSetWidth();
      const setWidth = setWidthRef.current;
      if (setWidth) {
        lenis.scrollTo(getSpacerScrollPosition(), { immediate: true });
      }
      updateActive();
    });

    const dismissCursor = () => {
      hasScrolledRef.current = true;
      cursorRef.current?.classList.add('hidden');
      stageRef.current?.classList.remove('hide-cursor');
      scrollEl.removeEventListener('scroll', dismissCursor);
    };
    scrollEl.addEventListener('scroll', dismissCursor);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      scrollEl.removeEventListener('wheel', handleWheel);
      scrollEl.removeEventListener('scroll', dismissCursor);
      window.removeEventListener('resize', setLayoutMetrics);
    };
  }, [galleryCards]);

  const handleStageMouseEnter = () => {
    if (hasScrolledRef.current) return;
    cursorRef.current?.classList.remove('hidden');
    stageRef.current?.classList.add('hide-cursor');
  };

  const handleStageMouseLeave = () => {
    cursorRef.current?.classList.add('hidden');
    stageRef.current?.classList.remove('hide-cursor');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.left = `${e.clientX}px`;
    cursorRef.current.style.top = `${e.clientY}px`;
  };

  return (
    <div
      className={`home-route-wrap${happyReveal ? ' is-happy-reveal' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div className="home-bg" aria-hidden>
        <img src={backgroundImage} alt="" className="home-bg-image" />
      </div>
      <div className="home-happy-blur" aria-hidden />

      <div id="hd-cursor" ref={cursorRef} className="hidden">
        Scroll
      </div>

      <header ref={topBarRef} className="home-top-bar">
        <div className="home-top-nav-row">
          <Link to="/info" className="pill-btn home-top-link">
            Info
          </Link>
          <ContactMenu site={site} variant="home" buttonClassName="pill-btn home-top-link" />
        </div>
      </header>

      <HomeIntroTitle text={site.homeIntroTitle ?? ''} onRevealChange={setHappyReveal} />

      <div
        id="hd-stage"
        ref={stageRef}
        onMouseEnter={handleStageMouseEnter}
        onMouseLeave={handleStageMouseLeave}
      >
        <div id="hd-scroll" ref={scrollRef}>
          <div id="hd-track" ref={trackRef}>
            {Array.from({ length: loopSets }, (_, setIndex) => (
              <div key={`loop-set-${setIndex}`} className="hd-loop-set">
                {galleryCards.map((card, index) =>
                  renderGalleryCard(card, index, `set-${setIndex}`),
                )}
                <div className="hd-loop-spacer" aria-hidden />
              </div>
            ))}
          </div>
        </div>

        <NavGrid
          site={site}
          variant="home"
          projects={navProjects}
          activeProjectId={activeProjectId}
          activeProject={activeProject ?? null}
          capabilitiesList={[...CAPABILITIES_LIST]}
        />
      </div>
    </div>
  );
}
