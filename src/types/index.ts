export interface PersonalSwap {
  id: string;
  originalFood: string;
  replacementFood: string;
  liked: boolean;
  notes?: string;
  createdAt: string;
}

export interface UserDiaryState {
  favorites: number[]; // substitution item IDs
  personalSwaps: PersonalSwap[];
  topFiveCombos: string[];
}
