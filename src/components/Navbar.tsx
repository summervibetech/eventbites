import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import eventBitesLogo from '../../assets/eventbites logo.png';
import translations from '../translations';
import type { Language } from '../translations';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  language: Language;
  onToggleLanguage: () => void;
}

export default function Navbar({
  onNavigate,
  activeSection,
  language,
  onToggleLanguage,
}: NavbarProps) {
  const t = translations[language].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.home, id: 'home' },
    { label: t.about, id: 'about' },
    { label: t.whatWeDo, id: 'services' },
    { label: t.perfectFor, id: 'perfect-for' },
    { label: t.snackMenu, id: 'menu' },
    { label: t.howItWorks, id: 'how-it-works' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-soft-white/95 backdrop-blur-md shadow-xs border-b border-natural-border py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleItemClick('home')}
              className="flex items-center cursor-pointer group"
            >
              <img
                src={eventBitesLogo}
                alt="Event Bites"
                className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-sage-green text-soft-white font-semibold'
                      : 'text-stone-600 hover:text-olive-green hover:bg-warm-cream/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Toggle */}
              <button
                onClick={onToggleLanguage}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-warm-cream hover:bg-warm-cream/80 text-stone-700 text-xs font-semibold tracking-wide border border-natural-border transition-all cursor-pointer shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-sage-green" />
                <span>{t.toggleLang}</span>
              </button>

              {/* Booking Button */}
              <button
                onClick={() => handleItemClick('booking')}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-sage-green hover:bg-olive-green text-soft-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.book}</span>
              </button>
            </div>

            {/* Mobile Navigation Toggles */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={onToggleLanguage}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-warm-cream text-stone-700 text-xs font-semibold border border-natural-border cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-sage-green" />
                <span>{language === 'en' ? 'ES' : 'EN'}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-warm-cream text-charcoal-text cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-soft-white border-b border-natural-border shadow-lg overflow-hidden md:hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                    activeSection === item.id
                      ? 'bg-sage-green text-soft-white'
                      : 'text-stone-700 hover:bg-warm-cream/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-warm-cream flex flex-col space-y-2">
                <button
                  onClick={() => handleItemClick('booking')}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3.5 rounded-xl bg-sage-green text-soft-white text-sm font-semibold shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.book}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
