import React, { useState } from 'react';
import { Camera, Calendar, UserCheck, Watch, Gift, Sparkles, Layers, ShieldCheck, Flame, Award } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-20 lg:pb-0">
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
        setActiveTab={setActiveTab}
        points={points}
        streakDays={streakDays}
        onOpenBmcModal={() => setIsBmcModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero onNavigate={(tab) => setActiveTab(tab)} />

      {/* Main Workspace Tabs */}
      <main className="flex-1">
        {activeTab === 'tracker' && (
          <MealScanner onMealLogged={handleMealLogged} />
        )}

        {activeTab === 'weight-plan' && (
          <WeightPlanBuilder
            onPlanGenerated={() => {}}
            onNavigateToTrainers={() => setActiveTab('trainers')}
            onNavigateToLiveHub={() => setActiveTab('live-hub')}
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

      {/* Mobile Fixed Bottom Navigation (Pattern 1 from mobile touch app guidelines) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 items-center">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'tracker' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Scanner</span>
        </button>

        <button
          onClick={() => setActiveTab('weight-plan')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'weight-plan' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('trainers')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'trainers' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Coaches</span>
        </button>

        <button
          onClick={() => setActiveTab('devices')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'devices' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Watch className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">InBody</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'rewards' ? 'text-emerald-700 font-bold' : 'text-slate-500'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Rewards</span>
        </button>
      </nav>

      {/* Footer */}
      <Footer
        onOpenBmcModal={() => setIsBmcModalOpen(true)}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Interactive Business Model Canvas Modal */}
      <BmcModal
        isOpen={isBmcModalOpen}
        onClose={() => setIsBmcModalOpen(false)}
      />
    </div>
  );
}
