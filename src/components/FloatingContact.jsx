import { CalendarCheck, Mail, MessageCircle } from 'lucide-react';

export default function FloatingContact({ contact }) {
  const emailLink = contact?.links?.find(l => l.label === 'Email')?.href || 'mailto:hello@codenxte.com';
  const whatsappLink = contact?.links?.find(l => l.label.includes('WhatsApp'))?.href || 'https://wa.me/919876543210';

  return (
    <div className="floating-contact" aria-label="Quick contact actions">
      <a href={whatsappLink} aria-label="Contact on WhatsApp" target="_blank" rel="noopener noreferrer">
        <MessageCircle size={19} />
      </a>
      <a href={emailLink} aria-label="Send email">
        <Mail size={19} />
      </a>
      <a href="#contact" aria-label="Schedule consultation">
        <CalendarCheck size={19} />
      </a>
    </div>
  );
}
