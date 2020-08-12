const EventItem = require('../models/Event');

const eventController = {
    index(req, res, next) {
        EventItem.getAll()
            .then((eventItems) => {
                res.render('events/index', { 
                    user: req.user,
                    eventItems });
            })
            .catch((err) => next(err));
    },

    show(req, res, next) {
        EventItem.getById(req.params.id)
            .then((eventI) => {
                res.locals.eventI = eventI;
                next();
            })
            .catch((err) => next(err));
    },

    create(req, res, next) {
        new EventItem ({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            description: req.body.description,
            user_id: req.user.id,
        })
            .save()
            .then(() => {
                res.redirect('/events');
            })
            .catch((err) => next(err));
    },

    update(req, res, next) {
        EventItem.getById(req.params.id)
            .then((eventI) => {
                return eventI.update(req.body);
            })
            .then((updatedEventI) => {
                res.redirect(`/events/${updatedEventI.id}`);
            })
            .catch((err) => next(err));
    },

    delete(req, res, next) {
        EventItem.getById(req.params.id)
            .then((eventI) => {
                return eventI.delete();
            })
            .then(() => {
                res.redirect('/events');
            })
            .catch((err) => next(err));
    },
};

module.exports = eventController;