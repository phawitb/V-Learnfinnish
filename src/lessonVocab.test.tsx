import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import App from './App';
import { courseLessons } from './data/courseCatalog';
import { getLessonVocabulary } from './data/lessonVocabulary';
import { LessonVocab } from './pages/LessonVocab';
import { ttsService } from './services/ttsService';

beforeEach(() => { localStorage.clear(); vi.restoreAllMocks(); });
it('opens a translated, populated Vocab tab in every available lesson including Test 1', async () => {
  const user = userEvent.setup(); render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Lessons' })[0]);
  for (const lesson of courseLessons) {
    await user.click(screen.getByRole('button', { name: `${lesson.title}, ${lesson.summary}` }));
    await user.click(screen.getByRole('tab', { name: /Vocab$/ }));
    const panel = screen.getByRole('region', { name: 'คำศัพท์ประจำบท' });
    const entries = getLessonVocabulary(lesson.id);
    expect(entries.length).toBeGreaterThan(20);
    expect(within(panel).getAllByRole('article')).toHaveLength(entries.length);
    for (const entry of entries) { expect(entry.fi.trim()).not.toBe(''); expect(entry.th).toMatch(/[ก-๙]/); }
    expect(new Set(entries.map(e => e.fi.normalize('NFC'))).size).toBe(entries.length);
    await user.click(screen.getByRole('button', { name: 'Back to Lessons' }));
  }
}, 30000);
it('searches Finnish and Thai, shows empty results, and speaks the selected Finnish entry', async () => {
  const speak = vi.spyOn(ttsService, 'speak').mockReturnValue(true);
  const user = userEvent.setup(); render(<LessonVocab lessonId={6} />);
  const search = screen.getByRole('searchbox');
  const word = getLessonVocabulary(6).find(e => e.fi === 'sää')!;
  expect(word).toBeDefined();
  await user.type(search, ' SÄÄ ');
  expect(screen.getByRole('heading', { name: 'sää' })).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Listen to sää' }));
  expect(speak).toHaveBeenCalledWith('sää', undefined, expect.any(Function));
  await user.clear(search); await user.type(search, 'อากาศ');
  expect(screen.getByRole('heading', { name: 'sää' })).toBeVisible();
  await user.clear(search); await user.type(search, 'zzzz-no-match');
  expect(screen.queryAllByRole('article')).toHaveLength(0);
  expect(screen.getByText(/ไม่พบคำศัพท์/)).toBeVisible();
});
it('reports unavailable speech without losing vocabulary', async () => {
  vi.spyOn(ttsService, 'speak').mockReturnValue(false);
  render(<LessonVocab lessonId={1} />);
  await userEvent.click(screen.getAllByRole('button', { name: /Listen to/ })[0]);
  expect(screen.getByRole('alert')).toHaveTextContent('เล่นเสียงไม่ได้');
  expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
});
it('saves the new Vocab completion alongside existing early lesson progress', async () => {
  localStorage.setItem('sisu:lesson1:v1', JSON.stringify(['alphabet', 'phrases']));
  const user = userEvent.setup(); render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Lessons' })[0]);
  const lesson = courseLessons[0];
  await user.click(screen.getByRole('button', { name: `${lesson.title}, ${lesson.summary}` }));
  await user.click(screen.getByRole('tab', { name: /Vocab$/ }));
  await user.click(screen.getByRole('button', { name: 'ทำส่วนนี้เสร็จแล้ว' }));
  expect(JSON.parse(localStorage.getItem('sisu:lesson1:v1')!)).toEqual(['alphabet', 'phrases', 'vocab']);
});
it('keeps country and language spellings distinct while searching without case sensitivity', async () => {
  const entries = getLessonVocabulary('sep17');
  expect(entries.find(e => e.fi === 'Suomi')?.th).toContain('ฟินแลนด์');
  expect(entries.find(e => e.fi === 'suomi')?.th).toContain('ฟินแลนด์');
  render(<LessonVocab lessonId="sep17" />);
  await userEvent.type(screen.getByRole('searchbox'), 'SUOMI');
  expect(screen.getByRole('heading', { name: 'Suomi' })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'suomi' })).toBeVisible();
});
