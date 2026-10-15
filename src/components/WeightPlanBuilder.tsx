import React, { useState } from 'react';
import { Calendar, Target, CheckCircle2, Download, Clock, Dumbbell, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { WeightPlan } from '../types';

interface WeightPlanBuilderProps {
  onPlanGenerated: (plan: WeightPlan) => void;
  onNavigateToTrainers: () => void;
  onNavigateToLiveHub?: () => void;
}

export const WeightPlanBuilder: React.FC<WeightPlanBuilderProps> = ({
  onPlanGenerated,
  onNavigateToTrainers,
  onNavigateToLiveHub
}) => {
  const [currentWeight, setCurrentWeight] = useState<number>(76.5);
  const [targetWeight, setTargetWeight] = useState<number>(68.0);
  const [heightCm, setHeightCm] = useState<number>(172);
  const [age, setAge] = useState<number>(34);
  const [durationWeeks, setDurationWeeks] = useState<number>(12);
  const [focusArea, setFocusArea] = useState<WeightPlan['primaryGoal']>('Fat Loss');
  const [activeTab, setActiveTab] = useState<'schedule' | 'milestones' | 'nutrition'>('schedule');
  const [calendarExported, setCalendarExported] = useState(false);

  // Compute BMI
  const heightM = heightCm / 100;
  const currentBmi = (currentWeight / (heightM * heightM)).toFixed(1);
  const targetBmi = (targetWeight / (heightM * heightM)).toFixed(1);
  const weightToLose = (currentWeight - targetWeight).toFixed(1);
  const weeklyLoss = (parseFloat(weightToLose) / durationWeeks).toFixed(2);

  // Calculate customized calorie target
  // Standard BMR approx + deficit
  const estimatedBMR = 10 * currentWeight + 6.25 * heightCm - 5 * age + 5;
  const maintenanceTDEE = Math.round(estimatedBMR * 1.35);
  const dailyDeficit = 480;
  const dailyCalorieTarget = maintenanceTDEE - dailyDeficit;

  const weeklySchedule = [
    {
      day: 'Monday',
      activity: focusArea === 'Hyrox Athletic Prep'
        ? 'Hyrox Erg Conditioning (SkiErg + Rower intervals)'
        : focusArea === 'Diabetes Management'
        ? 'Post-Dinner 30min Low-Glycemic Walk & Core'
        : 'Full-Body Resistance & Posture Strength',
      durationMins: 45,
      caloriesBurnEstimate: 360,
      intensity: 'Moderate' as const
    },
    {
      day: 'Tuesday',
      activity: 'ActiveSG Swimming or Zone 2 Brisk Walking (Health365)',
      durationMins: 40,
      caloriesBurnEstimate: 280,
      intensity: 'Low' as const
    },
    {
      day: 'Wednesday',
      activity: focusArea === 'Hyrox Athletic Prep'
        ? 'Sled Push & Weighted Wall Balls Circuit'
        : 'Lower Body Strength & Joint Mobility',
      durationMins: 50,
      caloriesBurnEstimate: 420,
      intensity: 'High' as const
    },
    {
      day: 'Thursday',
      activity: 'Restorative Yoga & Foam Rolling Recovery',
      durationMins: 30,
      caloriesBurnEstimate: 120,
      intensity: 'Low' as const
    },
    {
      day: 'Friday',
      activity: focusArea === 'Diabetes Management'
        ? 'Metabolic Resistance Circuit (Insulin sensitivity)'
        : 'Upper Body & Core Hypertrophy',
      durationMins: 45,
      caloriesBurnEstimate: 340,
      intensity: 'Moderate' as const
    },
    {
      day: 'Saturday',
      activity: 'Community Parkrun or 8km Outdoor Trail (MacRitchie / Putrajaya)',
      durationMins: 60,
      caloriesBurnEstimate: 510,
      intensity: 'Moderate' as const
    },
    {
      day: 'Sunday',
      activity: 'Active Recovery & Weekly Meal Prep for Hawker Alternatives',
      durationMins: 30,
      caloriesBurnEstimate: 110,
      intensity: 'Low' as const
    }
  ];

  const milestones = [
    {
      week: 1,
      expectedWeight: currentWeight,
      action: 'Baseline InBody 270 scan at partner studio + Initial dietary audit'
    },
    {
      week: 4,
      expectedWeight: +(currentWeight - parseFloat(weeklyLoss) * 4).toFixed(1),
      action: 'First InBody checkpoint: check visceral fat drop & preserve skeletal muscle'
    },
    {
      week: 8,
      expectedWeight: +(currentWeight - parseFloat(weeklyLoss) * 8).toFixed(1),
      action: 'Dietitian review: adjust carbohydrate re-feeds and assess glycemic markers'
    },
    {
      week: 12,
      expectedWeight: targetWeight,
      action: 'Goal graduation scan, body fat % confirmation, and sustainable maintenance protocol'
    }
  ];

  const handleExportCalendar = () => {
    // Generate .ics calendar format
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Shizen ASEAN//Weight Management//EN\nSUMMARY:Shizen ${focusArea} 12-Week Program\nDESCRIPTION:Personalized ASEAN Health & Weight Management Plan. Target Weight: ${targetWeight}kg.\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Shizen_${focusArea.replace(/\s+/g, '_')}_Plan.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarExported(true);
    setTimeout(() => setCalendarExported(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
          <span>VALUE PROPOSITION #2</span>
          <span aria-hidden="true">·</span>
          <span>END-TO-END PROGRAMMING</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          End-to-End Weight Management Plan
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Based on your biological metrics, medical focus, and ASEAN lifestyle, we engineer your complete daily calorie targets, weekly workouts, InBody milestones, and calendar sync.
        </p>
      </div>

      {/* Main 2-Column Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <span>Your Profile & Goals</span>
          </h3>

          {/* Primary Goal Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Primary Focus / Health Condition (BMC Segments)
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'Fat Loss', label: 'Sustainable Fat Loss (General 18-70yo)' },
                { id: 'Diabetes Management', label: 'Pre-Diabetes & Blood Sugar Control' },
                { id: 'Hyrox Athletic Prep', label: 'Hyrox Endurance & Strength Conditioning' },
                { id: 'Postpartum Wellness', label: 'Postnatal Safe Core & Weight Reset' },
                { id: 'Active Ageing', label: 'Active Ageing & Joint Longevity (50-70yo)' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFocusArea(item.id as WeightPlan['primaryGoal'])}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    focusArea === item.id
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weight Inputs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Current Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                min="40"
                max="180"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">BMI: {currentBmi}</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                min="35"
                max="160"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <span className="text-[11px] text-emerald-700 font-medium mt-1 block">BMI: {targetBmi}</span>
            </div>
          </div>

          {/* Height and Age */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Age</label>
              <input
                type="number"
                min="18"
                max="75"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>
          </div>

          {/* Timeline slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Program Duration</span>
              <span className="text-emerald-700 font-bold tabular-nums">{durationWeeks} Weeks</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="2"
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>4 Weeks</span>
              <span>12 Weeks (Recommended)</span>
              <span>24 Weeks</span>
            </div>
          </div>

          {/* Computed summary badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Total Weight Reduction:</span>
              <span className="text-emerald-700 tabular-nums">{weightToLose} kg</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Healthy Safe Pace:</span>
              <span className="tabular-nums">~{weeklyLoss} kg / week</span>
            </div>
          </div>
        </div>

        {/* Right Area: Computed Plan & Interactive Schedule */}
        <div className="lg:col-span-7 space-y-6">
          {/* Target Nutrition & Activity Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium block">Daily Calorie Target</span>
              <span className="text-2xl font-black text-slate-900 tabular-nums mt-0.5 block">
                {dailyCalorieTarget}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">-{dailyDeficit} kcal safe deficit</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium block">Daily Step Goal</span>
              <span className="text-2xl font-black text-emerald-700 tabular-nums mt-0.5 block">
                10,000
              </span>
              <span className="text-[10px] text-slate-400">Health365 sync</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium block">Hydration Target</span>
              <span className="text-2xl font-black text-blue-700 tabular-nums mt-0.5 block">
                2.5L
              </span>
              <span className="text-[10px] text-slate-400">ASEAN climate</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] text-slate-500 font-medium block">InBody Milestones</span>
              <span className="text-2xl font-black text-slate-900 tabular-nums mt-0.5 block">
                4 Scans
              </span>
              <span className="text-[10px] text-slate-400">Body fat & muscle</span>
            </div>
          </div>

          {/* Schedule / Milestones Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === 'schedule'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Weekly Workout Regimen
                  </button>
                  <button
                    onClick={() => setActiveTab('milestones')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      activeTab === 'milestones'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    InBody Checkpoints
                  </button>
                </div>
              </div>

              {/* Calendar Integration CTA */}
              <button
                onClick={handleExportCalendar}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
                title="Sync schedule with Apple / Google Calendar"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{calendarExported ? 'Calendar (.ics) Downloaded!' : 'Sync to Calendar'}</span>
              </button>
            </div>

            {/* Tab 1: Weekly Workout Regimen */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                {/* Live environmental check banner */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="text-xs text-blue-950">
                    <span className="font-bold block">Live 2-Hr Singapore Weather & wger Movement Sync:</span>
                    <span className="text-blue-800 text-[11px]">
                      Before training outdoors, check real-time rain forecasts across 47 planning areas and browse 20 wger exercises.
                    </span>
                  </div>
                  {onNavigateToLiveHub && (
                    <button
                      onClick={onNavigateToLiveHub}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs whitespace-nowrap shadow-xs transition-colors shrink-0"
                    >
                      View Live Hub
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100">
                  {weeklySchedule.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-start justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{item.day}</span>
                          <span className="text-[11px] text-slate-400">·</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            item.intensity === 'High'
                              ? 'bg-rose-50 text-rose-700'
                              : item.intensity === 'Moderate'
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-blue-50 text-blue-800'
                          }`}>
                            {item.intensity} Intensity
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{item.activity}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          {item.durationMins} min
                        </span>
                        <span className="text-[11px] text-slate-400 block tabular-nums">
                          ~{item.caloriesBurnEstimate} kcal
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: InBody Milestones */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Scheduled biometric scans at our partner clinics and ActiveSG centers to prevent muscle loss and track visceral fat grade.
                </p>
                <div className="relative border-l border-emerald-500/30 ml-3 pl-5 space-y-6">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="relative space-y-1">
                      <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-100"></div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Week {m.week}</span>
                        <span className="text-xs text-emerald-700 font-semibold tabular-nums">
                          Target: {m.expectedWeight} kg
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{m.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Need Trainer CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Want 1-on-1 Certified Guidance?</span>
                <span className="text-[11px] text-slate-500">
                  Book an APD Dietitian or NSCA Trainer to supervise your weekly plan progress.
                </span>
              </div>
              <button
                onClick={onNavigateToTrainers}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs whitespace-nowrap shadow-xs flex items-center gap-1.5"
              >
                <span>Find Coach</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
