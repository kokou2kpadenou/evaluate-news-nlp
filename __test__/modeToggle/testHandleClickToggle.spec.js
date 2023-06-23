/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body><button id='mode-switch'></button></body></html>"}
 */

import { handleClickToggle } from '../../src/client/js/modeToggle';

const rootElement = document.documentElement;
const modeSwitch = document.getElementById('mode-switch');

describe('handleClickToggle', () => {
  it('should update the mode to the correct theme based on the current theme', () => {
    handleClickToggle();

    expect(rootElement.getAttribute('data-theme')).toBe('auto');
    expect(modeSwitch.getAttribute('aria-label')).toBe('auto');

  });

  it('should update the mode to "light" if the current theme is "auto"', () => {
    handleClickToggle();

    expect(rootElement.getAttribute('data-theme')).toBe('dark');
    expect(modeSwitch.getAttribute('aria-label')).toBe('dark');

  });

  it('should update the mode to "dark" if the current theme is "light"', () => {
    handleClickToggle();

    expect(rootElement.getAttribute('data-theme')).toBe('light');
    expect(modeSwitch.getAttribute('aria-label')).toBe('light');

  });
});

