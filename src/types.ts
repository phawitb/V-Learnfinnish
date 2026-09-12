export type Direction = 'auto' | 'fi-en' | 'en-fi'
export type PracticeRating = 'again' | 'hard' | 'good' | 'easy'
export type Difficulty = 'new' | 'learning' | 'familiar' | 'mastered'

export interface BreakdownItem { finnish: string; english: string }
export interface TranslationResult {
  id: string; query: string; direction: Direction; finnish: string; english: string
  pronunciation?: string; partOfSpeech?: string; baseForm?: string; grammarNote?: string
  exampleFinnish: string; exampleEnglish: string; breakdown?: BreakdownItem[]
}
export interface VocabularyItem extends TranslationResult {
  favorite: boolean; createdAt: string; reviewCount: number; correctCount: number
  incorrectCount: number; difficulty: Difficulty; nextReviewAt: string; mastered: boolean
}
export interface HistoryItem { id: string; result: TranslationResult; createdAt: string }

export interface ReviewWord {
  id: string
  groupId: string
  item: VocabularyItem
  addedAt: string
}

export interface GroupProgress {
  groupId: string
  level: 1 | 2 | 3 | 4 | 5
  accuracy: number
  completedAt: string
}

export interface PracticeProgress {
  reviewWords: ReviewWord[]
  groups: Record<string, GroupProgress>
}
