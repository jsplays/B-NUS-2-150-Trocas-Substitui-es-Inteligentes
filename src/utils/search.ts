import { SubstitutionItem } from '../data/substitutions';

/**
 * Strips accents, diacritics, and lowercases string for fast matching.
 */
export function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export const normalizeSearchTerm = normalizeText;

/**
 * Synonym mapping for Brazilian Portuguese food terms.
 */
function getSynonymsForFood(text: string): string {
  const norm = normalizeText(text);
  const syns: string[] = [];

  if (norm.includes('mandioca')) syns.push('aipim macaxeira mandioca');
  if (norm.includes('refrigerante')) syns.push('refri soda refrigerante');
  if (norm.includes('carne')) syns.push('boi bovina bovino carne bife alcatra');
  if (norm.includes('frango')) syns.push('galinha ave peito sobrecoxa frango');
  if (norm.includes('peixe')) syns.push('pescado sardinha atum salmao peixes');
  if (norm.includes('massa')) syns.push('macarrao espaguete pasta');
  if (norm.includes('leite') || norm.includes('queijo') || norm.includes('iogurte') || norm.includes('ricota') || norm.includes('cottage')) {
    syns.push('lactose laticinio laticinios');
  }
  if (norm.includes('batata')) syns.push('batata batatas');
  if (norm.includes('ovo')) syns.push('ovos clara gema');
  if (norm.includes('arroz')) syns.push('arroz integral parboilizado');
  if (norm.includes('pao')) syns.push('paes torrada sanduiche');
  if (norm.includes('acucar') || norm.includes('doce') || norm.includes('sobremesa')) syns.push('acucar doce');
  if (norm.includes('azeite') || norm.includes('oleo') || norm.includes('manteiga')) syns.push('gordura gorduras');

  return syns.join(' ');
}

export interface IndexedSubstitutionItem extends SubstitutionItem {
  searchKey: string;
}

/**
 * Pre-indexes items once at module evaluation to prevent repeated regex normalizations on keystrokes.
 */
export function preIndexSubstitutions(items: SubstitutionItem[]): IndexedSubstitutionItem[] {
  return items.map((item) => {
    const normOriginal = normalizeText(item.original);
    const normReplacement = normalizeText(item.replacement);
    const normTip = normalizeText(item.tip || '');
    const normCategory = normalizeText(item.categoryLabel);
    const synonyms = getSynonymsForFood(`${normOriginal} ${normReplacement}`);

    // Combined search key with food, replacement, category, id, tip, and synonyms
    const searchKey = `${normOriginal} ${normReplacement} ${normCategory} ${normTip} #${item.id} ${synonyms}`;

    return {
      ...item,
      searchKey,
    };
  });
}

/**
 * Fast token match against pre-indexed searchKey.
 */
export function matchIndexedItem(item: IndexedSubstitutionItem, tokens: string[]): boolean {
  if (tokens.length === 0) return true;
  for (let i = 0; i < tokens.length; i++) {
    if (!item.searchKey.includes(tokens[i])) {
      return false;
    }
  }
  return true;
}
