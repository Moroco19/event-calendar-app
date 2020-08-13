const db = require('../db/config');

class User {
    constructor({ id, username, email, password_digest, name }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password_digest = password_digest;
        this.name = name;
    }

    static getAll() {
        return db
            .manyOrNone(`SELECT * FROM users`)
            .then((users) => users.map((user) => new this(user)));
    }

    static findByUserName(username) {
        return db
            .oneOrNone(`SELECT * FROM users WHERE username = $1`, username);
    }

    static findByUserId(id) {
        return db
        .oneOrNone(`SELECT * FROM users WHERE id = $1`, id);
    }

    save() {
        return db
            .one(
            `INSERT INTO users (username, email, password_digest, name)
            VALUES ($/username/, $/email/, $/password_digest/, $/name/)
            RETURNING *`, this
            )
            .then((savedUser) => Object.assign(this, savedUser));
    }

    update(changes) {
        Object.assign(this, changes);
        return db
            .oneOrNone(
                `UPDATE users SET
                username = $/username/,
                email = $/email/,
                name = $/name/
                WHERE id = $/id/
                RETURNING *`, this
            )
            .then((updatedUser) => {
                Object.assign(this, updatedUser);
            })
    }
}

module.exports = User;