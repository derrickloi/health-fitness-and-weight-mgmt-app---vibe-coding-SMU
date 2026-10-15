import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, Zap, Building2 } from 'lucide-react';

interface PricingTiersProps {
  onSelectTier: (tierName: string) => void;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'freemium',
      name: 'Freemium Community',
      targetAudience: '2M Projected Active Users',
      price: 0,
      period: 'Forever free',
      description: 'Essential health tracking and community participation for everyday ASEAN fitness enthusiasts.',
      badge: 'Zero Commitment',
      features: [
        'Manual food logging & database access',
        'Daily step tracking (ActiveSG / Health365)',
        'Duolingo-style daily streak counter',
        'Access to free public community events & webinars',
        'Basic HealthPoints accumulation'
      ],
      cta: 'Start Free Today',
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic Active',
      targetAudience: 'Designed for Sustainable Weight Loss',
      price: billingCycle === 'monthly' ? 10 : 8.5,
      period: '/ month (billed monthly)',
      description: 'Full AI meal scanning and end-to-end weight management for disciplined fat loss and pre-diabetes care.',
      badge: 'Most Popular',
      features: [
        'Unlimited AI meal photo calorie scanning',
        'Nutrient & Glycemic Index (GI) detection',
        'Personalized 12-week weight plan generator',
        'InBody & Apple Watch continuous biometrics sync',
        'Redeem points for SaladStop!, Grain & Decathlon vouchers',
        'Calendar (.ics) workout export'
      ],
      cta: 'Upgrade to Basic ($10/mo)',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Dedicated Coaching',
      targetAudience: '1-on-1 Certified Healthcare & Strength',
      price: billingCycle === 'monthly' ? 100 : 85,
      period: '/ month (all inclusive)',
      description: 'Dedicated 1-on-1 personal trainer & registered dietitian consultations for transformative body recomposition.',
      badge: 'High Performance',
      features: [
        'All features in Basic Active Plan',
        '2x Monthly 1-on-1 sessions with APD Dietitian or NSCA Coach',
        'Direct WhatsApp / in-app trainer chat check-ins',
        'Quarterly complimentary InBody 570 clinical scans',
        'VIP access to Hyrox ASEAN prep workshops',
        'Customized weekly grocery & hawker shopping guide'
      ],
      cta: 'Join Premium Coaching ($100/mo)',
      popular: false
    }
  ];

  const handleChoose = (planName: string) => {
    setSelectedPlan(planName);
    onSelectTier(planName);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
          <span>REVENUE STREAMS & MONETIZATION</span>
          <span aria-hidden="true">·</span>
          <span>BMC ROADMAP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Flexible Plans for Every ASEAN Lifestyle
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          From self-guided AI nutrition tracking to dedicated 1-on-1 clinical dietitian consultations. Designed to scale from 2M freemium users to 1M paying members.
        </p>

        {/* Billing cycle toggle */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <div className="p-1 bg-slate-100 rounded-xl inline-flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Annual (Save 15%)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
              plan.popular
                ? 'bg-white border-2 border-emerald-600 shadow-xl shadow-emerald-600/10'
                : 'bg-white border border-slate-200 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
                {plan.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  {plan.targetAudience}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{plan.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-950 tabular-nums">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">SGD {plan.period}</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 block">Included Capabilities:</span>
                <ul className="space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 mt-6 border-t border-slate-100">
              <button
                onClick={() => handleChoose(plan.name)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all min-h-[44px] flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {selectedPlan === plan.name && (
                <span className="text-[11px] text-emerald-700 font-bold block text-center mt-2">
                  ✓ Selected Plan Activated!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* B2B Partner Commission Module (From BMC: Gyms or vendors pay a referral fee/commission fee per person referred there) */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Building2 className="w-4 h-4" />
              <span>B2B VENDOR & GYM COMMISSION REVENUE STREAM</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Are you a Gym, Studio, or Healthy F&B Provider?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Under our dual-sided business model, partner gyms (ActiveSG, Anytime Fitness) and healthy dining brands (SaladStop!, Grain) receive high-intent footfall and only pay a nominal referral commission per active booking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => alert('Partner Portal application submitted! Our ASEAN commercial partnerships team will reach out within 24 hours.')}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs min-h-[44px] shadow-sm transition-colors"
            >
              Apply as Partner Merchant
            </button>
            <button
              onClick={() => alert('Corporate Insurance Portal: Integrating with AIA Vitality and Great Eastern wellness credits.')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs min-h-[44px] border border-slate-700 transition-colors"
            >
              Corporate Wellness Inquiries
            </button>
          </div>
        </div>

        {/* Financial projections note */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div>
            <span className="text-white font-bold block">Year 1 Goal:</span>
            <span>Break even with $150k development + $45k operations amortized</span>
          </div>
          <div>
            <span className="text-white font-bold block">Year 3 Goal:</span>
            <span>High net profitability with 1M paying subscribers</span>
          </div>
          <div>
            <span className="text-white font-bold block">Pan-ASEAN Coverage:</span>
            <span>Singapore, Malaysia, Indonesia, Thailand & Philippines</span>
          </div>
        </div>
      </div>
    </div>
  );
};
