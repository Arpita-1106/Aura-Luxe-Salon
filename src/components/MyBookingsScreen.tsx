import React, { useState } from 'react';
import { BookmarkCheck, Calendar, Clock, MapPin, Download, Trash2, Sparkles, Coffee, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Booking } from '../types';
import { SERVICES, SALON_LOCATIONS, ARTISANS, ADD_ON_BOOSTERS } from '../data/salonData';
import { formatINR, generateIcsCalendar } from '../utils/booking';

interface MyBookingsScreenProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onNavigateToBooking: () => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  bookings,
  onCancelBooking,
  onNavigateToBooking
}) => {
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const handleDownloadCalendar = (booking: Booking) => {
    const service = SERVICES.find(s => s.id === booking.serviceId) || SERVICES[0];
    const location = SALON_LOCATIONS.find(l => l.id === booking.locationId) || SALON_LOCATIONS[0];
    
    const icsContent = generateIcsCalendar(booking, service, location);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.referenceCode}-AuraLuxe.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE3DA] pb-6 gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C4A4A] block mb-1">
            Patron Sanctuary Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#221F20] font-normal">
            My Reserved Ceremonies
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5557] font-light mt-1">
            Manage your scheduled sanctuary sessions and download calendar passes.
          </p>
        </div>

        <button
          onClick={onNavigateToBooking}
          className="btn-primary text-xs shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#DFBE9F]" />
          <span>Reserve Another Ritual</span>
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-[#EAE3DA] p-8 space-y-4">
          <BookmarkCheck className="w-10 h-10 text-[#8C8284] mx-auto opacity-40" />
          <h3 className="font-serif text-2xl font-medium text-[#221F20]">
            No Scheduled Ceremonies Recorded
          </h3>
          <p className="text-sm text-[#5E5557] max-w-md mx-auto font-light">
            You do not currently have any active sanctuary appointments. Explore our ceremonial catalog to reserve your private suite.
          </p>
          <button
            onClick={onNavigateToBooking}
            className="btn-primary text-xs mt-2"
          >
            Explore Ceremonies & Book
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const service = SERVICES.find(s => s.id === booking.serviceId) || SERVICES[0];
            const location = SALON_LOCATIONS.find(l => l.id === booking.locationId) || SALON_LOCATIONS[0];
            const artisan = ARTISANS.find(a => a.id === booking.artisanId);
            const addons = ADD_ON_BOOSTERS.filter(b => booking.addOnIds?.includes(b.id));

            return (
              <div
                key={booking.id}
                className="bg-white rounded-lg border border-[#EAE3DA] overflow-hidden shadow-sm hover:border-[#DFBE9F] transition-all"
              >
                {/* Top Reference Bar */}
                <div className="bg-[#F4EFEB] px-6 py-3.5 border-b border-[#EAE3DA] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-sm text-[#8C4A4A] tracking-wider">
                      {booking.referenceCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F5EBEB] text-[#8C4A4A] border border-[#D49B9B] uppercase">
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[#5E5557]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#8C4A4A]" />
                      <strong>{booking.date}</strong>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8C4A4A]" />
                      {booking.timeSlot}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#735A40]">
                        {location.name} · {location.neighborhood}
                      </span>
                      <h3 className="font-serif text-2xl font-medium text-[#221F20]">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#5E5557]">{service.subtitle}</p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[10px] uppercase text-[#8C8284] block">Honorarium</span>
                      <span className="font-serif text-2xl font-bold text-[#8C4A4A]">
                        {formatINR(booking.totalPriceINR)}
                      </span>
                      {booking.membershipDiscountPercent && booking.membershipDiscountPercent > 0 && (
                        <span className="text-[11px] text-[#735A40] block">
                          Privé {booking.membershipDiscountPercent}% Applied
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#EAE3DA] text-xs">
                    <div>
                      <span className="text-[10px] font-semibold uppercase text-[#8C8284] block mb-0.5">
                        Assigned Master
                      </span>
                      <p className="font-semibold text-[#221F20]">
                        {artisan ? artisan.name : 'First Available Master'}
                      </p>
                      <p className="text-[11px] text-[#5E5557]">
                        {artisan ? artisan.role : 'Senior Concierge Specialist'}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase text-[#8C8284] block mb-0.5">
                        Sensory Suite Ambience
                      </span>
                      <p className="text-[#221F20] text-[11px]">
                        <strong>Scent:</strong> {booking.fragranceNote.replace(/_/g, ' ')}
                      </p>
                      <p className="text-[#221F20] text-[11px]">
                        <strong>Tea:</strong> {booking.teaPreference.replace(/_/g, ' ')}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold uppercase text-[#8C8284] block mb-0.5">
                        Guest Contact
                      </span>
                      <p className="font-semibold text-[#221F20]">{booking.guestName}</p>
                      <p className="text-[#5E5557] text-[11px]">{booking.guestPhone}</p>
                    </div>
                  </div>

                  {/* Add-ons list if present */}
                  {addons.length > 0 && (
                    <div className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3DA] text-xs">
                      <span className="text-[10px] uppercase font-semibold text-[#8C4A4A] block mb-1">
                        Active Botanical Boosters:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {addons.map(a => (
                          <span key={a.id} className="bg-white px-2 py-0.5 rounded border border-[#EAE3DA] text-[11px]">
                            {a.title} (+{formatINR(a.priceINR)})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Concierge Notes if present */}
                  {booking.conciergeNotes && (
                    <p className="text-xs text-[#5E5557] italic bg-[#FAF7F2] p-2.5 rounded border border-[#EAE3DA]/60">
                      <strong>Concierge Notes:</strong> "{booking.conciergeNotes}"
                    </p>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="px-6 sm:px-7 py-3 bg-[#FAF7F2] border-t border-[#EAE3DA] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() => handleDownloadCalendar(booking)}
                    className="text-[#8C4A4A] hover:text-[#753C3C] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Calendar Event (.ics)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {cancelingId === booking.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#BA1A1A]">Confirm cancellation?</span>
                        <button
                          onClick={() => {
                            onCancelBooking(booking.id);
                            setCancelingId(null);
                          }}
                          className="px-2.5 py-1 bg-[#BA1A1A] text-white rounded text-[11px] font-semibold"
                        >
                          Yes, Cancel
                        </button>
                        <button
                          onClick={() => setCancelingId(null)}
                          className="px-2 py-1 text-xs text-[#8C8284]"
                        >
                          Abort
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCancelingId(booking.id)}
                        className="text-[#8C8284] hover:text-[#BA1A1A] flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Reservation</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
