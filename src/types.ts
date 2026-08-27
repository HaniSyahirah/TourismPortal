export type DestinationCategory = 'All' | 'Island' | 'Heritage' | 'Nature' | 'City' | 'Mountain';

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  category: 'Island' | 'Heritage' | 'Nature' | 'City' | 'Mountain';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type PackageTier = 'Basic' | 'Standard' | 'Premium';

export interface BookingFormData {
  fullName: string;
  destination: string;
  travelDate: string;
  paxCount: number;
  packageType: PackageTier;
  email?: string;
  phone?: string;
  specialRequests?: string;
}

export interface BookingConfirmationData extends BookingFormData {
  bookingRef: string;
  submittedAt: string;
}

export type BusinessCategory = 'Hotels' | 'Restaurants' | 'Travel Agencies';

export interface TourismBusiness {
  id: string;
  name: string;
  category: BusinessCategory;
  location: string;
  state: string;
  rating: number;
  description: string;
  contactPhone: string;
  contactEmail: string;
  websiteUrl?: string;
  imageUrl: string;
}
