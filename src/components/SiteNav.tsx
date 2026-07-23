import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectPanel } from '../types/content';

type SiteNavProps = {
  projectTitle?: string;
  panels?: ProjectPanel[];
  activeIndex?: number;
  segmentProgress?: number[];
  onSectionClick?: (index: number) => void;
};

export default function SiteNav({
  projectTitle,
  panels = [],
  activeIndex = 0,
  segmentProgress = [],
  onSectionClick,
}: SiteNavProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const showProgress = panels.length > 0 && projectTitle;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !showProgress) {
      setCompact(false);
      return;
    }

    const updateCompact = () => {
      const segments = track.querySelectorAll<HTMLElement>('.cs-progress-segment');
      if (!segments.length) {
        setCompact(false);
        return;
      }

      let requiredWidth = 0;
      segments.forEach((segment) => {
        requiredWidth += segment.scrollWidth;
      });
      setCompact(requiredWidth > track.clientWidth + 2);
    };

    updateCompact();
    const observer = new ResizeObserver(updateCompact);
    observer.observe(track);
    window.addEventListener('resize', updateCompact);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCompact);
    };
  }, [panels, projectTitle, showProgress]);

  return (
    <header className="site-nav">
      <div className="site-nav-primary">
        <Link to="/" className="site-nav-link">
          Home
        </Link>
        <Link to="/info" className="site-nav-link">
          Info
        </Link>
        <a href="#contact" className="site-nav-link">
          Contact
        </a>
      </div>

      {showProgress ? (
        <div
          ref={trackRef}
          className={`cs-progress-track${compact ? ' is-compact' : ''}`}
          aria-label="Case study sections"
        >
          {panels.map((panel, index) => {
            const label = index === 0 ? projectTitle : panel.label;
            const fill = segmentProgress[index] ?? 0;
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;
            const showLabel = !compact || isActive;

            return (
              <button
                key={`${panel.label}-${index}`}
                type="button"
                className={`cs-progress-segment${isActive ? ' is-active' : ''}${
                  isComplete ? ' is-complete' : ''
                }${compact && !showLabel ? ' is-dot' : ''}`}
                onClick={() => onSectionClick?.(index)}
                aria-label={label}
                title={label}
              >
                <span
                  className="cs-progress-segment-fill"
                  style={{ width: `${Math.round(fill * 100)}%` }}
                  aria-hidden
                />
                {showLabel ? <span className="cs-progress-segment-label">{label}</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </header>
  );
}
