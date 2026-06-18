type ContactFormProps = {
  compact?: boolean;
};

export default function ContactForm({ compact = false }: ContactFormProps) {
  return (
    <div
      id="hd-contact-wrapper"
      className={`navigation-item centered is-form${compact ? ' is-compact' : ''}`}
    >
      <div className="navigation-text">Contact</div>
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
    </div>
  );
}
