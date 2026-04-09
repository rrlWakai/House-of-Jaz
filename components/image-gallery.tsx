import { motion } from 'framer-motion';

export function ImageGallery() {
  const images = [
    { src: '/images/pool.jpg', alt: 'Olympic Pool', title: 'Pool & Wellness' },
    { src: '/images/house-lounge.png', alt: 'Lounge Area', title: 'Lounge Area' },
    { src: '/images/house-dining.png', alt: 'Dining Hall', title: 'Fine Dining' },
    { src: '/images/house-living.jpg', alt: 'Living Room', title: 'Living Spaces' },
    { src: '/images/house-bedroom.png', alt: 'Bedroom Suite', title: 'Suites' },
    { src: '/images/waterfall.jpg', alt: 'Water Feature', title: 'Waterfall' },
  ];

  return (
    <section id="gallery" className="w-full bg-[#0D0B08] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-5">Gallery</p>
            <h2 className="font-serif font-normal text-white text-4xl md:text-5xl leading-tight">
              The Art of Living
            </h2>
          </div>
          <p className="text-white/35 text-sm max-w-56 md:text-right leading-relaxed">
            Explore the spaces that define luxury
          </p>
        </motion.div>

        {/* Editorial grid: large first + 2 small | 3 across */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">

          {/* Featured image — tall, spans 1 col on mobile, 1 col on md but 2 rows tall */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0 }}
            className="relative overflow-hidden group col-span-2 md:col-span-1 md:row-span-2"
            style={{ minHeight: '360px' }}
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-white font-serif text-lg">{images[0].title}</p>
            </div>
          </motion.div>

          {/* Remaining 5 images */}
          {images.slice(1).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.08 + index * 0.07 }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-white font-serif text-sm md:text-base">{image.title}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
