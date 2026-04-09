import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const socials = [
    { label: 'Instagram', icon: Instagram, href: '#' },
    { label: 'Facebook', icon: Facebook, href: '#' },
    { label: 'Twitter', icon: Twitter, href: '#' },
  ];

  return (
    <footer className="w-full bg-[#0A0807] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* Main grid — Brand | Contact | Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-14 pb-16 border-b border-white/8"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo.jpg"
                alt="House of JAZ"
                className="h-10 w-10 rounded-full object-cover opacity-90"
              />
              <span className="font-serif text-white text-lg tracking-wide">House of JAZ</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-8 max-w-56">
              A private luxury resort nestled in the hills of San Mateo, Rizal — crafted for those who seek the extraordinary.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#C9A87C]/50 hover:text-[#C9A87C] text-white/30 transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/40 text-[10px] tracking-[0.24em] uppercase font-medium mb-7">Contact</h4>
            <div className="space-y-5">
              <a href="tel:+15551234567" className="flex items-start gap-3 group">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-[#C9A87C]/50 group-hover:text-[#C9A87C] transition-colors shrink-0" />
                <span className="text-white/40 group-hover:text-white/70 text-sm transition-colors">
                  +1 (555) 123-4567
                </span>
              </a>
              <a href="mailto:reservations@houseofjaz.com" className="flex items-start gap-3 group">
                <Mail className="w-3.5 h-3.5 mt-0.5 text-[#C9A87C]/50 group-hover:text-[#C9A87C] transition-colors shrink-0" />
                <span className="text-white/40 group-hover:text-white/70 text-sm transition-colors">
                  reservations@houseofjaz.com
                </span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#C9A87C]/50 shrink-0" />
                <span className="text-white/40 text-sm leading-relaxed">
                  St Paul/St Peter Corner,<br />
                  Marvi Hills Chapel Subdivision,<br />
                  San Mateo, Rizal
                </span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/40 text-[10px] tracking-[0.24em] uppercase font-medium mb-7">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8"
        >
          <p className="text-white/20 text-xs tracking-wide">
            © {currentYear} House of JAZ. All rights reserved.
          </p>
          <p className="text-white/15 text-xs tracking-widest uppercase">
            Luxury Resort &amp; Private Spa · San Mateo, Rizal
          </p>
        </motion.div>

      </div>
    </footer>
  );
}
