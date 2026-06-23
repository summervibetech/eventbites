import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Users, Heart, Sunset, Check } from 'lucide-react';
import translations from '../translations';
import type { Language } from '../translations';

interface PerfectForProps {
  language: Language;
}

export default function PerfectFor({ language }: PerfectForProps) {
  const t = translations[language].perfectFor;
  const categories = t.categories;

  const icons = [
    <Users className="w-5 h-5" />,
    <Heart className="w-5 h-5" />,
    <Trophy className="w-5 h-5" />,
    <Sunset className="w-5 h-5" />,
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const current = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section id="perfect-for" className="pt-20 pb-10 bg-warm-cream/25 border-t border-natural-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D9C7A3]/5 rounded-full blur-3xl -z-10" />

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

        {/* Categories Tab Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Left Column: Tab list */}
          <div className="lg:col-span-5 flex flex-col space-y-4 text-left justify-center">
            <h3 className="font-serif font-black text-xl text-charcoal-text mb-2">
              {t.selectLabel}
            </h3>

            <div className="space-y-3">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 ${
                    activeCategory === cat.id
                      ? 'bg-white border-natural-border shadow-xs ring-2 ring-sage-green/10'
                      : 'bg-white/50 border-natural-border/60 hover:bg-white/80 hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-sage-green text-soft-white'
                        : 'bg-warm-cream/50 text-stone-600'
                    }`}
                  >
                    {icons[idx]}
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-sm sm:text-base text-charcoal-text">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-none">
                      {cat.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Info Card Display */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + language}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-[32px] border border-natural-border shadow-xs h-full flex flex-col justify-between text-left"
              >
                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div className="border-b border-stone-100 pb-4">
                    <span className="text-[10px] font-display font-black uppercase tracking-wider text-sage-green">
                      {t.recommendedExp}
                    </span>
                    <h3 className="font-serif font-black text-2xl text-charcoal-text mt-1">
                      {current.title}
                    </h3>
                    <p className="text-stone-500 text-sm mt-1">{current.desc}</p>
                  </div>

                  {/* List of matched event formats */}
                  <div>
                    <h4 className="text-[11px] font-display font-bold uppercase tracking-wider text-stone-400 mb-3">
                      {t.idealFormats}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {current.items.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2 text-stone-700 text-xs sm:text-sm">
                          <div className="w-5 h-5 rounded-full bg-sage-green/10 flex items-center justify-center text-sage-green flex-shrink-0">
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Setup Styling description */}
                  <div className="bg-warm-cream/20 p-4 rounded-xl border border-natural-border/50">
                    <h4 className="text-[10px] font-display font-bold uppercase tracking-wider text-olive-green mb-1.5 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{t.recommendedStyling}</span>
                    </h4>
                    <p className="text-stone-700 text-xs leading-relaxed">
                      {current.recommendedStyle}
                    </p>
                  </div>
                </div>

                {/* Bottom Food recommendation panel */}
                <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-[10px] font-display font-bold uppercase tracking-wider text-stone-400 mb-1">
                      {t.perfectPairings}
                    </h4>
                    <p className="text-charcoal-text text-xs font-semibold">
                      {current.menuHint}
                    </p>
                  </div>
                  <span className="text-[10px] bg-olive-green text-soft-white font-display font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {t.easyPlating}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Small disclaimer copy */}
        <div className="mt-6 text-center text-xs text-stone-500 italic max-w-xl mx-auto">
          {t.disclaimer}
        </div>

      </div>
    </section>
  );
}
