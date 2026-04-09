export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  arrivalDate: string;
  package: 'day-escape' | 'overnight' | 'extended';
  guests: number;
  message: string;
  promoCode?: string;
  discountAmount?: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface PackageRate {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface Promo {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minBookingAmount?: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  description?: string;
}

export interface BlockedDate {
  date: string; // YYYY-MM-DD format
  reason?: string;
}
