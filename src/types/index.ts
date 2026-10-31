export interface SalonLocation {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  address: string;
  phone: string;
  valetAvailable: boolean;
  privateSuitesCount: number;
  timings: string;
  landmark: string;
  imageUrl: string;
  features: string[];
}

export type ServiceCategoryId = 'all' | 'hair' | 'skin' | 'spa' | 'bridal' | 'nails';

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  description: string;
}

export interface RitualStep {
  stepNumber: number;
  name: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategoryId;
  subtitle: string;
  durationMinutes: number;
  priceINR: number;
  tag?: string; // e.g. "Ayurvedic Fusion", "Award Winner", "Signature Ritual", "Rare Botanical"
  description: string;
  ritualSteps: RitualStep[];
  botanicalIngredients: string[];
  imageUrl: string;
  bestFor: string;
  isPopular?: boolean;
}

export interface AddOnBooster {
  id: string;
  title: string;
  priceINR: number;
  durationMinutes: number;
  description: string;
  botanicalKey: string;
}

export interface Artisan {
  id: string;
  name: string;
  role: string;
  title: string;
  experienceYears: number;
  locationIds: string[];
  specialty: string;
  bio: string;
  avatarUrl: string;
  rating: number;
  reviewsCount: number;
  signatureRitualId: string;
  availableDays: string[];
}

export type FragranceNote = 'sandalwood_amber' | 'kashmiri_rose' | 'wild_vetiver' | 'jasmine_sambac' | 'fragrance_free';

export type HerbalTea = 'kashmiri_kahwa' | 'rose_hibiscus' | 'lemongrass_ginger' | 'chamomile_lavender';

export interface Booking {
  id: string;
  referenceCode: string;
  locationId: string;
  serviceId: string;
  addOnIds: string[];
  artisanId: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  fragranceNote: FragranceNote;
  teaPreference: HerbalTea;
  conciergeNotes?: string;
  membershipDiscountPercent?: number;
  totalPriceINR: number;
  createdAt: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  annualDuesINR: number;
  discountPercent: number;
  perks: string[];
  complimentaryBlowouts: number;
  valetPriority: boolean;
  champagneService: boolean;
  privateSuiteGuarantee: boolean;
  color: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  neighborhood: string;
  rating: number;
  ritualName: string;
  comment: string;
  date: string;
}
