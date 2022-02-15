const { readFile, writeFile } = require('../utils/readFile');

const editTalker = async (req, res) => {
    const { id } = req.params;
  const {
    name,
    age,
    talk: { watchedAt, rate },
  } = req.body;
  const talkers = await readFile('./talker.json');
  const findTalkerIndex = talkers.findIndex(
    (talker) => talker.id === Number(id),
  );
  talkers[findTalkerIndex] = {
    ...talkers[findTalkerIndex],
    name,
    age,
    talk: { watchedAt, rate },
  };
  await writeFile(talkers);
  return res.status(200).send(talkers[findTalkerIndex]);
};

module.exports = { editTalker };
