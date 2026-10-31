import React from 'react';
import { MapPin, Phone, Clock, Car, Shield, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';
import { SalonLocation } from '../types';

interface LocationsScreenProps {
  onSelectLocationForBooking: (locationId: string) => void;
}

export const LocationsScreen: React.FC<LocationsScreenProps> = ({
  onSelectLocationForBooking
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C4A4A] block">
          Mumbai Sanctuaries of Quiet Splendor
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#221F20] font-normal">
          Our Three Mumbai Ateliers
        </h1>
        <p className="text-sm sm:text-base text-[#5E5557] font-light leading-relaxed">
          Architectural havens crafted from warm teak, beaten brass, and unpolished Italian marble, situated across Mumbai’s most iconic heritage addresses.
        </p>
      </div>

      {/* Locations Cards */}
      <div className="space-y-10">
        {SALON_LOCATIONS.map((location, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={location.id}
              className="bg-white rounded-lg border border-[#EAE3DA] overflow-hidden shadow-sm hover:border-[#DFBE9F] transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Photo Column (5 Columns) */}
                <div className={`lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-[#8C4A4A]">
                    {location.neighborhood}
                  </div>
                </div>

                {/* Info Column (7 Columns) */}
                <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#735A40] block mb-1">
                        {location.tagline}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#221F20]">
                        {location.name}
                      </h2>
                    </div>

                    <p className="text-sm text-[#5E5557] leading-relaxed">
                      {location.landmark}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#8C4A4A] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#221F20] block">Address:</strong>
                          <span className="text-[#5E5557]">{location.address}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-[#8C4A4A] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#221F20] block">Atelier Timings:</strong>
                          <span className="text-[#5E5557]">{location.timings}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Car className="w-4 h-4 text-[#8C4A4A] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#221F20] block">Valet Chauffeur Service:</strong>
                          <span className="text-[#5E5557]">Complimentary private attendants</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Phone className="w-4 h-4 text-[#8C4A4A] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#221F20] block">Concierge Telephone:</strong>
                          <span className="text-[#5E5557]">{location.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* House Features */}
                    <div className="pt-3 border-t border-[#EAE3DA]">
                      <span className="text-[10px] uppercase font-semibold text-[#8C8284] block mb-2">
                        Atelier Amenities & Private Chambers
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feat, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium px-3 py-1 rounded bg-[#FAF7F2] text-[#5E5557] border border-[#EAE3DA] flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3 h-3 text-[#DFBE9F]" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="pt-4 border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-[#8C8284]">
                      {location.privateSuitesCount} Dedicated VIP Private Suites Available
                    </span>

                    <button
                      onClick={() => onSelectLocationForBooking(location.id)}
                      className="w-full sm:w-auto btn-primary text-xs"
                    >
                      <span>Reserve at {location.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
