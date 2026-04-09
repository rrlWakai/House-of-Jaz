import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-160 overflow-hidden bg-[#0D0B08]">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Single gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/65" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#C9A87C] text-[11px] tracking-[0.35em] uppercase font-medium mb-7"
        >
          Luxury Home Rental
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-normal text-white leading-none tracking-tight text-[clamp(3.5rem,12vw,9rem)] mb-7"
        >
          House of JAZ
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: "50%" }}
          className="w-14 h-px bg-[#C9A87C] mb-7"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-white/65 text-base md:text-lg max-w-sm mx-auto mb-12"
        >
          Where architecture meets serenity
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#contact"
            className="px-10 py-3.5 bg-[#C9A87C] text-white text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#A88B5A] transition-colors duration-300"
          >
            Reserve Your Stay
          </a>
          <a
            href="#experience"
            className="px-10 py-3.5 border border-white/40 text-white text-[11px] tracking-[0.16em] uppercase font-medium hover:border-white/80 hover:bg-white/5 transition-all duration-300"
          >
            Discover More
          </a>
        </motion.div>
      </div>

      {/* Animated scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="relative h-14 w-px overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-full bg-linear-to-b from-transparent via-white/60 to-transparent"
          />
        </div>
        <span className="text-white/35 text-[9px] tracking-[0.3em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
