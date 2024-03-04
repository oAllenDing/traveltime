const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcryptSecret = bcrypt.genSaltSync(10);
const jwtSecret = 'asdfasdf13123asdf32';

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/registration', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSecret),
        });
        res.json(user);
    } catch (err) {
        res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (correctPassword) {
            jwt.sign({
                email: user.email,
                id: user._id,
            },
            jwtSecret,
            {},
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.status(422).json('password is incorrect');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userInfo.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }   
});

app.listen(4000);

