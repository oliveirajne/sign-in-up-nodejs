const mongoose = require('mongoose');
const uuid = require('uuid').v4;

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: uuid },
    nome: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    senha: { type: String, required: true, select: false },
    data_criacao: { type: Date, default: Date.now },
    data_atualizacao: { type: Date, default: Date.now },
    ultimo_login: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);