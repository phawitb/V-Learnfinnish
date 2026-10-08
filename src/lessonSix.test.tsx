import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it } from 'vitest';
import App from './App';

beforeEach(() => localStorage.clear());
it('shows detailed answers for all three exercises directly in Homework', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Lessons' })[0]);
  await user.click(screen.getByRole('button', { name: /Lesson 6,/ }));
  await user.click(screen.getByRole('tab', { name: /Homework/ }));
  for (const number of [19, 20, 25]) {
    await user.click(screen.getByText(`เปิดเฉลยละเอียด · แบบฝึก ${number}`));
  }
  expect(screen.getByRole('heading', { name: '19 · ข้อ 8 — valoisat illat' })).toBeVisible();
  expect(screen.getByText('Syksyn värit ovat keltainen, oranssi ja ruskea.')).toBeVisible();
  expect(screen.getByRole('heading', { name: '25 · ข้อ 19 — kertoo' })).toBeVisible();
  expect(screen.getByText(/emme เป็นกริยาปฏิเสธสำหรับ me/)).toBeVisible();
  expect(screen.getByText('Puhutteko te ranskaa?')).toBeVisible();
  expect(screen.getByRole('link', { name: 'ตรวจเฉลยต้นฉบับหน้า 331' })).toHaveAttribute('href', '/lesson6/book/page-331.jpg');
});
it('opens lesson 6 and preserves work across sections and reloads', async () => {
  const user = userEvent.setup();
  const view = render(<App />);
  const open = async () => {
    await user.click(screen.getAllByRole('button', { name: 'Lessons' })[0]);
    await user.click(screen.getByRole('button', { name: /Lesson 6,/ }));
  };
  await open();
  expect(screen.getByRole('heading', { name: 'Tiistaina 6. lokakuuta' })).toBeInTheDocument();
  await user.click(screen.getByRole('tab', { name: /Listening/ }));
  expect(screen.getByLabelText('Harjoitus 13 sivu 75')).toHaveAttribute('src', '/lesson6/harjoitus-13.mp3');
  await user.type(screen.getByLabelText('คำตอบ 13 ข้อ 1'), 'Lappeenranta');
  await user.click(screen.getByRole('tab', { name: /Homework/ }));
  await user.click(screen.getByLabelText(/ทำแบบฝึก 25/));
  view.unmount();
  render(<App />);
  await open();
  await user.click(screen.getByRole('tab', { name: /Listening/ }));
  expect(screen.getByLabelText('คำตอบ 13 ข้อ 1')).toHaveValue('Lappeenranta');
  await user.click(screen.getByRole('tab', { name: /Homework/ }));
  expect(screen.getByLabelText(/ทำแบบฝึก 25/)).toBeChecked();
});

it('includes all homework exercises, both translation sheets, and original files', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getAllByRole('button', { name: 'Lessons' })[0]);
  await user.click(screen.getByRole('button', { name: /Lesson 6,/ }));
  await user.click(screen.getByRole('tab', { name: /Plural/ }));
  expect(screen.getByLabelText('คำตอบ 19 ข้อ 8')).toBeInTheDocument();
  expect(screen.getByLabelText('คำตอบ 20 ข้อ 8')).toBeInTheDocument();
  await user.click(screen.getByRole('tab', { name: /Verbs/ }));
  expect(screen.getByLabelText('คำตอบ 25 ข้อ 19')).toBeInTheDocument();
  await user.click(screen.getByRole('tab', { name: /Translation/ }));
  expect(screen.getAllByRole('textbox')).toHaveLength(10);
  await user.click(screen.getByRole('tab', { name: /Files/ }));
  expect(screen.getByRole('link', { name: /Verbs and time markers · PDF/ })).toHaveAttribute('href', '/lesson6/verbs-and-time-markers.pdf');
  expect(screen.getByRole('link', { name: /Translation.*DOCX/ })).toHaveAttribute('href', '/lesson6/translation-seasons-weather.docx');
  expect(screen.getByRole('link', { name: /หน้าหนังสือ 83/ })).toHaveAttribute('href', '/lesson6/book/page-83.jpg');
});
