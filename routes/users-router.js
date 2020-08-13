const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/users.controller');
const authHelper = require('../services/auth/auth-helper');

userRouter.get('/', authHelper.loginRequired, userController.index);
userRouter.get('/new', authHelper.loginRedirect, (req, res) => {
    res.render('auth/register');
});
userRouter.post('/', userController.create);
userRouter.get('/:id([0-9]+)', authHelper.loginRequired, userController.show, (req, res) => {
    res.render('users/show', {
        userNav: req.user,
        userView: res.locals.user,
    });
});
userRouter.get('/:id([0-9]+)/edit', authHelper.loginRequired, userController.show, (req, res) => {
    res.render('users/edit', {
        userNav: req.user,
    });
});
userRouter.put('/:id([0-9]+)', authHelper.loginRequired, userController.update);
module.exports = userRouter;

// userRouter.get('/:id/events', eventsController.getEventsByUser)