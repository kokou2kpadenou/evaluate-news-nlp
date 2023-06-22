/**
 * @jest-environment jsdom
 * @jest-environment-options {"html": "<html lang='en'><body><input id='name' type='text' name='input' /><button id='submitBtn' disabled></button><button id='input__clear' style='display: none;'></button></body></html>"}
 */

// Import the function to be tested
import { onInput } from '../../src/client/js/formHandler';

describe('onInput', () => {
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('input__clear');

  const input = document.getElementById('name');

  // Attached the event input to input element
  input.addEventListener('input', onInput);

  test('should enable submit button and display clear button when input has value', () => {
    input.value = 'example';

    // Trigger the input event
    const event = new Event('input');
    input.dispatchEvent(event);

    expect(submitBtn.disabled).toBe(false);
    expect(clearBtn.style.display).toBe('block');
  });

  test('should disable submit button and hide clear button when input is empty', () => {
    input.value = '';

    // Trigger the input event
    const event = new Event('input');
    input.dispatchEvent(event);

    expect(submitBtn.disabled).toBe(true);
    expect(clearBtn.style.display).toBe('none');
  });
});
