const dotenv = require('dotenv');
// const path = require('path');
const express = require('express');
const cors = require('cors');
const { JSDOM } = require('jsdom');
const mockAPIResponse = require('./mockAPI');

dotenv.config();

const MC_API_CREDENTIALS = process.env.API_KEY;
const MC_BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1';
const PORT = process.env.PORT || 8081;

const app = express();

app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, () => {
  console.log('Evalute News App listening on port 8081!');
});

/**
 * Fetches the article content from the specified URL.
 * @param {string} url - The URL of the article.
 * @returns {Promise<[string, string]>} A promise that resolves to an array containing the URL and HTML content of the article.
 * @throws {Error} If there is an error fetching the article content.
 */
async function fetchArticle(url) {
  try {
    const response = await fetch(url);

    const html = !response.ok ? '' : await response.text();

    return [url, html];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch article content');
  }
}

/**
 * Parses the HTML content and extracts the title
 * @param {string} html - The HTML content of the article.
 * @returns {string} - The title of the article
 */
function getTitle(html) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  // Get the title element
  const titleElement = document.querySelector('h1');
  const title = titleElement ? titleElement.textContent : '';

  return title;
}

/**
 * Fetches sentiment data from MeaningCloud API.
 * @param {string} url - The url to analyze.
 * @throws {Error} - If an error occurs during the fetch request or parsing the response.
 * @returns {Promise<object>} - A promise that resolves to the sentiment data object.
 */
async function fetchSentimentFromMC(url) {
  const formdata = new FormData();
  formdata.append('key', MC_API_CREDENTIALS);
  formdata.append('url', url);
  formdata.append('lang', 'en');

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  try {
    // fetch data from MeaningCloud
    const response = await fetch(MC_BASE_URL, requestOptions);

    // When status egal 200
    if (response.status === 200) {
      try {
        const body = await response.json();
        return body;
      } catch (error) {
        console.log(error);
      }
    }

    // For any other status console log the status and throw an erreur
    console.error(response.status);

    throw new Error('Failed to analyse the article');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to analyse the article');
  }
}

// test route
app.get('/test', (req, res) => {
  res.send(mockAPIResponse);
});

// sentiment route
app.get('/sentiment', async (req, res) => {
  const { url: urlToAnalyst } = req.query;

  // In case url is missing in query send error 400
  if (!urlToAnalyst) {
    res.status(400).send({ error: 'Missing parameter: url' });
    return;
  }

  // Invalid url
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?([/?].*)?$/i;
  if (!urlPattern.test(urlToAnalyst)) {
    res.status(400).send({ error: 'Invalid url' });
    return;
  }

  await fetchArticle(urlToAnalyst)
    .then((data) => {
      const [url, html] = data;
      // Process the article content as needed
      const title = getTitle(html);
      return { url, title };
    })
    .then(async (article) => {
      const time = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });

      const { title, url } = article;

      const result = await fetchSentimentFromMC(url);
      /* eslint-disable camelcase */
      const { agreement, confidence, irony, score_tag, subjectivity, sentence_list } = result;
      const { text } = sentence_list[0];
      res
        .status(200)
        .send({ time, url, title, sentiment: { agreement, confidence, irony, score_tag, subjectivity }, text });
      /* eslint-enable camelcase */
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
      res.status(500).send({ error: `Internal Server Error. ${error.message}` });
    });
});

// Middleware for handling 404
app.use((req, res) => {
  res.status(404).send("Sorry, the requested resource couldn't be found.");
});
