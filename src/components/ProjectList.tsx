// src/pages/Info.tsx (or src/components/ProjectList.tsx)
import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// This interface matches the TinaCMS schema output
interface Project {
  id: string;
  title: string;
  image: string;
  url: string;
  quote: string;
  capabilities: string[];
}

interface InfoProps {
  projects: Project[];
}

const CAPABILITIES_LIST = [
  'Product Design', 
  'Digital Design', 
  'Testing and Optimization', 
  'Branding & Visual', 
  'Web Development'
];

export default function Info({ projects }: InfoProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Active project derived data
  const activeProject = projects.find(p => p.id === activeProjectId);
  const activeCapabilities = activeProject?.capabilities || [];

  useEffect(() => {
    if (!scrollRef.current || !trackRef.current) return;

    // Initialize Lenis
    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: trackRef.current,
      orientation: 'horizontal',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      scrollMultiplier: 2,
      touchMultiplier: 1.2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Bridge for desktop mouse users: Vertical wheel -> Horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        lenis.scrollTo(lenis.scroll + e.deltaY, { immediate: true });
        e.preventDefault();
      }
    };
    scrollRef.current.addEventListener('wheel', handleWheel, { passive: false });

    // Scroll listener to determine active project
    lenis.on('scroll', () => {
      if (!scrollRef.current || !trackRef.current) return;
      
      const vw = scrollRef.current.clientWidth;
      const vpCenter = vw / 2;
      let nearest: string | null = null;
      let minDist = Infinity;
      let anyVisible = false;

      const cards = trackRef.current.querySelectorAll('.hd-card');
      
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(vpCenter - (r.left + r.width / 2));
        
        if (d < minDist) {
          minDist = d;
          nearest = (card as HTMLElement).dataset.projectId || null;
        }
        if (r.right > 0 && r.left < vw) {
          anyVisible = true;
        }
      });

      setActiveProjectId(anyVisible && nearest ? nearest : null);
    });

    return () => {
      lenis.destroy();
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [projects]);

  return (
    <div id="hd-stage">
      {/* Scroll Track Area */}
      <div id="hd-scroll" ref={scrollRef}>
        <div id="hd-track" ref={trackRef}>
          <div className="hd-spacer hd-spacer-lead"></div>
          
          {/* Map through TinaCMS Projects */}
          {projects.map((p, i) => (
            <div key={p.id} className="hd-card" data-project-id={p.id}>
              <a href={p.url} className="hd-card-link">
                <div className="image-wrap" style={{ paddingRight: '5px', marginRight: '5px' }}>
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    loading={i < 2 ? 'eager' : 'lazy'} 
                  />
                </div>
              </a>
            </div>
          ))}
          
          <div className="hd-spacer hd-spacer-trail"></div>
        </div>
      </div>

      {/* Bottom Interface Grid */}
      <div id="hd-grid">
        {/* Navigation Column */}
        <div className="hd-col" id="hd-col-nav">
          <a href="#" style={{ color: 'white' }}>Work</a>
          <a href="/info">Info</a>
        </div>

        {/* Dynamic Projects Column */}
        <div className="hd-col" id="hd-col-projects">
          <ul id="hd-projects-list">
            {projects.map(p => (
              <li 
                key={p.id} 
                className={activeProjectId === p.id ? 'hd-current' : ''}
              >
                <a href={p.url}>{p.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Capabilities Column */}
        <div className="hd-col" id="hd-col-capabilities">
          <ul id="hd-capabilities-list">
            {CAPABILITIES_LIST.map(cap => (
              <li 
                key={cap}
                className={activeCapabilities.includes(cap) ? 'hd-active' : ''}
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Right Column: Quote vs Contact Form */}
        <div className="hd-col" id="hd-col-right">
          <div 
            id="hd-quote" 
            className={activeProjectId ? 'state-on' : 'state-off'}
          >
            {activeProject?.quote}
          </div>
          
          <div 
            id="hd-contact" 
            className={activeProjectId ? 'state-off' : 'state-on'}
          >
            {/* Standard React form structure for your contact block */}
            <div id="hd-contact-wrapper" className="navigation-item centered is-form">
              <div className="navigation-text">Contact</div>
              <form id="email-form" name="email-form">
                <input className="text-field w-input" name="name" placeholder="Name" type="text" />
                <input className="text-field w-input" name="email" placeholder="Email" type="email" required />
                <textarea name="Message" placeholder="Your Message" className="text-field w-input"></textarea>
                <input type="submit" value="Submit" className="submit-button w-button" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}