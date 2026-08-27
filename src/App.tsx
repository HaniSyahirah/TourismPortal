import React, { useState, useEffect } from 'react';
import { Navbar, NavTabType } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationPortfolio } from './components/DestinationPortfolio';
import { WeatherApp } from './components/WeatherApp';
import { BookingSystem } from './components/BookingSystem';
import { TourismBusinesses } from './components/TourismBusinesses';
import { BusinessFooter } from './components/BusinessFooter';
import { BackToTop } from './components/BackToTop';
import { Destination, TourismBusiness } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>('home');
  const [preselectedWeatherDest, setPreselectedWeatherDest] = useState<string>('kuala-lumpur');
  const [preselectedBookingDest, setPreselectedBookingDest] = useState<string>('Kuala Lumpur');

  // State untuk simpan data dari Database MySQL
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [businesses, setBusinesses] = useState<TourismBusiness[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ambil data dari API Backend (Express berjalan di port 5000)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDest, resBiz] = await Promise.all([
          fetch('http://localhost:5000/api/destinations'),
          fetch('http://localhost:5000/api/businesses')
        ]);

        const dataDest = await resDest.json();
        const dataBiz = await resBiz.json();

        setDestinations(dataDest);
        setBusinesses(dataBiz);
      } catch (error) {
        console.error('Gagal mengambil data dari database:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigateToWeather = (destId: string) => {
    setPreselectedWeatherDest(destId);
    setActiveTab('weather');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBooking = (destName: string) => {
    setPreselectedBookingDest(destName);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FCFBF9] text-stone-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-lg text-stone-600 font-medium animate-pulse">Memuatkan data dari Database...</p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HeroSection
                onExploreDestinations={() => {
                  setActiveTab('destinations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBookNow={() => {
                  setActiveTab('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onCheckWeather={() => {
                  setActiveTab('weather');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreBusinesses={() => {
                  setActiveTab('businesses');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectDestination={(destId) => {
                  setPreselectedWeatherDest(destId);
                  setActiveTab('destinations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'destinations' && (
              <DestinationPortfolio
                onSelectDestinationForWeather={handleNavigateToWeather}
                onBookDestination={handleNavigateToBooking}
              />
            )}

            {activeTab === 'weather' && (
              <WeatherApp
                initialDestinationId={preselectedWeatherDest}
                onNavigateToBooking={handleNavigateToBooking}
              />
            )}

            {activeTab === 'booking' && (
              <BookingSystem
                preselectedDestination={preselectedBookingDest}
              />
            )}

            {activeTab === 'businesses' && (
              <TourismBusinesses />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <BusinessFooter
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

    </div>
  );
}

export default App;