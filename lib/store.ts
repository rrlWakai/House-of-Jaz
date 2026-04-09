import type { Booking, PackageRate, Promo, BlockedDate } from './types';

export const STORE_EVENT = 'hoj:store:update';

const KEYS = {
  bookings: 'hoj_bookings',
  rates: 'hoj_rates',
  promos: 'hoj_promos',
  blockedDates: 'hoj_blocked_dates',
};

const DEFAULT_RATES: PackageRate[] = [
  {
    id: 'day-escape',
    name: 'Day Escape',
    basePrice: 5000,
    unit: 'per day',
    description: 'A curated daytime experience for those seeking a brief retreat.',
    features: ['4-hour access', 'Pool & Jacuzzi', 'Light refreshments', 'Changing facilities'],
    featured: false,
  },
  {
    id: 'overnight',
    name: 'Overnight Experience',
    basePrice: 8500,
    unit: 'per night',
    description: 'Our most sought-after package — a full overnight immersion in luxury.',
    features: ['Luxury suite', 'Dinner & breakfast', 'Airport transfer'],
    featured: true,
  },
  {
    id: 'extended',
    name: 'Extended Stay',
    basePrice: 12000,
    unit: 'per stay',
    description: 'Three nights of unhurried luxury with every amenity at your disposal.',
    features: ['3-night package', 'Premium suite', 'All meals included'],
    featured: false,
  },
];

function get<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function set<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key } }));
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export const bookingStore = {
  getAll: (): Booking[] => get<Booking[]>(KEYS.bookings, []),

  add: (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    set(KEYS.bookings, [...bookingStore.getAll(), newBooking]);
    return newBooking;
  },

  updateStatus: (id: string, status: Booking['status']): void => {
    const bookings = bookingStore.getAll().map(b =>
      b.id === id ? { ...b, status } : b
    );
    set(KEYS.bookings, bookings);
  },

  delete: (id: string): void => {
    set(KEYS.bookings, bookingStore.getAll().filter(b => b.id !== id));
  },

  getByDate: (date: string): Booking[] =>
    bookingStore.getAll().filter(b => b.arrivalDate === date),
};

// ── Rates ─────────────────────────────────────────────────────────────────────

export const rateStore = {
  getAll: (): PackageRate[] => get<PackageRate[]>(KEYS.rates, DEFAULT_RATES),

  getById: (id: string): PackageRate | undefined =>
    rateStore.getAll().find(r => r.id === id),

  update: (id: string, updates: Partial<PackageRate>): void => {
    const rates = rateStore.getAll().map(r =>
      r.id === id ? { ...r, ...updates } : r
    );
    set(KEYS.rates, rates);
  },
};

// ── Promos ────────────────────────────────────────────────────────────────────

export const promoStore = {
  getAll: (): Promo[] => get<Promo[]>(KEYS.promos, []),

  add: (promo: Omit<Promo, 'id' | 'usageCount'>): Promo => {
    const newPromo: Promo = { ...promo, id: crypto.randomUUID(), usageCount: 0 };
    set(KEYS.promos, [...promoStore.getAll(), newPromo]);
    return newPromo;
  },

  update: (id: string, updates: Partial<Promo>): void => {
    const promos = promoStore.getAll().map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    set(KEYS.promos, promos);
  },

  delete: (id: string): void => {
    set(KEYS.promos, promoStore.getAll().filter(p => p.id !== id));
  },

  validate: (
    code: string,
    amount: number
  ): { valid: boolean; promo?: Promo; discount?: number; error?: string } => {
    const promo = promoStore
      .getAll()
      .find(p => p.code.toUpperCase() === code.toUpperCase() && p.isActive);
    if (!promo) return { valid: false, error: 'Invalid promo code' };

    const now = new Date();
    if (new Date(promo.validFrom) > now)
      return { valid: false, error: 'Promo not yet valid' };
    if (new Date(promo.validUntil) < now)
      return { valid: false, error: 'Promo has expired' };
    if (promo.usageLimit != null && promo.usageCount >= promo.usageLimit)
      return { valid: false, error: 'Promo usage limit reached' };
    if (promo.minBookingAmount != null && amount < promo.minBookingAmount)
      return {
        valid: false,
        error: `Minimum booking amount: ₱${promo.minBookingAmount.toLocaleString()}`,
      };

    const discount =
      promo.type === 'percentage'
        ? Math.round(amount * (promo.value / 100))
        : promo.value;

    return { valid: true, promo, discount };
  },

  applyUsage: (id: string): void => {
    const promos = promoStore
      .getAll()
      .map(p => (p.id === id ? { ...p, usageCount: p.usageCount + 1 } : p));
    set(KEYS.promos, promos);
  },
};

// ── Blocked Dates ─────────────────────────────────────────────────────────────

export const blockedDateStore = {
  getAll: (): BlockedDate[] => get<BlockedDate[]>(KEYS.blockedDates, []),

  isBlocked: (date: string): boolean =>
    blockedDateStore.getAll().some(d => d.date === date),

  toggle: (date: string, reason?: string): void => {
    const dates = blockedDateStore.getAll();
    const exists = dates.find(d => d.date === date);
    if (exists) {
      set(KEYS.blockedDates, dates.filter(d => d.date !== date));
    } else {
      set(KEYS.blockedDates, [...dates, { date, reason }]);
    }
  },

  setReason: (date: string, reason: string): void => {
    const dates = blockedDateStore.getAll().map(d =>
      d.date === date ? { ...d, reason } : d
    );
    set(KEYS.blockedDates, dates);
  },
};
