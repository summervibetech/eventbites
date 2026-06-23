import React from 'react';
import { motion } from 'motion/react';
import { Mail, Settings, Sparkles, Smile, ArrowRight } from 'lucide-react';
import translations from '../translations';
import type { Language } from '../translations';

interface HowItWorksProps {
  language: Language;
}

export default function HowItWorks({ language }: HowItWorksProps) {
  const t = translations[language].howItWorks;

  const icons = [
    <Mail className="w-5 h-5 text-olive-green" />,
    <Settings className="w-5 h-5 text-olive-green" />,
    <Sparkles className="w-5 h-5 text-olive-green" />,
    <Smile className="w-5 h-5 text-olive-green" />,
  ];

  return (
    <section id="how-it-works" className="py-12 bg-warm-cream/35 border-y border-natural-border relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sage-green/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sage-green/30 via-sage-green/60 to-sage-green/30 z-0" />

          {t.steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 flex flex-col"
            >
              {/* Cart Wheel step indicator */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-12 h-12 shrink-0">
                  {/* Spinning wheel */}
                  <motion.div
                    className="w-12 h-12 rounded-full bg-amber-50 border-[3px] border-amber-900 shadow-md flex items-center justify-center relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    {/* Spokes */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-10 bg-amber-800/50"
                        style={{ transform: `rotate(${i * 30}deg)` }}
                      />
                    ))}
                    {/* Outer tread ring */}
                    <div className="absolute inset-0 rounded-full border border-amber-950/20" />
                  </motion.div>
                  {/* Hub with step number (non-rotating) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-5 h-5 rounded-full bg-amber-950 border border-amber-900 flex items-center justify-center shadow-sm">
                      <span className="text-[8px] font-display font-black text-yellow-400 leading-none">{item.step}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow between steps (mobile/tablet) */}
                {index < t.steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-sage-green/40 lg:hidden" />
                )}
              </div>

              {/* Card */}
              <div className="bg-white border border-natural-border rounded-2xl p-5 shadow-xs flex flex-col gap-3 flex-1">
                <div className="w-9 h-9 rounded-full bg-warm-cream flex items-center justify-center">
                  {icons[index]}
                </div>
                <h3 className="font-serif font-black text-base text-charcoal-text leading-tight">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.description}
                </p>
                <p className="text-[11px] text-stone-400 leading-relaxed italic border-t border-stone-100 pt-3 mt-auto">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
