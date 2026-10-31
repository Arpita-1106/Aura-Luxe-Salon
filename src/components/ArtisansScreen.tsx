import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Award, Sparkles, Check, ArrowRight } from 'lucide-react';
import { ARTISANS, SALON_LOCATIONS, SERVICES } from '../data/salonData';
import { Artisan } from '../types';

interface ArtisansScreenProps {
  onSelectArtisanForBooking: (artisanId: string, serviceId?: string) => void;
}

export const ArtisansScreen: React.FC<ArtisansScreenProps> = ({
  onSelectArtisanForBooking
}) => {
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>('all');

  const filteredArtisans = selectedLocationFilter === 'all'
    ? ARTISANS
    : ARTISANS.filter(a => a.locationIds.includes(selectedLocationFilter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C4A4A] block">
          Masters of Haute Coiffure & Ayurvedic Alchemy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#221F20] font-normal">
          The Master Artisans
        </h1>
        <p className="text-sm sm:text-base text-[#5E5557] font-light leading-relaxed">
          Our senior directors and alchemists bring decades of international editorial mastery and generational Indian botanical knowledge to every touch.
        </p>

        {/* Location Filter */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <span className="text-xs text-[#8C8284]">Filter by Sanctuary:</span>
          <button
            onClick={() => setSelectedLocationFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              selectedLocationFilter === 'all'
                ? 'bg-[#8C4A4A] text-white border-[#8C4A4A]'
                : 'bg-white text-[#5E5557] border-[#EAE3DA]'
            }`}
          >
            All Sanctuaries
          </button>
          {SALON_LOCATIONS.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocationFilter(loc.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedLocationFilter === loc.id
                  ? 'bg-[#8C4A4A] text-white border-[#8C4A4A]'
                  : 'bg-white text-[#5E5557] border-[#EAE3DA]'
              }`}
            >
              {loc.neighborhood.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Artisans Full Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredArtisans.map((artisan) => {
          const signatureRitual = SERVICES.find(s => s.id === artisan.signatureRitualId);
          const assignedLocations = SALON_LOCATIONS.filter(l => artisan.locationIds.includes(l.id));

          return (
            <div
              key={artisan.id}
              className="bg-white rounded-lg border border-[#EAE3DA] overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#DFBE9F] transition-all duration-300 hover:shadow-lg group"
            >
              {/* Tall 3:4 Aspect Ratio Portrait per Design Spec */}
              <div className="w-full sm:w-48 shrink-0">
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border border-[#EAE3DA] group-hover:border-[#DFBE9F] transition-colors">
                  <img
                    src={artisan.avatarUrl}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold text-[#221F20] flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-[#DFBE9F] fill-[#DFBE9F]" />
                    <span>{artisan.rating}</span>
                  </div>
                </div>

                <div className="mt-3 text-center sm:text-left">
                  <span className="text-[11px] text-[#8C8284] block">{artisan.experienceYears} Years Atelier Mastery</span>
                  <span className="text-[11px] text-[#8C4A4A] font-medium">{artisan.reviewsCount} Mumbai Patrons Served</span>
                </div>
              </div>

              {/* Artisan Details */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded bg-[#F5EBEB] text-[#8C4A4A] border border-[#D49B9B]">
                      {artisan.role}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#221F20] group-hover:text-[#8C4A4A] transition-colors">
                    {artisan.name}
                  </h3>
                  <p className="text-xs text-[#735A40] font-semibold mb-3">
                    {artisan.title}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#5E5557] leading-relaxed mb-4">
                    {artisan.bio}
                  </p>

                  {/* Signature Ritual Badge */}
                  {signatureRitual && (
                    <div className="bg-[#FAF7F2] p-3 rounded border border-[#EAE3DA] mb-3 text-xs">
                      <span className="text-[10px] uppercase font-semibold text-[#8C4A4A] block">
                        Signature Specialty Ritual:
                      </span>
                      <strong className="font-serif text-[#221F20] block text-sm">
                        {signatureRitual.title}
                      </strong>
                      <span className="text-[11px] text-[#5E5557] line-clamp-1">{signatureRitual.subtitle}</span>
                    </div>
                  )}

                  {/* Locations & Available Days */}
                  <div className="space-y-1.5 text-xs text-[#5E5557] pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8C4A4A] shrink-0" />
                      <span>{assignedLocations.map(l => l.neighborhood.split(',')[0]).join(' & ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8C4A4A] shrink-0" />
                      <span>In Atelier: {artisan.availableDays.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <div className="pt-4 border-t border-[#EAE3DA]">
                  <button
                    onClick={() => onSelectArtisanForBooking(artisan.id, artisan.signatureRitualId)}
                    className="w-full btn-primary text-xs h-11"
                  >
                    <span>Reserve with {artisan.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
