import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  X, 
  CalendarCheck, 
  CloudSun, 
  Palmtree, 
  Check, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Destination, DestinationCategory } from '../types';
import { DESTINATIONS } from '../data/destinations';

interface DestinationPortfolioProps {
  onSelectDestinationForWeather: (destId: string) => void;
  onBookDestination: (destName: string) => void;
}

const CATEGORIES: DestinationCategory[] = ['All', 'Island', 'Heritage', 'Nature', 'City', 'Mountain'];

export const DestinationPortfolio: React.FC<DestinationPortfolioProps> = ({
  onSelectDestinationForWeather,
  onBookDestination
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Filter destinations based on search query and category
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.state.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q) ||
        dest.highlights.some(h => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 font-semibold text-xs border border-emerald-200">
          <Palmtree className="w-4 h-4 text-emerald-800" />
          <span>Curated Destinations • 10 Malaysian Marvels</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Explore Malaysian Destinations
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Discover Malaysia’s most celebrated travel locations spanning UNESCO heritage towns, tropical islands, ancient rainforests, and misty mountain retreats.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search destination, state, or attraction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#DCD6C9] bg-[#FAF8F5] text-stone-900 placeholder-stone-400 text-xs sm:text-sm outline-none focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="lg:col-span-6 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>Category:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-[#F2EDE4] text-stone-700 hover:bg-[#E5DFD3]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-[#E7E2D8]">
          <span>Showing <strong>{filteredDestinations.length}</strong> of {DESTINATIONS.length} curated destinations</span>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-emerald-800 hover:text-emerald-950 font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Palmtree className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif">No destinations found</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            No destination matches your current search criteria. Try modifying your search keywords or choosing another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 cursor-pointer shadow-xs transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium">
                  {dest.category}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/75 backdrop-blur-xs text-white text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{dest.state}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold line-clamp-1">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>

                {/* Highlights preview */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Featured Highlights:
                  </span>
                  {dest.highlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-3 flex items-center gap-2 border-t border-stone-100">
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectDestinationForWeather(dest.id)}
                    className="p-2.5 rounded-xl border border-[#DCD6C9] bg-white hover:bg-stone-50 text-amber-800 text-xs font-semibold transition-colors cursor-pointer"
                    title="Check live weather"
                  >
                    <CloudSun className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E7E2D8] shadow-2xl text-stone-900">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
              <img
                src={selectedDestination.imageUrl}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/70 text-white hover:bg-stone-950 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-semibold shadow-xs">
                  {selectedDestination.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-950/70 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedDestination.state}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {selectedDestination.name}
                </h2>
                <p className="text-sm font-semibold text-emerald-900">
                  {selectedDestination.tagline}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed pt-1">
                  {selectedDestination.description}
                </p>
              </div>

              {/* Key Attractions List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Key Attractions & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedDestination.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2D8] flex items-start gap-2.5 text-xs text-stone-800"
                    >
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GPS & Weather Source Info */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-2">
                <span>GPS Coordinates: {selectedDestination.coordinates.lat}° N, {selectedDestination.coordinates.lng}° E</span>
                <span className="font-semibold text-emerald-800">Live Weather Supported via Open-Meteo</span>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E7E2D8]">
                <button
                  onClick={() => {
                    const name = selectedDestination.name;
                    setSelectedDestination(null);
                    onBookDestination(name);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Plan Tour for {selectedDestination.name}</span>
                </button>

                <button
                  onClick={() => {
                    const id = selectedDestination.id;
                    setSelectedDestination(null);
                    onSelectDestinationForWeather(id);
                  }}
                  className="py-3 px-4 rounded-xl border border-[#DCD6C9] bg-white hover:bg-stone-50 text-amber-800 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CloudSun className="w-4 h-4" />
                  <span>Check Weather</span>
                </button>

                <button
                  onClick={() => setSelectedDestination(null)}
                  className="py-3 px-4 rounded-xl border border-[#DCD6C9] hover:bg-[#FAF8F5] text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

