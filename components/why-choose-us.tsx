import { motion } from 'framer-motion';

export function WhyChooseUs() {
  const reasons = [
    {
      number: '01',
      title: 'Architectural Excellence',
      description: 'Modern design meets timeless elegance in every corner of the estate.',
    },
    {
      number: '02',
      title: 'Sustainability',
      description: 'Eco-conscious luxury crafted with minimal environmental footprint.',
    },
    {
      number: '03',
      title: 'Personalized Service',
      description: 'A dedicated team attending to your every preference, around the clock.',
    },
    {
      number: '04',
      title: 'Exclusive Location',
      description: 'A secluded private estate — close to the world, removed from it entirely.',
    },
    {
      number: '05',
      title: 'Premium Amenities',
      description: 'State-of-the-art facilities designed for both performance and pleasure.',
    },
    {
      number: '06',
      title: 'Unforgettable Moments',
      description: 'Create lasting memories in an extraordinary and intimate setting.',
    },
  ];

  return (
    <section className="w-full bg-[#FAF8F4] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-5">
            Why Choose Us
          </p>
          <h2 className="font-serif font-normal text-[#1A1610] text-4xl md:text-5xl leading-tight max-w-lg">
            The Ultimate Luxury Experience
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E8E0D4]">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 border-b border-r border-[#E8E0D4] hover:bg-white transition-colors duration-400"
            >
              <span className="block font-serif font-normal text-[#C9A87C]/35 group-hover:text-[#C9A87C]/65 text-4xl leading-none mb-8 transition-colors duration-400">
                {reason.number}
              </span>
              <h3 className="font-serif font-normal text-[#1A1610] text-xl mb-4">
                {reason.title}
              </h3>
              <p className="text-[#8A8278] text-sm leading-relaxed">
                {reason.description}
              </p>
              <div className="mt-8 w-0 h-px bg-[#C9A87C] group-hover:w-8 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
