import { expect, it } from 'vitest';
import { testTwoPracticeGroups } from './testTwoPractice';
import { readingWords } from './testTwoReading';
import { topicWords } from './testTwoTopics';

it('makes every assigned exam word available to practice with no empty categories or duplicate IDs', () => {
  const items = testTwoPracticeGroups.flatMap(group => group.items);
  const words = new Set(items.map(item => item.finnish));
  const expandedPhrases = new Map([
    ['On kaunis / hyvä ilma.', ['On kaunis ilma.', 'On hyvä ilma.']],
    ['Anteeksi, voitko auttaa minua / vähän?', ['Anteeksi, voitko auttaa minua?', 'Voitko auttaa vähän?']],
    ['Miten sanotaan Can you help me suomeksi?', ['Miten sanotaan “Can you help me” suomeksi?']],
    ['Mikä on language course suomeksi?', ['Mikä on “language course” suomeksi?']],
    ['pitää + -sta/-stä', ['pitää']],
  ]);
  for (const source of [...readingWords, ...topicWords]) {
    for (const word of expandedPhrases.get(source.fi) ?? [source.fi]) expect(words, word).toContain(word);
  }
  expect(new Set(items.map(item => item.id)).size).toBe(items.length);
  for (const group of testTwoPracticeGroups) {
    expect(group.items.length, group.title).toBeGreaterThan(0);
    for (const item of group.items) expect(item.english.trim(), item.finnish).not.toBe('');
  }
});
