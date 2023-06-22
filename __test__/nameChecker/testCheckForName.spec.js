import { checkForName } from '../../src/client/js/nameChecker';

describe('checkForName', () => {
  it('should return true for a valid URL', () => {
    const result = checkForName('https://www.example.com');

    expect(result).toBe(true);
  });

  it('should return false for an invalid URL', () => {
    const result = checkForName('not-a-url');

    expect(result).toBe(false);
  });

  it('should return false for an empty input', () => {
    const result = checkForName('');

    expect(result).toBe(false);
  });
});

