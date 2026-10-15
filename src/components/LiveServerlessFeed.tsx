import React, { useEffect, useState } from 'react';
import { CloudRain, Sun, Activity, Dumbbell, ShieldAlert, CheckCircle2, RefreshCw, Radio, Wind, Sparkles, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
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

  const pm25Data = data?.sources.pm25.data;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 tracking-wide">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>LIVE SERVERLESS REAL-TIME DATA (/api/healthfitness_weightmgmt)</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            Live Singapore PM2.5 & Environmental Fitness Advisory
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time feed from data.gov.sg (1-hr PM2.5 + 2-hr Weather Forecast) and wger exercise database.
          </p>
        </div>

        <button
          onClick={fetchLiveServerlessData}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 min-h-[40px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Fetching Real-Time Feeds...' : 'Refresh Live API'}</span>
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
          {/* Main PM2.5 Outdoor Activity & Exercise Verdict Box */}
          <div className={`rounded-2xl p-6 text-white space-y-4 shadow-sm ${
            data.outdoorFitnessVerdict.isIdealTimeForOutdoor
              ? 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900'
              : 'bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                {data.outdoorFitnessVerdict.isIdealTimeForOutdoor ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
                )}
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                    Outdoor Activity Verdict · data.gov.sg PM2.5 Live
                  </span>
                  <h4 className="text-base sm:text-lg font-extrabold leading-tight text-white">
                    {data.outdoorFitnessVerdict.headline}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  data.outdoorFitnessVerdict.isIdealTimeForOutdoor
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/30'
                    : 'bg-amber-500/25 text-amber-300 border border-amber-400/30'
                }`}>
                  {data.outdoorFitnessVerdict.isIdealTimeForOutdoor ? '✓ Ideal for Outdoor Cardio' : '⚠️ Indoor Exercise Advised'}
                </span>
              </div>
            </div>

            {/* Advisory Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-bold text-emerald-300 block">
                  Actionable Advice for Athletes & Everyday Runners:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {data.outdoorFitnessVerdict.detailedAdvisory}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300">
                  <span className="font-semibold text-white">Recommended Venue:</span>
                  <span className="underline decoration-emerald-400">
                    {pm25Data?.advisory.recommendedVenue || data.outdoorFitnessVerdict.recommendedWorkoutMode}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-300 block">
                    National PM2.5 Average:
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-white tabular-nums">
                      {pm25Data?.nationalAverage ?? '--'}
                    </span>
                    <span className="text-xs text-slate-300">µg/m³</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Band: {pm25Data?.overallBand || 'Band 1'}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 text-[10px] text-slate-300">
                  Target Daily Hydration: <strong className="text-white">{data.outdoorFitnessVerdict.hydrationAdvisoryMl} ml</strong>
                </div>
              </div>
            </div>

            {/* Regional Sector Breakdown (North, South, East, West, Central) */}
            {pm25Data && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold">Singapore Regional 1-Hour PM2.5 Readings:</span>
                  <span className="text-[11px] text-slate-400 font-mono">Updated: {new Date(pm25Data.updatedTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} SGT</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {pm25Data.regionalDetails.map((reg) => (
                    <div
                      key={reg.region}
                      className={`p-3 rounded-xl border text-center space-y-1 ${
                        reg.value <= 55
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : reg.value <= 150
                          ? 'bg-amber-500/15 border-amber-500/30'
                          : 'bg-rose-500/20 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          {reg.region}
                        </span>
                      </div>
                      <div className="text-xl font-black text-white tabular-nums">
                        {reg.value} <span className="text-[10px] font-normal text-slate-300">µg/m³</span>
                      </div>
                      <span className={`text-[10px] font-semibold block ${
                        reg.value <= 55 ? 'text-emerald-300' : reg.value <= 150 ? 'text-amber-300' : 'text-rose-300'
                      }`}>
                        {reg.band.split(' ')[0]} ({reg.isIdealForOutdoor ? 'Ideal' : 'Caution'})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2-Hour Weather Forecast Strip (data.gov.sg/v2/real-time/api/two-hr-forecast) */}
          {data.sources.weather.data && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    data.gov.sg 2-Hour Sector Forecasts
                  </span>
                  <span className="text-[11px] text-slate-400">· Condition: {data.sources.weather.data.summaryCondition}</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">ActiveSG Training Hubs</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
                {data.sources.weather.data.forecasts.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                    <span className="font-bold text-slate-900 block truncate">{item.area}</span>
                    <span className="text-[11px] text-slate-500">{item.forecast}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live wger Exercise Feed */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-emerald-600" />
                  <span>wger Exercise Library ({data.sources.wger.count} exercises loaded)</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Targeted indoor resistance and mobility exercises when outdoor air quality requires indoor training
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
                Serverless endpoints active: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/api/health</code>, <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/api/healthfitness_weightmgmt</code>, <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/api/pm25</code>
              </span>
            </div>
            <div className="text-slate-500">
              Zero hardcoded keys · Configured via environment variables
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
