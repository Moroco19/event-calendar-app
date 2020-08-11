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
}

module.exports = EventItem;