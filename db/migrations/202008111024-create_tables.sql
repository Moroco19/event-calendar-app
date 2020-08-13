CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_digest TEXT,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

ALTER TABLE events ADD COLUMN user_id INTEGER REFERENCES users(id);