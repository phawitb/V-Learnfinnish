import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach,it,expect} from 'vitest';
import App from './App';
import {courseLessons,upcoming} from './data/courseCatalog';
beforeEach(()=>localStorage.clear());
it('opens every available Moodle date with the exact title and preserves chronological order',async()=>{
 const user=userEvent.setup();render(<App/>);
 await user.click(screen.getAllByRole('button',{name:'Lessons'})[0]);
 const cards=screen.getAllByRole('button').filter(b=>b.classList.contains('lesson-card'));
 expect(cards.map(b=>b.querySelector('b')?.textContent)).toEqual(courseLessons.map(l=>l.title));
 expect(courseLessons.map(l=>l.section)).toEqual([626517,626518,626519,626520,626521,628209,626523,626524,626525,626526,626692,626693,626698]);
 for(const lesson of courseLessons){
  await user.click(screen.getByRole('button',{name:`${lesson.title}, ${lesson.summary}`}));
  expect(screen.getByRole('heading',{name:lesson.title})).toBeVisible();
  expect(screen.getByTestId('mobile-page-title')).toHaveTextContent(lesson.title);
  await user.click(screen.getByRole('button',{name:'Back to Lessons'}));
 }
 expect(upcoming).toHaveLength(17);
});
it('keeps previous lesson progress keys after renumbering',async()=>{
 localStorage.setItem('sisu:lesson8:v1',JSON.stringify({drafts:{'book12-5':'Kyllä, minä autan teitä.'},done:['Start']}));
 const user=userEvent.setup();render(<App/>);
 await user.click(screen.getAllByRole('button',{name:'Lessons'})[0]);
 await user.click(screen.getByRole('button',{name:/Tiistaina 13.lokakuuta,/}));
 await user.click(screen.getByRole('tab',{name:'Book'}));
 expect(screen.getByLabelText('คำตอบ หนังสือ 12 ข้อ 6')).toHaveValue('Kyllä, minä autan teitä.');
});
