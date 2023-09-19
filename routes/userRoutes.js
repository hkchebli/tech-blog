// routes/userRoutes.js
const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// POST route for user registration
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        req.session.userId = userData.id;

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        const validPassword = bcrypt.compareSync(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.userId = userData.id;

        res.status(200).json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
