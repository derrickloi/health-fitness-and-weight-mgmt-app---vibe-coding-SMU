import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Dumbbell, 
  MapPin, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  X, 
  Clock, 
  Layers, 
  Droplets, 
  Wind, 
  Info,
  CalendarPlus,
  Compass
} from 'lucide-react';
import { HealthFitnessWeightMgmtResponse, ExerciseItem, AreaForecast } from '../../api/healthfitness_weightmgmt';

interface LiveExerciseWeatherHubProps {
  onAddExerciseToPlan?: (exerciseName: string) => void;
}

export const LiveExerciseWeatherHub: React.FC<LiveExerciseWeatherHubProps> = ({ onAddExerciseToPlan }) => {
  const [data, setData] = useState<HealthFitnessWeightMgmtResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [areaSearch, setAreaSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('All');
  const [exerciseSearch, setExerciseSearch] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchLiveFeeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/healthfitness_weightmgmt');
      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }
      const json: HealthFitnessWeightMgmtResponse = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err?.message || 'Failed to connect to live API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveFeeds();
  }, []);

  const weather = data?.sources.weather.data;
  const exercises = data?.sources.wger.data || [];

  // Extract unique equipment and categories from live wger data
  const availableCategories = ['All', ...Array.from(new Set(exercises.map(e => e.category).filter(Boolean)))];
  const allEquipment = exercises.flatMap(e => e.equipment);
  const availableEquipment = ['All', ...Array.from(new Set(allEquipment.filter(Boolean)))];

  // Filter exercises
  const filteredExercises = exercises.filter(ex => {
    const matchCat = categoryFilter === 'All' || ex.category === categoryFilter;
    const matchEquip = equipmentFilter === 'All' || ex.equipment.includes(equipmentFilter);
    const matchSearch = ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(exerciseSearch.toLowerCase())) ||
      ex.category.toLowerCase().includes(exerciseSearch.toLowerCase());
    return matchCat && matchEquip && matchSearch;
  });

  // Filter regional weather forecasts
  const filteredForecasts = (weather?.forecasts || []).filter(f =>
    f.area.toLowerCase().includes(areaSearch.toLowerCase()) ||
    f.forecast.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const handleAddExercise = (ex: ExerciseItem) => {
    if (onAddExerciseToPlan) {
      onAddExerciseToPlan(ex.name);
    }
    setToastMessage(`Added "${ex.name}" to your Weight Management Plan!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-emerald-500/30 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
            <span>LIVE API INTEGRATION</span>
            <span aria-hidden="true">·</span>
            <span>DATA.GOV.SG & WGER REAL-TIME SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Live Singapore Weather & wger Exercise Hub
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Directly connected to <span className="font-semibold text-slate-800">data.gov.sg/real-time (2-Hour Forecast)</span> for outdoor exercise safety and the <span className="font-semibold text-slate-800">wger Open Fitness API</span> for verified movement biomechanics.
          </p>
        </div>

        <button
          onClick={fetchLiveFeeds}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 min-h-[44px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Refreshing Live Data...' : 'Refresh Live Feeds'}</span>
        </button>
      </div>

      {loading && !data && (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-white rounded-3xl border border-slate-200">
          <div className="w-9 h-9 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-700">Connecting to wger and data.gov.sg...</p>
          <p className="text-xs text-slate-400">Loading 20 exercises and Singapore 2-hr forecasts</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <span>Failed to load live data: {error}</span>
          <button onClick={fetchLiveFeeds} className="font-bold underline ml-2">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-8">
          {/* Section 1: data.gov.sg Real-Time 2-Hour Weather & Air Advisory */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CloudSun className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Singapore 2-Hour Weather & Environmental Advisory
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      Live data.gov.sg
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Endpoint: <code className="font-mono text-[11px] text-slate-700">api-open.data.gov.sg/v2/real-time/api/two-hr-forecast</code>
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-500">Valid:</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono">
                  {(weather?.validPeriod as any)?.text || 'Next 2 Hours'}
                </span>
              </div>
            </div>

            {/* Advisory Highlight Strip */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    Outdoor Activity Recommendation
                  </span>
                </div>
                <span className="text-xs text-slate-300">
                  Overall Status: <strong className="text-white">{weather?.summaryCondition || 'Fair'}</strong>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {weather?.outdoorWorkoutAdvisory.recommendation}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-400">
                <span>Recommended: {data.outdoorFitnessVerdict.recommendedWorkoutMode}</span>
                <span aria-hidden="true">·</span>
                <span>Hydration Advisory: {data.outdoorFitnessVerdict.hydrationAdvisoryMl} ml</span>
                <span aria-hidden="true">·</span>
                <span>ActiveSG Indoor Alternative: Available islandwide</span>
              </div>
            </div>

            {/* Regional Weather Grid with Search */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700">
                  Regional Neighborhood Forecasts ({filteredForecasts.length} areas in Singapore):
                </span>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search area (e.g. Kallang, Bishan, Marina)..."
                    value={areaSearch}
                    onChange={(e) => setAreaSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto p-1">
                {filteredForecasts.map((item, idx) => {
                  const isRain = /rain|shower|thunder/i.test(item.forecast);
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-xs transition-all ${
                        isRain
                          ? 'border-blue-200 bg-blue-50/70 text-blue-950 font-medium'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-slate-900 truncate block text-[11px]">{item.area}</span>
                      </div>
                      <span className={`text-[11px] font-bold block ${isRain ? 'text-blue-700' : 'text-slate-600'}`}>
                        {item.forecast}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 2: wger Open Fitness Exercise Database */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      wger Certified Exercise Library ({exercises.length} Exercises Loaded)
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Live wger API
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Endpoint: <code className="font-mono text-[11px] text-slate-700">wger.de/api/v2/exerciseinfo/?language=2&limit=20</code>
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredExercises.length} of {exercises.length} exercises
              </span>
            </div>

            {/* Filters Toolbar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search exercise name or targeted muscle..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
                >
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Body Regions' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Equipment Filter */}
              <div className="md:col-span-4">
                <select
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium"
                >
                  {availableEquipment.map(eq => (
                    <option key={eq} value={eq}>
                      {eq === 'All' ? 'All Equipment (Barbell, Dumbbell, etc.)' : eq}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exercise Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                        {exercise.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                        {exercise.category}
                      </span>
                    </div>

                    {exercise.description && (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {exercise.description}
                      </p>
                    )}

                    {/* Muscle Groups */}
                    <div className="pt-1 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                        Target Muscles:
                      </span>
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-700">
                        {exercise.muscles.length > 0 ? (
                          exercise.muscles.map(m => (
                            <span key={m} className="px-2 py-0.5 rounded bg-slate-200/60 font-medium">
                              {m}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400">Core / Compound</span>
                        )}
                      </div>
                    </div>

                    {/* Equipment */}
                    <div className="pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-0.5">
                        Required Equipment:
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {exercise.equipment.length > 0 ? exercise.equipment.join(', ') : 'Bodyweight only'}
                      </span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedExercise(exercise)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors min-h-[36px]"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleAddExercise(exercise)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors min-h-[36px]"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Add to Plan</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedExercise(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-8">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                wger Exercise Specification
              </span>
              <h3 className="text-xl font-black text-slate-900">{selectedExercise.name}</h3>
              <span className="text-xs text-slate-500 block">
                Category: {selectedExercise.category} · ID: #{selectedExercise.id}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Execution & Form Guidance:</span>
                <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-slate-600">
                  {selectedExercise.description || 'Perform with controlled tempo. Focus on eccentric muscle contraction and steady breathing.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block">Target Muscles:</span>
                  <span className="text-xs font-semibold text-slate-800 mt-1 block">
                    {selectedExercise.muscles.length > 0 ? selectedExercise.muscles.join(', ') : 'Compound Full Body'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 block">Equipment Needed:</span>
                  <span className="text-xs font-semibold text-slate-800 mt-1 block">
                    {selectedExercise.equipment.length > 0 ? selectedExercise.equipment.join(', ') : 'None (Bodyweight)'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px]">
                <strong className="block text-emerald-900 font-bold">Weight Loss Benefit:</strong>
                Helps preserve metabolically active skeletal muscle mass (SMM) during a caloric deficit, optimizing InBody body fat reduction.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedExercise(null)}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs min-h-[44px]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAddExercise(selectedExercise);
                  setSelectedExercise(null);
                }}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Add to Workout Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
