function processing(show) {
  const form = document.getElementById('form__loading');
  if (show) {
    form.classList.add('form__loading--active');
  } else {
    form.classList.remove('form__loading--active');
  }
}

function displayResult(result) {
  // Add Clear screen
  const { time, title, sentiment } = result;
  const { agreement, confidence, irony, score_tag: scoreTag, subjectivity } = sentiment;

  document.getElementById('title').innerHTML = title;
  document.getElementById('time').innerHTML = time;
  document.getElementById('agreement').innerHTML = agreement;
  document.getElementById('confidence').innerHTML = confidence;
  document.getElementById('irony').innerHTML = irony;
  document.getElementById('scoreTag').innerHTML = scoreTag;
  document.getElementById('subjectivity').innerHTML = subjectivity;
}

function displayError(error) {
  // Add clear Screen
  document.getElementById('error-display').innerHTML = error;
}

async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  const formText = document.getElementById('name').value;

  Client.checkForName(formText);

  // TODO: splash for process procession and display error message to user
  console.log('::: Form Submitted :::');
  processing(true);
  await fetch(`http://localhost:8081/sentiment?url=${formText}`)
    .then(async (res) => {
      console.log(res.status);
      const { status } = res;
      const data = await res.json();
      return { status, data };
    })
    .then((res) => {
      console.log(res);

      if (res.status === 200) {
        // {
        //     "time": "6/13/2023, 21:21:39",
        //     "title": "KOKOU KPADENOU",
        //     "sentiment": {
        //         "agreement": "AGREEMENT",
        //         "confidence": "98",
        //         "irony": "NONIRONIC",
        //         "score_tag": "P",
        //         "subjectivity": "SUBJECTIVE"
        //     }
        // }
        // document.getElementById('results').innerHTML = res.message;
        displayResult(res.data);
      } else {
        displayError(res.error);
      }
    })
    .catch((error) => {
      console.log(error);
      // Manage and display error
      displayError(error.message);
    });
  processing(false);
}

function onBlur() {
  console.log('input lost focus!');
}

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
