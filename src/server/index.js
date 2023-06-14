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
 * Fetches the HTML content of an article from the specified URL.
 * @param {string} url - The URL of the article.
 * @throws {Error} - If there is an error fetching the article content.
 * @returns {Promise<string>} - A promise that resolves to the HTML content of the article.
 */
async function fetchArticle(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch article content');
    }
    const html = await response.text();
    return html;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch article content');
  }
}

/**
 * Parses the HTML content and extracts the relevant text content from the article.
 * @param {string} html - The HTML content of the article.
 * @returns {object} - An object containing the title and text content of the article.
 */
function parseArticleContent(html) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  // Get the title element
  const titleElement = document.querySelector('h1');
  const title = titleElement ? titleElement.textContent : '';

  // Get the paragraphs
  const pElements = document.querySelectorAll('p');

  // Check if title element is valid before accessing textContent
  const pTxt = Array.from(pElements).reduce((text, pElt) => `${text} ${pElt.textContent}`, '');

  return {
    title,
    pTxt,
  };
}

/**
 * Fetches sentiment data from MeaningCloud API.
 * @param {string} txt - The text to analyze.
 * @throws {Error} - If an error occurs during the fetch request or parsing the response.
 * @returns {Promise<object>} - A promise that resolves to the sentiment data object.
 */
async function fetchSentimentFromMC(txt) {
  const formdata = new FormData();
  formdata.append('key', MC_API_CREDENTIALS);
  formdata.append('txt', txt);
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
    .then((html) => {
      // Process the article content as needed
      const articleData = parseArticleContent(html);
      return articleData;
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

      const { title, pTxt } = article;

      const result = await fetchSentimentFromMC(pTxt);
      // eslint-disable-next-line camelcase
      const { agreement, confidence, irony, score_tag, subjectivity } = result;
      // eslint-disable-next-line camelcase
      res.status(200).send({ time, title, sentiment: { agreement, confidence, irony, score_tag, subjectivity } });
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
