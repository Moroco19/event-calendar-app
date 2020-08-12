const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const User = require('../../models/User');
const authHelper = require('./auth-helper');
const options = {};

init();

passport.use(
    new LocalStrategy(options, (username, password, done) => {
        User.findByUserName(username)
            .then((user) => {
                if(!user) {
                    console.log('Invalid username.');
                    return done(null, false, { message: 'Invalid username.'});
                }
                if(!authHelper.comparePass(password, user.password_digest)) {
                    console.log('Invalid password.');
                    return done(null, false, { message: 'Invalid password.'});
                }
                else {
                    console.log('Successful login');
                    return done(null, user);
                };
            })
            .catch((err) => {
                console.log(err);
                return done(err);
            });
    })
);

module.exports = passport;