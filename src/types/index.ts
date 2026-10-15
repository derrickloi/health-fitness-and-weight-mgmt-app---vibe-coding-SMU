export interface NutrientInfo {
  calories: number;
  carbs: number; // in grams
  protein: number; // in grams
  fat: number; // in grams
  sodium: number; // in mg
  glycemicIndex: 'Low' | 'Medium' | 'High';
  healthierSwapTip?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  localName?: string;
  country: 'Singapore' | 'Malaysia' | 'Indonesia' | 'Thailand' | 'Vietnam' | 'Philippines' | 'Pan-ASEAN';
  category: 'Hawker Classic' | 'Healthy Bowl' | 'Soup & Noodles' | 'Snack & Beverage' | 'Breakfast';
  portion: string;
  nutrients: NutrientInfo;
  tags: string[];
  imagePlaceholderColor: string;
}

export interface LoggedMeal {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sodium: number;
  timestamp: string;
  verifiedByAI: boolean;
}

export interface WeightPlan {
  currentWeight: number; // in kg
  targetWeight: number; // in kg
  height: number; // in cm
  durationWeeks: number;
  primaryGoal: 'Fat Loss' | 'Diabetes Management' | 'Hyrox Athletic Prep' | 'Postpartum Wellness' | 'Active Ageing';
  dailyCalorieTarget: number;
  dailyDeficit: number;
  recommendedWaterLiters: number;
  targetDailySteps: number;
  weeklyWorkouts: {
    day: string;
    activity: string;
    durationMins: number;
    caloriesBurnEstimate: number;
    intensity: 'Low' | 'Moderate' | 'High';
  }[];
  milestones: {
    week: number;
    expectedWeight: number;
    action: string;
  }[];
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  role: 'Certified Personal Trainer' | 'Clinical Dietitian' | 'Sports Nutritionist' | 'Hyrox Coach' | 'Diabetes Health Coach';
  country: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number; // in SGD
  languages: string[];
  certifications: string[];
  specialties: string[];
  bio: string;
  availableDays: string[];
  availableSlots: string[];
  avatarInitial: string;
  avatarBg: string;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  type: 'Smartwatch' | 'Smart Scale' | 'National Program' | 'Blood Pressure/Glucose';
  status: 'connected' | 'disconnected';
  lastSync: string;
  batteryLevel?: number;
  iconType: 'watch' | 'scale' | 'shield' | 'activity';
  features: string[];
}

export interface BiometricSummary {
  todaySteps: number;
  stepGoal: number;
  activeCalories: number;
  calorieGoal: number;
  currentWeight: number;
  bodyFatPercentage: number;
  skeletalMuscleMass: number;
  streakDays: number;
  waterIntakeMl: number;
  waterGoalMl: number;
}

export interface FitnessEvent {
  id: string;
  title: string;
  category: 'Hyrox Simulation' | 'Dietitian Webinar' | 'ActiveSG Community' | 'Marathon Clinic' | 'Active Ageing';
  date: string;
  time: string;
  location: string;
  instructor: string;
  fee: string;
  spotsLeft: number;
  description: string;
  suitableFor: string;
}

export interface RewardItem {
  id: string;
  partnerName: string;
  partnerCategory: 'Healthy F&B' | 'Gym & Facilities' | 'Sports Equipment' | 'Health Screening';
  title: string;
  pointsCost: number;
  originalValue: string;
  expiresInDays: number;
  country: string;
  description: string;
}
