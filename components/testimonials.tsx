import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Luxury Travel Consultant',
      initials: 'SM',
      text: 'An absolutely transformative experience. House of JAZ redefines what luxury hospitality should be — every moment felt intentional and extraordinary.',
      rating: 5,
    },
    {
      name: 'James Richardson',
      role: 'Architecture Enthusiast',
      initials: 'JR',
      text: 'The design is impeccable. Every corner reveals another layer of thoughtful detail. I have stayed in five-star properties worldwide — this surpasses them all.',
      rating: 5,
    },
    {
      name: 'Elena Gonzalez',
      role: 'Wellness Expert',
      initials: 'EG',
      text: 'The spa and wellness facilities are genuinely world-class. The sense of calm that permeates the entire property is something I recommend to all my clients.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="w-full bg-[#0D0B08] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-5">
            Guest Stories
          </p>
          <h2 className="font-serif font-normal text-white text-4xl md:text-5xl mb-5">
            What Our Guests Say
          </h2>
          <div className="w-10 h-px bg-[#C9A87C]/50 mx-auto" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0D0B08] hover:bg-[#111009] transition-colors duration-300 p-10 md:p-12 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9A87C] text-[#C9A87C]" />
                ))}
              </div>

              {/* Large decorative quote */}
              <span className="font-serif text-6xl text-[#C9A87C]/20 leading-none mb-2 -mt-2">"</span>

              {/* Quote text */}
              <p className="font-serif italic text-white/60 text-base leading-relaxed flex-1 mb-10">
                {t.text}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-[#C9A87C]/40 mb-8" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A87C]/15 border border-[#C9A87C]/30 flex items-center justify-center shrink-0">
                  <span className="font-serif text-[#C9A87C] text-xs font-medium">{t.initials}</span>
                </div>
                <div>
                  <p className="font-serif text-white text-sm">{t.name}</p>
                  <p className="text-white/35 text-xs tracking-wide mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
