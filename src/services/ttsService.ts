let speaking = false
let activeRequest = 0
export const ttsService = {
  supported: () => typeof window !== 'undefined' && 'speechSynthesis' in window,
  speak(text: string, onEnd?: () => void, onError?: () => void) {
    if (!this.supported()) return false
    if (speaking) { speechSynthesis.cancel(); speaking = false }
    const requestId = ++activeRequest
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'fi-FI'; utterance.rate = .86
    const voices = speechSynthesis.getVoices?.() || []
    const finnishVoice = voices.find(voice => voice.lang.toLowerCase() === 'fi-fi') || voices.find(voice => voice.lang.toLowerCase().startsWith('fi'))
    if (finnishVoice) utterance.voice = finnishVoice
    utterance.onend = () => {
      if (requestId !== activeRequest) return
      speaking = false; onEnd?.()
    }
    utterance.onerror = () => {
      if (requestId !== activeRequest) return
      speaking = false; onError?.()
    }
    speaking = true; speechSynthesis.speak(utterance); return true
  },
  stop() {
    activeRequest += 1
    if (this.supported()) speechSynthesis.cancel()
    speaking = false
  }
}
