import type { ContentBlock } from '../types/content';
import BeforeAfterSlider from './BeforeAfterSlider';

type BlockRendererProps = {
  block: ContentBlock;
  imageClassName?: string;
};

export default function BlockRenderer({ block, imageClassName = 'img' }: BlockRendererProps) {
  switch (block._template) {
    case 'image':
      return <img src={block.src} loading="lazy" alt={block.alt ?? ''} className={imageClassName} />;
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
          <img src={block.left} loading="lazy" alt="" className={`${imageClassName} double`} />
          <img src={block.right} loading="lazy" alt="" className={`${imageClassName} double`} />
        </div>
      );
    case 'beforeAfter':
      return <BeforeAfterSlider before={block.before} after={block.after} alt={block.alt} />;
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
