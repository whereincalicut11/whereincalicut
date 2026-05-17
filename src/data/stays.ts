export interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Stay {
  id: string;
  title: string;
  type: 'PG' | 'Hostel' | 'Dormitory' | 'Homestay';
  gender: 'Male' | 'Female' | 'Family' | 'Any';
  location: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
  };
  mapUrl: string;
  reviews: Review[];
}

export const STAYS_DATA: Stay[] = [
  {
    id: 'cyberpark-haven',
    title: 'Cyberpark Premium PG & Hostel',
    type: 'PG',
    gender: 'Male',
    location: 'Nellikode, Near Cyberpark',
    price: 6500,
    rating: 4.8,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfect for IT professionals working at Cyberpark or Hilite City. High-speed WiFi, 24/7 security, professional housekeeping, and delicious home-style food (veg and non-veg). Fully furnished rooms with individual study spaces.',
    amenities: ['High-speed WiFi', '24/7 Security', 'Homestyle Food', 'Power Backup', 'AC Rooms Available', 'Washing Machine'],
    contact: {
      phone: '+919876543210',
      whatsapp: '919876543210',
      email: 'contact@cyberparkhaven.com'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.9818817290947!2d75.83091917590455!3d11.258933250058348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65be1b4f4c9c1%3A0xe5417ec6e3e5c942!2sCyberpark%20Kozhikode!5e0!3m2!1sen!2sin!4v1715945322904!5m2!1sen!2sin',
    reviews: [
      { id: '1', user: 'Abhinav K.', rating: 5, date: 'May 10, 2026', comment: 'Extremely clean and convenient place for IT employees. Food is really good!' },
      { id: '2', user: 'Rahul Das', rating: 4, date: 'April 22, 2026', comment: 'Good amenities and strong WiFi connection. Highly recommended.' }
    ]
  },
  {
    id: 'ocean-breeze-homestay',
    title: 'Ocean Breeze Beach Homestay',
    type: 'Homestay',
    gender: 'Family',
    location: 'Kozhikode Beach, Calicut',
    price: 12000,
    rating: 4.9,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Experience Kozhikode hospitality at its best. Nestled right near the scenic Kozhikode Beach, this homestay offers spacious sea-view balconies, authentic Malabari breakfast, and a peaceful environment for family holidays or remote work.',
    amenities: ['Sea View Balcony', 'Malabari Breakfast', 'Air Conditioning', 'Free Parking', 'Kitchen Access', 'Washing Machine'],
    contact: {
      phone: '+919988776655',
      whatsapp: '919988776655',
      email: 'oceanbreeze@calicutstays.com'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.8532454652236!2d75.77129527590466!3d11.268412649874136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba659392e22c9a1%3A0xe104cfbc1767df2b!2sKozhikode%20Beach!5e0!3m2!1sen!2sin!4v1715945372332!5m2!1sen!2sin',
    reviews: [
      { id: '1', user: 'Meera Nair', rating: 5, date: 'May 02, 2026', comment: 'The view is breath-taking! The hosts are incredibly warm and serve the best Kallummakkaya and Biryani.' },
      { id: '2', user: 'Sanjay Mathew', rating: 5, date: 'April 15, 2026', comment: 'Very clean, spacious rooms. Perfect spot to enjoy sunsets from the balcony.' }
    ]
  },
  {
    id: 'nit-scholars-dormitory',
    title: 'NIT Scholars Co-living Dormitory',
    type: 'Dormitory',
    gender: 'Any',
    location: 'Chathamangalam, Near NIT Calicut',
    price: 3500,
    rating: 4.5,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An affordable, hyper-connected, co-living dormitory designed specifically for students and research scholars preparing for exams. Walking distance from NIT Calicut. Offers quiet study zones, cafeteria, and fast internet.',
    amenities: ['Dedicated Study Desk', 'High-speed WiFi', '24/7 Library Access', 'Cafeteria', 'Biometric Security', 'Locker System'],
    contact: {
      phone: '+919446001122',
      whatsapp: '919446001122',
      email: 'scholars@calicutstays.com'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.1802100868157!2d75.96191987590529!3d11.317926148906322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba642fd50000001%3A0xbe9b7dc8436cfec!2sNational%20Institute%20of%20Technology%20Calicut!5e0!3m2!1sen!2sin!4v1715945412555!5m2!1sen!2sin',
    reviews: [
      { id: '1', user: 'Gautham S.', rating: 4, date: 'May 12, 2026', comment: 'Extremely pocket-friendly. The study zones are quiet and perfect for late-night revisions.' },
      { id: '2', user: 'Anjali R.', rating: 5, date: 'April 28, 2026', comment: 'Safe, well-organized dorms. The cafeteria serves cheap and healthy snacks.' }
    ]
  },
  {
    id: 'hilite-elite-hostel-girls',
    title: 'Hilite Elite Girls Hostel',
    type: 'Hostel',
    gender: 'Female',
    location: 'Palazhi, Near Hilite Mall',
    price: 7000,
    rating: 4.7,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A premium, highly secure hostel exclusively for working women and students. Located right behind Hilite Mall, with quick access to the national highway. Offers modern furnishings, CCTV surveillance, and a peaceful atmosphere.',
    amenities: ['CCTV Security', 'AC Rooms Available', 'Gym & Recreation Area', 'Delicious Vegetarian Food', 'Washing Machine', 'Housekeeping'],
    contact: {
      phone: '+919556112233',
      whatsapp: '919556112233',
      email: 'hilitegirls@calicutstays.com'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.9248408996593!2d75.83401567590462!3d11.263102450005705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65a2d677df98f%3A0xe54c130efef8c6ee!2sHiLITE%20Mall!5e0!3m2!1sen!2sin!4v1715945465334!5m2!1sen!2sin',
    reviews: [
      { id: '1', user: 'Shilpa Mohan', rating: 5, date: 'May 05, 2026', comment: 'Extremely safe. The location is wonderful since Hilite Mall is walking distance.' },
      { id: '2', user: 'Reshma P.', rating: 4, date: 'March 20, 2026', comment: 'Well maintained, tidy rooms. Management is highly cooperative.' }
    ]
  },
  {
    id: 'calicut-metro-co-living',
    title: 'Metro Co-living PG for Men',
    type: 'PG',
    gender: 'Male',
    location: 'Mavoor Road, Calicut Metro',
    price: 5800,
    rating: 4.6,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Premium boys co-living space on Mavoor Road. Centrally located with immediate access to Calicut Railway Station and KSRTC bus stand. Fully dynamic environment, ideal for young professionals.',
    amenities: ['Central Location', 'High-speed WiFi', 'Purified Drinking Water', '24/7 Security', 'Lounge Area', 'Bike Parking'],
    contact: {
      phone: '+919667223344',
      whatsapp: '919667223344',
      email: 'metrocoliving@calicutstays.com'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.7578851493414!2d75.78761107590483!3d11.275382049740523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593bf45ad5b9%3A0x6a053cbf2b8006bf!2sMavoor%20Rd%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1715945511394!5m2!1sen!2sin',
    reviews: [
      { id: '1', user: 'Hariprasad M.', rating: 5, date: 'May 08, 2026', comment: 'Access to KSRTC is unmatched. Rooms are spacious and clean.' },
      { id: '2', user: 'Ajay Dev', rating: 4, date: 'April 02, 2026', comment: 'Perfect bachelor pad. Very clean bathrooms.' }
    ]
  },
  {
    id: 'chathamangalam-girls-homestay',
    title: 'University Greenview Girls Homestay',
    type: 'Homestay',
    gender: 'Female',
    location: 'Tenhipalam, near Calicut University',
    price: 4500,
    rating: 4.8,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Set in a lush green environment near Calicut University, this homestay offers a peaceful, secure space for female university students. Clean rooms, high safety, nutritious home-cooked meals by a local family.',
    amenities: ['Lush Garden', 'Nutritious Meals', 'Purified Water', 'Study Area', 'High Safety', 'High-speed WiFi'],
    contact: {
      phone: '+919778334455',
      whatsapp: '919778334455',
      email: 'greenviewgirls@calicutstays.com'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.5126868666353!2d75.88566977590297!3d11.149258245917812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65abeb342e185%3A0xcf94f9999a0e6988!2sUniversity%20of%20Calicut!5e0!3m2!1sen!2sin!4v1715945561332!5m2!1sen!2sin',
    reviews: [
      { id: '1', user: 'Deepika E.', rating: 5, date: 'May 14, 2026', comment: 'Extremely peaceful. Home cooked food is delicious and very hygienic.' },
      { id: '2', user: 'Sreelakshmi V.', rating: 4, date: 'April 30, 2026', comment: 'Safe and comfortable. Walking distance to the university library.' }
    ]
  }
];

import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

// Helper to seed Firebase with mock data if it is empty
async function seedMockData() {
  if (!db) return;
  console.log('WhereInCalicut: Seeding Firestore with default stays data...');
  try {
    for (const stay of STAYS_DATA) {
      await setDoc(doc(db, 'stays', stay.id), stay);
    }
    console.log('WhereInCalicut: Seeding completed successfully!');
  } catch (error) {
    console.error('WhereInCalicut: Seeding failed:', error);
  }
}

// Fetch all stays from Firestore, fallback to local mock if Firebase not configured
export async function fetchStaysFromFirebase(): Promise<Stay[]> {
  if (!isFirebaseConfigured || !db) {
    return STAYS_DATA;
  }
  try {
    const staysCol = collection(db, 'stays');
    const staysSnapshot = await getDocs(staysCol);
    
    if (staysSnapshot.empty) {
      await seedMockData();
      return STAYS_DATA;
    }
    
    const stays: Stay[] = [];
    staysSnapshot.forEach((doc) => {
      stays.push(doc.data() as Stay);
    });
    return stays;
  } catch (error) {
    console.error('WhereInCalicut: Error fetching from Firestore, falling back to mock data:', error);
    return STAYS_DATA;
  }
}

// Submit booking request to Firestore
export async function submitBookingToFirebase(bookingData: {
  stayId: string;
  stayTitle: string;
  name: string;
  phone: string;
  date: string;
  message: string;
  status: 'Pending' | 'Confirmed';
  createdAt: string;
}) {
  if (!isFirebaseConfigured || !db) {
    console.log('WhereInCalicut: (Local Mode) Saved Booking Request:', bookingData);
    return true;
  }
  try {
    const bookingsCol = collection(db, 'bookings');
    await addDoc(bookingsCol, bookingData);
    console.log('WhereInCalicut: Booking submitted successfully to Firestore!');
    return true;
  } catch (error) {
    console.error('WhereInCalicut: Error saving booking to Firestore:', error);
    return false;
  }
}

// Submit contact/inquiry request to Firestore
export async function submitInquiryToFirebase(inquiryData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}) {
  if (!isFirebaseConfigured || !db) {
    console.log('WhereInCalicut: (Local Mode) Saved Contact Message:', inquiryData);
    return true;
  }
  try {
    const inquiriesCol = collection(db, 'inquiries');
    await addDoc(inquiriesCol, inquiryData);
    console.log('WhereInCalicut: Inquiry submitted successfully to Firestore!');
    return true;
  } catch (error) {
    console.error('WhereInCalicut: Error saving inquiry to Firestore:', error);
    return false;
  }
}

