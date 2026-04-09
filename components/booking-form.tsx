import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export function BookingForm() {
  const [formData, setFormData] = useState({
    arrivalDate: '',
    package: '',
    guests: '2',
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking data:', formData);
    setFormData({ arrivalDate: '', package: '', guests: '2', name: '', email: '', message: '' });
  };

  const inputClass =
    'w-full bg-transparent border-b border-[#E8E0D4] text-[#1A1610] text-sm placeholder-[#C4B9AD] py-3 focus:outline-none focus:border-[#C9A87C] transition-colors duration-300';

  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-2 font-medium';

  return (
    <section id="contact" className="w-full bg-[#FAF8F4] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: Contact info + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-6">
              Reservations
            </p>
            <h2 className="font-serif font-normal text-[#1A1610] text-4xl md:text-5xl leading-tight mb-8">
              Reserve Your<br />Experience
            </h2>
            <div className="w-10 h-px bg-[#C9A87C] mb-12" />

            {/* Contact details */}
            <div className="space-y-6 mb-14">
              <a
                href="tel:+15551234567"
                className="flex items-start gap-4 group"
              >
                <div className="w-9 h-9 border border-[#E8E0D4] flex items-center justify-center shrink-0 group-hover:border-[#C9A87C] transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">Phone</p>
                  <p className="text-[#1A1610] text-sm group-hover:text-[#C9A87C] transition-colors duration-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </a>

              <a
                href="mailto:reservations@houseofjaz.com"
                className="flex items-start gap-4 group"
              >
                <div className="w-9 h-9 border border-[#E8E0D4] flex items-center justify-center shrink-0 group-hover:border-[#C9A87C] transition-colors duration-300">
                  <Mail className="w-3.5 h-3.5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">Email</p>
                  <p className="text-[#1A1610] text-sm group-hover:text-[#C9A87C] transition-colors duration-300">
                    reservations@houseofjaz.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-[#E8E0D4] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">Address</p>
                  <p className="text-[#1A1610] text-sm leading-relaxed">
                    St Paul/St Peter Corner,<br />
                    Marvi Hills Chapel Subdivision,<br />
                    San Mateo, Rizal
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#E8E0D4] mb-10" />

            {/* Social media */}
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278] mb-6">Follow Us</p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-[#E8E0D4] flex items-center justify-center hover:border-[#C9A87C] hover:bg-[#C9A87C]/5 transition-all duration-300 group"
                >
                  <Instagram className="w-4 h-4 text-[#8A8278] group-hover:text-[#C9A87C] transition-colors" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 border border-[#E8E0D4] flex items-center justify-center hover:border-[#C9A87C] hover:bg-[#C9A87C]/5 transition-all duration-300 group"
                >
                  <Facebook className="w-4 h-4 text-[#8A8278] group-hover:text-[#C9A87C] transition-colors" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter / X"
                  className="w-10 h-10 border border-[#E8E0D4] flex items-center justify-center hover:border-[#C9A87C] hover:bg-[#C9A87C]/5 transition-all duration-300 group"
                >
                  <Twitter className="w-4 h-4 text-[#8A8278] group-hover:text-[#C9A87C] transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Arrival date + Package */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="arrivalDate" className={labelClass}>Arrival Date</label>
                <input
                  id="arrivalDate"
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="package" className={labelClass}>Package</label>
                <select
                  id="package"
                  name="package"
                  title="Select a package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>Select one</option>
                  <option value="day-escape">Day Escape — ₱5,000</option>
                  <option value="overnight">Overnight Experience — ₱8,500</option>
                  <option value="extended">Extended Stay — ₱12,000</option>
                </select>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className={labelClass}>Guests</label>
              <select
                id="guests"
                name="guests"
                title="Number of guests"
                value={formData.guests}
                onChange={handleChange}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="message" className={labelClass}>Special Requests</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Dietary requirements, occasion details, preferences…"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-[#1A1610] text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#C9A87C] transition-colors duration-300"
              >
                Submit Reservation Request
              </button>
              <p className="text-[#8A8278] text-xs text-center mt-5 tracking-wide">
                Our team will contact you within 24 hours to confirm
              </p>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
