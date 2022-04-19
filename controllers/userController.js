const {
    User,
} = require('../models');

const { Op } = require('sequelize');

module.exports = {
    login: async (req, res) => {
        try {
            const userData = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            const userFound = userData.get({ plain: true });
            if (userFound.password === req.body.password) {
                req.session.save(() => {
                    req.session.loggedIn = true;
                    req.session.user = userFound;
                    res.json({ success: true });
                });
            }
        } catch (e) {
            res.json(e)
        }
    },

    renderLogin: (req, res) => {
        if (req.session.loggedIn) {
            return res.redirect('/home');
        }
        res.render('login');
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.send({ status: true });
        })
    },

    renderHome: async (req, res) => {
        res.render('home');
    }
}