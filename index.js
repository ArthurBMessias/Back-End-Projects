const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const { readFile } = require('./utils/readFile');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get(
  '/talker',
  rescue(async (_req, res) => {
    const talkers = await readFile();
    if (!talkers) {
      return res.status(HTTP_OK_STATUS).json([]);
    }

    return res.status(HTTP_OK_STATUS).json(talkers);
  }),
);

app.listen(PORT, () => {
  console.log('Online');
});
