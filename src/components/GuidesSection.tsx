import React, { useState } from 'react';
import { BookOpen, CheckSquare, UtensilsCrossed, Sparkles, ChefHat, Check, HeartHandshake } from 'lucide-react';
import { FLAVOR_VARIATIONS, CHECKLIST_ITEMS } from '../data/substitutions';

type GuideTopic = 'howTo' | 'recipes' | 'eatingOut' | 'flavors' | 'checklist' | 'final';

export const GuidesSection: React.FC = () => {
  const [topic, setTopic] = useState<GuideTopic>('howTo');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const resetChecklist = () => setCheckedItems([]);

  return (
    <div className="pb-24 pt-2 px-4 max-w-xl mx-auto space-y-4">
      {/* Category Horizontal Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
        {[
          { key: 'howTo' as GuideTopic, label: 'Como Usar', icon: BookOpen },
          { key: 'recipes' as GuideTopic, label: 'Nas Receitas', icon: ChefHat },
          { key: 'eatingOut' as GuideTopic, label: 'Comer Fora', icon: UtensilsCrossed },
          { key: 'flavors' as GuideTopic, label: 'Variar Sabor', icon: Sparkles },
          { key: 'checklist' as GuideTopic, label: 'Checklist', icon: CheckSquare },
          { key: 'final' as GuideTopic, label: 'Filosofia', icon: HeartHandshake },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = topic === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setTopic(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOPIC 1: COMO USAR */}
      {topic === 'howTo' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Página 2 · Princípios Básicos
            </span>
            <h2 className="text-base font-bold text-stone-900 mb-1.5">
              Como Usar as Substituições
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              As trocas deste material servem para facilitar sua rotina. Elas não são equivalências nutricionais exatas de laboratório.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Escolha a alternativa que:
            </h3>

            <div className="space-y-2">
              {[
                { title: 'Você tem disponível em casa', desc: 'Evite estresse ou idas de emergência ao mercado.' },
                { title: 'Cabe no seu orçamento familiar', desc: 'Alimentação sustentável é aquela que cabe no bolso todos os meses.' },
                { title: 'Combina com sua cultura e raízes', desc: 'Respeite os costumes da sua região (mandioca, cuscuz, peixes locais).' },
                { title: 'Atende às suas preferências de sabor', desc: 'Comer com prazer é fundamental para a constância.' },
                { title: 'Não oferece risco de alergia ou intolerância', desc: 'Sua segurança digestiva e biológica vem sempre em 1º lugar.' },
                { title: 'Funciona melhor para sua rotina diária', desc: 'Dias corridos pedem preparos rápidos (latas, ovos mexidos).' },
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-800">{rule.title}</h4>
                    <p className="text-[11px] text-stone-500 leading-snug">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
            💡 <strong>Regra de ouro da fome:</strong> Ao trocar um alimento por outro, ajuste a quantidade conforme sua fome real. Uma substituição não precisa ocupar exatamente o mesmo volume no prato.
          </div>
        </div>
      )}

      {/* TOPIC 2: NAS RECEITAS */}
      {topic === 'recipes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Página 11 · Adaptação Prática
            </span>
            <h2 className="text-base font-bold text-stone-900 mb-1.5">
              Substituições nas Receitas
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Veja como transformar qualquer receita quando faltar algum ingrediente no armário:
            </p>
          </div>

          {/* Exemplo 1 */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-900">Exemplo 1 — Almoço</h3>
              <span className="text-[10px] bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded-md">Prato Principal</span>
            </div>
            <div className="text-xs text-stone-600 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
              <span className="font-semibold text-rose-900 block mb-0.5">Receita original:</span>
              Arroz + feijão + frango + salada.
            </div>
            <div className="text-xs text-stone-700 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
              <span className="font-semibold text-emerald-900 block mb-0.5">Possíveis adaptações práticas:</span>
              • Arroz por batata cozida ou assada<br />
              • Frango por ovos mexidos ou cozidos<br />
              • Feijão por lentilha<br />
              • Salada crua por legumes cozidos no vapor
            </div>
          </div>

          {/* Exemplo 2 */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-900">Exemplo 2 — Café da Manhã</h3>
              <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-md">Manhã</span>
            </div>
            <div className="text-xs text-stone-600 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
              <span className="font-semibold text-rose-900 block mb-0.5">Receita original:</span>
              Pão francês + queijo branco + fatia de mamão.
            </div>
            <div className="text-xs text-stone-700 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
              <span className="font-semibold text-emerald-900 block mb-0.5">Possíveis adaptações práticas:</span>
              • Pão por cuscuz quentinho ou tapioca<br />
              • Queijo por ovo frito com fio de azeite<br />
              • Mamão por banana ou laranja em gomos
            </div>
          </div>

          {/* Exemplo 3 */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-900">Exemplo 3 — Lanche</h3>
              <span className="text-[10px] bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded-md">Tarde</span>
            </div>
            <div className="text-xs text-stone-600 bg-rose-50/60 p-2.5 rounded-xl border border-rose-100">
              <span className="font-semibold text-rose-900 block mb-0.5">Receita original:</span>
              Iogurte natural + granola crocante + morangos.
            </div>
            <div className="text-xs text-stone-700 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
              <span className="font-semibold text-emerald-900 block mb-0.5">Possíveis adaptações práticas:</span>
              • Iogurte por leite morno ou bebida vegetal<br />
              • Granola por aveia em flocos pura<br />
              • Morangos por banana fatiada ou maçã com canela
            </div>
          </div>

          {/* Regra Simples dos 4 Pilares */}
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-2xl p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
              A Regra Simples dos 4 Pilares
            </h4>
            <p className="text-xs text-stone-300">
              Ao trocar qualquer receita, certifique-se de manter:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="bg-white/10 p-2.5 rounded-xl">
                <span className="font-bold text-emerald-300 block">1. Energia</span>
                <span className="text-stone-300 text-[11px]">Uma boa base de carboidratos</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl">
                <span className="font-bold text-emerald-300 block">2. Saciedade</span>
                <span className="text-stone-300 text-[11px]">Uma fonte rica em proteína</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl">
                <span className="font-bold text-emerald-300 block">3. Vitalidade</span>
                <span className="text-stone-300 text-[11px]">Uma fruta ou vegetal fresco</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-xl">
                <span className="font-bold text-emerald-300 block">4. Prazer</span>
                <span className="text-stone-300 text-[11px]">Sabor suficiente para você gostar</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 3: COMER FORA */}
      {topic === 'eatingOut' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Página 12 · Vida Social Sem Culpa
            </span>
            <h2 className="text-base font-bold text-stone-900 mb-1.5">
              Substituições para Comer Fora
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Não é necessário passar fome antes ou compensar depois de uma refeição social. Equilíbrio se constrói com tranquilidade.
            </p>
          </div>

          <div className="space-y-3">
            {/* Restaurante por quilo */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🥗</span>
                <h3 className="text-xs font-bold text-stone-900">No Restaurante por Quilo</h3>
              </div>
              <p className="text-xs text-stone-600">Monte o prato mantendo a estrutura:</p>
              <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc">
                <li>Comece forrando metade com vegetais coloridos</li>
                <li>Adicione uma fonte de proteína grelhada ou assada</li>
                <li>Complete com arroz, batata, mandioca ou massa</li>
                <li>Feijão, lentilha ou grão-de-bico para completar</li>
                <li>Peça molhos cremosos à parte quando possível</li>
              </ul>
            </div>

            {/* Lanchonete */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🥪</span>
                <h3 className="text-xs font-bold text-stone-900">Na Lanchonete</h3>
              </div>
              <p className="text-xs text-stone-600">Opções que sustentam de verdade:</p>
              <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc">
                <li>Sanduíche natural de frango com salada</li>
                <li>Pão na chapa com ovos mexidos</li>
                <li>Tapioca com queijo branco ou minas</li>
                <li>Salada com tiras de frango ou atum</li>
                <li>Iogurte com frutas ou café com torrada</li>
              </ul>
            </div>

            {/* Pizzaria */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🍕</span>
                <h3 className="text-xs font-bold text-stone-900">Na Pizzaria</h3>
              </div>
              <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc">
                <li>Escolha os sabores que você realmente aprecia</li>
                <li>Coma devagar, saboreando cada pedaço</li>
                <li>Alterne copos de refrigerante/cerveja com água gelada</li>
                <li>Pare quando sentir saciedade confortável</li>
                <li>Volte à sua rotina normal no dia seguinte sem autopunição</li>
              </ul>
            </div>

            {/* Churrasco */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base">🥩</span>
                <h3 className="text-xs font-bold text-stone-900">No Churrasco</h3>
              </div>
              <ul className="text-xs text-stone-700 space-y-1 pl-4 list-disc">
                <li>Combine os cortes de carne com uma farta porção de salada</li>
                <li>Pão de alho ou arroz com vinagrete fresco</li>
                <li>Queijo coalho assado na brasa</li>
                <li>Beba água frequentemente para manter a hidratação</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 4: VARIAR O SABOR */}
      {topic === 'flavors' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Página 13 · Alquimia Culinária
            </span>
            <h2 className="text-base font-bold text-stone-900 mb-1.5">
              Trocas para Variar o Sabor
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              O mesmo ingrediente ganha outra vida com combinações simples de ervas, especiarias e marinadas.
            </p>
          </div>

          {/* Frango */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
              <span>🍗</span> Para o Frango (7 Aromas)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FLAVOR_VARIATIONS.frango.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-xs font-bold text-stone-800 block">{item.title}</span>
                  <span className="text-[11px] text-stone-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legumes */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
              <span>🥦</span> Para Legumes (7 Combinações)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FLAVOR_VARIATIONS.legumes.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-xs font-bold text-stone-800 block">{item.title}</span>
                  <span className="text-[11px] text-stone-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Saladas */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wide flex items-center gap-1.5">
              <span>🥗</span> Para Molhos de Salada (7 Toques)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FLAVOR_VARIATIONS.saladas.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-xs font-bold text-stone-800 block">{item.title}</span>
                  <span className="text-[11px] text-stone-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frutas */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2.5">
            <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
              <span>🍎</span> Para Frutas e Doces Naturais (7 Ideias)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FLAVOR_VARIATIONS.frutas.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="text-xs font-bold text-stone-800 block">{item.title}</span>
                  <span className="text-[11px] text-stone-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 5: CHECKLIST PRÉ-TROCA */}
      {topic === 'checklist' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
                Página 14 · Checagem Rápida
              </span>
              <button
                onClick={resetChecklist}
                className="text-[11px] text-stone-500 hover:text-stone-800 font-medium"
              >
                Limpar
              </button>
            </div>
            <h2 className="text-base font-bold text-stone-900 mb-1">
              Lista de Verificação Antes de Substituir
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Marque as perguntas que você conferiu para ter certeza de que a troca funcionará perfeitamente:
            </p>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-medium text-stone-600">
                <span>Progresso:</span>
                <span>{checkedItems.length} de {CHECKLIST_ITEMS.length} verificadas</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden border border-stone-200">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${(checkedItems.length / CHECKLIST_ITEMS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {CHECKLIST_ITEMS.map((q, idx) => {
              const isDone = checkedItems.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isDone ? 'bg-emerald-600 text-white' : 'border border-stone-300 bg-stone-50'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs sm:text-sm leading-snug">{q}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TOPIC 6: FILOSOFIA FINAL */}
      {topic === 'final' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-2">
              Mensagem Final do Bônus 2
            </span>
            <h2 className="text-xl font-bold font-serif-display leading-tight mb-3">
              Adaptar não significa fracassar.
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-stone-200 leading-relaxed">
              <p>
                Um bom plano alimentar precisa funcionar nos dias corridos, no supermercado, no restaurante, nas viagens, nas reuniões de família e dentro do orçamento possível.
              </p>
              <p>
                Use esta lista para continuar cuidando da sua alimentação mesmo quando algum ingrediente faltar. A melhor substituição é aquela que mantém sua refeição prática, saborosa e adequada à sua realidade.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-emerald-200/80">
              Constância e flexibilidade constroem saúde verdadeira.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
