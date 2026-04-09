import { motion } from 'framer-motion';

export function TrustBar() {
  const stats = [
    { value: '500+', label: 'Guests Welcomed' },
    { value: '4.9', label: 'Average Rating' },
    { value: '5 Star', label: 'Luxury Service' },
    { value: '2018', label: 'Established' },
  ];

  return (
    <section className="w-full bg-[#0D0B08]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
            >
              <span className="font-serif font-normal text-[#C9A87C] text-3xl md:text-4xl mb-2 leading-none">
                {stat.value}
              </span>
              <span className="text-white/35 text-[10px] tracking-[0.2em] uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
