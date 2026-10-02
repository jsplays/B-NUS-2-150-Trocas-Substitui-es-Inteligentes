import React from 'react';
import { ArrowRight, Star, Share2, Check, CornerDownRight } from 'lucide-react';
import { SubstitutionItem } from '../data/substitutions';

interface Props {
  item: SubstitutionItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onQuickAddToDiary: (original: string, replacement: string) => void;
  onShare: (item: SubstitutionItem) => void;
  isCopied: boolean;
}

export const SwapCardItem = React.memo<Props>(({
  item,
  isFavorite,
  onToggleFavorite,
  onQuickAddToDiary,
  onShare,
  isCopied,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between">
      {/* Meta Header */}
      <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-emerald-800 font-bold text-xs bg-emerald-50 px-1.5 py-0.5 rounded">
            #{item.id.toString().padStart(3, '0')}
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-[11px] font-semibold text-stone-600">{item.categoryLabel}</span>
          <span className="text-stone-300">·</span>
          <span className="text-[10px] text-stone-400">Pág. {item.page}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onToggleFavorite(item.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isFavorite ? 'text-amber-500 hover:text-amber-600' : 'text-stone-300 hover:text-stone-500'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Favoritar troca'}
            aria-label="Favoritar"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
          <button
            type="button"
            onClick={() => onShare(item)}
            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg transition-colors"
            title="Copiar substituição"
            aria-label="Copiar"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Swap Comparison Box */}
      <div className="bg-stone-50/80 rounded-xl p-3 border border-stone-100 mb-2.5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Original */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 block mb-0.5">
              Em vez de:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stone-700 leading-snug line-through decoration-rose-400/80">
              {item.original}
            </p>
          </div>

          {/* Arrow */}
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          {/* Replacement */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block mb-0.5">
              Você pode usar:
            </span>
            <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
              {item.replacement}
            </p>
          </div>
        </div>
      </div>

      {/* Practical Tip */}
      {item.tip && (
        <p className="text-xs text-stone-600 leading-relaxed mb-3 pl-2.5 border-l-2 border-emerald-500/50">
          <span className="font-semibold text-stone-700">💡 Como aproveitar:</span> {item.tip}
        </p>
      )}

      {/* Bottom Card Actions */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[11px] text-stone-400">
          Ajuste à sua fome real
        </span>
        <button
          type="button"
          onClick={() => onQuickAddToDiary(item.original, item.replacement)}
          className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors"
        >
          <CornerDownRight className="w-3 h-3" />
          <span>Salvar no Diário</span>
        </button>
      </div>
    </div>
  );
});
SwapCardItem.displayName = 'SwapCardItem';
