import { addHttpsToUrl } from '../../src/client/js/nameChecker';

describe('addHttpsToUrl', () => {
  test('should add "https://" to the URL without a protocol', () => {
    const url = 'example.com';
    const expectedUrl = 'https://example.com';

    const modifiedUrl = addHttpsToUrl(url);

    expect(modifiedUrl).toBe(expectedUrl);
  });

  test('should not modify the URL if it already has a protocol', () => {
    const url = 'http://example.com';
    const expectedUrl = 'http://example.com';

    const modifiedUrl = addHttpsToUrl(url);

    expect(modifiedUrl).toBe(expectedUrl);
  });

  test('should return the same URL if it already starts with "https://"', () => {
    const url = 'https://example.com';
    const expectedUrl = 'https://example.com';

    const modifiedUrl = addHttpsToUrl(url);

    expect(modifiedUrl).toBe(expectedUrl);
  });
});

