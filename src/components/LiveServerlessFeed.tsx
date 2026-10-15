import React, { useEffect, useState } from 'react';
import { CloudRain, Sun, Activity, Dumbbell, ShieldAlert, CheckCircle2, RefreshCw, Radio, Wind, Sparkles, ExternalLink } from 'lucide-react';
import { HealthFitnessWeightMgmtResponse, ExerciseItem } from '../../api/healthfitness_weightmgmt';

export const LiveServerlessFeed: React.FC = () => {
  const [data, setData] = useState<HealthFitnessWeightMgmtResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const fetchLiveServerlessData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/healthfitness_weightmgmt');
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const json: HealthFitnessWeightMgmtResponse = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch live serverless feed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveServerlessData();
  }, []);

  const categories = ['All', ...Array.from(new Set(data?.sources.wger.data.map(e => e.category) || []))];

  const filteredExercises = data?.sources.wger.data.filter(e =>
    activeCategoryFilter === 'All' || e.category === activeCategoryFilter
  ) || [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 tracking-wide">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>LIVE SERVERLESS CONNECTION (/api/healthfitness_weightmgmt)</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            Real-Time ASEAN Environmental & Exercise Data
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated live from data.gov.sg (2-Hr Weather & Air Quality) and wger exercise database.
          </p>
        </div>

        <button
          onClick={fetchLiveServerlessData}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 min-h-[40px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Fetching Live Feeds...' : 'Refresh Live API'}</span>
        </button>
      </div>

      {loading && !data && (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-500">Connecting to serverless API endpoints...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <span>Error loading live feed: {error}</span>
          <button onClick={fetchLiveServerlessData} className="font-bold underline ml-2">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {/* Weather & Air Quality Advisory Card (data.gov.sg) */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2.5">
                <Wind className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold">data.gov.sg Real-Time Weather & Air Advisory</h4>
                  <span className="text-[11px] text-slate-400">
                    Source: api-open.data.gov.sg/v2/real-time/api/two-hr-forecast
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                  data.sources.weatherAndAir.data?.outdoorWorkoutAdvisory.status === 'Optimal'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  Condition: {data.sources.weatherAndAir.data?.summaryCondition}
                </span>
              </div>
            </div>

            {/* Recommendation & Hydration banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2 p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-emerald-400 font-bold block">
                  Outdoor Workout Recommendation:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {data.sources.weatherAndAir.data?.outdoorWorkoutAdvisory.recommendation}
                </p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Activity match: {data.weightManagementInsights.recommendedActivityType} · {data.weightManagementInsights.climateNote}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[11px] text-blue-300 font-bold block">
                  Target Daily Hydration:
                </span>
                <span className="text-2xl font-black text-white tabular-nums">
                  {data.weightManagementInsights.hydrationAdvisoryMl} ml
                </span>
                <span className="text-[10px] text-slate-400 block">Based on humidity & thermal index</span>
              </div>
            </div>

            {/* Regional Sector Mini Grid */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Regional Sector Forecasts ({data.sources.weatherAndAir.data?.forecasts.length || 0} locations):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {data.sources.weatherAndAir.data?.forecasts.slice(0, 12).map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-black/20 text-[11px] border border-white/5">
                    <span className="font-semibold block text-white truncate">{item.area}</span>
                    <span className="text-slate-300 text-[10px]">{item.forecast}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live wger Exercise Feed */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-emerald-600" />
                  <span>wger Exercise Library (Live API: {data.sources.wger.count} exercises loaded)</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Targeted movements for muscle preservation during weight deficit
                </p>
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {categories.slice(0, 5).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      activeCategoryFilter === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercises Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.slice(0, 6).map(exercise => (
                <div
                  key={exercise.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-sm font-bold text-slate-900 leading-snug">
                      {exercise.name !== 'Unnamed Exercise' ? exercise.name : `${exercise.category} Movement #${exercise.id}`}
                    </h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                      {exercise.category}
                    </span>
                  </div>

                  {exercise.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {exercise.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    {exercise.muscles.length > 0 && (
                      <span>Muscles: {exercise.muscles.join(', ')}</span>
                    )}
                    {exercise.equipment.length > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Equip: {exercise.equipment.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuration status banner */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Serverless endpoints active at <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/api/health</code> & <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/api/healthfitness_weightmgmt</code>
              </span>
            </div>
            <div className="text-slate-500">
              API Keys: {data.keysConfigured.wger ? 'wger configured' : 'wger public mode'} · {data.keysConfigured.dataGovSg ? 'data.gov.sg key configured' : 'data.gov.sg open access'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
