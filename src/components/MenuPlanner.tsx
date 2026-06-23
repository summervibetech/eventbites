import React, { useState } from 'react';
import { Users, Check, ChevronRight } from 'lucide-react';
import translations from '../translations';
import type { Language } from '../translations';

const snackImages: Record<string, string> = {
  'fruit-cups': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=300&h=200',
  'mini-sandwiches': 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=300&h=200',
  'chips-dips': 'https://images.unsplash.com/photo-1518047601542-79f18c655718?auto=format&fit=crop&q=80&w=300&h=200',
  'crudites-cups': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=300&h=200',
  'small-pastries': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300&h=200',
  'snack-boxes': 'https://images.unsplash.com/photo-1601315379734-425a469078de?auto=format&fit=crop&q=80&w=300&h=200',
  'mini-desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300&h=200',
  'sweet-bites': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=300&h=200',
  'savory-bites': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300&h=200',
  'themed-bites': 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=300&h=200',
  'churros': 'https://images.unsplash.com/photo-1702896287488-0a83b9baaab9?auto=format&fit=crop&q=80&w=300&h=200',
  'popcorn': 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&q=80&w=300&h=200',
};

interface MenuPlannerProps {
  onSelectMenu: (snacks: string[], guestCount: number) => void;
  cartColor: string;
  umbrellaStyle: 'striped-cream' | 'striped-green' | 'solid-cream' | 'terracotta';
  language: Language;
}

export default function MenuPlanner({
  onSelectMenu,
  language,
}: MenuPlannerProps) {
  const t = translations[language].menu;
  const snackOptions = t.snackOptions;

  const [selected, setSelected] = useState<string[]>(['fruit-cups', 'mini-sandwiches', 'mini-desserts']);
  const [guestCount, setGuestCount] = useState<number>(50);

  const toggleSnack = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    const names = selected.map(
      (id) => snackOptions.find((o) => o.id === id)?.name || id
    );
    onSelectMenu(names, guestCount);
  };

  return (
    <section id="menu" className="pt-10 pb-20 bg-soft-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-sage-green block">
            {t.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-charcoal-text tracking-tight">
            {t.heading}
          </h2>
          <p className="text-stone-500 text-sm sm:text-base max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        <div className="space-y-8">

          {/* Guest Count Slider */}
          <div className="bg-warm-cream/20 p-6 rounded-[32px] border border-natural-border space-y-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-serif font-bold text-lg text-charcoal-text flex items-center space-x-2">
                  <Users className="w-5 h-5 text-sage-green" />
                  <span>{t.guestLabel}</span>
                </h3>
                <p className="text-stone-500 text-xs">{t.guestSliderSub}</p>
              </div>
              <div className="bg-white border border-natural-border px-4 py-1.5 rounded-full font-display font-black text-xl text-olive-green shadow-xs">
                {guestCount} {t.guests}
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <span className="text-xs font-display font-bold text-stone-400">20</span>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-sage-green focus:outline-hidden"
              />
              <span className="text-xs font-display font-bold text-stone-400">250+</span>
            </div>
          </div>

          {/* Snack Grid */}
          <div className="text-left">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-serif font-black text-lg text-charcoal-text">
                {t.chooseLabel} ({selected.length} {t.selected}):
              </h3>
              <span className="text-[10px] bg-sage-green/10 text-olive-green font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {t.customize}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {snackOptions.map((opt) => {
                const isChecked = selected.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleSnack(opt.id)}
                    className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-4 ${
                      isChecked
                        ? 'bg-white border-natural-border shadow-xs ring-1 ring-sage-green'
                        : 'bg-white/50 border-natural-border/60 hover:bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200 relative">
                      <img
                        src={snackImages[opt.id]}
                        alt={opt.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {isChecked && (
                        <div className="absolute inset-0 bg-sage-green/10 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-sage-green text-soft-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className={`font-serif font-bold text-sm leading-tight transition-colors ${
                          isChecked ? 'text-olive-green' : 'text-charcoal-text'
                        }`}>
                          {opt.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                          {opt.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {opt.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] bg-stone-100 text-stone-500 font-medium px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleApply}
              disabled={selected.length === 0}
              className={`flex items-center space-x-2 px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all shadow-sm ${
                selected.length === 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-sage-green hover:bg-olive-green text-soft-white hover:shadow-md cursor-pointer'
              }`}
            >
              <span>{t.saveBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
