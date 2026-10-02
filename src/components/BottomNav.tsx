import React from 'react';
import { ArrowLeftRight, Utensils, PiggyBank, BookOpen, BookmarkCheck } from 'lucide-react';

export type TabKey = 'trocas' | 'montador' | 'economia' | 'guias' | 'diario';

interface Props {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onTabChange, favoritesCount }) => {
  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { key: 'trocas', label: '150 Trocas', icon: ArrowLeftRight },
    { key: 'montador', label: 'Montador', icon: Utensils },
    { key: 'economia', label: 'Economia', icon: PiggyBank },
    { key: 'guias', label: 'Guias', icon: BookOpen },
    { key: 'diario', label: 'Meu Diário', icon: BookmarkCheck, badge: favoritesCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg">
      <div className="max-w-xl mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`relative flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
                isActive ? 'text-emerald-700 font-semibold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-full px-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
