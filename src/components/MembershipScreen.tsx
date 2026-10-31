import React from 'react';
import { Award, Check, Sparkles, Shield, Gift, Car, Crown, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/salonData';
import { MembershipTier } from '../types';
import { formatINR } from '../utils/booking';

interface MembershipScreenProps {
  activeTier: MembershipTier | null;
  onSelectTier: (tier: MembershipTier) => void;
  onNavigateToBooking: () => void;
}

export const MembershipScreen: React.FC<MembershipScreenProps> = ({
  activeTier,
  onSelectTier,
  onNavigateToBooking
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8C4A4A] block">
          Aura Privé Circle · By Annual Privileged Invitation
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#221F20] font-normal">
          The Privé Sanctuary Circle
        </h1>
        <p className="text-sm sm:text-base text-[#5E5557] font-light leading-relaxed">
          Designed for Mumbai patrons who consider personal beauty and stillness an essential daily ritual. Enjoy guaranteed private suites, complimentary couture blowouts, and chauffeur courtesies.
        </p>

        {activeTier && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5EBEB] border border-[#D49B9B] rounded-full text-xs font-semibold text-[#8C4A4A] mt-2">
            <Award className="w-4 h-4 text-[#DFBE9F]" />
            <span>Currently Active: {activeTier.name} ({activeTier.discountPercent}% Privilege)</span>
          </div>
        )}
      </div>

      {/* Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {MEMBERSHIP_TIERS.map((tier) => {
          const isSelected = activeTier?.id === tier.id;
          const isImperial = tier.id === 'imperial-kesar';

          return (
            <div
              key={tier.id}
              className={`rounded-xl border p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isSelected
                  ? 'border-[#8C4A4A] bg-white ring-2 ring-[#8C4A4A] shadow-xl'
                  : isImperial
                  ? 'border-[#DFBE9F] bg-[#FAF7F2] shadow-md hover:border-[#8C4A4A]'
                  : 'border-[#EAE3DA] bg-white hover:border-[#DFBE9F]'
              }`}
            >
              {/* Highlight Ribbon for Imperial */}
              {isImperial && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6F3334] text-[#DFBE9F] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  Most Prestigious
                </div>
              )}

              <div>
                <div className="text-center pb-6 border-b border-[#EAE3DA]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#735A40] block mb-1">
                    {tier.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#221F20]">
                    {tier.name}
                  </h3>
                  
                  <div className="mt-4">
                    <span className="font-serif text-3xl font-bold text-[#8C4A4A]">
                      {formatINR(tier.annualDuesINR)}
                    </span>
                    <span className="text-xs text-[#8C8284] block mt-0.5">Annual Concierge Honorarium</span>
                  </div>

                  <div className="mt-3 inline-block px-3 py-1 rounded bg-[#F5EBEB] text-xs font-semibold text-[#8C4A4A]">
                    {tier.discountPercent}% Privilege on All Rituals
                  </div>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3.5 py-6 text-xs text-[#5E5557]">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 p-0.5 rounded-full bg-[#F5EBEB] text-[#8C4A4A] shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-relaxed">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#EAE3DA] space-y-2">
                <button
                  onClick={() => onSelectTier(tier)}
                  className={`w-full py-3 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    isSelected
                      ? 'bg-[#8C4A4A] text-white shadow-sm'
                      : 'bg-transparent border border-[#DFBE9F] text-[#221F20] hover:bg-[#F5EBEB] hover:border-[#8C4A4A]'
                  }`}
                >
                  {isSelected ? 'Tier Currently Active' : `Activate ${tier.name}`}
                </button>

                {isSelected && (
                  <button
                    onClick={onNavigateToBooking}
                    className="w-full text-center text-xs text-[#8C4A4A] font-semibold hover:underline block pt-1"
                  >
                    Reserve Ritual with Member Privilege →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Privé Circle Guarantee Matrix */}
      <div className="bg-[#F4EFEB] rounded-xl border border-[#EAE3DA] p-8 sm:p-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-medium text-[#221F20]">
            The Privé Circle Sovereign Guarantees
          </h2>
          <p className="text-xs text-[#5E5557] mt-1">
            Privileges curated to remove friction and uphold complete discretion for Mumbai's leading families.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-white p-5 rounded-lg border border-[#EAE3DA]">
            <Crown className="w-5 h-5 text-[#8C4A4A] mb-2" />
            <h4 className="font-serif text-base font-semibold text-[#221F20] mb-1">
              Guaranteed Discretion
            </h4>
            <p className="text-[#5E5557] leading-relaxed">
              Private basement chauffeur drop-offs and direct elevator access to our VIP Vault Chambers with zero public lobby transit.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#EAE3DA]">
            <Gift className="w-5 h-5 text-[#8C4A4A] mb-2" />
            <h4 className="font-serif text-base font-semibold text-[#221F20] mb-1">
              Artisanal Apothecary Gifting
            </h4>
            <p className="text-[#5E5557] leading-relaxed">
              Seasonal curations of cold-pressed botanical hair oils and Kashmiri saffron tea delivered to your home on Diwali and birthdays.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-[#EAE3DA]">
            <Car className="w-5 h-5 text-[#8C4A4A] mb-2" />
            <h4 className="font-serif text-base font-semibold text-[#221F20] mb-1">
              Chauffeur Concierge
            </h4>
            <p className="text-[#5E5557] leading-relaxed">
              Imperial tier patrons receive seamless luxury sedan round-trip transport anywhere between Colaba and Juhu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
