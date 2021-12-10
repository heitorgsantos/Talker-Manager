const express = require('express');
const bodyParser = require('body-parser');
const getTalkers = require('./middleware/talker/getTalkers');
const getTalkerId = require('./middleware/talker/getTalkerId');
// const tokenValidate = require('./validacoes/validateToken/tokenGenerate');
const { validator, validateSenha, validateSenhaCreator, tokenValidate } = require('./validacoes/validateToken/emailValidate');
const { nameValidate, ageValidate, objectCheckedDateRate, talkValidate, createTalker } = require('./createName/insertName');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
// const HTTP_INVALIDO_STATUS = 400;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
app.get('/talker', getTalkers);

app.get('/talker/:id', getTalkerId);

app.post('/login', validator, validateSenha);

app.post('/talker', tokenValidate,
 nameValidate, ageValidate, talkValidate, objectCheckedDateRate, createTalker);
