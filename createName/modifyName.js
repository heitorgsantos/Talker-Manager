const fs = require('fs/promises');

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = await fs.readFile('talker.json');
  const convert = JSON.parse(talker);
  const newTalker = { id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  let updateTalkers = convert.filter((element) => Number(element.id) !== Number(id));
  updateTalkers = [...updateTalkers, newTalker];
  const dataInsert = JSON.stringify(updateTalkers);
  await fs.writeFile('talker.json', dataInsert);
  return res.status(200).json(newTalker);
};

module.exports = editTalker;