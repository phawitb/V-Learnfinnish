import type { VocabularyItem } from '../types'
const now = new Date().toISOString()
const rows = [
  ['opiskelija','student','Olen opiskelija Turun yliopistossa.','I am a student at the University of Turku.'],
  ['ystävä','friend','Hän on hyvä ystäväni.','He is my good friend.'],
  ['opettaja','teacher','Opettaja auttaa meitä.','The teacher helps us.'],
  ['lääkäri','doctor','Lääkäri työskentelee sairaalassa.','The doctor works at a hospital.'],
  ['kiitos','thank you','Kiitos avustasi!','Thank you for your help!'],
  ['koti','home','Menen kotiin bussilla.','I go home by bus.'],
]
export const seedVocabulary: VocabularyItem[] = rows.map(([finnish, english, exampleFinnish, exampleEnglish], i) => ({
  id:`seed-${i}`, query:finnish, direction:'fi-en', finnish, english, exampleFinnish, exampleEnglish,
  partOfSpeech:'noun', favorite:false, createdAt:now, reviewCount:0, correctCount:0, incorrectCount:0,
  difficulty:'new', nextReviewAt:now, mastered:false,
}))
