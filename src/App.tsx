import React, { useState } from 'react';
import { Camera, Calendar, UserCheck, Watch, Gift, Sparkles, Layers, ShieldCheck, Flame, Award, CloudSun, Compass, Eye, EyeOff } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealScanner } from './components/MealScanner';
import { WeightPlanBuilder } from './components/WeightPlanBuilder';
import { TrainerDirectory } from './components/TrainerDirectory';
import { DeviceSyncHub } from './components/DeviceSyncHub';
import { RewardsStore } from './components/RewardsStore';
import { PricingTiers } from './components/PricingTiers';
import { LiveExerciseWeatherHub } from './components/LiveExerciseWeatherHub';
import { BmcModal } from './components/BmcModal';
import { Footer } from './components/Footer';
import { Trainer, RewardItem, WeightPlan } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tracker');
  const [points, setPoints] = useState<number>(750);
  const [streakDays, setStreakDays] = useState<number>(14);
  const [isBmcModalOpen, setIsBmcModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showHero, setShowHero] = useState<boolean>(true);

  const tabs = [
    { id: 'tracker', label: 'AI Meal Scanner', icon: Camera, badge: 'AI Vision' },
    { id: 'weight-plan', label: 'Weight Plan', icon: Calendar, badge: '12-Wk' },
    { id: 'live-hub', label: 'Live Weather & wger', icon: CloudSun, badge: 'Live API' },
    { id: 'trainers', label: 'Trainers & Dietitians', icon: UserCheck, badge: '100% APD' },
    { id: 'devices', label: 'Device & InBody', icon: Watch, badge: 'InBody' },
    { id: 'rewards', label: 'Rewards & Events', icon: Gift, badge: 'Points' },
    { id: 'pricing', label: 'Plans & Pricing', icon: Sparkles, badge: '$10/$100' }
  ];

  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    // Smooth scroll down to workspace
    setTimeout(() => {
      const el = document.getElementById('workspace-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  };

  const handleMealLogged = (pointsEarned: number) => {
    setPoints(prev => prev + pointsEarned);
    showNotification(`+${pointsEarned} HealthPoints added! Daily streak protected.`);
  };

  const handleStreakBoost = () => {
    setPoints(prev => prev + 25);
    showNotification('+25 HealthPoints earned for device synchronization!');
  };

  const handleRedeemReward = (reward: RewardItem) => {
    setPoints(prev => Math.max(0, prev - reward.pointsCost));
    showNotification(`Voucher for ${reward.partnerName} redeemed!`);
  };

  const handleSessionBooked = (trainer: Trainer, slot: string) => {
    setPoints(prev => prev + 100);
    showNotification(`Booked consultation with ${trainer.name} on ${slot}. +100 Points!`);
  };

  const handleSelectTier = (tierName: string) => {
    showNotification(`Welcome to the ${tierName}! Enjoy your ASEAN wellness perks.`);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-24 lg:pb-0">
      {/* Dynamic Global Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-emerald-500/30 text-xs font-semibold animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabSelect}
        points={points}
        streakDays={streakDays}
        onOpenBmcModal={() => setIsBmcModalOpen(true)}
      />

      {/* Hero Section with toggle */}
      {showHero && (
        <div className="relative">
          <Hero onNavigate={handleTabSelect} />
          <button
            type="button"
            onClick={() => setShowHero(false)}
            className="hidden lg:flex absolute bottom-3 right-6 z-10 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white text-[11px] font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            title="Collapse Hero Banner"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Collapse Intro Banner</span>
          </button>
        </div>
      )}

      {!showHero && (
        <div className="bg-slate-900 text-white py-2 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300">
            NadiFit ASEAN · <strong className="text-white">Active Tab: {tabs.find(t => t.id === activeTab)?.label}</strong>
          </span>
          <button
            type="button"
            onClick={() => setShowHero(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors cursor-pointer"
          >
            <Eye className="w-3 h-3 text-emerald-400" />
            <span>Expand Intro Banner</span>
          </button>
        </div>
      )}

      {/* Prominent Sticky Workspace Tab Switcher Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabSelect(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer min-h-[40px] shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Workspace Tabs Container */}
      <main id="workspace-view" className="flex-1 scroll-mt-32">
        {activeTab === 'tracker' && (
          <MealScanner onMealLogged={handleMealLogged} />
        )}

        {activeTab === 'weight-plan' && (
          <WeightPlanBuilder
            onPlanGenerated={() => {}}
            onNavigateToTrainers={() => handleTabSelect('trainers')}
            onNavigateToLiveHub={() => handleTabSelect('live-hub')}
          />
        )}

        {activeTab === 'live-hub' && (
          <LiveExerciseWeatherHub
            onAddExerciseToPlan={(exerciseName) => {
              showNotification(`"${exerciseName}" added to daily routine!`);
            }}
          />
        )}

        {activeTab === 'trainers' && (
          <TrainerDirectory onSessionBooked={handleSessionBooked} />
        )}

        {activeTab === 'devices' && (
          <DeviceSyncHub onStreakBoost={handleStreakBoost} />
        )}

        {activeTab === 'rewards' && (
          <RewardsStore points={points} onRedeemReward={handleRedeemReward} />
        )}

        {activeTab === 'pricing' && (
          <PricingTiers onSelectTier={handleSelectTier} />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabSelect(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[44px] px-2 py-1 transition-colors shrink-0 cursor-pointer ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <Footer
        onOpenBmcModal={() => setIsBmcModalOpen(true)}
        onNavigate={handleTabSelect}
      />

      {/* Interactive Business Model Canvas Modal */}
      <BmcModal
        isOpen={isBmcModalOpen}
        onClose={() => setIsBmcModalOpen(false)}
      />
    </div>
  );
}
