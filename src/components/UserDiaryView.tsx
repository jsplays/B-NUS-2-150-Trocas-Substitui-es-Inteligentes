import React, { useState } from 'react';
import { BookmarkCheck, Plus, Trash2, ThumbsUp, ThumbsDown, Star, Share2, Check, ArrowRight } from 'lucide-react';
import { PersonalSwap } from '../types';
import { SUBSTITUTIONS_DATA } from '../data/substitutions';

interface Props {
  favorites: number[];
  personalSwaps: PersonalSwap[];
  topFiveCombos: string[];
  onToggleFavorite: (id: number) => void;
  onAddPersonalSwap: (swap: Omit<PersonalSwap, 'id' | 'createdAt'>) => void;
  onRemovePersonalSwap: (id: string) => void;
  onUpdateTopFiveCombo: (index: number, value: string) => void;
}

export const UserDiaryView: React.FC<Props> = ({
  favorites,
  personalSwaps,
  topFiveCombos,
  onToggleFavorite,
  onAddPersonalSwap,
  onRemovePersonalSwap,
  onUpdateTopFiveCombo,
}) => {
  const [activeTab, setActiveTab] = useState<'log' | 'top5' | 'starred'>('log');

  // Form State
  const [originalFood, setOriginalFood] = useState('');
  const [replacementFood, setReplacementFood] = useState('');
  const [liked, setLiked] = useState(true);
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalFood.trim() || !replacementFood.trim()) return;

    onAddPersonalSwap({
      originalFood: originalFood.trim(),
      replacementFood: replacementFood.trim(),
      liked,
      notes: notes.trim() || undefined,
    });

    setOriginalFood('');
    setReplacementFood('');
    setNotes('');
    setShowAddForm(false);
  };

  const favoriteItems = SUBSTITUTIONS_DATA.filter((item) => favorites.includes(item.id));

  const handleExportText = () => {
    let text = `📋 MEU DIÁRIO DE SUBSTITUIÇÕES INTELIGENTES\n\n`;
    text += `🌟 MINHAS 5 COMBINAÇÕES FAVORITAS:\n`;
    topFiveCombos.forEach((combo, idx) => {
      if (combo.trim()) {
        text += `${idx + 1}. ${combo}\n`;
      }
    });

    text += `\n📝 TROCAS TESTADAS:\n`;
    personalSwaps.forEach((swap, idx) => {
      text += `${idx + 1}. De ${swap.originalFood} ➔ Para ${swap.replacementFood} (${swap.liked ? 'Aprovada 👍' : 'Não gostei 👎'})\n`;
      if (swap.notes) text += `   Nota: ${swap.notes}\n`;
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-xl mx-auto space-y-4">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
            Página 15 · Caderno Pessoal
          </span>
          <button
            onClick={handleExportText}
            className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold px-2.5 py-1 rounded-lg transition-colors"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Copiado!' : 'Exportar Lista'}</span>
          </button>
        </div>
        <h2 className="text-base font-bold text-stone-900 mb-1">
          Registro Pessoal de Substituições
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          Anote as trocas que você testou em casa, avalie se gostou e salve seu top 5 de combinações favoritas.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-200/70 rounded-xl">
        <button
          onClick={() => setActiveTab('log')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'log'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Trocas ({personalSwaps.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('top5')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'top5'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <span className="text-amber-500 font-bold">5★</span>
          <span>Top 5 Combos</span>
        </button>
        <button
          onClick={() => setActiveTab('starred')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'starred'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>Favoritas ({favorites.length})</span>
        </button>
      </div>

      {/* TAB 1: TROCAS TESTADAS */}
      {activeTab === 'log' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">Histórico de experimentos</span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Troca</span>
            </button>
          </div>

          {/* Form Modal / Inline drawer */}
          {showAddForm && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 border border-emerald-300 shadow-xs space-y-3 animate-in fade-in">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                Registrar Nova Substituição
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Alimento que quero trocar:
                </label>
                <input
                  type="text"
                  required
                  value={originalFood}
                  onChange={(e) => setOriginalFood(e.target.value)}
                  placeholder="Ex: Arroz branco, Leite de vaca, Pão..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Alternativa que funcionou:
                </label>
                <input
                  type="text"
                  required
                  value={replacementFood}
                  onChange={(e) => setReplacementFood(e.target.value)}
                  placeholder="Ex: Batata-doce assada, Bebida de aveia..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Gostei do resultado?
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLiked(true)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      liked
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sim, aprovado!</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiked(false)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      !liked
                        ? 'bg-rose-50 border-rose-400 text-rose-800'
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-500" />
                    <span>Não gostei</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Observações / Dica de tempero (opcional):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Ficou ótimo com orégano e azeite"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-800 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Salvar Troca
                </button>
              </div>
            </form>
          )}

          {/* List of personal swaps */}
          {personalSwaps.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-200">
              <p className="text-xs text-stone-500 mb-3">
                Você ainda não registrou nenhuma troca pessoal.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
              >
                + Registrar minha primeira troca
              </button>
            </div>
          ) : (
            personalSwaps.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs space-y-2 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-stone-700">{item.originalFood}</span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                    <span className="text-emerald-800">{item.replacementFood}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        item.liked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.liked ? (
                        <>
                          <ThumbsUp className="w-2.5 h-2.5" /> Aprovado
                        </>
                      ) : (
                        <>
                          <ThumbsDown className="w-2.5 h-2.5" /> Não curti
                        </>
                      )}
                    </span>
                    <button
                      onClick={() => onRemovePersonalSwap(item.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded-md"
                      title="Excluir"
                      aria-label="Excluir troca"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-stone-600 bg-stone-50 p-2 rounded-lg leading-relaxed">
                    📝 {item.notes}
                  </p>
                )}

                <div className="text-[10px] text-stone-400">
                  Registrado em {item.createdAt}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: MINHAS 5 COMBINAÇÕES FAVORITAS */}
      {activeTab === 'top5' && (
        <div className="space-y-3">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed">
            ⭐ <strong>Página 15 · Minhas cinco combinações favoritas:</strong> Digite e personalize seus pratos campeões do dia a dia.
          </div>

          <div className="space-y-2.5">
            {topFiveCombos.map((combo, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-stone-200 space-y-1 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={combo}
                    onChange={(e) => onUpdateTopFiveCombo(idx, e.target.value)}
                    placeholder={`Ex: Minha combinação favorita ${idx + 1}...`}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FAVORITAS DA BASE */}
      {activeTab === 'starred' && (
        <div className="space-y-3">
          <span className="text-xs text-stone-500 block">
            Substituições marcadas com estrela entre as 150
          </span>

          {favoriteItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-200">
              <Star className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <p className="text-xs text-stone-500 mb-1">
                Nenhuma substituição favoritada ainda.
              </p>
              <p className="text-[11px] text-stone-400">
                Toque no ícone de estrela nas 150 trocas para salvar aqui suas favoritas!
              </p>
            </div>
          ) : (
            favoriteItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs flex items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="font-bold text-stone-800 line-through decoration-rose-400/50">
                      {item.original}
                    </span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                    <span className="font-bold text-emerald-800">{item.replacement}</span>
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    #{item.id} · {item.categoryLabel}
                  </span>
                </div>
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className="p-2 text-amber-500 hover:text-amber-600"
                  aria-label="Desfavoritar"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
