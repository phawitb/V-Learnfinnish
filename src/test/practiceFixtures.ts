import type { VocabularyItem } from '../types';

function deck(id: string, title: string, rows: string[][]) {
  return { id, title, items: rows.map(([finnish, english], index): VocabularyItem => ({
    id: `${id}-${index}`, query: finnish, direction: 'fi-en', finnish, english,
    exampleFinnish: finnish, exampleEnglish: english, favorite: false, createdAt: '',
    reviewCount: 0, correctCount: 0, incorrectCount: 0, difficulty: 'new', nextReviewAt: '', mastered: false,
  })) };
}
export const testTwoPracticeGroups = [
  deck('test2-sample', 'Test 2 — Sample words', [
    ['Hei!', 'Hi!'], ['ja', 'and'], ['Tervetuloa!', 'Welcome!'], ['Anteeksi!', 'Sorry! / Excuse me!'],
    ['onko', 'is …?'], ['täällä', 'here'], ['suomen kurssi', 'Finnish course'], ['joo', 'yes'], ['olla', 'to be'], ['tämä', 'this'],
  ]),
  deck('test2-sample-colors', 'Test 2 — Sample colors', [['ruskea', 'brown'], ['turkoosi', 'turquoise']]),
  deck('test2-long', 'Test 2 — Long sentence', [['Hänellä on pitkä vaalea suora tukka.', 'He / she has long straight fair hair.']]),
];
