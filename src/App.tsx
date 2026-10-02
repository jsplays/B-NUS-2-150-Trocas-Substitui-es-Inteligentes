/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { HealthDisclaimerBanner } from './components/HealthDisclaimerBanner';
import { DisclaimerModal } from './components/DisclaimerModal';
import { SwapList } from './components/SwapList';
import { MealBuilder } from './components/MealBuilder';
import { EconomyAndRestrictions } from './components/EconomyAndRestrictions';
import { GuidesSection } from './components/GuidesSection';
import { UserDiaryView } from './components/UserDiaryView';
import { useUserStore } from './hooks/useUserStore';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('trocas');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const {
    favorites,
    personalSwaps,
    topFiveCombos,
    toggleFavorite,
    addPersonalSwap,
    removePersonalSwap,
    updateTopFiveCombo,
  } = useUserStore();

  const handleQuickAddToDiary = (original: string, replacement: string) => {
    addPersonalSwap({
      originalFood: original,
      replacementFood: replacement,
      liked: true,
      notes: 'Salvo diretamente a partir da lista das 150 trocas.',
    });
  };

  const handleSaveMealToDiary = (original: string, replacement: string, notes?: string) => {
    addPersonalSwap({
      originalFood: original,
      replacementFood: replacement,
      liked: true,
      notes: notes || 'Combinação gerada no montador de refeições.',
    });
  };

  return (
    <div className="min-h-screen bg-stone-200/80 flex items-center justify-center p-0 md:p-6 antialiased text-stone-800">
      {/* Device Frame or Full Screen Container */}
      <div
        className={`w-full bg-stone-100 flex flex-col transition-all duration-300 relative ${
          isPhoneFrame
            ? 'max-w-[430px] h-[100dvh] md:h-[860px] md:rounded-[44px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] md:border-[10px] md:border-stone-900 overflow-hidden'
            : 'max-w-2xl min-h-screen shadow-md'
        }`}
      >
        {/* Simulated Mobile Status Bar (Visible in phone frame) */}
        {isPhoneFrame && (
          <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold text-stone-900 bg-white select-none">
            <span>09:41</span>
            {/* Dynamic Island / Notch Pill */}
            <div className="w-24 h-4 bg-stone-900 rounded-full" />
            <div className="flex items-center gap-1.5 text-stone-800">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Top Header */}
        <Header
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame((prev) => !prev)}
          onOpenSearch={() => setActiveTab('trocas')}
        />

        {/* Health Disclaimer Top Notice */}
        <HealthDisclaimerBanner onOpenModal={() => setIsDisclaimerOpen(true)} />

        {/* Main Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {activeTab === 'trocas' && (
            <SwapList
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onQuickAddToDiary={handleQuickAddToDiary}
            />
          )}

          {activeTab === 'montador' && (
            <MealBuilder onSaveToDiary={handleSaveMealToDiary} />
          )}

          {activeTab === 'economia' && <EconomyAndRestrictions />}

          {activeTab === 'guias' && <GuidesSection />}

          {activeTab === 'diario' && (
            <UserDiaryView
              favorites={favorites}
              personalSwaps={personalSwaps}
              topFiveCombos={topFiveCombos}
              onToggleFavorite={toggleFavorite}
              onAddPersonalSwap={addPersonalSwap}
              onRemovePersonalSwap={removePersonalSwap}
              onUpdateTopFiveCombo={updateTopFiveCombo}
            />
          )}
        </main>

        {/* Bottom Tab Bar Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          favoritesCount={favorites.length}
        />

        {/* Full Legal Health Disclaimer Modal */}
        <DisclaimerModal
          isOpen={isDisclaimerOpen}
          onClose={() => setIsDisclaimerOpen(false)}
        />
      </div>
    </div>
  );
}
