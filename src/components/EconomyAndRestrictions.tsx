import React, { useState } from 'react';
import { PiggyBank, ShieldCheck, AlertTriangle, ArrowRight, Search, CheckCircle2, X } from 'lucide-react';
import { ECONOMIC_SWAPS } from '../data/substitutions';
import { normalizeSearchTerm } from '../utils/search';

type SubTab = 'economy' | 'restrictions';

export const EconomyAndRestrictions: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('economy');
  const [econSearch, setEconSearch] = useState('');

  const filteredEconSwaps = ECONOMIC_SWAPS.filter((item) => {
    const q = normalizeSearchTerm(econSearch);
    if (!q) return true;
    const expNorm = normalizeSearchTerm(item.expensive);
    const ecoNorm = normalizeSearchTerm(item.economic);
    const whyNorm = normalizeSearchTerm(item.whySave);
    const tokens = q.split(/\s+/).filter(Boolean);
    return tokens.every((token) => expNorm.includes(token) || ecoNorm.includes(token) || whyNorm.includes(token));
  });

  return (
    <div className="pb-24 pt-2 px-4 max-w-xl mx-auto space-y-4">
      {/* Subtab Switch */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-200/70 rounded-xl">
        <button
          onClick={() => setActiveSubTab('economy')}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'economy'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <PiggyBank className="w-4 h-4 text-emerald-600" />
          <span>Economia (20 Trocas)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('restrictions')}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'restrictions'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Restrições Comuns</span>
        </button>
      </div>

      {/* VIEW 1: ECONOMIA INTELIGENTE */}
      {activeSubTab === 'economy' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Página 10 · Guia Econômico
            </span>
            <h2 className="text-base font-bold text-stone-900 mb-1">
              Substituições Econômicas
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Comprar alimentos da estação, cozinhar em maior quantidade e aproveitar sobras planejadas reduz o orçamento sem abrir mão de nutrientes de alto valor.
            </p>
          </div>

          {/* Search box for economic swaps */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              inputMode="search"
              value={econSearch}
              onChange={(e) => setEconSearch(e.target.value)}
              placeholder="Buscar item caro ou alternativa econômica..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-9 py-2.5 text-base sm:text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
            />
            {econSearch && (
              <button
                type="button"
                onClick={() => setEconSearch('')}
                className="absolute right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-stone-200/70 text-stone-600 hover:bg-stone-300 transition-colors"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {filteredEconSwaps.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs flex flex-col gap-2 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  {/* Expensive */}
                  <div className="flex-1 pr-2">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">
                      Mais caro
                    </span>
                    <span className="font-semibold text-rose-800 line-through decoration-rose-300 text-xs sm:text-sm">
                      {item.expensive}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    <ArrowRight className="w-3 h-3" />
                  </div>

                  {/* Economic */}
                  <div className="flex-1 pl-3 text-right">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                      Econômica
                    </span>
                    <span className="font-bold text-emerald-900 text-xs sm:text-sm">
                      {item.economic}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg leading-relaxed border border-stone-100">
                  💰 <span className="font-medium text-stone-700">Vantagem:</span> {item.whySave}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: RESTRIÇÕES COMUNS */}
      {activeSubTab === 'restrictions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block mb-1">
              Página 9 · Intolerâncias & Dietas
            </span>
            <h2 className="text-base font-bold text-stone-900 mb-1">
              Substituições para Restrições
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Alternativas seguras para quem não consome lactose, carne ou glúten, mantendo o prato nutritivo e completo.
            </p>
          </div>

          {/* 1. Sem Lactose */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold">
                🥛
              </div>
              <h3 className="text-sm font-bold text-stone-900">1. Sem Lactose</h3>
            </div>

            <p className="text-xs text-stone-600">
              Possíveis alternativas para compor suas refeições:
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-700">
              {[
                'Leite sem lactose',
                'Iogurte sem lactose',
                'Bebida de soja',
                'Bebida de aveia',
                'Bebida de amêndoas',
                'Tofu temperado',
                'Frutas frescas',
                'Ovos cozidos/mexidos',
                'Carnes e peixes',
                'Feijões e lentilhas',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="text-[11px] font-medium truncate">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção:</strong> Nem todo produto “sem lactose” é livre de leite. Se houver suspeita de alergia à proteína do leite (APLV), leia atentamente o rótulo e procure acompanhamento profissional.
              </span>
            </div>
          </div>

          {/* 2. Sem Carne */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                🌱
              </div>
              <h3 className="text-sm font-bold text-stone-900">2. Sem Carne (Vegetariano / Plant-Based)</h3>
            </div>

            <p className="text-xs text-stone-600">
              Fontes ricas em proteína vegetal e derivados:
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-700">
              {[
                'Ovos caipiras/comuns',
                'Leite e derivados',
                'Feijão (preto, carioca, fradinho)',
                'Lentilha',
                'Grão-de-bico',
                'Ervilha fresca/seca',
                'Tofu em cubos ou fatias',
                'Soja texturizada (PTS)',
                'Tempeh fermentado',
                'Castanhas e sementes',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-medium truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sem Glúten */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                🌾
              </div>
              <h3 className="text-sm font-bold text-stone-900">3. Sem Glúten (Celíacos & Sensibilidade)</h3>
            </div>

            <p className="text-xs text-stone-600">
              Alimentos naturalmente livres de glúten:
            </p>

            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-700">
              {[
                'Arroz (todos os tipos)',
                'Milho e cuscuz de milho',
                'Mandioca e tapioca',
                'Batata e batata-doce',
                'Inhame e cará',
                'Quinoa em grãos',
                'Frutas variadas',
                'Verduras e legumes',
                'Carnes, aves e peixes',
                'Feijões e leguminosas',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-[11px] font-medium truncate">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <span>
                <strong>Alerta Celíaco:</strong> Em caso de doença celíaca, a contaminação cruzada (utensílios, torradeiras, óleos compartilhados) deve ser rigorosamente evitada com supervisão de especialista.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
