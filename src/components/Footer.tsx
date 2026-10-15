import React from 'react';
import { Layers, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenBmcModal: () => void;
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBmcModal, onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                N
              </span>
              <span className="text-base font-bold text-slate-900">NadiFit ASEAN</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Personalized health, fitness, and weight management built for Southeast Asian cuisines, clinical metabolic health, and smart wearable ecosystems.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenBmcModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>View Full Business Model Canvas</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Features</span>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-slate-900 transition-colors">
                  AI Calorie & Meal Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('weight-plan')} className="hover:text-slate-900 transition-colors">
                  End-to-End Weight Plan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('live-hub')} className="hover:text-slate-900 transition-colors">
                  Live Weather & wger Exercises
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trainers')} className="hover:text-slate-900 transition-colors">
                  Trainers & Dietitians
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('devices')} className="hover:text-slate-900 transition-colors">
                  Device & InBody Sync Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rewards')} className="hover:text-slate-900 transition-colors">
                  Rewards & Community Events
                </button>
              </li>
            </ul>
          </div>

          {/* Partners & Ecosystem */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Ecosystem Partners</span>
            <ul className="space-y-1.5 text-slate-500">
              <li>ActiveSG & Health365 (HPB Singapore)</li>
              <li>Hyrox APAC Official Training Partner</li>
              <li>InBody Clinical Body Composition</li>
              <li>SaladStop! & Grain Healthy Dining</li>
              <li>Decathlon Southeast Asia</li>
            </ul>
          </div>

          {/* Clinical & Regulatory Notice */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Clinical Transparency</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Nutrient breakdowns are generated via regional food composition databases (Singapore Health Promotion Board, MARDI Malaysia, Thai Food Comp). Dietitian consultations are conducted by licensed APDs.
            </p>
            <div className="flex items-center gap-1.5 text-slate-500 pt-1 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>HIPAA / PDPA Compliant Architecture</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <span>© 2026 NadiFit ASEAN. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-600 cursor-pointer">Hawker Database Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
