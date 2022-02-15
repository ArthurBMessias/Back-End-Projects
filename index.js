const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs/promises');
const rescue = require('express-rescue');
const { readFile } = require('./utils/readFile');
const { getLoginToken } = require('./middlewares/validations');
const { isValidEmail, isValidPassword } = require('./middlewares/validations');

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
      return res.status(200).json([]);
    }

    return res.status(200).json(talkers);
  }),
);

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const findTalkerById = talkers.find((talker) => talker.id === Number(id));

  if (!findTalkerById) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(findTalkerById);
});

app.post('/login', isValidEmail, isValidPassword, getLoginToken);

app.listen(PORT, () => {
  console.log('Online');
});