import { motion } from 'framer-motion';

export function ExperienceGrid() {
  const experiences = [
    {
      number: '01',
      title: 'Olympic Pool',
      description: 'State-of-the-art aquatic facilities with heated pools and dedicated relaxation zones overlooking the estate.',
    },
    {
      number: '02',
      title: 'Spa Sanctuary',
      description: 'A world-class wellness center offering traditional and modern treatments in a serene, private environment.',
    },
    {
      number: '03',
      title: 'Gourmet Dining',
      description: 'Curated culinary experiences crafted by award-winning chefs, served in an atmosphere of understated elegance.',
    },
    {
      number: '04',
      title: 'Luxury Suites',
      description: 'Exclusively designed accommodations where every detail — from the linens to the lighting — is considered.',
    },
  ];

  return (
    <section id="experience" className="w-full bg-[#FAF8F4] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header — split layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-5"
            >
              Our Offerings
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-normal text-[#1A1610] text-4xl md:text-5xl leading-tight"
            >
              World-Class<br />Experiences
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#8A8278] text-sm leading-relaxed max-w-64 md:text-right"
          >
            Every detail is crafted to provide unforgettable moments of pure luxury and quiet indulgence.
          </motion.p>
        </div>

        {/* 2×2 bordered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#E8E0D4]">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-10 md:p-12 border-b border-r border-[#E8E0D4] hover:bg-white transition-colors duration-500"
            >
              <span className="block font-serif font-normal text-[#C9A87C]/40 group-hover:text-[#C9A87C]/70 text-5xl leading-none mb-8 transition-colors duration-500">
                {exp.number}
              </span>
              <h3 className="font-serif font-normal text-[#1A1610] text-2xl mb-4">
                {exp.title}
              </h3>
              <p className="text-[#8A8278] text-sm leading-relaxed">
                {exp.description}
              </p>
              <div className="mt-8 w-8 h-px bg-[#C9A87C]/0 group-hover:bg-[#C9A87C] group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
