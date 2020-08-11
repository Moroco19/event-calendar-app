const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/users.controller');
const authHelper = require('../services/auth/auth-helper');

userRouter.get('/', authHelper.loginRequired, userController.index);
userRouter.get('/new', authHelper.loginRedirect, (req, res) => {
    res.send(`New User`);
});
userRouter.post('/', userController.create);

module.exports = userRouter;