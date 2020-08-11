const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const authRouter = require('./routes/auth-router');
const eventsRouter = require('./routes/events-router');
const usersRouter = require('./routes/users-router');

const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/events', eventsRouter);
app.use('/auth', authRouter);
app.use('/user', usersRouter);

app.use('*', (req, res) => {
    res.status(404).send({
        error: `Not Found`,
    });
});

app.use((err, req, res, nex) => {
    res.status(500).send({ err, message: err.message });
});