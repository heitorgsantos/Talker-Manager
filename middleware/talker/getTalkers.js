const fs = require('fs/promises');

const getTalker = async () => {
  const talker = await fs.readFile('talker.json');
  const convert = JSON.parse(talker);
  return convert;
};

const getTalkers = async (req, res) => {
  const talkers = await getTalker();
  console.log(talkers);
  return res.status(200).json(talkers);
};

module.exports = getTalkers;
