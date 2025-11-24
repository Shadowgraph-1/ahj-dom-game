/* eslint-env jest */
/* global test expect */
import { jest } from '@jest/globals';

test('grid has 16 cells and goblin moves', async () => {
  jest.useFakeTimers();
  document.body.innerHTML = '<div id="game-container"></div><div id="table-container"></div>';
  await import('./main.js');
  // trigger DOMContentLoaded
  document.dispatchEvent(new Event('DOMContentLoaded'));

  const grid = document.querySelector('.grid');
  expect(grid).toBeTruthy();
  expect(grid.children.length).toBe(16);

  const goblin = document.querySelector('img.goblin');
  expect(goblin).toBeTruthy();

  const initialParent = goblin.parentElement;
  // Advance timers to trigger one movement
  jest.advanceTimersByTime(2100);
  const newParent = goblin.parentElement;
  expect(newParent).not.toBe(initialParent);
  jest.useRealTimers();
});