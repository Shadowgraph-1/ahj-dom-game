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
  // After initial show goblin should be visible
  expect(goblin.style.display).not.toBe('none');

  const initialParent = goblin.parentElement;

  // after 1 second goblin should hide
  jest.advanceTimersByTime(1000);
  expect(goblin.style.display).toBe('none');

  // after another 1 second (total 2s) goblin shows in a new cell
  jest.advanceTimersByTime(1000);
  expect(goblin.style.display).not.toBe('none');
  const newParent = goblin.parentElement;
  expect(newParent).not.toBe(initialParent);
  jest.useRealTimers();
});