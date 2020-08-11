const EventItem = require('../models/Event');

const eventController = {
    index(req, res, next) {
        EventItem.getAll()
            .then((events) => {
                res.render('events/index', { events });
            })
            .catch((err) => next(err));
    },
};

module.exports = eventController;