import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { rateStore, STORE_EVENT } from "@/lib/store";
import type { PackageRate } from "@/lib/types";

export function Packages() {
  const [packages, setPackages] = useState<PackageRate[]>(() => rateStore.getAll());

  // Stay in sync with admin rate changes in real-time
  useEffect(() => {
    const refresh = () => setPackages(rateStore.getAll());
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <section id="packages" className="w-full bg-[#FAF8F4] py-24 md:py-36">
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
            Curated Experiences
          </p>
          <h2 className="font-serif font-normal text-[#1A1610] text-4xl md:text-5xl mb-5">
            Package Options
          </h2>
          <div className="w-10 h-px bg-[#C9A87C]/60 mx-auto" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative flex flex-col p-10 md:p-12 transition-all duration-300 ${
                pkg.featured
                  ? "bg-[#1A1610] shadow-xl"
                  : "bg-white border border-[#E8E0D4] hover:border-[#C9A87C]/40 hover:shadow-md"
              }`}
            >
              {/* Featured top accent */}
              {pkg.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-[#C9A87C]" />
              )}

              {/* Featured badge */}
              {pkg.featured && (
                <div className="absolute top-8 right-8">
                  <span className="text-[#C9A87C] text-[10px] tracking-[0.2em] uppercase border border-[#C9A87C]/40 px-3 py-1">
                    Most Booked
                  </span>
                </div>
              )}

              <p
                className={`text-[10px] tracking-[0.22em] uppercase mb-6 ${
                  pkg.featured ? "text-white/35" : "text-[#8A8278]"
                }`}
              >
                {pkg.description}
              </p>

              <h3
                className={`font-serif font-normal text-2xl mb-8 ${
                  pkg.featured ? "text-white" : "text-[#1A1610]"
                }`}
              >
                {pkg.name}
              </h3>

              {/* Price */}
              <div
                className={`mb-10 pb-10 border-b ${
                  pkg.featured ? "border-white/10" : "border-[#E8E0D4]"
                }`}
              >
                <span
                  className={`text-xs tracking-widest uppercase block mb-1 ${
                    pkg.featured ? "text-white/35" : "text-[#8A8278]"
                  }`}
                >
                  from
                </span>
                <span className="font-serif font-normal text-[#C9A87C] text-4xl md:text-5xl leading-none">
                  ₱{pkg.basePrice.toLocaleString()}
                </span>
                <span
                  className={`text-xs tracking-widest uppercase mt-2 block ${
                    pkg.featured ? "text-white/30" : "text-[#8A8278]"
                  }`}
                >
                  {pkg.unit}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 flex-1 mb-10">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 text-sm ${
                      pkg.featured ? "text-white/60" : "text-[#8A8278]"
                    }`}
                  >
                    <span className="w-4 h-px bg-[#C9A87C]/60 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`block text-center py-3.5 text-[11px] tracking-[0.16em] uppercase font-medium transition-all duration-300 ${
                  pkg.featured
                    ? "bg-[#C9A87C] text-white hover:bg-[#A88B5A]"
                    : "border border-[#1A1610]/30 text-[#1A1610] hover:border-[#C9A87C] hover:text-[#C9A87C]"
                }`}
              >
                Select Package
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
