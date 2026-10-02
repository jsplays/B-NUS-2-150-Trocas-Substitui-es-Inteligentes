import React, { useState, useMemo } from 'react';
import { Search, X, Star, ArrowRight, Share2, Check, Sparkles, Filter } from 'lucide-react';
import { SUBSTITUTIONS_DATA, SubstitutionItem } from '../data/substitutions';

interface Props {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onQuickAddToDiary: (original: string, replacement: string) => void;
}

type CategoryFilter = 'all' | 'carbo' | 'protein' | 'dairy' | 'fats' | 'drinks' | 'favorites';

export const SwapList: React.FC<Props> = ({
  favorites,
  onToggleFavorite,
  onQuickAddToDiary,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const categories: { key: CategoryFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Todas', count: 150 },
    { key: 'carbo', label: 'Carboidratos', count: 70 },
    { key: 'protein', label: 'Proteínas', count: 30 },
    { key: 'dairy', label: 'Laticínios', count: 25 },
    { key: 'fats', label: 'Gorduras/Temperos', count: 15 },
    { key: 'drinks', label: 'Bebidas/Doces', count: 10 },
    { key: 'favorites', label: 'Favoritas', count: favorites.length },
  ];

  const filteredSwaps = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SUBSTITUTIONS_DATA.filter((item) => {
      // Category check
      if (selectedCategory === 'favorites') {
        if (!favorites.includes(item.id)) return false;
      } else if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // Search query check
      if (!q) return true;
      const matchOriginal = item.original.toLowerCase().includes(q);
      const matchReplacement = item.replacement.toLowerCase().includes(q);
      const matchTip = item.tip?.toLowerCase().includes(q) ?? false;
      const matchNumber = item.id.toString() === q;
      return matchOriginal || matchReplacement || matchTip || matchNumber;
    });
  }, [search, selectedCategory, favorites]);

  const handleShare = (item: SubstitutionItem) => {
    const text = `🔄 Substituição Inteligente #${item.id}:\nEm vez de: ${item.original}\n👉 Você pode usar: ${item.replacement}\n💡 Dica: ${item.tip || 'Adapte mantendo o equilíbrio!'}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      showToast('Copiado para a área de transferência!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="pb-24 pt-2">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-4 py-2 rounded-full shadow-lg transition-all animate-in fade-in slide-in-from-top-2">
          {toastMsg}
        </div>
      )}

      {/* Hero / Cover Banner */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white shadow-sm relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guia Prático do Cardápio</span>
          </div>
          <h2 className="text-lg font-bold leading-tight font-serif-display mb-1.5">
            150 Alternativas Inteligentes
          </h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            "Não encontrou um ingrediente? Adapte. O importante é manter a estrutura da refeição."
          </p>
        </div>
      </div>

      {/* Barra de Pesquisa e Filtragem Solta (sem fixação/sticky) */}
      <div className="mx-4 mb-3 p-3 bg-white rounded-2xl border border-stone-200/90 shadow-xs">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar alimento (arroz, batata, ovo, atum...)"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-9 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 p-1 text-stone-400 hover:text-stone-600"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70 border border-transparent'
                }`}
              >
                {cat.key === 'favorites' && <Star className="w-3 h-3 fill-current text-amber-400" />}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200/80 text-stone-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Counter summary */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-stone-500">
        <span>
          Exibindo <strong>{filteredSwaps.length}</strong> {filteredSwaps.length === 1 ? 'troca' : 'trocas'}
        </span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-emerald-700 hover:underline font-medium text-[11px]"
          >
            Ver todas as 150
          </button>
        )}
      </div>

      {/* Swaps Grid / List */}
      <div className="px-4 space-y-3">
        {filteredSwaps.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
            <Filter className="w-8 h-8 text-stone-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-stone-800 mb-1">Nenhuma substituição encontrada</h4>
            <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
              Tente buscar por termos mais genéricos como "carne", "pão", "leite" ou limpe os filtros.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          filteredSwaps.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs hover:border-emerald-300/60 transition-all flex flex-col justify-between"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-800 font-bold text-[11px]">
                      #{item.id.toString().padStart(3, '0')}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-[11px] font-medium text-stone-500">{item.categoryLabel}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-[10px] text-stone-400">Página {item.page}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav ? 'text-amber-500 hover:text-amber-600' : 'text-stone-300 hover:text-stone-500'
                      }`}
                      title={isFav ? 'Remover dos favoritos' : 'Favoritar troca'}
                      aria-label="Favoritar"
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleShare(item)}
                      className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg transition-colors"
                      title="Copiar substituição"
                      aria-label="Copiar"
                    >
                      {copiedId === item.id ? (
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
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500/90 block mb-0.5">
                        Em vez de:
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-stone-700 leading-snug line-through decoration-rose-400/60">
                        {item.original}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="w-7 h-7 rounded-full bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
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
                  <p className="text-xs text-stone-600 leading-relaxed mb-3 pl-2 border-l-2 border-emerald-500/40">
                    <span className="font-medium text-stone-700">💡 Como aproveitar:</span> {item.tip}
                  </p>
                )}

                {/* Bottom Card Actions */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Adapte a quantidade à sua fome
                  </span>
                  <button
                    onClick={() => {
                      onQuickAddToDiary(item.original, item.replacement);
                      showToast('Adicionado ao seu Diário!');
                    }}
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 px-2.5 py-1 rounded-md transition-colors"
                  >
                    + Registrar no Diário
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
