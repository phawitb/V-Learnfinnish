import { afterEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { createApp } from './index.js'

describe('local server', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    delete process.env.GEMINI_API_KEY
  })
  it('serves the application shell for an unknown client route', async () => {
    const response = await request(createApp()).get('/favorites')
    expect(response.status).not.toBe(500)
  })
  it('translates through Gemini Flash-Lite using a server-side API key', async () => {
    process.env.GEMINI_API_KEY = 'server-secret'
    const providerResponse = {
      candidates: [{ content: { parts: [{ text: '{"finnish":"hei","english":"hello","exampleFinnish":"Hei ystävä!","exampleEnglish":"Hello friend!"}' }] } }],
    }
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(providerResponse), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const response = await request(createApp()).post('/api/translate').send({ query: 'hei', direction: 'fi-en' })

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({ finnish: 'hei', english: 'hello' })
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toContain('/models/gemini-3.1-flash-lite:generateContent')
    expect(options.headers).toMatchObject({ 'x-goog-api-key': 'server-secret' })
    expect(JSON.stringify(response.body)).not.toContain('server-secret')
  })

  it('does not contact Gemini when its API key is unavailable', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await request(createApp()).post('/api/translate').send({ query: 'hei' })

    expect(response.status).toBe(503)
    expect(response.body.message).toMatch(/translation service/i)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
