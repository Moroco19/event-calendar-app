const db = require('../db/config');
const userController = require('../controllers/users.controller');

class Attendee{
    constructor({ id, event_id, user_id, confirmation}) {
        this.id = id;
        this.event_id = event_id;
        this.user_id = user_id;
        this.confirmation = confirmation;
    };

    // static getEventAttendeeCount(id) {
    //     return db
    //     .oneOrNone('SELECT COUNT(eventattendees.user_id) FROM events JOIN eventattendees ON events.id = eventattendees.event_id WHERE events.id = $1', id)
    //     .then((attendees) => {
    //         if (attendees) return new this(attendees);
    //         throw new Error(`Event not found`);
    //     });
    // }

    static getEventAttendeeList(id) {
        return db
        .manyOrNone('SELECT eventattendees.id, eventattendees.event_id, eventattendees.user_id, eventattendees.confirmation FROM events JOIN eventattendees ON events.id = eventattendees.event_id WHERE events.id = $1', id)
        .then((attendeeList) => attendeeList.map((attendees) => new this(attendees)));
    }

    save() {
        return db
            .one(
                `INSERT INTO eventattendees (event_id, user_id, confirmation)
                VALUES ($/event_id/, $/user_id/, $/confirmation/)
                RETURNING *`, this
            );
    }
}

module.exports = Attendee;