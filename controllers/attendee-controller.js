const Attendee = require("../models/Attendee")

const attendeeController = {
    create(req, res, next) {
        new Attendee ({
            event_id: req.body.event_id,
            user_id: req.body.user_id,
            confirmation: req.body.confirmation,
        })
        .save()
        .then(() => {
            res.redirect('/events');
        })
        .catch((err) => next(err));
    }
}

module.exports = attendeeController;