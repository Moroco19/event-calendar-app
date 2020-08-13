const db = require('../db/config');

class User {
    constructor({ id, username, email, password_digest, name }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password_digest = password_digest;
        this.name = name;
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
}

module.exports = User;