import { useState, useEffect } from 'react';
import { PersonalSwap, UserDiaryState } from '../types';

const STORAGE_KEY = 'substituicoes_inteligentes_data_v1';

const defaultState: UserDiaryState = {
  favorites: [1, 25, 71, 76, 95, 126, 141], // friendly initial favorites
  personalSwaps: [
    {
      id: 'demo-1',
      originalFood: 'Arroz branco do almoço',
      replacementFood: 'Mandioca cozida com azeite',
      liked: true,
      notes: 'Ficou super macia e deu bastante saciedade até a tarde.',
      createdAt: '2026-10-01',
    },
    {
      id: 'demo-2',
      originalFood: 'Refrigerante no jantar',
      replacementFood: 'Água com gás, gelo e rodelas de limão',
      liked: true,
      notes: 'Refrescante igual, sem açúcar.',
      createdAt: '2026-10-02',
    },
  ],
  topFiveCombos: [
    'Batata-doce assada em rodelas + ovos mexidos',
    'Cuscuz nordestino quentinho com queijo minas',
    'Sardinha fresca com vinagrete e arroz',
    'Iogurte natural batido com banana congelada e canela',
    'Água com gás, limão espremido e hortelã',
  ],
};

export function useUserStore() {
  const [state, setState] = useState<UserDiaryState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const toggleFavorite = (id: number) => {
    setState((prev) => {
      const exists = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((fId) => fId !== id)
          : [...prev.favorites, id],
      };
    });
  };

  const addPersonalSwap = (swap: Omit<PersonalSwap, 'id' | 'createdAt'>) => {
    const newSwap: PersonalSwap = {
      ...swap,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setState((prev) => ({
      ...prev,
      personalSwaps: [newSwap, ...prev.personalSwaps],
    }));
  };

  const removePersonalSwap = (id: string) => {
    setState((prev) => ({
      ...prev,
      personalSwaps: prev.personalSwaps.filter((s) => s.id !== id),
    }));
  };

  const updateTopFiveCombo = (index: number, value: string) => {
    setState((prev) => {
      const next = [...prev.topFiveCombos];
      next[index] = value;
      return {
        ...prev,
        topFiveCombos: next,
      };
    });
  };

  return {
    favorites: state.favorites,
    personalSwaps: state.personalSwaps,
    topFiveCombos: state.topFiveCombos,
    toggleFavorite,
    addPersonalSwap,
    removePersonalSwap,
    updateTopFiveCombo,
  };
}
