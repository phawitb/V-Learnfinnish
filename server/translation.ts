import { z } from 'zod'
import type { Direction, TranslationResult } from '../src/types.js'

const optionalString = z.string().nullish().transform(value => value ?? undefined)
const breakdownItem = z.union([
  z.object({ finnish: z.string(), english: z.string() }),
  z.tuple([z.string(), z.string()]).transform(([finnish, english]) => ({ finnish, english })),
])
const schema = z.object({
  finnish: z.string().min(1), english: z.string().min(1), pronunciation: optionalString,
  partOfSpeech: optionalString, baseForm: optionalString, grammarNote: optionalString,
  exampleFinnish: optionalString, exampleEnglish: optionalString,
  examples: z.array(z.object({ finnish: z.string(), english: z.string() })).nullish().transform(value => value ?? undefined),
  breakdown: z.array(breakdownItem).nullish().transform(value => value ?? undefined),
})

export function normalizeProviderResponse(raw: string, query: string, direction: Direction): TranslationResult {
  const cleaned = raw.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim()
  let parsed: unknown
  try { parsed = JSON.parse(cleaned) } catch { throw new Error('invalid_provider_response') }
  const value = schema.safeParse(parsed)
  if (!value.success) throw new Error('invalid_provider_response')
  const example = value.data.examples?.[0]
  const exampleFinnish = value.data.exampleFinnish || example?.finnish
  const exampleEnglish = value.data.exampleEnglish || example?.english
  if (!exampleFinnish || !exampleEnglish) throw new Error('invalid_provider_response')
  return { id: crypto.randomUUID(), query, direction, ...value.data, exampleFinnish, exampleEnglish }
}

export const GEMINI_MODEL = 'gemini-3.1-flash-lite'

export async function translateWithGemini(
  query: string,
  direction: Direction,
  apiKey = process.env.GEMINI_API_KEY,
): Promise<TranslationResult> {
  if (!apiKey) throw new Error('gemini_not_configured')
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: buildPrompt(query, direction) }] }],
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
      }),
    },
  )
  if (!response.ok) throw new Error('gemini_unavailable')
  const body = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const raw = body.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || ''
  return normalizeProviderResponse(raw, query, direction)
}

export function buildPrompt(query: string, direction: Direction) {
  return `You are a careful native Finnish language teacher. Translate the input based on direction ${direction}. Return JSON only with keys: finnish, english, pronunciation, partOfSpeech, baseForm, grammarNote, exampleFinnish, exampleEnglish, breakdown. Give exactly one SHORT, natural, factually correct everyday Finnish example. For a single word, use a simple sentence of 3–7 words. breakdown is only for sentence input and contains objects with finnish and english keys. Keep grammarNote accurate and beginner-friendly; omit it if uncertain. Input: ${JSON.stringify(query)}`
}
