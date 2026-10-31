import React from 'react';
import { Check, Calendar, Download, MapPin, Sparkles, X, Clock, Coffee, Feather, Phone } from 'lucide-react';
import { Booking, ServiceItem, SalonLocation, Artisan } from '../types';
import { formatINR, generateIcsCalendar } from '../utils/booking';

interface BookingConfirmationModalProps {
  booking: Booking | null;
  service: ServiceItem;
  location: SalonLocation;
  artisan?: Artisan;
  onClose: () => void;
  onGoToMyBookings: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  service,
  location,
  artisan,
  onClose,
  onGoToMyBookings
}) => {
  if (!booking) return null;

  const handleDownloadCalendar = () => {
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
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#221F20]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] w-full max-w-2xl rounded-lg border-2 border-[#DFBE9F] shadow-2xl overflow-hidden my-8 p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle Decorative Gold Corner Borders */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#DFBE9F]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#DFBE9F]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#DFBE9F]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#DFBE9F]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8C8284] hover:text-[#221F20] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#8C4A4A] text-[#FAF7F2] mx-auto flex items-center justify-center shadow-md">
            <Check className="w-6 h-6 text-[#DFBE9F]" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C4A4A] block">
            Aura Luxe Haute Beauté · Mumbai
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221F20]">
            Reservation Confirmed & Secured
          </h2>
          <p className="text-xs text-[#5E5557] max-w-md mx-auto">
            Your private sanctuary suite and bespoke botanical preparations have been recorded in our concierge register.
          </p>
        </div>

        {/* Embossed Ticket Pass Card */}
        <div className="bg-white rounded-lg border border-[#EAE3DA] p-6 shadow-sm space-y-5 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#EAE3DA] pb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#8C8284] tracking-wider block">
                Reservation Reference
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#8C4A4A] tracking-wider">
                {booking.referenceCode}
              </span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-semibold text-[#8C8284] tracking-wider block">
                Total Honorarium
              </span>
              <span className="font-serif text-xl font-bold text-[#221F20]">
                {formatINR(booking.totalPriceINR)}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#8C8284] block">Patron</span>
              <p className="font-semibold text-[#221F20] text-sm mt-0.5">{booking.guestName}</p>
              <p className="text-[#5E5557]">{booking.guestPhone}</p>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase text-[#8C8284] block">Schedule</span>
              <p className="font-semibold text-[#221F20] text-sm mt-0.5">{booking.date}</p>
              <p className="text-[#8C4A4A] font-medium">{booking.timeSlot}</p>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase text-[#8C8284] block">Sanctuary Atelier</span>
              <p className="font-semibold text-[#221F20] mt-0.5">{location.name}</p>
              <p className="text-[#5E5557] text-[11px] leading-tight">{location.address}</p>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase text-[#8C8284] block">Ceremony & Master</span>
              <p className="font-semibold text-[#221F20] mt-0.5">{service.title}</p>
              <p className="text-[#5E5557] text-[11px]">
                {artisan ? `Master: ${artisan.name}` : 'First Available Master Alchemist'}
              </p>
            </div>
          </div>

          {/* Sensory Selections Note */}
          <div className="p-3 bg-[#FAF7F2] rounded border border-[#EAE3DA] flex items-center justify-between text-[11px] text-[#5E5557]">
            <div>
              <span className="text-[#8C4A4A] font-semibold">Fragrance:</span> {booking.fragranceNote.replace(/_/g, ' ')}
            </div>
            <div>
              <span className="text-[#8C4A4A] font-semibold">Arrival Tea:</span> {booking.teaPreference.replace(/_/g, ' ')}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownloadCalendar}
            className="w-full sm:w-auto btn-secondary text-xs flex items-center justify-center gap-2 border-[#D6CBC0]"
          >
            <Download className="w-4 h-4 text-[#8C4A4A]" />
            <span>Add to Apple / Google Calendar (.ics)</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onGoToMyBookings}
              className="w-full sm:w-auto btn-primary text-xs"
            >
              <span>View in My Bookings</span>
            </button>
          </div>
        </div>

        {/* Concierge Help Note */}
        <div className="mt-6 pt-4 border-t border-[#EAE3DA] flex items-center justify-center gap-2 text-xs text-[#8C8284]">
          <Phone className="w-3.5 h-3.5 text-[#8C4A4A]" />
          <span>Need chauffeur assistance? Contact our Concierge Desk at {location.phone}</span>
        </div>
      </div>
    </div>
  );
};
