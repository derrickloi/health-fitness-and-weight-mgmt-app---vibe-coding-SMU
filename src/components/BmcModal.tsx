import React from 'react';
import { X, Layers, CheckCircle2, DollarSign, Users, Award, Shield, Target, ExternalLink } from 'lucide-react';
import { BMC_BLUEPRINT } from '../data/mockData';

interface BmcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BmcModal: React.FC<BmcModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-12">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 tracking-wide">
            <Layers className="w-4 h-4" />
            <span>BUSINESS MODEL CANVAS SPECIFICATION</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Shizen ASEAN: 9-Building-Block Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Exact transcription and interactive breakdown of the Business Model Canvas submitted in the project artifact.
          </p>
        </div>

        {/* Scrollable Canvas Grid */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BMC_BLUEPRINT.map((block) => (
              <div
                key={block.pillar}
                className={`rounded-2xl border p-5 space-y-3 ${block.color}`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-black/5">
                  <h3 className="text-sm font-black text-slate-900">{block.pillar}</h3>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Artifact Mapping</span>
                </div>

                <ul className="space-y-2">
                  {block.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                      <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Economics & Milestones Summary Strip */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Financial Projections & Target Timeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Upfront Dev Cost</span>
                <span className="text-base font-extrabold text-white tabular-nums">$150,000</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Recurring Annual Cost</span>
                <span className="text-base font-extrabold text-white tabular-nums">$95,000 / yr</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Break-Even Target</span>
                <span className="text-base font-extrabold text-emerald-400 tabular-nums">1 Year</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Profitability Milestone</span>
                <span className="text-base font-extrabold text-emerald-400 tabular-nums">3 Years (1M Paid)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Front-end prototype ready for backend integration & database hooks.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold min-h-[44px]"
          >
            Close Canvas
          </button>
        </div>
      </div>
    </div>
  );
};
