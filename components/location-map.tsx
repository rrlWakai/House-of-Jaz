import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

export function LocationMap() {
  return (
    <section className="w-full bg-[#0D0B08]">

      {/* Minimal header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 pt-20 pb-10"
      >
        <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-4">
          Location
        </p>
        <h2 className="font-serif font-normal text-white text-3xl md:text-4xl">
          Find Us
        </h2>
      </motion.div>

      {/* Full-width map */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.15 }}
        className="w-full h-[420px] md:h-[520px] overflow-hidden"
      >
        <iframe
          title="House of JAZ Location"
          src="https://maps.google.com/maps?q=Marvi+Hills+Chapel+Subdivision+San+Mateo+Rizal+Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full grayscale opacity-75 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      {/* Minimal info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 py-8 border-t border-white/8 flex flex-wrap items-center gap-x-12 gap-y-5"
      >
        <div className="flex items-start gap-3">
          <MapPin className="w-3.5 h-3.5 text-[#C9A87C] mt-0.5 shrink-0" />
          <span className="text-white/50 text-sm">
            St Paul/St Peter Corner, Marvi Hills Chapel Subdivision, San Mateo, Rizal
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-3.5 h-3.5 text-[#C9A87C] shrink-0" />
          <span className="text-white/50 text-sm">Check-in 2:00 PM &nbsp;·&nbsp; Check-out 12:00 PM</span>
        </div>

        <a
          href="https://maps.google.com/?q=Marvi+Hills+Chapel+Subdivision+San+Mateo+Rizal"
          target="_blank"
          rel="noopener noreferrer"
          className="md:ml-auto inline-flex items-center gap-3 text-[#C9A87C] text-[11px] tracking-[0.18em] uppercase font-medium hover:gap-5 transition-all duration-300"
        >
          Get Directions
          <span className="w-6 h-px bg-[#C9A87C]" />
        </a>
      </motion.div>

    </section>
  );
}
