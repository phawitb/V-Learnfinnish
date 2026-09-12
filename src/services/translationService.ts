import type { Direction, TranslationResult } from '../types'

export const translationService = {
  async translate(query: string, direction: Direction): Promise<TranslationResult> {
    const response = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, direction }) })
    if (!response.ok) throw new Error('translation_failed')
    return response.json()
  }
}
