const Attendee = require("../models/Attendee")

const attendeeController = {
    index(req, res, next) {
        Attendee.getEventAttendeeList()
            .then((attendees) => {
                res.locals.attendees = attendees;
            })
    },
    
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
    },
}

module.exports = attendeeController;