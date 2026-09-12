import { describe, expect, it } from 'vitest'
import { normalizeOllamaResponse } from './translation.js'

describe('normalizeOllamaResponse', () => {
  it('accepts fenced JSON and keeps exactly one example', () => {
    const raw = '```json\n{"finnish":"opiskelija","english":"student","examples":[{"finnish":"Olen opiskelija.","english":"I am a student."},{"finnish":"Hän on opiskelija.","english":"She is a student."}]}\n```'
    const result = normalizeOllamaResponse(raw, 'opiskelija', 'fi-en')
    expect(result.exampleFinnish).toBe('Olen opiskelija.')
    expect(result.exampleEnglish).toBe('I am a student.')
  })
  it('rejects provider output without a Finnish and English result', () => {
    expect(() => normalizeOllamaResponse('{"message":"hello"}', 'hello', 'auto')).toThrow('invalid')
  })
  it('normalizes nullable optional fields returned by Ollama', () => {
    const raw = '{"finnish":"opiskelija","english":"student","exampleFinnish":"Olen opiskelija.","exampleEnglish":"I am a student.","breakdown":null}'
    expect(normalizeOllamaResponse(raw, 'opiskelija', 'fi-en').breakdown).toBeUndefined()
  })
  it('normalizes compact tuple breakdowns returned by smaller models', () => {
    const raw = '{"finnish":"opiskelija","english":"student","exampleFinnish":"Olen opiskelija.","exampleEnglish":"I am a student.","breakdown":[["opiskelija","student"]]}'
    expect(normalizeOllamaResponse(raw, 'opiskelija', 'fi-en').breakdown).toEqual([{ finnish:'opiskelija', english:'student' }])
  })
})
