const express = require('express');
const authRouter = express.Router();

const authHelper = require('../services/auth/auth-helper');
const passport = require('../services/auth/local');

authRouter.get('/login', authHelper.loginRedirect, (req, res) => {
    res.render('auth/login')
});

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/events',
    failureRedirect: '/auth/login',
    failureFlash: true,
}));

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back');
});

module.exports = authRouter;