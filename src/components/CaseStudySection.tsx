import { forwardRef } from 'react';
import type { ContentBlock } from '../types/content';
import { getPanelMediaBlocks, getPanelParagraphs } from '../lib/homeGallery';
import BlockRenderer from './BlockRenderer';

type CaseStudySectionProps = {
  index: number;
  title: string;
  intro?: string;
  blocks: ContentBlock[];
};

const CaseStudySection = forwardRef<HTMLElement, CaseStudySectionProps>(
  function CaseStudySection({ index, title, intro, blocks }, ref) {
    const paragraphs = getPanelParagraphs(blocks);
    const mediaBlocks = getPanelMediaBlocks(blocks);

    return (
      <section ref={ref} className="cs-section" data-cs-section={index}>
        <div className="cs-section-wrap">
          <div className="cs-section-inner">
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
          </div>
        </div>
      </section>
    );
  },
);

export default CaseStudySection;
