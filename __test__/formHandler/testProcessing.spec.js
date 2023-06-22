/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body><div id='form__loading'></div></body></html>"}
 */

import { processing } from '../../src/client/js/formHandler';

describe('processing', () => {
  beforeEach(() => {
    document.getElementById('form__loading').classList.remove('form__loading--active');
  });

  it('should add the active class to the form element when show is true', () => {
    processing(true);
    expect(document.getElementById('form__loading').classList.contains('form__loading--active')).toBe(true);
  });

  it('should remove the active class from the form element when show is false', () => {
    processing(false);
    expect(document.getElementById('form__loading').classList.contains('form__loading--active')).toBe(false);
  });
});
