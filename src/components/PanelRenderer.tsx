import type { ContentBlock } from '../types/content';

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block._template) {
    case 'image':
      return <img src={block.src} loading="lazy" alt={block.alt ?? ''} className="img" />;
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
          <img src={block.left} loading="lazy" alt="" className="img double" />
          <img src={block.right} loading="lazy" alt="" className="img double" />
        </div>
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

type PanelRendererProps = {
  blocks: ContentBlock[];
  title: string;
  summary?: string;
};

export default function PanelRenderer({ blocks, title, summary }: PanelRendererProps) {
  return (
    <section className="main-content">
      <div className="image-wrap">
        {blocks.map((block, index) => (
          <BlockRenderer key={`${block._template}-${index}`} block={block} />
        ))}
      </div>
      <div className="content-wrap">
        <div className="navigation-item full-width">
          <div className="text-block-15">{title}</div>
        </div>
        <div className="text-wrap">
          <h1 className="heading-12">{title}</h1>
          {summary ? <p className="paragraph">{summary}</p> : null}
        </div>
      </div>
    </section>
  );
}
