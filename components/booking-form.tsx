import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Tag, CheckCircle, X } from 'lucide-react';
import { bookingStore, rateStore, promoStore, blockedDateStore, STORE_EVENT } from '@/lib/store';
import type { PackageRate, Promo } from '@/lib/types';
import { cn } from '@/lib/utils';

type FormData = {
  arrivalDate: string;
  package: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY_FORM: FormData = {
  arrivalDate: '',
  package: '',
  guests: '2',
  name: '',
  email: '',
  phone: '',
  message: '',
};

const inputClass =
  'w-full bg-transparent border-b border-[#E8E0D4] text-[#1A1610] text-sm placeholder-[#C4B9AD] py-3 focus:outline-none focus:border-[#C9A87C] transition-colors duration-300';

const labelClass = 'block text-[10px] tracking-[0.2em] uppercase text-[#8A8278] mb-2 font-medium';

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [rates, setRates] = useState<PackageRate[]>(() => rateStore.getAll());

  // Promo state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [dateBlocked, setDateBlocked] = useState(false);

  // Keep rates in sync with admin changes
  useEffect(() => {
    const refresh = () => setRates(rateStore.getAll());
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const selectedRate = rates.find(r => r.id === formData.package);
  const basePrice = selectedRate?.basePrice ?? 0;
  const finalPrice = Math.max(0, basePrice - promoDiscount);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Check if selected date is blocked
    if (name === 'arrivalDate' && value) {
      setDateBlocked(blockedDateStore.isBlocked(value));
    }

    // Re-validate promo if package changes (amount may change)
    if (name === 'package' && appliedPromo) {
      setAppliedPromo(null);
      setPromoDiscount(0);
      setPromoCode('');
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    if (!formData.package) {
      setPromoError('Please select a package first.');
      return;
    }
    const result = promoStore.validate(promoCode.trim(), basePrice);
    if (result.valid && result.promo && result.discount != null) {
      setAppliedPromo(result.promo);
      setPromoDiscount(result.discount);
      setPromoError('');
    } else {
      setPromoError(result.error ?? 'Invalid promo code.');
      setAppliedPromo(null);
      setPromoDiscount(0);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
    setPromoCode('');
    setPromoError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.package || !formData.arrivalDate || !formData.name || !formData.email) return;
    if (dateBlocked) return;

    bookingStore.add({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      arrivalDate: formData.arrivalDate,
      package: formData.package as 'day-escape' | 'overnight' | 'extended',
      guests: Number(formData.guests),
      message: formData.message,
      promoCode: appliedPromo?.code,
      discountAmount: promoDiscount > 0 ? promoDiscount : undefined,
      totalPrice: finalPrice,
      status: 'pending',
    });

    if (appliedPromo) {
      promoStore.applyUsage(appliedPromo.id);
    }

    setFormData(EMPTY_FORM);
    setPromoCode('');
    setAppliedPromo(null);
    setPromoDiscount(0);
    setPromoError('');
    setDateBlocked(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="w-full bg-[#FAF8F4] py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-[#C9A87C]/40 rounded-full">
              <CheckCircle className="w-7 h-7 text-[#C9A87C]" />
            </div>
            <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase mb-4">
              Request Received
            </p>
            <h2 className="font-serif font-normal text-[#1A1610] text-3xl mb-4">
              Thank You
            </h2>
            <div className="w-8 h-px bg-[#C9A87C] mx-auto mb-6" />
            <p className="text-[#8A8278] text-sm leading-relaxed mb-8">
              Your reservation request has been submitted. Our team will contact you within 24 hours to confirm your booking.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-[#1A1610] text-[11px] tracking-[0.18em] uppercase hover:text-[#C9A87C] transition-colors"
            >
              Make another request →
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full bg-[#FAF8F4] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left: Contact info + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C9A87C] text-[11px] tracking-[0.28em] uppercase font-medium mb-6">
              Reservations
            </p>
            <h2 className="font-serif font-normal text-[#1A1610] text-4xl md:text-5xl leading-tight mb-8">
              Reserve Your<br />Experience
            </h2>
            <div className="w-10 h-px bg-[#C9A87C] mb-12" />

            {/* Contact details */}
            <div className="space-y-6 mb-14">
              <a href="tel:+15551234567" className="flex items-start gap-4 group">
                <div className="w-9 h-9 border border-[#E8E0D4] flex items-center justify-center shrink-0 group-hover:border-[#C9A87C] transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">Phone</p>
                  <p className="text-[#1A1610] text-sm group-hover:text-[#C9A87C] transition-colors duration-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </a>

              <a href="mailto:reservations@houseofjaz.com" className="flex items-start gap-4 group">
                <div className="w-9 h-9 border border-[#E8E0D4] flex items-center justify-center shrink-0 group-hover:border-[#C9A87C] transition-colors duration-300">
                  <Mail className="w-3.5 h-3.5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">Email</p>
                  <p className="text-[#1A1610] text-sm group-hover:text-[#C9A87C] transition-colors duration-300">
                    reservations@houseofjaz.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 border border-[#E8E0D4] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A87C]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#8A8278] mb-1">Address</p>
                  <p className="text-[#1A1610] text-sm leading-relaxed">
                    St Paul/St Peter Corner,<br />
                    Marvi Hills Chapel Subdivision,<br />
                    San Mateo, Rizal
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#E8E0D4] mb-10" />

            {/* Social media */}
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8A8278] mb-6">Follow Us</p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter / X' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 border border-[#E8E0D4] flex items-center justify-center hover:border-[#C9A87C] hover:bg-[#C9A87C]/5 transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-[#8A8278] group-hover:text-[#C9A87C] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Arrival date + Package */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="arrivalDate" className={labelClass}>Arrival Date</label>
                <input
                  id="arrivalDate"
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={cn(inputClass, dateBlocked && 'border-red-400 text-red-500')}
                />
                {dateBlocked && (
                  <p className="text-red-500 text-xs mt-1.5">
                    This date is not available. Please choose another date.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="package" className={labelClass}>Package</label>
                <select
                  id="package"
                  name="package"
                  title="Select a package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>Select one</option>
                  {rates.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} — ₱{r.basePrice.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className={labelClass}>Guests</label>
              <select
                id="guests"
                name="guests"
                title="Number of guests"
                value={formData.guests}
                onChange={handleChange}
                className={inputClass}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+63 9XX XXX XXXX"
                className={inputClass}
              />
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="message" className={labelClass}>Special Requests</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Dietary requirements, occasion details, preferences…"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Promo Code */}
            <div>
              <label className={labelClass}>Promo Code (optional)</label>
              {appliedPromo ? (
                <div className="flex items-center gap-3 py-2">
                  <div className="flex items-center gap-2 flex-1 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded">
                    <Tag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-mono text-sm font-medium text-emerald-700">
                      {appliedPromo.code}
                    </span>
                    <span className="text-xs text-emerald-600 ml-auto">
                      {appliedPromo.type === 'percentage'
                        ? `${appliedPromo.value}% off`
                        : `₱${appliedPromo.value.toLocaleString()} off`}
                    </span>
                  </div>
                  <button
                    type="button"
                    title="Remove promo code"
                    onClick={handleRemovePromo}
                    className="text-[#8A8278] hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoError('');
                    }}
                    placeholder="Enter code"
                    className={`${inputClass} uppercase`}
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="shrink-0 px-4 py-2 border border-[#C9A87C] text-[#C9A87C] text-[11px] tracking-[0.14em] uppercase hover:bg-[#C9A87C] hover:text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-red-500 text-xs mt-1.5">{promoError}</p>
              )}
            </div>

            {/* Price summary (shown when package is selected) */}
            {selectedRate && (
              <div className="border border-[#E8E0D4] p-5 bg-white space-y-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A8278]">
                  Price Summary
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A8278]">{selectedRate.name}</span>
                  <span className="text-[#1A1610]">₱{basePrice.toLocaleString()}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Promo discount</span>
                    <span className="text-emerald-600">−₱{promoDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="h-px bg-[#E8E0D4]" />
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-[#1A1610]">Total</span>
                  <span className="font-serif text-[#C9A87C] text-xl">
                    ₱{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={dateBlocked}
                className={cn(
                  'w-full py-4 text-white text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300',
                  dateBlocked
                    ? 'bg-[#C4B9AD] cursor-not-allowed'
                    : 'bg-[#1A1610] hover:bg-[#C9A87C]'
                )}
              >
                Submit Reservation Request
              </button>
              <p className="text-[#8A8278] text-xs text-center mt-5 tracking-wide">
                Our team will contact you within 24 hours to confirm
              </p>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
