import { forwardRef } from 'react';
import type { ContentBlock } from '../types/content';
import { getPanelMediaBlocks, getPanelParagraphs } from '../lib/homeGallery';
import BlockRenderer from './BlockRenderer';

type CaseStudySectionProps = {
  index: number;
  title: string;
  intro?: string;
  heroDescription?: string;
  heroSecondaryDescription?: string;
  blocks: ContentBlock[];
};

const CaseStudySection = forwardRef<HTMLElement, CaseStudySectionProps>(
  function CaseStudySection(
    { index, title, intro, heroDescription, heroSecondaryDescription, blocks },
    ref,
  ) {
    const paragraphs = getPanelParagraphs(blocks);
    const mediaBlocks = getPanelMediaBlocks(blocks);
    const isHero = index === 0;

    return (
      <section ref={ref} className="cs-section" data-cs-section={index}>
        <div className="cs-section-wrap">
          <div className="cs-section-inner">
            {isHero ? (
              <header className="cs-hero">
                <h1 className="cs-hero-title">{title}</h1>
                <div className="cs-hero-columns">
                  {heroDescription ? (
                    <p className="cs-section-text">{heroDescription}</p>
                  ) : intro ? (
                    <p className="cs-section-text">{intro}</p>
                  ) : null}
                  {heroSecondaryDescription ? (
                    <p className="cs-section-text">{heroSecondaryDescription}</p>
                  ) : null}
                </div>
              </header>
            ) : (
              <header className="cs-section-header">
                <h2 className="cs-section-title">{title}</h2>
                {intro ? <p className="cs-section-intro">{intro}</p> : null}
                {paragraphs.map((text, paragraphIndex) => (
                  <p
                    key={`${index}-paragraph-${paragraphIndex}`}
                    className="cs-section-text"
                    dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
                  />
                ))}
              </header>
            )}

            {mediaBlocks.length ? (
              <div className="cs-media-grid">
                {mediaBlocks.map((block, blockIndex) => (
                  <div
                    key={`${index}-${block._template}-${blockIndex}`}
                    className={`cs-media-item cs-media-item--${block._template}`}
                  >
                    <BlockRenderer block={block} imageClassName="cs-img" />
                  </div>
                ))}
              </div>
            ) : null}

            {isHero && paragraphs.length ? (
              <div className="cs-section-copy">
                {paragraphs.map((text, paragraphIndex) => (
                  <p
                    key={`${index}-hero-paragraph-${paragraphIndex}`}
                    className="cs-section-text"
                    dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  },
);

export default CaseStudySection;
