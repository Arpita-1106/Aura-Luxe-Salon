import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  MapPin,
  Check,
  User,
  Coffee,
  Feather,
  Info,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Award
} from 'lucide-react';
import {
  SALON_LOCATIONS,
  SERVICES,
  ADD_ON_BOOSTERS,
  ARTISANS,
  MEMBERSHIP_TIERS
} from '../data/salonData';
import {
  Booking,
  FragranceNote,
  HerbalTea,
  MembershipTier,
  ServiceItem
} from '../types';
import {
  calculateBookingTotal,
  generateBookingReference,
  validateBookingForm,
  formatINR,
  CURATED_TIME_SLOTS
} from '../utils/booking';

interface BookingScreenProps {
  initialServiceId?: string;
  initialArtisanId?: string;
  initialLocationId?: string;
  activeMembershipTier?: MembershipTier | null;
  onBookingConfirmed: (booking: Booking) => void;
  onCancel: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  initialServiceId,
  initialArtisanId,
  initialLocationId,
  activeMembershipTier,
  onBookingConfirmed,
  onCancel
}) => {
  // Stepper State (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [locationId, setLocationId] = useState<string>(initialLocationId || SALON_LOCATIONS[0].id);
  const [serviceId, setServiceId] = useState<string>(initialServiceId || SERVICES[0].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [artisanId, setArtisanId] = useState<string>(initialArtisanId || 'any');
  
  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [date, setDate] = useState<string>(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState<string>(CURATED_TIME_SLOTS[1]);

  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [fragranceNote, setFragranceNote] = useState<FragranceNote>('sandalwood_amber');
  const [teaPreference, setTeaPreference] = useState<HerbalTea>('kashmiri_kahwa');
  const [conciergeNotes, setConciergeNotes] = useState<string>('');

  // Privé Membership Simulation Option
  const [simulatedTierId, setSimulatedTierId] = useState<string>(activeMembershipTier?.id || 'none');

  // Form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync initial props if changed
  useEffect(() => {
    if (initialServiceId) setServiceId(initialServiceId);
    if (initialArtisanId) setArtisanId(initialArtisanId);
    if (initialLocationId) setLocationId(initialLocationId);
  }, [initialServiceId, initialArtisanId, initialLocationId]);

  // Derived calculations
  const selectedService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];
  const selectedLocation = SALON_LOCATIONS.find(l => l.id === locationId) || SALON_LOCATIONS[0];
  const selectedArtisan = ARTISANS.find(a => a.id === artisanId);
  
  const selectedAddOns = ADD_ON_BOOSTERS.filter(b => selectedAddOnIds.includes(b.id));
  const addOnPrices = selectedAddOns.map(b => b.priceINR);

  // Discount from membership
  const effectiveTier = MEMBERSHIP_TIERS.find(t => t.id === simulatedTierId) || activeMembershipTier;
  const discountPercent = effectiveTier ? effectiveTier.discountPercent : 0;

  const { subtotal, discountAmount, total } = calculateBookingTotal(
    selectedService.priceINR,
    addOnPrices,
    discountPercent
  );

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    // If moving from Step 4 (details) or final submit, validate
    if (currentStep === 4) {
      const validation = validateBookingForm({
        guestName,
        guestPhone,
        guestEmail,
        date,
        timeSlot
      });
      if (!validation.isValid) {
        setFormErrors(validation.errors);
        return;
      }
      setFormErrors({});
    }
    setCurrentStep(prev => Math.min(5, prev + 1));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBookingForm({
      guestName,
      guestPhone,
      guestEmail,
      date,
      timeSlot
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setCurrentStep(4);
      return;
    }

    const referenceCode = generateBookingReference(locationId);

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      referenceCode,
      locationId,
      serviceId,
      addOnIds: selectedAddOnIds,
      artisanId,
      date,
      timeSlot,
      guestName,
      guestPhone,
      guestEmail,
      fragranceNote,
      teaPreference,
      conciergeNotes,
      membershipDiscountPercent: discountPercent,
      totalPriceINR: total,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    onBookingConfirmed(newBooking);
  };

  const steps = [
    { num: 1, label: 'Sanctuary' },
    { num: 2, label: 'Ritual & Boosters' },
    { num: 3, label: 'Artisan & Schedule' },
    { num: 4, label: 'Guest & Sensory' },
    { num: 5, label: 'Pass & Confirm' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C4A4A] block">
          Bespoke Concierge Reservations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#221F20] font-medium">
          Reserve Your Sacred Ceremony
        </h1>
        <p className="text-xs sm:text-sm text-[#5E5557] font-light">
          An unhurried experience tailored to your biological rhythm and sensory desires.
        </p>
      </div>

      {/* Tactile Beads Step Progress Indicator (Design Spec: Pill exceptions for step beads) */}
      <div className="mb-10 max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#EAE3DA] -z-0" />
          {steps.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                disabled={s.num > currentStep}
                className="relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed focus:outline-none"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-xs font-semibold transition-all duration-300 shadow-sm ${
                    isCompleted
                      ? 'bg-[#8C4A4A] text-white'
                      : isCurrent
                      ? 'bg-[#8C4A4A] text-[#FAF7F2] ring-4 ring-[#D49B9B]/30'
                      : 'bg-white text-[#8C8284] border border-[#D6CBC0]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`mt-2 text-[10px] sm:text-[11px] font-medium tracking-[0.04em] whitespace-nowrap ${
                    isCurrent
                      ? 'text-[#8C4A4A] font-semibold'
                      : isCompleted
                      ? 'text-[#221F20]'
                      : 'text-[#8C8284]'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form & Summary Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 Columns) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-[#EAE3DA] shadow-sm">
          
          {/* STEP 1: SELECT SANCTUARY */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#221F20]">
                  Select Your Mumbai Sanctuary
                </h2>
                <p className="text-xs text-[#5E5557] mt-1">
                  Choose the atelier closest to your residence or private occasion.
                </p>
              </div>

              <div className="space-y-4">
                {SALON_LOCATIONS.map((loc) => {
                  const isSelected = locationId === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => setLocationId(loc.id)}
                      className={`p-5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#8C4A4A] bg-[#F5EBEB]/60 shadow-sm ring-1 ring-[#8C4A4A]'
                          : 'border-[#EAE3DA] hover:border-[#DFBE9F] bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8C4A4A]">
                            {loc.neighborhood}
                          </span>
                          <h3 className="font-serif text-lg font-medium text-[#221F20]">
                            {loc.name}
                          </h3>
                          <p className="text-xs text-[#5E5557]">
                            {loc.address}
                          </p>
                        </div>

                        {/* Radio selection control per spec */}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                            isSelected
                              ? 'bg-[#8C4A4A] border-[#8C4A4A]'
                              : 'bg-white border-[#D6CBC0]'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAE3DA]/80 flex flex-wrap items-center gap-3 text-[11px] text-[#735A40]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#8C4A4A]" />
                          {loc.timings}
                        </span>
                        <span>·</span>
                        <span className="font-medium text-[#8C4A4A]">Valet Attendants Available</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: RITUAL & BOOSTERS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#221F20]">
                  Select Primary Ritual & Boosters
                </h2>
                <p className="text-xs text-[#5E5557] mt-1">
                  Choose your foundational treatment and enhance with bio-active boosters.
                </p>
              </div>

              {/* Service Dropdown Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-2">
                  Primary Treatment
                </label>
                <div className="space-y-3">
                  {SERVICES.map((s) => {
                    const isSelected = serviceId === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`p-4 rounded-md border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#8C4A4A] bg-[#F5EBEB]/70 ring-1 ring-[#8C4A4A]'
                            : 'border-[#EAE3DA] hover:border-[#DFBE9F] bg-white'
                        }`}
                      >
                        <div className="space-y-0.5 pr-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-base font-semibold text-[#221F20]">
                              {s.title}
                            </h4>
                            {s.tag && (
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#FAF7F2] text-[#8C4A4A] border border-[#D49B9B]">
                                {s.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#5E5557] line-clamp-1">{s.subtitle}</p>
                          <span className="text-[11px] text-[#8C8284] flex items-center gap-1 pt-0.5">
                            <Clock className="w-3 h-3" /> {s.durationMinutes} Minutes
                          </span>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-serif text-base font-bold text-[#8C4A4A] block">
                            {formatINR(s.priceINR)}
                          </span>
                          <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-[#8C4A4A]' : 'text-[#8C8284]'}`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optional Botanical Boosters */}
              <div className="pt-4 border-t border-[#EAE3DA]">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557]">
                    Optional Botanical Boosters
                  </label>
                  <span className="text-[11px] text-[#8C8284]">Multi-select allowed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADD_ON_BOOSTERS.map((addon) => {
                    const isChecked = selectedAddOnIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'border-[#8C4A4A] bg-[#F5EBEB]/50 ring-1 ring-[#8C4A4A]'
                            : 'border-[#EAE3DA] hover:border-[#DFBE9F] bg-white'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-[3px] border mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-[#8C4A4A] border-[#8C4A4A]'
                              : 'bg-white border-[#D6CBC0]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-[#221F20] block">
                            {addon.title}
                          </span>
                          <span className="text-[11px] text-[#5E5557] line-clamp-2 leading-tight">
                            {addon.description}
                          </span>
                          <span className="text-[11px] font-semibold text-[#8C4A4A] block pt-1">
                            +{formatINR(addon.priceINR)} · {addon.durationMinutes}m
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ARTISAN & SCHEDULE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#221F20]">
                  Master Artisan & Date Selection
                </h2>
                <p className="text-xs text-[#5E5557] mt-1">
                  Choose your preferred therapist or let our concierge assign the first available master.
                </p>
              </div>

              {/* Artisan Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-2">
                  Therapist or Stylist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setArtisanId('any')}
                    className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center gap-3 ${
                      artisanId === 'any'
                        ? 'border-[#8C4A4A] bg-[#F5EBEB] ring-1 ring-[#8C4A4A]'
                        : 'border-[#EAE3DA] bg-white hover:border-[#DFBE9F]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D6CBC0] flex items-center justify-center text-[#8C4A4A]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#221F20]">First Available Master</p>
                      <p className="text-[11px] text-[#8C8284]">Promptest appointment</p>
                    </div>
                  </div>

                  {ARTISANS.map((a) => {
                    const isSelected = artisanId === a.id;
                    return (
                      <div
                        key={a.id}
                        onClick={() => setArtisanId(a.id)}
                        className={`p-3.5 rounded-md border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#8C4A4A] bg-[#F5EBEB] ring-1 ring-[#8C4A4A]'
                            : 'border-[#EAE3DA] bg-white hover:border-[#DFBE9F]'
                        }`}
                      >
                        <img
                          src={a.avatarUrl}
                          alt={a.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#DFBE9F]"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-[#221F20] truncate">{a.name}</p>
                          <p className="text-[10px] text-[#8C4A4A] truncate">{a.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-2">
                  Select Ritual Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={tomorrowStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-12 px-4 rounded-[4px] border border-[#D6CBC0] text-sm text-[#221F20] focus:outline-none focus:border-[#8C4A4A] bg-[#FAF7F2]"
                  />
                </div>
                {formErrors.date && (
                  <p className="text-xs text-[#BA1A1A] mt-1">{formErrors.date}</p>
                )}
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-2">
                  Curated Cadence Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CURATED_TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3 rounded-[4px] text-left text-xs font-medium border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#8C4A4A] text-[#FAF7F2] border-[#8C4A4A] shadow-sm'
                            : 'bg-[#FAF7F2] text-[#221F20] border-[#EAE3DA] hover:border-[#8C4A4A]'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
                {formErrors.timeSlot && (
                  <p className="text-xs text-[#BA1A1A] mt-1">{formErrors.timeSlot}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: GUEST & SENSORY PROFILE */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#221F20]">
                  Guest Details & Sensory Preferences
                </h2>
                <p className="text-xs text-[#5E5557] mt-1">
                  We prepare your suite with customized essential scent notes and arrival tea.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-1">
                    Patron Full Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Maharani Gayatri Chawla"
                    className="w-full h-12 px-4 rounded-[4px] border border-[#D6CBC0] text-sm text-[#221F20] focus:outline-none focus:border-[#8C4A4A]"
                  />
                  {formErrors.guestName && (
                    <p className="text-xs text-[#BA1A1A] mt-1">{formErrors.guestName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-1">
                      Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full h-12 px-4 rounded-[4px] border border-[#D6CBC0] text-sm text-[#221F20] focus:outline-none focus:border-[#8C4A4A]"
                    />
                    {formErrors.guestPhone && (
                      <p className="text-xs text-[#BA1A1A] mt-1">{formErrors.guestPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="patron@domain.in"
                      className="w-full h-12 px-4 rounded-[4px] border border-[#D6CBC0] text-sm text-[#221F20] focus:outline-none focus:border-[#8C4A4A]"
                    />
                    {formErrors.guestEmail && (
                      <p className="text-xs text-[#BA1A1A] mt-1">{formErrors.guestEmail}</p>
                    )}
                  </div>
                </div>

                {/* Fragrance Note Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-2">
                    Suite Fragrance Diffuser Note
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'sandalwood_amber', label: 'Mysore Sandalwood & Amber' },
                      { id: 'kashmiri_rose', label: 'Kashmiri Damask Rose' },
                      { id: 'wild_vetiver', label: 'Wild Vetiver & Cedar' },
                      { id: 'jasmine_sambac', label: 'Night-Blooming Jasmine' },
                      { id: 'fragrance_free', label: 'Fragrance-Neutral Sanctuary' }
                    ].map((frag) => (
                      <button
                        key={frag.id}
                        type="button"
                        onClick={() => setFragranceNote(frag.id as FragranceNote)}
                        className={`p-2.5 rounded text-left text-[11px] font-medium border transition-colors ${
                          fragranceNote === frag.id
                            ? 'bg-[#F5EBEB] text-[#8C4A4A] border-[#8C4A4A] font-semibold'
                            : 'bg-[#FAF7F2] text-[#5E5557] border-[#EAE3DA]'
                        }`}
                      >
                        {frag.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Arrival Tea Preference */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-2">
                    Arrival Welcome Brew
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'kashmiri_kahwa', label: 'Kashmiri Saffron Kahwa' },
                      { id: 'rose_hibiscus', label: 'Rose Petal Hibiscus' },
                      { id: 'lemongrass_ginger', label: 'Lemongrass & Ginger' },
                      { id: 'chamomile_lavender', label: 'Calming Chamomile' }
                    ].map((tea) => (
                      <button
                        key={tea.id}
                        type="button"
                        onClick={() => setTeaPreference(tea.id as HerbalTea)}
                        className={`p-2.5 rounded text-left text-[11px] font-medium border transition-colors ${
                          teaPreference === tea.id
                            ? 'bg-[#F5EBEB] text-[#8C4A4A] border-[#8C4A4A] font-semibold'
                            : 'bg-[#FAF7F2] text-[#5E5557] border-[#EAE3DA]'
                        }`}
                      >
                        {tea.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concierge Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#5E5557] mb-1">
                    Special Concierge Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={conciergeNotes}
                    onChange={(e) => setConciergeNotes(e.target.value)}
                    placeholder="Scalp sensitivity, bridal trousseau timeline, classical music preference, etc."
                    className="w-full p-3 rounded-[4px] border border-[#D6CBC0] text-sm text-[#221F20] focus:outline-none focus:border-[#8C4A4A]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & FINAL PASS CONFIRMATION */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-medium text-[#221F20]">
                  Review & Final Reservation Pass
                </h2>
                <p className="text-xs text-[#5E5557] mt-1">
                  Please review your reservation parameters before issuing your confirmation pass.
                </p>
              </div>

              {/* Review Summary Ticket Card */}
              <div className="bg-[#FAF7F2] p-6 rounded-lg border border-[#DFBE9F] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAE3DA] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8284]">Sanctuary</span>
                    <h4 className="font-serif text-base font-semibold text-[#221F20]">
                      {selectedLocation.name}
                    </h4>
                    <p className="text-xs text-[#5E5557]">{selectedLocation.neighborhood}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C8284]">Scheduled</span>
                    <p className="font-sans text-xs font-semibold text-[#8C4A4A]">{date}</p>
                    <p className="text-xs text-[#5E5557]">{timeSlot}</p>
                  </div>
                </div>

                <div className="space-y-2 border-b border-[#EAE3DA] pb-3 text-xs text-[#5E5557]">
                  <div className="flex justify-between">
                    <span>Primary Ritual:</span>
                    <strong className="text-[#221F20]">{selectedService.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisan:</span>
                    <span className="text-[#221F20]">{selectedArtisan ? selectedArtisan.name : 'First Available Master'}</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between">
                      <span>Add-ons:</span>
                      <span className="text-[#221F20]">{selectedAddOns.map(a => a.title).join(', ')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Guest:</span>
                    <span className="text-[#221F20]">{guestName} ({guestPhone})</span>
                  </div>
                </div>

                {/* Privé Simulator */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#735A40] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#DFBE9F]" />
                      Aura Privé Membership Privileges:
                    </span>
                  </div>
                  <select
                    value={simulatedTierId}
                    onChange={(e) => setSimulatedTierId(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-[#D6CBC0] rounded text-xs text-[#221F20] focus:outline-none focus:border-[#8C4A4A]"
                  >
                    <option value="none">Standard Non-Member Guest (0% Privilege)</option>
                    <option value="silver-palm">The Silver Palm (10% Privilege)</option>
                    <option value="rosewood-circle">The Rosewood Circle (15% Privilege)</option>
                    <option value="imperial-kesar">The Imperial Kesar Club (20% Privilege)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Footer Buttons */}
          <div className="mt-8 pt-5 border-t border-[#EAE3DA] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary text-xs px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Previous Step</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary text-xs px-4"
              >
                Return to Menu
              </button>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary text-xs px-6"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="btn-primary text-xs px-6 bg-[#6F3334] hover:bg-[#592627]"
              >
                <Sparkles className="w-4 h-4 text-[#DFBE9F]" />
                <span>Confirm Luxury Reservation</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Summary Card (5 Columns) */}
        <div className="lg:col-span-5 bg-[#F4EFEB] p-6 sm:p-7 rounded-lg border border-[#EAE3DA] space-y-6 sticky top-28">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8C4A4A] block mb-1">
              Live Reservation Ledger
            </span>
            <h3 className="font-serif text-xl font-medium text-[#221F20]">
              Ritual Summary
            </h3>
          </div>

          <div className="space-y-3 text-xs text-[#5E5557] border-b border-[#EAE3DA] pb-4">
            <div className="flex justify-between items-start">
              <div>
                <strong className="text-[#221F20] block">{selectedService.title}</strong>
                <span className="text-[11px] text-[#8C8284]">{selectedService.durationMinutes} Mins unhurried treatment</span>
              </div>
              <span className="font-serif text-sm font-semibold text-[#221F20]">
                {formatINR(selectedService.priceINR)}
              </span>
            </div>

            {selectedAddOns.map((addon) => (
              <div key={addon.id} className="flex justify-between items-start pt-1">
                <span className="text-[#5E5557]">+ {addon.title}</span>
                <span className="font-serif text-sm text-[#221F20]">
                  {formatINR(addon.priceINR)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Ledger */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#5E5557]">
              <span>Subtotal:</span>
              <span>{formatINR(subtotal)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-[#8C4A4A] font-medium">
                <span>Aura Privé Privilege ({discountPercent}%):</span>
                <span>- {formatINR(discountAmount)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#EAE3DA] flex justify-between items-baseline">
              <span className="font-serif text-base font-semibold text-[#221F20]">Total Honorarium:</span>
              <span className="font-serif text-2xl font-bold text-[#8C4A4A]">
                {formatINR(total)}
              </span>
            </div>
            <p className="text-[10px] text-[#8C8284] pt-1">
              *Inclusive of all luxury taxes, private suite amenities, and welcome refreshments.
            </p>
          </div>

          {/* Selected Sanctuary Details */}
          <div className="bg-white p-4 rounded-md border border-[#EAE3DA] text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-[#8C4A4A] font-semibold text-[11px] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedLocation.name}</span>
            </div>
            <p className="text-[#5E5557] leading-relaxed text-[11px]">
              {selectedLocation.address}
            </p>
            <p className="text-[11px] text-[#8C8284]">
              Concierge Desk: {selectedLocation.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
