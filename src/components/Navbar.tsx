import React, { useState } from 'react';
import { 
  Compass, 
  Palmtree, 
  CloudSun, 
  CalendarCheck, 
  Building2, 
  Menu, 
  X,
  MapPin
} from 'lucide-react';

export type NavTabType = 'home' | 'destinations' | 'weather' | 'booking' | 'businesses';

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'destinations', label: 'Destinations', icon: <Palmtree className="w-4 h-4" /> },
    { id: 'weather', label: 'Weather', icon: <CloudSun className="w-4 h-4" /> },
    { id: 'booking', label: 'Booking', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'businesses', label: 'Businesses', icon: <Building2 className="w-4 h-4" /> }
  ];

  const handleTabClick = (tab: NavTabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2D8] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div 
            id="brand-logo-btn"
            className="flex items-center gap-3.5 cursor-pointer group shrink-0 select-none"
            onClick={() => handleTabClick('home')}
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-900 transition-all duration-300">
              <Compass className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                  EXPLORE MALAYSIA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200/80">
                  <MapPin className="w-2.5 h-2.5 text-emerald-700" /> Truly Asia
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium tracking-normal block">
                Official Tourism & Travel Discovery
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F2EDE4] p-1.5 rounded-2xl border border-[#E2DDD2]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-[#E5DFD3]/70'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('booking')}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Plan Journey</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-[#E7E2D8] bg-white text-stone-800 hover:bg-stone-50 cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-stone-700" /> : <Menu className="w-5 h-5 text-emerald-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E2D8] bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors text-left ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleTabClick('booking')}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Plan Your Journey</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

