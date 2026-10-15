import lessonFiveVocabulary from './lessonFiveVocabulary.json';
import { readingVocabulary } from './lessonFiveContent';
import { vocabulary as lessonSevenVocabulary } from './lessonSevenVocabulary';
import { verbPhrases, timeMarkers } from './lessonSixContent';
import { verbs as partitiveVerbs } from './lessonEightContent';

type Word = { fi: string; th: string; category?: string };
const unique = (...groups: Word[][]): Word[] => [...new Map(groups.flat().map(word => [word.fi, word])).values()];
const quizlet = (sets: (keyof typeof lessonFiveVocabulary)[]) => sets.flatMap(set =>
  lessonFiveVocabulary[set].map(({ fi, th }) => ({ fi, th, category: `Quizlet · ${set}` })));

// Explicitly assigned pronoun forms and special words, not every noun in the exercises.
const partitiveTargets: Word[] = [
  { fi:'minä → minua', th:'ฉัน', category:'Page 95 · Partitive pronouns' },
  { fi:'sinä → sinua', th:'คุณ', category:'Page 95 · Partitive pronouns' },
  { fi:'hän → häntä', th:'เขา / เธอ', category:'Page 95 · Partitive pronouns' },
  { fi:'me → meitä', th:'พวกเรา', category:'Page 95 · Partitive pronouns' },
  { fi:'te → teitä', th:'พวกคุณ', category:'Page 95 · Partitive pronouns' },
  { fi:'he → heitä', th:'พวกเขา', category:'Page 95 · Partitive pronouns' },
  { fi:'ihminen → ihmistä', th:'คน', category:'Moodle · Partitive special words' },
  { fi:'vesi → vettä', th:'น้ำ', category:'Moodle · Partitive special words' },
  { fi:'mies → miestä', th:'ผู้ชาย / สามี', category:'Page 95 · Partitive special words' },
  { fi:'monta', th:'หลาย', category:'Page 96 · Quantity words' },
  { fi:'vähän', th:'น้อย', category:'Page 96 · Quantity words' },
  { fi:'paljon', th:'มาก', category:'Page 96 · Quantity words' },
  { fi:'pari', th:'สอง / สองสาม', category:'Page 96 · Quantity words' },
  { fi:'puoli', th:'ครึ่ง', category:'Page 96 · Quantity words' },
];

// Each list follows that date's vocabulary assignment; review sets recur only when assigned.
export const vocabularyOctober: Record<string, Word[]> = {
  '5': unique(quizlet(['weather','seasons','adjectives','colours']),
    readingVocabulary.map(([fi,th]) => ({fi,th,category:'Vuodenajat Suomessa · Reading vocabulary'}))),
  '6': unique(quizlet(['weather','seasons','adjectives']),
    verbPhrases.map(([fi,,th]) => ({fi,th,category:'Verbs and time markers · Verbs'})),
    timeMarkers.map(([fi,th]) => ({fi,th,category:'Verbs and time markers · Time'}))),
  '7': unique(lessonSevenVocabulary.map(([fi,,th]) => ({fi,th,category:'Quizlet · Pedro soittaa Mikolle'}))),
  '8': unique(partitiveTargets,
    partitiveVerbs.map(([fi,,th]) => ({fi,th,category:'Pages 95–96 · Verbs with partitive'}))),
};
