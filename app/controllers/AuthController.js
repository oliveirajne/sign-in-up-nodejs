const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const config = require('../config/authconfig');

module.exports = {

    async signUp(req,res) {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(409).send({ mensagem: 'E-mail já existente'});
            }
            else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(req.body.senha, salt);

                const userobj = {
                    nome: req.body.nome,
                    email: req.body.email,
                    telefones: req.body.telefones,
                    hash: hash
                }
                const user = await User.create(userobj);
                const token = jwt.sign({ id: user._id }, config.secret);
                return res.send({ user, token });
            }
    
        }catch (err) {
            return res.status(500).send({ mensagem: 'Erro do servidor' });
        }
    },

    async signIn(req,res) {
        try {

            const user = await User.findOne({ email: req.body.email });
            
            if ( user ) {

                if ( user.senha === req.body.senha ) {
                    return res.send({ user });
                }
                else {
                    return res.status(401).send({ mensagem: 'Usuário e/ou senha inválidos' });
                }
            }
            else {
                return res.status(404).send({ mensagem: 'Usuário e/ou senha inválidos' });
            }

        } catch (err) {
            return res.status(500).send({ mensagem: 'Erro do servidor' });
            
        }
    },

    async buscar(req,res) {
        try {

            const user = await User.findOne({ _id: req.params.id });

            if (user) {
                return res.send({ user });
            }
            
        } catch (err) {
            return res.status(500).send({ mensagem: 'Erro do servidor' });    
        }
    }

}