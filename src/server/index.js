const dotenv = require('dotenv');
// const path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI');

dotenv.config();

const MC_API_CREDENTIALS = process.env.API_KEY;

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, () => {
  console.log('Example app listening on port 8081!');
});

app.get('/test', (req, res) => {
  res.send(mockAPIResponse);
});

app.get('/sentiment', async (req, res) => {
  const { txt: txtToAnalyst } = req.query;

  // In case txt is missing in query send error 400
  if (!txtToAnalyst) {
    res.status(400).send({ error: 'Missing parameter: txt' });
    return;
  }

  const formdata = new FormData();
  formdata.append('key', MC_API_CREDENTIALS);
  formdata.append('txt', txtToAnalyst);
  formdata.append('lang', 'en');

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  try {
    // fetch data from MeaningCloud
    const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', requestOptions);

    // When status egal 200
    if (response.status === 200) {
      try {
        const body = await response.json();
        res.status(200).send(body);
        return;
      } catch (error) {
        console.log(error);
      }
    }

    // For any other status console log the status and throw an erreur
    console.error(response.status);

    throw new Error('Something went wrong!');
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Middleware for handling 404
app.use((req, res) => {
  res.status(404).send("Sorry, the requested resource couldn't be found.");
});
