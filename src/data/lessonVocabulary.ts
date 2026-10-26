import { readingWords } from './testTwoReading';
import { topicWords } from './testTwoTopics';
import { vocabularyEarly } from './vocabularyEarly';
import { vocabularyDates } from './vocabularyDates';
import { vocabularyOctober } from './vocabularyOctober';
import type { LessonId } from './courseCatalog';

export type LessonVocabularyEntry = { fi: string; th: string; en?: string; category?: string };
const collections: Record<string, LessonVocabularyEntry[]> = { ...vocabularyEarly, ...vocabularyDates, ...vocabularyOctober, test2: [...readingWords,...topicWords].map(w=>({...w,category:`${w.category} · p. ${w.page}`})) };
export function getLessonVocabulary(id: LessonId): LessonVocabularyEntry[] {
  const unique = new Map<string, LessonVocabularyEntry>();
  for (const entry of collections[String(id)] ?? []) {
    const key = entry.fi.trim().normalize('NFC');
    const previous = unique.get(key);
    if (!previous) unique.set(key, { ...entry, fi: entry.fi.trim() });
    else if (previous.th !== entry.th && !previous.th.includes(entry.th)) {
      unique.set(key, { ...previous, th: `${previous.th}; ${entry.th}`, en: previous.en && entry.en ? (previous.en === entry.en ? previous.en : `${previous.en}; ${entry.en}`) : previous.en });
    }
  }
  return [...unique.values()].sort((a,b) => a.fi.localeCompare(b.fi, 'fi'));
}
