const express = require('express');
const app = express();
const { Translate } = require('@google-cloud/translate').v2;
const translateClient = new Translate();
const knex = require('./database');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/hello', async (req, res) => {
  const word = req.query.w;
  res.send(`Hello, you enetered ${word}`);
});

app.get('/bye', async (req, res) => {
  const word = req.query.b;
  res.send(`Bye, you enetered ${word}`);
});

app.get('/words', async (req, res) => {
  try {
    const words = await knex.select('*').from('words').orderBy('id');
    res.json({ status: 'ok', data: [...words] });
  } catch (err) {
    console.error(err);
  }
});

app.get('/translate/:lang', async (req, res) => {
  try {
    const word = req.query.word;
    console.log(word);
    const result = await translateClient.translate(
      word,
      req.params.lang
    )
    res.send(`${result[0]}\n\n`);
  } catch (err) {
    console.error(err);
  }
});
