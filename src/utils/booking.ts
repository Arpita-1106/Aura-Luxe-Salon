import { ServiceItem, SalonLocation, Booking, ServiceCategoryId } from '../types';

/**
 * Format numbers as Indian Rupee (INR) currency strings
 * e.g. 8500 -> "₹8,500"
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculate the subtotal, applied membership discount, and final total
 */
export function calculateBookingTotal(
  servicePrice: number,
  addOnPrices: number[] = [],
  discountPercent: number = 0
): { subtotal: number; discountAmount: number; total: number } {
  const safeServicePrice = Math.max(0, servicePrice || 0);
  const addonsTotal = addOnPrices.reduce((sum, p) => sum + Math.max(0, p || 0), 0);
  const subtotal = safeServicePrice + addonsTotal;
  
  const clampedDiscount = Math.max(0, Math.min(100, discountPercent || 0));
  const discountAmount = Math.round((subtotal * clampedDiscount) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return { subtotal, discountAmount, total };
}

/**
 * Generates an elegant, unique reservation code
 * e.g., "AURA-BND-4982"
 */
export function generateBookingReference(locationId: string): string {
  let prefix = 'MUM';
  if (locationId.includes('bandra')) prefix = 'BND';
  else if (locationId.includes('colaba')) prefix = 'COL';
  else if (locationId.includes('juhu')) prefix = 'JUH';

  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `AURA-${prefix}-${randomDigits}`;
}

/**
 * Filter services by category and text search query
 */
export function filterServices(
  services: ServiceItem[],
  category: ServiceCategoryId,
  searchQuery: string = ''
): ServiceItem[] {
  const query = searchQuery.trim().toLowerCase();

  return services.filter((service) => {
    const matchesCategory = category === 'all' || service.category === category;
    if (!matchesCategory) return false;

    if (!query) return true;

    const matchesTitle = service.title.toLowerCase().includes(query);
    const matchesSubtitle = service.subtitle.toLowerCase().includes(query);
    const matchesDescription = service.description.toLowerCase().includes(query);
    const matchesIngredient = service.botanicalIngredients.some(ing => ing.toLowerCase().includes(query));
    const matchesTag = service.tag?.toLowerCase().includes(query);

    return matchesTitle || matchesSubtitle || matchesDescription || matchesIngredient || Boolean(matchesTag);
  });
}

/**
 * Validate booking form fields
 */
export function validateBookingForm(data: {
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  date: string;
  timeSlot: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.guestName || data.guestName.trim().length < 2) {
    errors.guestName = 'Please enter your full name (minimum 2 characters)';
  }

  // Basic Indian or international phone check: digits, optional +, at least 8 digits
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
  if (!data.guestPhone || !phoneRegex.test(data.guestPhone.trim())) {
    errors.guestPhone = 'Please provide a valid contact telephone number';
  }

  // Basic email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.guestEmail || !emailRegex.test(data.guestEmail.trim())) {
    errors.guestEmail = 'Please provide a valid email address';
  }

  if (!data.date) {
    errors.date = 'Please select a preferred date for your ritual';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select an appointment time slot';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generates an .ics calendar file content for download
 */
export function generateIcsCalendar(
  booking: Booking,
  service: ServiceItem,
  location: SalonLocation
): string {
  const dateFormatted = booking.date.replace(/-/g, '');
  // Default to 10:00 AM UTC if time parsing is tricky
  const startTime = `${dateFormatted}T100000Z`;
  const endTime = `${dateFormatted}T120000Z`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aura Luxe Salon Mumbai//Reservations//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:Aura Luxe: ${service.title}`,
    `DESCRIPTION:Reservation Reference: ${booking.referenceCode}\\nService: ${service.title} (${service.durationMinutes} mins)\\nSanctuary: ${location.name}\\nAddress: ${location.address}\\nGuest: ${booking.guestName}\\nConcierge Desk: ${location.phone}`,
    `LOCATION:${location.address}`,
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Curated luxury time slots throughout the day
 */
export const CURATED_TIME_SLOTS = [
  '09:30 AM (Dawn Radiance)',
  '11:00 AM (Morning Quietude)',
  '01:00 PM (Midday Rejuvenation)',
  '03:00 PM (Afternoon Serenity)',
  '04:30 PM (Golden Hour)',
  '06:00 PM (Twilight Pampering)',
  '07:30 PM (Evening Unwind)'
];
