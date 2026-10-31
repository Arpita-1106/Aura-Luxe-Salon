import React, { useState, useMemo } from 'react';
import { Search, Clock, Sparkles, Filter, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES } from '../data/salonData';
import { ServiceCategoryId, ServiceItem } from '../types';
import { formatINR, filterServices } from '../utils/booking';

interface MenuScreenProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onViewServiceDetail: (service: ServiceItem) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onSelectServiceForBooking,
  onViewServiceDetail
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');

  const filteredServices = useMemo(() => {
    let result = filterServices(SERVICES, selectedCategory, searchQuery);

    if (durationFilter === 'short') {
      result = result.filter(s => s.durationMinutes <= 60);
    } else if (durationFilter === 'medium') {
      result = result.filter(s => s.durationMinutes > 60 && s.durationMinutes <= 90);
    } else if (durationFilter === 'long') {
      result = result.filter(s => s.durationMinutes > 90);
    }

    return result;
  }, [selectedCategory, searchQuery, durationFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C4A4A] block">
          Haute Coiffure · Cellular Skin · Ayurvedic Head Spas
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#221F20] font-normal">
          The Ceremonial Rituals Catalog
        </h1>
        <p className="text-sm sm:text-base text-[#5E5557] font-light leading-relaxed">
          Every treatment is an unhurried, multi-sensory journey blending rare botanical extracts, pure gold leaf, and master Parisian-Vedic touch.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="space-y-4 bg-white p-5 sm:p-6 rounded-lg border border-[#EAE3DA] shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C8284] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by botanical ingredient (e.g. Kashmiri Saffron, Camellia, Argan), ritual, or benefit..."
            className="w-full h-12 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#D6CBC0] rounded-[4px] text-[#221F20] placeholder-[#8C8284] focus:outline-none focus:border-[#8C4A4A] focus:ring-2 focus:ring-[#D49B9B]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8284] hover:text-[#221F20]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills (Design Spec: 9999px radius, active #8C4A4A) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-[0.04em] transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#8C4A4A] text-[#FAF7F2] border border-[#8C4A4A] shadow-sm'
                    : 'bg-transparent text-[#5E5557] border border-[#EAE3DA] hover:border-[#8C4A4A] hover:text-[#8C4A4A]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Duration Quick Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EAE3DA] text-xs text-[#5E5557]">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#8C8284]" />
            <span className="font-medium text-[#221F20]">Duration:</span>
            {[
              { id: 'all', label: 'All Durations' },
              { id: 'short', label: '≤ 60 Mins' },
              { id: 'medium', label: '60 - 90 Mins' },
              { id: 'long', label: '90+ Mins (Deep Rest)' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDurationFilter(d.id as any)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  durationFilter === d.id
                    ? 'bg-[#F5EBEB] text-[#8C4A4A] font-semibold'
                    : 'hover:text-[#221F20]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] text-[#8C8284]">
            Showing <strong className="text-[#221F20]">{filteredServices.length}</strong> bespoke rituals
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-[#F4EFEB] rounded-lg border border-[#EAE3DA] p-8">
          <Sparkles className="w-8 h-8 text-[#8C4A4A] mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-xl font-medium text-[#221F20]">No Ceremonies Match Your Query</h3>
          <p className="text-sm text-[#5E5557] max-w-md mx-auto mt-2">
            Try searching for ingredients like "Saffron", "Rosewood", "Keratin", or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setDurationFilter('all');
            }}
            className="btn-secondary mt-5"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-service flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image & Header Overlay */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221F20]/60 via-transparent to-transparent" />
                  
                  {/* Specialty Tag Badge (Design Spec: #F5EBEB bg, #8C4A4A text, #D49B9B border) */}
                  {service.tag && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F5EBEB] text-[#8C4A4A] border border-[#D49B9B] shadow-sm">
                        {service.tag}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-4 bg-[#221F20]/80 backdrop-blur-sm px-2.5 py-1 rounded text-white text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#DFBE9F]" />
                    <span>{service.durationMinutes} Minutes</span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="text-[12px] uppercase font-semibold tracking-[0.06em] text-[#735A40]">
                    {service.subtitle}
                  </div>

                  <h3 className="font-serif text-2xl text-[#221F20] font-medium leading-snug group-hover:text-[#8C4A4A] transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-sm text-[#5E5557] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Botanical Ingredients Badges */}
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-semibold text-[#8C8284] tracking-wider block mb-1.5">
                      Sacred Botanical Extracts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.botanicalIngredients.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 rounded bg-[#FAF7F2] text-[#5E5557] border border-[#EAE3DA]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best For Tagline */}
                  <div className="text-xs text-[#735A40] pt-2 italic">
                    <strong>Recommended for:</strong> {service.bestFor}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-4 border-t border-[#EAE3DA]/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C8284] uppercase tracking-wider block">Investment</span>
                  <span className="font-serif text-2xl font-semibold text-[#8C4A4A]">
                    {formatINR(service.priceINR)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewServiceDetail(service)}
                    className="px-3 py-2 text-xs font-semibold text-[#5E5557] hover:text-[#8C4A4A] hover:bg-[#F5EBEB] rounded transition-colors"
                  >
                    View Ritual Steps
                  </button>
                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="btn-primary text-xs px-4 h-10"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
