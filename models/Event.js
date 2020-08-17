const db = require('../db/config');
//const holidayController = require('../controllers/holidays-controller');

class EventItem{
    constructor({ id, event_name, event_date, event_time, description, user_id }) {
        this.id = id;
        this.event_name = event_name;
        this.event_date = event_date;
        this.event_time = event_time;
        this.description = description;
        this.user_id = user_id;
    };

    static getAll() {
        return db
            .manyOrNone(`SELECT * FROM events ORDER BY event_date ASC`)
            .then((eventIs) => eventIs.map((eventI) => new this(eventI)));
    }

    static getById(id) {
        return db
            .oneOrNone('SELECT * FROM events WHERE id = $1', id)
            .then((eventI) => {
                if (eventI) return new this(eventI);
                throw new Error(`Event not found`);
            });
    }

    static getByDate(date) {
        return db
            .oneOrNone('SELECT * FROM events WHERE event_date = $1', date)
            .then((eventICards) => {
                eventICards.map((eventICard) => new this(eventICard));
            });
    }

    save() {
        return db
            .one(
                `INSERT INTO events (event_name, event_date, event_time, description, user_id)
                VALUES ($/event_name/, $/event_date/, $/event_time/, $/description/, $/user_id/)
                RETURNING *`, this
            )
            .then((eventI) => {
                return Object.assign(this, eventI);
            });
    }

    update(changes) {
        Object.assign(this, changes);
        return db
            .oneOrNone(
                `UPDATE events SET 
                event_name = $/event_name/,
                event_date = $/event_date/,
                event_time = $/event_time/,
                description = $/description/
                WHERE id = $/id/
                RETURNING *`, this
            )
            .then((eventI) => {
                return Object.assign(this, eventI);
            })
    }

    delete() {
        return db.none('DELETE FROM events WHERE id = $/id/', this);
    }
}

module.exports = EventItem;