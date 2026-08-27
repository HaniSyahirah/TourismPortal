import React from 'react';
import { Compass, Palmtree, CloudSun, CalendarCheck, Building2, MapPin } from 'lucide-react';
import { NavTabType } from './Navbar';

interface BusinessFooterProps {
  onNavigate: (tab: NavTabType) => void;
}

export const BusinessFooter: React.FC<BusinessFooterProps> = ({
  onNavigate
}) => {
  return (
    <footer className="border-t border-[#E7E2D8] bg-[#F2EDE4] text-stone-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-stone-900 tracking-tight">
                EXPLORE MALAYSIA
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              Discover the beauty, culture and unforgettable experiences of Malaysia. An interactive tourism portal showcasing 10 curated destinations, live weather updates, tour booking, and local hospitality providers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>Malaysia Truly Asia • Southeast Asia</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer text-stone-600 hover:font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-stone-400" />
                  <span>Home & Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer text-stone-600 hover:font-medium"
                >
                  <Palmtree className="w-3.5 h-3.5 text-stone-400" />
                  <span>Destinations</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weather')}
                  className="hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer text-stone-600 hover:font-medium"
                >
                  <CloudSun className="w-3.5 h-3.5 text-stone-400" />
                  <span>Weather Forecast</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer text-stone-600 hover:font-medium"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Plan Journey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('businesses')}
                  className="hover:text-emerald-900 transition-colors flex items-center gap-2 cursor-pointer text-stone-600 hover:font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-stone-400" />
                  <span>Tourism Providers</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Travel Info & Inquiry */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Travel Information
            </h4>
            <div className="text-xs space-y-2 text-stone-600">
              <p>Explore cultural heritage, pristine tropical beaches, and vibrant cityscapes across Malaysia.</p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('booking')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book a Tour</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© 2026 Explore Malaysia. All rights reserved.</p>
          <p className="font-medium text-stone-600">Discover • Explore • Experience Malaysia</p>
        </div>
      </div>
    </footer>
  );
};

