import React, { useState } from 'react';
import { 
  CalendarCheck, 
  User, 
  MapPin, 
  Calendar, 
  Users, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw,
  Ticket,
  Loader2
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { BookingFormData, BookingConfirmationData, PackageTier } from '../types';

interface BookingSystemProps {
  preselectedDestination?: string;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  preselectedDestination = 'Kuala Lumpur'
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    destination: preselectedDestination,
    travelDate: '',
    paxCount: 2,
    packageType: 'Standard',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [confirmation, setConfirmation] = useState<BookingConfirmationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (minimum 3 characters).';
    }

    if (!formData.destination) {
      newErrors.destination = 'Please select a destination.';
    }

    if (!formData.travelDate) {
      newErrors.travelDate = 'Please select your preferred travel date.';
    } else {
      const selected = new Date(formData.travelDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.travelDate = 'Travel date must be today or in the future.';
      }
    }

    if (!formData.paxCount || formData.paxCount < 1 || formData.paxCount > 50) {
      newErrors.paxCount = 'Number of travelers must be between 1 and 50.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hantar data ke backend MySQL using relative path
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && result.status === 'SUCCESS') {
          setConfirmation(result.data);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setSubmitError(result.message || 'Failed to submit booking. Please try again.');
        }
      } catch (err) {
        setSubmitError('Unable to connect to server. Please check your backend.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setConfirmation(null);
    setSubmitError(null);
    setFormData({
      fullName: '',
      destination: 'Kuala Lumpur',
      travelDate: '',
      paxCount: 2,
      packageType: 'Standard',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setErrors({});
  };

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 font-semibold text-xs border border-emerald-200">
          <CalendarCheck className="w-4 h-4 text-emerald-800" />
          <span>Tour Reservation Concierge</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Plan Your Journey
        </h1>
        <p className="text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
          Reserve your guided Malaysian travel experience. Fill out the reservation details below for immediate confirmation.
        </p>
      </div>

      {/* Confirmation View */}
      {confirmation ? (
        <div className="bg-white rounded-3xl border border-[#E7E2D8] shadow-lg p-8 sm:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-4 border-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold uppercase tracking-wider inline-block border border-emerald-200">
              Reservation Confirmed & Saved to Database
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Thank You, {confirmation.fullName}!
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Your Malaysian tour inquiry has been successfully recorded in our system. Please keep your booking reference code for your records.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#E7E2D8] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E7E2D8]">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Booking Reference Code
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-900">
                {confirmation.bookingRef}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-amber-950">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <Ticket className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-sm text-amber-950">
                  📌 Please show us your Reservation ID ({confirmation.bookingRef}) upon arrival
                </p>
                <p className="text-amber-900 leading-relaxed">
                  Kindly present your Reservation ID code or this confirmation screen to our tour guide / registration counter during check-in.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block font-medium">Destination:</span>
                <span className="font-bold text-stone-900 text-sm">{confirmation.destination}</span>
              </div>
              <div>
                <span className="text-stone-500 block font-medium">Travel Date:</span>
                <span className="font-bold text-stone-900 text-sm">{confirmation.travelDate}</span>
              </div>
              <div>
                <span className="text-stone-500 block font-medium">Travelers:</span>
                <span className="font-bold text-stone-900 text-sm">{confirmation.paxCount} Person(s)</span>
              </div>
              <div>
                <span className="text-stone-500 block font-medium">Package Tier:</span>
                <span className="font-bold text-stone-900 text-sm">{confirmation.packageType} Experience</span>
              </div>
              {confirmation.email && (
                <div>
                  <span className="text-stone-500 block font-medium">Contact Email:</span>
                  <span className="font-bold text-stone-900 text-sm">{confirmation.email}</span>
                </div>
              )}
              {confirmation.phone && (
                <div>
                  <span className="text-stone-500 block font-medium">Contact Phone:</span>
                  <span className="font-bold text-stone-900 text-sm">{confirmation.phone}</span>
                </div>
              )}
            </div>

            {confirmation.specialRequests && (
              <div className="pt-4 border-t border-[#E7E2D8] text-xs">
                <span className="text-stone-500 block font-medium">Special Requests:</span>
                <p className="text-stone-800 italic mt-0.5">{confirmation.specialRequests}</p>
              </div>
            )}

            <div className="pt-2 text-[11px] text-stone-400">
              Submitted on: {confirmation.submittedAt}
            </div>

          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Make Another Reservation</span>
            </button>
          </div>

        </div>
      ) : (
        /* Form View */
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-[#E7E2D8] shadow-sm p-6 sm:p-10 space-y-6"
        >
          {submitError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. Ahmad bin Abdullah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/50' : 'border-[#DCD6C9] bg-[#FAF8F5] focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-xs text-rose-600 font-medium">{errors.fullName}</p>}
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Malaysian Destination <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCD6C9] bg-[#FAF8F5] text-sm outline-none focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-all appearance-none cursor-pointer text-stone-900"
                >
                  {DESTINATIONS.map((dest) => (
                    <option key={dest.id} value={dest.name}>
                      {dest.name} ({dest.state})
                    </option>
                  ))}
                </select>
              </div>
              {errors.destination && <p className="text-xs text-rose-600 font-medium">{errors.destination}</p>}
            </div>

            {/* Travel Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Preferred Travel Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input
                  type="date"
                  min={tomorrowStr}
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    errors.travelDate ? 'border-rose-500 bg-rose-50/50' : 'border-[#DCD6C9] bg-[#FAF8F5] focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700'
                  }`}
                />
              </div>
              {errors.travelDate && <p className="text-xs text-rose-600 font-medium">{errors.travelDate}</p>}
            </div>

            {/* Number of People */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Number of Travelers <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.paxCount}
                  onChange={(e) => setFormData({ ...formData, paxCount: parseInt(e.target.value) || 1 })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCD6C9] bg-[#FAF8F5] text-sm outline-none focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-all text-stone-900"
                />
              </div>
              {errors.paxCount && <p className="text-xs text-rose-600 font-medium">{errors.paxCount}</p>}
            </div>

{/* Package Tier */}
<div className="space-y-3">
  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
    Package Tier <span className="text-rose-500">*</span>
  </label>
  
  {/* Buttons */}
  <div className="grid grid-cols-3 gap-2">
    {(['Basic', 'Standard', 'Premium'] as PackageTier[]).map((tier) => (
      <button
        key={tier}
        type="button"
        onClick={() => setFormData({ ...formData, packageType: tier })}
        className={`py-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
          formData.packageType === tier
            ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
            : 'bg-[#FAF8F5] border-[#E7E2D8] text-stone-700 hover:bg-[#F2EDE4]'
        }`}
      >
        {tier}
      </button>
    ))}
  </div>

  {/* Package Descriptions */}
  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E2D8] text-xs text-stone-600 transition-all">
    {formData.packageType === 'Basic' && (
      <div className="space-y-1">
        <p className="font-bold text-stone-900">Basic Experience</p>
        <p className="leading-relaxed">
          <strong>Includes:</strong> Essential guided tour & main entry tickets.
        </p>
        <p className="text-stone-500">
          <strong>Why choose this:</strong> Perfect for budget-conscious travelers who prefer managing their own meals and transport.
        </p>
      </div>
    )}

    {formData.packageType === 'Standard' && (
      <div className="space-y-1">
        <p className="font-bold text-stone-900">Standard Experience (Most Popular)</p>
        <p className="leading-relaxed">
          <strong>Includes:</strong> Guided tour, entry tickets, local meal, and shared hotel pickup/drop-off.
        </p>
        <p className="text-stone-500">
          <strong>Why choose this:</strong> Ideal for travelers seeking a hassle-free, balanced itinerary with convenient transport included.
        </p>
      </div>
    )}

    {formData.packageType === 'Premium' && (
      <div className="space-y-1">
        <p className="font-bold text-stone-900">Premium VIP Experience</p>
        <p className="leading-relaxed">
          <strong>Includes:</strong> Private vehicle, dedicated personal guide, priority entry, lunch & dinner included.
        </p>
        <p className="text-stone-500">
          <strong>Why choose this:</strong> Best for families or luxury travelers who want full privacy, maximum comfort, and customized service.
        </p>
      </div>
    )}
  </div>
</div>
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Email Address <span className="text-stone-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCD6C9] bg-[#FAF8F5] text-sm outline-none focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-all text-stone-900 placeholder-stone-400"
                />
              </div>
              {errors.email && <p className="text-xs text-rose-600 font-medium">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Contact Phone <span className="text-stone-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="tel"
                  placeholder="+60 12-345 6789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCD6C9] bg-[#FAF8F5] text-sm outline-none focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-all text-stone-900 placeholder-stone-400"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Special Requests or Dietary Requirements <span className="text-stone-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-4 top-3 text-stone-400" />
                <textarea
                  rows={3}
                  placeholder="e.g. Vegetarian meals requested, airport transfer needed..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#DCD6C9] bg-[#FAF8F5] text-sm outline-none focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-all text-stone-900 placeholder-stone-400"
                />
              </div>
            </div>

            {/* Reservation ID Note */}
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2.5 text-xs text-amber-950">
              <Ticket className="w-4 h-4 text-amber-800 shrink-0" />
              <span>
                <strong>Notice:</strong> Please show us your Reservation ID upon arrival for your tour check-in.
              </span>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-[#E7E2D8] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Instant reference code generation</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <span>Submit Tour Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
