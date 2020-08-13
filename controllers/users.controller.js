const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userController = {
    index(req, res, next) {
        User.getAll()
            .then((users) => {
                res.render('users/index', {
                    userNav: req.user,
                    users,
                })
                .catch((err) => next(err));
            })
    },

    create(req, res, next) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);
        new User({
            username: req.body.username,
            email: req.body.email,
            password_digest: hash,
            name: req.body.name,
        })
        .then()
        .save()
        .then((user) => {
            req.login(user, (err) => {
                if(err) return next(err);
                res.redirect('/events');
            });
        })
        .catch((err) => {
            if (err.detail.includes('username')) {
                res.redirect('/user/new');
            } });
    },

    show(req, res, next) {
        User.findByUserId(req.params.id)
            .then((user) => {
                res.locals.user = user;
                next();
            })
            .catch((err) => next(err));
    },

    update(req, res, next) {
        User.findByUserId(req.params.id)
            .then((user) => {
                return user.update(req.body);
            })
            .then((updatedUser) => {
                res.redirect(`user/${updatedUser.id}`);
            })
            .catch((err) => next(err));
    },
};

module.exports = userController;