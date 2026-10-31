import React, { useState } from 'react';
import { Calendar, Menu as MenuIcon, X, Sparkles, MapPin, Award, UserCheck, BookmarkCheck } from 'lucide-react';

interface NavbarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  bookingCount: number;
  onStartBooking: () => void;
  activeTierName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  bookingCount,
  onStartBooking,
  activeTierName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Sanctuary', icon: Sparkles },
    { id: 'menu', label: 'Rituals Menu', icon: Sparkles },
    { id: 'artisans', label: 'Master Artisans', icon: UserCheck },
    { id: 'locations', label: 'Mumbai Ateliers', icon: MapPin },
    { id: 'membership', label: 'Privé Circle', icon: Award },
    { id: 'my-bookings', label: 'My Bookings', icon: BookmarkCheck, badge: bookingCount }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE3DA] transition-all">
      {/* Top Luxury Announcement Ticker */}
      <div className="bg-[#6F3334] text-[#FAF7F2] text-[11px] font-medium tracking-[0.08em] uppercase py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DFBE9F] animate-pulse"></span>
        <span>Festive & Bridal Atelier Reservations Open · Bandra West · Colaba · Juhu</span>
        {activeTierName && (
          <span className="ml-3 hidden sm:inline-block bg-[#DFBE9F] text-[#221F20] px-2 py-0.5 rounded text-[10px] font-semibold">
            {activeTierName} Member Active
          </span>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group focus:outline-none"
            aria-label="Aura Luxe Salon Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.04em] text-[#221F20] group-hover:text-[#8C4A4A] transition-colors">
              AURA LUXE
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#8C8284] -mt-1 group-hover:text-[#DFBE9F] transition-colors">
              Mumbai · Haute Beauté & Wellness
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.06em] transition-all rounded-[4px] flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#8C4A4A] bg-[#F5EBEB]'
                      : 'text-[#5E5557] hover:text-[#8C4A4A] hover:bg-[#F4EFEB]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#8C4A4A] text-[#FAF7F2]">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8C4A4A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onStartBooking}
              className="btn-primary shadow-sm"
              aria-label="Reserve Ritual"
            >
              <Calendar className="w-4 h-4 text-[#DFBE9F]" />
              <span>Reserve Ritual</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onStartBooking}
              className="btn-primary text-xs px-3 h-10 flex items-center gap-1.5 sm:hidden"
              aria-label="Reserve Ritual Mobile"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#5E5557] hover:text-[#8C4A4A] hover:bg-[#F4EFEB] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3DA] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium tracking-[0.04em] flex items-center justify-between ${
                    isActive
                      ? 'bg-[#F5EBEB] text-[#8C4A4A] font-semibold'
                      : 'text-[#221F20] hover:bg-[#F4EFEB]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#8C4A4A]' : 'text-[#8C8284]'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#8C4A4A] text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-[#EAE3DA]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartBooking();
              }}
              className="w-full btn-primary"
            >
              <Calendar className="w-4 h-4 text-[#DFBE9F]" />
              <span>Reserve Bespoke Ritual</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
