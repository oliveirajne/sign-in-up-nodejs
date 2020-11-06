const User = require('../models/User');

module.exports = {

    async signUp(req,res) {
        try {
            const email = await User.find({ email: req.body.email });

            if (email) {
                return res.status(409).send({ mensagem: 'E-mail já existente'});
            }
            else {
                const user = await User.create(req.body);
                return res.send({ user });
            }
    
        }catch (err) {
            return res.status(500).send({ mensagem: 'Erro do servidor' });
        }
    },

    async signIn(req,res) {
        try {

            const email = await User.find({ email: req.body.email });

        } catch (err) {
            return res.status(500).send({ mensagem: 'Erro do servidor' });
            
        }
    }

}