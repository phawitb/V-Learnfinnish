import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it } from 'vitest';
import { TestTwoPage, testTwoStorageKey } from './pages/TestTwoPage';
import { LanguageProvider, languageStorageKey } from './i18n/Language';
import { testTwoScope, testTwoPages } from './data/testTwoScope';
import { grammarSections, grammarQuestions } from './data/testTwoGrammar';
import { readingSections, readingQuestions, readingWords } from './data/testTwoReading';
import { topicSections, topicQuestions, topicWords } from './data/testTwoTopics';
import { courseLessons, upcoming } from './data/courseCatalog';
const sections=[...grammarSections,...readingSections,...topicSections];
const questions=[...readingQuestions,...topicQuestions,...grammarQuestions];
beforeEach(()=>localStorage.clear());
it('covers every instructor-listed Test 2 page and keeps Test 1 out of its scope',()=>{
 expect(testTwoScope).toHaveLength(15);
 expect(testTwoPages).toEqual([36,57,60,61,62,64,66,67,80,87,88,89,90,91,94,95,96,97,98,102]);
 expect([...new Set(sections.flatMap(s=>s.pages))].sort((a,b)=>a-b)).toEqual(testTwoPages);
 expect(courseLessons.find(l=>l.id==='test2')?.section).toBe(626698);
 expect(upcoming.some(([id])=>id==='626698')).toBe(false);
 expect(questions.length).toBeGreaterThanOrEqual(68);
 expect(new Set(questions.map(q=>q.id)).size).toBe(questions.length);
 for(const q of questions){expect(q.explanation.th.length).toBeGreaterThan(20);expect(q.explanation.en.length).toBeGreaterThan(20);}
 const pages=new Set([...readingWords,...topicWords].map(w=>w.page));
 for(const p of [57,60,61,62,64,80,87,88,89,90,91,94,102]) expect(pages.has(p),`Vocabulary page ${p}`).toBe(true);
});
it('saves drafted practice answers and reveals worked answers without grading free text',async()=>{
 const user=userEvent.setup();const view=render(<TestTwoPage/>);
 await user.click(screen.getByRole('tab',{name:'Practice'}));
 const input=screen.getAllByRole('textbox')[0];
 await user.type(input,'Minun vastaus');
 expect(JSON.parse(localStorage.getItem(testTwoStorageKey)!).drafts[questions[0].id]).toBe('Minun vastaus');
 await user.click(screen.getAllByRole('button',{name:'ดูเฉลยและเหตุผล'})[0]);
 expect(screen.getByText(questions[0].explanation.th)).toBeVisible();
 view.unmount();render(<TestTwoPage/>);
 await user.click(screen.getByRole('tab',{name:'Practice'}));
 expect(screen.getAllByRole('textbox')[0]).toHaveValue('Minun vastaus');
});
it('persists topic completion and renders revealed explanations in English',async()=>{
 localStorage.setItem(languageStorageKey,'en');
 const user=userEvent.setup();const view=render(<LanguageProvider><TestTwoPage/></LanguageProvider>);
 await user.click(screen.getByRole('tab',{name:'Grammar'}));
 await user.click(screen.getAllByRole('checkbox')[0]);
 expect(JSON.parse(localStorage.getItem(testTwoStorageKey)!).done).toContain(grammarSections[0].id);
 await user.click(screen.getByRole('tab',{name:'Practice'}));
 await user.click(screen.getByRole('button',{name:'Reveal these answers'}));
 expect(view.container.textContent).not.toMatch(/[\u0e00-\u0e7f]/);
 for(const q of questions) expect(screen.getByText(q.explanation.en)).toBeVisible();
});
