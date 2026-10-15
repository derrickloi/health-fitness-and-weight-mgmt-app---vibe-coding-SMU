import React from 'react';
import { Camera, Calendar, UserCheck, Activity, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onNavigate: (tabId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Top announcement banner */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-6">
          <span className="font-semibold text-emerald-800">ASEAN Health Initiative</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Health365 & ActiveSG Compatible</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Designed for Regional Hawker & Home Diets</span>
        </div>

        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Column 1: Copy and Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Personalized ASEAN Health, Fitness & Weight Management
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Achieve sustainable weight goals without giving up your favorite hawker food. Snap meal photos for instant ASEAN calorie breakdown, sync Apple Watch & InBody biometrics, and book certified regional dietitians and fitness coaches.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('tracker')}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] min-h-[44px]"
              >
                <Camera className="w-4 h-4" />
                <span>Snap Food Calorie Scan</span>
              </button>

              <button
                onClick={() => onNavigate('weight-plan')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all hover:translate-y-[-1px] min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Generate Weight Plan</span>
              </button>

              <button
                onClick={() => onNavigate('trainers')}
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Find Coach</span>
              </button>
            </div>

            {/* Trust markers */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Accredited Clinical Dietitians & Trainers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Duolingo-style Daily Habit Streaks</span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Live Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-slate-900">Today's ASEAN Health Snapshot</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Sync: ActiveSG & InBody</span>
              </div>

              {/* Meal preview mini-box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Latest AI Meal Scan</span>
                  <span className="text-[11px] text-emerald-700 font-medium">98% Confidence</span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hainanese Chicken Rice (Steamed)</h4>
                    <p className="text-xs text-slate-500">High Protein · HPB Swap: Breast meat, less sauce</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-slate-900 tabular-nums">610</span>
                    <span className="text-xs text-slate-500 block">kcal</span>
                  </div>
                </div>
                {/* Micro macro bar */}
                <div className="w-full bg-slate-200 rounded-full h-1.5 flex overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[45%]" title="Carbs 45%"></div>
                  <div className="bg-blue-500 h-full w-[35%]" title="Protein 35%"></div>
                  <div className="bg-amber-500 h-full w-[20%]" title="Fat 20%"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 tabular-nums">
                  <span>Carbs: 48g</span>
                  <span>Protein: 30g</span>
                  <span>Fat: 22g</span>
                </div>
              </div>

              {/* Progress rings & streak */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[11px] text-emerald-800 font-medium block">Daily Steps (ActiveSG)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-emerald-950 tabular-nums">7,840</span>
                    <span className="text-xs text-slate-500">/ 10k</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[78%] rounded-full"></div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100">
                  <span className="text-[11px] text-orange-800 font-medium block">InBody Body Fat %</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-extrabold text-orange-950 tabular-nums">22.4%</span>
                    <span className="text-xs text-emerald-600 font-semibold">-1.2% this mo</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-2">Target: 19.5% by Wk 12</span>
                </div>
              </div>

              {/* Interactive Coach highlight banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-xs font-bold text-white">
                    NH
                  </div>
                  <div>
                    <span className="text-xs font-semibold block text-slate-100">Consultation with Nurul Huda (APD)</span>
                    <span className="text-[11px] text-slate-400">Pre-Diabetes Diet Plan · Fri 2:00 PM</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('trainers')}
                  className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rule 13: 4-Column KPI / Trust Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">1,400+</span>
            <h4 className="text-xs font-semibold text-slate-700 mt-1">ASEAN Hawker Foods</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Laksa, Pho, Nasi Lemak, Hainan Rice & more</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">100%</span>
            <h4 className="text-xs font-semibold text-slate-700 mt-1">Verified Specialists</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">ACE, NSCA, APD Dietitians & Hyrox Coaches</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">6+</span>
            <h4 className="text-xs font-semibold text-slate-700 mt-1">Connected Systems</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Health365, ActiveSG, InBody 270, Apple Watch</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">$10 / $100</span>
            <h4 className="text-xs font-semibold text-slate-700 mt-1">Freemium to Pro</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Basic self-serve or 1-on-1 personalized coaching</p>
          </div>
        </div>
      </div>
    </div>
  );
};
