const tokenGenerate = require('./tokenGenerate');

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
// validateEmail();

function validatePassword(senha) {
  const caracters = 6;
  return (senha.length >= caracters);
}

function validator(req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
  message: 'O campo "email" é obrigatório',
});
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
  // return res.status(200).json({ menssage: 'deu certo' });
}

function validateSenha(req, res) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: tokenGenerate() });
}

function validateSenhaCreator(req, res, next) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

function tokenValidate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = { validator, validateSenha, validateSenhaCreator, tokenValidate };