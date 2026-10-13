import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it } from 'vitest';
import App from './App';
beforeEach(() => localStorage.clear());
it('opens lesson 7, keeps reading audio and offers all homework answers in place', async () => {
 const user = userEvent.setup(); render(<App />);
 await user.click(screen.getAllByRole('button', {name:'Lessons'})[0]);
 await user.click(screen.getByRole('button', {name:/Lesson 7,/}));
 expect(screen.getByRole('heading',{name:'Torstaina 8. lokakuuta'})).toBeVisible();
 await user.click(screen.getByRole('tab',{name:/Reading/}));
 expect(screen.getByLabelText('Pedro soittaa Mikolle — audio')).toHaveAttribute('src','/lesson7/pedro-soittaa-mikolle.mp3');
 await user.click(screen.getByRole('tab',{name:/Homework/}));
 await user.click(screen.getByText('เปิดเฉลยละเอียด · หนังสือ 17'));
 expect(screen.getByRole('button',{name:'Listen to Kolmen opiskelijan'})).toBeVisible();
 await user.click(screen.getByText('เปิดเฉลยละเอียด · เอกสารกริยา 20'));
 expect(screen.getByRole('heading',{name:'เอกสารกริยา 20 · ข้อ 10'})).toBeVisible();
 await user.click(screen.getByRole('tab',{name:/Files/}));
 expect(screen.getByRole('link',{name:'Grammar exercises · PDF'})).toHaveAttribute('href','/lesson7/grammar-exercises.pdf');
});
it('preserves exercise drafts on remount', async () => {
 const user=userEvent.setup(); const view=render(<App />);
 const open=async()=>{ await user.click(screen.getAllByRole('button',{name:'Lessons'})[0]);await user.click(screen.getByRole('button',{name:/Lesson 7,/})); };
 await open(); await user.click(screen.getByRole('tab',{name:/Book/}));
 await user.type(screen.getByLabelText('คำตอบ หนังสือ 17 ข้อ 9'),'Kolmen opiskelijan');
 view.unmount();render(<App />);await open();
 await user.click(screen.getByRole('tab',{name:/Book/}));
 expect(screen.getByLabelText('คำตอบ หนังสือ 17 ข้อ 9')).toHaveValue('Kolmen opiskelijan');
});
