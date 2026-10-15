import React, { useState } from 'react';
import { Search, Star, DollarSign, Calendar, MapPin, Globe, CheckCircle2, X, Filter, Video, Users, Sparkles } from 'lucide-react';
import { Trainer } from '../types';
import { MOCK_TRAINERS } from '../data/mockData';

interface TrainerDirectoryProps {
  onSessionBooked: (trainer: Trainer, slot: string) => void;
}

export const TrainerDirectory: React.FC<TrainerDirectoryProps> = ({ onSessionBooked }) => {
  const [trainers] = useState<Trainer[]>(MOCK_TRAINERS);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Booking Modal State
  const [bookingTrainer, setBookingTrainer] = useState<Trainer | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow (10:00 AM)');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [sessionFormat, setSessionFormat] = useState<'Virtual HD Video' | 'In-Person Gym (ActiveSG)'>('Virtual HD Video');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const roles = [
    'All',
    'Clinical Dietitian',
    'Hyrox Coach',
    'Certified Personal Trainer',
    'Diabetes Health Coach',
    'Sports Nutritionist'
  ];

  const countries = ['All', 'Singapore', 'Malaysia', 'Indonesia', 'Thailand', 'Philippines'];

  const filteredTrainers = trainers.filter(t => {
    const matchRole = selectedRole === 'All' || t.role === selectedRole;
    const matchPrice = t.pricePerSession <= maxPrice;
    const matchCountry = selectedCountry === 'All' || t.country.includes(selectedCountry);
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchPrice && matchCountry && matchSearch;
  });

  const handleOpenBooking = (trainer: Trainer) => {
    setBookingTrainer(trainer);
    setSelectedSlot(trainer.availableSlots[0]);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = () => {
    if (bookingTrainer && selectedSlot) {
      onSessionBooked(bookingTrainer, selectedSlot);
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingTrainer(null);
        setBookingSuccess(false);
      }, 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 tracking-wide">
          <span>VALUE PROPOSITION #3</span>
          <span aria-hidden="true">·</span>
          <span>ACCREDITED EXPERT NETWORK</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Trainers & Registered Dietitians
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Connect directly with accredited healthcare professionals, clinical dietitians (APD), and certified strength coaches across Southeast Asia. Filter by price, native language, or clinical specialization.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, specialty (e.g. Hyrox, Pre-Diabetes, PCOS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          {/* Country Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 font-medium"
            >
              {countries.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All ASEAN Countries' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider (BMC Key Proposition: Filtered by price) */}
          <div className="md:col-span-4 px-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Max Session Fee:</span>
              <span className="text-emerald-700 font-bold tabular-nums">SGD ${maxPrice} / hr</span>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>$40</span>
              <span>$80</span>
              <span>$120</span>
            </div>
          </div>
        </div>

        {/* Category Pills (Role Filter) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Specialty:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedRole === role
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trainer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No coaches match this filter combination</p>
            <p className="text-xs text-slate-500 mt-1">Try raising the max session price or selecting "All ASEAN Countries".</p>
            <button
              onClick={() => {
                setSelectedRole('All');
                setMaxPrice(120);
                setSelectedCountry('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTrainers.map(trainer => (
            <div
              key={trainer.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Header Lockup */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${trainer.avatarBg} text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0`}>
                      {trainer.avatarInitial}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">{trainer.name}</h3>
                      <span className="text-xs font-semibold text-emerald-800 block mt-0.5">{trainer.role}</span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{trainer.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-950 tabular-nums">{trainer.rating}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {trainer.bio}
                </p>

                {/* Specialties Tags (No pills, clean unboxed with separator as per Rule 1.A) */}
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">Focus Areas:</span>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-700">
                    {trainer.specialties.map((spec, i) => (
                      <React.Fragment key={spec}>
                        {i > 0 && <span aria-hidden="true" className="text-slate-300">·</span>}
                        <span>{spec}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Languages and Certifications */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{trainer.languages.join(', ')}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{trainer.certifications[0]}</span>
                </div>
              </div>

              {/* Price and Book Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Session Fee</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-950 tabular-nums">SGD ${trainer.pricePerSession}</span>
                    <span className="text-xs text-slate-500">/ 50m</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(trainer)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors min-h-[44px]"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Book Slot</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Drawer / Modal */}
      {bookingTrainer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setBookingTrainer(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Session Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your appointment with <span className="font-bold">{bookingTrainer.name}</span> on {selectedSlot} ({sessionFormat}) has been synced to your calendar.
                </p>
                <div className="text-xs text-emerald-800 font-semibold pt-2">
                  +100 HealthPoints awarded for scheduling health care!
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${bookingTrainer.avatarBg} text-white font-extrabold flex items-center justify-center text-sm`}>
                    {bookingTrainer.avatarInitial}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{bookingTrainer.name}</h3>
                    <span className="text-xs text-emerald-700 font-semibold">{bookingTrainer.role}</span>
                    <span className="text-xs text-slate-500 block">SGD ${bookingTrainer.pricePerSession} / session</span>
                  </div>
                </div>

                {/* Session Mode Selector */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-700 block">Consultation Format</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSessionFormat('Virtual HD Video')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        sessionFormat === 'Virtual HD Video'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                          : 'border-slate-200 text-slate-700 bg-white'
                      }`}
                    >
                      <Video className="w-4 h-4 text-emerald-600" />
                      <span>Virtual HD Video</span>
                    </button>
                    <button
                      onClick={() => setSessionFormat('In-Person Gym (ActiveSG)')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        sessionFormat === 'In-Person Gym (ActiveSG)'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                          : 'border-slate-200 text-slate-700 bg-white'
                      }`}
                    >
                      <Users className="w-4 h-4 text-slate-600" />
                      <span>In-Person Gym</span>
                    </button>
                  </div>
                </div>

                {/* Slot Selection */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">Select Open Time Slot</span>
                  <div className="grid grid-cols-2 gap-2">
                    {bookingTrainer.availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          selectedSlot === slot
                            ? 'border-slate-900 bg-slate-900 text-white font-bold'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking policy note */}
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200/70">
                  <span className="font-semibold text-slate-800">Free Rescheduling: </span>
                  Cancel or move your appointment up to 12 hours beforehand with zero penalty fee.
                </div>

                {/* Confirm Action */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setBookingTrainer(null)}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm min-h-[44px] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Booking</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
