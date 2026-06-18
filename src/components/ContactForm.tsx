type ContactFormProps = {
  compact?: boolean;
  arenaUrl?: string;
  successMessage?: string;
};

export default function ContactForm({
  compact = false,
  arenaUrl,
  successMessage = 'Thanks! Ill be in touch soon.',
}: ContactFormProps) {
  return (
    <div
      id="hd-contact-wrapper"
      className={`navigation-item centered footer is-form${compact ? ' is-compact' : ''}`}
    >
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
        <div id="1800-Contact-me" className="w-form">
          <form id="email-form" name="email-form" onSubmit={(e) => e.preventDefault()}>
            <input className="text-field w-input" name="name" placeholder="Name" type="text" />
            <input
              className="text-field w-input"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
            <textarea
              name="Message"
              placeholder="Your Message"
              className="text-field w-input"
            />
            <input type="submit" value="Submit" className="submit-button w-button" />
          </form>
          <div className="success-message-2 w-form-done">
            <div>{successMessage}</div>
          </div>
          <div className="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
