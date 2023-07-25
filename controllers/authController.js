const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
    // Register a new user
    register: async (req, res) => {
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
    },

    // Login a user
    login: async (req, res) => {
        try {
            const userData = await User.findOne({ where: { username: req.body.username } });
            if (!userData || !bcrypt.compareSync(req.body.password, userData.password)) {
                res.status(401).json({ message: 'Incorrect username or password' });
                return;
            }
            req.session.userId = userData.id;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Logout a user
    logout: async (req, res) => {
        if (req.session.userId) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    },
};

module.exports = authController;
