import React from 'react';
import { 
  Compass, 
  MapPin, 
  ArrowRight, 
  CalendarCheck, 
  CloudSun, 
  Palmtree, 
  Sparkles,
  UtensilsCrossed,
  Trees,
  Landmark,
  ShieldCheck,
  Plane
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface HeroSectionProps {
  onExploreDestinations: () => void;
  onBookNow: () => void;
  onCheckWeather: () => void;
  onExploreBusinesses: () => void;
  onSelectDestination: (destId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDestinations,
  onBookNow,
  onCheckWeather,
  onExploreBusinesses,
  onSelectDestination
}) => {
  // Show 4 spotlight destinations on the homepage
  const featuredDestinations = DESTINATIONS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#F4EFE6]/60 via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E7E2D8]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 font-semibold text-xs border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
                <span>Malaysia Truly Asia • Official Travel Experience</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-stone-900 leading-[1.12]">
                  EXPLORE <span className="text-emerald-800">MALAYSIA</span>
                </h1>
                <p className="text-xl sm:text-2xl font-serif text-emerald-900 font-medium italic leading-snug">
                  Discover the beauty, culture and unforgettable experiences of Malaysia.
                </p>
              </div>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
                Immerse yourself in a captivating tapestry of tropical rainforests, UNESCO World Heritage cities, sun-kissed coral islands, and world-renowned culinary traditions across Southeast Asia's most welcoming haven.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-btn-explore-destinations"
                  onClick={onExploreDestinations}
                  className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Destinations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-btn-book"
                  onClick={onBookNow}
                  className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-800" />
                  <span>Plan Journey</span>
                </button>

                <button
                  id="hero-btn-weather"
                  onClick={onCheckWeather}
                  className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all border border-[#DCD6C9] bg-white hover:bg-stone-50 text-stone-800 shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <CloudSun className="w-4 h-4 text-amber-700" />
                  <span>Weather Forecast</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E7E2D8] max-w-lg">
                <div>
                  <div className="text-2xl font-bold text-stone-900 font-serif">10</div>
                  <div className="text-xs text-stone-500 font-medium mt-0.5">Curated Destinations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-800 font-serif">Live</div>
                  <div className="text-xs text-stone-500 font-medium mt-0.5">Open-Meteo Weather</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-900 font-serif">100%</div>
                  <div className="text-xs text-stone-500 font-medium mt-0.5">Cloud Responsive</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 group">
                <img
                  src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80"
                  alt="Kuala Lumpur Skyline and Petronas Twin Towers"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-[#E7E2D8] flex items-center gap-1.5 text-xs font-semibold text-stone-800">
                  <Palmtree className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Truly Asia Showcase</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold mb-1">
                    Spotlight Destination
                  </span>
                  <h3 className="text-xl font-bold font-serif text-white">
                    Kuala Lumpur • City of Modern Wonders
                  </h3>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-2 leading-relaxed">
                    Experience iconic 88-storey towers, historic colonial squares, vibrant culinary street markets, and modern cultural monuments.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. About Malaysia Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E7E2D8] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-900 font-semibold text-xs uppercase tracking-wider">
                <Landmark className="w-4 h-4 text-emerald-800" />
                <span>About Malaysia</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                A Land of Rich Heritage, Tropical Sanctuaries & Boundless Flavors
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Situated in the heart of Southeast Asia, Malaysia is a vibrant country comprising 13 diverse states and 3 federal territories divided by the South China Sea into Peninsular Malaysia and Malaysian Borneo.
              </p>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Blessed with year-round tropical warmth, pristine white beaches, 130-million-year-old virgin rainforests, and multicultural harmony among Malay, Chinese, Indian, and Indigenous communities, Malaysia delivers unforgettable travel experiences for culture seekers, eco-explorers, and food lovers alike.
              </p>

              {/* Quick Fact Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] text-center">
                  <div className="text-lg font-bold text-stone-900 font-serif">13 + 3</div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">States & Territories</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] text-center">
                  <div className="text-lg font-bold text-emerald-800 font-serif">4 UNESCO</div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">World Heritage Sites</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] text-center">
                  <div className="text-lg font-bold text-stone-900 font-serif">130M Yrs</div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">Oldest Rainforests</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] text-center">
                  <div className="text-lg font-bold text-amber-800 font-serif">30°C Avg</div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">Tropical Sunshine</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#E7E2D8]">
                <img 
                  src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80" 
                  alt="George Town Penang Heritage"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="p-4 bg-[#FAF8F5] border-t border-[#E7E2D8] text-stone-800 text-xs space-y-1">
                  <div className="font-bold font-serif text-sm text-stone-900">George Town, Penang</div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    UNESCO World Heritage Site renowned for colonial architecture, colorful street murals, and world-class hawker culture.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Destinations (Spotlight 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-900 font-semibold text-xs uppercase tracking-wider mb-2">
              <Palmtree className="w-4 h-4 text-emerald-800" />
              <span>Spotlight Destinations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Featured Malaysian Destinations
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Curated locations capturing the essence of modern cities, ancient nature, and tranquil islands.
            </p>
          </div>
          <button
            onClick={onExploreDestinations}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 hover:text-emerald-950 hover:underline cursor-pointer shrink-0 self-start sm:self-end"
          >
            <span>View All 10 Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.id)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
            >
              {/* Destination Image */}
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium">
                  {dest.category}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-950/75 backdrop-blur-xs text-white text-[11px]">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{dest.state}</span>
                </div>
              </div>

              {/* Destination Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-stone-100 text-xs font-semibold text-emerald-800">
                  <span>Explore Destination</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Explore Malaysia? (4 Visual Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-emerald-900 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-800" />
            <span>Why Travel Here</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Why Explore Malaysia?
          </h2>
          <p className="text-sm text-stone-600">
            Four defining pillars that make Malaysia one of the most rewarding and enchanting destinations in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs hover:border-emerald-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/70">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Diverse Heritage
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Experience centuries of Malay, Chinese, Indian, Baba-Nyonya, and indigenous traditions living harmoniously side by side.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs hover:border-emerald-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200/70">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Pristine Nature
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Trek through 130-million-year-old virgin rainforests, scale Mount Kinabalu, and explore coral reef havens.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs hover:border-emerald-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/70">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Culinary Capital
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Savor Michelin-recognized hawker street food, authentic Nasi Lemak, spicy Laksa, Satay, and sweet Gula Melaka Cendol.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D8] shadow-xs hover:border-emerald-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-200/70">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Warm Hospitality
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enjoy world-class flight connectivity, modern transit systems, safe travel environments, and warm Malaysian smiles.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider inline-block">
              Start Your Adventure
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold leading-tight">
              Ready to Experience the Wonders of Malaysia?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Browse our complete catalog of 10 curated destinations, check real-time meteorological reports with Open-Meteo, or reserve your tour package now.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreDestinations}
                className="px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-emerald-900 font-semibold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Browse Destinations</span>
              </button>
              <button
                onClick={onBookNow}
                className="px-6 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-400/40 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Plan Your Journey</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

