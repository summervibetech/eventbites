import React from 'react';
import { motion } from 'motion/react';
import { Cherry, Coffee, Sandwich, Cookie, Sparkles } from 'lucide-react';
import eventBitesLogo from '../../assets/eventbites logo.png';

interface CartIllustrationProps {
  cartColor: string; // 'sage' | 'olive' | 'cream' | 'sand' | 'rose'
  selectedSnacks: string[];
  umbrellaStyle?: 'striped-cream' | 'striped-green' | 'solid-cream' | 'terracotta';
}

export default function CartIllustration({
  cartColor,
  selectedSnacks,
  umbrellaStyle = 'striped-cream',
}: CartIllustrationProps) {
  // Map color names to Tailwind colors
  const colorMap: Record<string, { bg: string; border: string; accent: string; text: string }> = {
    sage: {
      bg: '#5d6d5a',
      border: '#4a5848',
      accent: '#f7f4ef',
      text: '#ffffff',
    },
    olive: {
      bg: '#4a5848',
      border: '#3c473a',
      accent: '#d6ccb1',
      text: '#ffffff',
    },
    cream: {
      bg: '#f7f4ef',
      border: '#e0d9cf',
      accent: '#5d6d5a',
      text: '#2d2a26',
    },
    sand: {
      bg: '#efebe3',
      border: '#e0d9cf',
      accent: '#4a5848',
      text: '#2d2a26',
    },
    rose: {
      bg: '#b5835a',
      border: '#9a6c46',
      accent: '#f7f4ef',
      text: '#ffffff',
    },
  };

  const selectedColors = colorMap[cartColor] || colorMap.sage;

  // Determine which food items are visible on the cart counter
  const hasFruit = selectedSnacks.some(s => s.toLowerCase().includes('fruit') || s.toLowerCase().includes('crudité'));
  const hasSandwich = selectedSnacks.some(s => s.toLowerCase().includes('sandwich') || s.toLowerCase().includes('savory'));
  const hasSweet = selectedSnacks.some(s => s.toLowerCase().includes('sweet') || s.toLowerCase().includes('pastr') || s.toLowerCase().includes('dessert'));
  const hasBeverage = selectedSnacks.some(s => s.toLowerCase().includes('drink') || s.toLowerCase().includes('beverage') || s.toLowerCase().includes('cup'));

  // Define umbrella stripes colors
  const getUmbrellaColors = () => {
    switch (umbrellaStyle) {
      case 'striped-green':
        return ['#5d6d5a', '#fbfaf8', '#5d6d5a', '#fbfaf8', '#5d6d5a', '#fbfaf8', '#5d6d5a'];
      case 'terracotta':
        return ['#b5835a', '#fbfaf8', '#b5835a', '#fbfaf8', '#b5835a', '#fbfaf8', '#b5835a'];
      case 'solid-cream':
        return ['#f7f4ef', '#fbfaf8', '#f7f4ef', '#fbfaf8', '#f7f4ef', '#fbfaf8', '#f7f4ef'];
      case 'striped-cream':
      default:
        return ['#d6ccb1', '#fbfaf8', '#d6ccb1', '#fbfaf8', '#d6ccb1', '#fbfaf8', '#d6ccb1'];
    }
  };

  const stripes = getUmbrellaColors();

  return (
    <div id="cart-visualizer" className="relative w-full max-w-md mx-auto aspect-[4/5] flex flex-col items-center justify-end p-4 select-none">
      {/* Sun Ray Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-100/40 blur-3xl -z-10" />

      {/* 1. UMBRELLA (SWAYING IN GENTLE BREEZE) */}
      <motion.div
        className="absolute top-2 w-full max-w-[340px] flex flex-col items-center z-10"
        animate={{ y: [0, -3, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Umbrella Cap / Top Finial */}
        <div className="w-5 h-6 rounded-t-full bg-amber-800 border border-amber-950/20 shadow-sm" />

        {/* Umbrella Canopy */}
        <div className="relative w-full aspect-[4/1.8] overflow-hidden rounded-t-[140px] border-b-4 border-amber-900/10 shadow-lg flex">
          {stripes.map((stripeColor, i) => (
            <div
              key={i}
              className="h-full flex-1"
              style={{
                backgroundColor: stripeColor,
                boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.03), inset -2px 0 4px rgba(0,0,0,0.03)',
              }}
            />
          ))}

          {/* Highlights */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
        </div>

        {/* Tassels / Fringe (Swaying details) */}
        <div className="w-full flex justify-between px-1 -mt-1 h-5 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-5 h-4 bg-amber-50 rounded-b-full border-t border-amber-200/50 shadow-sm flex items-center justify-center flex-shrink-0"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            >
              {/* Little tassel fringe thread */}
              <div className="w-0.5 h-2 bg-amber-200/60 mt-1" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 2. UMBRELLA POLE */}
      <div className="absolute top-[100px] bottom-24 w-2 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-400 border-l border-r border-stone-400/20 z-0 shadow-inner" />

      {/* 3. CART COUNTER TOP & DISPLAY STAND */}
      <div className="w-full max-w-[310px] z-20">
        {/* Items sitting right on the counter surface */}
        <div className="flex justify-around items-end px-2 h-6">
          {hasFruit && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-end">
              <div className="relative w-11 h-5 bg-amber-800 rounded-b-xl border border-amber-900 shadow-md">
                <div className="absolute -top-2 left-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
                <div className="absolute -top-2 left-2.5 w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="absolute -top-1.5 left-5 w-2.5 h-2.5 bg-lime-500 rounded-full" />
                <div className="absolute -top-2 left-7 w-2.5 h-2.5 bg-emerald-600 rounded-full" />
              </div>
            </motion.div>
          )}
          {hasSandwich && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-end">
              <div className="w-12 h-5 bg-white border border-stone-200 rounded shadow flex items-center justify-center space-x-0.5 px-1">
                <div className="w-3 h-4 bg-amber-100 border-l-2 border-r-2 border-emerald-500 rounded-sm transform skew-y-6" />
                <div className="w-3 h-4 bg-amber-50 border-l-2 border-r-2 border-emerald-500 rounded-sm transform -skew-y-3" />
                <div className="w-3 h-4 bg-amber-100 border-l-2 border-r-2 border-emerald-500 rounded-sm transform skew-y-6" />
              </div>
            </motion.div>
          )}
          {hasSweet && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-end">
              <div className="flex space-x-0.5 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-pink-400 border border-pink-500" />
                <div className="w-2.5 h-2 rounded-md bg-amber-500 border border-amber-600" />
                <div className="w-2 h-2 rounded-full bg-violet-400 border border-violet-500" />
              </div>
              <div className="w-1 h-2 bg-rose-200 border-l border-r border-rose-300" />
              <div className="w-10 h-1 bg-rose-100 border border-rose-200 rounded-full" />
            </motion.div>
          )}
          {hasBeverage && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-end">
              <div className="relative w-6 h-6 bg-teal-100/60 border border-teal-200/50 rounded shadow-md">
                <div className="absolute bottom-0 inset-x-0 h-3 bg-amber-400/70 rounded-b flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-200 border border-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div className="absolute bottom-0.5 -left-1 w-2 h-1 bg-stone-400 rounded-l" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Counter Surface with labels */}
        <div className="w-full h-6 rounded bg-amber-50 border-b border-stone-300 shadow-md flex items-center justify-around px-2">
          {hasFruit && <span className="text-[9px] text-stone-600 font-bold whitespace-nowrap">Fruit</span>}
          {hasSandwich && <span className="text-[9px] text-stone-600 font-bold whitespace-nowrap">Bites</span>}
          {hasSweet && <span className="text-[9px] text-stone-600 font-bold whitespace-nowrap">Sweets</span>}
          {hasBeverage && <span className="text-[9px] text-stone-600 font-bold whitespace-nowrap">Drinks</span>}
        </div>
      </div>

      {/* 4. MAIN CART BODY CABINET */}
      <motion.div
        className="relative w-full max-w-[280px] h-32 rounded-lg border-2 z-10 shadow-xl overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: selectedColors.bg,
          borderColor: selectedColors.border,
        }}
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Subtle diagonal stripe overlay for premium organic feel */}
        <div className="absolute inset-0 bg-linear-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />

        {/* Traditional Wood Shaker Frame Detailing */}
        <div className="absolute inset-2 border rounded border-white/20 pointer-events-none" />

        {/* Top Trim Header */}
        <div
          className="w-full h-3 border-b"
          style={{
            backgroundColor: selectedColors.border,
            borderColor: selectedColors.border,
          }}
        />

        {/* BRAND LOGO on cart body */}
        <div className="flex-1 flex flex-col items-center justify-center p-3 relative z-10">
          <motion.img
            src={eventBitesLogo}
            alt="Event Bites"
            className="w-28 select-none"
            animate={{ rotate: [-0.5, 0.5, -0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Bottom Trim Footer */}
        <div
          className="w-full h-4 border-t flex justify-around px-8 items-center"
          style={{
            backgroundColor: selectedColors.border,
            borderColor: selectedColors.border,
          }}
        >
          {/* Decorative brass rivets */}
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
        </div>
      </motion.div>

      {/* 5. CART PUSH HANDLE */}
      <div className="absolute right-[4px] bottom-14 w-8 h-12 flex flex-col justify-between items-start z-0">
        <div className="w-6 h-1.5 bg-stone-400 rounded" />
        <div className="w-1.5 h-10 bg-stone-500 rounded ml-2" />
        <div className="w-6 h-1.5 bg-stone-400 rounded" />
      </div>

      {/* 6. VINTAGE SPOKED WOODEN WHEELS */}
      <div className="relative w-full max-w-[280px] h-10 flex justify-around px-4 z-20">
        {/* Left Wheel */}
        <motion.div
          className="w-16 h-16 rounded-full bg-amber-50 border-[5px] border-amber-900 shadow-md flex items-center justify-center -mt-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Wheel Axle Hub */}
          <div className="w-4 h-4 rounded-full bg-amber-950 border border-amber-900 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          </div>
          {/* Spokes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-12 bg-amber-900/60"
              style={{
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
          {/* Outer tread line */}
          <div className="absolute inset-0 rounded-full border border-amber-950/20" />
        </motion.div>

        {/* Right Wheel */}
        <motion.div
          className="w-16 h-16 rounded-full bg-amber-50 border-[5px] border-amber-900 shadow-md flex items-center justify-center -mt-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Wheel Axle Hub */}
          <div className="w-4 h-4 rounded-full bg-amber-950 border border-amber-900 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
          </div>
          {/* Spokes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-12 bg-amber-900/60"
              style={{
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
          {/* Outer tread line */}
          <div className="absolute inset-0 rounded-full border border-amber-950/20" />
        </motion.div>
      </div>

      {/* Cart Ground Shadow */}
      <div className="w-64 h-2 bg-stone-900/10 rounded-full blur-xs mx-auto -mt-1 -z-10" />
    </div>
  );
}
