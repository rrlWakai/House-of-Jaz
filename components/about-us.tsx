import { motion } from 'framer-motion';

export function AboutUs() {
  const stats = [
    { value: '500+', label: 'Satisfied Guests' },
    { value: '4.9★', label: 'Guest Rating' },
    { value: '24/7', label: 'Dedicated Service' },
    { value: '100%', label: 'Private Events' },
  ];

  return (
    <section id="about" className="w-full bg-[#FAF8F4] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <img
              src="/images/about-us.png"
              alt="House of JAZ Luxury Resort"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-[#C9A87C]/25 -z-10 hidden md:block" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-6">
              About House of JAZ
            </p>
            <h2 className="font-serif font-normal text-[#1A1610] text-4xl md:text-5xl leading-tight mb-8">
              Where Modern Luxury<br />Meets Tranquility
            </h2>

            <div className="w-10 h-px bg-[#C9A87C] mb-8" />

            <p className="text-[#8A8278] text-base leading-relaxed mb-5">
              House of JAZ is a carefully curated private resort designed for those who appreciate the finer things. Our modern architecture seamlessly blends with luxurious comfort, offering an escape from the ordinary.
            </p>
            <p className="text-[#8A8278] text-base leading-relaxed mb-14">
              Every detail has been thoughtfully considered — from the heated jacuzzi overlooking our pristine pool, to the meticulously furnished suites that provide the perfect sanctuary for rest and rejuvenation.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[#E8E0D4] pt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                >
                  <span className="font-serif font-normal text-[#C9A87C] text-2xl md:text-3xl block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[#8A8278] text-xs tracking-[0.12em] uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
