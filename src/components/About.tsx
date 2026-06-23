import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Heart, Sparkles } from 'lucide-react';
import translations from '../translations';
import type { Language } from '../translations';

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const t = translations[language].about;

  const values = [
    {
      icon: <Leaf className="w-5 h-5 text-sage-green" />,
      title: t.v1Title,
      desc: t.v1Desc,
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      title: t.v2Title,
      desc: t.v2Desc,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />,
      title: t.v3Title,
      desc: t.v3Desc,
    },
  ];

  return (
    <section id="about" className="py-20 bg-warm-cream/30 border-y border-natural-border relative overflow-hidden">
      {/* Floating food accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <span className="absolute top-[10%] right-[8%] text-4xl opacity-[0.10] animate-float" style={{ animationDelay: '0.5s', transform: 'rotate(12deg)' }}>🧁</span>
        <span className="absolute bottom-[10%] left-[5%] text-4xl opacity-[0.10] animate-float" style={{ animationDelay: '1.5s', transform: 'rotate(-8deg)' }}>☕</span>
        <span className="absolute top-[50%] left-[2%] text-3xl opacity-[0.09] animate-float" style={{ animationDelay: '2.2s', transform: 'rotate(6deg)' }}>🍬</span>
      </div>

      {/* Decorative leaf SVGs in background */}
      <div className="absolute top-12 left-6 w-16 h-16 text-sage-green/10 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.38,17.5C11.5,18 16.5,13 17,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" />
        </svg>
      </div>
      <div className="absolute bottom-12 right-6 w-20 h-20 text-sage-green/10 pointer-events-none transform rotate-45">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.38,17.5C11.5,18 16.5,13 17,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text and story side */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-sage-green block">
              {t.sectionLabel}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-charcoal-text tracking-tight">
              {t.heading}
            </h2>

            <div className="space-y-4 text-stone-600 leading-relaxed text-sm sm:text-base">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>
          </div>

          {/* 3 value sections */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5 bg-white/60 backdrop-blur-xs p-6 rounded-2xl border border-natural-border"
              >
                <div className="w-11 h-11 rounded-full bg-warm-cream flex items-center justify-center shrink-0 shadow-xs">
                  {v.icon}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-charcoal-text mb-1">{v.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
