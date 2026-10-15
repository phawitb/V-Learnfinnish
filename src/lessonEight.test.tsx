import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {it,expect,beforeEach} from 'vitest';
import App from './App';
beforeEach(()=>localStorage.clear());
it('opens lesson 8 and exposes detailed homework answers and all original files',async()=>{
 const user=userEvent.setup();render(<App/>);
 await user.click(screen.getAllByRole('button',{name:'Lessons'})[0]);
 await user.click(screen.getByRole('button',{name:/Tiistaina 13\.lokakuuta/}));
 expect(screen.getByRole('heading',{name:'Tiistaina 13.lokakuuta'})).toBeVisible();
 await user.click(screen.getByRole('tab',{name:'Homework'}));
 await user.click(screen.getByText('เฉลยละเอียด · หนังสือ 12'));
 expect(screen.getByText('Kyllä, minä autan teitä.')).toBeVisible();
 await user.click(screen.getByRole('tab',{name:'Files'}));
 expect(screen.getByRole('link',{name:'Partitive - homework · PDF'})).toHaveAttribute('href','/lesson8/partitive-homework.pdf');
});
