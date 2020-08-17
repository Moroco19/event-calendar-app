const EventItem = require('../models/Event');

const eventController = {
    index(req, res, next) {
        EventItem.getAll()
            .then((eventItems) => {
                res.render('events/index', { 
                    eventItems,
                    userNav: req.user, 
                });
            })
            .catch((err) => next(err));
    },
    
    dated(req, res, next) {
        EventItem.getByDate(req.params.date)
            .then((eventItems) => {
                res.render('events/datedshow', { 
                    eventItems,
                    userNav: req.user, 
                });
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
            event_name: req.body.event_name,
            event_date: req.body.event_date,
            event_time: req.body.event_time,
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