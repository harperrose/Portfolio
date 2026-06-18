import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import type { Project, SiteSettings } from '../types/content';
import { projectUrl } from '../lib/content';
import NavGrid from '../components/NavGrid';

type HomePageProps = {
  projects: Project[];
  site: SiteSettings;
};

export default function HomePage({ projects, site }: HomePageProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const activeCapabilities = activeProject?.capabilities ?? [];

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const lenis = new Lenis({
      wrapper: scrollEl,
      content: trackEl,
      orientation: 'horizontal',
      gestureOrientation: 'vertical',
      smoothWheel: true,
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
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        lenis.scrollTo(lenis.scroll + e.deltaY, { immediate: true });
        e.preventDefault();
      }
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
    };

    lenis.on('scroll', updateActive);
    updateActive();

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      scrollEl.removeEventListener('wheel', handleWheel);
    };
  }, [projects]);

  return (
    <div id="hd-stage">
      <div id="hd-scroll" ref={scrollRef}>
        <div id="hd-track" ref={trackRef}>
          <div className="hd-spacer hd-spacer-lead" />
          {projects.map((project, index) => (
            <div key={project.id} className="hd-card" data-project-id={project.id}>
              <Link to={projectUrl(project.slug)} className="hd-card-link">
                <div className="image-wrap hd-card-image-wrap">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
              </Link>
            </div>
          ))}
          <div className="hd-spacer hd-spacer-trail" />
        </div>
      </div>

      <NavGrid
        projects={projects}
        site={site}
        variant="home"
        activeProjectId={activeProjectId}
        activeCapabilities={activeCapabilities}
        activeProjectQuote={activeProject?.quote}
      />
    </div>
  );
}
