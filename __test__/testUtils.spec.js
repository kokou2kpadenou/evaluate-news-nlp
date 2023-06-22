/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body><p id='current-year'></p></body></html>"}
 */

import { setItem, getItem, setCopyrightYear } from '../src/client/js/utils';

describe('setItem', () => {
  it('should set the specified item in the local storage', () => {
    setItem('item1', 'value1');

    expect(window.localStorage.getItem('item1')).toBe('value1');
  });
});

describe('getItem', () => {
  it('should retrieve the value of the specified item from the local storage', () => {
    window.localStorage.setItem('item2', 'value2');

    // Call the getItem function
    const result = getItem('item2');

    expect(result).toBe('value2');
  });

  it('should return null if the item is not found in the local storage', () => {
    // Call the getItem function for an item that does not exist
    const result = getItem('nonexistent');

    expect(result).toBeNull();
  });
});

describe('setCopyrightYear', () => {
  it('should set the current year as the copyright year in the footer', () => {
    const currentYear = new Date().getFullYear();

    // Call the copyrightYear function
    setCopyrightYear();

    // Expect the textContent of element with id current-year to be the current year
    expect(document.getElementById('current-year').textContent).toBe(currentYear.toString());
  });
});
