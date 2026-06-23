import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Compass, ArrowRight, Palette, Sparkles, Check } from 'lucide-react';
import CartIllustration from './CartIllustration';
import translations from '../translations';
import type { Language } from '../translations';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  cartColor: string;
  setCartColor: (color: string) => void;
  umbrellaStyle: 'striped-cream' | 'striped-green' | 'solid-cream' | 'terracotta';
  setUmbrellaStyle: (style: 'striped-cream' | 'striped-green' | 'solid-cream' | 'terracotta') => void;
  language: Language;
}

export default function Hero({
  onNavigate,
  cartColor,
  setCartColor,
  umbrellaStyle,
  setUmbrellaStyle,
  language,
}: HeroProps) {
  const t = translations[language].hero;

  const colors = [
    { name: 'Arbor Sage', value: 'sage', bg: 'bg-[#5d6d5a]', hex: '#5d6d5a' },
    { name: 'Forest Olive', value: 'olive', bg: 'bg-[#4a5848]', hex: '#4a5848' },
    { name: 'Warm Cream', value: 'cream', bg: 'bg-[#f7f4ef] border border-[#e0d9cf]', hex: '#f7f4ef' },
    { name: 'Light Sand', value: 'sand', bg: 'bg-[#efebe3] border border-[#e0d9cf]', hex: '#efebe3' },
    { name: 'Terracotta Wood', value: 'rose', bg: 'bg-[#b5835a]', hex: '#b5835a' },
  ];

  const umbrellas = [
    { label: 'Beige Stripe', value: 'striped-cream' },
    { label: 'Sage Stripe', value: 'striped-green' },
    { label: 'Terracotta', value: 'terracotta' },
    { label: 'Clean White', value: 'solid-cream' },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center bg-radial from-soft-white via-soft-white to-warm-cream/30 overflow-hidden">
      {/* Background Organic Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-green/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-light-sand/10 rounded-full blur-3xl -z-10" />

      {/* Sun Ray Effect */}
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-amber-50/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
            {/* Tagline / Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-sage-green/10 text-olive-green border border-sage-green/20 px-3 py-1.5 rounded-full w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-xs font-display font-semibold uppercase tracking-wider">
                {t.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-charcoal-text leading-[1.1]"
              >
                {t.headline1} <br />
                <span className="text-olive-green relative inline-block">
                  {t.headline2}
                  {/* Underline loop */}
                  <svg className="w-full h-3 absolute -bottom-1.5 left-0 text-light-sand/80" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 Q50,11 100,5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                {t.headline3}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                {t.sub}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('booking')}
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-sage-green hover:bg-olive-green text-soft-white font-semibold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.cta1}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('services')}
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-white hover:bg-warm-cream/50 text-stone-700 font-semibold tracking-wide border border-stone-200 hover:border-light-sand transition-all cursor-pointer shadow-xs"
              >
                <Compass className="w-4 h-4 text-sage-green" />
                <span>{t.cta2}</span>
              </button>
            </motion.div>

            {/* Brand Values / Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/60 max-w-lg text-left"
            >
              <div>
                <span className="block font-serif font-black text-xl text-olive-green">{t.trust1Label}</span>
                <span className="block text-[11px] font-display uppercase tracking-wider text-stone-500 mt-1">{t.trust1Sub}</span>
              </div>
              <div>
                <span className="block font-serif font-black text-xl text-olive-green">{t.trust2Label}</span>
                <span className="block text-[11px] font-display uppercase tracking-wider text-stone-500 mt-1">{t.trust2Sub}</span>
              </div>
              <div>
                <span className="block font-serif font-black text-xl text-olive-green">{t.trust3Label}</span>
                <span className="block text-[11px] font-display uppercase tracking-wider text-stone-500 mt-1">{t.trust3Sub}</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Cart Representation Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Visualizer Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-white/70 backdrop-blur-xs p-6 rounded-3xl border border-natural-border shadow-xl w-full max-w-[380px] flex flex-col space-y-4"
            >
              {/* Interactive Header */}
              <div className="flex items-center justify-end border-b border-natural-border pb-3">
                <Palette className="w-4 h-4 text-sage-green animate-bounce" />
              </div>

              {/* Cart Illustration itself */}
              <CartIllustration
                cartColor={cartColor}
                selectedSnacks={['fruit', 'sandwich', 'sweet', 'drink']}
                umbrellaStyle={umbrellaStyle}
              />

              {/* Theme Control Buttons */}
              <div className="space-y-3 pt-2 text-left">
                {/* 1. Paint Color Selection */}
                <div>
                  <span className="text-[10px] font-display uppercase tracking-wider text-stone-500 block mb-1.5 font-bold">
                    {t.cabinetColor} <span className="text-stone-800 lowercase font-medium">({cartColor})</span>
                  </span>
                  <div className="flex space-x-2">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setCartColor(c.value)}
                        className={`w-7 h-7 rounded-full ${c.bg} transition-all duration-200 transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                          cartColor === c.value ? 'ring-2 ring-offset-2 ring-olive-green scale-110' : 'opacity-80'
                        }`}
                        title={c.name}
                      >
                        {cartColor === c.value && (
                          <Check className={`w-3 h-3 ${c.value === 'cream' ? 'text-stone-800' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Umbrella style Selection */}
                <div>
                  <span className="text-[10px] font-display uppercase tracking-wider text-stone-500 block mb-1.5 font-bold">
                    {t.umbrellaAccent}
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {umbrellas.map((u) => (
                      <button
                        key={u.value}
                        onClick={() => setUmbrellaStyle(u.value as any)}
                        className={`px-2 py-1 text-[10px] font-semibold rounded-md border text-center transition-all cursor-pointer ${
                          umbrellaStyle === u.value
                            ? 'bg-olive-green text-white border-olive-green'
                            : 'bg-warm-cream/30 text-stone-600 border-stone-200 hover:bg-warm-cream/60'
                        }`}
                      >
                        {u.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
