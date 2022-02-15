const { readFile, writeFile } = require('../utils/readFile');

const deleteTalker = async (req, res) => {
const { id } = req.params;
const talkers = await readFile('./talker.json');
const findTalkerIndex = talkers.findIndex(
    (talker) => talker.id === Number(id),
  );
  talkers.splice(talkers[findTalkerIndex]);
  await writeFile(talkers);
  return res.status(204).send();
};

module.exports = { deleteTalker };