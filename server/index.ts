import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildPrompt, normalizeOllamaResponse } from './translation.js'
import type { Direction } from '../src/types.js'

export function createApp() {
const app = express(); app.use(cors()); app.use(express.json({ limit: '32kb' }))
app.post('/api/translate', async (req, res) => {
  const query = typeof req.body?.query === 'string' ? req.body.query.trim() : ''
  const direction: Direction = ['auto','fi-en','en-fi'].includes(req.body?.direction) ? req.body.direction : 'auto'
  if (!query || query.length > 500) return res.status(400).json({ message: 'Please enter a shorter word or sentence.' })
  try {
    const response = await fetch('http://127.0.0.1:11434/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ model:'qwen2.5:7b', prompt:buildPrompt(query, direction), stream:false, format:'json', options:{ temperature:.2 } }) })
    if (!response.ok) throw new Error('ollama_unavailable')
    const body = await response.json() as { response?: string }
    res.json(normalizeOllamaResponse(body.response || '', query, direction))
  } catch (error) { console.error('Translation request failed:', error); res.status(503).json({ message:"Sorry, I couldn't translate that. Please make sure Ollama is running and try again." }) }
})
const here = path.dirname(fileURLToPath(import.meta.url)), dist = path.resolve(here, '../dist')
app.use(express.static(dist)); app.get('/{*splat}', (_req,res) => res.sendFile(path.join(dist,'index.html')))
return app
}
if (process.env.NODE_ENV !== 'test') createApp().listen(4174, '127.0.0.1', () => console.log('Sisu server: http://127.0.0.1:4174'))
