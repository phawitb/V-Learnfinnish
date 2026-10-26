export type Bilingual = { th: string; en: string };
export type StudyTable = { title: Bilingual; columns: Bilingual[]; rows: (string | Bilingual)[][] };
export type StudySection = { id: string; title: Bilingual; pages: number[]; intro: Bilingual; notes: Bilingual[]; tables: StudyTable[] };
export type ReviewQuestion = { id: string; topic: string; prompt: Bilingual; answer: string; explanation: Bilingual };
export type ExamWord = { fi: string; th: string; en: string; category: string; page: number };
