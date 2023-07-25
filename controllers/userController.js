const bcrypt = require('bcrypt');
const { User } = require('../models');

const userController = {
    // Register a new user
    registerUser: async (req, res) => {
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
    loginUser: async (req, res) => {
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
    logoutUser: async (req, res) => {
        if (req.session.userId) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    },

    // Get a single user
    getUserById: async (req, res) => {
        try {
            const userData = await User.findByPk(req.params.id);
            if (!userData) {
                res.status(404).json({ message: 'No user found with that id!' });
                return;
            }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
