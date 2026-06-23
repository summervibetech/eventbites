import React from 'react';
import { motion } from 'motion/react';
import { Store, ChefHat, HeartHandshake, Sliders, ArrowRight } from 'lucide-react';
import translations from '../translations';
import type { Language } from '../translations';

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
  language: Language;
}

export default function Services({ onNavigate, language }: ServicesProps) {
  const t = translations[language].services;

  const icons = [
    <Store className="w-6 h-6 text-olive-green" />,
    <ChefHat className="w-6 h-6 text-olive-green" />,
    <HeartHandshake className="w-6 h-6 text-olive-green" />,
    <Sliders className="w-6 h-6 text-olive-green" />,
  ];

  return (
    <section id="services" className="py-20 bg-soft-white relative">
      {/* Decorative background grid elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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

        {/* Services Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 text-left">
          {t.cards.map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/60 border border-natural-border p-8 rounded-[32px] relative overflow-hidden group hover:bg-light-sand/20 transition-colors duration-300"
            >
              {/* Subtle accent hover indicator corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sage-green/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Number element */}
              <div className="absolute top-6 right-6 font-display font-bold text-3xl text-natural-border/40 select-none">
                0{idx + 1}
              </div>

              {/* Card Body */}
              <div className="flex flex-col space-y-4 max-w-xl">
                <div className="w-12 h-12 rounded-2xl bg-sage-green/10 flex items-center justify-center text-olive-green group-hover:bg-sage-green group-hover:text-soft-white transition-all duration-300 shadow-xs">
                  {icons[idx]}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-black text-lg sm:text-xl text-charcoal-text group-hover:text-olive-green transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed font-medium">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-natural-border/50 text-[13px] text-stone-500 leading-relaxed italic">
                  {s.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner Section */}
        <div className="mt-16 bg-gradient-to-r from-sage-green to-olive-green text-soft-white p-8 rounded-[32px] text-center shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 max-w-5xl mx-auto text-left">
          {/* Shine effect */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250px_250px] animate-[pulse_10s_infinite] pointer-events-none" />

          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif font-black text-xl sm:text-2xl">
              {t.ctaHeading}
            </h3>
            <p className="text-soft-white/80 text-xs sm:text-sm">
              {t.ctaSub}
            </p>
          </div>

          <button
            onClick={() => onNavigate('booking')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-full bg-soft-white hover:bg-warm-cream text-olive-green font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex-shrink-0"
          >
            <span>{t.ctaBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
