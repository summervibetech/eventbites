import React from 'react';
import { Mail, Instagram, MapPin } from 'lucide-react';
import eventBitesLogo from '../../assets/eventbites logo.png';
import translations from '../translations';
import type { Language } from '../translations';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  language: Language;
}

export default function Footer({ onNavigate, language }: FooterProps) {
  const t = translations[language].footer;

  const handleScrollTo = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="pt-16 pb-12 relative overflow-hidden text-left border-t-2 border-natural-border bg-soft-white">
      <div className="absolute -top-12 left-1/4 w-36 h-36 bg-sage-green/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 right-10 w-48 h-48 bg-olive-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-natural-border">

          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <img src={eventBitesLogo} alt="Event Bites" className="h-20 w-auto" />

            <p className="text-olive-green/80 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              {t.tagline}
            </p>
          </div>

          {/* Navigation Links Col (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold uppercase text-[11px] tracking-widest text-olive-green">
              {t.exploreServices}
            </h4>

            <ul className="space-y-2 text-xs text-olive-green/80 font-medium">
              <li>
                <button
                  onClick={() => handleScrollTo('home')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  {t.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('about')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('services')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  {t.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('perfect-for')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  {t.perfectFor}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('menu')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  {t.menuPlanner}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo('booking')}
                  className="hover:text-white hover:underline transition-all cursor-pointer"
                >
                  {t.bookDate}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-display font-bold uppercase text-[11px] tracking-widest text-olive-green">
              {t.getInTouch}
            </h4>
            <div className="space-y-3 text-xs text-olive-green">
              <a
                href="mailto:hello@eventbites.com"
                className="flex items-center space-x-2.5 hover:text-sage-green transition-colors"
              >
                <Mail className="w-4 h-4 text-sage-green" />
                <span className="font-semibold">hello@eventbites.com</span>
              </a>
              <a
                href="https://instagram.com/eventbites"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 hover:text-sage-green transition-colors"
              >
                <Instagram className="w-4 h-4 text-sage-green" />
                <span className="font-semibold">@eventbites</span>
              </a>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-sage-green" />
                <span className="font-semibold">{t.available}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 text-center text-xs text-olive-green/60">
          <p>{t.copyright}</p>
        </div>

      </div>
    </footer>
  );
}
