import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function MobileBookingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrolled > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D0B08] border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-serif text-white text-base leading-tight">Ready to Reserve?</p>
              <p className="text-white/35 text-xs tracking-wide mt-0.5">Limited availability</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-[#C9A87C] text-white text-[10px] tracking-[0.16em] uppercase font-medium hover:bg-[#A88B5A] transition-colors duration-300"
              >
                Book Now
              </a>
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="p-2 text-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
