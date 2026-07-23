import type { ContentBlock } from '../types/content';
import BlockRenderer from './BlockRenderer';

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
