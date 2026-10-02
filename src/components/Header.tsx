import React from 'react';
import { Apple, ShieldAlert, Smartphone, Monitor, Search } from 'lucide-react';

interface Props {
  onOpenDisclaimer: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<Props> = ({
  onOpenDisclaimer,
  isPhoneFrame,
  onTogglePhoneFrame,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Apple className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                BÔNUS 2
              </span>
              <span className="text-[11px] text-stone-500 font-medium">150 Trocas</span>
            </div>
            <h1 className="text-sm font-bold text-stone-900 truncate">
              Substituições Inteligentes
            </h1>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              title="Buscar alimento nas 150 trocas"
              aria-label="Buscar substituições"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onOpenDisclaimer}
            title="Aviso de Saúde e Orientações Médicas"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors text-xs font-medium border border-amber-200/80"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Aviso Importante</span>
            <span className="sm:hidden">Aviso</span>
          </button>

          {/* Device Viewport Toggle (Desktop preview helper) */}
          <button
            onClick={onTogglePhoneFrame}
            title={isPhoneFrame ? 'Expandir para tela cheia' : 'Modo Simulador Smartphone'}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors border border-stone-200/60"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
