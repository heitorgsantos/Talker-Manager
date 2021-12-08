const fs = require('fs/promises');

const getTalker = async () => {
  const talker = await fs.readFile('talker.json');
  const convert = JSON.parse(talker);
  return convert;
};

const getTalkers = async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalker();
  // console.log(talkers);
  const filtro = await talkers.find((elemt) => elemt.id === Number(id));
    // .reduce((acc) => acc, {});
    console.log(filtro);
  if (filtro) {
    return res.status(200).json(filtro);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkers;
