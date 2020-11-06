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

            const user = await User.findOneAndUpdate({ email: req.body.email }, { ultimo_login: new Date() }); 
            
            if ( user ) {
                const result = bcrypt.compareSync(req.body.senha, user.hash);

                if ( result ) {
                    const token = jwt.sign({ id: user._id }, config.secret);
                    return res.send({ user, token });
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

            const user = await User.findById(req.params.id);

            if (user) {

                let tempo = new Date() - user.ultimo_login;

                if ( tempo > 1800000 ) {
                    return res.status(401).send({ mensagem: 'Sessão inválida' });    
                }

                return res.send({ user });
            }
            else {
                return res.status(404).send({ mensagem: 'Usuário não encontrado' });    
            }
            
        } catch (err) {
            return res.status(500).send({ mensagem: 'Erro do servidor' });    
        }
    }

}