import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Packages", href: "#packages" },

    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E8E0D4]"
            : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="House of JAZ"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span
                className={`font-serif text-lg tracking-wide transition-colors duration-300 ${
                  isScrolled ? "text-[#1A1610]" : "text-white"
                }`}
              >
                House of JAZ
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-[#6B5B45] hover:text-[#C9A87C]"
                      : "text-white/75 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`hidden md:inline-flex items-center px-7 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-all duration-300 ${
                  isScrolled
                    ? "bg-[#C9A87C] text-white hover:bg-[#A88B5A]"
                    : "border border-white/50 text-white hover:bg-white/10 hover:border-white"
                }`}
              >
                Reserve Now
              </motion.a>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className={`md:hidden p-2 -mr-1 transition-colors ${
                  isScrolled ? "text-[#1A1610]" : "text-white"
                }`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-100 bg-[#0D0B08] flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-24 border-b border-white/10">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src="/images/logo.jpg"
                  alt="House of JAZ"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-serif text-lg text-white tracking-wide">
                  House of JAZ
                </span>
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center justify-center flex-1 gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-4xl text-white/80 hover:text-white py-3 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 px-12 py-3.5 bg-[#C9A87C] text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#A88B5A] transition-colors"
              >
                Reserve Now
              </motion.a>
            </div>

            {/* Bottom info */}
            <div className="px-6 py-8 text-center">
              <p className="text-white/25 text-xs tracking-widest uppercase">
                House of JAZ — Luxury Resort & Spa
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
