import { describe, expect, it } from 'vitest'
import { normalizeProviderResponse } from './translation.js'

describe('normalizeProviderResponse', () => {
  it('accepts fenced JSON and keeps exactly one example', () => {
    const raw = '```json\n{"finnish":"opiskelija","english":"student","examples":[{"finnish":"Olen opiskelija.","english":"I am a student."},{"finnish":"Hän on opiskelija.","english":"She is a student."}]}\n```'
    const result = normalizeProviderResponse(raw, 'opiskelija', 'fi-en')
    expect(result.exampleFinnish).toBe('Olen opiskelija.')
    expect(result.exampleEnglish).toBe('I am a student.')
  })
  it('rejects provider output without a Finnish and English result', () => {
    expect(() => normalizeProviderResponse('{"message":"hello"}', 'hello', 'auto')).toThrow('invalid')
  })
  it('reports an explicit not-found result from the provider', () => {
    expect(() => normalizeProviderResponse('{"found":false}', 'asdfgh', 'auto')).toThrow('translation_not_found')
  })
  it('normalizes nullable optional fields returned by the provider', () => {
    const raw = '{"finnish":"opiskelija","english":"student","exampleFinnish":"Olen opiskelija.","exampleEnglish":"I am a student.","breakdown":null}'
    expect(normalizeProviderResponse(raw, 'opiskelija', 'fi-en').breakdown).toBeUndefined()
  })
  it('normalizes compact tuple breakdowns returned by smaller models', () => {
    const raw = '{"finnish":"opiskelija","english":"student","exampleFinnish":"Olen opiskelija.","exampleEnglish":"I am a student.","breakdown":[["opiskelija","student"]]}'
    expect(normalizeProviderResponse(raw, 'opiskelija', 'fi-en').breakdown).toEqual([{ finnish:'opiskelija', english:'student' }])
  })
})
