const fs = require('fs/promises');

const nameValidate = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres',
  });
  }
  next();
};

const ageValidate = async (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < 18) {
    // if (!Number.isInteger(age)) {
    //   return res.status(400).json({ menssage: 'não é inteiro' });
    // }

    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const objectCheckedDateRate = async (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const talkValidate = async (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!('watchedAt' in talk) || !('rate' in talk)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  });
  }
  next();
};

const createTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    id: 5,
    name, 
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const talker = await fs.readFile('talker.json');
  const convert = JSON.parse(talker);
  const newList = [...convert, newTalker];
  const dataInsert = JSON.stringify(newList);
  await fs.writeFile('talker.json', dataInsert, null, 4);
  return res.status(201).json(newTalker);
};

module.exports = { nameValidate, ageValidate, objectCheckedDateRate, talkValidate, createTalker };
