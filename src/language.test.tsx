import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it } from 'vitest';
import App from './App';
import { courseLessons } from './data/courseCatalog';
import { getLessonVocabulary } from './data/lessonVocabulary';
import { english, translateText } from './i18n/translate';
import { languageStorageKey } from './i18n/Language';
import inventory from '../scripts/locale-inventory.json';

const thai = /[\u0e00-\u0e7f]/;
beforeEach(() => localStorage.clear());
function thaiLeftovers(container: HTMLElement) {
  const leftovers: string[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) if (thai.test(walker.currentNode.textContent ?? '')) leftovers.push(walker.currentNode.textContent!);
  for (const node of container.querySelectorAll('*')) for (const attr of ['aria-label','aria-description','placeholder','alt','title']) {
    const value = node.getAttribute(attr); if (value && thai.test(value)) leftovers.push(`${attr}: ${value}`);
  }
  return leftovers;
}
function expectEnglish(container: HTMLElement) { expect(thaiLeftovers(container)).toEqual([]); }
it('defaults to the existing Thai version and persists the Profile language choice', async () => {
  const user = userEvent.setup(); const view = render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Profile' })[0]);
  expect(screen.getByRole('button', { name: 'ไทย' })).toHaveAttribute('aria-pressed','true');
  await user.click(screen.getByRole('button', { name: 'English' }));
  expect(document.documentElement.lang).toBe('en');
  expect(localStorage.getItem(languageStorageKey)).toBe('en');
  expectEnglish(view.container);
  view.unmount(); render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Profile' })[0]);
  expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed','true');
  await user.click(screen.getByRole('button', { name: 'Thai' }));
  expect(document.documentElement.lang).toBe('th');
  expect(screen.getByText('เลือกภาษาสำหรับเมนู คำอธิบาย และคำแปลศัพท์')).toBeVisible();
});
it('provides English for every inventoried authored string and generated vocabulary meaning', () => {
  for (const {text} of inventory) {
    expect(english[text], text).toBeDefined();
    expect(translateText(text), text).not.toMatch(thai);
  }
  for (const lesson of courseLessons) for (const entry of getLessonVocabulary(lesson.id)) {
    expect(translateText(entry.th), `${lesson.id}: ${entry.fi}`).not.toMatch(thai);
    expect(translateText(entry.category ?? '')).not.toMatch(thai);
  }
  expect(translateText('Suomi / suomi / minä olen')).toBe('Suomi / suomi / minä olen');
});
it('renders all lesson tabs, homework answers and accessibility labels without Thai in English mode', async () => {
  localStorage.setItem(languageStorageKey,'en');
  const user = userEvent.setup(); const view = render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Lessons' })[0]);
  expectEnglish(view.container);
  const failures = new Set<string>();
  for (const lesson of courseLessons) {
    await user.click(screen.getByRole('button', { name: `${lesson.title}, ${lesson.summary}` }));
    const tabCount = screen.getAllByRole('tab').length;
    for (let index = 0; index < tabCount; index++) {
      await user.click(screen.getAllByRole('tab')[index]);
      for (const value of thaiLeftovers(view.container)) failures.add(value);
    }
    await user.click(screen.getByRole('button', { name: 'Back to Lessons' }));
  }
  expect([...failures]).toEqual([]);
}, 60000);
it('searches English vocabulary meanings and retains stored exercise drafts and completion', async () => {
  localStorage.setItem(languageStorageKey, 'en');
  localStorage.setItem('sisu:lesson8:v1', JSON.stringify({drafts:{'book12-5':'Kyllä, minä autan teitä.'},done:['Start']}));
  const user=userEvent.setup();render(<App />);
  await user.click(screen.getAllByRole('button',{name:'Lessons'})[0]);
  const lesson=courseLessons.find(l=>l.id===8)!;
  await user.click(screen.getByRole('button',{name:`${lesson.title}, ${lesson.summary}`}));
  await user.click(screen.getByRole('tab',{name:'Book'}));
  expect(screen.getAllByRole('textbox').some(input=>(input as HTMLTextAreaElement).value==='Kyllä, minä autan teitä.')).toBe(true);
  await user.click(screen.getByRole('tab',{name:'Vocab'}));
  await user.type(screen.getByRole('searchbox'),'weather');
  const vocab=screen.getByRole('region',{name:'Lesson vocabulary'});
  expect(within(vocab).getAllByRole('article').length).toBeGreaterThan(0);
  expectEnglish(vocab);
  expect(JSON.parse(localStorage.getItem('sisu:lesson8:v1')!).done).toEqual(['Start']);
});
