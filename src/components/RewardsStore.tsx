import React, { useState } from 'react';
import { Award, Gift, Users, Calendar, MapPin, Copy, Check, Sparkles, ExternalLink, ShieldCheck, Ticket } from 'lucide-react';
import { RewardItem, FitnessEvent } from '../types';
import { REWARD_ITEMS, UPCOMING_EVENTS } from '../data/mockData';

interface RewardsStoreProps {
  points: number;
  onRedeemReward: (reward: RewardItem) => void;
}

export const RewardsStore: React.FC<RewardsStoreProps> = ({ points, onRedeemReward }) => {
  const [activeSubTab, setActiveSubTab] = useState<'rewards' | 'events' | 'referrals'>('rewards');
  const [rewardList] = useState<RewardItem[]>(REWARD_ITEMS);
  const [eventList, setEventList] = useState<FitnessEvent[]>(UPCOMING_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null);
  const [redeemedToast, setRedeemedToast] = useState<string | null>(null);

  const referralCode = 'SHIZEN-SG2026';

  const categories = ['All', 'Healthy F&B', 'Gym & Facilities', 'Sports Equipment', 'Health Screening'];

  const filteredRewards = rewardList.filter(r =>
    selectedCategory === 'All' || r.partnerCategory === selectedCategory
  );

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://nadifit.app/join?ref=${referralCode}`);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 3000);
  };

  const handleClaim = (reward: RewardItem) => {
    if (points >= reward.pointsCost) {
      onRedeemReward(reward);
      setRedeemedToast(`Successfully redeemed "${reward.title}"! Voucher code sent to email.`);
      setTimeout(() => setRedeemedToast(null), 4000);
    } else {
      alert(`You need ${reward.pointsCost - points} more HealthPoints to redeem this voucher. Log meals and complete step goals to earn points!`);
    }
  };

  const handleRsvpEvent = (event: FitnessEvent) => {
    setEventList(eventList.map(e => {
      if (e.id === event.id && e.spotsLeft > 0) {
        return { ...e, spotsLeft: e.spotsLeft - 1 };
      }
      return e;
    }));
    setRsvpSuccess(`RSVP Confirmed for "${event.title}". Event details added to your calendar!`);
    setTimeout(() => setRsvpSuccess(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast */}
      {(redeemedToast || rsvpSuccess) && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-2xl border border-emerald-500/30">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{redeemedToast || rsvpSuccess}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
            <span>CUSTOMER RELATIONSHIPS & REWARDS</span>
            <span aria-hidden="true">·</span>
            <span>HEALTHPOINTS ECOSYSTEM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Rewards, Events & Referrals
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Redeem your daily streak points for healthy ASEAN dining vouchers, gym day passes, InBody body scans, or RSVP for live Hyrox workshops and dietitian roadshows.
          </p>
        </div>

        {/* Current Balance Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Available Balance</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 tabular-nums">{points}</span>
              <span className="text-xs font-semibold text-emerald-700">HealthPoints</span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Control Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('rewards')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'rewards'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Gift className="w-3.5 h-3.5 text-emerald-400" />
          <span>Partner Vouchers ({rewardList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('events')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'events'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span>Events & Roadshows ({eventList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('referrals')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'referrals'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-orange-400" />
          <span>Refer a Friend (+500 Pts)</span>
        </button>
      </div>

      {/* SubTab 1: Partner Vouchers */}
      {activeSubTab === 'rewards' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500">Filter Partner:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vouchers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map(reward => {
              const canAfford = points >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                          {reward.partnerName}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                          {reward.title}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                        Val: {reward.originalValue}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {reward.description}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{reward.country}</span>
                      <span aria-hidden="true">·</span>
                      <span>Valid for {reward.expiresInDays} days</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Cost</span>
                      <span className="text-lg font-black text-slate-900 tabular-nums">
                        {reward.pointsCost} <span className="text-xs font-normal text-slate-500">pts</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleClaim(reward)}
                      disabled={!canAfford}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[44px] ${
                        canAfford
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Redeem Voucher' : 'Need More Points'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 2: Events & Roadshows (BMC Key Activities & Customer Relationships) */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
            <span className="font-bold">ActiveSG & Community Programming: </span>
            Attend in-person weekend clinics, dietitian hawker webinars, and Hyrox race prep sessions to boost motivation and connect with ASEAN fitness communities.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventList.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">
                      {event.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                      {event.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {event.fee}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Lead: {event.instructor}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-orange-600 font-semibold tabular-nums">
                    Only {event.spotsLeft} spots remaining
                  </span>

                  <button
                    onClick={() => handleRsvpEvent(event)}
                    disabled={event.spotsLeft === 0}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs min-h-[44px] flex items-center gap-1.5"
                  >
                    <span>{event.spotsLeft > 0 ? 'RSVP for Event' : 'Sold Out'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Referrals (BMC: referrals, refer a friend) */}
      {activeSubTab === 'referrals' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">
              Refer a Friend & Earn 500 HealthPoints
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Health and weight loss journeys are 3x more successful with a workout buddy. When a friend signs up with your code, you both receive 500 HealthPoints + 1 month of Basic Plan for free!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-xl font-bold text-slate-900">1. Share Code</span>
              <p className="text-xs text-slate-500">Send your personalized link or referral code to friends and family.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-xl font-bold text-slate-900">2. They Join</span>
              <p className="text-xs text-slate-500">They log their first ASEAN meal photo and link smart tracker.</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <span className="text-xl font-bold text-emerald-950">+500 Points</span>
              <p className="text-xs text-emerald-800">Both of you receive instant reward points redeemable at SaladStop! & ActiveSG.</p>
            </div>
          </div>

          {/* Referral Link Box */}
          <div className="pt-4 max-w-lg space-y-2">
            <span className="text-xs font-semibold text-slate-700 block">Your Unique Referral Link</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`https://shizen.app/join?ref=${referralCode}`}
                className="flex-1 px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
              />
              <button
                onClick={handleCopyReferral}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-2 shrink-0 min-h-[44px]"
              >
                {copiedReferral ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
