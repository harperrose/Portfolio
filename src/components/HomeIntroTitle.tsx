import { useCallback, useState } from 'react';

type HomeIntroTitleProps = {
  text: string;
  onRevealChange?: (revealed: boolean) => void;
};

function splitIntro(text: string) {
  const match = text.match(/^(.*?)(\bhappy\b)(.*)$/i);
  if (!match) return { before: text, happy: null as string | null, after: '' };
  return { before: match[1], happy: match[2], after: match[3] };
}

export default function HomeIntroTitle({ text, onRevealChange }: HomeIntroTitleProps) {
  const { before, happy, after } = splitIntro(text);
  const [revealed, setRevealed] = useState(false);

  const setReveal = useCallback(
    (value: boolean) => {
      setRevealed(value);
      onRevealChange?.(value);
    },
    [onRevealChange],
  );

  const activate = useCallback(() => setReveal(true), [setReveal]);
  const deactivate = useCallback(() => setReveal(false), [setReveal]);
  const toggle = useCallback(() => setReveal(!revealed), [revealed, setReveal]);

  return (
    <p
      className={`title home-hero-title${revealed ? ' is-active' : ''}`}
      onMouseLeave={happy ? deactivate : undefined}
    >
      <span className="home-hero-part">{before}</span>
      {happy ? (
        <span
          className="home-happy-trigger"
          onMouseEnter={activate}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {happy}
        </span>
      ) : null}
      <span className="home-hero-part">{after}</span>
    </p>
  );
}
