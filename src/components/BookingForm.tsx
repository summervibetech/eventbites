import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Mail, Phone, Users, HelpCircle, FileText, Send, CheckCircle2 } from 'lucide-react';
import { BookingInquiry } from '../types';
import translations from '../translations';
import type { Language } from '../translations';

interface BookingFormProps {
  onSubmitInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'status' | 'createdAt'>) => void;
  selectedSnacks: string[];
  plannedGuestCount: number;
  language: Language;
}

export default function BookingForm({
  onSubmitInquiry,
  selectedSnacks,
  plannedGuestCount,
  language,
}: BookingFormProps) {
  const t = translations[language].booking;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState(plannedGuestCount);
  const [eventType, setEventType] = useState(t.eventTypes[0]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setGuestCount(plannedGuestCount);
  }, [plannedGuestCount]);

  useEffect(() => {
    setEventType(t.eventTypes[0]);
  }, [language]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date) {
      setError(t.errorMsg);
      return;
    }
    setError('');

    onSubmitInquiry({
      name,
      email,
      phone,
      date,
      location: '',
      guestCount,
      eventType,
      snackStyle: '',
      message,
      selectedSnacks,
      cartColor: 'sage',
      umbrellaStyle: 'striped-cream',
    });

    setSubmitted(true);

    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setMessage('');
  };

  return (
    <section id="booking" className="py-20 bg-soft-white relative scroll-mt-20">
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-100/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-sage-green block">
            {t.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-charcoal-text tracking-tight">
            {t.heading}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            {t.sub}
          </p>
        </div>

        {/* Form and Dynamic estimate layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">

          {/* Left Column: Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-10 rounded-3xl border border-warm-cream shadow-md text-center space-y-6 flex flex-col items-center justify-center h-full"
              >
                <div className="w-16 h-16 rounded-full bg-sage-green/10 flex items-center justify-center text-sage-green animate-pulse mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-2xl text-charcoal-text">{t.successTitle}</h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">{t.successMsg}</p>
                </div>
                <div className="bg-warm-cream/30 p-4 rounded-xl text-xs text-stone-600 max-w-md italic">
                  "{t.successNote}"
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-sage-green text-white text-xs font-bold tracking-wider uppercase hover:bg-olive-green cursor-pointer transition-colors"
                >
                  {t.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border border-natural-border shadow-xs space-y-6 text-left">
                <h3 className="font-serif font-black text-xl text-charcoal-text mb-2">{t.formTitle}</h3>

                {error && (
                  <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                      <span>{t.nameLabel}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder={t.namePlaceholder}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all"
                      />
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                      <span>{t.emailLabel}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder={t.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all"
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500">
                      {t.phoneLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all"
                      />
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  {/* Event Date field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                      <span>{t.dateLabel}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all"
                      />
                      <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  {/* Guest Count Input synced */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500">
                      {t.guestLabel}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="10"
                        max="500"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 20)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all"
                      />
                      <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  {/* Event Type select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500">
                      {t.eventTypeLabel}
                    </label>
                    <div className="relative">
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all appearance-none cursor-pointer"
                      >
                        {t.eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <HelpCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                </div>

                {/* Message / Custom notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-display font-bold uppercase tracking-wider text-stone-500">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green focus:ring-2 focus:ring-sage-green/10 text-sm bg-stone-50/30 transition-all"
                  />
                </div>

                {/* Submit trigger button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-4 rounded-full bg-sage-green hover:bg-olive-green text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live Proposal Preview Card (5 cols on lg) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="bg-warm-cream/35 border border-natural-border p-6 sm:p-8 rounded-[32px] h-full flex flex-col justify-between text-left relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage-green/5 rounded-bl-full pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Proposal Header */}
                <div className="border-b border-natural-border pb-4">
                  <span className="text-[10px] font-display font-black uppercase tracking-widest text-olive-green">
                    {t.proposalLabel}
                  </span>
                  <h3 className="font-serif font-black text-xl text-charcoal-text mt-1">
                    {t.proposalTitle}
                  </h3>
                  <p className="text-stone-500 text-xs">{t.proposalSub}</p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-400 font-medium block">{t.inquirerLabel}</span>
                    <span className="font-semibold text-stone-800 truncate block">
                      {name || t.awaiting}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-medium block">{t.dateLabel2}</span>
                    <span className="font-semibold text-stone-800 block">
                      {date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : t.notChosen}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-medium block">{t.eventFormatLabel}</span>
                    <span className="font-semibold text-stone-800 block">
                      {eventType}
                    </span>
                  </div>
                </div>

                {/* Synced Menu Selections list */}
                <div className="pt-4 border-t border-natural-border/60">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    {t.menuConfirmedLabel}
                  </span>
                  {selectedSnacks.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSnacks.map((snack, i) => (
                        <span key={i} className="text-[10px] bg-white border border-natural-border text-stone-700 px-2.5 py-1 rounded-full font-medium shadow-2xs">
                          {snack}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-stone-500 italic">
                      {t.noSnacks}
                    </div>
                  )}
                </div>

                {/* Dynamic estimates based on guest count */}
                <div className="pt-4 border-t border-natural-border/60 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">{t.guestTierLabel}</span>
                    <span className="font-semibold text-stone-800">
                      {guestCount} {t.guests} ({guestCount <= 50 ? t.intimate : guestCount <= 120 ? t.medium : t.large}-{t.scaleSetup})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">{t.themeMatchLabel}</span>
                    <span className="font-semibold text-olive-green">{t.themeMatchVal}</span>
                  </div>
                </div>
              </div>

              {/* Hosting assurance notice */}
              <div className="bg-white p-4 rounded-2xl border border-natural-border mt-8">
                <span className="text-[9px] font-display font-black uppercase tracking-widest text-sage-green block mb-1">
                  {t.promiseTitle}
                </span>
                <p className="text-[11px] text-stone-500 leading-normal">
                  {t.promiseText}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
