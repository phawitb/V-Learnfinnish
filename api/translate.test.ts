import { describe, expect, it, vi } from 'vitest'
import handler from './translate.js'

describe('Vercel translation endpoint', () => {
  it('uses the shared Gemini translation flow', async () => {
    process.env.GEMINI_API_KEY = 'vercel-secret'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: '{"finnish":"kiitos","english":"thank you","exampleFinnish":"Kiitos paljon!","exampleEnglish":"Thank you very much!"}' }] } }],
    }), { status: 200 })))
    const json = vi.fn()
    const status = vi.fn(() => ({ json }))

    await handler({ method: 'POST', body: { query: 'kiitos', direction: 'fi-en' } }, { status, json })

    expect(status).toHaveBeenCalledWith(200)
    expect(json).toHaveBeenCalledWith(expect.objectContaining({ finnish: 'kiitos', english: 'thank you' }))
    vi.unstubAllGlobals()
    delete process.env.GEMINI_API_KEY
  })
})
