/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body></body></html>"}
 */

import { handleClickToggle } from '../../src/client/js/modeToggle';

const rootElement = document.documentElement;

describe('handleClickToggle', () => {
  it('should update the mode to the correct theme based on the current theme', () => {
    handleClickToggle();

    expect(rootElement.getAttribute('data-theme')).toBe('auto');

  });

  it('should update the mode to "light" if the current theme is "auto"', () => {
    handleClickToggle();

    expect(rootElement.getAttribute('data-theme')).toBe('dark');

  });

  it('should update the mode to "dark" if the current theme is "light"', () => {
    handleClickToggle();

    expect(rootElement.getAttribute('data-theme')).toBe('light');

  });
});

