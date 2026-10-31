/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { BookingScreen } from './components/BookingScreen';
import { ArtisansScreen } from './components/ArtisansScreen';
import { LocationsScreen } from './components/LocationsScreen';
import { MembershipScreen } from './components/MembershipScreen';
import { MyBookingsScreen } from './components/MyBookingsScreen';
import { RitualDetailModal } from './components/RitualDetailModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Footer } from './components/Footer';
import {
  Booking,
  ServiceItem,
  MembershipTier,
  SalonLocation,
  Artisan
} from './types';
import {
  SERVICES,
  SALON_LOCATIONS,
  ARTISANS,
  MEMBERSHIP_TIERS,
  INITIAL_DEMO_BOOKINGS
} from './data/salonData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('aura_luxe_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  const [activeTier, setActiveTier] = useState<MembershipTier | null>(() => {
    try {
      const saved = localStorage.getItem('aura_luxe_active_tier');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return null;
  });

  // Pre-selected parameters when routing to reservation screen
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedArtisanId, setPreselectedArtisanId] = useState<string | undefined>();
  const [preselectedLocationId, setPreselectedLocationId] = useState<string | undefined>();

  // Modals state
  const [detailModalService, setDetailModalService] = useState<ServiceItem | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Check query params for deep-linking (e.g. ?screen=menu)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const screenParam = params.get('screen') || params.get('view');
    if (screenParam && ['home', 'menu', 'reserve', 'artisans', 'locations', 'membership', 'my-bookings'].includes(screenParam)) {
      setCurrentScreen(screenParam);
    }
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_luxe_bookings', JSON.stringify(bookings));
    } catch (e) {
      // Ignore
    }
  }, [bookings]);

  // Save active tier to localStorage
  useEffect(() => {
    try {
      if (activeTier) {
        localStorage.setItem('aura_luxe_active_tier', JSON.stringify(activeTier));
      } else {
        localStorage.removeItem('aura_luxe_active_tier');
      }
    } catch (e) {
      // Ignore
    }
  }, [activeTier]);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = (serviceId?: string, artisanId?: string, locationId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedArtisanId(artisanId);
    setPreselectedLocationId(locationId);
    setCurrentScreen('reserve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const handleSelectMembershipTier = (tier: MembershipTier) => {
    if (activeTier?.id === tier.id) {
      setActiveTier(null); // toggle off
    } else {
      setActiveTier(tier);
    }
  };

  // Find objects for the confirmed modal
  const confirmedService = SERVICES.find(s => s.id === confirmedBooking?.serviceId) || SERVICES[0];
  const confirmedLocation = SALON_LOCATIONS.find(l => l.id === confirmedBooking?.locationId) || SALON_LOCATIONS[0];
  const confirmedArtisan = ARTISANS.find(a => a.id === confirmedBooking?.artisanId);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#221F20]">
      {/* Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        bookingCount={bookings.length}
        onStartBooking={() => handleStartBooking()}
        activeTierName={activeTier?.name}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectServiceForBooking={(serviceId) => handleStartBooking(serviceId)}
            onViewServiceDetail={(service) => setDetailModalService(service)}
            onSelectArtisanForBooking={(artisanId) => handleStartBooking(undefined, artisanId)}
          />
        )}

        {currentScreen === 'menu' && (
          <MenuScreen
            onSelectServiceForBooking={(serviceId) => handleStartBooking(serviceId)}
            onViewServiceDetail={(service) => setDetailModalService(service)}
          />
        )}

        {currentScreen === 'reserve' && (
          <BookingScreen
            initialServiceId={preselectedServiceId}
            initialArtisanId={preselectedArtisanId}
            initialLocationId={preselectedLocationId}
            activeMembershipTier={activeTier}
            onBookingConfirmed={handleBookingConfirmed}
            onCancel={() => handleNavigate('menu')}
          />
        )}

        {currentScreen === 'artisans' && (
          <ArtisansScreen
            onSelectArtisanForBooking={(artisanId, serviceId) => handleStartBooking(serviceId, artisanId)}
          />
        )}

        {currentScreen === 'locations' && (
          <LocationsScreen
            onSelectLocationForBooking={(locationId) => handleStartBooking(undefined, undefined, locationId)}
          />
        )}

        {currentScreen === 'membership' && (
          <MembershipScreen
            activeTier={activeTier}
            onSelectTier={handleSelectMembershipTier}
            onNavigateToBooking={() => handleStartBooking()}
          />
        )}

        {currentScreen === 'my-bookings' && (
          <MyBookingsScreen
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onNavigateToBooking={() => handleStartBooking()}
          />
        )}
      </main>

      {/* Ritual Detail Deep-Dive Modal */}
      <RitualDetailModal
        service={detailModalService}
        onClose={() => setDetailModalService(null)}
        onSelectForBooking={(serviceId) => {
          handleStartBooking(serviceId);
        }}
      />

      {/* Booking Confirmation Pass Modal */}
      <BookingConfirmationModal
        booking={confirmedBooking}
        service={confirmedService}
        location={confirmedLocation}
        artisan={confirmedArtisan}
        onClose={() => setConfirmedBooking(null)}
        onGoToMyBookings={() => {
          setConfirmedBooking(null);
          handleNavigate('my-bookings');
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
