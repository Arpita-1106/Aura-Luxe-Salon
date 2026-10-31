import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  calculateBookingTotal,
  generateBookingReference,
  filterServices,
  validateBookingForm
} from './booking.ts';
import { SERVICES } from '../data/salonData.ts';

test('formatINR formats currency properly in Indian numbering system', () => {
  assert.equal(formatINR(0), '₹0');
  // Check that it starts with ₹ and contains the amount
  assert.match(formatINR(8500), /₹\s?8,500/);
  assert.match(formatINR(145000), /₹\s?1,45,000/);
});

test('calculateBookingTotal computes subtotal, discount, and net total correctly', () => {
  // Base case without addons or discount
  const base = calculateBookingTotal(5000, [], 0);
  assert.equal(base.subtotal, 5000);
  assert.equal(base.discountAmount, 0);
  assert.equal(base.total, 5000);

  // With addons (2200 + 1500 = 3700) -> subtotal = 8700
  const withAddons = calculateBookingTotal(5000, [2200, 1500], 0);
  assert.equal(withAddons.subtotal, 8700);
  assert.equal(withAddons.total, 8700);

  // With 15% discount
  // 8700 * 0.15 = 1305 -> total = 8700 - 1305 = 7395
  const withDiscount = calculateBookingTotal(5000, [2200, 1500], 15);
  assert.equal(withDiscount.subtotal, 8700);
  assert.equal(withDiscount.discountAmount, 1305);
  assert.equal(withDiscount.total, 7395);
});

test('generateBookingReference produces location-coded unique references', () => {
  const bandraRef = generateBookingReference('bandra-pali-hill');
  assert.match(bandraRef, /^AURA-BND-\d{4}$/);

  const colabaRef = generateBookingReference('colaba-heritage');
  assert.match(colabaRef, /^AURA-COL-\d{4}$/);

  const juhuRef = generateBookingReference('juhu-coastal');
  assert.match(juhuRef, /^AURA-JUH-\d{4}$/);
});

test('filterServices filters correctly by category and text search', () => {
  // All category returns full length
  const all = filterServices(SERVICES, 'all', '');
  assert.equal(all.length, SERVICES.length);

  // Hair category returns only hair services
  const hairOnly = filterServices(SERVICES, 'hair', '');
  assert.ok(hairOnly.length > 0);
  assert.ok(hairOnly.every(s => s.category === 'hair'));

  // Search by keyword "saffron" (Kesar)
  const saffronMatches = filterServices(SERVICES, 'all', 'saffron');
  assert.ok(saffronMatches.length > 0);
  assert.ok(saffronMatches.some(s => s.id === 'royal-kesar-cellular-glow'));

  // Search by ingredient "Camellia"
  const camelliaMatches = filterServices(SERVICES, 'all', 'camellia');
  assert.ok(camelliaMatches.length > 0);
  assert.ok(camelliaMatches.some(s => s.id === 'kintsugi-hair-restoration'));
});

test('validateBookingForm accurately detects missing and invalid inputs', () => {
  // Valid form
  const valid = validateBookingForm({
    guestName: 'Ananya Roy',
    guestPhone: '+91 98201 12345',
    guestEmail: 'ananya@roy.com',
    date: '2026-11-10',
    timeSlot: '11:00 AM (Morning Quietude)'
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);

  // Invalid form (empty name, bad email, bad phone)
  const invalid = validateBookingForm({
    guestName: ' ',
    guestPhone: 'abc',
    guestEmail: 'not-an-email',
    date: '',
    timeSlot: ''
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.guestName);
  assert.ok(invalid.errors.guestPhone);
  assert.ok(invalid.errors.guestEmail);
  assert.ok(invalid.errors.date);
  assert.ok(invalid.errors.timeSlot);
});
