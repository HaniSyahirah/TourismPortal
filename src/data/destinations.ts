import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    state: 'Federal Territory',
    tagline: 'Iconic Petronas Twin Towers & Vibrant Urban Culture',
    description: 'The dynamic capital city of Malaysia known for the iconic 88-storey Petronas Twin Towers, historic Merdeka Square, bustling street markets in Bukit Bintang, and modern shopping centers.',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Petronas Twin Towers & Skybridge',
      'Batu Caves limestone temple and giant Murugan statue',
      'Merdeka Square and Sultan Abdul Samad Building',
      'Bukit Bintang shopping and Jalan Alor street food'
    ],
    category: 'City',
    coordinates: {
      lat: 3.1390,
      lng: 101.6869
    }
  },
  {
    id: 'langkawi',
    name: 'Langkawi',
    state: 'Kedah',
    tagline: 'Jewel of Kedah with Scenic Sky Bridge & Sandy Beaches',
    description: 'An archipelago of 99 tropical islands in the Andaman Sea, featuring UNESCO Global Geoparks, the suspended Langkawi Sky Bridge, mangrove boat tours, and duty-free island shopping.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Langkawi Sky Bridge & SkyCab Cable Car',
      'Kilim Karst Geoforest Park & Mangrove Boat Tour',
      'Pantai Cenang white sand beach and water sports',
      'Eagle Square (Dataran Helang) in Kuah Town'
    ],
    category: 'Island',
    coordinates: {
      lat: 6.3500,
      lng: 99.8000
    }
  },
  {
    id: 'penang',
    name: 'Penang',
    state: 'Penang',
    tagline: 'Pearl of the Orient & UNESCO Heritage Culinary Capital',
    description: 'Famous for George Town’s UNESCO World Heritage colonial architecture, vibrant street art murals, historic clan jetties, and world-renowned hawker street food like Char Kway Teow and Laksa.',
    imageUrl: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'George Town UNESCO Heritage street art trail',
      'Penang Hill Funicular Train and panoramic viewpoint',
      'Kek Lok Si Temple with grand pagoda',
      'Gurney Drive and Chulia Street culinary hotspots'
    ],
    category: 'Heritage',
    coordinates: {
      lat: 5.4164,
      lng: 100.3327
    }
  },
  {
    id: 'melaka',
    name: 'Melaka',
    state: 'Melaka',
    tagline: 'Historic Straits City of Colonial Landmarks & River Cruises',
    description: 'A historic port city steeped in rich Malay, Portuguese, Dutch, and British history, featuring the 17th-century Red Stadthuys, A Famosa fortress, Baba Nyonya culture, and Jonker Walk night market.',
    // Pautan gambar Melaka yang diperbaiki:
    imageUrl: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'The Dutch Red Stadthuys and Christ Church',
      'Melaka River Cruise with illuminated mural walls',
      'A Famosa historic fortress and St. Paul’s Hill',
      'Jonker Street Night Market and Peranakan dining'
    ],
    category: 'Heritage',
    coordinates: {
      lat: 2.1896,
      lng: 102.2501
    }
  },
  {
    id: 'sabah',
    name: 'Sabah (Kota Kinabalu)',
    state: 'Sabah',
    tagline: 'Majestic Mount Kinabalu & Pristine Marine Parks',
    description: 'Borneo’s ecological haven featuring Southeast Asia’s majestic Mount Kinabalu (4,095m), coral reef islands of Tunku Abdul Rahman Marine Park, and tropical rainforest wildlife.',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Mount Kinabalu UNESCO World Heritage site',
      'Tunku Abdul Rahman Marine Park island snorkeling',
      'Kota Kinabalu waterfront sunset & seafood market',
      'Sepilok Orangutan Rehabilitation Center'
    ],
    category: 'Nature',
    coordinates: {
      lat: 5.9804,
      lng: 116.0735
    }
  },
  {
    id: 'sarawak',
    name: 'Sarawak (Kuching)',
    state: 'Sarawak',
    tagline: 'Land of the Hornbills & Ancient Rainforest Trails',
    description: 'Malaysia’s largest state offering charming riverside walkways along Kuching Waterfront, prehistoric caves at Niah National Park, and rare proboscis monkeys at Bako National Park.',
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Bako National Park coastal rock stacks and wildlife',
      'Kuching Waterfront and Darul Hana Bridge',
      'Sarawak Cultural Village living museum',
      'Mulu Caves UNESCO World Heritage limestone pinnacles'
    ],
    category: 'Nature',
    coordinates: {
      lat: 1.5533,
      lng: 110.3592
    }
  },
  {
    id: 'cameron-highlands',
    name: 'Cameron Highlands',
    state: 'Pahang',
    tagline: 'Cool Highland Tea Plantations & Strawberry Farms',
    description: 'Malaysia’s premier hill resort sitting at 1,500m above sea level, celebrated for cool refreshing mountain breezes, sprawling emerald BOH tea estates, strawberry picking, and the Mossy Forest.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'BOH Sungei Palas Tea Centre & tea plantation walk',
      'Mossy Forest ancient elevated boardwalk trail',
      'Fresh strawberry hand-picking farms',
      'Kea Farm vegetable and agricultural market'
    ],
    category: 'Mountain',
    coordinates: {
      lat: 4.4726,
      lng: 101.3806
    }
  },
  {
    id: 'genting-highlands',
    name: 'Genting Highlands',
    state: 'Pahang',
    tagline: 'City of Entertainment atop Mount Ulu Kali',
    description: 'An integrated mountain resort featuring the Awana SkyWay cable car, world-class indoor and outdoor theme parks, high-altitude shopping outlets, and entertainment complexes in the clouds.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Awana SkyWay scenic glass-floor cable car',
      'Genting SkyWorlds outdoor theme park',
      'Chin Swee Caves Temple with grand pagoda',
      'Genting Highlands Premium Outlets'
    ],
    category: 'Mountain',
    coordinates: {
      lat: 3.4239,
      lng: 101.7932
    }
  },
  {
    id: 'perhentian-islands',
    name: 'Perhentian Islands',
    state: 'Terengganu',
    tagline: 'Crystal Turquoise Waters & Coral Snorkeling Paradise',
    description: 'Comprising Perhentian Besar and Perhentian Kecil, famous for pristine turquoise waters, powder-white sand beaches, sea turtle sanctuaries, and vibrant coral snorkeling reefs.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Long Beach and Coral Bay crystal waters',
      'Turtle Point marine life snorkeling',
      'Shark Point reef and vibrant corals',
      'Windmill Scenic Viewpoint overlooking the bay'
    ],
    category: 'Island',
    coordinates: {
      lat: 5.9080,
      lng: 102.7483
    }
  },
  {
    id: 'johor-bahru',
    name: 'Johor Bahru',
    state: 'Johor',
    tagline: 'Southern Gateway of Heritage, Royal Palaces & Family Fun',
    description: 'The southern metropolis of Peninsular Malaysia, featuring the Victorian-style Sultan Abu Bakar State Mosque, historic Tan Hiok Nee heritage street, and family attractions like Legoland Malaysia.',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Legoland Malaysia Resort theme park',
      'Sultan Abu Bakar State Mosque and royal heritage',
      'Jalan Tan Hiok Nee cultural street & heritage cafes',
      'Danga Bay waterfront recreation area'
    ],
    category: 'City',
    coordinates: {
      lat: 1.4927,
      lng: 103.7414
    }
  }
];
