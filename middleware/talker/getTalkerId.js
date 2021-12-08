const { json } = require('body-parser');
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
  const filtro = await talkers.filter((elemt) => elemt.id === Number(id))
    .reduce((elem) => elem.id, {});
    // console.log(filtro);
  if (filtro.length < 1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(filtro);
};

module.exports = getTalkers;
