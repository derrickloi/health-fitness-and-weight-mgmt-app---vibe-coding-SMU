import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Check, Plus, AlertCircle, Heart, ChevronRight, Info, Utensils, Trash2 } from 'lucide-react';
import { FoodItem, LoggedMeal } from '../types';
import { INITIAL_FOOD_DATABASE, INITIAL_LOGGED_MEALS } from '../data/mockData';

interface MealScannerProps {
  onMealLogged: (pointsEarned: number) => void;
}

export const MealScanner: React.FC<MealScannerProps> = ({ onMealLogged }) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem>(INITIAL_FOOD_DATABASE[0]);
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>(INITIAL_LOGGED_MEALS);
  const [isScanning, setIsScanning] = useState(false);
  const [customImageName, setCustomImageName] = useState<string | null>(null);
  const [mealCategory, setMealCategory] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Dinner');
  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Daily target constants
  const DAILY_CALORIE_BUDGET = 1850;
  const currentTotalCalories = loggedMeals.reduce((acc, m) => acc + m.calories, 0);
  const currentProtein = loggedMeals.reduce((acc, m) => acc + m.protein, 0);
  const currentCarbs = loggedMeals.reduce((acc, m) => acc + m.carbs, 0);
  const currentFat = loggedMeals.reduce((acc, m) => acc + m.fat, 0);
  const currentSodium = loggedMeals.reduce((acc, m) => acc + m.sodium, 0);

  const filteredFoods = INITIAL_FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.localName && f.localName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSimulateScan = (food: FoodItem) => {
    setIsScanning(true);
    setCustomImageName(null);
    setTimeout(() => {
      setSelectedFood(food);
      setIsScanning(false);
    }, 450);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomImageName(file.name);
      setIsScanning(true);

      // Match or fallback to a healthy ASEAN dish
      const randomFood = INITIAL_FOOD_DATABASE[Math.floor(Math.random() * INITIAL_FOOD_DATABASE.length)];
      setTimeout(() => {
        setSelectedFood(randomFood);
        setIsScanning(false);
      }, 700);
    }
  };

  const handleLogCurrentMeal = () => {
    const newLog: LoggedMeal = {
      id: `log-${Date.now()}`,
      mealType: mealCategory,
      foodName: selectedFood.name,
      calories: selectedFood.nutrients.calories,
      carbs: selectedFood.nutrients.carbs,
      protein: selectedFood.nutrients.protein,
      fat: selectedFood.nutrients.fat,
      sodium: selectedFood.nutrients.sodium,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verifiedByAI: true
    };

    setLoggedMeals([newLog, ...loggedMeals]);
    onMealLogged(50); // Earn 50 HealthPoints
    setSuccessToast(`Logged "${selectedFood.name}" to ${mealCategory}! +50 HealthPoints earned.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleDeleteMeal = (id: string) => {
    setLoggedMeals(loggedMeals.filter(m => m.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-emerald-500/30 transition-all">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{successToast}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
            <span>VALUE PROPOSITION #1</span>
            <span aria-hidden="true">·</span>
            <span>ASEAN FOOD VISION AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            AI Calorie & Meal Scanner
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Upload or capture your breakfast, lunch, or hawker dinner. Our localized computer-vision engine recognizes Southeast Asian spices, coconut milk bases, and noodle cuts to estimate exact macros and glycemic index.
          </p>
        </div>

        {/* Daily Summary Pill */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5 shrink-0">
          <div>
            <span className="text-xs text-slate-500 block">Today's Total</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">{currentTotalCalories}</span>
              <span className="text-xs text-slate-500 font-medium">/ {DAILY_CALORIE_BUDGET} kcal</span>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-slate-200"></div>
          <div>
            <span className="text-xs text-slate-500 block">Remaining</span>
            <span className={`text-xl font-bold tabular-nums ${DAILY_CALORIE_BUDGET - currentTotalCalories >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {DAILY_CALORIE_BUDGET - currentTotalCalories} kcal
            </span>
          </div>
        </div>
      </div>

      {/* Main Scanner Workspace: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload / Scanner Zone & Food Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>Snap or Upload Food Photo</span>
              </h3>
              <span className="text-xs text-slate-500">Live Camera Ready</span>
            </div>

            {/* Upload Drag & Drop Area */}
            <label className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50/70 hover:bg-emerald-50/30 transition-all text-center group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-emerald-600 group-hover:scale-105 transition-all mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                {customImageName ? `Loaded: ${customImageName}` : 'Click to Upload or Drag Meal Photo'}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Supports JPG, PNG, HEIC from smartphone camera
              </span>
            </label>

            {/* Quick Presets: Popular ASEAN Hawker Dishes */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-600 block">
                Or pick a common ASEAN hawker dish to test:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {INITIAL_FOOD_DATABASE.slice(0, 4).map((food) => (
                  <button
                    key={food.id}
                    onClick={() => handleSimulateScan(food)}
                    className={`p-2.5 rounded-xl border text-left transition-all text-xs font-medium ${
                      selectedFood.id === food.id && !customImageName
                        ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="block truncate font-bold text-slate-900">{food.name}</span>
                    <span className="text-[11px] text-slate-500">{food.country} · {food.nutrients.calories} kcal</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Hawker Database */}
            <div className="pt-2">
              <input
                type="text"
                placeholder="Search ASEAN foods (e.g. Som Tum, Laksa, Gado-Gado)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              {searchQuery && (
                <div className="mt-2 max-h-40 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white shadow-sm">
                  {filteredFoods.map(food => (
                    <button
                      key={food.id}
                      onClick={() => {
                        handleSimulateScan(food);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2.5 text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800">{food.name}</span>
                      <span className="text-slate-500 tabular-nums">{food.nutrients.calories} kcal</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Result & Logging Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 relative overflow-hidden">
            {isScanning && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-20 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-semibold text-slate-800">
                  AI Analyzing Food Composition & Spices...
                </span>
                <span className="text-xs text-slate-500">Estimating portion, saturated fats & glycemic index</span>
              </div>
            )}

            {/* Analysis Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    {selectedFood.country} Dish Detected
                  </span>
                  {selectedFood.localName && (
                    <span className="text-xs text-slate-400 font-medium">({selectedFood.localName})</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedFood.name}</h3>
                <span className="text-xs text-slate-500">Serving size: {selectedFood.portion}</span>
              </div>

              {/* Glycemic Index Rating Badge */}
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-[11px] text-slate-500">Glycemic Index (GI)</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md mt-0.5 ${
                  selectedFood.nutrients.glycemicIndex === 'Low'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : selectedFood.nutrients.glycemicIndex === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}>
                  {selectedFood.nutrients.glycemicIndex} GI Rating
                </span>
              </div>
            </div>

            {/* Macro Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Total Energy</span>
                <span className="text-2xl font-black text-slate-950 tabular-nums mt-0.5 block">
                  {selectedFood.nutrients.calories}
                </span>
                <span className="text-[10px] text-slate-400">kcal</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Carbohydrates</span>
                <span className="text-2xl font-black text-emerald-700 tabular-nums mt-0.5 block">
                  {selectedFood.nutrients.carbs}g
                </span>
                <span className="text-[10px] text-slate-400">Complex & Simple</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Protein</span>
                <span className="text-2xl font-black text-blue-700 tabular-nums mt-0.5 block">
                  {selectedFood.nutrients.protein}g
                </span>
                <span className="text-[10px] text-slate-400">Muscle recovery</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-medium block">Dietary Fat</span>
                <span className="text-2xl font-black text-amber-700 tabular-nums mt-0.5 block">
                  {selectedFood.nutrients.fat}g
                </span>
                <span className="text-[10px] text-slate-400">Oils & Coconut</span>
              </div>
            </div>

            {/* Sodium alert bar (crucial for ASEAN health context) */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">Sodium Content: {selectedFood.nutrients.sodium} mg</span>
                <span className="text-slate-500 block mt-0.5">
                  Daily WHO recommended limit is 2,000 mg. This dish represents {Math.round((selectedFood.nutrients.sodium / 2000) * 100)}% of daily intake.
                </span>
              </div>
            </div>

            {/* Healthier Swap Tip (Dietitian Approved) */}
            {selectedFood.nutrients.healthierSwapTip && (
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Dietitian Swap Tip:</span>
                </div>
                <p className="leading-relaxed text-emerald-900/90 pl-5">
                  {selectedFood.nutrients.healthierSwapTip}
                </p>
              </div>
            )}

            {/* Log to Diary Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-600">Assign to:</span>
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setMealCategory(cat)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                        mealCategory === cat
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogCurrentMeal}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Log Meal (+50 Pts)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Logged Meals Diary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-600" />
              <span>Today's Food Diary</span>
            </h3>
            <span className="text-xs text-slate-500">Logged meals and macro distribution</span>
          </div>
          <div className="text-right text-xs text-slate-500 tabular-nums">
            <span className="font-semibold text-slate-800">{loggedMeals.length} meals recorded</span>
          </div>
        </div>

        {loggedMeals.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No meals logged yet today. Use the scanner above to record your first meal!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {loggedMeals.map((meal) => (
              <div key={meal.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0">
                    {meal.mealType[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{meal.foodName}</span>
                      <span className="text-[11px] text-slate-400">· {meal.mealType} at {meal.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 tabular-nums mt-0.5">
                      <span>C: {meal.carbs}g</span>
                      <span>·</span>
                      <span>P: {meal.protein}g</span>
                      <span>·</span>
                      <span>F: {meal.fat}g</span>
                      <span>·</span>
                      <span>Na: {meal.sodium}mg</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {meal.calories} <span className="text-[10px] font-normal text-slate-500">kcal</span>
                  </span>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Remove entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
