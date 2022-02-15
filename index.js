const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs/promises');
const rescue = require('express-rescue');
const { readFile, writeFile } = require('./utils/readFile');
const {
  getLoginToken,
  isValidEmail,
  isValidPassword,
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
} = require('./middlewares/validations');

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
    const talkers = await readFile('./talker.json');
    if (!talkers) {
      return res.status(200).json([]);
    }

    return res.status(200).json(talkers);
  }),
);

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json');
  const findTalkerById = talkers.find((talker) => talker.id === Number(id));

  if (!findTalkerById) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(200).json(findTalkerById);
});

app.post('/login', isValidEmail, isValidPassword, getLoginToken);

app.post(
  '/talker',
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  rescue(async (req, res) => { 
    const {
      name,
      age,
      talk: { watchedAt, rate },
    } = req.body;
    const talkers = await readFile('./talker.json');
    const newTalker = {
      name,
      age,
      id: JSON.parse(talkers.length + 1),
      talk: {
        watchedAt,
        rate,
      },
    };
    talkers.push(newTalker);
    await writeFile(talkers);
    return res.status(201).send(newTalker);
  }),
);

app.listen(PORT, () => {
  console.log('Online');
});
