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

CREATE TABLE IF NOT EXISTS eventattendees (
    id SERIAL PRIMARY KEY,
    event_id INTEGER,
    user_id INTEGER,
    confirmation TEXT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS holidayevents (
    id SERIAL PRIMARY KEY,
    holiday_name VARCHAR(255),
    holiday_country VARCHAR(255),
    is_public_holiday BOOLEAN
);

ALTER TABLE events ADD COLUMN user_id INTEGER REFERENCES users(id);
ALTER TABLE holidayevents ADD COLUMN event_id INTEGER REFERENCES events(id);