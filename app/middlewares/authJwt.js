const jwt = require('jsonwebtoken');
const config = require('../config/authconfig');

exports.verifyToken = (req, res, next) => {

    const token = req.headers.authorization.split("Bearer ")[1];

    if (!token) {
        return res.status(403).send({ mensagem: 'Não autorizado'});
    }

    jwt.verify(token, config.secret, (err) => {
        if (err) {
            return res.status(403).send({ mensagem: 'Não autorizado'});
        }
    })

    next();
}