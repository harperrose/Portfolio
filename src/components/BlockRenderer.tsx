import type { ContentBlock } from '../types/content';
import BeforeAfterSlider from './BeforeAfterSlider';

type BlockRendererProps = {
  block: ContentBlock;
  imageClassName?: string;
};

export default function BlockRenderer({ block, imageClassName = 'img' }: BlockRendererProps) {
  switch (block._template) {
    case 'image':
      return (
        <figure className="cs-media-figure">
          <img src={block.src} loading="lazy" alt={block.alt ?? ''} className={imageClassName} />
          {block.caption ? <figcaption className="cs-media-caption">{block.caption}</figcaption> : null}
        </figure>
      );
    case 'paragraph':
      return (
        <p
          className="paragraph on-page"
          dangerouslySetInnerHTML={{ __html: block.text.replace(/\n/g, '<br>') }}
        />
      );
    case 'doubleImage':
      return (
        <div className="double">
          <figure className="cs-media-figure">
            <img src={block.left} loading="lazy" alt="" className={`${imageClassName} double`} />
            {block.leftCaption ? (
              <figcaption className="cs-media-caption">{block.leftCaption}</figcaption>
            ) : null}
          </figure>
          <figure className="cs-media-figure">
            <img src={block.right} loading="lazy" alt="" className={`${imageClassName} double`} />
            {block.rightCaption ? (
              <figcaption className="cs-media-caption">{block.rightCaption}</figcaption>
            ) : null}
          </figure>
        </div>
      );
    case 'gallery':
      return (
        <div className="cs-gallery" role="region" aria-label="Image gallery">
          <div className="cs-gallery-track">
            {block.items.map((item, index) => (
              <figure className="cs-gallery-item" key={`${item.image}-${index}`}>
                <img src={item.image} loading="lazy" alt="" className={imageClassName} />
                {item.caption ? (
                  <figcaption className="cs-media-caption">{item.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      );
    case 'beforeAfter':
      return (
        <figure className="cs-media-figure">
          <BeforeAfterSlider before={block.before} after={block.after} alt={block.alt} />
          {block.caption ? <figcaption className="cs-media-caption">{block.caption}</figcaption> : null}
        </figure>
      );
    case 'iframe':
      return (
        <div className="w-embed w-iframe">
          <iframe
            style={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              width: '100%',
              height: block.height ?? '60vh',
            }}
            src={block.src}
            allowFullScreen
            title="Embedded prototype"
          />
        </div>
      );
    default:
      return null;
  }
}
