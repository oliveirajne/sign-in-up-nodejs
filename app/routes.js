  
const express = require('express');

const AuthController = require('./controllers/AuthController');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('OK');
});
routes.post('/signup', AuthController.signUp);
routes.post('/signin', AuthController.signIn);



module.exports = routes;