'use strict';

const childProc = require('child_process');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(body.json());
app.use(cookie());

const users = {
    'test@mail.ru': {
        email: 'test@mail.ru',
        password: '123',
        age: 21,
        score: 3,
    },
};
const ids = {};

app.post('/signup', function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    const age = req.body.age;
    if (
        !password || !email || !age ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/) ||
        !(typeof age === 'number' && age > 10 && age < 100)
    ) {
        return res.status(400).json({error: 'Не валидные данные пользователя'});
    }
    if (users[email]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    const id = uuid();
    const user = {password, email, age, score: 0, images: []};
    ids[id] = email;
    users[email] = user;

    res.cookie('session', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(201).json({id});
});

app.post('/login', function (req, res) {
    const password = req.body.password;
    const email = req.body.email;

    if (!password || !email) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    const id = uuid();
    ids[id] = email;

    console.log(email, password);
    res.cookie('session', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json({id});
});

app.get('/me', function (req, res) {
    const id = req.cookies['session'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    users[email].score += 1;
    res.status(200).json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
    childProc.exec(`open -a "Google Chrome" http://localhost:${port}`, (err) => {
        console.log({err});
    });
});