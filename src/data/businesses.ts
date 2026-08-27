import { TourismBusiness } from '../types';

export const TOURISM_BUSINESSES: TourismBusiness[] = [
  // Hotels
  {
    id: 'biz-1',
    name: 'The Datai Langkawi Luxury Rainforest Resort',
    category: 'Hotels',
    location: 'Teluk Datai, Langkawi',
    state: 'Kedah',
    rating: 4.9,
    description: 'Award-winning 5-star eco-luxury resort nestled in a 10-million-year-old virgin rainforest with private beach access onto the Andaman Sea.',
    contactPhone: '+60 4-950 0500',
    contactEmail: 'reservations@thedatai.com',
    websiteUrl: 'https://thedatai.com',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biz-2',
    name: 'The Majestic Hotel Melaka',
    category: 'Hotels',
    location: 'Bunga Raya, Melaka City',
    state: 'Melaka',
    rating: 4.8,
    description: 'A restored 1920s Straits settlement mansion offering timeless colonial luxury alongside the scenic Melaka River.',
    contactPhone: '+60 6-289 8000',
    contactEmail: 'travel@majesticmalacca.com',
    websiteUrl: 'https://majesticmalacca.com',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biz-3',
    name: 'Cameron Highlands Resort',
    category: 'Hotels',
    location: 'Tanah Rata, Cameron Highlands',
    state: 'Pahang',
    rating: 4.8,
    description: 'Colonial boutique resort set against lush hills and tea gardens, featuring cozy fireplaces and fine English high tea.',
    contactPhone: '+60 5-491 1100',
    contactEmail: 'chr@ytlhotels.com.my',
    websiteUrl: 'https://cameronhighlandsresort.com',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  },

  // Restaurants
  {
    id: 'biz-4',
    name: 'Restoran Rebung Chef Ismail',
    category: 'Restaurants',
    location: 'Taman Tasik Perdana, Kuala Lumpur',
    state: 'Federal Territory',
    rating: 4.8,
    description: 'Celebrity Chef Ismail’s renowned traditional Malay buffet showcasing authentic rendang, nasi ulam, laksa, and traditional kuih.',
    contactPhone: '+60 3-9212 2865',
    contactEmail: 'inforebung@gmail.com',
    websiteUrl: 'https://restoranrebungchefismail.com',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biz-5',
    name: 'Jonker 88 Heritage Nyonya Laksa',
    category: 'Restaurants',
    location: 'Jonker Street, Melaka',
    state: 'Melaka',
    rating: 4.7,
    description: 'Iconic heritage eatery in Melaka serving famous Baba Laksa, Kahwin Laksa, and icy Gula Melaka Cendol.',
    contactPhone: '+60 19-397 5668',
    contactEmail: 'contact@jonker88.com',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biz-6',
    name: 'Tek Sen Chinese & Peranakan Restaurant',
    category: 'Restaurants',
    location: 'Carnarvon Street, George Town',
    state: 'Penang',
    rating: 4.8,
    description: 'Michelin Bib Gourmand recognized heritage restaurant famous for double-cooked pork belly with chili padi and sambal petai.',
    contactPhone: '+60 16-444 8632',
    contactEmail: 'teksenpenang@gmail.com',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },

  // Travel Agencies
  {
    id: 'biz-7',
    name: 'Borneo Eco Tours & Rainforest Expeditions',
    category: 'Travel Agencies',
    location: 'Kota Kinabalu',
    state: 'Sabah',
    rating: 4.9,
    description: 'Award-winning eco-tourism operator specializing in Mount Kinabalu climbing permits, Kinabatangan wildlife river cruises, and jungle treks.',
    contactPhone: '+60 88-438 300',
    contactEmail: 'info@borneoecotours.com',
    websiteUrl: 'https://borneoecotours.com',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biz-8',
    name: 'Langkawi Geoforest Boat & Island Adventures',
    category: 'Travel Agencies',
    location: 'Kuah, Langkawi',
    state: 'Kedah',
    rating: 4.8,
    description: 'Licensed boat tour agency running mangrove kayak excursions, Kilim UNESCO Geopark tours, and island-hopping day trips.',
    contactPhone: '+60 4-966 2200',
    contactEmail: 'adventures@langkawigeotours.com',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biz-9',
    name: 'Penang Heritage Trails & Cultural Walks',
    category: 'Travel Agencies',
    location: 'George Town',
    state: 'Penang',
    rating: 4.8,
    description: 'Curated guided walking tours covering George Town UNESCO street art murals, clan jetties, colonial history, and street food trails.',
    contactPhone: '+60 4-263 1188',
    contactEmail: 'tours@penangheritagetrail.my',
    imageUrl: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80'
  }
];
