import React, { useState } from 'react';
import { Shuffle, Check, Utensils, Coffee, Sun, Cookie, BookmarkPlus } from 'lucide-react';
import { MEAL_BUILDER_DATA } from '../data/substitutions';

interface Props {
  onSaveToDiary: (original: string, replacement: string, notes?: string) => void;
}

type MealType = 'breakfast' | 'lunchDinner' | 'snacks';

export const MealBuilder: React.FC<Props> = ({ onSaveToDiary }) => {
  const [mealType, setMealType] = useState<MealType>('breakfast');

  // Breakfast state
  const [bBase, setBBase] = useState('Tapioca');
  const [bProtein, setBProtein] = useState('Ovo');
  const [bFruit, setBFruit] = useState('Banana');

  // Lunch/Dinner state
  const [lCarb, setLCarb] = useState('Arroz');
  const [lProtein, setLProtein] = useState('Frango');
  const [lVeg, setLVeg] = useState('Legumes');

  // Snacks checked state
  const [checkedSnacks, setCheckedSnacks] = useState<number[]>([]);
  const [savedAlert, setSavedAlert] = useState(false);

  const randomizeBreakfast = () => {
    const { bases, proteins, fruits } = MEAL_BUILDER_DATA.breakfast;
    setBBase(bases[Math.floor(Math.random() * bases.length)]);
    setBProtein(proteins[Math.floor(Math.random() * proteins.length)]);
    setBFruit(fruits[Math.floor(Math.random() * fruits.length)]);
  };

  const randomizeLunch = () => {
    const { carbs, proteins, veggies } = MEAL_BUILDER_DATA.lunchDinner;
    setLCarb(carbs[Math.floor(Math.random() * carbs.length)]);
    setLProtein(proteins[Math.floor(Math.random() * proteins.length)]);
    setLVeg(veggies[Math.floor(Math.random() * veggies.length)]);
  };

  const handleSaveCurrentMeal = () => {
    if (mealType === 'breakfast') {
      onSaveToDiary(
        'Café da manhã tradicional',
        `${bBase} + ${bProtein} + ${bFruit}`,
        'Combinação balanceada montada pelo Guia Rápido (Página 8)'
      );
    } else if (mealType === 'lunchDinner') {
      onSaveToDiary(
        'Almoço/Jantar habitual',
        `${lCarb} + ${lProtein} + ${lVeg}`,
        'Prato equilibrado com base energética, proteína e vegetais'
      );
    }
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const toggleSnackCheck = (idx: number) => {
    setCheckedSnacks((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="pb-24 pt-2 px-4 max-w-xl mx-auto space-y-4">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
          <Utensils className="w-4 h-4" />
          <span>Página 8 · Tabela Rápida de Consulta</span>
        </div>
        <h2 className="text-base font-bold text-stone-900 mb-1">
          Monte sua Refeição Inteligente
        </h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          Escolha uma opção de cada coluna para garantir energia, saciedade e micronutrientes sem complicação.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-200/70 rounded-xl">
        <button
          onClick={() => setMealType('breakfast')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
            mealType === 'breakfast'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Coffee className="w-3.5 h-3.5 text-amber-600" />
          <span>Café</span>
        </button>
        <button
          onClick={() => setMealType('lunchDinner')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
            mealType === 'lunchDinner'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-emerald-600" />
          <span>Almoço/Jantar</span>
        </button>
        <button
          onClick={() => setMealType('snacks')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
            mealType === 'snacks'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Cookie className="w-3.5 h-3.5 text-teal-600" />
          <span>Lanches</span>
        </button>
      </div>

      {/* Toast Alert */}
      {savedAlert && (
        <div className="bg-emerald-800 text-white text-xs px-3.5 py-2.5 rounded-xl text-center font-medium shadow-sm animate-in fade-in">
          ✓ Refeição registrada com sucesso no seu Diário!
        </div>
      )}

      {/* Breakfast View */}
      {mealType === 'breakfast' && (
        <div className="space-y-4">
          {/* Current Selection Plate */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-emerald-50 rounded-2xl p-4 border border-amber-200/70">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block mb-1">
              Prato Selecionado:
            </span>
            <div className="text-sm font-bold text-stone-900 flex flex-wrap items-center gap-2">
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-stone-800 shadow-2xs">
                {bBase}
              </span>
              <span className="text-stone-400">+</span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-stone-800 shadow-2xs">
                {bProtein}
              </span>
              <span className="text-stone-400">+</span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-stone-800 shadow-2xs">
                {bFruit}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-amber-200/50">
              <button
                onClick={randomizeBreakfast}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-stone-800 hover:bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-600" />
                <span>Sortear ideia</span>
              </button>
              <button
                onClick={handleSaveCurrentMeal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Salvar no Diário</span>
              </button>
            </div>
          </div>

          {/* Interactive Columns */}
          <div className="grid grid-cols-3 gap-2">
            {/* Column 1: Base */}
            <div className="bg-white rounded-xl p-2.5 border border-stone-200">
              <h3 className="text-xs font-bold text-stone-800 pb-1.5 mb-2 border-b border-stone-100 text-center">
                1. Base
              </h3>
              <div className="space-y-1.5">
                {MEAL_BUILDER_DATA.breakfast.bases.map((base) => (
                  <button
                    key={base}
                    onClick={() => setBBase(base)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      bBase === base
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {base}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Protein */}
            <div className="bg-white rounded-xl p-2.5 border border-stone-200">
              <h3 className="text-xs font-bold text-stone-800 pb-1.5 mb-2 border-b border-stone-100 text-center">
                2. Proteína
              </h3>
              <div className="space-y-1.5">
                {MEAL_BUILDER_DATA.breakfast.proteins.map((prot) => (
                  <button
                    key={prot}
                    onClick={() => setBProtein(prot)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      bProtein === prot
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {prot}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Fruit */}
            <div className="bg-white rounded-xl p-2.5 border border-stone-200">
              <h3 className="text-xs font-bold text-stone-800 pb-1.5 mb-2 border-b border-stone-100 text-center">
                3. Fruta
              </h3>
              <div className="space-y-1.5">
                {MEAL_BUILDER_DATA.breakfast.fruits.map((fr) => (
                  <button
                    key={fr}
                    onClick={() => setBFruit(fr)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      bFruit === fr
                        ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {fr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lunch / Dinner View */}
      {mealType === 'lunchDinner' && (
        <div className="space-y-4">
          {/* Current Selection Plate */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-100/40 to-teal-50 rounded-2xl p-4 border border-emerald-200/80">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              Prato Selecionado:
            </span>
            <div className="text-sm font-bold text-stone-900 flex flex-wrap items-center gap-2">
              <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-stone-800 shadow-2xs">
                {lCarb}
              </span>
              <span className="text-stone-400">+</span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-stone-800 shadow-2xs">
                {lProtein}
              </span>
              <span className="text-stone-400">+</span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-stone-800 shadow-2xs">
                {lVeg}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald-200/50">
              <button
                onClick={randomizeLunch}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-stone-800 hover:bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sortear ideia</span>
              </button>
              <button
                onClick={handleSaveCurrentMeal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Salvar no Diário</span>
              </button>
            </div>
          </div>

          {/* Interactive Columns */}
          <div className="grid grid-cols-3 gap-2">
            {/* Carb */}
            <div className="bg-white rounded-xl p-2.5 border border-stone-200">
              <h3 className="text-xs font-bold text-stone-800 pb-1.5 mb-2 border-b border-stone-100 text-center">
                Carboidrato
              </h3>
              <div className="space-y-1.5">
                {MEAL_BUILDER_DATA.lunchDinner.carbs.map((c) => (
                  <button
                    key={c}
                    onClick={() => setLCarb(c)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      lCarb === c
                        ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Protein */}
            <div className="bg-white rounded-xl p-2.5 border border-stone-200">
              <h3 className="text-xs font-bold text-stone-800 pb-1.5 mb-2 border-b border-stone-100 text-center">
                Proteína
              </h3>
              <div className="space-y-1.5">
                {MEAL_BUILDER_DATA.lunchDinner.proteins.map((p) => (
                  <button
                    key={p}
                    onClick={() => setLProtein(p)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      lProtein === p
                        ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Veggies */}
            <div className="bg-white rounded-xl p-2.5 border border-stone-200">
              <h3 className="text-xs font-bold text-stone-800 pb-1.5 mb-2 border-b border-stone-100 text-center">
                Vegetais
              </h3>
              <div className="space-y-1.5">
                {MEAL_BUILDER_DATA.lunchDinner.veggies.map((v) => (
                  <button
                    key={v}
                    onClick={() => setLVeg(v)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      lVeg === v
                        ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Snacks View */}
      {mealType === 'snacks' && (
        <div className="space-y-3">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
            💡 <strong>10 Ideias Prontas para Lanche:</strong> Marque as opções que você mais gosta ou que tem ingredientes em casa hoje!
          </div>

          <div className="space-y-2">
            {MEAL_BUILDER_DATA.snacks.map((snack, idx) => {
              const isChecked = checkedSnacks.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleSnackCheck(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-emerald-600 text-white' : 'border border-stone-300 bg-stone-50'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs sm:text-sm">{snack}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveToDiary('Lanche da tarde', snack, 'Opção prática do guia');
                      setSavedAlert(true);
                      setTimeout(() => setSavedAlert(false), 2500);
                    }}
                    title="Salvar no Diário"
                    className="p-1 text-stone-400 hover:text-emerald-700 shrink-0"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
