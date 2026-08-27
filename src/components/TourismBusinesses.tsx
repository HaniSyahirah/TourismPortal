import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Filter, 
  X, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { TourismBusiness, BusinessCategory } from '../types';
import { TOURISM_BUSINESSES } from '../data/businesses';

const CATEGORIES: ('All' | BusinessCategory)[] = ['All', 'Hotels', 'Restaurants', 'Travel Agencies'];

export const TourismBusinesses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | BusinessCategory>('All');
  const [selectedBusiness, setSelectedBusiness] = useState<TourismBusiness | null>(null);

  const filteredBusinesses = useMemo(() => {
    return TOURISM_BUSINESSES.filter((biz) => {
      const matchesCategory = selectedCategory === 'All' || biz.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        biz.name.toLowerCase().includes(q) ||
        biz.location.toLowerCase().includes(q) ||
        biz.state.toLowerCase().includes(q) ||
        biz.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 font-semibold text-xs border border-emerald-200">
          <Building2 className="w-4 h-4 text-emerald-800" />
          <span>Hospitality & Travel Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Featured Malaysian Tourism Providers
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Explore curated boutique resorts, authentic heritage restaurants, and licensed tour operators across Malaysia.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search provider, location, or cuisine..."
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

          {/* Category Filter Pills */}
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

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-[#E7E2D8]">
          <span>Showing <strong>{filteredBusinesses.length}</strong> of {TOURISM_BUSINESSES.length} providers</span>
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

      {/* Directory Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white border border-[#E7E2D8] shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif">No businesses found</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            No tourism provider matches your current keyword or category search.
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
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img
                  src={biz.imageUrl}
                  alt={biz.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium">
                  {biz.category}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{biz.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-stone-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                    {biz.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span className="truncate">{biz.location}, {biz.state}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 pt-1">
                    {biz.description}
                  </p>
                </div>

                {/* Contact Snippets */}
                <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{biz.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{biz.contactEmail}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBusiness(biz)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>View Provider Info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {biz.websiteUrl && (
                    <a
                      href={biz.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-[#DCD6C9] bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center shadow-xs"
                      title="Visit Official Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Business Details Modal */}
      {selectedBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E7E2D8] shadow-2xl text-stone-900">
            
            <div className="relative h-60 overflow-hidden bg-stone-100">
              <img
                src={selectedBusiness.imageUrl}
                alt={selectedBusiness.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedBusiness(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/70 text-white hover:bg-stone-950 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-semibold shadow-xs">
                  {selectedBusiness.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{selectedBusiness.rating} Rating</span>
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  {selectedBusiness.name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span>{selectedBusiness.location}, {selectedBusiness.state}</span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed pt-2">
                  {selectedBusiness.description}
                </p>
              </div>

              {/* Contact Card */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] space-y-2.5 text-xs">
                <h4 className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
                  Direct Contact Details:
                </h4>
                <div className="flex items-center gap-2.5 text-stone-700">
                  <Phone className="w-4 h-4 text-emerald-800" />
                  <span>{selectedBusiness.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-700">
                  <Mail className="w-4 h-4 text-emerald-800" />
                  <span>{selectedBusiness.contactEmail}</span>
                </div>
                {selectedBusiness.websiteUrl && (
                  <div className="flex items-center gap-2.5 text-stone-700">
                    <Globe className="w-4 h-4 text-emerald-800" />
                    <a 
                      href={selectedBusiness.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-800 hover:underline font-semibold"
                    >
                      {selectedBusiness.websiteUrl}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
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

