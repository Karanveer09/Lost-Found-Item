// Mock College Database — Roll Numbers & Default Passwords
// In production, this would connect to the actual college database API

export const COLLEGE_STUDENTS = [];

export const ADMIN_USERS = [
  { rollNumber: 'admin', password: 'admin123', name: 'System Admin' }
];

// Generate 50 students with roll numbers 2024001 to 2024050
for (let i = 1; i <= 50; i++) {
  COLLEGE_STUDENTS.push({
    rollNumber: `2024${String(i).padStart(3, '0')}`,
    password: 'college123',
  });
}

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Mathematics',
  'Physics',
  'MBA',
];

export const YEARS = [
  'First Year (FY)',
  'Second Year (SY)',
  'Third Year (TY)',
  'Final Year',
];

export const HOSTELS = [
  'Not a Hosteler (Day Scholar)',
  'Hostel A — Boys',
  'Hostel B — Boys',
  'Hostel C — Girls',
  'Hostel D — Girls',
  'Hostel E — Co-ed',
];

export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics', icon: '💻' },
  { id: 'documents', label: 'Documents / ID Cards', icon: '📄' },
  { id: 'accessories', label: 'Accessories', icon: '👜' },
  { id: 'books', label: 'Books / Stationery', icon: '📚' },
  { id: 'clothing', label: 'Clothing', icon: '👕' },
  { id: 'keys', label: 'Keys', icon: '🔑' },
  { id: 'wallet', label: 'Wallet / Money', icon: '💰' },
  { id: 'sports', label: 'Sports Equipment', icon: '⚽' },
  { id: 'others', label: 'Others', icon: '📦' },
];

export const CAMPUS_LOCATIONS = [
  'Main Gate',
  'Library',
  'Canteen / Food Court',
  'Auditorium',
  'Computer Lab',
  'Workshop',
  'Parking Area',
  'Sports Ground',
  'Seminar Hall',
  'Admin Block',
  'Classroom Block A',
  'Classroom Block B',
  'Classroom Block C',
  'Garden Area',
  'Bus Stop',
  'Other',
];

export const HOSTEL_LOCATIONS = [
  'Mess / Dining Hall',
  'Common Room',
  'Laundry Area',
  'Gym',
  'Study Room',
  'Corridor',
  'Washroom Area',
  'Terrace',
  'Parking Area',
  'Reception / Entrance',
  'Room',
  'Other',
];

// Seed demo items
export const DEMO_ITEMS = [
  {
    id: 'item-001',
    type: 'lost',
    module: 'campus',
    title: 'Black HP Laptop Charger',
    description: 'Lost my HP laptop charger near the library. It has a small dent on the adapter. Blue tape on the cable.',
    category: 'electronics',
    location: 'Library',
    date: '2026-04-04',
    status: 'open',
    reportedBy: '2024003',
    reportedAt: '2026-04-04T10:30:00',
    image: null,
  },
  {
    id: 'item-002',
    type: 'found',
    module: 'campus',
    title: 'Silver Watch Found in Canteen',
    description: 'Found a silver wristwatch near table 5 in the food court. Has scratches on the back. Analog with leather strap.',
    category: 'accessories',
    location: 'Canteen / Food Court',
    date: '2026-04-03',
    status: 'open',
    reportedBy: '2024007',
    reportedAt: '2026-04-03T14:15:00',
    image: null,
  },
  {
    id: 'item-003',
    type: 'found',
    module: 'hostel',
    hostel: 'Hostel A — Boys',
    title: 'Blue Water Bottle',
    description: 'Found a blue Milton water bottle in the mess area. Has a sticker that says "Stay Hydrated".',
    category: 'others',
    location: 'Mess / Dining Hall',
    date: '2026-04-05',
    status: 'open',
    reportedBy: '2024012',
    reportedAt: '2026-04-05T08:45:00',
    image: null,
  },
  {
    id: 'item-004',
    type: 'lost',
    module: 'campus',
    title: 'Engineering Mathematics Textbook',
    description: 'Lost my engineering math textbook (by B.S. Grewal) somewhere around Block A. My name is written on the first page.',
    category: 'books',
    location: 'Classroom Block A',
    date: '2026-04-02',
    status: 'claimed',
    reportedBy: '2024015',
    reportedAt: '2026-04-02T16:00:00',
    claimedBy: '2024020',
    image: null,
  },
  {
    id: 'item-005',
    type: 'found',
    module: 'hostel',
    hostel: 'Hostel C — Girls',
    title: 'Pair of Earbuds (White)',
    description: 'Found white wireless earbuds case in the common room. Brand seems to be boAt.',
    category: 'electronics',
    location: 'Common Room',
    date: '2026-04-05',
    status: 'open',
    reportedBy: '2024022',
    reportedAt: '2026-04-05T20:30:00',
    image: null,
  },
  {
    id: 'item-006',
    type: 'lost',
    module: 'hostel',
    hostel: 'Hostel B — Boys',
    title: 'Room Key (Room 204)',
    description: 'Lost my hostel room key somewhere between the gym and the corridor. Silver key with a red keychain.',
    category: 'keys',
    location: 'Gym',
    date: '2026-04-04',
    status: 'open',
    reportedBy: '2024030',
    reportedAt: '2026-04-04T19:00:00',
    image: null,
  },
];
