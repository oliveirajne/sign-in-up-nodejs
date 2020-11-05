const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./app/routes');

const app = express();

mongoose.connect('mongodb+srv://usersky:passwordsky@cluster0.20icw.mongodb.net/defaultdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(3333, () => console.log('server is running on 3333'));