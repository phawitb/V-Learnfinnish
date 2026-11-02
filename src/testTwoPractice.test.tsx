import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import App from './App';
import { ttsService } from './services/ttsService';

const months = ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'];
const meanings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  vi.spyOn(Math, 'random').mockReturnValue(0.999);
  vi.spyOn(ttsService, 'speak').mockReturnValue(true);
});

async function openPractice() {
  render(<App />);
  await userEvent.click(screen.getAllByRole('button', { name: 'Practice' })[0]);
}

it('replaces legacy Practice groups and old missed words without deleting Favorites', async () => {
  localStorage.setItem('sisu:favorites:v1', JSON.stringify([{ id: 'old-favorite', finnish: 'legacy word' }]));
  localStorage.setItem('sisu:practice-progress:v1', JSON.stringify({
    reviewWords: [{ id: 'vocab-0', groupId: 'vocab-1', item: { finnish: 'Hei!' } }], groups: {},
  }));
  await openPractice();
  expect(screen.getByRole('button', { name: /0 words to review/i })).toBeDisabled();
  const cards = document.querySelectorAll('.practice-group-grid button');
  expect(cards.length).toBeGreaterThan(10);
  for (const card of cards) expect(card).toHaveTextContent('Test 2');
  expect(screen.queryByRole('button', { name: /Vocab — Page 12|Thursday 10.09 —|Favorites.*items/i })).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('sisu:favorites:v1')!)).toHaveLength(1);
  await userEvent.click(screen.getByRole('button', { name: /Test 2 — Appearance/ }));
  expect(screen.getByText('kihara')).toBeVisible();
  expect(screen.getByText('curly')).toBeVisible();
});

it.each(['Flashcards', 'Multiple choice', 'Matching', 'Fill in the blank'])('finishes all twelve months in %s, including words beyond ten', async (mode) => {
  await openPractice();
  await userEvent.click(screen.getByRole('button', { name: /Test 2 — Months.*12 items/ }));
  expect(screen.getAllByRole('button', { name: /Listen to / })).toHaveLength(12);
  await userEvent.click(screen.getByRole('button', { name: mode }));
  await userEvent.click(screen.getByRole('button', { name: 'Start practice' }));
  for (let i = 0; i < 12; i++) {
    expect(screen.queryByRole('heading', { name: /hienoa/i })).not.toBeInTheDocument();
    if (mode === 'Flashcards') {
      expect(screen.getByTestId('flashcard-face')).toHaveTextContent(months[i]);
      await userEvent.click(screen.getByRole('button', { name: 'Know' }));
    } else if (mode === 'Matching') {
      await userEvent.click(screen.getByRole('button', { name: months[i] }));
      await userEvent.click(screen.getByRole('button', { name: meanings[i] }));
    } else {
      if (mode === 'Fill in the blank') {
        for (const letter of months[i]) {
          const tile = screen.getAllByRole('button').find(button => button.getAttribute('aria-label')?.startsWith(`Choose letter ${letter},`) && !(button as HTMLButtonElement).disabled);
          await userEvent.click(tile!);
        }
        await userEvent.click(screen.getByRole('button', { name: 'Check answer' }));
      } else {
        await userEvent.click(screen.getByRole('button', { name: meanings[i] }));
      }
      await userEvent.click(screen.getByRole('button', { name: 'Continue' }));
    }
  }
  if (mode === 'Matching') await userEvent.click(screen.getByRole('button', { name: /Great job/ }));
  expect(screen.getByRole('heading', { name: /hienoa/i })).toBeVisible();
  const saved = JSON.parse(localStorage.getItem('sisu:practice-progress:test2:v1')!);
  expect(saved.groups['test2-months'].accuracy).toBe(100);
}, 20000);

it('accepts either identical translation in Matching and keeps the remaining pair playable', async () => {
  await openPractice();
  await userEvent.click(screen.getByRole('button', { name: /Test 2 — Clothes/ }));
  await userEvent.click(screen.getByRole('button', { name: 'Matching' }));
  await userEvent.click(screen.getByRole('button', { name: 'Start practice' }));
  const sweaters = screen.getAllByRole('button', { name: 'woollen sweater' });
  const firstWord = screen.getByRole('button', { name: 'villapusero' });
  const alternate = sweaters.find(button => button.dataset.matchId !== firstWord.dataset.matchId)!;
  await userEvent.click(firstWord);
  await userEvent.click(alternate);
  expect(firstWord).toBeDisabled();
  expect(alternate).toBeDisabled();
  const secondWord = screen.getByRole('button', { name: 'villapaita' });
  expect(secondWord).toBeEnabled();
  await userEvent.click(secondWord);
  await userEvent.click(sweaters.find(button => button !== alternate)!);
  expect(secondWord).toBeDisabled();
  const saved = JSON.parse(localStorage.getItem('sisu:practice-progress:test2:v1') || '{"reviewWords":[]}');
  expect(saved.reviewWords).toHaveLength(0);
});

it('does not requeue an already solved synonym when the remaining translation is mismatched', async () => {
  await openPractice();
  await userEvent.click(screen.getByRole('button', { name: /Test 2 — Clothes/ }));
  await userEvent.click(screen.getByRole('button', { name: 'Matching' }));
  await userEvent.click(screen.getByRole('button', { name: 'Start practice' }));
  const firstWord = screen.getByRole('button', { name: 'villapusero' });
  const sweaters = screen.getAllByRole('button', { name: 'woollen sweater' });
  const swapped = sweaters.find(button => button.dataset.matchId !== firstWord.dataset.matchId)!;
  await userEvent.click(firstWord);
  await userEvent.click(swapped);
  await userEvent.click(screen.getByRole('button', { name: 'paita' }));
  await userEvent.click(sweaters.find(button => button !== swapped)!);
  const saved = JSON.parse(localStorage.getItem('sisu:practice-progress:test2:v1')!);
  expect(saved.reviewWords.map((word: { item: { finnish: string } }) => word.item.finnish).sort()).toEqual(['paita', 'villapaita']);
});
