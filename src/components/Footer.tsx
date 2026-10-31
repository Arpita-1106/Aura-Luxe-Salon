import React, { useState } from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Check, ArrowRight, Heart } from 'lucide-react';
import { SALON_LOCATIONS } from '../data/salonData';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail && subscribedEmail.includes('@')) {
      setIsSubscribed(true);
      setSubscribedEmail('');
    }
  };

  return (
    <footer className="bg-[#1E1B1C] text-[#FAF7F2] border-t border-[#332F30] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#332F30]">
          
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-medium tracking-wide text-white block">
              AURA LUXE
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFBE9F] block -mt-2">
              Mumbai · Haute Beauté & Wellness Sanctuary
            </span>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed font-light max-w-sm">
              An unhurried aesthetic haven where classical architectural grace merges with rare Himalayan botanicals and Parisian hair couture.
            </p>
            <div className="pt-2 text-xs text-[#DFBE9F] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pali Hill · Colaba Heritage · Juhu Coastal</span>
            </div>
          </div>

          {/* Navigation Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.08em] text-[#DFBE9F]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Sanctuary Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-white transition-colors">
                  Ceremonial Rituals Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('artisans')} className="hover:text-white transition-colors">
                  Master Artisans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-white transition-colors">
                  Mumbai Ateliers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-white transition-colors">
                  Privé Circle Membership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-bookings')} className="hover:text-white transition-colors">
                  My Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Mumbai Ateliers Contact (3 Columns) */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#FAF7F2]/80">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.08em] text-[#DFBE9F]">
              Mumbai Concierge
            </h4>
            <div className="space-y-2.5">
              <div>
                <strong className="text-white block font-serif">Pali Hill, Bandra West</strong>
                <p className="text-[#FAF7F2]/60 text-[11px]">14 Union Park · +91 (022) 6940 8800</p>
              </div>
              <div>
                <strong className="text-white block font-serif">Colaba Heritage</strong>
                <p className="text-[#FAF7F2]/60 text-[11px]">Arthur Bunder Rd, Apollo Bunder · +91 (022) 6940 8820</p>
              </div>
              <div>
                <strong className="text-white block font-serif">Juhu Coastal Sanctuary</strong>
                <p className="text-[#FAF7F2]/60 text-[11px]">Gulmohar Cross Rd 7 · +91 (022) 6940 8840</p>
              </div>
            </div>
          </div>

          {/* Seasonal Gazette Newsletter (3 Columns) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.08em] text-[#DFBE9F]">
              The Seasonal Gazette
            </h4>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed font-light">
              Receive private notices for festive lookbook debuts, rare botanical harvests, and visiting international guest masters.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-[#332F30] rounded text-xs text-[#DFBE9F] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#DFBE9F]" />
                <span>You have been placed on the Privé dispatch register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  placeholder="Enter patron email address"
                  required
                  className="w-full h-10 px-3 bg-[#332F30] border border-[#534342] rounded text-xs text-white placeholder-[#857372] focus:outline-none focus:border-[#DFBE9F]"
                />
                <button
                  type="submit"
                  className="w-full h-9 bg-[#DFBE9F] hover:bg-[#e2c1a1] text-[#1E1B1C] font-semibold rounded text-xs uppercase tracking-wider transition-colors"
                >
                  Join Gazette
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Homage */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF7F2]/50 gap-4">
          <p>© 2026 Aura Luxe Salon Private Limited. Mumbai, Maharashtra. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Discretion & Privacy Charter</span>
            <span>·</span>
            <span>Atelier Terms of Care</span>
            <span>·</span>
            <span>Valet & Chauffeur Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
