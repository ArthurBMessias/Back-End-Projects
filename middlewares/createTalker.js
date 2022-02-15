const { readFile, writeFile } = require('../utils/readFile');

const createTalker = async (req, res) => {
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
    };

module.exports = { createTalker };