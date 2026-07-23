import { useEffect } from 'react';

const TALLY_EMBED =
  'https://tally.so/embed/w7k8b2?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

type ContactFormProps = {
  compact?: boolean;
  arenaUrl?: string;
};

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

function loadTallyEmbeds() {
  if (typeof window.Tally !== 'undefined') {
    window.Tally.loadEmbeds();
    return;
  }

  const existing = document.querySelector('script[data-tally-embed]');
  if (existing) return;

  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.async = true;
  script.dataset.tallyEmbed = 'true';
  script.onload = () => window.Tally?.loadEmbeds();
  document.body.appendChild(script);
}

export default function ContactForm({ compact = false, arenaUrl }: ContactFormProps) {
  useEffect(() => {
    loadTallyEmbeds();
  }, []);

  if (compact) {
    return (
      <div id="hd-contact-wrapper" className="navigation-item centered is-form">
        <div className="navigation-text">Contact</div>
        <iframe
          data-tally-src={TALLY_EMBED}
          loading="lazy"
          width="100%"
          height="280"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Contact Harper Daniel"
        />
      </div>
    );
  }

  return (
    <div id="hd-contact-wrapper" className="navigation-item centered footer is-form">
      <div className="div-block-12">
        <a href="#contact" className="navigation-text centered">
          Contact
        </a>
        {arenaUrl ? (
          <a href={arenaUrl} className="w-inline-block" target="_blank" rel="noreferrer">
            <img src="/images/arena.webp" loading="lazy" alt="" className="icon-contact" />
          </a>
        ) : null}
      </div>
      <div id="1800-contact-me" className="form">
        <iframe
          data-tally-src={TALLY_EMBED}
          loading="lazy"
          width="100%"
          height="400"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Contact Harper Daniel"
        />
      </div>
    </div>
  );
}
