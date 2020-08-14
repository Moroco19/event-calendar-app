const db = require('../db/config');
const userController = require('../controllers/users.controller');

class Attendee{
    constructor({ id, event_id, user_id, confirmation}) {
        this.id = id;
        this.event_id = event_id;
        this.user_id = user_id;
        this.confirmation = confirmation;
    };

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