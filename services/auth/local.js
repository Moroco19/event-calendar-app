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
                    return done(null, false);
                }
                if(!authHelper.comparePass(password, user.password_digest)) {
                    console.log('Unsuccessful login');
                    return done(null, false);
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