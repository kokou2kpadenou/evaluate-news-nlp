/**
 *
 * Toggle the visibility of a loading indicator.
 * @param {boolean} show - Whether to show or hide the loading indicator.
 */
function processing(show) {
  const form = document.getElementById('form__loading');
  if (show) {
    form.classList.add('form__loading--active');
  } else {
    form.classList.remove('form__loading--active');
  }
}

/**
 *
 * Returns the corresponding polarity message based on the provided code.
 * @param {string} code - The polarity code.
 * @returns {string} The polarity message.
 */
function polarityMsg(code) {
  switch (code) {
    case 'P+':
      return 'STRONG POSITIVE';
    case 'P':
      return 'POSITIVE';
    case 'NEU':
      return 'NEUTRAL';
    case 'N':
      return 'NEGATIVE';
    case 'N+':
      return 'STRONG NEGATIVE';
    case 'NONE':
      return 'WITHOUT POLARITY';

    default:
      return 'NONE';
  }
}

/**
 *
 * Display the result of the sentiment analysis.
 * @param {object} result - The result object containing sentiment analysis data.
 * @param {string} result.time - The formatted time.
 * @param {string} result.title - The title of the article.
 * @param {object} result.sentiment - The sentiment analysis data.
 * @param {string} result.sentiment.agreement - The agreement value.
 * @param {number} result.sentiment.confidence - The confidence value.
 * @param {string} result.sentiment.irony - The irony value.
 * @param {string} result.sentiment.score_tag - The score tag value.
 * @param {string} result.sentiment.subjectivity - The subjectivity value.
 */
function displayResult(result) {
  const { time, title, sentiment } = result;
  const { agreement, confidence, irony, score_tag: scoreTag, subjectivity } = sentiment;

  const htmlCode = `<div class="title"><strong>Title: </strong><span>${title}</span></div>
      <div class="time"><strong>Time: </strong><span>${time}</span></div>
      <ul class="sentiment">
        <li class="agreement"><strong>Agreement: </strong><span>${agreement}</span></li>
        <li class="confidence"><strong>Confidence: </strong><span>${confidence}</span></li>
        <li class="irony"><strong>Irony: </strong><span>${irony}</span></li>
        <li class="scoretag"><strong>Polarity: </strong><span>${scoreTag}</span></li>
        <li class="subjectivity"><strong>Subjectivity: </strong><span>${subjectivity}</span></li>
      </ul> `;

  document.getElementById('results').innerHTML = htmlCode;
}

/**
 *
 * Display an error message in the results section.
 * @param {string} error - The error message to display.
 */
function displayError(error) {
  document.getElementById('results').innerHTML = error;
}

/**
 * Clears the value of an input field with the ID 'name'.
 */
function handleClearInput() {
  const inputElt = document.getElementById('name');

  if (inputElt) {
    inputElt.value = '';
    inputElt.dispatchEvent(new Event('input'));
  }
}

/**
 *
 * Handle the form submission event.
 * @param {Event} event - The form submission event object.
 * @returns {Promise<void>} - A promise that resolves once the form is submitted.
 */
async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  const formText = document.getElementById('name').value;

  if (!Client.checkForName(formText)) {
    displayError('Invalid URL');
    return;
  }

  console.log('::: Form Submitted :::');

  // Show the loading indicator
  processing(true);

  await fetch(`http://localhost:8081/sentiment?url=${Client.addHttpsToUrl(formText)}`)
    .then(async (res) => {
      const { status } = res;
      const data = await res.json();
      return { status, data };
    })
    .then((res) => {
      if (res.status === 200) {
        displayResult(res.data);
      } else {
        displayError(res.data.error);
      }
    })
    .catch((error) => {
      // Manage and display error
      displayError(error.message);
    });

  // Close the loading indicator
  processing(false);
}

/**
 * Event handler for the 'blur' event of an input element.
 * Logs a message when the input loses focus.
 */
function onBlur() {
  console.log('input lost focus!');
}

/**
 *
 * Handle the input event on the text input field.
 * @param {Event} event - The input event object.
 */
function onInput(event) {
  const btn = document.getElementById('submitBtn');

  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?([/?].*)?$/i;

  if (urlPattern.test(event.target.value)) {
    // active button
    btn.disabled = false;
  } else {
    // disablw button
    btn.disabled = true;
  }
}

export { handleSubmit, onBlur, onInput };
