import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import './styles.css'
import { ttsService } from './services/ttsService'
import { translationService } from './services/translationService'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
  vi.spyOn(Math, 'random').mockReturnValue(0.999)
})

async function openLessonOne() {
  await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
  await userEvent.click(screen.getByRole('button', { name: /Lesson 1.*Introduction to Finnish/i }))
}

async function openLessonTwo() {
  await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
  await userEvent.click(screen.getByRole('button', { name: /Lesson 2.*Everyday Finnish/i }))
}

async function openLessonThree() {
  await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
  await userEvent.click(screen.getByRole('button', { name: /Lesson 3.*Finnish sentence toolkit/i }))
}

async function chooseLetters(answer: string) {
  for (const letter of answer.match(/\p{L}/gu) || []) {
    const tile = screen.getAllByRole('button').find((button) =>
      button.getAttribute('aria-label')?.toLocaleLowerCase('fi-FI').startsWith(`choose letter ${letter.toLocaleLowerCase('fi-FI')},`)
      && !(button as HTMLButtonElement).disabled,
    )
    expect(tile).toBeDefined()
    await userEvent.click(tile!)
  }
}

describe('App', () => {
  it('tests the Finnish voice from Profile and reports success', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockImplementation((_text, onEnd) => {
      onEnd?.()
      return true
    })
    render(<App />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Profile' })[0])
    await userEvent.click(screen.getByRole('button', { name: 'Test sound' }))

    expect(speak).toHaveBeenCalledWith('Hei! Tervetuloa.', expect.any(Function), expect.any(Function))
    expect(screen.getByRole('status')).toHaveTextContent('Sound is working')
  })

  it('reports an unavailable Finnish voice from the Profile sound test', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(false)
    render(<App />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Profile' })[0])
    await userEvent.click(screen.getByRole('button', { name: 'Test sound' }))

    expect(screen.getByRole('status')).toHaveTextContent('Finnish voice unavailable')
  })

  it('opens with an immediately understandable dictionary search', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /understand finnish/i })).toBeInTheDocument()
    const search = screen.getByPlaceholderText(/search finnish or english/i)
    expect(search).toBeInTheDocument()
    expect(search).not.toHaveFocus()
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /translate/i }).closest('.search-line')).toBeInTheDocument()
  })
  it('filters recent searches while the search field is focused', async () => {
    const makeResult = (id: string, finnish: string, english: string) => ({
      id,
      query: finnish,
      direction: 'fi-en',
      finnish,
      english,
      exampleFinnish: `${finnish}.`,
      exampleEnglish: `${english}.`,
    })
    localStorage.setItem('sisu:history:v1', JSON.stringify([
      { id: 'recent-1', result: makeResult('word-1', 'opiskelija', 'student'), createdAt: '2026-09-13T10:00:00.000Z' },
      { id: 'recent-2', result: makeResult('word-2', 'kiitos', 'thank you'), createdAt: '2026-09-13T09:00:00.000Z' },
    ]))
    render(<App />)
    const search = screen.getByPlaceholderText(/search finnish or english/i)

    await userEvent.click(search)
    await userEvent.type(search, 'kii')

    expect(screen.getByRole('button', { name: 'Open kiitos, thank you' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Open opiskelija, student' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recent searches' })).toBeVisible()
    await userEvent.clear(search)
    await userEvent.type(search, 'zzz')
    expect(screen.getByText('No matching recent searches')).toBeVisible()
  })
  it('clears the query and open dictionary result with the search clear button', async () => {
    const result = {
      id: 'clear-word',
      query: 'kiitos',
      direction: 'fi-en',
      finnish: 'kiitos',
      english: 'thank you',
      exampleFinnish: 'Kiitos paljon.',
      exampleEnglish: 'Thank you very much.',
    }
    localStorage.setItem('sisu:history:v1', JSON.stringify([
      { id: 'clear-history', result, createdAt: '2026-09-13T10:00:00.000Z' },
    ]))
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: 'Open kiitos, thank you' }))
    expect(screen.getByRole('heading', { name: 'kiitos' })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }))

    expect(screen.getByPlaceholderText(/search finnish or english/i)).toHaveValue('')
    expect(screen.queryByRole('heading', { name: 'kiitos' })).not.toBeInTheDocument()
    expect(screen.getByText('Try searching')).toBeVisible()
  })
  it('reuses a case-insensitive cached search without asking the translation service again', async () => {
    const translate = vi.spyOn(translationService, 'translate')
    const result = {
      id: 'cached-word',
      query: 'kiitos',
      direction: 'fi-en',
      finnish: 'kiitos',
      english: 'thank you',
      exampleFinnish: 'Kiitos paljon.',
      exampleEnglish: 'Thank you very much.',
    }
    localStorage.setItem('sisu:history:v1', JSON.stringify([
      { id: 'cached-history', result, createdAt: '2026-09-13T10:00:00.000Z' },
    ]))
    render(<App />)
    const search = screen.getByPlaceholderText(/search finnish or english/i)

    await userEvent.type(search, '  KIITOS  ')
    await userEvent.click(screen.getByRole('button', { name: /Translate/i }))

    expect(translate).not.toHaveBeenCalled()
    expect(search).toHaveValue('kiitos')
    expect(screen.getByRole('heading', { name: 'kiitos' })).toBeVisible()
    expect(JSON.parse(localStorage.getItem('sisu:history:v1') ?? '[]')).toHaveLength(1)
  })
  it('reuses Finnish or English text from a previous result and moves it to the top', async () => {
    const translate = vi.spyOn(translationService, 'translate')
    const cachedResult = {
      id: 'cached-card', query: 'kiitos', direction: 'fi-en', finnish: 'kiitos', english: 'thank you',
      exampleFinnish: 'Kiitos paljon.', exampleEnglish: 'Thank you very much.',
    }
    const newerResult = {
      id: 'newer-card', query: 'talo', direction: 'fi-en', finnish: 'talo', english: 'house',
      exampleFinnish: 'Tämä on talo.', exampleEnglish: 'This is a house.',
    }
    localStorage.setItem('sisu:history:v1', JSON.stringify([
      { id: 'newer-history', result: newerResult, createdAt: '2026-09-13T11:00:00.000Z' },
      { id: 'cached-history', result: cachedResult, createdAt: '2026-09-13T10:00:00.000Z' },
    ]))
    render(<App />)
    const search = screen.getByPlaceholderText(/search finnish or english/i)

    await userEvent.type(search, '  THANK   YOU ')
    await userEvent.click(screen.getByRole('button', { name: /Translate/i }))

    expect(translate).not.toHaveBeenCalled()
    expect(search).toHaveValue('thank you')
    expect(screen.getByRole('heading', { name: 'kiitos' })).toBeVisible()
    const saved = JSON.parse(localStorage.getItem('sisu:history:v1') ?? '[]')
    expect(saved).toHaveLength(2)
    expect(saved.map((item: { id: string }) => item.id)).toEqual(['cached-history', 'newer-history'])
  })
  it('shows a helpful not-found state instead of a service error', async () => {
    vi.spyOn(translationService, 'translate').mockRejectedValue(new Error('translation_not_found'))
    render(<App />)

    await userEvent.type(screen.getByPlaceholderText(/search finnish or english/i), 'asdfgh')
    await userEvent.click(screen.getByRole('button', { name: /Translate/i }))

    expect(await screen.findByText('Word not found')).toBeVisible()
    expect(screen.getByText('Check the spelling or try another word.')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
  })
  it('opens a successful translation as a focused word view', async () => {
    vi.spyOn(translationService, 'translate').mockResolvedValue({
      id: 'found-word', query: 'talo', direction: 'auto', finnish: 'talo', english: 'house',
      exampleFinnish: 'Tämä on talo.', exampleEnglish: 'This is a house.',
    })
    render(<App />)

    await userEvent.type(screen.getByPlaceholderText(/search finnish or english/i), 'talo')
    await userEvent.click(screen.getByRole('button', { name: /Translate/i }))

    expect(await screen.findByRole('heading', { name: 'talo' })).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Recent searches' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeVisible()
  })
  it('replaces an open word with a service error when a new search fails', async () => {
    const result = {
      id: 'old-word', query: 'talo', direction: 'fi-en', finnish: 'talo', english: 'house',
      exampleFinnish: 'Tämä on talo.', exampleEnglish: 'This is a house.',
    }
    localStorage.setItem('sisu:history:v1', JSON.stringify([
      { id: 'old-history', result, createdAt: '2026-09-13T10:00:00.000Z' },
    ]))
    vi.spyOn(translationService, 'translate').mockRejectedValue(new Error('translation_failed'))
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Open talo, house' }))
    const search = screen.getByPlaceholderText(/search finnish or english/i)
    await userEvent.type(search, 'x')
    await userEvent.click(screen.getByRole('button', { name: /Translate/i }))

    expect(await screen.findByText('Translation unavailable')).toBeVisible()
    expect(screen.queryByRole('heading', { name: 'talo' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeVisible()
  })
  it('shows persisted recent searches inside Dictionary and lets users reopen or remove them', async () => {
    const result = {
      id: 'history-word',
      query: 'minä',
      direction: 'fi-en',
      finnish: 'minä',
      english: 'I',
      exampleFinnish: 'Minä olen opiskelija.',
      exampleEnglish: 'I am a student.',
    }
    localStorage.setItem('sisu:history:v1', JSON.stringify([
      { id: 'history-1', result, createdAt: '2026-09-12T12:00:00.000Z' },
    ]))

    render(<App />)
    expect(screen.getByRole('heading', { name: 'Recent searches' })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Open minä, I' }))
    expect(screen.getByRole('heading', { name: 'minä' })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove minä' }))
    expect(screen.queryByRole('button', { name: 'Open minä, I' })).not.toBeInTheDocument()
  })
  it('marks the dictionary as search-focused while the search keyboard is active', async () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/search finnish or english/i)

    await userEvent.click(input)

    expect(input.closest('.dictionary')).toHaveClass('search-focused')
    await userEvent.tab()
    expect(input.closest('.dictionary')).not.toHaveClass('search-focused')
  })
  it('restores the mobile page when the on-screen keyboard is dismissed', async () => {
    const viewport = new EventTarget() as VisualViewport
    Object.defineProperty(viewport, 'height', { value: 800, writable: true })
    Object.defineProperty(window, 'visualViewport', { value: viewport, configurable: true })
    render(<App />)
    const input = screen.getByPlaceholderText(/search finnish or english/i)

    await userEvent.click(input)
    Object.defineProperty(viewport, 'height', { value: 400, writable: true })
    viewport.dispatchEvent(new Event('resize'))
    expect(input.closest('.dictionary')).toHaveClass('search-focused')

    Object.defineProperty(viewport, 'height', { value: 800, writable: true })
    viewport.dispatchEvent(new Event('resize'))
    await waitFor(() => expect(input.closest('.dictionary')).not.toHaveClass('search-focused'))
    Reflect.deleteProperty(window, 'visualViewport')
  })
  it('navigates to the favorites empty state', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /favorites/i })[0])
    expect(screen.getByText(/no favorites yet/i)).toBeInTheDocument()
  })
  it('uses four destinations and opens Lesson 1 through the Lessons hub', async () => {
    render(<App />)
    expect(screen.queryByRole('button', { name: 'History' })).not.toBeInTheDocument()
    await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
    expect(screen.getAllByRole('heading', { name: 'Lessons' })).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: /Lesson 1.*Introduction to Finnish/i }))
    expect(screen.getByRole('button', { name: 'Back to Lessons' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Back to Lessons' }).closest('.mobile-head')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Tervetuloa Suomeen/i })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Back to Lessons' }))
    expect(screen.getAllByRole('heading', { name: 'Lessons' })).toHaveLength(2)
  })
  it('opens Lesson 2 from the Lessons hub and returns with the mobile back button', async () => {
    render(<App />)
    await openLessonTwo()

    expect(screen.getByTestId('mobile-page-title')).toHaveTextContent('Lesson 2')
    expect(screen.getByRole('heading', { name: /suomea joka päivä/i })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Back to Lessons' }))
    expect(screen.getAllByRole('heading', { name: 'Lessons' })).toHaveLength(2)
  })
  it('opens a comprehensive Lesson 3 from the Lessons hub', async () => {
    render(<App />)
    await openLessonThree()

    expect(screen.getByTestId('mobile-page-title')).toHaveTextContent('Lesson 3')
    expect(screen.getByRole('heading', { name: /rakenna suomea/i })).toBeVisible()
    expect(screen.getAllByRole('tab')).toHaveLength(10)
    expect(screen.getByText(/กฎสระ.*การผันกริยา.*ประโยคคำถาม/i)).toBeVisible()
  })
  it('teaches every Lesson 3 topic with Finnish audio and personalized examples', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await openLessonThree()

    await userEvent.click(screen.getByRole('tab', { name: /vowels/i }))
    expect(screen.getByText('a · o · u')).toBeVisible()
    expect(screen.getByText('suklaajäätelössä')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Listen to kurssiko' }))
    expect(speak).toHaveBeenCalledWith('kurssiko')

    await userEvent.click(screen.getByRole('tab', { name: /verbs/i }))
    expect(screen.getByText('puhuvat')).toBeVisible()
    expect(screen.getByText('kysyvät')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /negative/i }))
    expect(screen.getByText('eivät puhu')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /yes.*no/i }))
    expect(screen.getByText('Ooks sä suomalainen?')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /question words/i }))
    expect(screen.getByRole('button', { name: 'Listen to minkämaalainen' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Listen to Mihin sinä menet?' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Listen to Menen kotiin.' })).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /introduce/i }))
    expect(screen.getByText('Olen kotoisin Bangkokista, Thaimaasta.')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Listen to Thaimaa' })).toBeVisible()
    expect(screen.getByText(/Minun äidinkieleni on englanti/)).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /exercises/i }))
    expect(screen.getByText('HARJOITUKSET 6 · 16 · 20–21 · 23–27')).toBeVisible()
    expect(screen.getByText('Jyväskylässä')).toBeVisible()
    expect(screen.getByText('Etsivätkö he bussipysäkkiä?')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /time/i }))
    expect(screen.getByText('Hyvää viikonloppua')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /check/i }))
    expect(screen.getByText(/คำถาม 1 จาก 15/i)).toBeVisible()
  })
  it('adds Lesson 3 study material to Practice', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])

    expect(screen.getByRole('button', { name: /Lesson 3 — Vowel harmony.*items/i })).toBeVisible()
    expect(screen.getAllByRole('button', { name: /Lesson 3 — Questions.*items/i })[0]).toBeVisible()
    expect(screen.getByRole('button', { name: /Lesson 3 — Introductions.*items/i })).toBeVisible()
  })
  it('teaches Lesson 2 grammar, days, numbers, and useful sentences with Finnish audio', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await openLessonTwo()

    await userEvent.click(screen.getByRole('tab', { name: /olla/i }))
    expect(screen.getByText('mä oon')).toBeVisible()
    expect(screen.getByText('พวกเรา เป็น/อยู่/คือ')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'Listen to me ollaan' }))
    expect(speak).toHaveBeenCalledWith('me ollaan')

    await userEvent.click(screen.getByRole('tab', { name: /time/i }))
    expect(screen.getByText('maanantaina')).toBeVisible()
    expect(screen.getByText('ylihuomenna')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /numbers/i }))
    expect(screen.getByText('kaksikymmentä')).toBeVisible()
    expect(screen.getByText('biljoona')).toBeVisible()
    await userEvent.click(screen.getByRole('tab', { name: /sentences/i }))
    expect(screen.getByText('Meneekö tämä bussi Ouluun?')).toBeVisible()
    expect(screen.getByText('รถบัสคันนี้ไปเมือง Oulu หรือเปล่า?')).toBeVisible()
  })
  it('speaks the base weekday names in Lesson 2', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await openLessonTwo()
    await userEvent.click(screen.getByRole('tab', { name: /time/i }))

    await userEvent.click(screen.getByRole('button', { name: 'Listen to maanantai' }))
    expect(speak).toHaveBeenCalledWith('maanantai')
    await userEvent.click(screen.getByRole('button', { name: 'Listen to viikonloppu' }))
    expect(speak).toHaveBeenCalledWith('viikonloppu')
  })
  it('removes page subtitles and avoids repeating Lesson 1 on its card', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
    expect(screen.queryByText('Build your Finnish step by step.')).not.toBeInTheDocument()
    const lessonCard = screen.getByRole('button', { name: /Lesson 1.*Introduction to Finnish/i })
    expect(lessonCard).not.toHaveTextContent('LESSON 1')
    expect(lessonCard).toHaveTextContent('Introduction to Finnish')
  })
  it('uses clean page titles and adds Search and Profile to mobile navigation', async () => {
    render(<App />)
    expect(screen.getByTestId('mobile-page-title')).toHaveTextContent('Search')
    expect(screen.queryByRole('button', { name: 'Dictionary' })).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Search' })).toHaveLength(2)
    await userEvent.click(screen.getAllByRole('button', { name: 'Profile' })[0])
    expect(screen.getByTestId('mobile-page-title')).toHaveTextContent('Profile')
    expect(screen.getByText('Favorite words')).toBeVisible()
    await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
    await userEvent.click(screen.getByRole('button', { name: /Lesson 1.*Introduction to Finnish/i }))
    expect(screen.getByTestId('mobile-page-title')).toHaveTextContent('Lesson 1')
    await userEvent.click(screen.getAllByRole('button', { name: 'Profile' })[0])
    expect(screen.getByTestId('mobile-page-title')).toHaveTextContent('Profile')
  })
  it('focuses Search when its navigation button is pressed and keeps language detection automatic', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Lessons' })[0])
    await userEvent.click(screen.getAllByRole('button', { name: 'Search' })[0])
    await waitFor(() => expect(screen.getByPlaceholderText(/search finnish or english/i)).toHaveFocus())
    expect(screen.queryByRole('combobox', { name: 'Translation direction' })).not.toBeInTheDocument()
  })
  it('keeps Words to review above the word groups', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    expect(screen.getByText('Words to review')).toBeVisible()
    expect(screen.queryByText('Due today')).not.toBeInTheDocument()
    expect(screen.queryByText('Mastered')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Choose a word group' })).toBeVisible()
    expect(screen.queryByRole('group', { name: 'Choose your practice' })).not.toBeInTheDocument()
  })
  it('scrolls to the top when opening pages, practice subpages, and the next question', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    scrollTo.mockClear()

    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' })

    scrollTo.mockClear()
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' })

    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    const card = screen.getByTestId('flashcard-face').closest('.flashcard') as HTMLElement
    card.scrollTop = 120
    await userEvent.click(screen.getByRole('button', { name: 'Know' }))
    expect(card.scrollTop).toBe(0)
  })
  it('flips a flashcard and advances with know or do not know', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await waitFor(() => expect(speak).toHaveBeenCalledWith('Hei!'))
    const card = screen.getByTestId('flashcard-face')
    expect(card).toHaveTextContent('Hei!')
    expect(card).not.toHaveTextContent('Hi!')
    await userEvent.click(card)
    expect(card.querySelector('h1')).toHaveTextContent('Hei!')
    expect(card).toHaveTextContent('Hi!')
    await userEvent.click(card)
    expect(card.querySelector('h1')).toHaveTextContent('Hei!')
    expect(card).not.toHaveTextContent('Hi!')
    const knowButton = screen.getByRole('button', { name: 'Know' })
    const unknownButton = screen.getByRole('button', { name: "Don't know" })
    expect(knowButton).toHaveTextContent(/^✓$/)
    expect(unknownButton).toHaveTextContent(/^✕$/)
    expect(knowButton).toHaveClass('know')
    expect(unknownButton).toHaveClass('dont-know')
    await userEvent.click(knowButton)
    expect(screen.getByTestId('flashcard-face')).toHaveTextContent('ja')
    expect(speak).toHaveBeenCalledWith('ja')
  })
  it('adds a missed flashcard to Words to review and removes it after a correct review', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    expect(screen.getByRole('button', { name: /0 words to review/i })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await userEvent.click(screen.getByRole('button', { name: "Don't know" }))
    await userEvent.click(screen.getByRole('button', { name: /close practice/i }))
    await userEvent.click(screen.getByRole('button', { name: /back to word groups/i }))

    const reviewButton = screen.getByRole('button', { name: /1 word to review/i })
    expect(reviewButton).toBeEnabled()
    await userEvent.click(reviewButton)
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.getByTestId('flashcard-face')).toHaveTextContent('Hei!')
    await userEvent.click(screen.getByRole('button', { name: 'Know' }))
    expect(screen.getByRole('heading', { name: /hienoa/i })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /practice again/i }))
    expect(screen.getByRole('button', { name: /0 words to review/i })).toBeDisabled()
  })
  it('opens Lesson 1 with the course alphabet audio and phrase practice', async () => {
    render(<App />)
    await openLessonOne()
    expect(screen.getByRole('heading', { name: /tervetuloa suomeen/i })).toBeInTheDocument()
    expect(screen.queryByText(/alphabet · greetings · pronunciation/i)).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /begin with the alphabet/i }))
    expect(screen.getByTestId('alphabet-audio')).toHaveAttribute('src', '/lesson1/004-kappale-1-aakkoset.mp3')
  })
  it('provides a comprehensive Lesson 1 knowledge check', async () => {
    render(<App />)
    await openLessonOne()
    await userEvent.click(screen.getByRole('tab', { name: /check/i }))
    expect(screen.getByText(/question 1 of 20/i)).toBeInTheDocument()
    expect(screen.getByText(/alphabet & sounds/i)).toBeInTheDocument()
  })
  it('includes vocabulary from printed book pages 12 and 13', async () => {
    render(<App />)
    await openLessonOne()
    await userEvent.click(screen.getByRole('tab', { name: /phrases/i }))
    expect(screen.getByRole('heading', { name: /book vocabulary/i })).toBeInTheDocument()
    expect(screen.getByText('suomen kurssi')).toBeInTheDocument()
    expect(screen.getByText('course day')).toBeInTheDocument()
    expect(screen.getByText('Heippa!')).toBeInTheDocument()
  })
  it('speaks Finnish content when it is clicked on the Basics page', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await openLessonOne()
    await userEvent.click(screen.getByRole('tab', { name: /basics/i }))
    await userEvent.click(screen.getByRole('button', { name: 'Listen to minä' }))
    expect(speak).toHaveBeenCalledWith('minä')
  })
  it('practises matching a Finnish letter name to its sound', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await openLessonOne()
    await userEvent.click(screen.getByRole('tab', { name: /sounds/i }))
    expect(screen.getByRole('heading', { name: /sound matching practice/i })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /play mystery sound/i }))
    expect(speak).toHaveBeenCalledWith('aa')
    await userEvent.click(screen.getByRole('button', { name: 'A' }))
    expect(screen.getByText(/oikein.*correct/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next sound/i })).toBeEnabled()
  })
  it('builds a full sound-practice round covering all 29 letters', async () => {
    render(<App />)
    await openLessonOne()
    await userEvent.click(screen.getByRole('tab', { name: /sounds/i }))
    expect(screen.getByText('1 / 29')).toBeInTheDocument()
    expect(screen.getByText(/complete all 29 letters/i)).toBeInTheDocument()
  })
  it('includes the complete introductions and small-talk lesson with audio and translations', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await openLessonOne()
    await userEvent.click(screen.getByRole('tab', { name: /basics/i }))
    expect(screen.getByRole('heading', { name: /introductions & small talk/i })).toBeInTheDocument()
    expect(screen.getByText('What’s your name?')).toBeInTheDocument()
    expect(screen.getByText('How’s it going?')).toBeInTheDocument()
    expect(screen.getByText('Nothing special.')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Listen to Mitäs tässä' }))
    expect(speak).toHaveBeenCalledWith('Mitäs tässä')
  })
  it('splits lesson vocabulary into selectable practice groups of at most ten items', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    expect(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Vocab — Page 12 \(4\).*8 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Useful Phrases — Pages 12–13 \(4\).*4 items/i })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    expect(screen.getByText('Vocab — Page 12 (1)')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /listen to/i })).toHaveLength(10)
  })
  it('keeps word-group cards connected within their category and separates other categories', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])

    const vocabOne = screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i })
    const vocabTwo = screen.getByRole('button', { name: /Vocab — Page 12 \(2\).*10 items/i })
    const phrasesOne = screen.getByRole('button', { name: /Useful Phrases — Pages 12–13 \(1\).*10 items/i })

    expect(vocabOne.closest('.practice-group-section')).toBe(vocabTwo.closest('.practice-group-section'))
    expect(vocabOne.closest('.practice-group-section')).not.toBe(phrasesOne.closest('.practice-group-section'))
  })
  it('offers number and color word groups in chunks of at most ten', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    expect(screen.getByRole('button', { name: /Numbers \(1\).*10 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Numbers \(3\).*9 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Colors \(1\).*10 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Colors \(2\).*2 items/i })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Numbers \(1\).*10 items/i }))
    expect(screen.getByText('Numbers (1)')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.getByTestId('flashcard-face')).toHaveTextContent('nolla')
  })
  it('adds missing Lesson 2 vocabulary to Practice with English translations', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])

    expect(screen.getByRole('button', { name: /Lesson 2 — Olla \(1\).*10 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Lesson 2 — Days & Time \(1\).*10 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Lesson 2 — Numbers \(1\).*6 items/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Lesson 2 — Everyday Sentences \(1\).*10 items/i })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Lesson 2 — Days & Time \(1\).*10 items/i }))
    expect(screen.getByText('maanantaina')).toBeVisible()
    expect(screen.getByText('on Monday')).toBeVisible()
    expect(screen.queryByText('วันจันทร์')).not.toBeInTheDocument()
  })
  it('shows a group word list before choosing a practice mode and starting', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    expect(screen.getByRole('heading', { name: 'Choose a word group' })).toBeVisible()
    expect(screen.queryByRole('group', { name: 'Choose your practice' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))

    expect(screen.getByRole('heading', { name: 'Colors (2)' })).toBeVisible()
    expect(screen.queryByText('WORD GROUP')).not.toBeInTheDocument()
    expect(screen.getByText('ruskea')).toBeVisible()
    expect(screen.getByText('brown')).toBeVisible()
    expect(screen.getByText('turkoosi')).toBeVisible()
    expect(screen.getByText('turquoise')).toBeVisible()
    expect(screen.getByRole('group', { name: 'Choose your practice' })).toBeVisible()
    expect(screen.queryByTestId('flashcard-face')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /multiple choice/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.getByRole('heading', { name: 'ruskea' })).toBeInTheDocument()
  })
  it('puts practice choices first and keeps an icon-only play control beside Practice', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))

    const choices = screen.getByRole('group', { name: 'Choose your practice' }).closest('.preview-practice-options')!
    const wordList = screen.getByText('ruskea').closest('.practice-word-list')!
    const play = screen.getByRole('button', { name: 'Play all words' })
    const start = screen.getByRole('button', { name: 'Start practice' })

    expect(choices.compareDocumentPosition(wordList) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(play).toHaveTextContent('')
    expect(play.parentElement).toBe(start.parentElement)
    expect(choices.compareDocumentPosition(play.parentElement!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(play.parentElement!.compareDocumentPosition(wordList) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
  it('plays every word in the selected group in list order', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockImplementation((_text, onEnd) => {
      onEnd?.()
      return true
    })
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))

    await userEvent.click(screen.getByRole('button', { name: /play all words/i }))

    expect(speak.mock.calls.map(([text]) => text)).toEqual(['ruskea', 'turkoosi'])
  })
  it('highlights each word while Play all is speaking it', async () => {
    let finishCurrent: (() => void) | undefined
    vi.spyOn(ttsService, 'speak').mockImplementation((_text, onEnd) => {
      finishCurrent = onEnd
      return true
    })
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))

    await userEvent.click(screen.getByRole('button', { name: /play all words/i }))
    expect(screen.getByText('ruskea').closest('.practice-word-row')).toHaveAttribute('aria-current', 'true')
    expect(screen.getByText('turkoosi').closest('.practice-word-row')).not.toHaveAttribute('aria-current')

    act(() => finishCurrent?.())
    expect(screen.getByText('ruskea').closest('.practice-word-row')).not.toHaveAttribute('aria-current')
    expect(screen.getByText('turkoosi').closest('.practice-word-row')).toHaveAttribute('aria-current', 'true')
  })
  it('marks long flashcard words for a smaller responsive type size', async () => {
    localStorage.setItem('sisu:favorites:v1', JSON.stringify([{
      id: 'long-word', finnish: 'epäjärjestelmällistyttämättömyydellänsäkäänköhän', english: 'a very long word',
      favorite: true, createdAt: '2026-09-13T10:00:00.000Z', nextReviewAt: '2026-09-13T10:00:00.000Z',
      difficulty: 'new', mastered: false,
    }]))
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Favorites.*1 item/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))

    expect(screen.getByRole('heading', { name: /epäjärjestelmällistyttämättömyydellänsäkäänköhän/i })).toHaveClass('word-extra-long')
  })
  it('keeps multiple-choice content mounted and adds Continue after an answer', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /multiple choice/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    const choices = screen.getAllByTestId('multiple-choice-option').map((option) => option.textContent)
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'turquoise' }))
    expect(screen.getAllByTestId('multiple-choice-option').map((option) => option.textContent)).toEqual(choices)
    expect(screen.getByRole('button', { name: 'Continue' }).closest('.quiz-action')).toBeInTheDocument()
  })
  it('hides the matching title while preserving an accessible label', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /^matching$/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.queryByRole('heading', { name: 'Match the pairs' })).not.toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Match the pairs' })).toBeVisible()
    expect(screen.queryByText('Connect Finnish with English')).not.toBeInTheDocument()
  })
  it('saves a group level from first attempts only after completion', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /multiple choice/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await userEvent.click(screen.getByRole('button', { name: 'turquoise' }))
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    await userEvent.click(screen.getByRole('button', { name: 'turquoise' }))
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    await userEvent.click(screen.getByRole('button', { name: 'brown' }))
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    await userEvent.click(screen.getByRole('button', { name: /practice again/i }))
    await userEvent.click(screen.getByRole('button', { name: /back to word groups/i }))

    expect(screen.getByLabelText('Level 3 of 5, latest score 50 percent')).toBeVisible()
  })

  it('does not change a group level when a session is closed early', async () => {
    localStorage.setItem('sisu:practice-progress:v1', JSON.stringify({
      reviewWords: [],
      groups: {
        'colors-2': { groupId: 'colors-2', level: 4, accuracy: 75, completedAt: '2026-09-11T10:00:00.000Z' },
      },
    }))
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await userEvent.click(screen.getByRole('button', { name: 'Know' }))
    await userEvent.click(screen.getByRole('button', { name: /close practice/i }))
    await userEvent.click(screen.getByRole('button', { name: /back to word groups/i }))

    expect(screen.getByLabelText('Level 4 of 5, latest score 75 percent')).toBeVisible()
  })
  it('randomizes every practice mode again whenever a group is opened', async () => {
    vi.mocked(Math.random).mockReturnValue(0)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.getByTestId('flashcard-face')).toHaveTextContent('ja')
    await userEvent.click(screen.getByRole('button', { name: /close practice/i }))
    vi.mocked(Math.random).mockReturnValue(0.999)
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.getByTestId('flashcard-face')).toHaveTextContent('Hei!')
  })
  it('speaks multiple-choice prompts and gives correct and incorrect audio feedback', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /multiple choice/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await waitFor(() => expect(speak).toHaveBeenCalledWith('Hei!'))
    speak.mockClear()
    await userEvent.click(screen.getByRole('button', { name: /listen to hei/i }))
    expect(speak).toHaveBeenCalledWith('Hei!', expect.any(Function), expect.any(Function))
    await userEvent.click(screen.getByRole('button', { name: 'Hi!' }))
    expect(speak).toHaveBeenCalledWith('oikein')
  })
  it('builds multiple-choice alternatives only from answers in the selected group', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /multiple choice/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    const choices = screen.getAllByTestId('multiple-choice-option')
    expect(choices).toHaveLength(2)
    expect(choices.map((choice) => choice.textContent).sort()).toEqual(['brown', 'turquoise'])
  })
  it('repeats missed multiple-choice words until every word is answered correctly', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /multiple choice/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await userEvent.click(screen.getByRole('button', { name: 'and' }))
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(1)
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    for (const answer of ['and', 'Welcome!', 'Sorry! / Excuse me!', 'is …?', 'here', 'Finnish course', 'yes', 'to be', 'this']) {
      await userEvent.click(screen.getByRole('button', { name: answer }))
      await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    }
    expect(screen.getByRole('heading', { name: 'Hei!' })).toBeInTheDocument()
    expect(screen.getByText('9 of 10')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Hi!' }))
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByRole('heading', { name: /hienoa/i })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(1)
  })
  it('matches one pair at a time, speaks Finnish, and fades completed pairs', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /^matching$/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    const finnishCards = screen.getAllByTestId('match-fi')
    const englishCards = screen.getAllByTestId('match-en')
    finnishCards.forEach((card, row) => {
      expect(card.dataset.matchId).not.toBe(englishCards[row].dataset.matchId)
    })
    await userEvent.click(screen.getByRole('button', { name: 'Hei!' }))
    expect(speak).toHaveBeenCalledWith('Hei!')
    await userEvent.click(screen.getByRole('button', { name: 'Hi!' }))
    expect(screen.getByRole('button', { name: 'Hei!' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Hi!' })).toBeDisabled()
  })
  it('adds both mismatched words to review and removes each correct matching pair', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Colors \(2\).*2 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /^matching$/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await userEvent.click(screen.getByRole('button', { name: 'ruskea' }))
    await userEvent.click(screen.getByRole('button', { name: 'turquoise' }))
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(2)

    await userEvent.click(screen.getByRole('button', { name: 'ruskea' }))
    await userEvent.click(screen.getByRole('button', { name: 'brown' }))
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: 'turkoosi' }))
    await userEvent.click(screen.getByRole('button', { name: 'turquoise' }))
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(2)
  })
  it('shows selected letters inside the fill-in-the-blank prompt', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /fill in the blank/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    expect(screen.getByRole('heading', { name: 'Hi!' })).toHaveClass('blank-question')
    expect(screen.queryByText(/Hint:/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /listen to hei/i })).not.toBeInTheDocument()
    expect(screen.queryByPlaceholderText(/type the missing/i)).not.toBeInTheDocument()
    expect(screen.getByTestId('live-blank')).toHaveTextContent('_ _ _ !')
    await chooseLetters('Hei')
    expect(screen.getByTestId('live-blank')).toHaveTextContent('H e i !')
    await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByText('Correct!')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /check answer/i })).not.toBeInTheDocument()
    expect(screen.queryByTestId('blank-answer-reveal')).not.toBeInTheDocument()
    expect(screen.getByTestId('blank-answer-row')).toHaveTextContent('H e i !')
    expect(screen.getByTestId('blank-answer-row')).toContainElement(
      screen.getByRole('button', { name: /listen to hei/i }),
    )
  })
  it('builds a fill-in answer from fading letter tiles and restores the last tile on delete', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /fill in the blank/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))

    expect(screen.queryByPlaceholderText(/type the missing/i)).not.toBeInTheDocument()
    const h = screen.getByRole('button', { name: /choose letter h/i })
    await userEvent.click(h)
    expect(screen.getByTestId('live-blank')).toHaveTextContent('H _ _ !')
    expect(h).toHaveClass('used')
    await userEvent.click(screen.getByRole('button', { name: 'Delete last letter' }))
    expect(screen.getByTestId('live-blank')).toHaveTextContent('_ _ _ !')
    expect(h).not.toHaveClass('used')
  })
  it('checks fill-in answers from letters only without requiring punctuation', async () => {
    const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /fill in the blank/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await chooseLetters('Hei')
    expect(screen.getByTestId('live-blank')).toHaveTextContent('H e i !')
    await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
    expect(screen.getByText('Correct!')).toBeInTheDocument()
    expect(speak).toHaveBeenCalledWith('Hei!')
    speak.mockClear()
    await userEvent.click(screen.getByRole('button', { name: /listen to hei/i }))
    expect(speak).toHaveBeenCalledWith('Hei!', expect.any(Function), expect.any(Function))
  })
  it('preserves a visibly wider gap between words in fill-in prompts', async () => {
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /fill in the blank/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    for (const answer of ['Hei', 'ja', 'Tervetuloa', 'Anteeksi', 'onko', 'täällä']) {
      await chooseLetters(answer)
      await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    }
    const prompt = screen.getByTestId('live-blank')
    expect(prompt.textContent).toContain('_   _')
    expect(getComputedStyle(prompt).whiteSpace).toBe('pre-wrap')
  })
  it('repeats missed fill-in words until every word is answered correctly', async () => {
    vi.spyOn(ttsService, 'speak').mockReturnValue(true)
    render(<App />)
    await userEvent.click(screen.getAllByRole('button', { name: /practice/i })[0])
    await userEvent.click(screen.getByRole('button', { name: /Vocab — Page 12 \(1\).*10 items/i }))
    await userEvent.click(screen.getByRole('button', { name: /fill in the blank/i }))
    await userEvent.click(screen.getByRole('button', { name: /start practice/i }))
    await chooseLetters('eHi')
    await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(1)
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    for (const answer of ['ja', 'Tervetuloa', 'Anteeksi', 'onko', 'täällä', 'suomen kurssi', 'joo', 'olla', 'tämä']) {
      await chooseLetters(answer)
      await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
      await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    }
    expect(screen.getByTestId('live-blank')).toHaveTextContent('_ _ _ !')
    expect(screen.getByText('9 of 10')).toBeInTheDocument()
    await chooseLetters('Hei')
    await userEvent.click(screen.getByRole('button', { name: /check answer/i }))
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByRole('heading', { name: /hienoa/i })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('sisu:practice-progress:v1') || '{}').reviewWords).toHaveLength(1)
  })
})
