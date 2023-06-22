/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body><div id='form__loading'></div><input id='name' type='text' name='input' /><div id='results'></div></body></html>"}
 */

import { handleSubmit } from '../../src/client/js/formHandler';

// Mock the necessary functions and elements
const mockEvent = {
  preventDefault: jest.fn(),
};

const response = {
  time: 'ServerProcessingTime',
  url: 'URL',
  title: 'Title',
  sentiment: {
    agreement: 'Agreement',
    confidence: '70',
    irony: 'Irony',
    score_tag: 'NEU',
    subjectivity: 'Subjectivity',
  },
  text: 'TEXT',
};


const mockFetchResponse = {
  status: 200,
  json: jest.fn(() => Promise.resolve(response)),
};

global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse));

// Mock the Client object
global.Client = {
  checkForName: jest.fn(() => true), // Mock the checkForName method to return true
  addHttpsToUrl: jest.fn((url) => `https://${url}`), // Mock the addHttpsToUrl method
};

describe('handleSubmit', () => {
  beforeEach(() => {
    mockEvent.preventDefault.mockClear();
    global.fetch.mockClear();
    global.Client.checkForName.mockClear();
    global.Client.addHttpsToUrl.mockClear();
  });

  it('should display the result when the fetch request succeeds', async () => {
    // Set up form input value
    document.getElementById('name').value = 'example.com';

    // Call the handleSubmit function
    await handleSubmit(mockEvent);

    // Expect fetch to be called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8081/sentiment?url=https://example.com');

    // Expect preventDefault to be called on the event
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Make sure error message in not in the DOM
    expect(document.getElementById('error-msg')).toBeNull();

    // Make sure result is display properly in the DOM
    expect(document.getElementById('resultTitle').textContent).toBe('Title');
    expect(document.getElementById('resultUrl').textContent).toBe('URL');
    expect(document.getElementById('resultTime').textContent).toBe('ServerProcessingTime');
    expect(document.getElementById('resultText').textContent).toBe('TEXT');
    expect(document.getElementById('resultAgreement').textContent).toBe('Agreement');
    expect(document.getElementById('resultConfidence').textContent).toBe('70%');
    expect(document.getElementById('resultIrony').textContent).toBe('Irony');
    expect(document.getElementById('resultPolarity').textContent).toBe('NEUTRAL');
    expect(document.getElementById('resultSubjectivity').textContent).toBe('Subjectivity');
  });

  it('should display an error when the fetch request fails', async () => {
    // Set up form input value
    document.getElementById('name').value = 'example.com';

    // Set up a failed fetch response
    const mockFailedFetchResponse = {
      status: 500,
      json: jest.fn(() => Promise.resolve({ error: 'Internal Server Error' })),
    };

    global.fetch.mockImplementationOnce(() => Promise.resolve(mockFailedFetchResponse));

    // Call the handleSubmit function
    await handleSubmit(mockEvent);

    // Expect fetch to be called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8081/sentiment?url=https://example.com');

    // Expect preventDefault to be called on the event
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Make sure message "Internal Server Error" is in the DOM
    expect(document.getElementById('error-msg').textContent).toMatch('Internal Server Error');

  });
});
