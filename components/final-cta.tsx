import { motion } from 'framer-motion';

export function FinalCTA() {
  return (
    <section className="w-full relative overflow-hidden cta-bg">
      {/* Gradient overlay — heavier at edges, clear in center */}
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/65" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto px-6 py-32 md:py-48 text-center"
      >
        {/* Eyebrow */}
        <p className="text-[#C9A87C] text-[11px] tracking-[0.32em] uppercase font-medium mb-8">
          Limited Availability
        </p>

        {/* Heading */}
        <h2 className="font-serif font-normal text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
          Ready to Escape?
        </h2>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ originX: '50%' }}
          className="w-12 h-px bg-[#C9A87C] mx-auto mb-8"
        />

        {/* Subtext */}
        <p className="text-white/65 text-base md:text-lg max-w-xl mx-auto mb-14 leading-relaxed">
          Reserve your dates today and discover why House of JAZ is the ultimate private luxury destination.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <a
            href="#contact"
            className="px-12 py-4 bg-[#C9A87C] text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#A88B5A] transition-colors duration-300"
          >
            Reserve Now
          </a>
          <a
            href="#packages"
            className="px-12 py-4 border border-white/40 text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:border-white/80 hover:bg-white/5 transition-all duration-300"
          >
            View Packages
          </a>
        </div>

        {/* Trust line */}
        <p className="text-white/35 text-xs tracking-[0.12em]">
          Early reservations receive exclusive complimentary upgrades
        </p>
      </motion.div>
    </section>
  );
}
