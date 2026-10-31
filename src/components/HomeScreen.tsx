import React from 'react';
import { ArrowRight, Sparkles, Clock, CheckCircle2, Star, ShieldCheck, MapPin, Feather, Heart } from 'lucide-react';
import { SERVICES, ARTISANS, SALON_LOCATIONS, CLIENT_REVIEWS } from '../data/salonData';
import { ServiceItem } from '../types';
import { formatINR } from '../utils/booking';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
  onViewServiceDetail: (service: ServiceItem) => void;
  onSelectArtisanForBooking: (artisanId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectServiceForBooking,
  onViewServiceDetail,
  onSelectArtisanForBooking
}) => {
  const signatureServices = SERVICES.filter(s => s.isPopular).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Atmospheric Editorial Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#EAE3DA] pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle decorative radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DFBE9F]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D49B9B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 7 Columns: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBEB] border border-[#D49B9B] text-[#8C4A4A] text-xs font-semibold uppercase tracking-[0.08em]">
                <Feather className="w-3.5 h-3.5" />
                <span>Warm Editorial Minimalism · Mumbai, India</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#221F20] font-normal leading-[1.12] tracking-[-0.02em]">
                The Sanctuary of <br />
                <span className="italic font-light text-[#8C4A4A]">Quiet Splendor</span> & Tactile Serenity.
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#5E5557] max-w-xl leading-relaxed font-light">
                Where classical architectural elegance fuses with contemporary Indian luxury. Hand-harvested Kashmiri saffron elixirs, Parisian precision hair architecture, and meditative Shirodhara scalp hydrotherapy across Pali Hill, Colaba, and Juhu.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('reserve')}
                  className="btn-primary"
                >
                  <Sparkles className="w-4 h-4 text-[#DFBE9F]" />
                  <span>Reserve Your Ritual</span>
                </button>

                <button
                  onClick={() => onNavigate('menu')}
                  className="btn-secondary"
                >
                  <span>Explore Ceremonial Menu</span>
                  <ArrowRight className="w-4 h-4 text-[#8C4A4A]" />
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-[#EAE3DA] grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="font-serif text-2xl font-medium text-[#221F20]">3</p>
                  <p className="font-sans text-[11px] uppercase tracking-[0.06em] text-[#8C8284]">Mumbai Sanctuaries</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-medium text-[#221F20]">100%</p>
                  <p className="font-sans text-[11px] uppercase tracking-[0.06em] text-[#8C8284]">Sacred Botanicals</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-medium text-[#221F20]">VIP</p>
                  <p className="font-sans text-[11px] uppercase tracking-[0.06em] text-[#8C8284]">Private Vault Suites</p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Staggered High-Fashion Imagery Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="rounded-lg overflow-hidden border border-[#EAE3DA] shadow-xl aspect-[4/5] relative group">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="Aura Luxe Flagship Salon Pali Hill Bandra"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221F20]/75 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge on Hero */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#DFBE9F] block">
                      Pali Hill Flagship · Bandra West
                    </span>
                    <h3 className="font-serif text-lg font-medium text-white">
                      The Botanical Hair & Facial Vault
                    </h3>
                  </div>
                </div>

                {/* Floating Tactile Detail Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-lg border border-[#EAE3DA] shadow-lg max-w-[240px] hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 rounded-full bg-[#F5EBEB] text-[#8C4A4A]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-[#221F20]">Kumkumadi & Gold</span>
                  </div>
                  <p className="text-[12px] text-[#5E5557] leading-snug">
                    Grade-A Pampore Kashmiri Saffron infused with 24K edible gold flakes.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Signature Rituals Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#EAE3DA]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] mb-1">
              Curated Ceremonies
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221F20] font-medium">
              Signature Rituals of Quiet Splendor
            </h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="btn-tertiary mt-4 md:mt-0"
          >
            <span>View Complete Rituals Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Featured Signature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {signatureServices.map((service) => (
            <div
              key={service.id}
              className="card-service overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image & Tag */}
                <div className="relative h-60 w-full overflow-hidden rounded-t-[7px]">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF7F2]/90 backdrop-blur-sm text-[#8C4A4A] border border-[#D49B9B]">
                      {service.tag || 'Bespoke Ceremony'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4 bg-[#221F20]/80 backdrop-blur-sm px-2.5 py-1 rounded text-white text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#DFBE9F]" />
                    <span>{service.durationMinutes} Minutes</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="text-[12px] uppercase font-semibold tracking-[0.06em] text-[#735A40]">
                    {service.subtitle}
                  </div>
                  
                  <h3 className="font-serif text-2xl text-[#221F20] font-medium leading-snug group-hover:text-[#8C4A4A] transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-sm text-[#5E5557] line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Botanical Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {service.botanicalIngredients.slice(0, 3).map((ingredient, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FAF7F2] text-[#5E5557] border border-[#EAE3DA]"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Actions */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-[#EAE3DA]/70 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#8C8284] uppercase tracking-wider block">Honorarium</span>
                  <span className="font-serif text-2xl font-semibold text-[#8C4A4A]">
                    {formatINR(service.priceINR)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewServiceDetail(service)}
                    className="px-3.5 py-2 text-xs font-semibold text-[#5E5557] hover:text-[#8C4A4A] hover:bg-[#F5EBEB] rounded transition-colors"
                  >
                    Ceremony Steps
                  </button>
                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="btn-primary text-xs px-4 h-10"
                  >
                    <span>Reserve</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. Master Artisans Showcase */}
      <section className="bg-[#F4EFEB] py-16 border-y border-[#EAE3DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] block mb-2">
              Masters of the Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221F20] font-medium mb-3">
              Haute Coiffure & Ayurvedic Alchemists
            </h2>
            <p className="text-sm sm:text-base text-[#5E5557]">
              Trained in Paris, London, and sacred Kerala Ayurvedic academies, our master artists treat hair and skin as living architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTISANS.map((artisan) => (
              <div
                key={artisan.id}
                className="bg-white rounded-lg border border-[#EAE3DA] overflow-hidden group hover:border-[#DFBE9F] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Tall 3:4 Aspect Ratio Portrait */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={artisan.avatarUrl}
                      alt={artisan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-semibold text-[#221F20] flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-[#DFBE9F] fill-[#DFBE9F]" />
                      <span>{artisan.rating}</span>
                    </div>
                  </div>

                  {/* Artisan Details */}
                  <div className="p-5">
                    <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#8C4A4A] block mb-1">
                      {artisan.role} · {artisan.experienceYears} Yrs Exp
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#221F20] mb-1">
                      {artisan.name}
                    </h3>
                    <p className="text-xs text-[#5E5557] line-clamp-2 leading-relaxed mb-3">
                      {artisan.specialty}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectArtisanForBooking(artisan.id)}
                    className="w-full btn-secondary text-xs h-10 border-[#EAE3DA] hover:border-[#8C4A4A]"
                  >
                    <span>Book with {artisan.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('artisans')}
              className="btn-tertiary"
            >
              <span>View Full Artisan Profiles & Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Rare Botanical Ingredients & Sanctuary Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] block">
              Sacred Botanical Farm Sourcing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#221F20] font-medium leading-tight">
              Pure Ingredients Harvested at the Peak of Prana
            </h2>
            <p className="text-sm sm:text-base text-[#5E5557] leading-relaxed">
              We reject synthetic silicone and harsh chemical relaxers in favor of biologically active botanicals. Every elixir is cold-pressed, wild-harvested, or hydro-distilled in micro-batches to preserve cellular integrity.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                { title: 'Grade-A Pampore Kashmiri Saffron', desc: 'Hand-picked crocus threads rich in crocin for profound cellular luminosity.' },
                { title: 'Mysore White Sandalwood & Vetiver', desc: 'Sustainably distilled sacred wood soothing scalp inflammation and nervous tension.' },
                { title: '24-Karat Pure Aurum Gold Leaf', desc: 'Edible therapeutic foil micro-bonded with bio-peptides for skin firming.' },
                { title: 'Cold-Pressed Camellia Seed & Argan', desc: 'Replenishing essential oleic fatty acids without weighing down hair volume.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-[#F5EBEB] text-[#8C4A4A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs font-semibold text-[#221F20] block">{item.title}</strong>
                    <span className="text-xs text-[#5E5557]">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-[#EAE3DA] aspect-[4/5] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80"
                alt="Botanical scalp treatment"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden border border-[#EAE3DA] aspect-[4/5] shadow-sm mt-8">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=700&q=80"
                alt="Ayurvedic Kumkumadi Elixir"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mumbai Sanctuaries (Locations Overview) */}
      <section className="bg-[#FAF7F2] border-t border-[#EAE3DA] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] block mb-1">
                Our Three Mumbai Houses
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#221F20] font-medium">
                Sanctuaries Designed for Slowness
              </h2>
            </div>
            <button
              onClick={() => onNavigate('locations')}
              className="btn-tertiary mt-3 sm:mt-0"
            >
              <span>Explore All Ateliers & Amenities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SALON_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="bg-[#F4EFEB] rounded-lg border border-[#EAE3DA] overflow-hidden flex flex-col justify-between hover:border-[#DFBE9F] transition-all hover:shadow-md"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={loc.imageUrl}
                      alt={loc.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase text-[#8C4A4A]">
                      {loc.neighborhood}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-xl font-medium text-[#221F20]">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-[#5E5557] line-clamp-2">
                      {loc.address}
                    </p>
                    <div className="pt-2 text-[11px] text-[#8C8284] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8C4A4A]" />
                      <span>{loc.timings}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#EAE3DA]/50 mt-4">
                  <div className="flex items-center justify-between text-xs pt-3">
                    <span className="text-[#8C4A4A] font-medium">Valet Parking Available</span>
                    <button
                      onClick={() => onNavigate('reserve')}
                      className="text-[#8C4A4A] font-semibold hover:underline"
                    >
                      Book Atelier →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Client Words & Press Accolades */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4EFEB] border border-[#EAE3DA] rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8C4A4A] block mb-1">
              Patron Accolades & Press
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#221F20]">
              “Mumbai’s Most Refined Beauty Oasis”
            </h2>
            <p className="text-xs uppercase tracking-[0.1em] text-[#8C8284] mt-2">
              Featured in Vogue India · Harper's Bazaar · Architectural Digest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg border border-[#EAE3DA] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#DFBE9F] mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#DFBE9F]" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#221F20] leading-relaxed mb-4">
                    "{review.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#EAE3DA]">
                  <p className="font-sans text-xs font-semibold text-[#221F20]">{review.clientName}</p>
                  <p className="text-[11px] text-[#8C8284]">{review.neighborhood} · {review.ritualName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Privé Circle Call-to-Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#6F3334] text-[#FAF7F2] rounded-xl p-8 sm:p-12 border border-[#8C4A4A] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#DFBE9F]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#DFBE9F]">
              Aura Privé Circle · By Invitation & Application
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white">
              An Elevated Sanctuary for Mumbai's Connoisseurs
            </h2>
            <p className="text-sm sm:text-base text-[#FAF7F2]/80 leading-relaxed font-light">
              Enjoy guaranteed private suite reservations, complimentary silk blowouts, chauffeur transfers within Mumbai, and priority festive season access.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('membership')}
                className="bg-[#DFBE9F] hover:bg-[#e2c1a1] text-[#221F20] font-semibold px-6 py-3 rounded text-xs uppercase tracking-wider transition-colors"
              >
                Explore Privé Memberships
              </button>
              <button
                onClick={() => onNavigate('reserve')}
                className="border border-[#DFBE9F]/60 hover:bg-white/10 text-white font-medium px-6 py-3 rounded text-xs uppercase tracking-wider transition-colors"
              >
                Reserve Single Visit
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
