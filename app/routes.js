const express = require('express');

const AuthController = require('./controllers/AuthController');
const authJwt = require('./middlewares/authJwt');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('OK');
});
routes.post('/signup', AuthController.signUp);
routes.post('/signin', AuthController.signIn);
routes.get('/buscar/:id', [authJwt.verifyToken], AuthController.buscar);
routes.get('*', (req, res) => {
  res.status(404).send({ mensagem: 'Rota não encontrado' });
});
routes.post('*', (req, res) => {
  res.status(404).send({ mensagem: 'Rota não encontrado' });
});

module.exports = routes;
