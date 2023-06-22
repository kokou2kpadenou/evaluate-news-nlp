/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body><div id='myNav'></div></body></html>"}
 */

import { openNav, closeNav } from '../src/client/js/nav';

const nav = document.getElementById('myNav');

describe('openNav', () => {
  it('should set the navigation menu width to "100%"', () => {

    openNav();

    expect(nav.style.width).toBe('100%');
  });
});

describe('closeNav', () => {
  it('should set the navigation menu width to "0%"', () => {

    closeNav();

    expect(nav.style.width).toBe('0%');
  });
});
