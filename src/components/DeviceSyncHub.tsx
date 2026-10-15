import React, { useState } from 'react';
import { Watch, Scale, Shield, Activity, RefreshCw, Flame, CheckCircle, Droplet, Heart, Check, Plus, AlertCircle } from 'lucide-react';
import { ConnectedDevice, BiometricSummary } from '../types';
import { CONNECTED_DEVICES, INITIAL_BIOMETRICS } from '../data/mockData';

interface DeviceSyncHubProps {
  onStreakBoost: () => void;
}

export const DeviceSyncHub: React.FC<DeviceSyncHubProps> = ({ onStreakBoost }) => {
  const [devices, setDevices] = useState<ConnectedDevice[]>(CONNECTED_DEVICES);
  const [biometrics, setBiometrics] = useState<BiometricSummary>(INITIAL_BIOMETRICS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedRecently, setSyncedRecently] = useState(false);

  // Daily Habit Quests (Duolingo Style Streak)
  const [dailyHabits, setDailyHabits] = useState([
    { id: 'h1', title: 'National Steps Challenge: Hit 8,000+ steps', completed: false, pts: 30 },
    { id: 'h2', title: 'Snap & log at least 2 ASEAN meals', completed: true, pts: 50 },
    { id: 'h3', title: 'Hydration Target: Drink 2,000ml water', completed: false, pts: 20 },
    { id: 'h4', title: 'InBody / Smart Scale morning weigh-in', completed: true, pts: 40 }
  ]);

  const toggleHabit = (id: string) => {
    setDailyHabits(dailyHabits.map(h => {
      if (h.id === id) {
        return { ...h, completed: !h.completed };
      }
      return h;
    }));
  };

  const handleSyncAllDevices = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedRecently(true);
      // Simulate increment
      setBiometrics(prev => ({
        ...prev,
        todaySteps: Math.min(prev.stepGoal, prev.todaySteps + 640),
        activeCalories: prev.activeCalories + 45,
        waterIntakeMl: Math.min(prev.waterGoalMl, prev.waterIntakeMl + 250)
      }));
      onStreakBoost();
      setTimeout(() => setSyncedRecently(false), 3000);
    }, 1200);
  };

  const toggleDeviceConnection = (id: string) => {
    setDevices(devices.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === 'connected' ? 'disconnected' : 'connected';
        return {
          ...d,
          status: nextStatus,
          lastSync: nextStatus === 'connected' ? 'Just now' : d.lastSync
        };
      }
      return d;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
            <span>KEY ACTIVITIES & PARTNERS</span>
            <span aria-hidden="true">·</span>
            <span>CROSS-COMPATIBLE ECOSYSTEM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Device & InBody Sync Hub
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Live integration with Apple Watch, Garmin, InBody clinical body composition scanners, and national initiatives like Singapore ActiveSG and Health365.
          </p>
        </div>

        <button
          onClick={handleSyncAllDevices}
          disabled={isSyncing}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 min-h-[44px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Trackers & InBody...' : syncedRecently ? 'Synced Successfully!' : 'Sync All Devices'}</span>
        </button>
      </div>

      {/* Duolingo Streak Motivation Banner (BMC Customer Relationship: Duolingo streak) */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-6 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Flame className="w-8 h-8 text-yellow-300 fill-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tabular-nums">{biometrics.streakDays} Day Healthy Streak!</span>
                <span className="text-xs bg-white/25 px-2 py-0.5 rounded font-bold">Level 4 Habit Master</span>
              </div>
              <p className="text-xs text-orange-100 mt-0.5 max-w-lg">
                Complete your daily ASEAN health tasks today to safeguard your streak and accumulate HealthPoints for partner discounts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-lg">
              Streak Freeze Equipped 🛡️
            </span>
          </div>
        </div>

        {/* Daily Habit Checklist */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {dailyHabits.map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-3 rounded-xl text-left text-xs transition-all flex items-start gap-2.5 min-h-[52px] ${
                habit.completed
                  ? 'bg-white/20 text-white font-semibold'
                  : 'bg-black/15 hover:bg-black/25 text-orange-50'
              }`}
            >
              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                habit.completed ? 'bg-yellow-300 text-orange-900' : 'border border-white/60'
              }`}>
                {habit.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <div className="flex-1">
                <span className="block leading-snug">{habit.title}</span>
                <span className="text-[10px] text-yellow-200 mt-0.5 block">+{habit.pts} pts</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Biometric & InBody Deep Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Step Count (Health365 & Apple Watch) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Daily Step Count</span>
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{biometrics.todaySteps.toLocaleString()}</span>
            <span className="text-xs text-slate-400">/ 10,000 steps</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (biometrics.todaySteps / 10000) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Health365 Challenge</span>
            <span className="font-semibold text-emerald-700">78% met</span>
          </div>
        </div>

        {/* Active Calories Burned */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Calories Burned</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{biometrics.activeCalories}</span>
            <span className="text-xs text-slate-400">/ 650 kcal</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (biometrics.activeCalories / 650) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Apple Watch Series 10</span>
            <span className="font-semibold text-rose-600">480 kcal active</span>
          </div>
        </div>

        {/* InBody Body Fat Percentage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">InBody Body Fat %</span>
            <Scale className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{biometrics.bodyFatPercentage}%</span>
            <span className="text-xs text-emerald-600 font-semibold">-1.2%</span>
          </div>
          <div className="p-2 rounded-lg bg-teal-50 border border-teal-100 text-[11px] text-teal-900 font-medium">
            Visceral Fat Grade: 7 (Normal Healthy range)
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>InBody 270 verified</span>
            <span>Target: 19.5%</span>
          </div>
        </div>

        {/* InBody Skeletal Muscle Mass (SMM) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Skeletal Muscle Mass</span>
            <Heart className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{biometrics.skeletalMuscleMass}</span>
            <span className="text-xs text-slate-400">kg</span>
          </div>
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-[11px] text-blue-900 font-medium">
            Balanced upper & lower body symmetry
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Muscle preservation</span>
            <span className="text-blue-700 font-semibold">+0.4kg gained</span>
          </div>
        </div>
      </div>

      {/* Connected Devices Management List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Connected Hardware & Government Integrations</h3>
            <p className="text-xs text-slate-500">Manage paired watches, smart scales, and national health initiatives</p>
          </div>
          <span className="text-xs font-semibold text-emerald-800">
            {devices.filter(d => d.status === 'connected').length} Active Links
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {devices.map(device => (
            <div key={device.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  device.status === 'connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  {device.iconType === 'watch' && <Watch className="w-5 h-5" />}
                  {device.iconType === 'scale' && <Scale className="w-5 h-5" />}
                  {device.iconType === 'shield' && <Shield className="w-5 h-5" />}
                  {device.iconType === 'activity' && <Activity className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{device.name}</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      device.status === 'connected'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {device.status === 'connected' ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mt-0.5">
                    <span>{device.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>Last synced: {device.lastSync}</span>
                    {device.batteryLevel && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">Battery: {device.batteryLevel}%</span>
                      </>
                    )}
                  </div>
                  {/* Features list */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 mt-1">
                    {device.features.map(f => (
                      <span key={f} className="text-slate-500">✓ {f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleDeviceConnection(device.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap min-h-[44px] transition-colors self-start sm:self-center ${
                  device.status === 'connected'
                    ? 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {device.status === 'connected' ? 'Disconnect' : 'Connect Device'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
