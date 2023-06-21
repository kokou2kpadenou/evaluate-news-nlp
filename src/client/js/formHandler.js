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
  const { time, url, title, sentiment } = result;
  const { agreement, confidence, irony, score_tag: scoreTag, subjectivity } = sentiment;

  const htmlCode = `<h3>${title}</h3>
      <p>
        (<a class="url" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>)
      </p>
      <table class="sentiment">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agrement</td>
            <td>${agreement}</td>
          </tr>
          <tr>
            <td>Confidence</td>
            <td>${confidence}%</td>
          </tr>
          <tr>
            <td>Irony</td>
            <td>${irony}</td>
          </tr>
          <tr>
            <td>Polarity</td>
            <td>${polarityMsg(scoreTag)}</td>
          </tr>
          <tr>
            <td>Subjectivity</td>
            <td>${subjectivity}</td>
          </tr>
        </tbody>
      </table>
      <div class="time"><i>${time}</i></div>`;

  document.getElementById('results').innerHTML = htmlCode;
}

/**
 *
 * Display an error message in the results section.
 * @param {string} error - The error message to display.
 */
function displayError(error) {
  document.getElementById('results').innerHTML = `<div class="error-msg">${error}</div>`;
}

/**
 * Clears the value of an input field with the ID 'name'.
 */
function handleClearInput() {
  const inputElt = document.getElementById('name');

  if (inputElt) {
    inputElt.value = '';
    inputElt.dispatchEvent(new Event('input'));
    inputElt.focus();
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
    displayError(`<strong>"${formText}"</strong> is an invalid URL`);
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
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('input__clear');

  if (event.target.value) {
    // active button
    submitBtn.disabled = false;
    clearBtn.style.display = 'block';
  } else {
    // disable button
    submitBtn.disabled = true;
    clearBtn.style.display = 'none';
  }
}

export { handleSubmit, handleClearInput, onBlur, onInput };
