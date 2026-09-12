import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('ttsService', () => {
  beforeEach(() => {
    vi.resetModules()
    class Utterance { lang=''; rate=1; voice: unknown; onend?:()=>void; onerror?:()=>void; constructor(public text:string){} }
    vi.stubGlobal('SpeechSynthesisUtterance', Utterance)
  })
  it('selects an installed Finnish voice before speaking', async () => {
    const finnishVoice = { lang: 'fi-FI', name: 'Finnish' }
    const speak = vi.fn()
    vi.stubGlobal('speechSynthesis', { speak, cancel:vi.fn(), speaking:false, getVoices:()=>[finnishVoice] })
    const { ttsService } = await import('./ttsService')
    expect(ttsService.speak('opiskelija')).toBe(true)
    expect(speak.mock.calls[0][0].voice).toBe(finnishVoice)
  })
  it('replaces the current pronunciation when another word is requested', async () => {
    const speak = vi.fn()
    const cancel = vi.fn()
    vi.stubGlobal('speechSynthesis', { speak, cancel, speaking:false, getVoices:()=>[] })
    const { ttsService } = await import('./ttsService')
    ttsService.speak('hei')
    ttsService.speak('kiitos')
    expect(cancel).toHaveBeenCalledOnce()
    expect(speak).toHaveBeenCalledTimes(2)
    expect(speak.mock.calls[1][0].text).toBe('kiitos')
  })
})
