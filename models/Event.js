const db = require('../db/config');

class EventItem{
    constructor({ id, eventName, eventDate, eventTime, description, user_id }) {
        this.id = id;
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.description = description;
        this.user_id = user_id;
    };

    static getAll() {
        return db
            .manyOrNone(`SELECT * FROM events`)
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

    save() {
        return db
            .one(
                `INSERT INTO events (eventName, eventDate, eventTime, description, user_id)
                VALUES ($/eventName/, $/eventDate/, $/eventTime, $/description/, $/user_id/)
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
                eventName = $/eventName/,
                eventDate = $/eventDate/,
                eventTime = $/eventTime/,
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