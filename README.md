# event-calendar-app

The goal of this app was to create a place for users to create and store events that start on a given date and time, and allow other uses to indicate if they wish to attend.

## To Get Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing

Before getting started on installing this locally, you will need to make sure you have npm and postgresSQL installed.

1) Clone this repo into a directory on your local machine

```
git clone https://github.com/Moroco19/event-calendar-app
```

2) Install module dependencies
```
npm install
```

3) Create a .env file, open the .env file and inside it create a variable called “SECRET_KEY” and set it equal to a string of characters you randomly type in.

```
touch .env
```

4) In your terminal, connect to psql, create database, connect to the database and import the sql tables.  If you rename the database, you will also need to update the config.js file.

```
psql
CREATE DATABASE event_calendar_dev
\c event_calendar_dev
\i db/migrate/202008111024-create_tables.sql
```

5) Leave psql and then in your terminal

```
npm run dev
```
