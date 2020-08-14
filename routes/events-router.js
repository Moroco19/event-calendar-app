const express = require('express')
const eventRouter = express.Router();

const eventController = require('../controllers/events-controller');
const authHelper = require('../services/auth/auth-helper');
const wpController = require('../controllers/weekpreview-controller');

eventRouter.get('/', authHelper.loginRequired, eventController.index, wpController.show);
eventRouter.get('/add', authHelper.loginRequired, (req, res) => {
    res.render('events/add', {
        userNav: req.user,
    });
});
eventRouter.post('/', eventController.create);
eventRouter.get('/:id([0-9]+)', authHelper.loginRequired, eventController.show, (req, res) => {
    res.render('events/show', {
        userNav: req.user,
        eventI: res.locals.eventI,
    });
});
eventRouter.get('/:id([0-9]+)/edit', authHelper.loginRequired, eventController.show, (req, res) => {
    res.render('/events/edit', {
        userNav: req.user,
        eventI: res.locals.eventI,
    });
});
eventRouter.put('/:id([0-9]+)', authHelper.loginRequired, eventController.update);
eventRouter.delete('/:id([0-9]+)', authHelper.loginRequired, eventController.delete);

module.exports = eventRouter;