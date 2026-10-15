import { FoodItem, LoggedMeal, Trainer, ConnectedDevice, BiometricSummary, FitnessEvent, RewardItem } from '../types';

export const INITIAL_FOOD_DATABASE: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Hainanese Steamed Chicken Rice',
    localName: '海南鸡饭',
    country: 'Singapore',
    category: 'Hawker Classic',
    portion: '1 Plate (350g)',
    nutrients: {
      calories: 610,
      carbs: 48,
      protein: 30,
      fat: 22,
      sodium: 980,
      glycemicIndex: 'High',
      healthierSwapTip: 'Request steamed breast meat without skin, ask for half rice and add extra sliced cucumber.'
    },
    tags: ['High Protein', 'Halal Available', 'Hawker Staple'],
    imagePlaceholderColor: '#fef3c7'
  },
  {
    id: 'food-2',
    name: 'Katong Seafood Laksa',
    localName: 'Laksa Singapura',
    country: 'Singapore',
    category: 'Soup & Noodles',
    portion: '1 Bowl (450g)',
    nutrients: {
      calories: 580,
      carbs: 64,
      protein: 24,
      fat: 26,
      sodium: 1480,
      glycemicIndex: 'High',
      healthierSwapTip: 'Drink only half the coconut broth to reduce saturated fat and sodium by over 40%.'
    },
    tags: ['Rich Broth', 'Seafood', 'Hawker Staple'],
    imagePlaceholderColor: '#ffedd5'
  },
  {
    id: 'food-3',
    name: 'Nasi Lemak with Beef Rendang & Boiled Egg',
    localName: 'Nasi Lemak Rendang Daging',
    country: 'Malaysia',
    category: 'Hawker Classic',
    portion: '1 Plate (400g)',
    nutrients: {
      calories: 670,
      carbs: 66,
      protein: 28,
      fat: 34,
      sodium: 890,
      glycemicIndex: 'Medium',
      healthierSwapTip: 'Choose boiled egg instead of fried, request cucumber refills, and moderate the sweet sambal portion.'
    },
    tags: ['High Flavor', 'Halal', 'Traditional'],
    imagePlaceholderColor: '#dcfce7'
  },
  {
    id: 'food-4',
    name: 'Vietnamese Beef Pho (Phở Bò)',
    localName: 'Phở Bò Tái Nạm',
    country: 'Vietnam',
    category: 'Soup & Noodles',
    portion: '1 Large Bowl (550g)',
    nutrients: {
      calories: 420,
      carbs: 52,
      protein: 36,
      fat: 8,
      sodium: 1120,
      glycemicIndex: 'Low',
      healthierSwapTip: 'Lean beef cuts provide excellent lean protein; load up on raw bean sprouts, fresh mint, and Thai basil.'
    },
    tags: ['Lean Protein', 'Low Fat', 'Hearty'],
    imagePlaceholderColor: '#e0f2fe'
  },
  {
    id: 'food-5',
    name: 'Som Tum Thai with Grilled Gai Yang Chicken',
    localName: 'ส้มตำไก่ย่าง',
    country: 'Thailand',
    category: 'Healthy Bowl',
    portion: '1 Set (380g)',
    nutrients: {
      calories: 390,
      carbs: 26,
      protein: 42,
      fat: 11,
      sodium: 760,
      glycemicIndex: 'Low',
      healthierSwapTip: 'One of the best ASEAN weight loss meals. High fiber green papaya paired with lean char-grilled chicken.'
    },
    tags: ['Weight Loss Hero', 'High Fiber', 'Gluten Free'],
    imagePlaceholderColor: '#fef08a'
  },
  {
    id: 'food-6',
    name: 'Indonesian Gado-Gado with Tempeh & Tofu',
    localName: 'Gado-Gado Betawi',
    country: 'Indonesia',
    category: 'Healthy Bowl',
    portion: '1 Plate (360g)',
    nutrients: {
      calories: 470,
      carbs: 38,
      protein: 26,
      fat: 22,
      sodium: 540,
      glycemicIndex: 'Low',
      healthierSwapTip: 'Naturally plant-forward with fermented tempeh offering high gut prebiotic value and steady blood glucose.'
    },
    tags: ['Vegetarian', 'Gut Friendly', 'High Protein'],
    imagePlaceholderColor: '#ecfccb'
  },
  {
    id: 'food-7',
    name: 'Clear Broth Yong Tau Foo (6 pieces with Bee Hoon)',
    localName: '酿豆腐清汤',
    country: 'Singapore',
    category: 'Soup & Noodles',
    portion: '1 Bowl (400g)',
    nutrients: {
      calories: 310,
      carbs: 32,
      protein: 22,
      fat: 10,
      sodium: 720,
      glycemicIndex: 'Low',
      healthierSwapTip: 'Select boiled items (bitter gourd, tofu, mushrooms) instead of deep-fried pieces. Certified HPB Healthier Choice.'
    },
    tags: ['HPB Healthier Choice', 'Low Calorie', 'High Satiety'],
    imagePlaceholderColor: '#f1f5f9'
  },
  {
    id: 'food-8',
    name: 'Thai Tom Yum Seafood Soup with Steamed Rice',
    localName: 'ต้มยำกุ้งน้ำใส',
    country: 'Thailand',
    category: 'Soup & Noodles',
    portion: '1 Bowl (420g)',
    nutrients: {
      calories: 360,
      carbs: 40,
      protein: 28,
      fat: 9,
      sodium: 1250,
      glycemicIndex: 'Medium',
      healthierSwapTip: 'Opt for clear broth (Nam Sai) rather than creamy evaporated milk version for 180 fewer calories.'
    },
    tags: ['Metabolism Boost', 'Spicy', 'Seafood'],
    imagePlaceholderColor: '#fee2e2'
  }
];

export const INITIAL_LOGGED_MEALS: LoggedMeal[] = [
  {
    id: 'log-1',
    mealType: 'Breakfast',
    foodName: 'Kaya Toast (1 slice) & 2 Soft Boiled Eggs',
    calories: 290,
    carbs: 28,
    protein: 16,
    fat: 12,
    sodium: 380,
    timestamp: '08:15 AM',
    verifiedByAI: true
  },
  {
    id: 'log-2',
    mealType: 'Lunch',
    foodName: 'Vietnamese Beef Pho (Phở Bò)',
    calories: 420,
    carbs: 52,
    protein: 36,
    fat: 8,
    sodium: 1120,
    timestamp: '12:45 PM',
    verifiedByAI: true
  }
];

export const INITIAL_BIOMETRICS: BiometricSummary = {
  todaySteps: 7840,
  stepGoal: 10000,
  activeCalories: 480,
  calorieGoal: 650,
  currentWeight: 74.2,
  bodyFatPercentage: 22.4,
  skeletalMuscleMass: 31.8,
  streakDays: 14,
  waterIntakeMl: 1750,
  waterGoalMl: 2500
};

export const MOCK_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Marcus Tan, CSCS',
    title: 'Senior Strength & Hyrox Performance Coach',
    role: 'Hyrox Coach',
    country: 'Singapore',
    city: 'Singapore (CBD & ActiveSG Kallang)',
    rating: 4.95,
    reviewCount: 142,
    pricePerSession: 85,
    languages: ['English', 'Mandarin'],
    certifications: ['NSCA-CSCS', 'Hyrox Official Master Trainer', 'ActiveSG Registered Coach'],
    specialties: ['Hyrox Simulation', 'Athletic Conditioning', 'Safe Fat Loss'],
    bio: 'Former national athlete with 9+ years helping working executives shed body fat while hitting podium personal records in Hyrox and half marathons.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    availableSlots: ['07:00 AM', '12:30 PM', '06:00 PM', '07:30 PM'],
    avatarInitial: 'MT',
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'tr-2',
    name: 'Nurul Huda, APD',
    title: 'Senior Clinical Dietitian & Pre-Diabetes Specialist',
    role: 'Clinical Dietitian',
    country: 'Singapore / Malaysia',
    city: 'Singapore & Virtual Consultation',
    rating: 4.98,
    reviewCount: 215,
    pricePerSession: 95,
    languages: ['English', 'Malay'],
    certifications: ['Accredited Practising Dietitian (APD)', 'Singapore Nutrition & Dietetics Assoc.', 'Certified Diabetes Educator'],
    specialties: ['Pre-Diabetes Reversal', 'ASEAN Hawker Diet Makeovers', 'PCOS Weight Loss'],
    bio: 'Passionate about cultural food heritage. You do not need to give up laksa, nasi padang, or roti canai to reverse insulin resistance and lose 10kg sustainably.',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sun'],
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '05:00 PM'],
    avatarInitial: 'NH',
    avatarBg: 'bg-teal-700'
  },
  {
    id: 'tr-3',
    name: 'Somchai Prasert',
    title: 'Functional Movement & Muay Thai Conditioning',
    role: 'Certified Personal Trainer',
    country: 'Thailand',
    city: 'Bangkok (Sukhumvit) & Virtual',
    rating: 4.88,
    reviewCount: 98,
    pricePerSession: 55,
    languages: ['English', 'Thai'],
    certifications: ['ACE Certified Personal Trainer', 'Thai Olympic Committee Boxing Coach'],
    specialties: ['High Calorie Burn HIIT', 'Core Stability', 'Beginner Functional Fitness'],
    bio: 'Dynamic coaching blending traditional Muay Thai stamina drills with joint-friendly weight loss circuits suited for 20 to 65-year-olds.',
    availableDays: ['Tue', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['08:00 AM', '10:30 AM', '04:00 PM', '06:30 PM'],
    avatarInitial: 'SP',
    avatarBg: 'bg-amber-700'
  },
  {
    id: 'tr-4',
    name: 'Arief Wicaksono',
    title: 'Metabolic Health & Sustainable Weight Management',
    role: 'Diabetes Health Coach',
    country: 'Indonesia',
    city: 'Jakarta (Senayan) & Virtual',
    rating: 4.92,
    reviewCount: 120,
    pricePerSession: 60,
    languages: ['English', 'Bahasa Indonesia'],
    certifications: ['ISSA Master Trainer', 'Certified Lifestyle Medicine Coach'],
    specialties: ['Visceral Fat Reduction', 'Low Impact Workouts', 'Overweight / Senior Fitness'],
    bio: 'Specializes in clients 40-70 years old managing joint stiffness, elevated cholesterol, and visceral weight with progressive habit coaching.',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    availableSlots: ['08:30 AM', '01:00 PM', '04:30 PM', '07:00 PM'],
    avatarInitial: 'AW',
    avatarBg: 'bg-cyan-700'
  },
  {
    id: 'tr-5',
    name: 'Dr. Kimberly Reyes, MD, CISSN',
    title: 'Sports Physician & Certified Nutritionist',
    role: 'Sports Nutritionist',
    country: 'Philippines',
    city: 'Manila (BGC) & Virtual',
    rating: 4.97,
    reviewCount: 167,
    pricePerSession: 75,
    languages: ['English', 'Tagalog'],
    certifications: ['Doctor of Medicine', 'ISSN Certified Sports Nutritionist'],
    specialties: ['Body Composition Recomposition', 'Hormonal Fat Loss', 'Blood Marker Analysis'],
    bio: 'Integrates medical biomarker diagnostics (HbA1c, lipid panel, InBody muscle-fat balance) into realistic everyday Asian lifestyle routines.',
    availableDays: ['Wed', 'Thu', 'Sat', 'Sun'],
    availableSlots: ['10:00 AM', '02:30 PM', '04:30 PM', '06:30 PM'],
    avatarInitial: 'KR',
    avatarBg: 'bg-indigo-700'
  },
  {
    id: 'tr-6',
    name: 'Melissa Wong',
    title: 'Postnatal & Women Strength Specialist',
    role: 'Certified Personal Trainer',
    country: 'Singapore',
    city: 'Singapore (East Coast & Jurong)',
    rating: 4.91,
    reviewCount: 88,
    pricePerSession: 80,
    languages: ['English', 'Mandarin'],
    certifications: ['NASM Women’s Fitness Specialist', 'Pre/Post Natal Exercise Science'],
    specialties: ['Diastasis Recti Recovery', 'Postpartum Weight Reset', 'Pelvic Floor Safe Strength'],
    bio: 'Empowering new mothers and busy working women to regain core foundation, energy, and body confidence safely without burnout.',
    availableDays: ['Tue', 'Thu', 'Fri', 'Sun'],
    availableSlots: ['09:30 AM', '11:30 AM', '03:00 PM', '05:30 PM'],
    avatarInitial: 'MW',
    avatarBg: 'bg-rose-700'
  }
];

export const CONNECTED_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev-1',
    name: 'Apple Watch Series 10',
    type: 'Smartwatch',
    status: 'connected',
    lastSync: '2 minutes ago',
    batteryLevel: 78,
    iconType: 'watch',
    features: ['Real-time Heart Rate', 'Active Calories (480 kcal)', 'ECG & Sleep']
  },
  {
    id: 'dev-2',
    name: 'InBody 270 Body Composition Scale',
    type: 'Smart Scale',
    status: 'connected',
    lastSync: 'Today at 07:15 AM',
    iconType: 'scale',
    features: ['Skeletal Muscle Mass (31.8 kg)', 'Body Fat % (22.4%)', 'Visceral Fat Grade 7']
  },
  {
    id: 'dev-3',
    name: 'Health365 (HPB Singapore) & ActiveSG',
    type: 'National Program',
    status: 'connected',
    lastSync: '10 minutes ago',
    iconType: 'shield',
    features: ['National Steps Challenge Eligible', 'ActiveSG Gym/Pool Pass Sync', 'HealthPoints Sync']
  },
  {
    id: 'dev-4',
    name: 'Garmin Forerunner 965',
    type: 'Smartwatch',
    status: 'disconnected',
    lastSync: '3 days ago',
    iconType: 'watch',
    features: ['GPS Running Dynamics', 'VO2 Max', 'Hyrox Race Pacing']
  }
];

export const UPCOMING_EVENTS: FitnessEvent[] = [
  {
    id: 'ev-1',
    title: 'Hyrox ASEAN Simulation Workshop & Pacing Clinic',
    category: 'Hyrox Simulation',
    date: 'Saturday, Oct 24, 2026',
    time: '08:00 AM – 11:00 AM SGT',
    location: 'ActiveSG Stadium Kallang / Marina Bay Pit',
    instructor: 'Coach Marcus Tan, CSCS',
    fee: 'SGD $35 (Free for Premium Members)',
    spotsLeft: 6,
    description: 'Learn energy pacing for SkiErg, Sled Push, Burpee Broad Jumps, and 1km run splits. Comprehensive race-day prep.',
    suitableFor: 'Intermediate to Advanced athletes & first-time Hyrox racers'
  },
  {
    id: 'ev-2',
    title: 'Webinar: Taming Blood Glucose with ASEAN Hawker Delights',
    category: 'Dietitian Webinar',
    date: 'Wednesday, Oct 28, 2026',
    time: '07:30 PM – 08:45 PM SGT',
    location: 'Interactive Live Stream & Q&A',
    instructor: 'Nurul Huda, APD',
    fee: 'Free Community Webinar',
    spotsLeft: 45,
    description: 'Practical ordering hacks for hawker centers across Singapore, Malaysia, and Indonesia without glycemic spikes.',
    suitableFor: 'Pre-diabetic, Type 2, and health-conscious food lovers'
  },
  {
    id: 'ev-3',
    title: 'Active Ageing (50-70yo): Joint-Friendly Strength & Mobility',
    category: 'Active Ageing',
    date: 'Sunday, Nov 1, 2026',
    time: '09:00 AM – 10:30 AM SGT',
    location: 'Bishan-Ang Mo Kio Park (Lotus Lawn)',
    instructor: 'Coach Arief Wicaksono & ActiveSG Team',
    fee: 'Complimentary under Health365',
    spotsLeft: 14,
    description: 'Gentle resistance band movement, balance stability, and bone density stimulation tailored for seniors and mid-lifers.',
    suitableFor: 'Ages 45 to 75, beginner-friendly'
  },
  {
    id: 'ev-4',
    title: 'Standard Chartered Singapore Marathon 10K / 21K Prep Run',
    category: 'Marathon Clinic',
    date: 'Saturday, Nov 7, 2026',
    time: '06:30 AM – 09:00 AM SGT',
    location: 'Gardens by the Bay to East Coast Park',
    instructor: 'Dr. Kimberly Reyes & Team Shizen Pacer Club',
    fee: 'Free with RSVP',
    spotsLeft: 22,
    description: 'Guided progressive pace group runs with electrolyte hydration stations, recovery rolling, and form critique.',
    suitableFor: 'Runners aiming for 10km to 21km completion'
  }
];

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: 'rew-1',
    partnerName: 'SaladStop! ASEAN',
    partnerCategory: 'Healthy F&B',
    title: '$5 Off Any Signature Warm Protein Grain Bowl',
    pointsCost: 350,
    originalValue: 'SGD $5.00',
    expiresInDays: 30,
    country: 'Singapore, Malaysia, Indonesia, Philippines',
    description: 'Redeem across 40+ outlets in Singapore, Jakarta, and Manila. Valid on all warm grain bowls and custom wraps.'
  },
  {
    id: 'rew-2',
    partnerName: 'ActiveSG Singapore',
    partnerCategory: 'Gym & Facilities',
    title: '1-Day Free Entry to ActiveSG Gym & Swimming Complex',
    pointsCost: 200,
    originalValue: 'SGD $3.50',
    expiresInDays: 60,
    country: 'Singapore',
    description: 'Access any of the 26 ActiveSG gym facilities islandwide during operational hours with direct QR gate entry.'
  },
  {
    id: 'rew-3',
    partnerName: 'Grain Healthy Meal Prep',
    partnerCategory: 'Healthy F&B',
    title: '$15 Off Your First Weekly Calorie-Controlled Meal Subscription',
    pointsCost: 500,
    originalValue: 'SGD $15.00',
    expiresInDays: 45,
    country: 'Singapore',
    description: 'Nutrient-dense meals created by clinical chefs, delivered fresh daily with automated macro barcode logging.'
  },
  {
    id: 'rew-4',
    partnerName: 'InBody Health Clinic Scan',
    partnerCategory: 'Health Screening',
    title: 'Complimentary InBody 570 Full Medical Body Scan & Report',
    pointsCost: 650,
    originalValue: 'SGD $45.00',
    expiresInDays: 90,
    country: 'Singapore, KL, Bangkok, Jakarta',
    description: 'Includes segment-by-segment muscle imbalance analysis, visceral fat level, extracellular water ratio, and coach review.'
  },
  {
    id: 'rew-5',
    partnerName: 'Decathlon ASEAN',
    partnerCategory: 'Sports Equipment',
    title: '15% Off Resistance Equipment, Running Shoes & Smart Scales',
    pointsCost: 400,
    originalValue: '15% Off (Cap $20)',
    expiresInDays: 30,
    country: 'Pan-ASEAN',
    description: 'Valid in-store and online across Singapore, Malaysia, Thailand, and Indonesia on all fitness accessories.'
  },
  {
    id: 'rew-6',
    partnerName: 'Hyrox APAC Race Entry',
    partnerCategory: 'Gym & Facilities',
    title: '$25 Discount on Hyrox Singapore / Hyrox KL Registration',
    pointsCost: 900,
    originalValue: 'SGD $25.00',
    expiresInDays: 60,
    country: 'Singapore & Malaysia',
    description: 'Applicable to Open, Pro, or Doubles division registration codes for upcoming ASEAN race weekends.'
  }
];

export const BMC_BLUEPRINT = [
  {
    pillar: 'Key Partners',
    color: 'border-blue-500 bg-blue-50/50',
    items: [
      'Gyms & Studios (Anytime Fitness, True Fitness, local community hubs)',
      'Healthy F&B Businesses (SaladStop!, Grain, low-GI hawker vendors)',
      'Exercise Equipment brands (Bicycles, Anywheel, Decathlon)',
      'Government Programmes (ActiveSG, Singapore Health365 National Steps)',
      'Healthcare & Dietary Professionals (APDs, sports doctors, endocrinologists)',
      'Sporting Events (Hyrox ASEAN, Standard Chartered Marathons)',
      'Health Trackers (Apple Watch, Garmin, Fitbit, Samsung Galaxy)',
      'Weight Management Devices (InBody clinical body composition scanners)',
      'Motivators & Certified Physical Trainers'
    ]
  },
  {
    pillar: 'Key Activities',
    color: 'border-indigo-500 bg-indigo-50/50',
    items: [
      'Easily accessible mobile-first responsive application',
      'Cross-compatible platform syncing watches, trackers, scales, and phones',
      'Robust programming: weekly courses, monthly events, dietitian talks'
    ]
  },
  {
    pillar: 'Key Propositions',
    color: 'border-amber-500 bg-amber-50/50',
    items: [
      'AI Calorie Tracker: photo upload with instant ASEAN food calculation',
      'Online engagement of accredited trainers & registered dietitians',
      'Platform to find, filter by price, and book suitable trainers',
      'End-to-end weight management program tailored to goals & medical needs',
      'Calendar integration for all workouts, meal check-ins, and sessions'
    ]
  },
  {
    pillar: 'Customer Relationships',
    color: 'border-orange-500 bg-orange-50/50',
    items: [
      'On-demand 24/7 self-guided application usage',
      'Duolingo-style streak motivation & personalized daily push notifications',
      'Calorie, hydration, and movement reminders',
      'HealthPoints rewards points system for daily habit completion',
      'Community events and roadshows to encourage sign-ups & peer bonding',
      'Referral program (Refer a friend and unlock bonus points)'
    ]
  },
  {
    pillar: 'Channels',
    color: 'border-orange-400 bg-orange-50/40',
    items: [
      'Government partnerships (Health365, ActiveSG integration)',
      'Referrals from clinics and hospitals (pre-diabetes & metabolic health)',
      'Corporate insurance providers (AIA Vitality, Great Eastern wellness credits)',
      'Referrals from registered wellness providers & physical therapists',
      'Public roadshows, park clinics, and social media fitness communities'
    ]
  },
  {
    pillar: 'Customer Segments',
    color: 'border-rose-500 bg-rose-50/50',
    items: [
      'Health-conscious individuals looking for localized nutrition support',
      'Sports interest groups (hyrox racers, marathon runners, cycling clubs)',
      '18 to 70 years old demographic across Southeast Asia',
      'People seeking sustainable, non-starvation weight loss',
      'Overweight or medically-referred individuals (Type 2 diabetes, high cholesterol)'
    ]
  },
  {
    pillar: 'Cost Structure',
    color: 'border-emerald-500 bg-emerald-50/50',
    items: [
      'Upfront development & platform setup cost: $150,000',
      'Recurring operational cost (cloud, APIs, serverless infrastructure): $45,000/yr',
      'Miscellaneous operational & community marketing cost: $50,000/yr'
    ]
  },
  {
    pillar: 'Revenue Streams',
    color: 'border-emerald-600 bg-emerald-50/60',
    items: [
      '2 Million Freemium Users (ad-supported, basic logging, community events)',
      '1 Million Paying Customers target',
      'Basic Subscription Tier: $10/month (unlimited AI scans, custom meal plans)',
      'Premium Subscription Tier: $100/month (1-on-1 certified trainer & dietitian)',
      'Vendor & Gym Referral Commission per customer referred or session booked',
      'Financial roadmap: Break even in 1 year, highly profitable in 3 years'
    ]
  },
  {
    pillar: 'Key Resources',
    color: 'border-sky-500 bg-sky-50/50',
    items: [
      'Working cross-platform application (Front-End & Back-End APIs)',
      'Commercial, corporate insurance, and healthy F&B marketing partnerships',
      'Accredited healthcare, fitness, and diet-related professional network'
    ]
  }
];
