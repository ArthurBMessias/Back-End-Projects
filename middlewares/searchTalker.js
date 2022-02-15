const { readFile } = require('../utils/readFile');

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile('./talker.json');
  if (!q || q === '') {
    return res.status(200).json(talkers);
  }
  const filteredTalkers = talkers.filter((talker) =>
    talker.name.includes(q));
  if (!filteredTalkers) {
    return res.status(200).json([]);
  }
  return res.status(200).send(filteredTalkers);
};

module.exports = { searchTalker };
