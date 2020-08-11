const express = require('express')
const eventRouter = express.Router();

const eventController = require('../controllers/events-controller');
const authHelper = require('../services/auth/auth-helper');

eventRouter.get('/', authHelper.loginRedirect, eventController.index);

module.exports = eventRouter;