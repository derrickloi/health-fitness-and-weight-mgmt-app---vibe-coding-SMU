import React, { useState } from 'react';
import { Flame, Award, Layers, Menu, X, Smartphone, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  points: number;
  streakDays: number;
  onOpenBmcModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  points,
  streakDays,
  onOpenBmcModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'tracker', label: 'AI Calorie & Meal Scanner' },
    { id: 'weight-plan', label: 'Weight Management Plan' },
    { id: 'trainers', label: 'Trainers & Dietitians' },
    { id: 'devices', label: 'Device & InBody Sync' },
    { id: 'rewards', label: 'Rewards & Events' },
    { id: 'pricing', label: 'Plans & Pricing' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('tracker')}
              className="flex items-center gap-2 text-left group"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                N
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                  NadiFit ASEAN
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Health & Weight Management
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 text-sm whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === item.id
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action & utility chips */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Gamification Streak & Points */}
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 font-medium border border-orange-100">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="tabular-nums font-semibold">{streakDays}</span>
                <span>Day Streak</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-medium border border-emerald-100">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="tabular-nums font-semibold">{points}</span>
                <span>Points</span>
              </div>
            </div>

            {/* Business Model Canvas Artifact button */}
            <button
              onClick={onOpenBmcModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="View Business Model Canvas Strategy"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">BMC Strategy</span>
              <span className="md:hidden">BMC</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 min-h-[40px] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Free</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-orange-600 font-medium">
                <Flame className="w-4 h-4 fill-orange-500" /> {streakDays}d Streak
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <Award className="w-4 h-4" /> {points} HealthPoints
              </span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBmcModal();
              }}
              className="text-xs text-slate-600 underline font-medium"
            >
              View Canvas
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
